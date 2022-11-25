import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bubble } from "react-chartjs-2";
import { useAutoRequest } from "../../hooks/useAutoRequest";
import { usePagination } from "../../hooks/usePagination";
import { MoviesResponse } from "../Home/Movies";
import { Progress } from "@chakra-ui/react";

type Props = {};

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

function BubbleChart({}: Props) {
  const { page, page_size, setPage_Size } = usePagination(1);
  const { data, loading } = useAutoRequest<MoviesResponse>(
    "GET",
    `/rent-store/movies/?page=${page}&page_size=${page_size}`
  );

  const [fetchedAllMovies, setFetchedAllMovies] = useState<boolean>(false);
  // this should trigger rerenders until it get max movies.
  useEffect(() => {
    if (data && page_size !== data.count) {
      setPage_Size(data.count);
    }
    // flip the switch and render bubbles
    if (data && page_size === data.count) setFetchedAllMovies(true);
  }, [data]);

  const options = {
    scales: {
      y: {},
    },
  };

  const bubbleData = useMemo(() => {
    if (fetchedAllMovies && data) {
      let moviesPerYear: any = {};
      data.results.forEach((movie) => {
        moviesPerYear[movie.pub_date]
          ? moviesPerYear[movie.pub_date]++
          : (moviesPerYear[movie.pub_date] = 1);
      });
      console.log(moviesPerYear);
      return {
        datasets: [
          {
            label: "Movies By Year ( Scaled x8 for visibility )",
            data: Object.keys(moviesPerYear).map((year) => ({
              x: year,
              y: 0,
              r: moviesPerYear[year] * 8,
            })),
            backgroundColor: "rgba(196, 198, 112, 0.81)",
          },
        ],
      };
    }
    return null;
  }, [fetchedAllMovies]);
  if (!bubbleData) return <Progress isIndeterminate />;
  return <Bubble options={options} data={bubbleData} />;
}

export default BubbleChart;
