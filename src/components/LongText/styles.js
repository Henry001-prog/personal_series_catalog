import styled from 'styled-components/native';

export const LabelContainer = styled.View`
    padding: 3px 0px 3px 0px;
`;

export const Label = styled.Text`
    font-size: 18px;
    padding-right: 5px;
    padding-bottom: 8px;
    padding-left: 5px;
    font-weight: bold;
    flex: 1;
    text-decoration: underline;
`;

export const ExpandText = styled.TouchableWithoutFeedback``;

export const Text = styled.Text`
    flex: 3;
    text-align: justify;
    font-size: 18px;
    padding-right: 5px;
    padding-left: 5px;
    ${props => {
        if (props.isExpanded) { 
            return `
                flex: 1;
        `
        } else {
            return `
                max-height: 65px;
                margin-bottom: 50px;
                
            `
        }

    }}
`;