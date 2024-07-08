import { useAppDispatch, useAppSelector } from "../../app/hoolks";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { userRegisterShema } from "../../schemas/userShema";
import { IUser, UserRegisterType } from "../../types/user.type";
import { useParams, useNavigate } from "react-router-dom";

import FormInput from "../../components/Input";
import { FieldsProperty } from "../../constants";
import {
  selectError,
  selectIsLoading,
  getUserById,
  updateUser,
} from "../../app/features/user/userSlice";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";
import { useEffect, useState } from "react";
import ErrorMessage from "../../components/ErrorMessage";
import GoBack from "../../components/GoBack";

const EditUser = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const error = useAppSelector(selectError);
  const isLoading = useAppSelector(selectIsLoading);

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userRegisterShema),
    mode: "all",
  });

  useEffect(() => {
    const fetchUser = async () => {
      if (id) {
        const result = await dispatch(getUserById(id)).unwrap();
        if (result) {
          setUser(result);
          reset(result);
        }
      }
    };

    fetchUser();
  }, [dispatch, id, reset]);

  const onSubmit = async (data: UserRegisterType) => {
    await dispatch(
      updateUser({
        formData: data,
        id: Number(id),
      }),
    );
    toast.success("User updated successfully");
    navigate(-1);
  };

  return (
    <>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {isLoading && <Loader />}
      <GoBack />
      <div className="form">
        <h1 className="form__title">Update an account</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="form__content"
        >
          <Controller
            control={control}
            name="firstName"
            defaultValue={user?.firstName || ""}
            render={({ field }) => (
              <FormInput
                className="form__input"
                placeholder={FieldsProperty.NamePlaceholder}
                label={FieldsProperty.LabelFirstName}
                error={errors.firstName?.message}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name={FieldsProperty.LastName}
            defaultValue={user?.lastName || ""}
            render={({ field }) => (
              <FormInput
                className="form__input"
                placeholder={FieldsProperty.LastNamePlaceholder}
                label={FieldsProperty.LabelLastName}
                error={errors.lastName?.message}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name={FieldsProperty.Nickname}
            defaultValue={user?.nickName || ""}
            render={({ field }) => (
              <FormInput
                className="form__input"
                placeholder={FieldsProperty.NickNamePlaceholder}
                label={FieldsProperty.LabelNickname}
                error={errors.nickName?.message}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name={FieldsProperty.Email}
            defaultValue={user?.email || ""}
            render={({ field }) => (
              <FormInput
                className="form__input"
                placeholder={FieldsProperty.EmailPlaceholder}
                label={FieldsProperty.LabelEmail}
                error={errors.email?.message}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name={FieldsProperty.Phone}
            defaultValue={user?.phoneNumber || ""}
            render={({ field }) => (
              <FormInput
                className="form__input"
                placeholder={FieldsProperty.PhonePlaceholder}
                label={FieldsProperty.LabelPhone}
                error={errors.phoneNumber?.message}
                {...field}
              />
            )}
          />

          <Controller
            control={control}
            name={FieldsProperty.Description}
            defaultValue={user?.description || ""}
            render={({ field }) => (
              <FormInput
                className="form__input"
                placeholder={FieldsProperty.DescriptionPlaceholder}
                label={FieldsProperty.LabelDescription}
                error={errors.description?.message}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name={FieldsProperty.Position}
            defaultValue={user?.position || ""}
            render={({ field }) => (
              <FormInput
                className="form__input"
                placeholder={FieldsProperty.PositionPlaceholder}
                label={FieldsProperty.LabelPosition}
                error={errors.position?.message}
                {...field}
              />
            )}
          />

          <button
            type="submit"
            className="form__submit_button"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default EditUser;
