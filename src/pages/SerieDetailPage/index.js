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

import { useDispatch } from "react-redux";
// import { deleteSerie } from '../../store/actions';
import { deleteSerie } from "../../storeJotai/event";
import { Text, View } from "react-native";

import Line from "../../components/Line";
import LongText from "../../components/LongText";
import { isLoading } from "../../storeJotai/event";
import { useAtom } from "jotai";

export default function SerieDetailPage({ navigation, route }) {
  const [loading, setLoading] = useAtom(isLoading);

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
        <Line content={serie.rate} />
        <Gender>{serie.gender}</Gender>
      </ContainerRate>

      <LongText label="Descrição" content={serie.description} />
      <ViewButton>
        <Button
          onPress={() => {
            navigation.replace("SerieForm", { serieToEdit: serie });
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
