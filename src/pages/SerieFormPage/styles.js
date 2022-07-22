import styled from "styled-components/native";
import { Dimensions, PixelRatio, Platform } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const scale = SCREEN_WIDTH / 320;
const width = Dimensions.get("window").width;

export const KeyboardAvoidingView = styled.KeyboardAvoidingView``;

export const ScrollView = styled.ScrollView`
  background-color: #252535;
  padding-top: 20%;
`;

export const TextInput = styled.TextInput`
  padding-left: 15px;
  padding-bottom: 5px;
  border-color: transparent;
  width: ${width < 321 ? "285px" : "339px"};
  border-radius: 10px;
  background-color: #dce4f5;
  opacity: 0.7;
  align-items: center;
  color: #2b2c2e;
  font-size: 17px;
  height: 55px;
`;

export const TextArea = styled.TextInput`
  padding-left: 15px;
  padding-bottom: 5px;
  border-color: transparent;
  width: ${width < 321 ? "285px" : "339px"};
  border-radius: 10px;
  background-color: #dce4f5;
  opacity: 0.7;
  align-items: center;
  color: #2b2c2e;
  font-size: 17px;
`;

export const Image = styled.Image`
  aspect-ratio: 1;
  width: 100%;
`;

export const ImageBackground = styled.ImageBackground`
  height: 350px;
  width: 336px;
  border-width: 1px;
  margin-top: 30px;
`;

export const ViewRate = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
`;

export const TextRate = styled.Text``;

export const ViewButton = styled.View`
  align-items: center;
  justify-content: center;
  padding-top: 30px;
  padding-bottom: 19px;
`;

export const ViewButtonImage = styled.View`
  align-items: center;
  justify-content: center;
  padding-top: 25px;
  padding-bottom: 35px;
`;

export const ViewText = styled.View`
  align-items: center;
  justify-content: center;
  height: 50px;
`;

export const Button = styled.TouchableOpacity`
  align-self: stretch;
  justify-content: center;
  align-items: center;
  background-color: #007fff;
  border-radius: 10px;
  height: 50px;
  width: 339px;
`;

export const ViewButtonClean = styled.View`
  margin-top: 20px;
  margin-bottom: 40%;
`;

export const ButtonClean = styled.TouchableOpacity`
  align-self: stretch;
  justify-content: center;
  align-items: center;
  background-color: #007fff;
  border-radius: 10px;
  height: 50px;
  width: 339px;
  background-color: #8b0000;
`;

export const Loading = styled.ActivityIndicator``;

export const Text = styled.Text`
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  font-weight: bold;
  font-size: 15px;
`;
