import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Container,
} from "@chakra-ui/react";
import RentalsTable from "../../components/Rentals/RentalsTable";
import BubbleChart from "./BubbleChart";
import MovieForm from "./MovieForm";

type Props = {};

function AdminPage({}: Props) {
  return (
    <Container maxW={"8xl"} mt={6}>
      <Tabs isManual={true} size="md" variant="enclosed" colorScheme="brand">
        <TabList>
          <Tab>All Rentals</Tab>
          <Tab>Charts</Tab>
          <Tab>Add / Edit</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <RentalsTable />
          </TabPanel>
          <TabPanel>
            <BubbleChart />
          </TabPanel>
          <TabPanel>
            <MovieForm />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}

export default AdminPage;
