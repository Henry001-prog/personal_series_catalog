import React, { useState } from "react";
import { LayoutAnimation, NativeModules } from "react-native";
import { Entypo } from "@expo/vector-icons";

import { LabelContainer, Container, ExpandText, Text } from "./styles";

// Android

if (NativeModules.UIManager.setLayoutAnimationEnabledExperimental) {
  NativeModules.UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface Props {
  label?: string
  content: string
}

export default function LongText({ content }: Props) {
  const [isExpanded, isSetExpanded] = useState<boolean>(false);

  function toggleIsExpanded(): void {
    LayoutAnimation.spring();
    isSetExpanded(!isExpanded);
  }

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
