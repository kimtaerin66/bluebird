import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import  styled  from 'styled-components';

const Nav = styled.nav`
  position: relative;
  margin-top: 100px;
`;

const Ul =styled.ul`
position:absolute;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
left: -120px;
top: 30px;
`;
const Li =styled.li`
margin-bottom:30px;

`;

const Navigation = ({ userObj }) => {
  return (
    <Nav >
      <Ul>
        <Li>
          <Link to="/" >
            <FontAwesomeIcon icon={faTwitter} size="2x" color="#04aaff"  />
          </Link>
        </Li>
        <Li>
          <Link to="/profile" >
            <FontAwesomeIcon icon={faUser} color="#04aaff" size="2x"   />
          </Link>
        </Li>
      </Ul>
    </Nav>
  );
};

export default Navigation;
