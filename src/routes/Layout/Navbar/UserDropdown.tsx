import React from "react";
import { FaUserAlt } from "react-icons/fa";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  Button,
  Text,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { useAuth } from "../../../context/AuthProvider";
import { Link } from "react-router-dom";

function UserDropdown() {
  const { user, logout } = useAuth();
  const first_name = user?.profile.first_name;
  const email = user?.profile.email;
  return (
    <Menu>
      <MenuButton width="max-content" height="max-content" p={2}>
        <Flex gap={3} align="center">
          {user?.profile.wallet}.00€
          <FaUserAlt size="20px" />
        </Flex>
      </MenuButton>
      <MenuList>
        {user?.is_admin ? (
          <MenuGroup title="Admin">
            <MenuItem>Administration</MenuItem>
            <MenuDivider />
          </MenuGroup>
        ) : null}

        <MenuGroup title={first_name ? first_name : email}>
          <Link to="/profile">
            <MenuItem>Profile</MenuItem>
          </Link>
          <MenuItem>Rentals</MenuItem>
          <MenuDivider />
          <MenuItem onClick={() => logout()}>Logout</MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
}

export default UserDropdown;
