import AlertContext from "./AlertContext";
import toastr from "toastr";

const AlertState = (props) => {
  const setAlerts = ({ type, message }) => {
    toastr[type](message, null, {
        timeOut: 2000,
        progressBar: true,
        positionClass: "toast-bottom-right",
    });
}  

  return (
    <AlertContext.Provider value={setAlerts}>
        {props.children}
    </AlertContext.Provider>
  )
}

export default AlertState