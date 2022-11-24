import { TimeIcon, CalendarIcon, StarIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  Image,
  Kbd,
  Skeleton,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export interface IMovie {
  uuid: string;
  title: string;
  pub_date: number;
  duration: number;
  rating: number;
  description: string;
  poster_url: string;
}

type Props = {
  movie?: IMovie;
  loading: boolean;
  handleOpenMovieInfo?: (movie: IMovie) => void;
  handleOpenMovieRent?: (movie: IMovie) => void;
};

function Movie({
  movie,
  loading,
  handleOpenMovieInfo,
  handleOpenMovieRent,
}: Props) {
  const bg = useColorModeValue("white", "");

  return (
    <Skeleton isLoaded={!loading}>
      <Card height="640px" bg={bg}>
        <CardBody>
          <Image
            src={movie?.poster_url}
            height="256px"
            borderRadius="lg"
            mx="auto"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md" noOfLines={2} height="3rem">
              {movie?.title}
            </Heading>
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
            <Text noOfLines={3}>{movie?.description}</Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter justifyContent="flex-end">
          <ButtonGroup spacing="2">
            <Button
              variant="ghost"
              onClick={() => {
                handleOpenMovieInfo && movie && handleOpenMovieInfo(movie);
              }}
            >
              Read More
            </Button>
            <Button
              variant="solid"
              colorScheme="brand"
              color="white"
              onClick={() =>
                handleOpenMovieRent && movie && handleOpenMovieRent(movie)
              }
            >
              Rent
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </Skeleton>
  );
}

export default Movie;
