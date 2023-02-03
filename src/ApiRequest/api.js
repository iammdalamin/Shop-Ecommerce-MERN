import axios from "axios";
import cogoToast from "cogo-toast";
import { getToken, setToken, setUserDetails } from "../helpers/SessionHelper";
import { SetProducts } from "../redux/Slice/ProductSlice";
import store from "../redux/store";

const AxiosHeader = {
    "Content-Type": "application/json",
    "token":getToken()
}
const BaseURL = "http://localhost:5000/api/v1"

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
            return true
        }
        
    })

    console.log(reqBody);
}

export const LoginRequest = async (reqBody) => {
    const { email, password } = reqBody;

    const URL = BaseURL + "/login"
    await axios.post(URL, {email, password}).then((res) => {
        const { data } = res;
        console.log(data);
        if (data.status === 400) {
            cogoToast.error(`${data.error}`)
            
        } else {
            cogoToast.success("Login Succesfull")
            setToken(data.token)
            setUserDetails(data)
            console.log("data==> " + JSON.stringify(data));

            return JSON.stringify(data);
        }
        
    }).catch((err) => {
        cogoToast.error("Login Failed")
        console.log(err);

    })

}

export const ProductListRequest = async () => {

    const URL = BaseURL + "/list"
    await axios.get(URL).then((res) => {
        const { data } = res;
        if (data.status === 400) {
            cogoToast.error(`${data.error}`)
            
        } else {
            const products = data
            products.map((prod) => {
                store.dispatch(SetProducts(prod)) 

          })

        }
        
    }).catch((err) => {
        cogoToast.error("Failed to load")
        console.log(err);

    })

}

export const singleProduct = async (productId) => {

    const URL = BaseURL + `/product/${productId}`
    await axios.get(URL).then((res) => {
        console.log("res"+res);
        const { data } = res;
        if (data.status === 400) {
            cogoToast.error(`${data.error}`)
            
        } else {
            const product = data
            console.log("data=>" +product);
            return product

        }
        
    }).catch((err) => {
        cogoToast.error("Failed to load")
        console.log(err);

    })

}

export const UserProfile = async () => {

    const URL = BaseURL + "/selectProfile"
    await axios.get(URL, AxiosHeader).then((res) => {
        const { data } = res;
        console.log(data);
        if (data.status === 400) {
            cogoToast.error(`${data.error}`)
            
        } else {
          
            console.log("profile-data==> " + JSON.stringify(data));

        }
        
    }).catch((err) => {
        cogoToast.error("Failed to load")
        console.log(err);

    })

}
