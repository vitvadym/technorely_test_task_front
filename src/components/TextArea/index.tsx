import { FC, HTMLProps, forwardRef, ForwardedRef } from "react";
import clsx from "clsx";
import ErrorMessage from "../ErrorMessage";

interface Props extends HTMLProps<HTMLTextAreaElement> {
  name: string;
  type?: string;
  placeholder: string;
  className: string;
  label: string;
  error?: string;
}
const FormTextArea: FC<Props> = forwardRef(
  (props, ref: ForwardedRef<HTMLTextAreaElement>) => {
    const { label, className, error, ...rest } = props;

    return (
      <div>
        <label className="form__label">{label}</label>
        <textarea
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

export default FormTextArea;
