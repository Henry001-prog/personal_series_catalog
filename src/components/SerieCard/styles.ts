import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { SeriesType } from "../../interfaces/seriesType";

interface FirstColumn {
  onPress: any
  isFirstColumn: boolean
}

interface ISerie {
  serie: string
  aspectRatio: number
}

export const SeriesCard = styled.TouchableOpacity<FirstColumn>`
  width: 50%;
  padding: ${(props) =>
    props.isFirstColumn ? "5px 5px 5px 10px" : "5px 10px 5px 5px"};
  height: ${Dimensions.get("window").width / 2}px;
`;

export const Card = styled.View`
  border-width: 1px;
  border-radius: 10px;
`;

export const Image = styled.Image<ISerie>`
  border-radius: 10px;
`;

export const CardTitleWrapper = styled.View`
  background-color: black;
  height: 40px;
  position: absolute;
  bottom: 0px;
  opacity: 0.8;
  width: 100%;
  align-items: center;
  padding: 10px 3px 10px 3px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;
export const CardTitle = styled.Text`
  color: white;
  font-size: 15px;
  font-weight: bold;
`;
