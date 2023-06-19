import React, {
  useState,
  useRef,
  useImperativeHandle,
  forwardRef
} from 'react';
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
      disabled,
      contentEditable,
      isValid,
      onChange,
      onBlur
    },
    ref
  ) => {
    const [visible, setVisible] = useState(false);
    const inputRef = useRef(null);

    const handlePasswordVisibility = () => {
      setVisible((prev) => !prev);
    };

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
        <div className={styles['input-container']}>
          <input
            className={styles['input-box_input']}
            type={visible ? 'text' : type}
            ref={inputRef}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
          />
          {type === 'password' && (
            <i
              className={`fa-solid ${visible ? 'fa-eye-slash' : 'fa-eye'}`}
              onClick={handlePasswordVisibility}
            ></i>
          )}
        </div>
        {error && <p className={styles['error']}>{error}</p>}
      </div>
    );
  }
);

export default Input;
