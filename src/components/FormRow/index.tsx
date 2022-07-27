import React from "react";

import { Container } from "./styles";

interface Props {
  children: React.ReactNode
  first?: boolean
  last?: boolean
}

const FormRow = ({ children, first, last }: Props) => {
  return (
    <Container first={first} last={last}>
      {children}
    </Container>
  );
};

export default FormRow;
