import React, { useState } from "react";
import { authService } from "../fbase";
import styled from "styled-components";

const Input = styled.input`
  max-width: 320px;
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  height: 45px;
  margin-bottom: 10px;
  border: 1px solid lightgray;
`;

const SubmitInput = styled.input`
  background-color: ${(props) => props.theme.blue};
  color: ${(props) => props.theme.bgColor};
  cursor: pointer;
  height: 35px;
  font-size: 14px;
  border-radius: 10px;
  margin-top: 10;
  text-align: center;
`;

const Error = styled.span`
  margin-top: 7px;
  color: tomato;
  text-align: center;
  font-size: 14px;
`;

const Toggle = styled.span`
  color: ${(props) => props.theme.blue};
  cursor: pointer;
  margin-top: 20px;
  margin-bottom: 30px;
  display: block;
  font-size: 15px;
  text-decoration: underline;
`;

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const onChange = (e) => {
    //name을 주어 값 구분하기
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (newAccount) {
        //계정 만들기
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        //로그인
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  };
  return (
    <>
      <form onSubmit={onSubmit} className="container">
        <Input
          name="email"
          type="email"
          value={email}
          placeholder="Email"
          required
          onChange={onChange}
        />
        <Input
          name="password"
          type="password"
          value={password}
          placeholder="Password"
          required
          onChange={onChange}
        />
        <SubmitInput
          type="submit"
          value={newAccount ? "계정 만들기" : "로그인"}
        />
        {error && <Error>{error}</Error>}
      </form>
      <Toggle onClick={toggleAccount} >
        {newAccount ? "로그인" : "계정 만들기"}
      </Toggle>
    </>
  );
};

export default AuthForm;
