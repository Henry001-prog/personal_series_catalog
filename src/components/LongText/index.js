import React from 'react';
import {  
    LayoutAnimation, 
    NativeModules
} from 'react-native';

import { LabelContainer, Label, ExpandText, Text } from './styles';

// Android

    if (NativeModules.UIManager.setLayoutAnimationEnabledExperimental) {
      NativeModules.UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  

export default class LongText extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isExpanded: false
        }
    }

    toggleIsExpanded() {
        const { isExpanded } = this.state;
        this.setState({
            isExpanded: !isExpanded
        });
    }

    componentDidUpdate(nextProps, nextState) {
        LayoutAnimation.spring();
    }

    render() {
        const { label = '', content = '-' } = this.props;
        const { isExpanded } = this.state;
        return (
            <LabelContainer>
                <Label>{ label }</Label>
                <ExpandText onPress={() => this.toggleIsExpanded()} >
                    <Text isExpanded={isExpanded}>{content}</Text>
                </ExpandText>
            </LabelContainer>
        );
    }
    
}

/*const styles = StyleSheet.create({
    line: {
        paddingTop: 3,
        paddingBottom: 3,
    },
    cell: {
        fontSize: 18,
        paddingLeft: 5,
        paddingRight: 5,
    },
    label: {
        fontWeight: 'bold',
        flex: 1,
        textDecorationLine: 'underline',
        paddingBottom: 8,
    },
    content: {
        flex: 3,
        textAlign: 'justify', // IOS
    },
    collapsed: {
        maxHeight: 65,
        marginBottom: 50
    },
    expanded: {
        flex: 1,
    },
});*/
