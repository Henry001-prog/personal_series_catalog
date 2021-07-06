import React, { useState } from 'react';
import {  
    LayoutAnimation, 
    NativeModules
} from 'react-native';

import { 
    LabelContainer, 
    Label, 
    ExpandText, 
    Text 
} from './styles';

// Android

    if (NativeModules.UIManager.setLayoutAnimationEnabledExperimental) {
      NativeModules.UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  

export default function LongText(props) {
    const [isExpanded, isSetExpanded] = useState(false);

    function toggleIsExpanded() {
        LayoutAnimation.spring();
        isSetExpanded(!isExpanded);
    }

 
    const { label = '', content = '-' } = props;
    return (
        <LabelContainer>
            <Label>{ label }</Label>
            <ExpandText onPress={() => toggleIsExpanded()} >
                <Text isExpanded={isExpanded}>{content}</Text>
            </ExpandText>
        </LabelContainer>
    );
}