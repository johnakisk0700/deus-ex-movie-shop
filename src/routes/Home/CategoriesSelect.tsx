import { CircularProgress, Select } from "@chakra-ui/react";
import { useAutoRequest } from "../../hooks/useAutoRequest";

export interface ICategory {
  name: string;
}

type Props = {
  selectedCategory: ICategory | undefined;
  handleChangeCategory: (category: ICategory) => void;
};

function CategoriesSelect({ selectedCategory, handleChangeCategory }: Props) {
  const { data, loading, error } = useAutoRequest<ICategory[]>(
    "GET",
    "/rent-store/categories/"
  );
  return (
    <>
      {loading && !data ? <CircularProgress size="34px" /> : null}
      {data ? (
        <Select
          placeholder="All Categories"
          onChange={(e) => handleChangeCategory({ name: e.target.value })}
          width="max-content"
          value={selectedCategory?.name}
        >
          {data.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}
        </Select>
      ) : null}
    </>
  );
}

export default CategoriesSelect;
