import { CloseIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Tag,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import {
  Field,
  FieldArray,
  FieldArrayRenderProps,
  Formik,
  FormikHelpers,
} from "formik";
import { useState } from "react";
import yup, { array, number, object, string } from "yup";
import { useRequest } from "../../hooks/useRequest";
import CategoriesSelect, { ICategory } from "../../components/CategoriesSelect";

type Props = {};

let movieSchema = object({
  title: string().required(),
  pub_date: number().required(),
  duration: number().required(),
  rating: number().required(),
  description: string().required(),
  categories: array().min(1).of(string()).required(),
});
type MovieSchema = yup.InferType<typeof movieSchema>;

function MovieForm({}: Props) {
  const toast = useToast();

  const [selectedCategory, setSelectedCategory] = useState<ICategory>();
  const handleChangeCategory =
    (arrayHelper: FieldArrayRenderProps, length: number) =>
    (value: ICategory) => {
      setSelectedCategory(value);
      if (value.name) arrayHelper.insert(length, value.name);
    };

  const { request, data, loading } = useRequest(
    "POST",
    "rent-store/movies/",
    undefined,
    () => {
      toast({
        status: "success",
        title: "Successfully added movie.",
        position: "top",
      });
    }
  );
  const handleSubmit = async (values: MovieSchema, { resetForm }: any) => {
    await request(values);
    resetForm();
  };

  return (
    <Formik
      initialValues={{
        title: "",
        pub_date: new Date().getFullYear(),
        duration: 0,
        rating: 10,
        description: "",
        categories: [],
      }}
      onSubmit={handleSubmit}
      validationSchema={movieSchema}
    >
      {({ handleSubmit, errors, touched, values }) => (
        <form onSubmit={handleSubmit}>
          <Flex flexDir="column" gap={8}>
            <FormControl isInvalid={!!errors.title && touched.title}>
              <FormLabel htmlFor="title">Title</FormLabel>
              <Field
                as={Input}
                id="title"
                name="title"
                type="text"
                variant="outline"
                placeholder="Sharknado 5: The return of the shark..."
                required
              />
              <FormErrorMessage>{errors.title}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.pub_date && touched.pub_date}>
              <FormLabel htmlFor="pub_date">Publication Date</FormLabel>
              <Field
                as={Input}
                id="pub_date"
                name="pub_date"
                type="text"
                variant="outline"
                required
              />
              <FormErrorMessage>{errors.pub_date}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.duration && touched.duration}>
              <FormLabel htmlFor="duration">Duration</FormLabel>
              <Field
                as={Input}
                id="duration"
                name="duration"
                type="text"
                variant="outline"
                required
              />
              <FormErrorMessage>{errors.duration}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.rating && touched.rating}>
              <FormLabel htmlFor="rating">Rating</FormLabel>
              <Field
                as={Input}
                id="rating"
                name="rating"
                type="text"
                variant="outline"
                required
              />
              <FormErrorMessage>{errors.rating}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={!!errors.description && touched.description}
            >
              <FormLabel htmlFor="description">Description</FormLabel>
              <Field
                as={Textarea}
                id="description"
                name="description"
                type="text"
                variant="outline"
                required
              />
              <FormErrorMessage>{errors.description}</FormErrorMessage>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="categories">Categories</FormLabel>
              <FieldArray
                name="categories"
                render={(arrayHelpers) => (
                  <div>
                    <CategoriesSelect
                      selectedCategory={selectedCategory}
                      handleChangeCategory={handleChangeCategory(
                        arrayHelpers,
                        values.categories.length || 0
                      )}
                      externalError={
                        !!(errors.categories && touched.categories)
                      }
                    />
                    <Flex gap={4} flexWrap="wrap">
                      {values.categories && values.categories.length > 0
                        ? values.categories.map((category, index) => (
                            <div key={index}>
                              <Field
                                as={Input}
                                name={`categories.${index}`}
                                type="text"
                                display="none"
                              />

                              <Tag mt={4} size="lg">
                                {category}
                                <Text
                                  as="span"
                                  onClick={() => arrayHelpers.remove(index)}
                                  cursor="pointer"
                                  ml={2}
                                >
                                  <CloseIcon boxSize={2} />
                                </Text>
                              </Tag>
                            </div>
                          ))
                        : null}
                    </Flex>
                  </div>
                )}
              />
              {errors.categories && touched.categories ? (
                <Text color="red.300" fontSize="sm" mt={2}>
                  {errors.categories}
                </Text>
              ) : null}
              <FormErrorMessage></FormErrorMessage>
            </FormControl>

            <Button
              type="submit"
              colorScheme="brand"
              width="full"
              isLoading={loading}
              mt={6}
              mb={6}
              color="white"
            >
              Submit
            </Button>
          </Flex>
        </form>
      )}
    </Formik>
  );
}

export default MovieForm;
