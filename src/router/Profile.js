import React, { useState } from "react";
import { authService } from "../fbase";
import { useHistory } from "react-router-dom";
import  styled  from 'styled-components';


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: ${(props) => props.theme.textColor};
  position: relative;
  margin-top: 30px;
`;
const Title = styled.span`
text-align: center;
font-size: 22px;
width: 100%;
display: block;
margin-bottom: 20px;

`;
const ProfileForm = styled.form`

`;

const NickInput = styled.input`
 width: 100%;
 border: 1px solid lightgray;
border-radius: 10px;
 padding: 10px 20px;
text-align: center;

`;
const SubInput = styled.input`
margin-top: 10px;
text-align: center;
background-color: ${(props)=> props.theme.blue};
color: white;
width: 100%;
border-radius: 10px;
padding: 7px 0;
cursor: pointer;
`;
const LogOutBtn = styled.span`
color: white;
border-radius: 10px;
margin-top: 5px;
text-align: center;
background-color: ${(props)=> props.theme.red};
padding: 7px 0;
cursor: pointer;
width: 100%;
`;

const Profile = ({ userObj, changeName }) => {
  const [name, setName] = useState(userObj.displayName);
  const history = useHistory();
  const onLogOut = () => {
    authService.signOut();
    history.push("/");
  };
  const onChange = (e) => {
    setName(e.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== name) {
      await userObj.updateProfile({
        displayName: name,
      });
      changeName();
    }
  };
  return (
    <Container>
      <ProfileForm onSubmit={onSubmit}>
      <Title>
       {userObj.displayName ? `${userObj.displayName}의 Profile` : "Profile"} </Title>
        <NickInput
          onChange={onChange}
          type="text"
          autoFocus
          placeholder="원하는 닉네임을 적어주세요"
          value={name}
        />
        <SubInput
          type="submit"
          value="닉네임 변경"
        />
      </ProfileForm>
      <LogOutBtn onClick={onLogOut}>
        LogOut
      </LogOutBtn>
    </Container>
  );
};
export default Profile;
