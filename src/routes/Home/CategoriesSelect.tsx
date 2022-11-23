import { CircularProgress, Select } from "@chakra-ui/react";
import { useAuthAutoRequest } from "../../hooks/useAuthAutoRequest";

export interface ICategory {
  name: string;
}

type Props = {
  selectedCategory: ICategory | undefined;
  handleChangeCategory: (category: ICategory) => void;
};

function CategoriesSelect({ selectedCategory, handleChangeCategory }: Props) {
  const { data, loading, error } = useAuthAutoRequest<ICategory[]>(
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
            <option value={category.name}>{category.name}</option>
          ))}
        </Select>
      ) : null}
    </>
  );
}

export default CategoriesSelect;
