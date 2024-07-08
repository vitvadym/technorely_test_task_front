import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { createCompanySchema } from "../../schemas/companySchema";
import FormTextArea from "../../components/TextArea";
import FormInput from "../../components/Input";
import GoBack from "../../components/GoBack";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hoolks";
import {
  getCompanyById,
  selectError,
  selectIsLoading,
  updateCompany,
} from "../../app/features/company/companySlice";
import { ICompany } from "../../types/company.type";
import Loader from "../../components/Loader";
import toast from "react-hot-toast";
import ErrorMessage from "../../components/ErrorMessage";

type FormData = yup.InferType<typeof createCompanySchema>;

const EditCompany = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);
  const [company, setCompany] = useState<ICompany | null>(null);
  const { id } = useParams();

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(createCompanySchema),
    mode: "all",
  });

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      if (id) {
        const result = await dispatch(getCompanyById(id)).unwrap();
        if (result) {
          setCompany(result);
          reset(result);
        }
      }
    };

    fetchCompanyDetails();
  }, [dispatch, id, reset]);

  const onSubmit = async (data: FormData) => {
    await dispatch(
      updateCompany({
        formData: data,
        id: Number(id),
      }),
    );
    if (isValid && !isLoading) {
      toast.success("Company updated successfully");
      navigate(-1);
    }
  };
  return (
    <>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <GoBack />
          <div className="form">
            <h1 className="form__title">Edit a company</h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="form__content"
            >
              <Controller
                control={control}
                name="name"
                defaultValue={company?.name || ""}
                render={({ field }) => (
                  <FormInput
                    className="form__input"
                    placeholder="Roshen"
                    label="Company name"
                    error={errors.name?.message}
                    {...field}
                  />
                )}
              />
              <Controller
                control={control}
                name="numberOfEmployees"
                defaultValue={company?.numberOfEmployees || 0}
                render={({ field }) => (
                  <FormInput
                    className="form__input"
                    placeholder="24"
                    label="Number of employees"
                    error={errors.numberOfEmployees?.message}
                    {...field}
                  />
                )}
              />
              <Controller
                control={control}
                name="address"
                defaultValue={company?.address || ""}
                render={({ field }) => (
                  <FormInput
                    className="form__input"
                    placeholder="San Francisco, CA 94107"
                    label="Address"
                    error={errors.address?.message}
                    {...field}
                  />
                )}
              />
              <Controller
                control={control}
                name="type"
                defaultValue={company?.type || ""}
                render={({ field }) => (
                  <FormInput
                    className="form__input"
                    placeholder="Type of company"
                    label="Type of company"
                    error={errors.type?.message}
                    {...field}
                  />
                )}
              />
              <Controller
                control={control}
                name="serviceOfActivity"
                defaultValue={company?.serviceOfActivity || ""}
                render={({ field }) => (
                  <FormInput
                    className="form__input"
                    placeholder="Service of activity"
                    label="Service of activity"
                    error={errors.serviceOfActivity?.message}
                    {...field}
                  />
                )}
              />
              <Controller
                control={control}
                name="description"
                defaultValue={company?.description || ""}
                render={({ field }) => (
                  <FormTextArea
                    className="form__input"
                    placeholder="Description"
                    label="Description of company"
                    error={errors.description?.message}
                    {...field}
                  />
                )}
              />
              <button
                type="submit"
                className="form__submit_button"
              >
                Sumbit
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default EditCompany;
