import React from "react";
import add from "../../resources/imgs/add.png";

import { AddSeriesCard, Card, Image } from "./styles";

const AddSerieCard = ({ isFirstColumn, onNavigate }) => (
  <AddSeriesCard onPress={onNavigate} isFirstColumn={isFirstColumn}>
    <Card>
      <Image source={add} />
    </Card>
  </AddSeriesCard>
);

export default AddSerieCard;
