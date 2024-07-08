import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hoolks";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { userRegisterShema } from "../../schemas/userShema";
import { UserRegisterType } from "../../types/user.type";
import { useNavigate } from "react-router-dom";

import FormInput from "../../components/Input";
import { FieldsProperty, Toast } from "../../constants";
import {
  clearError,
  registerUser,
  selectError,
  selectIsLoading,
  selectUser,
} from "../../app/features/user/userSlice";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";
import { useEffect } from "react";

const SignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useAppSelector(selectError);
  const isLoading = useAppSelector(selectIsLoading);
  const user = useAppSelector(selectUser);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userRegisterShema),
    mode: "all",
  });

  const onSubmit = (data: UserRegisterType) => {
    dispatch(registerUser(data));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);

      return () => {
        dispatch(clearError());
      };
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (user) {
      toast.success(Toast.SUCCESS_SIGNUP);
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <>
      {isLoading && <Loader />}
      <div className="form">
        <h1 className="form__title">Create an account</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="form__content"
        >
          <Controller
            control={control}
            name="firstName"
            defaultValue=""
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
            defaultValue=""
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
            defaultValue=""
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
            defaultValue=""
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
            defaultValue=""
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
            defaultValue=""
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
            defaultValue=""
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

          <Controller
            control={control}
            name={FieldsProperty.Password}
            defaultValue=""
            render={({ field }) => (
              <FormInput
                className="form__input"
                placeholder={FieldsProperty.PasswordPlaceholder}
                label={FieldsProperty.LabelPassword}
                error={errors.password?.message}
                {...field}
              />
            )}
          />

          <button
            type="submit"
            className="form__submit_button"
          >
            Create an account
          </button>
          <p className="form__existing_account">
            Already have an account?{" "}
            <Link
              className="form__link"
              to="/signin"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default SignUp;
