import React from 'react';

const Button = ({ text, children, type, style, onClick }) => {
  return (
    <button type={type} style={style} onClick={onClick}>
      {text} {children}
    </button>
  );
};
export default Button;
