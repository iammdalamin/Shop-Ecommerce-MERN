import axios from "axios";
import cogoToast from "cogo-toast";
import { getToken, setToken, setUserDetails } from "../helpers/SessionHelper";

const AxiosHeader = {
    headers: {
      'Content-Type': 'multipart/form-data',
      token: getToken(),
    }

};
// const BaseURL = "http://localhost:5000/api/v1";
const BaseURL = "https://shop-server-ymqb.onrender.com/api/v1";
export const SignupRequest = async (reqBody) => {
  const URL = BaseURL + "/registration";
  await axios.post(URL, reqBody).then((res) => {
    const { data } = res;
    if (data.status === 400) {
      cogoToast.error(`${data.error}`);
      console.log(data.error);
    } else {
      cogoToast.success("Registration Succesfull");
      console.log(data);
      return true;
    }
  });

  console.log(reqBody);
};

export const LoginRequest = async (reqBody) => {
  const { email, password } = reqBody;

  const URL = BaseURL + "/login";
  await axios
    .post(URL, { email, password })
    .then((res) => {
      const { data } = res;
      console.log(data);
      if (data.status === 400) {
        cogoToast.error(`${data.error}`);
      } else {
        cogoToast.success("Login Succesfull");
        setToken(data.token);
        setUserDetails(data);
        console.log("data==> " + JSON.stringify(data));

        return JSON.stringify(data);
      }
    })
    .catch((err) => {
      cogoToast.error("Login Failed");
      console.log(err);
    });
};

export const UserProfile = async () => {
  const URL = BaseURL + "/selectProfile";
  await axios
    .get(URL, AxiosHeader)
    .then((res) => {
      const { data } = res;
      console.log(data);
      if (data.status === 400) {
        cogoToast.error(`${data.error}`);
      } else {
        console.log("profile-data==> " + JSON.stringify(data));
      }
    })
    .catch((err) => {
      cogoToast.error("Failed to load");
      console.log(err);
    });
};

// Admin Section

export const ProductCreateRequest = async (reqBody) => {
    console.log(reqBody);
  const URL = BaseURL + "/productAdd";
  try {
    await axios.post(URL, reqBody, AxiosHeader).then((res) => {
      const { data } = res;
console.log(data);
      cogoToast.success("Product Add Succesfull",{position:"bottom-left"});
      console.log(data);
      console.log(data.status);
      return true;
    });
  } catch (error) {
    cogoToast.error(`${error}`,{position:"bottom-left"});
    console.log(error);
  }

};
