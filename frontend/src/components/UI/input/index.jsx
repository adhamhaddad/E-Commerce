import React from 'react';
import styles from '../../../styles/input.module.css';

const Input = ({
  id,
  label,
  type,
  placeholder,
  value,
  style,
  isValid,
  onChange,
  onBlur
}) => {
  return (
    <div
      className={`${styles['input-box']} ${isValid ? null : styles['invalid']}`}
    >
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        style={style}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
};
export default Input;
