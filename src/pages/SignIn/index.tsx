import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../app/hoolks";

import { FieldsProperty, Toast } from "../../constants";
import FormInput from "../../components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { userLoginShema } from "../../schemas/userShema";
import { UserLoginType } from "../../types/user.type";
import {
  clearError,
  loginUser,
  selectError,
  selectIsAuth,
  selectIsLoading,
} from "../../app/features/user/userSlice";
import toast from "react-hot-toast";
import { useEffect } from "react";
import Loader from "../../components/Loader";

const SignIn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const error = useAppSelector(selectError);
  const isLoading = useAppSelector(selectIsLoading);
  const isAuthenticated = useAppSelector(selectIsAuth);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userLoginShema),
    mode: "all",
  });

  const onSubmit = async (data: UserLoginType) => {
    await dispatch(loginUser(data));
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
    if (isAuthenticated) {
      toast.success(Toast.SUCCESS_SIGIN);
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="form">
          <h1 className="form__title">Sign In</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="form__content"
          >
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

            <button className="form__submit_button">Login</button>
            <p className="form__existing_account">
              Do not have an account?{" "}
              <Link
                className="form__link"
                to="/signup"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default SignIn;
