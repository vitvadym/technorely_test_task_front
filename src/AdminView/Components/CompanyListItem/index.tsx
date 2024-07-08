import { FC } from "react";
import { ICompany } from "../../../types/company.type";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import { useAppDispatch } from "../../../app/hoolks";
import { Link, useSearchParams } from "react-router-dom";
import {
  deleteCompany,
  getCompanies,
} from "../../../app/features/company/companySlice";

type ListItemProps = {
  company: ICompany;
  index: number;
};
const CompanyListItem: FC<ListItemProps> = ({ company, index }) => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const {
    name,
    address,
    createdAt,
    description,
    numberOfEmployees,
    serviceOfActivity,
    type,
    id,
  } = company;

  const handleDelete = async () => {
    const confirm = window.confirm(
      `Are you sure you want to delete ${name} company?`,
    );

    if (confirm) {
      await dispatch(deleteCompany(id));
      dispatch(getCompanies(searchParams.toString()));
    }
  };

  const formatedDate = new Date(createdAt).toUTCString();
  return (
    <>
      <tr className=" duration-300 hover:bg-slate-200">
        <td>{index}</td>
        <td>{name}</td>
        <td>{type}</td>
        <td>{serviceOfActivity}</td>
        <td>{description}</td>
        <td>{address}</td>
        <td>{numberOfEmployees}</td>
        <td>{formatedDate}</td>
        <td className="flex gap-2">
          <Link to={`/company/edit/${id}`}>
            <button className="btn btn-neutral">
              <PencilIcon width={16} />
            </button>
          </Link>
          <button
            className="btn btn-neutral"
            onClick={handleDelete}
          >
            <TrashIcon width={16} />
          </button>
        </td>
      </tr>
    </>
  );
};

export default CompanyListItem;
