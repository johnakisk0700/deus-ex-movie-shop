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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { useProfile } from "../../hooks/useProfile";
import { useRequest } from "../../hooks/useRequest";
import { RentToastRenderer } from "../../routes/Home/RentToastRenderer";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function AddCreditsModal({ isOpen, onClose }: Props) {
  const toast = useToast();
  const { refreshProfile } = useProfile();
  const { user } = useAuth();

  const [depositAmount, setDepositAmount] = useState<number>(5);
  const { request, loading } = useRequest(
    "PATCH",
    "/rent-store/profile/",
    {
      deposit: depositAmount,
    },
    (res) => {
      toast({
        position: "top",
        status: "success",
        duration: 2500,
        title: `Successfuly added ${depositAmount}€ to your balance.`,
      });
      refreshProfile();
      onClose();
    }
  );
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay bg="blackAlpha.500" backdropFilter="blur(12px)" />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing="3">
            <Text>Add Credits</Text>
            <NumberInput
              step={5}
              defaultValue={5}
              min={5}
              max={1000}
              onChange={(value) => {
                setDepositAmount(parseInt(value));
              }}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose} variant="ghost">
            Close
          </Button>
          <Button
            variant="solid"
            colorScheme="green"
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

export default AddCreditsModal;
