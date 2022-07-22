import React from "react";

import { Container, Content } from "./styles";

const Line = ({ label = "", content = "-" }) => {
  return (
    <Container>
      <Content>{content}</Content>
    </Container>
  );
};

export default Line;
