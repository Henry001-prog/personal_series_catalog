import styled from "styled-components/native";
import { FlatList, ListRenderItemInfo } from 'react-native';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const ViewLoading = styled.View`
  flex: 1;
  justify-content: center;
`;

export const Loading = styled.ActivityIndicator``;

export const Container = styled.View`
  flex: 1;
  background-color: #252535;
  align-items: center;
  justify-content: center;
`;

export const ViewList = (styled.FlatList`
`as unknown) as typeof FlatList;

export const ViewTop = styled.View`
  margin-top: 30%;
`;

export const ViewButton = styled.View`
  align-items: center;
  justify-content: flex-end;
  padding-top: 15%;
  height: 0px;
`;

export const ViewButtonTwo = styled.View`
  align-items: center;
  justify-content: flex-end;
  margin-top: 40%;
  width: 100px;
`;

export const ViewBottom = styled.View`
  margin-bottom: 30px;
`;

export const ViewButtonNew = styled.View`
  width: 22%;
  padding-left: 0.40%;
  border-radius: 100px;
`;

console.warn('Width: ', width);

export const Button = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background-color: #007fff;
  border-radius: 100px;
  height: ${width > 400 ? '12.2%' : '10.8%'};
  width: ${width > 400 ? '20.5%' : '21.5%'};
  top: ${width > 400 ? '-2.8%' : '-2.1%'};
  margin-left: 0.15%;
`;

export const Text = styled.Text`
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  font-weight: bold;
  font-size: 15px;
`;
