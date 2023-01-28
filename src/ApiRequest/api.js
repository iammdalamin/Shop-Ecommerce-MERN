import axios from "axios";
import cogoToast from "cogo-toast";
import { getToken, setToken, setUserDetails } from "../helpers/SessionHelper";
import { SetProducts } from "../redux/Slice/ProductSlice";
import store from "../redux/store";

const AxiosHeader = {
    "content-type": "application/json",
    "token":getToken()
}

const BaseURL = "http://localhost:5000/api/v1"

export const fetchAPI = async() => {
    
    await axios.get("https://fakestoreapi.com/products").then((res) => {
        console.log(res.data);
        store.dispatch(SetProducts(res.data))
    })
}

export const SignupRequest =  async(reqBody) => {
    const URL = BaseURL + "/registration"
    await axios.post(URL, reqBody).then((res) => {
        const { data } = res;
        if (data.status === 400) {
            cogoToast.error(`${data.error}`)
            console.log(data.error);

        } else {
            cogoToast.success("Registration Succesfull")
            console.log(data);
        }
        
    })

    console.log(reqBody);
}

export const LoginRequest = async (reqBody) => {
    const { email, password } = reqBody;
    console.log(email);

    const URL = BaseURL + "/login"
    await axios.get(URL, {email, password}).then((res) => {
        const { data } = res;
        if (data.status === 400) {
            cogoToast.error(`${data.error}`)
            console.log( data);
            
        } else {
            cogoToast.success("Login Succesfull")
            setToken(data.token)
            setUserDetails(data)
            console.log("data: " + data);
        }
        
    })

}