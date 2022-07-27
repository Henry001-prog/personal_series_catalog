import styled from "styled-components/native";

interface Props {
  children: React.ReactNode
  first?: boolean
  last?: boolean
}

export const Container = styled.View<Props>`
  width: 100%;
  background-color: transparent;
  margin: 5px 0px 5px 0px;
  margin-top: ${(props) => (props.first ? "50px" : "15px")};
  margin-bottom: ${(props) => (props.last ? "10px" : "5px")};
`;
