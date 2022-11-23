import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Stack,
  Heading,
  Text,
} from "@chakra-ui/react";

import { IRental } from "../../components/Rentals/RentalsTable";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  rental: IRental | undefined;
  submitReturn: () => void;
  loading: boolean;
}

function ReturnModal({
  isOpen,
  onClose,
  rental,
  submitReturn,
  loading,
}: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay bg="blackAlpha.500" backdropFilter="blur(12px)" />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing="3">
            <Text>Please confirm the return of:</Text>
            <Heading size="md">{rental?.movie}</Heading>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose} variant="ghost">
            Close
          </Button>
          <Button
            variant="solid"
            colorScheme="blue"
            color="white"
            onClick={() => submitReturn()}
            isLoading={loading}
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ReturnModal;
