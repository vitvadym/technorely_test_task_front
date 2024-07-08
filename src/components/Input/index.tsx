import { FC, HTMLProps, forwardRef, ForwardedRef } from "react";
// import ErrorMessage from "../ErrorMessage";
import clsx from "clsx";
import ErrorMessage from "../ErrorMessage";

interface Props extends HTMLProps<HTMLInputElement> {
  name: string;
  type?: string;
  placeholder: string;
  className: string;
  label: string;
  error?: string;
}
const FormInput: FC<Props> = forwardRef(
  (props, ref: ForwardedRef<HTMLInputElement>) => {
    const { label, className, error, ...rest } = props;

    return (
      <div>
        <label className="form__label">{label}</label>
        <input
          {...rest}
          ref={ref}
          className={clsx(className, {
            "form__input-error": error,
          })}
        />
        {error && (
          <ErrorMessage className="form__input-error-message">
            {error}
          </ErrorMessage>
        )}
      </div>
    );
  },
);

export default FormInput;
