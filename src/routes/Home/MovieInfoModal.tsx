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
  onOpenRentModal: () => void;
}

function MovieInfoModal({
  isOpen,
  onOpen,
  onClose,
  movie,
  onOpenRentModal,
}: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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
          <Stack mt="6" spacing="3">
            <Heading size="md">{movie?.title}</Heading>
            <Text
              fontSize="md"
              display="flex"
              alignItems="center"
              gap={1.5}
              fontStyle="italic"
            >
              <CalendarIcon fontSize="xl" />
              {movie?.pub_date}
            </Text>
            <Text fontSize="md" display="flex" alignItems="center" gap={1.5}>
              <TimeIcon fontSize="xl" />
              {movie?.duration} min
            </Text>
            <Flex alignItems="center" gap={1.5}>
              <StarIcon fontSize="xl" />
              <Kbd fontSize="md">{movie?.rating}</Kbd> /{" "}
              <Kbd fontSize="xs">10</Kbd>
            </Flex>
            <Text>{movie?.description}</Text>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose} variant="ghost">
            Close
          </Button>
          <Button
            variant="solid"
            colorScheme="brand"
            color="white"
            onClick={() => onOpenRentModal()}
          >
            Rent
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default MovieInfoModal;
