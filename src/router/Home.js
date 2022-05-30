import React, { useState, useEffect } from "react";
import TweetFactory from "../components/TweetFactory";
import Tweet from "../components/Tweet";
import { dbService } from "./../fbase";
import styled from 'styled-components';

const Container = styled.div`
 display: flex;
 justify-content: center;
 align-items: center;
 flex-direction: column;
 color: ${(props)=> props.theme.textColor};
 background-color: ${(props)=> props.theme.bgColor};
`;

const Home = ({ userObj }) => {
  const [tweets, setTweets] = useState([]);
  useEffect(() => {
    dbService.collection("tweets").onSnapshot((snapshot) => {
      const tweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTweets(tweetArr);
    });
  }, []);
  return (
    <Container>
      <TweetFactory userObj={userObj} />
      <div>
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweets={tweet}
            userObj={userObj}
            // isOwner={tweet.createdId === userObj.id}
          />
        ))}
      </div>
    </Container>
  );
};
export default Home;
