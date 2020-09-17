import {combineReducers} from 'redux';

const userLoginReducer = (userRole= {} , action)=>{
    if(action.type === 'USER_ROLE'){
        
        return action.payload;
    }

    return userRole;
}

export default combineReducers({
    loginReducer:userLoginReducer
});