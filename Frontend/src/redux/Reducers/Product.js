import produce from 'immer';
import createReducer from "./ReducerUtils";


const initialState = {
  product: {
    insuranceName:"",
    insuranceDescription: "",
    insurancePrice: "",
    insurancePicture: "",
    insuranceId: ""
  },
   
  
}
const products= {
  
  setInsuranceName(state, action) {    
    state.product.insuranceName = action.payload;
  },
  setInsuranceDescription(state, action) {    
    state.product.insuranceDescription = action.payload;
  },
  setInsurancePrice(state, action) {    
    state.product.insurancePrice = action.payload;
  },
  setInsurancePicture(state, action) { 
    state.product.insurancePicture = action.payload;
  },
  setInsuranceId(state, action) {
    state.product.insuranceId = action.payload;
  },

};

export default produce((state, action) => createReducer(state, action, products), initialState);
