/* eslint-disable indent */
import React, { useEffect, useRef, useState } from "react";
import { Text, View, ActivityIndicator, StyleSheet, Dimensions } from "react-native";
import ColorPicker from "react-native-wheel-color-picker";
import store from "../../redux/store";
import Button from "../../components/Button/Button";
import * as ImagePicker from "expo-image-picker";

export const styles = StyleSheet.create({
    text: {
        color: "#000",
        fontSize: 18,
        fontFamily: "OpenSansRegular",
    },
    textBold: {
        fontSize: 24,
        color: "#fff",
        fontFamily: "OpenSansBold",
    },
    row: {
        container: {
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 20,
            borderTopWidth: 1,
            borderColor: "#AAAAAA",
        },
        pressed: {
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 20,
            borderTopWidth: 1,
            borderColor: "#AAAAAA",
            backgroundColor: "#AAA",
        },
    },
    colorPicked: {
        width: 20,
        height: 20,
        borderRadius: 5,
    },
});

const Settings = (props) => {
    const { settings } = props;
    const pickerRef = useRef(null);
    const [showPicker, setShowPicker] = useState(false);
    const [optionSelected, setOptionSelected] = useState(null);
    const [currentSelectedColor, setCurrentSelectedColor] = useState(null);

    const handleOptionSelected = (option) => {
        if (option != "backgroundImage") {
            setShowPicker(true);
        } else {
            pickImage();
        }
        setOptionSelected(option);
    };

    const handleColorSave = (option) => {
        switch (option) {
            case "player1Color":
                store.dispatch({ type: "UPDATE_PLAYER_1_COLOR", payload: currentSelectedColor });
                break;
            case "player2Color":
                store.dispatch({ type: "UPDATE_PLAYER_2_COLOR", payload: currentSelectedColor });
                break;
            case "selectedColor":
                store.dispatch({ type: "UPDATE_SELECTED_COLOR", payload: currentSelectedColor });
                break;
            case "backgroundImage":
                store.dispatch({ type: "UPDATE_BACKGROUND_IMAGE", payload: currentSelectedColor });
                break;
        }

        setShowPicker(false);
    };

    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [windowWidth, windowHeight],
            quality: 1,
        });

        if (!result.canceled) {
            store.dispatch({ type: "UPDATE_BACKGROUND_IMAGE", payload: result.assets[0] });
        }
    };

    return (
        <View>
            {showPicker ? (
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <View
                        style={{
                            flexDirection: "row",
                            width: "80%",
                            height: "100%",
                            padding: 20,
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 20,
                        }}>
                        <ColorPicker
                            ref={pickerRef}
                            color={settings?.[optionSelected]}
                            onColorChangeComplete={(color) => {
                                setCurrentSelectedColor(color);
                            }}
                            thumbSize={1}
                            sliderSize={40}
                            row={true}
                            wheelLodingIndicator={<ActivityIndicator size={40} />}
                            sliderLodingIndicator={<ActivityIndicator size={20} />}
                        />
                        <Button label="Save" onPress={() => handleColorSave(optionSelected)} />
                    </View>
                </View>
            ) : (
                <>
                    <Button
                        customStyle={styles.row}
                        onPress={() => handleOptionSelected("player1Color")}>
                        <Text style={styles.text}>PLAYER 1 COLOR</Text>
                        <View
                            style={{
                                ...styles.colorPicked,
                                backgroundColor: settings?.player1Color,
                            }}
                        />
                    </Button>
                    <Button
                        customStyle={styles.row}
                        onPress={() => handleOptionSelected("player2Color")}>
                        <Text style={styles.text}>PLAYER 2 COLOR</Text>
                        <View
                            style={{
                                ...styles.colorPicked,
                                backgroundColor: settings?.player2Color,
                            }}
                        />
                    </Button>
                    <Button
                        customStyle={styles.row}
                        onPress={() => handleOptionSelected("selectedColor")}>
                        <Text style={styles.text}>SELECTED COLOR</Text>
                        <View
                            style={{
                                ...styles.colorPicked,
                                backgroundColor: settings?.selectedColor,
                            }}
                        />
                    </Button>
                    <Button
                        customStyle={styles.row}
                        onPress={() => handleOptionSelected("backgroundImage")}>
                        <Text style={styles.text}>BACKGROUND IMAGE</Text>
                    </Button>
                </>
            )}
        </View>
    );
};

export default Settings;
