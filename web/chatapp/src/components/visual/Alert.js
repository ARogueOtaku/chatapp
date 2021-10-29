const Alert = ({ message, color, onClose }) => {
  return (
    <div
      className={`fixed bottom-3 mx-auto rounded-md py-1 pl-3 text-${color}-700 bg-${color}-200 border border-${color}-700`}
    >
      <span>{message} </span>
      <strong onClick={onClose} className="text-xs font-bold cursor-pointer pr-3 pl-1 py-2">
        X
      </strong>
    </div>
  );
};

export default Alert;
