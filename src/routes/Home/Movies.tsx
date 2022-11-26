import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex,
  Grid,
  GridItem,
  Heading,
  useDisclosure,
  useToast,
  Button,
  Stack,
} from "@chakra-ui/react";
import { useMemo, useRef, useState } from "react";
import PaginationButtons from "../../components/Pagination/PaginationButtons";
import { useAutoRequest } from "../../hooks/useAutoRequest";
import { useRequest } from "../../hooks/useRequest";
import { usePagination } from "../../hooks/usePagination";
import CategoriesSelect, { ICategory } from "../../components/CategoriesSelect";
import Movie, { IMovie } from "./Movie";
import MovieInfoModal from "./MovieInfoModal";
import MovieRentModal from "./MovieRentModal";
import { RentToastRenderer } from "./RentToastRenderer";
import MovieRangeSlider from "./MovieRangeSlider";
import { IoFilterSharp } from "react-icons/io5";

export interface MoviesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IMovie[];
}

interface RentResponse {
  movie: string;
  user: string;
  rental_date: string;
}

function Movies() {
  const toast = useToast();

  const { page, page_size, setPage } = usePagination();

  const [selectedCategory, setSelectedCategory] = useState<ICategory>();
  const handleChangeCategory = (category: ICategory) => {
    setSelectedCategory(category);
    setPage(1);
  };

  const [ratingRange, setRatingRange] = useState<number[]>([1.0, 10.0]);
  const [displayedRatingRange, setDisplayedRatingRange] = useState<number[]>([
    1.0, 10.0,
  ]);
  const handleChangeRatingRange = (value: number[]) => {
    setRatingRange(value);
    setPage(1);
  };

  const [yearRange, setYearRange] = useState<number[]>([
    1900,
    new Date().getFullYear(),
  ]);
  const [displayedYearRange, setDisplayedYearRange] = useState<number[]>([
    1900,
    new Date().getFullYear(),
  ]);
  const handleChangeYearRange = (value: number[]) => {
    setYearRange(value);
    setPage(1);
  };

  const {
    data: moviesRes,
    loading,
    error,
  } = useAutoRequest<MoviesResponse>(
    "GET",
    `rent-store/movies?page=${page}&page_size=${page_size}&from-rating=${
      ratingRange[0]
    }&to-rating=${ratingRange[1]}
    &from-year=${yearRange[0]}&to-year=${yearRange[1]}
    ${selectedCategory?.name ? `&category=${selectedCategory.name}` : ""}
    `
  );
  const movies = moviesRes?.results;
  const count = moviesRes?.count;

  // Info Modal
  const {
    isOpen: isOpenInfo,
    onOpen: onOpenInfo,
    onClose: onCloseInfo,
  } = useDisclosure();

  const handleOpenMovieInfo = (movie: IMovie) => {
    setSelectedMovie(movie);
    onOpenInfo();
  };

  // Rent Modal
  const {
    isOpen: isOpenRent,
    onOpen: onOpenRent,
    onClose: onCloseRent,
  } = useDisclosure();
  const [selectedMovie, setSelectedMovie] = useState<IMovie | null>(null);

  const handleOpenMovieRent = (movie: IMovie) => {
    setSelectedMovie(movie);
    onOpenRent();
  };

  const {
    request,
    data,
    loading: loadingRent,
  } = useRequest<RentResponse>(
    "POST",
    "/rent-store/rentals/",
    {
      movie: selectedMovie?.uuid,
    },
    (data) => {
      onCloseInfo();
      onCloseRent();
      toast({
        position: "top-right",
        render: () =>
          selectedMovie && <RentToastRenderer movie={selectedMovie} />,
        duration: 2500,
        containerStyle: {
          maxWidth: "100vw",
          minWidth: "150px",
        },
      });
    },
    (err) => {}
  );

  return (
    <>
      <Heading as="h1">Movies</Heading>
      <Flex align="center" justify="space-between" my={6}>
        <FiltersDrawer>
          <Stack gap={4}>
            <CategoriesSelect
              selectedCategory={selectedCategory}
              handleChangeCategory={handleChangeCategory}
            />
            {/* Rating Range Slider */}
            <MovieRangeSlider
              displayedRange={displayedRatingRange}
              setDisplayedRange={setDisplayedRatingRange}
              actualRange={ratingRange}
              handleChangeOnEnd={handleChangeRatingRange}
              min={1}
              max={10}
              step={0.1}
              title={"Rating"}
            />
            {/* Year Range Slider */}
            <MovieRangeSlider
              displayedRange={displayedYearRange}
              setDisplayedRange={setDisplayedYearRange}
              actualRange={yearRange}
              handleChangeOnEnd={handleChangeYearRange}
              min={1900}
              max={new Date().getFullYear()}
              step={1}
              title={"Year of Release"}
            />
          </Stack>
        </FiltersDrawer>
        {count ? (
          <PaginationButtons
            pages={Math.ceil(count / page_size)}
            currentPage={page}
            setPage={setPage}
          />
        ) : null}
      </Flex>
      <Grid
        gridTemplateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          xl: "repeat(4, 1fr)",
        }}
        gap={6}
      >
        {movies
          ? movies.map((movie) => (
              <GridItem key={movie.uuid}>
                <Movie
                  movie={movie}
                  loading={loading}
                  handleOpenMovieInfo={handleOpenMovieInfo}
                  handleOpenMovieRent={handleOpenMovieRent}
                />
              </GridItem>
            ))
          : null}
      </Grid>
      <Flex align="center" justify="space-between" my={6}>
        <FiltersDrawer>
          <Stack gap={4}>
            <CategoriesSelect
              selectedCategory={selectedCategory}
              handleChangeCategory={handleChangeCategory}
            />
            {/* Rating Range Slider */}
            <MovieRangeSlider
              displayedRange={displayedRatingRange}
              setDisplayedRange={setDisplayedRatingRange}
              actualRange={ratingRange}
              handleChangeOnEnd={handleChangeRatingRange}
              min={1}
              max={10}
              step={0.1}
              title={"Rating"}
            />
            {/* Year Range Slider */}
            <MovieRangeSlider
              displayedRange={displayedYearRange}
              setDisplayedRange={setDisplayedYearRange}
              actualRange={yearRange}
              handleChangeOnEnd={handleChangeYearRange}
              min={1900}
              max={new Date().getFullYear()}
              step={1}
              title={"Year of Release"}
            />
          </Stack>
        </FiltersDrawer>
        {count ? (
          <PaginationButtons
            pages={Math.ceil(count / page_size)}
            currentPage={page}
            setPage={setPage}
          />
        ) : null}
      </Flex>
      <MovieInfoModal
        isOpen={isOpenInfo}
        onOpen={onOpenInfo}
        onClose={onCloseInfo}
        movie={selectedMovie}
        onOpenRentModal={onOpenRent}
      />
      <MovieRentModal
        isOpen={isOpenRent}
        onOpen={onOpenRent}
        onClose={onCloseRent}
        movie={selectedMovie}
        request={request}
        loading={loadingRent}
      />
    </>
  );
}

function FiltersDrawer({ children }: { children: JSX.Element }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);

  return (
    <>
      <Button ref={btnRef} onClick={onOpen} variant="ghost" gap={1}>
        <IoFilterSharp size="20px" />
        Filters
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Filters</DrawerHeader>

          <DrawerBody>{children}</DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Back
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Movies;
