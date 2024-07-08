import { Link } from "react-router-dom";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { ICompany } from "../../types/company.type";
import { FC } from "react";

type CardProps = {
  company: ICompany;
};

const Card: FC<CardProps> = ({ company }) => {
  const { id, address, name, description, createdAt } = company;
  return (
    <div className="card min-w-[250px] bg-gray-100 shadow-md duration-200 hover:scale-105">
      <Link to={`company/${id}`}>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p className="line-clamp-2">{description}</p>
          <div className="card-actions items-center justify-between gap-1">
            <span className="flex flex-row items-center gap-1 text-sm text-slate-400">
              {address}
              <MapPinIcon
                className="h-4 w-4"
                color="green"
              />
            </span>
            <p className="text-sm text-slate-400">
              <span className="mr-1 font-semibold text-slate-600">
                Date of publish:
              </span>
              {new Date(createdAt).toString().slice(0, 15)}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
