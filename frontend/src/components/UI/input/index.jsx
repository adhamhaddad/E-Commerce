import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import styles from '@styles/input.module.css';

const Input = forwardRef(
  (
    {
      id,
      label,
      type,
      placeholder,
      value,
      style,
      error,
      isValid,
      onChange,
      onBlur
    },
    ref
  ) => {
    const inputRef = useRef(null);
    useImperativeHandle(ref, () => ({
      resetValue() {
        if (inputRef.current) {
          inputRef.current.value = '';
        }
      }
    }));
    return (
      <div
        style={style}
        className={`${styles['input-box']} ${
          isValid ? null : styles['invalid']
        }`}
      >
        <label htmlFor={id} className={styles['input-box_label']}>
          {label}
        </label>
        <input
          className={styles['input-box_input']}
          type={type}
          ref={inputRef}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
        {error && <p className={styles['error']}>{error}</p>}
      </div>
    );
  }
);

export default Input;
