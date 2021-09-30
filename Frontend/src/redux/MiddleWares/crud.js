import { actions } from '../actions';

export const add$ToCompanyName = ({ dispatch, getState }) => next => action => {
    // ;
    if (action.type === 'ADD$_TO_COMPANY_NAME') {
       var userName= getState().userReducer.user.firstName
        var newCompany = userName+" " + action.payload;
        dispatch(actions.setCompanyName(newCompany));

    }
    // remeber!!!!!!!!!!!
    return next(action);
};