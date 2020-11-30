import React from 'react';
//import { StyleSheet, View } from 'react-native';

import { Container } from './styles';

const FormRow =  props => {
    const {children, first, last} = props;
    return (
        <Container 
            first={first}
            last={last}
        >
            {children}
        </Container>
    )
};

/*const styles = StyleSheet.create({
    container: {
        //alignItems: 'center',
        //justifyContent: 'center',
        padding: 10,
        backgroundColor: '#F0FFFF',
        marginTop: 5,
        marginBottom: 5,
        elevation: 1,
    },
    first: {
        marginTop: 10,
    },
    last: {
        marginBottom: 10,
    },
});*/

export default FormRow;