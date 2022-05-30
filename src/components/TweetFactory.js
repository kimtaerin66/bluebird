import React, { useState } from "react";
import { dbService, storageService } from "./../fbase";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import styled from 'styled-components';

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 25px;
`;
const Tweet = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 20px;

`;
const TweetInput = styled.input`
    height: 40px;
    width: 320px;
    border: 1px solid #04aaff;
    border-radius: 10px;
    font-weight: 500;
    font-size: 14px;
    padding-left: 10px;
    margin-right: 0px;
`;
const SubmitInput = styled.input`
 background-color: ${(props)=> props.theme.blue};
 padding: 10px 0px;
 text-align: center;
 border-radius: 10px;
 color: ${(props)=> props.theme.bgColor};
 height: 40px;
 width: 60px;
 cursor: pointer;
`;

const AttachBtn = styled.label`
cursor: pointer;
border: 1px solid lightgray;
padding: 10px;
border-radius: 5px;
:hover {
background-color: #333;
color: white;
}
`;

const Img = styled.img`
    height: 180px;
    width: 150px;
    margin-bottom: 20px;
`;
const AttachPhoto = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;
const Remove = styled.div`
    cursor: pointer;
    text-align: center;
    background-color: rgba(0,0,0,0.1);
    padding: 5px 0;
    border-radius: 3px;
    span {
      margin-right:5px;
    }`;

const TweetFactory = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [file, setFile] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    if (tweet === "") { return; } 
     let fileUrl = "";
    if (file !== "") {
      //사진이 있다면
      const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
      const response = await fileRef.putString(file, "data_url");
      fileUrl = await response.ref.getDownloadURL();
    }
    const tweetObj = {
      text: tweet, //state와 같은 tweet
      createdAt: Date.now(),
      createdId: userObj.uid,
      fileUrl,
    };
    await dbService.collection("tweets").add(tweetObj);
    setTweet(""); //비우기
    setFile("");
  };
  const onChange = (e) => {
    setTweet(e.target.value);
  };
  const onFileChange = (e) => {
    const img = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onloadend = (finishedEvent) => {
      setFile(finishedEvent.currentTarget.result);
    };
  };
  const onClearFile = () => {
    setFile("");
  };
  return (
    <Form onSubmit={onSubmit} >
      <Tweet >
        <TweetInput
          value={tweet}
          onChange={onChange}
          type="text"
          placeholder="지금 무슨일이 일어나고 있나요?"
          maxLength={140}
        />
        <SubmitInput type="submit" value="Tweet"  />
      </Tweet>
      <AttachBtn htmlFor="attach-file" >
        <span>사진 올리기</span>
        <FontAwesomeIcon icon={faPlus} />
      </AttachBtn>
      <input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={onFileChange}
        style={{
          opacity: 0,
        }}
      />
      {file && (
        <AttachPhoto >
          <Img
            src={file}
           
          />
          <Remove onClick={onClearFile}>
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </Remove>
        </AttachPhoto>
      )}
    </Form>
  );
};
export default TweetFactory;
