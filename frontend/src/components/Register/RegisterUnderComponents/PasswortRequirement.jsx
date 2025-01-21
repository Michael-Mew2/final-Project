import { Box, Text } from "@mantine/core";
import { IconX, IconCheck } from "@tabler/icons-react";

export function PasswordRequirement({meets, label}) {
    return (
        <Text
          c={meets ? "teal" : "red"}
          style={{ display: "flex", alignItems: "center" }}
          mt={7}
          size="sm"
        >
          {meets ? <IconCheck size={14} /> : <IconX size={14} />}
          <Box ml={10}>{label}</Box>
        </Text>
      );
}