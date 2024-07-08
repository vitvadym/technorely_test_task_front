import styles from "./Company.module.scss";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hoolks";
import { useEffect, useState } from "react";
import {
  getCompanyById,
  selectError,
  selectIsLoading,
  deleteCompany,
} from "../../app/features/company/companySlice";
import { ICompany } from "../../types/company.type";
import Loader from "../../components/Loader";
import toast from "react-hot-toast";
import ErrorMessage from "../../components/ErrorMessage";
import GoBack from "../../components/GoBack";
import { selectIsAdmin, selectUser } from "../../app/features/user/userSlice";

const CompanyDetail = () => {
  const [company, setCompany] = useState<ICompany | null>(null);
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isLoading = useAppSelector(selectIsLoading);
  const isAdmin = useAppSelector(selectIsAdmin);
  const error = useAppSelector(selectError);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      if (id) {
        const result = await dispatch(getCompanyById(id)).unwrap();
        if (result) {
          setCompany(result);
        }
      }
    };

    fetchCompanyDetails();
  }, [dispatch, id]);

  const handleDelete = async () => {
    const confirm = window.confirm("Delete this company?");

    if (confirm) {
      await dispatch(deleteCompany(Number(id)));
      navigate(-1);
      toast.success("Company deleted successfully");
    }
  };

  const {
    address,
    description,
    name,
    numberOfEmployees,
    serviceOfActivity,
    type,
  } = company ?? {};

  return (
    <>
      {error && !isLoading && (
        <ErrorMessage className="text-center text-2xl">{error}</ErrorMessage>
      )}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="flex items-center justify-between">
            <GoBack />
            {(user?.id === company?.userId || isAdmin) && (
              <div className="flex gap-5">
                <Link
                  to={`/company/edit/${id}`}
                  className="duration-300 hover:scale-105"
                >
                  <PencilIcon width={24} />
                </Link>
                <button
                  onClick={handleDelete}
                  className="duration-300 hover:scale-105"
                >
                  <TrashIcon width={24} />
                </button>
              </div>
            )}
          </div>
          <div className={styles.company}>
            <h1 className={styles.company__title}>{name}</h1>
            <h2 className={styles.company__label}>Number of empoyees:</h2>
            <p className={styles.company__value}>{numberOfEmployees}</p>
            <h2 className={styles.company__label}>Description:</h2>
            <p className={styles.company__value}>{description}</p>
            <h2 className={styles.company__label}>Type:</h2>
            <p className={styles.company__value}>{type}</p>
            <h2 className={styles.company__label}>Address:</h2>
            <p className={styles.company__value}>{address}</p>
            <h2 className={styles.company__label}>Service of activity:</h2>
            <p className={styles.company__value}>{serviceOfActivity}</p>
          </div>
        </>
      )}
    </>
  );
};

export default CompanyDetail;
