import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  TextInput
} from "react-native";

import Card from "../components/Card";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import MainButton from "../components/MainButton";
import Colors from "../constants/colors";

const StartGameScreen = props => {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [buttonWidth, setButtonWidth] = useState(
    Dimensions.get("window").width / 4
  );
  const [fullName, setFullName] = useState(null);
  const [nextStepName, setNextStepName] = useState(false);
  const [hiddeHelloText, setHiddeHelloText] = useState(false);

  const numberInputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };

  const resetInputHandler = () => {
    setEnteredValue("");
    setConfirmed(false);
  };

  const nameUserRestart = () => {
    console.log('Me ejecute');
    
    setFullName(props.nameStored);
    if(props.nameStored!==null){
      setNextStepName(true)
    }
  };

  useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(Dimensions.get("window").width / 4);
    };

    nameUserRestart();

    Dimensions.addEventListener("change", updateLayout);
    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  },[]);

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        "Invalid number!",
        "Number has to be a number between 1 and 99.",
        [{ text: "Okay", style: "destructive", onPress: resetInputHandler }]
      );
      return;
    }
    setConfirmed(true);

    setSelectedNumber(chosenNumber);
    setHiddeHelloText(true);
    setEnteredValue("");
    props.setName(fullName);
    Keyboard.dismiss();
    console.log(true, chosenNumber);
  };

  // name step
  let helloText;

  if (hiddeHelloText === false) {
    helloText = (
      <Text
        style={{
          textAlign: "center",
          paddingHorizontal: 40,
          paddingVertical: 20
        }}
      >
        {" "}
        Welcome to the game{" "}
        <Text style={{ fontSize: 20, color: "red" }}>{fullName}</Text>, please
        select a Number and let your phone guess your number, hope you enjoy it!
      </Text>
    );
  }

  // confirmed step
  var confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <BodyText>You selected</BodyText>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton onPress={() => props.onStartGame(selectedNumber)}>
          START GAME
        </MainButton>
      </Card>
    );
  }

  let confirmedName;

  if (nextStepName === false) {
    // view
    confirmedName = (
      <View style={styles.startScreen}>
        <Text style={{ paddingHorizontal: 40, textAlign: "center" }}>
          Hello World, i want to know whats your name, please tell me that...
        </Text>
        <Input
          style={styles.inputName}
          blurOnSubmit
          maxLength={20}
          onChangeText={setFullName}
          value={fullName}
        />
        <MainButton onPress={() => setNextStepName(true)}>
          GO TO THE GAME
        </MainButton>
      </View>
    );
  } else {
    confirmedName = (
      <ScrollView>
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
          <TouchableWithoutFeedback
            onPress={() => {
              Keyboard.dismiss();
            }}
          >
            <View style={styles.screen}>
              <TitleText style={styles.title}>Start a New Game!</TitleText>
              {helloText}
              <Card style={styles.inputContainer}>
                <BodyText>Select a Number</BodyText>
                <Input
                  style={styles.input}
                  blurOnSubmit
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="number-pad"
                  maxLength={2}
                  onChangeText={numberInputHandler}
                  value={enteredValue}
                />
                <View style={styles.buttonContainer}>
                  <View style={{ width: buttonWidth }}>
                    <Button
                      title="Reset"
                      onPress={resetInputHandler}
                      color={Colors.accent}
                    />
                  </View>
                  <View style={{ width: buttonWidth }}>
                    <Button
                      title="Confirm"
                      onPress={confirmInputHandler}
                      color={Colors.primary}
                    />
                  </View>
                </View>
              </Card>
              {confirmedOutput}
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }

  return <ScrollView>{confirmedName}</ScrollView>;
};

const styles = StyleSheet.create({
  startScreen: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: "30%",
    height: 500
  },
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center"
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: "open-sans-bold"
  },
  inputContainer: {
    width: "80%",
    // maxWidth: '80%',
    maxWidth: "95%",
    minWidth: 300,
    alignItems: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15
  },
  // button: {
  //   // width: 100
  //   width: Dimensions.get('window').width / 4
  // },
  input: {
    width: 50,
    textAlign: "center"
  },
  inputName: {
    width: 200,
    marginTop: 40,
    textAlign: "center"
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: "center"
  }
});

export default StartGameScreen;
