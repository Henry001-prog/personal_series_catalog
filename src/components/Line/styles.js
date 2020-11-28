import styled from 'styled-components/native';

export const Container = styled.View`
    flex-direction: row;
    padding-top: 3;
    padding-bottom: 3;
    border-width: 1;
    border-color: #C5C5C5;
`;

export const CellLabel = styled.Text`
    border-right-width: 1;
    border-color: #C5C5C5;
    font-size: ${props => (props.label > 8 ? '12' : '18')};
    padding-left: 5;
    font-weight: bold;
    flex: 1;
`;

export const Content = styled.Text`
    border-right-width: 1;
    border-color: #C5C5C5;
    font-size: 18;
    padding-left: 5;
    flex: 3;
`;