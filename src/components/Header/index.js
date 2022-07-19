import React from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

import { isLoading } from "../../storeJotai/seriesAtom";

import { BoxIcon } from "./styles";
import { useAtom } from "jotai";

const Header = () => {
  const [loading, setLoading] = useAtom(isLoading);
  const navigation = useNavigation();

  return (
    <>
      <BoxIcon
        onPress={() => {
          setLoading(true);
          navigation.goBack();
        }}
      >
        <MaterialIcons name="west" size={27} color="white" />
      </BoxIcon>
    </>
  );
};

export default Header;
