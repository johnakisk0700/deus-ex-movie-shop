import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { axiosInstance } from "../../api/axios";
import PaginationButtons from "../../components/Pagination/PaginationButtons";
import { useAuth } from "../../context/AuthProvider";
import { useAuthAutoRequest } from "../../hooks/useAuthAutoRequest";
import { useAuthRequest } from "../../hooks/useAuthRequest";
import { usePagination } from "../../hooks/usePagination";
import CategoriesSelect, { ICategory } from "./CategoriesSelect";
import Movie, { IMovie } from "./Movie";
import MovieInfoModal from "./MovieInfoModal";
import MovieRentModal from "./MovieRentModal";
import { RentToastRenderer } from "./RentToastRenderer";

interface MoviesResponse {
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

  const {
    data: moviesRes,
    loading,
    error,
  } = useAuthAutoRequest<MoviesResponse>(
    "GET",
    `rent-store/movies?page=${page}&page_size=${page_size}${
      selectedCategory?.name ? `&category=${selectedCategory.name}` : ""
    }`
  );
  const movies = moviesRes?.results;
  const count = moviesRes?.count;

  // used for skeletons
  const fakeMovieArr = useMemo(() => Array(20).fill(0), []);

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
  } = useAuthRequest<RentResponse>(
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
        <CategoriesSelect
          selectedCategory={selectedCategory}
          handleChangeCategory={handleChangeCategory}
        />
        {count && (
          <PaginationButtons
            pages={Math.ceil(count / page_size)}
            currentPage={page}
            setPage={setPage}
          />
        )}
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
        {loading
          ? fakeMovieArr.map((_, i) => (
              <GridItem key={i}>
                <Movie loading={true} />
              </GridItem>
            ))
          : null}
        {movies && !loading
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
        <CategoriesSelect
          selectedCategory={selectedCategory}
          handleChangeCategory={handleChangeCategory}
        />
        {count && (
          <PaginationButtons
            pages={Math.ceil(count / page_size)}
            currentPage={page}
            setPage={setPage}
          />
        )}
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

export default Movies;
