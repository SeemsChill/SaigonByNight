import React from "react";
import Link from "next/link";
import Image from "next/image";
import styled from "@emotion/styled";
import LogoText from "@/public/logo-text";

const LogoBox = styled.span`
  font-weight: bold;
  font-size: 18px;
  display: inline-flex;
  align-items: center;
  height: 30px;
  line-height: 20px;
  padding: 10px;

  img {
    transform: rotate(10deg);
    transition: 400ms ease;
  }

  svg {
    transition: 400ms ease;
  }

  &:hover img {
    transform: rotate(-20deg);
  }

  &:hover svg {
    transform: rotate(10deg);
  }
`;

const Logo = () => {
  const teacup = `/images/teacup.png`;
  return (
    <Link href="/">
      <a>
        <LogoBox>
          <Image src={teacup} width={55} height={55} alt="logo" />
          <LogoText />
        </LogoBox>
      </a>
    </Link>
  );
};

export default Logo;
