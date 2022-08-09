import React from "react";
import { Button } from "../../styles/shared";
import { Header as HeaderWrapper, Title } from "./styles";

const Header = () => {
  return (
    <HeaderWrapper>
      <Title>Interview Calendar</Title>
      <Button>+</Button>
    </HeaderWrapper>
  );
};

export default Header;
