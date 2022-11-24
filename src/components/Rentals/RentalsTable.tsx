import { RepeatIcon } from "@chakra-ui/icons";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Skeleton,
  Button,
  useDisclosure,
  Toast,
  Box,
  Flex,
  useColorModeValue,
  Progress,
  useToast,
  Switch,
  Text,
  Select,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { useAutoRequest } from "../../hooks/useAutoRequest";
import { useRequest } from "../../hooks/useRequest";
import { usePagination } from "../../hooks/usePagination";
import { useProfile } from "../../hooks/useProfile";
import { IMovie } from "../../routes/Home/Movie";
import ReturnModal from "../../routes/Profile/ReturnModal";
import { styleConstants } from "../../theme/constants";
import PaginationButtons from "../Pagination/PaginationButtons";

type Props = {};

export interface IRental {
  uuid: string;
  rental_date: string;
  return_date: string;
  is_paid: boolean;
  user: number;
  movie: string;
}

interface RentalResponse {
  count: number;
  next: string;
  previous: string;
  results: IRental[];
}

interface ReturnResponse {
  movie: IMovie;
}

type SortProperties = "rental_date" | "movie" | "is_paid";
const sortOptions = {
  rental_date: "Rental Date",
  movie: "Name",
  is_paid: "Currently Active",
};

function RentalsTable({}: Props) {
  const toast = useToast();

  // Rentals table logic
  const { page_size, page, setPage } = usePagination();
  const [orderBy, setOrderBy] = useState<SortProperties>("movie");
  const [onlyActive, setOnlyActive] = useState<boolean>(false);
  const {
    data: rentalsRes,
    loading,
    error,
    refetch: refetchRentals,
  } = useAutoRequest<RentalResponse>(
    "GET",
    `rent-store/rentals?page=${page}&page_size=${page_size}` +
      (onlyActive ? "&only-active=true" : "")
  );
  const count = rentalsRes?.count;
  const orderedRentals = useMemo(
    () => rentalsRes?.results?.sort((a, b) => Number(a[orderBy] > b[orderBy])),
    [orderBy, rentalsRes]
  );

  // Return modal & logic
  const [selectedReturn, setSelectedReturn] = useState<IRental>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { refreshProfile } = useProfile();
  const {
    request,
    data,
    loading: loadingReturn,
  } = useRequest<ReturnResponse>(
    "PATCH",
    `/rent-store/rentals/${selectedReturn?.uuid}`,
    {
      rental_uuid: selectedReturn?.uuid,
    },
    (data) => {
      refreshProfile();
      refetchRentals();
      onClose();
      toast({
        status: "success",
        title: `Successfuly returned: ${selectedReturn?.movie}`,
        position: "top",
      });
    },
    (err) => {}
  );

  const handleReturn = (rental: IRental) => {
    setSelectedReturn(rental);
    onOpen();
  };

  const tdHover = useColorModeValue("whiteAlpha.700", "black");

  return (
    <>
      <Flex justify="space-between" my={6}>
        <Flex align="center" gap={2}>
          <Select
            value={orderBy}
            onChange={(e) => setOrderBy(e.target.value as SortProperties)}
          >
            {Object.keys(sortOptions).map((key) => (
              <option value={key} key={key}>
                {sortOptions[key as keyof typeof sortOptions]}
              </option>
            ))}
          </Select>
          <Switch
            value={onlyActive ? "true" : "false"}
            onChange={() => {
              setPage(1);
              setOnlyActive((prev) => !prev);
            }}
          />
          <Text>Active Only</Text>
        </Flex>

        {count && (
          <PaginationButtons
            currentPage={page}
            pages={Math.ceil(count / page_size)}
            setPage={setPage}
          />
        )}
      </Flex>
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Movie</Th>
              <Th isNumeric>Rental Date</Th>
              <Th isNumeric>Return Date</Th>
              <Th isNumeric>Paid</Th>
              <Th isNumeric>Return</Th>
            </Tr>
          </Thead>
          <Tbody>
            {!loading && orderedRentals
              ? orderedRentals.map((rental, i) => (
                  <Tr key={i} _hover={{ bg: tdHover }}>
                    <Td>{rental.movie}</Td>
                    <Td isNumeric>{rental.rental_date}</Td>
                    <Td isNumeric>
                      {rental.return_date ? rental.return_date : "-"}
                    </Td>
                    <Td isNumeric>{rental.is_paid ? "YES" : "NO"}</Td>
                    <Td isNumeric>
                      <Button
                        variant="solid"
                        colorScheme="blue"
                        onClick={() => handleReturn(rental)}
                        isDisabled={rental.is_paid}
                      >
                        <RepeatIcon />
                      </Button>
                    </Td>
                  </Tr>
                ))
              : null}
          </Tbody>
          <Tfoot flexGrow={1}></Tfoot>
        </Table>
        {loading ? <Progress isIndeterminate /> : null}
      </TableContainer>
      <ReturnModal
        isOpen={isOpen}
        onClose={onClose}
        rental={selectedReturn}
        submitReturn={request}
        loading={loadingReturn}
      />
    </>
  );
}

export default RentalsTable;
