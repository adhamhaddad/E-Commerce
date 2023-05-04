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
      style={style}
      className={`${styles['input-box']} ${isValid ? null : styles['invalid']}`}
    >
      <label htmlFor={id} className={styles['input-box_label']}>
        {label}
      </label>
      <input
        className={styles['input-box_input']}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
};
export default Input;
