import styled from "styled-components/native";
import { Container } from "../../components/FormRow/styles";
import { Dimensions, TextInput, PixelRatio, Platform } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const scale = SCREEN_WIDTH / 320;
const width = Dimensions.get("window").width;

export const Div = styled.View.attrs({
  paddingHorizontal: 20,
})`
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-left: 10px;
  padding-right: 10px;
  background-color: #252535;
`;

export const Form = styled(Container)`
  align-items: center;
  background-color: transparent;
  border-radius: 9px;
  border-color: transparent;
  width: 330px;
`;

export const Input = styled(TextInput).attrs({
  elevation: 4,
})`
  padding-left: 15px;
  padding-bottom: 5px;
  border-color: transparent;
  width: ${width < 321 ? "285px" : "330px"};
  border-radius: 7px;
  background-color: #dce4f5;
  opacity: 0.7;
  align-items: center;
  color: #2b2c2e;
  font-size: 17px;
  height: 60px;
`;

export const Loading = styled.ActivityIndicator``;

export const Button = styled.TouchableOpacity`
  justify-content: center;
  margin-top: 50px;
  align-items: center;
  border-radius: 10px;
  width: 339px;
  background-color: #007fff;
  height: 55px;
  border: 1px solid #d0d0d0;
`;

export const TextButton = styled.Text`
  font-size: 17px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  color: white;
`;

export const ViewErrorMessage = styled.View`
  margin-top: 30px;
  padding-top: 3px;
  border-radius: 9px;
  background-color: #252535;
  height: 5%;
  width: 45%;
  align-items: center;
`;

export const ErrorMessage = styled.Text`
  align-items: center;
  color: white;
`;
