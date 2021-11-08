import React from "react";
import styled from "@emotion/styled";
import { keyframes, css } from "@emotion/react";
import SignInSVG from "../../public/signin.js";

const bounce = keyframes`
 0% {
        transform: translateY(0);
    }

    100% {
        transform: translateY(-5%);
    } 
`;

const SvgBox = styled.div`
  svg {
    animation: ${bounce} 1s ease infinite alternate;
  }
`;

const SignInMotion = () => {
  return (
    <SvgBox>
      <SignInSVG />
    </SvgBox>
  );
};

export default SignInMotion;
