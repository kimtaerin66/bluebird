import React, { useState,useEffect } from "react";
import AppRouter from './Router';
import {authService} from '../fbase';
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@font-face {
    font-family: 'GmarketSansBold';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansBold.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
@font-face {
    font-family: 'GmarketSansLight';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansLight.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
@font-face {
    font-family: 'GmarketSansMedium';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
font-size: 14px;

body {
  font-family: 'GmarketSansMedium';
  width: 800px;
  display: flex;
  justify-content: center;
  margin: 0 auto;
}
`;

function App() {
  const [ init, setInit ] = useState(false);
  const [isLoggenIn, setIsLoggedIn] = useState(false);
  const [ userObj, setUserObj ] = useState(null);
  useEffect(()=> {
  authService.onAuthStateChanged((user) =>{
    if(user){
      setIsLoggedIn(true);
      setUserObj({
        displayName: user.displayName,
        uid: user.uid,
        updateProfile: (name) => user.updateProfile(name),
      });//변경
    }else {
      setUserObj(null);
    }
    setInit(true)
  });
  },[]);
  const changeName = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (name) => user.updateProfile(name),
    });
  };
  return (
    <>
    <GlobalStyle />
   {init ? <AppRouter changeName={changeName} isLoggenIn={isLoggenIn} userObj={userObj}/> :
   "Initializing.. " }
   </>
  );
}

export default App;

//isLoggenIn prop으로 전달하기
