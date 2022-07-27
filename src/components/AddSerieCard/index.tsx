import React from "react";
import add from "../../resources/imgs/add.png";

import { AddSeriesCard, Card, Image } from "./styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import {
  SerieFormScreenNavigationProp,
  SerieDetailScreenNavigationProp,
} from "../../types/navigation";

const AddSerieCard = (isFirstColumn: any) => {
  const navigation = useNavigation<SerieFormScreenNavigationProp>();

  return (
    <AddSeriesCard
      onPress={() => navigation.navigate("SerieForm")}
      isFirstColumn={isFirstColumn}
    >
      <Card>
        <Image source={add} />
      </Card>
    </AddSeriesCard>
  );
};

export default AddSerieCard;
