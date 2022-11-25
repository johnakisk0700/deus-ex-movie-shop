import {
  Box,
  Flex,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Text,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

type Props = {
  displayedRange: number[];
  setDisplayedRange: Dispatch<SetStateAction<number[]>>;
  actualRange: number[];
  handleChangeOnEnd: (val: number[]) => void;
  min: number;
  max: number;
  step: number;
  title: string;
};

function MovieRangeSlider({
  displayedRange,
  setDisplayedRange,
  actualRange,
  handleChangeOnEnd,
  min,
  max,
  step,
  title,
}: Props) {
  return (
    <Flex direction="column" gap={2}>
      <Text fontSize="md" fontWeight="medium">
        {title}
      </Text>
      <Flex width="100%" justify="space-between">
        <Text>{displayedRange[0]}</Text>
        <Text>{displayedRange[1]}</Text>
      </Flex>
      <RangeSlider
        aria-label={["min", "max"]}
        min={min}
        max={max}
        step={step}
        defaultValue={actualRange}
        onChangeEnd={handleChangeOnEnd}
        onChange={(val) => setDisplayedRange(val)}
        colorScheme="brand"
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} />
        <RangeSliderThumb index={1} />
      </RangeSlider>
    </Flex>
  );
}

export default MovieRangeSlider;
