import { Field, Formik, useFormik } from "formik";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useAuth, UserCredentials } from "../../context/AuthProvider";
import { object, string } from "yup";

type Props = {};

let userCredentialsSchema = object({
  username: string().required(),
  password: string().required(),
});

function LoginForm({}: Props) {
  const { login, loading } = useAuth();

  const handleSubmit = (values: UserCredentials) => {
    login(values);
  };

  const bg = useColorModeValue("white", "blackAlpha.400");

  return (
    <Flex align="center" justify="center">
      <Box bg={bg} px={8} pt={6} rounded="md" width="100%" boxShadow="md">
        <Heading as="h1" mb={6} fontSize="2xl">
          LOGIN
        </Heading>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={userCredentialsSchema}
        >
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <Flex flexDir="column" gap={8}>
                <FormControl isInvalid={!!errors.username && touched.username}>
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <Field
                    as={Input}
                    id="username"
                    name="username"
                    type="text"
                    variant="outline"
                    required
                  />
                  <FormErrorMessage>{errors.username}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.password && touched.password}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    type="password"
                    variant="outline"
                    required
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="brand"
                  width="full"
                  isLoading={loading}
                  mt={6}
                  mb={6}
                >
                  Login
                </Button>
              </Flex>
            </form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
}

export default LoginForm;
