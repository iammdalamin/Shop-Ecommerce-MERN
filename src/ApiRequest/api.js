import axios from "axios";
import { getToken, setToken, setUserDetails } from "../helpers/SessionHelper";
import { SetProducts } from "../redux/Slice/ProductSlice";


const BaseURL = "http://localhost:5000/api/v1";
const AxiosHeader = {
    headers: {
        "Content-Type": "application/json",
        "token":getToken()
    }
}


export const LoginRequest = (email, password) => {
    const URL = BaseURL + "/login";
    let reqBody = { "email": email, "password": password }
    return axios.get(URL, reqBody).then((res) => {
        if (res.status === 200) {
            setToken(res.data["token"])
            setUserDetails(res.data["data"])
            return true
        } else {
            return false
        }
    })
    
    
}


export const ProductList = () => {
    
}

axios.get(BaseURL+"/list").then((res) => {
    console.log(res);
})