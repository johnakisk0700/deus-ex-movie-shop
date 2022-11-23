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
} from "@chakra-ui/react";
import { useState } from "react";
import { useAuthAutoRequest } from "../../hooks/useAuthAutoRequest";
import { useAuthRequest } from "../../hooks/useAuthRequest";
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

function RentalsTable({}: Props) {
  // Rentals table logic
  const { page_size, page, setPage } = usePagination();
  const {
    data: rentalsRes,
    loading,
    error,
    refetch: refetchRentals,
  } = useAuthAutoRequest<RentalResponse>(
    "GET",
    `rent-store/rentals?page=${page}&page_size=${page_size}`
  );
  const count = rentalsRes?.count;
  const rentals = rentalsRes?.results;

  // Return modal & logic
  const [selectedReturn, setSelectedReturn] = useState<IRental>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { refreshProfile } = useProfile();
  const {
    request,
    data,
    loading: loadingReturn,
  } = useAuthRequest<ReturnResponse>(
    "PATCH",
    `/rent-store/rentals/${selectedReturn?.uuid}`,
    {
      rental_uuid: selectedReturn?.uuid,
    },
    (data) => {
      refreshProfile();
      refetchRentals();
      onClose();
      Toast({
        status: "success",
        title: `Successfuly returned: ${data?.movie}`,
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
      <Flex justify="flex-end" my={6}>
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
            {!loading && rentals
              ? rentals.map((rental) => (
                  <Tr key={rental.movie} _hover={{ bg: tdHover }}>
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
