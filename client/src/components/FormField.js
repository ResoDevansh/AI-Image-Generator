import React from "react";
import "./FormField.css";

const FormField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
}) => {
  return (
    <div className="form-field">
      <div className="labelandbutton">
        <label htmlFor="name">{labelName}</label>
        {isSurpriseMe && (
          <button type="button" onClick={handleSurpriseMe} className="btn">
            Surprise Me
          </button>
        )}
      </div>
      <input
        className="form-input"
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
      />
    </div>
  );
};

export default FormField;
