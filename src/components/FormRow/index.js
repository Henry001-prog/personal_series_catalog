import React from "react";

import { Container } from "./styles";

const FormRow = (props) => {
  const { children, first, last } = props;
  return (
    <Container first={first} last={last}>
      {children}
    </Container>
  );
};

export default FormRow;
