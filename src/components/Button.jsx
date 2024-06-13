function Button({ children, classes, handleClick, type, textColor = 'white' }) {
  return (
    <button
      type={type}
      onClick={handleClick}
      className={`text-${textColor}  font-semibold  ${classes}`}
    >
      {children}
    </button>
  );
}

export default Button;
