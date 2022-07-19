import React, { useState } from "react";
import { LayoutAnimation, NativeModules } from "react-native";
import { Entypo } from "@expo/vector-icons";

import { LabelContainer, Label, Container, ExpandText, Text } from "./styles";

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

  const { label = "", content = "-" } = props;
  return (
    <LabelContainer>
      <ExpandText onPress={() => toggleIsExpanded()}>
        <Container>
          <Text isExpanded={isExpanded}>{content}</Text>
          <Entypo name="chevron-thin-down" size={24} color="#ffffff" />
        </Container>
      </ExpandText>
    </LabelContainer>
  );
}
