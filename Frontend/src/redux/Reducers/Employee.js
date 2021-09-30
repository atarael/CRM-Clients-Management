import produce from 'immer';
import createReducer from "./ReducerUtils";


const initialState = {
  employee: {   
    employee_id: '',  
    first_name: '',
    last_name: '',
    email: '',
    phone: '',     
   
  },


}
const employees = {

  setIdEmployee(state, action) {
    state.employee.employee_id = action.payload;
  },
  setFirstNameEmployee(state, action) {
    state.employee.first_name = action.payload;
  },
  setLastNameEmployee(state, action) {
    state.employee.last_name = action.payload;
  },
  setEmailEmployee(state, action) {
    state.employee.email = action.payload;
  },
  setPhoneEmployee(state, action) {
    state.employee.phone = action.payload;
  },
  setEmployee(state, action) {
    state.employee = action.payload;
  },
  

};

export default produce((state, action) => createReducer(state, action, employees), initialState);
