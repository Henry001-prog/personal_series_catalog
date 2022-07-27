import React from "react";

import {
  ScrollView,
  ContainerRate,
  Image,
  Title,
  Gender,
  ViewButton,
  Button,
  ButtonText,
} from "./styles";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";

import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { MainScreenNavigationProp, SerieFormScreenNavigationProp } from "../../types/navigation";

import { deleteSerie } from "../../storeJotai/seriesAtom";

import Line from "../../components/Line";
import LongText from "../../components/LongText";
import { isLoading } from "../../storeJotai/serieFormAtom";
import { useAtom } from "jotai";
import { SeriesType } from "../../interfaces/seriesType";

type StackParamsList = {
  SerieDetail: {
    serie: {
      id: null;
      title: string;
      gender: string;
      rate: number;
      img64: string;
      description: string;
    };
  };
};

// interface RouteParams extends RouteProp<ParamListBase, string> {
//   params: {
//     serie: {
//       id: null;
//       title: string;
//       gender: string;
//       rate: number;
//       img64: string;
//       description: string;
//     };
//   }
// }

export default function SerieDetailPage() {
  const [loading, setLoading] = useAtom(isLoading);

  const { replace }  = useNavigation<SerieFormScreenNavigationProp>();
  const navigation  = useNavigation<MainScreenNavigationProp>();
  const route = useRoute<RouteProp<StackParamsList, "SerieDetail">>();

  const { serie } = route.params;
  return (
    <ScrollView>
      {serie.img64 ? (
        <Image
          source={{
            uri: `data:image/jpeg;base64,${serie.img64}`,
          }}
        >
          <LinearGradient
            colors={[
              "transparent",
              "rgba(37, 37, 53, 1)",
              "rgba(37, 37, 53, 1)",
              "transparent",
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 2.4 }}
            style={{
              height: 45,
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          ></LinearGradient>
        </Image>
      ) : null}
      <Title>{serie.title}</Title>

      <ContainerRate>
        <AntDesign name="star" size={24} color="#FFFF00" />
        <Line content={String(serie.rate)} />
        <Gender>{serie.gender}</Gender>
      </ContainerRate>

      <LongText label="Descrição" content={serie.description} />
      <ViewButton>
        <Button
          onPress={() => {
            replace("SerieForm", { serieToEdit: serie });
          }}
        >
          <ButtonText>Editar</ButtonText>
        </Button>
      </ViewButton>
      <ViewButton>
        <Button
          style={{ backgroundColor: "#FF0004" }}
          onPress={async () => {
            setLoading(true);
            deleteSerie(serie, navigation);
          }}
        >
          <ButtonText>Deletar</ButtonText>
        </Button>
      </ViewButton>
    </ScrollView>
  );
}
