import styled from 'styled-components/native';
import { Container } from '../../components/FormRow/styles';

export const Div = styled.View.attrs({
    paddingHorizontal: 20,
})`
    flex: 1;
    align-items: center; 
    justify-content: center; 
    flex-direction: column; 
    padding-left: 10px;
    padding-right: 10px;
    background-color: #778899;
`;

export const Form = styled(Container)`
    align-items: center;
    background-color: #252535;
    border-radius: 9px;
    padding-top: 10px;
`;

export const Input = styled.TextInput`
    padding: 0px 5px 5px 5px;
    align-items: center;
    width: 300px;
    border-width: 2px;
    border-radius: 3px;
    border-color: transparent;
    border-bottom-color: #999999;
    color: white;
    font-size: 17px;
`;

export const Loading = styled.ActivityIndicator``;

export const Button = styled.Button`
    margin-top: 5px;
    align-items: center;
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