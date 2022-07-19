import React from "react";
//import { View, Text, StyleSheet } from 'react-native';

import { Container, CellLabel, Title, Content } from "./styles";

const Line = ({ label = "", content = "-" }) => {
  return (
    <Container>
      <Content>{content}</Content>
    </Container>
  );
};

/*const styles = StyleSheet.create({
    line: {
        flexDirection: 'row',
        paddingTop: 3,
        paddingBottom: 3,
		borderWidth: 1,
        borderColor: '#C5C5C5',
    },
    cell: {
		borderRightWidth: 1,
        borderColor: '#C5C5C5',
        fontSize: 18,
        paddingLeft: 5,
    },
    label: {
        fontWeight: 'bold',
        flex: 1,
    },
    content: {
        flex: 3,
    },
    longLabel: {
        fontSize: 12,
    },
});*/

export default Line;
