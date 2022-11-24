import { Container } from "@chakra-ui/react";
import React from "react";
import RentalsTable from "../../components/Rentals/RentalsTable";
import BubbleChart from "../Admin/BubbleChart";
import ProfileCard from "./ProfileCard";

type Props = {};

function ProfilePage({}: Props) {
  return (
    <Container maxW="8xl">
      <ProfileCard />
      <RentalsTable />
      <BubbleChart />
    </Container>
  );
}

export default ProfilePage;
