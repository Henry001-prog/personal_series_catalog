import styled from "styled-components/native";

export const Container = styled.View.attrs({
  elevation: 1,
})`
  width: 100%;
  background-color: transparent;
  border-radius: 7px;
  margin: 5px 0px 5px 0px;
  margin-top: ${(props) => (props.first ? "50px" : "15px")};
  margin-bottom: ${(props) => (props.last ? "10px" : "5px")};
`;
