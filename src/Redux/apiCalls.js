import { loginFailure, loginStart, loginSuccess,logOut } from "./userRedux"
import { publicRequest } from "../requestMethod";

export const login = async(dispatch,user)=>{
    dispatch(loginStart());
    try{
        const res = await publicRequest.post("auth/login",user);
        if(res.data.error){
            alert(res.data.message);
        }
        dispatch(loginSuccess(res.data));
    }
    catch(err){
        dispatch(loginFailure());
    }
}

export const loggingOut = async(dispatch)=>{
    dispatch(logOut());
}