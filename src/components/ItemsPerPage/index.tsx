import { FC, ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";

type Props = {
  name: string;
};

const ItemsPerPage: FC<Props> = ({ name }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChageLimit = (event: ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({
      ...searchParams,
      [event.target.name]: event.target.value,
    });
  };

  const limit = searchParams.get(name) || 6;

  return (
    <div className="inline-flex flex-col">
      <label className="mb-1 text-xs font-semibold">items on page</label>
      <select
        name={name}
        defaultValue={limit}
        onChange={handleChageLimit}
        className="select select-bordered select-xs  w-fit focus:outline-none"
      >
        <option value="6">6</option>
        <option value="12">12</option>
        <option value="24">24</option>
      </select>
    </div>
  );
};

export default ItemsPerPage;
