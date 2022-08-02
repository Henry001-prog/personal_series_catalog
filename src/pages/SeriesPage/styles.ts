import styled from "styled-components/native";
import { FlatList, ListRenderItemInfo } from 'react-native';

export const ViewLoading = styled.View`
  flex: 1;
  justify-content: center;
`;

export const Loading = styled.ActivityIndicator``;

export const Container = styled.View`
  flex: 1;
  background-color: #252535;
`;

export const ViewList = (styled.FlatList``as unknown) as typeof FlatList;

export const ViewTop = styled.View`
  margin-top: 30%;
`;

export const ViewBottom = styled.View`
  margin-bottom: 30px;
`;
