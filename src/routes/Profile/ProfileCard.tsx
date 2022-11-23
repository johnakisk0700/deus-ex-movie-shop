import { Box, Flex, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { FaUserAlt } from "react-icons/fa";
import { useAuth } from "../../context/AuthProvider";
import { styleConstants } from "../../theme/constants";

type Props = {};

function ProfileCard({}: Props) {
  const { user } = useAuth();
  const profile = user?.profile;
  const bg = useColorModeValue("blackAlpha.200", "whiteAlpha.100");
  const userIconBg = useColorModeValue("white", "black");
  return (
    <Flex
      borderRadius={styleConstants.borderRadius}
      my={8}
      p={6}
      flexDirection={{ base: "column", sm: "row" }}
      align={{ base: "center" }}
      gap={8}
      width="max-content"
      bg={bg}
      ml="auto"
    >
      <Flex
        height="128px"
        width="128px"
        bg={userIconBg}
        boxShadow={"md"}
        align="center"
        justify="center"
        borderRadius="full"
      >
        <FaUserAlt size="64px" />
      </Flex>
      <Stack>
        <Text>
          Email:{" "}
          <Text as="span" sx={styles.infoSpan}>
            {profile?.email}
          </Text>
        </Text>
        <Text>
          Name:{" "}
          <Text as="span" sx={styles.infoSpan}>
            {profile?.first_name}
          </Text>
        </Text>
        <Text>
          Last Name:{" "}
          <Text as="span" sx={styles.infoSpan}>
            {profile?.last_name}
          </Text>
        </Text>
        <Text>
          Wallet:{" "}
          <Text as="span" sx={styles.infoSpan}>
            {profile?.wallet}.00€
          </Text>
        </Text>
      </Stack>
    </Flex>
  );
}

const styles = {
  infoSpan: {
    fontWeight: "800",
  },
};

export default ProfileCard;
