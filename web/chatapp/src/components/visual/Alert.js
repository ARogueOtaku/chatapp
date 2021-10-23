const Alert = ({ message, type }) => {
  return (
    <span>
      <strong>{type}:</strong> {message}
    </span>
  );
};

export default Alert;
