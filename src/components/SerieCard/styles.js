import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

export const SeriesCard = styled.TouchableOpacity`
    width: 50%;
    padding: ${props => (props.isFirstColumn ? '5px 5px 5px 10px' : '5px 10px 5px 5px')};
    height: ${Dimensions.get('window').width / 2}px;
`;

export const Card = styled.View`
    border-width: 1px;
`;

export const Image = styled.Image.attrs(props => ({
    
}))``;

export const CardTitleWrapper = styled.View`
    background-color: black;
    height: 50px;
    position: absolute;
    bottom: 0px;
    opacity: .8;
    width: 100%;
    align-items: center;
    padding: 10px 3px 10px 3px;
`;
export const CardTitle = styled.Text`
    color: white;
    font-size: 15px;
    font-weight: bold;
`;