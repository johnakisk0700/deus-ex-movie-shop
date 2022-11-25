import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Image,
  Stack,
  Heading,
  Text,
  Flex,
  Kbd,
} from "@chakra-ui/react";
import { IMovie } from "./Movie";
import { CalendarIcon, StarIcon, TimeIcon } from "@chakra-ui/icons";

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  movie: IMovie | null;
  request: (values?: any) => void;
  loading: boolean;
}

function MovieRentModal({
  isOpen,
  onOpen,
  onClose,
  movie,
  request,
  loading,
}: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay bg="blackAlpha.500" backdropFilter="blur(12px)" />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Image
            src={movie?.poster_url}
            height="256px"
            borderRadius="lg"
            mx="auto"
          />
          <Heading fontSize="md" textAlign="center" mt={4}>
            Please confirm you want to rent: <br />
            <Text as="span" fontSize="2xl">
              {movie?.title}
            </Text>
          </Heading>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose} variant="ghost">
            Decline
          </Button>
          <Button
            variant="solid"
            colorScheme="brand"
            color="white"
            onClick={() => {
              request();
            }}
            isLoading={loading}
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default MovieRentModal;
