import React from "react";
import { authService } from "../fbase";
import { firebaseOriginal } from "./../fbase";
import AuthForm from "../components/AuthForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter,faGoogle, faGithub} from "@fortawesome/free-brands-svg-icons";
import styled from 'styled-components';


const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: center;
    align-items: center;
`;

const Btns = styled.div`
justify-content: center;
width: 100%;
max-width: 320px;
`;

const Btn = styled.button`
 cursor: pointer;
 border: none;
 font-size: 15px;
 text-align: center;
 width: 320px;
 background: lightgray;
 margin-top: 15px; 
 font-weight: bold;
padding: 10px 0px;
border-radius: 10px;
`;

const Auth = () => {
  const onSocialLogin = async (e) => {
    const {
      target: { name },
    } = e;
    let provider;
    if (name === "google") {
      provider = new firebaseOriginal.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseOriginal.auth.GithubAuthProvider();
    }
    await authService.signInWithPopup(provider);
  };
  return (
    <Container>
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="4x"
        style={{marginBottom: 30}}
      />
      <AuthForm />
      <Btns>
        <Btn onClick={onSocialLogin} name="google" className="authBtn">
        <FontAwesomeIcon 
        icon={faGoogle}
        color={"#EF5350"}
         /> 구글 로그인
        </Btn>
        <Btn onClick={onSocialLogin} name="github" className="authBtn">
        <FontAwesomeIcon icon={faGithub} /> 깃허브 로그인 
        </Btn>
      </Btns>
    </Container>
  );
};

export default Auth;
