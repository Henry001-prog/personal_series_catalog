import React from "react";
import add from "../../resources/imgs/add.png";

import { AddSeriesCard, Card, Image } from "./styles";
import { useNavigation } from "@react-navigation/native";
import {
  SerieFormScreenNavigationProp,
} from "../../types/navigation";

const AddSerieCard = () => {
  const navigation = useNavigation<SerieFormScreenNavigationProp>();

  return (
    <AddSeriesCard
      onPress={() => navigation.navigate("SerieForm")}
    >
      <Card>
        <Image source={add} />
      </Card>
    </AddSeriesCard>
  );
};

export default AddSerieCard;
