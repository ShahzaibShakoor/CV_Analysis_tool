function Button({ children, classes, handleClick, type }) {
  return (
    <button
      type={type}
      onClick={handleClick}
      className={`text-white  font-semibold  ${classes}`}
    >
      {children}
    </button>
  );
}

export default Button;
