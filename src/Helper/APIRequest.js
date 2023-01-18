import axios from "axios";
import { SetProducts } from "../redux/Slice/ProductSlice";
import store from "../redux/store";

export const fetchAPI = async() => {
    
    return axios.get("https://fakestoreapi.com/products").then((res) => {
        store.dispatch(SetProducts(res.data))
    })
}

