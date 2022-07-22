import React from "react";

import { SeriesCard, Card, Image, CardTitleWrapper, CardTitle } from "./styles";

const SerieCard = ({ serie, isFirstColumn, onNavigate }) => {
  return (
    <SeriesCard isFirstColumn={isFirstColumn} onPress={onNavigate}>
      <Card>
        <Image
          serie={serie.img64}
          source={{
            uri: `data:image/jpeg;base64,${serie.img64}`,
          }}
          aspectRatio={1}
          resizeMode="stretch"
        />
        <CardTitleWrapper>
          <CardTitle adjustsFontSizeToFit={true} numberOfLines={1}>
            {serie.title}
          </CardTitle>
        </CardTitleWrapper>
      </Card>
    </SeriesCard>
  );
};

export default SerieCard;
