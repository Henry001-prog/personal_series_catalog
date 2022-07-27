import styled from "styled-components/native";

interface IExpanded {
  isExpanded: boolean
}

export const LabelContainer = styled.View`
  padding: 3px 0px 25px 0px;
  margin-top: 15px;
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
export const Container = styled.View`
  align-items: center;
  justify-content: center;
`;

export const ExpandText = styled.TouchableWithoutFeedback``;

export const Text = styled.Text<IExpanded>`
  flex: 3;
  text-align: justify;
  font-size: 18px;
  padding-right: 10px;
  padding-left: 10px;
  color: #ffffff;
  ${(props) => {
    if (props.isExpanded) {
      return `
                flex: 1;
                margin-bottom: 5px;
        `;
    } else {
      return `
                max-height: 65px;
                margin-bottom: 5px;
                
            `;
    }
  }}
`;
