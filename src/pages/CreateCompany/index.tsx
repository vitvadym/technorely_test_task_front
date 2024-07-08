import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { createCompanySchema } from "../../schemas/companySchema";
import { useAppDispatch, useAppSelector } from "../../app/hoolks";
import { useNavigate } from "react-router-dom";
import FormTextArea from "../../components/TextArea";
import FormInput from "../../components/Input";
import GoBack from "../../components/GoBack";
import {
  createCompany,
  selectError,
} from "../../app/features/company/companySlice";
import toast from "react-hot-toast";

type FormData = yup.InferType<typeof createCompanySchema>;

const CreateCompany = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const error = useAppSelector(selectError);

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(createCompanySchema),
    mode: "all",
  });

  const onSubmit = (data: FormData) => {
    dispatch(createCompany(data));

    if (isValid && !error) {
      navigate(-1);
      toast.success("Company created successfully!");
    }
  };

  return (
    <>
      <GoBack />
      <div className="form">
        <h1 className="form__title">Create a company</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="form__content"
        >
          <Controller
            control={control}
            name="name"
            defaultValue=""
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
            defaultValue={0}
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
            defaultValue=""
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
            defaultValue=""
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
            defaultValue=""
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
            defaultValue=""
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
            Create company
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateCompany;
