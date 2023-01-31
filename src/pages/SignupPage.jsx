import React, { useState } from "react";
import { useNavigate } from "react-router";
import { SignupRequest } from "../ApiRequest/api";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const handleOnSubmit = () => {
    SignupRequest({
      name,
      email,
      password,
      address,
    });
    navigate("/login");
  };

  return (
    <div className="w-full h-full flex justify-center items-center ">
      <div className="w-[550px] h-full bg-slate-600 mt-48 p-8">
        <h2 className="text-3xl text-white text-center font-bold ">Sign Up</h2>
        <div className="flex flex-col gap-4 px-14 py-8">
          <input
            type="name"
            placeholder="Fullname"
            className="p-2 rounded-md"
            onChange={(e) => setName(e.target.value)}
          />
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
          <input
            type="text"
            placeholder="Address"
            className="p-2 rounded-md"
            onChange={(e) => setAddress(e.target.value)}
          />
          <button
            onClick={handleOnSubmit}
            className="px-5 py-2 bg-gray-50 hover:bg-slate-800 hover:text-gray-50 duration-700"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
