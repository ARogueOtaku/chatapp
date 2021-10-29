import { ALERT_TYPES } from "../../hooks/useAlert";

const Alert = ({ message, type, onClose }) => {
  let flavor = ``;
  switch (type) {
    case ALERT_TYPES.ERROR:
      flavor = "text-red-700 bg-red-200 border border-red-700";
      break;
    case ALERT_TYPES.WARNING:
      flavor = "text-yellow-700 bg-yellow-200 border border-yellow-700";
      break;
    default:
      flavor = "text-green-700 bg-green-200 border border-green-700";
      break;
  }
  return (
    <div className={`fixed bottom-3 left-1/2 transform -translate-x-1/2 rounded-md py-1 pl-3 ${flavor}`}>
      <span>{message} </span>
      <strong onClick={onClose} className="text-xs font-bold cursor-pointer pr-3 pl-1 py-2">
        X
      </strong>
    </div>
  );
};

export default Alert;
