import styled from "styled-components/native";

export const ScrollView = styled.ScrollView`
  background-color: #252535;
`;

export const ContainerRate = styled.View`
  flex-direction: row;
  align-items: flex-start;
  text-align: center;
  margin-top: 20px;
  margin-left: 15px;
`;

export const Image = styled.ImageBackground`
  justify-content: flex-end;
  aspect-ratio: 1;
`;

export const Title = styled.Text`
  border-color: #c5c5c5;
  font-size: 25px;
  font-weight: bold;
  margin-left: 15px;
  flex: 3;
  color: #ffffff;
`;

export const Gender = styled.Text`
  border-width: 1px;
  border-radius: 10px;
  border-color: #4b4ea4;
  width: 90px;
  margin-left: 30px;
  text-align: center;
  color: #ffffff;
  font-size: 18px;
`;

export const ViewButton = styled.View`
  padding-bottom: 40px;
  align-items: center;
`;

export const Button = styled.TouchableOpacity`
  background-color: #007fff;
  height: 50px;
  width: 300px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

export const ButtonText = styled.Text`
  font-size: 19px;
  color: #fff;
  font-weight: bold;
  text-align: center;
`;

export const ViewLoading = styled.View`
  flex: 1;
  justify-content: center;
`;

export const Loading = styled.ActivityIndicator``;
