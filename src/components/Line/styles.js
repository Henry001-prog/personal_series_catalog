import styled from "styled-components/native";

export const Container = styled.View`
  flex-direction: row;
  padding-bottom: 3px;
`;

export const CellLabel = styled.Text`
  border-color: #c5c5c5;
  font-size: ${(props) => (props.label > 8 ? "12" : "18")}px;
  padding-left: 5px;
  font-weight: bold;
  flex: 1;
  color: #f0f4f5;
`;

export const Title = styled.Text`
  border-color: #c5c5c5;
  font-size: 25px;
  font-weight: bold;
  padding-left: 5px;
  flex: 3;
  color: #ffffff;
`;

export const Content = styled.Text`
  border-color: #c5c5c5;
  font-size: 18px;
  padding-left: 5px;
  color: #f0f4f5;
`;
