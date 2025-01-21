import * as React from "react";
import { Popover, Progress, PasswordInput } from "@mantine/core";
import { requirements, getStrength } from "../../../Utils/passwordUtils.js";
import { PasswordRequirement } from "./PasswortRequirement.jsx";

export function PasswordInputWithStrength({ password, setPassword }) {
  const [popoverOpened, setPopoverOpened] = React.useState(false);

  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(password)}
    />
  ));

  const strength = getStrength(password);

  const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";

  return (
    <Popover
      opened={popoverOpened}
      position="bottom"
      width="target"
      transitionProps={{ transition: "pop" }}
    >
      <Popover.Target>
        <div
          onFocusCapture={() => setPopoverOpened(true)}
          onBlur={() => setPopoverOpened(false)}
        >
          <PasswordInput
            withAsterisk
            label="Your Password"
            name="password"
            placeholder="Set up a unique password"
            value={password}
            required
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
        </div>
      </Popover.Target>
      <Popover.Dropdown>
        <Progress color={color} value={strength} size={5} mb="xs" />
        <PasswordRequirement
          label="Includes at least 6 characters"
          meets={password.length > 5}
        />
        {checks}
      </Popover.Dropdown>
    </Popover>
  );
}
