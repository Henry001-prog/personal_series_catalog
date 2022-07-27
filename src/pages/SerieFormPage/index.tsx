import React, { useEffect, useState, useRef } from "react";
import { Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Slider } from "@miblanchard/react-native-slider";
import { View, TextInput as RNTextInput, TextInputProps } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import {
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TextArea,
  ImageBackground,
  ViewRate,
  ViewButton,
  ViewButtonClean,
  ViewButtonImage,
  Button,
  ButtonClean,
  Loading,
  Text,
  IconContainer,
  PickerContainer,
  SliderContainer,
} from "./styles";

import FormRow from "../../components/FormRow";

import { useAtom } from "jotai";
import { setFieldAtom, saveSerie } from "../../storeJotai/serieFormAtom";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";

import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { MainScreenNavigationProp } from "../../types/navigation";

type StackParamsList = {
  SerieForm: {
    serieToEdit: string;
  };
};

export default function SerieFormPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [serieFormAtom, setSerieFormAtom] = useAtom(setFieldAtom);

  const route = useRoute<RouteProp<StackParamsList, "SerieForm">>();
  const navigation = useNavigation<MainScreenNavigationProp>();

  const input2Ref = useRef<RNTextInput & TextInputProps>(null);

  useEffect(() => {
    const { params } = route;
    if (params && params.serieToEdit) {
      const serieToEdit = params.serieToEdit;
      setSerieFormAtom({
        type: "setWholeSerieJotai",
        serieToEdit: serieToEdit,
      });
    } else {
      setSerieFormAtom({ type: "setResetFormAtom" });
    }
  }, [route, setSerieFormAtom]);

  async function pickImage() {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Você precisa permitir o acesso!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      quality: 0.3,
      base64: true,
      allowsEditing: true,
      aspect: [1, 1], // Android only
    });

    if (!result.cancelled) {
      setSerieFormAtom({ field: "img64", value: result.base64 });
      console.log("Aqui temos uma imagem!", result.base64);
    }
  }

  const selectEvaluation = () => {
    switch (String(serieFormAtom.rate)) {
      case "10":
        return "(1) Terrível";
      case "20":
        return "(2) Horrível";
      case "30":
        return "(3) Muito ruim";
      case "40":
        return "(4) Ruim";
      case "50":
        return "(5) Média";
      case "60":
        return "(6) Quase bom";
      case "70":
        return "(7) Bom";
      case "80":
        return "(8) Muito bom";
      case "90":
        return "(9) Ótimo";
      case "100":
        return "(10) Obra-prima";
      default:
        return "Sem avaliação";
    }
  };

  return (
    <KeyboardAvoidingView style={{ backgroundColor: "white", flex: 1 }} enabled>
      <ScrollView
        contentContainerStyle={{ padding: 10 }}
        keyboardShouldPersistTaps={"handled"}
      >
        <FormRow first>
          <TextInput
            placeholder="Título"
            returnKeyType="next"
            blurOnSubmit={false}
            placeholderTextColor="#808080"
            value={serieFormAtom.title}
            onChangeText={(value) =>
              setSerieFormAtom({ field: "title", value: value })
            }
            onSubmitEditing={() => input2Ref.current!.focus()}
          />
        </FormRow>

        <FormRow>
          {serieFormAtom.img64 ? (
            <ImageBackground
              source={{
                uri: `data:image/jpeg;base64,${serieFormAtom.img64}`,
              }}
            />
          ) : (
            <IconContainer>
              <MaterialIcons name="image" size={120} color="black" />
            </IconContainer>
          )}
          <ViewButtonImage>
            <Button onPress={() => pickImage()}>
              <Text>Selecione uma imagem</Text>
            </Button>
          </ViewButtonImage>
        </FormRow>

        <FormRow>
          <PickerContainer>
            <Picker
              style={{
                backgroundColor: "transparent",
              }}
              selectedValue={serieFormAtom.gender}
              onValueChange={(itemValue) =>
                setSerieFormAtom({ field: "gender", value: itemValue })
              }
            >
              <Picker.Item label="Policial" value="Policial" color="#808080" />
              <Picker.Item label="Comédia" value="Comédia" color="#808080" />
              <Picker.Item label="Terror" value="Terror" color="#808080" />
              <Picker.Item
                label="Ficção Científica"
                value="Ficção Científica"
                color="#808080"
              />
              <Picker.Item label="Ação" value="Ação" color="#808080" />
              <Picker.Item label="Drama" value="Drama" color="#808080" />
            </Picker>
          </PickerContainer>
        </FormRow>

        <FormRow>
          <ViewRate>
            <Text>Nota:</Text>
            <Text>{selectEvaluation()}</Text>
          </ViewRate>
          <SliderContainer>
            <Slider
              containerStyle={{ height: 20 }}
              trackStyle={{
                height: 12,
                borderRadius: 10,
                marginLeft: 5,
                marginRight: 2,
              }}
              minimumTrackTintColor="#007fff"
              maximumTrackTintColor="transparent"
              thumbTintColor="white"
              onValueChange={(value) =>
                setSerieFormAtom({ field: "rate", value: value })
              }
              value={serieFormAtom.rate}
              minimumValue={0}
              maximumValue={100}
              step={10}
            />
          </SliderContainer>
        </FormRow>

        <FormRow>
          <TextArea
            placeholder="Descrição"
            placeholderTextColor="#808080"
            value={serieFormAtom.description}
            onChangeText={(value: string) =>
              setSerieFormAtom({ field: "description", value: value })
            }
            ref={input2Ref}
            numberOfLines={4}
            multiline={true}
          />
        </FormRow>
        {isLoading ? (
          <Loading color="light-blue" size="large" />
        ) : (
          <ViewButton>
            <Button
              onPress={async () => {
                setIsLoading(true);
                try {
                  await saveSerie(serieFormAtom);
                  setSerieFormAtom({ type: "setResetFormAtom" });
                  navigation.goBack();
                } catch (error: any) {
                  Alert.alert("Erro!", error.message);
                } finally {
                  setIsLoading(false);
                }
              }}
            >
              <Text>Salvar</Text>
            </Button>
          </ViewButton>
        )}

        {serieFormAtom.id ? (
          <View style={{ marginBottom: 100 }}></View>
        ) : (
          <ViewButtonClean>
            <ButtonClean
              onPress={() => {
                setSerieFormAtom({ type: "setResetFormAtom" });
              }}
            >
              <Text>Limpar Formulário</Text>
            </ButtonClean>
          </ViewButtonClean>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
