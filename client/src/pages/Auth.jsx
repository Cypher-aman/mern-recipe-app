import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Auth = function () {
  return (
    <div className="flex w-screen justify-center items-center h-screen gap-4 bg-green-100">
      <Login />
      <Register />
    </div>
  );
};

const Login = function () {
  const [inputFields, setInputFields] = useState({
    username: "",
    password: "",
  });

  const [cookies, setCookie] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFields = { ...inputFields };
    newFields[name] = value;
    setInputFields(newFields);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8081/auth/signin", {
        username: inputFields.username,
        password: inputFields.password,
      });

      if (!response.data.token) {
        alert(response.data.message);
        return;
      }

      setCookie("access_token", response.data.token);
      window.localStorage.setItem("userId", response.data.userId);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <Form
        inputFields={inputFields}
        handleChange={handleChange}
        label="Login"
        onSubmit={onSubmit}
      ></Form>
    </>
  );
};

const Register = function () {
  const [inputFields, setInputFields] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFields = { ...inputFields };
    newFields[name] = value;
    setInputFields(newFields);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8081/auth/signup", {
        username: inputFields.username,
        password: inputFields.password,
      });

      alert(response.data.message);
      setInputFields({
        username: "",
        password: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form
      inputFields={inputFields}
      handleChange={handleChange}
      label="Register"
      onSubmit={onSubmit}
    ></Form>
  );
};

const Form = function ({ inputFields, handleChange, onSubmit, label }) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col justify-center items-center gap-2 p-4  bg-green-300 min-w-[340px]"
    >
      <h2 className="mb-4 font-bold text-2xl">{label}</h2>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        id="username"
        onChange={handleChange}
        value={inputFields.username}
        className="border border-black p-1 rounded-sm outline-none"
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        onChange={handleChange}
        value={inputFields.password}
        className="border border-black p-1 rounded-sm outline-none"
      />
      <button
        type="submit"
        className="border border-black bg-black p-1 rounded-sm text-white"
      >
        {label}
      </button>
    </form>
  );
};

export default Auth;
