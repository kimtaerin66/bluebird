import React, { useState } from "react";
import { dbService, storageService } from "../fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  color: ${(props) => props.theme.textColor};
`;
const User = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
  margin-left: 5px;
`;
const Text = styled.div`
  font-size: 20px;
  margin-left: 10px;
  margin-top: 10px;
`;

const TweetDiv = styled.div`
  position: relative;
  border: 1px solid lightgray;
  width: 370px;
  height: 100px;
  border-radius: 10px;
  padding-left: 10px;
  position: relative;
  margin-bottom: 15px;
`;

const TweetDiv2 = styled(TweetDiv)`
 display: flex;
 height: 150px;
 flex-direction: column;
 padding-top: 10px;
 padding-left: 10px;
 
`;
const Fadiv = styled.div`
  position: absolute;
  right: 5px;
  bottom: 10px;
  span {
    margin-right: 10px;
    cursor: pointer;
  }
`;
const UpdateInput = styled.input`
  width: 100%;
  border: 1px solid lightgray;
  border-radius: 10px;
  padding: 10px 20px;
  text-align: center;
`;
const UpateBtn = styled.input`
  cursor: pointer;
  width: 100%;
  border-radius: 20px;
  padding: 7px 20px;
  text-align: center;
  color: white;
  margin: 5px 0;
  background-color: ${(props) => props.theme.blue};
  :hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const CancleBtn = styled.span`
  cursor: pointer;
  text-align: center;
  color: white;
  padding: 7px 20px;
  border-radius: 20px;
  background-color: tomato;
  :hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;
const Img = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 7px;
`;

const Tweet = ({ tweets, userObj }) => {
  const [editing, setEditing] = useState(false);
  const [newOne, setNewOne] = useState(tweets.text);
  const onDelete = async () => {
    const ok = window.confirm("Are you sure?");
    if (ok) {
      //삭제
      await dbService.doc(`tweets/${tweets.id}`).delete();
      if (tweets.fileUrl !== "") {
        await storageService.refFromURL(tweets.fileUrl).delete();
      }
    }
  };
  const toggleEdit = () => setEditing((prev) => !prev);
  const onChange = (e) => {
    setNewOne(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dbService.doc(`tweets/${tweets.id}`).update({
      text: newOne,
    });
    setEditing(false);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <UpdateInput
              onChange={onChange}
              type="text"
              placeholder="수정할 문구를 작성해주세요"
              value={newOne}
              required
              autoFocus
            />
            <UpateBtn type="submit" value="수정하기" />
          </form>
          <CancleBtn onClick={toggleEdit}>Cancle</CancleBtn>
        </>
      ) : (
        <Container>
          <User>
            <span>{userObj.displayName}</span>
          </User>
          {tweets.fileUrl !== "" ? ( //사진있을때
            <TweetDiv2>
              <Img src={tweets.fileUrl} />
              <Text>{tweets.text}</Text>
              <Fadiv>
                <span onClick={onDelete}>
                  <FontAwesomeIcon icon={faTrash} />
                </span>
                <span onClick={toggleEdit}>
                  <FontAwesomeIcon icon={faPencilAlt} />
                </span>
              </Fadiv>
            </TweetDiv2>
          ) : (
          <TweetDiv>
          <Text>{tweets.text}</Text>
            <Fadiv>
              <span onClick={onDelete}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEdit}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </Fadiv>
          </TweetDiv>  )}
        </Container>
      )}
    </div>
  );
};

export default Tweet;
