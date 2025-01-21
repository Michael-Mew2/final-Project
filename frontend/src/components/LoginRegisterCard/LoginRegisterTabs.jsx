import { Tabs } from "@mantine/core";
import { IconUser, IconUserEdit } from "@tabler/icons-react";
import * as React from "react";
import Register from "../Register/Register";
import Login from "../Login/Login";

export default function LoginRegisterTabs() {
  return (
    <Tabs color="teal" variant="outline" defaultValue={""}>
      <Tabs.List style={{position: "sticky", top: 0}}>
        <Tabs.Tab value="signin" leftSection={<IconUser size={14} />}>
          Login
        </Tabs.Tab>
        <Tabs.Tab
          value="signup"
          color="orange"
          leftSection={<IconUserEdit size={14} />}
        >
          Register
        </Tabs.Tab>
      </Tabs.List>

      <div
        style={{
          maxHeight: "calc(76vh - 42px)", // Dynamische Höhe (Tabs + Padding abziehen)
          overflowY: "auto", // Nur Inhalt scrollbar
          padding: "0.5rem", // Padding für Inhalt
        }}
      >
        <Tabs.Panel value="signin">
            <Login />
        </Tabs.Panel>
        <Tabs.Panel value="signup">
          <Register />
        </Tabs.Panel>
      </div>
    </Tabs>
  );
}
