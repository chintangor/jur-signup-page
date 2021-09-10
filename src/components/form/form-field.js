import React from "react";
import { ErrorMessage, Field } from "formik";
import PropTypes from "prop-types";

export const FormField = ({
  name,
  type = "text",
  fieldWrapperClass = "input-item",
  label,
  passwordShowComponent,
  isRequired = true,
}) => {
  return (
    <div className="form-item">
      {type === "checkbox" ? (
        <>
          <div className="checkbox-item">
            <Field name={name} type={type} id="check-one" />
            {label}
          </div>
        </>
      ) : (
        <>
          <label htmlFor="">
            {label}
            {isRequired && <sup>*</sup>}
          </label>
          <div className={fieldWrapperClass}>
            <Field type={type} className="form-control" name={name} />
            {passwordShowComponent}
          </div>
        </>
      )}
      <ErrorMessage name={name} component="span" className="form-error" />
    </div>
  );
};

FormField.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  fieldWrapperClass: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  passwordShowComponent: PropTypes.element,
  isRequired: PropTypes.bool,
};
