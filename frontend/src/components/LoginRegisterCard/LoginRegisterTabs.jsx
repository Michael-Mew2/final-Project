import { Tabs } from "@mantine/core";
import { IconUser, IconUserEdit } from "@tabler/icons-react";
import * as React from "react";
import Register from "../Register/Register";
import Login from "../Login/Login";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function LoginRegisterTabs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState(searchParams.get("tab") || "signin")

  const currentTab = searchParams.get("tab") || "signin";

  const handleTabChange = (value) => {
    setActiveTab(value);
    setSearchParams({ tab: value });
    navigate(`/sign?tab=${value}`)
  };

  React.useEffect(() => {
    const currentTab = searchParams.get("tab");
    if (currentTab && currentTab !== activeTab) {
      setActiveTab(currentTab);
    }
  }, [searchParams])

  return (
    <Tabs
      defaultValue={activeTab}
      value={currentTab}
      onChange={handleTabChange}
      color="teal"
      variant="outline"
      // mt="2rem"
    >
      <Tabs.List style={{ position: "sticky", top: "0" }}>
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
