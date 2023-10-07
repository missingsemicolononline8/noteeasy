import AlertContext from "./AlertContext";


const AlertState = (props) => {

    
  return (
    <AlertContext.Provider value={props.value}>
        {props.children}
    </AlertContext.Provider>
  )
}

export default AlertState