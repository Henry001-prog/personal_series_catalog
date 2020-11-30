import styled from 'styled-components/native';

export const Container = styled.View.attrs({
    elevation: 1,
})`
    padding: 10px;
    background-color: #F0FFFF;
    margin: 5px 0px 5px 0px;
    margin-top: ${props => (props.first ? '10px' : '5px')};
    margin-bottom: ${props => (props.last ? '10px' : '5px')};
`;