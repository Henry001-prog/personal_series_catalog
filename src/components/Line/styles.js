import styled from 'styled-components/native';

export const Container = styled.View`
    flex-direction: row;
    padding-top: 3px;
    padding-bottom: 3px;
    border-width: 1px;
    border-color: #C5C5C5;
`;

export const CellLabel = styled.Text`
    border-right-width: 1px;
    border-color: #C5C5C5;
    font-size: ${props => (props.label > 8 ? '12' : '18')}px;
    padding-left: 5px;
    font-weight: bold;
    flex: 1;
`;

export const Content = styled.Text`
    border-right-width: 1px;
    border-color: #C5C5C5;
    font-size: 18px;
    padding-left: 5px;
    flex: 3;
`;