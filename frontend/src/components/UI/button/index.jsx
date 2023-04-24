import React from 'react';

const Button = ({ children, label, type, style, onClick }) => {
  return (
    <button type={type} style={style} onClick={onClick}>
      {children}
    </button>
  );
};
export default Button;
