import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  TextInput,
  Group,
  Text,
  Modal,
  Loader,
  Badge,
} from "@mantine/core";
import { Search } from "tabler-icons-react";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/users/admin/users");
      if (!response.ok) throw new Error("Fehler beim Abrufen der Benutzerdaten.");
      const data = await response.json();
      setUsers(data);
      setError("");
    } catch (err) {
      setError(err.message || "Unbekannter Fehler.");
    } finally {
      setLoading(false);
    }
  };

  const toggleBlockUser = async (userId, block) => {
    try {
      const route = block
        ? `/api/user/admin/users/${userId}/block`
        : `/api/user/admin/users/${userId}/unblock`;
      const response = await fetch(route, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error(
          block
            ? "Fehler beim Blockieren des Benutzers."
            : "Fehler beim Entblocken des Benutzers."
        );
      }
      fetchUsers();
    } catch (err) {
      setError(err.message || "Unbekannter Fehler.");
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`/api/users/admin/users/${userId}/delete`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Fehler beim Löschen des Benutzers.");
      }
      setDeleteModal(false);
      fetchUsers();
    } catch (err) {
      setError(err.message || "Unbekannter Fehler.");
    }
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Group position="apart" mb="lg">
        <Text weight={500} size="xl">
          Admin Dashboard
        </Text>
        <TextInput
          placeholder="Benutzer suchen..."
          icon={<Search size={16} />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Group>

      {error && <Text color="red">{error}</Text>}
      {loading ? (
        <Loader />
      ) : (
        <Table>
          <thead>
            <tr>
              <th>Benutzername</th>
              <th>E-Mail</th>
              <th>Geburtsdatum</th>
              <th>Status</th>
              <th>Aktionen</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.birthdate}</td>
                  <td>
                    {user.isAllowedIn ? (
                      <Badge color="green">Aktiv</Badge>
                    ) : (
                      <Badge color="red">Blockiert</Badge>
                    )}
                  </td>
                  <td>
                    <Group>
                      <Button
                        size="xs"
                        variant={user.isAllowedIn ? "outline" : "filled"}
                        color={user.isAllowedIn ? "red" : "green"}
                        onClick={() =>
                          toggleBlockUser(user.id, !user.isAllowedIn)
                        }
                      >
                        {user.isAllowedIn ? "Blockieren" : "Entblocken"}
                      </Button>
                      <Button
                        size="xs"
                        color="red"
                        variant="outline"
                        onClick={() => {
                          setSelectedUser(user);
                          setDeleteModal(true);
                        }}
                      >
                        Löschen
                      </Button>
                    </Group>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>
                  <Text align="center">Keine Benutzer gefunden.</Text>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}

      <Modal
        opened={deleteModal}
        onClose={() => setDeleteModal(false)}
        title="Benutzer löschen"
      >
        <Text>
          Möchten Sie den Benutzer{" "}
          <strong>{selectedUser?.username || "Unbekannt"}</strong> wirklich
          löschen?
        </Text>
        <Group position="apart" mt="md">
          <Button variant="default" onClick={() => setDeleteModal(false)}>
            Abbrechen
          </Button>
          <Button
            color="red"
            onClick={() => deleteUser(selectedUser?.id)}
          >
            Löschen
          </Button>
        </Group>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
