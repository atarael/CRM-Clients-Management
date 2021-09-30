import produce from 'immer';
import createReducer from "./ReducerUtils";


const initialState = {
  client: {
    _id:'',
    client_id: '',
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    phone_number: '',
    start_connection_date: '',
    year_of_birth: '',
  },


}
const clients = {

  setId(state, action) {
    state.client.client_id = action.payload;
  },
  setFirstName(state, action) {
    state.client.first_name = action.payload;
  },
  setLastName(state, action) {
    state.client.last_name = action.payload;
  },
  setEmail(state, action) {
    state.client.email = action.payload;
  },
  setMobile(state, action) {
    state.client.phone_number = action.payload;
  },
  setGender(state, action) {
    state.client.gender = action.payload;
  },
  setAge(state, action) {
    state.client.year_of_birth = action.payload;
  },
  setConnectionDate(state, action) {
    state.client.start_connection_date = action.payload;
  },
  setClient(state, action) {
    
    state.client = action.payload;
  },
};

export default produce((state, action) => createReducer(state, action, clients), initialState);
