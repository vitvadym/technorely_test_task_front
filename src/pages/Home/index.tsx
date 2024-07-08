import { useEffect, useState } from "react";
import Card from "../../components/CompanyCard";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Link, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hoolks";
import {
  getCompanies,
  getMyCompanies,
  selectCompanies,
  selectIsLoading,
} from "../../app/features/company/companySlice";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";
import { selectIsAuth } from "../../app/features/user/userSlice";
import { useNavigate } from "react-router-dom";
import Paginate from "../../components/Paginate";
import ItemsPerPage from "../../components/ItemsPerPage";
import usePage from "../../helpers/usePage";
import { ICompany } from "../../types/company.type";

const Home = () => {
  const [myCompanies, setMyCompanies] = useState<ICompany[] | []>([]);
  const [showMyCompanies, setShowMyCompanies] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { handleChangePage, page } = usePage();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isLoading = useAppSelector(selectIsLoading);
  const isAuthenticated = useAppSelector(selectIsAuth);
  const companies = useAppSelector(selectCompanies);

  const limit = searchParams.get("limit") || 6;
  const search = searchParams.get("search") || "";

  const handleShowMyCompanies = () => {
    setShowMyCompanies(!showMyCompanies);
  };

  useEffect(() => {
    const fetchMyCompanies = async () => {
      try {
        const response = await dispatch(getMyCompanies()).unwrap();
        if (response) {
          setMyCompanies(response);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchMyCompanies();
  }, [showMyCompanies, dispatch]);

  const handleResetSearchTerm = () => {
    setSearchParams({
      ...searchParams,
      search: "",
    });
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    dispatch(getCompanies(searchParams.toString()));
  }, [dispatch, searchParams, page, limit]);

  return (
    <>
      {(!isLoading && !companies.companies.length) ||
        (showMyCompanies && !myCompanies.length && (
          <ErrorMessage className="text-3xl font-semibold">
            No companies found
          </ErrorMessage>
        ))}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-5">
              <ItemsPerPage name="limit" />
              <div className="flex flex-col">
                <label className="mb-1 text-xs font-semibold">
                  Show my companies
                </label>
                <input
                  checked={showMyCompanies}
                  onChange={handleShowMyCompanies}
                  type="checkbox"
                  className="checkbox checkbox-sm"
                />
              </div>
              <button
                disabled={!search}
                onClick={handleResetSearchTerm}
                className="btn btn-sm"
              >
                Reset search
              </button>
            </div>
            <Link to={"company/create"}>
              <button className="btn">
                <PlusCircleIcon width={24} />
              </button>
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {!showMyCompanies
              ? companies?.companies.map((company) => (
                  <Card
                    key={company.id}
                    company={company}
                  />
                ))
              : myCompanies.map((company) => (
                  <Card
                    key={company.id}
                    company={company}
                  />
                ))}
          </div>
        </>
      )}
      {(companies.companies.length > 0 || myCompanies.length > 0) && (
        <div className="join mt-4">
          <Paginate
            total={
              !showMyCompanies ? companies?.count || 0 : myCompanies.length
            }
            currentPage={page}
            perPage={+limit}
            onChangePage={handleChangePage}
          />
        </div>
      )}
    </>
  );
};

export default Home;
