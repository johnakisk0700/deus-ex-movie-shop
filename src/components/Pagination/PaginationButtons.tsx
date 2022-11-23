import { Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";

type Props = {
  pages: number;
  currentPage: number;
  setPage: Dispatch<SetStateAction<number>>;
};

function PaginationButtons({ pages, currentPage, setPage }: Props) {
  const handleChangePage = (num: number) => {
    setPage((prev) => prev + num);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const colorScheme = useColorModeValue("blackAlpha", "whiteAlpha");
  return (
    <Flex align="center" gap={4}>
      <Button
        onClick={() => handleChangePage(-1)}
        disabled={currentPage === 1}
        colorScheme={colorScheme}
      >
        {" "}
        {"<"}{" "}
      </Button>
      <Text>
        {currentPage} / {pages}
      </Text>
      <Button
        onClick={() => handleChangePage(1)}
        disabled={currentPage === pages}
        colorScheme={colorScheme}
      >
        {" "}
        {">"}{" "}
      </Button>
    </Flex>
  );
}

export default PaginationButtons;
