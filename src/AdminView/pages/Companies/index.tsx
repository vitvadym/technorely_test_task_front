import { useEffect } from "react";
import CompanyListItem from "../../Components/CompanyListItem";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hoolks";
import {
  getCompanies,
  selectCompanies,
  selectIsLoading,
} from "../../../app/features/company/companySlice";
// import Loader from "../../../components/Loader";
import Paginate from "../../../components/Paginate";
import usePage from "../../../helpers/usePage";
import ItemsPerPage from "../../../components/ItemsPerPage";
import ErrorMessage from "../../../components/ErrorMessage";

const Companies = () => {
  const { handleChangePage, page } = usePage();
  const dispatch = useAppDispatch();
  const companies = useAppSelector(selectCompanies);

  const isLoading = useAppSelector(selectIsLoading);
  const [searchParams] = useSearchParams();

  const limit = searchParams.get("limit") || 6;

  useEffect(() => {
    dispatch(getCompanies(searchParams.toString()));
  }, [dispatch, searchParams, page, limit]);

  console.log("companies render");

  return (
    <>
      {!companies.companies.length && !isLoading ? (
        <ErrorMessage>
          Companies not found. Please add some companies.
        </ErrorMessage>
      ) : (
        <div className="overflow-x-auto">
          <div className="mb-3 flex items-center gap-6">
            <ItemsPerPage name="limit" />
            <div className="join mt-4">
              <Paginate
                total={companies?.count || 0}
                currentPage={page}
                perPage={+limit}
                onChangePage={handleChangePage}
              />
            </div>
          </div>
          <table className="table table-sm">
            <thead className="bg-slate-200">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Type</th>
                <th>Service of activity</th>
                <th>Description</th>
                <th>Adress</th>
                <th>Employees</th>
                <th>Date of publish</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {companies?.companies.map((company, index) => (
                <CompanyListItem
                  key={company.id}
                  index={index + 1}
                  company={company}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Companies;
