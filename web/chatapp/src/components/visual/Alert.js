const Alert = ({ message, color, onClose }) => {
  const className = `fixed bottom-3 left-1/2 transform -translate-x-1/2 rounded-md py-1 pl-3 text-${color}-700 bg-${color}-200 border border-${color}-700`;
  return (
    <div className={`${className}`}>
      <span>{message} </span>
      <strong onClick={onClose} className="text-xs font-bold cursor-pointer pr-3 pl-1 py-2">
        X
      </strong>
    </div>
  );
};

export default Alert;
