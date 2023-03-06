import React, { useState } from "react";
import { useNavigate } from "react-router";
import { LoginRequest } from "../ApiRequest/api";
import { getUserDetails } from "../helpers/SessionHelper";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleOnSubmit = async () => {
    await LoginRequest({
      email,
      password,
    });
    const user = await getUserDetails();

    if (user) {
      setEmail("");
      setPassword("");
      navigate("/");
      console.log("LoginRequest==>" + user.toString());
      window.location.reload(true);
    } else {
      console.log(false);
    }
  };

  // useEffect(() => {
  //   const user = getUserDetails();

  //   if (user) {
  //     setEmail("");
  //     setPassword("");
  //     navigate("/");
  //     console.log("LoginRequest==>" + user);
  //   } else {
  //     console.log("err");
  //   }
  // }, []);

  return (
    <div className="w-full h-full flex justify-center items-center ">
      <div className="w-[450px] h-full bg-slate-600 mt-48 p-8 rounded-md">
        <h2 className="text-3xl text-white text-center font-bold ">Login</h2>
        <div className="flex flex-col gap-4 px-14 py-8">
          <input
            type="email"
            placeholder="Email"
            className="p-2 rounded-md"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 rounded-md"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleOnSubmit}
            className="px-5 py-2 bg-gray-50 hover:bg-slate-800 hover:text-gray-50 duration-700"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
