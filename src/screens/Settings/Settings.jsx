/* eslint-disable indent */
import React, { useRef, useState } from "react";
import {
    Text,
    View,
    ActivityIndicator,
    StyleSheet,
    Dimensions,
    TextInput,
    ScrollView,
} from "react-native";
import ColorPicker from "react-native-wheel-color-picker";
import Button from "../../components/Button/Button";
import * as ImagePicker from "expo-image-picker";
import Checkbox from "expo-checkbox";

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
            padding: 15,
            borderTopWidth: 1,
            borderColor: "#AAAAAA",
        },
        pressed: {
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 15,
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
    const {
        resetImage,
        resetSettings,
        settings,
        toggleHaptics,
        toggleHud,
        toggleSound,
        updateBackgroundImage,
        updatePlayer1Color,
        updatePlayer1Name,
        updatePlayer2Color,
        updatePlayer2Name,
        updateSelectedColor,
    } = props;
    const pickerRef = useRef(null);
    const [showPicker, setShowPicker] = useState(false);
    const [optionSelected, setOptionSelected] = useState(null);
    const [currentSelectedColor, setCurrentSelectedColor] = useState(null);

    const handleOptionSelected = (option) => {
        switch (option) {
            case "backgroundImage":
                pickImage();
                break;
            case "haptics":
                toggleHaptics();
                break;
            case "keepHUD":
                toggleHud();
                break;
            case "sound":
                toggleSound();
                break;
            default:
                setShowPicker(true);
                break;
        }
        setOptionSelected(option);
    };

    const handleColorSave = (option) => {
        switch (option) {
            case "player1Color":
                updatePlayer1Color(currentSelectedColor);
                break;
            case "player2Color":
                updatePlayer2Color(currentSelectedColor);
                break;
            case "selectedColor":
                updateSelectedColor(currentSelectedColor);
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
            updateBackgroundImage(result.assets[0]);
        }
    };

    const handlePlayer1NameChange = (text) => {
        updatePlayer1Name(text);
    };

    const handlePlayer2NameChange = (text) => {
        updatePlayer2Name(text);
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
                <ScrollView>
                    <TextInput
                        style={styles.row.container}
                        value={settings.player1Name}
                        placeholder="Player 1 name"
                        onChangeText={handlePlayer1NameChange}
                    />
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
                    <TextInput
                        style={styles.row.container}
                        value={settings.player2Name}
                        placeholder="Player 2 name"
                        onChangeText={handlePlayer2NameChange}
                    />
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
                    <Button
                        customStyle={styles.row}
                        onPress={() => handleOptionSelected("keepHUD")}>
                        <Text style={styles.text}>KEEP PLAYER HUD</Text>
                        <Checkbox style={{ marginRight: 8 }} value={settings?.keepHUD} />
                    </Button>
                    <Button
                        customStyle={styles.row}
                        onPress={() => handleOptionSelected("haptics")}>
                        <Text style={styles.text}>HAPTICS</Text>
                        <Checkbox style={{ marginRight: 8 }} value={settings?.isHapticsOn} />
                    </Button>
                    <Button customStyle={styles.row} onPress={() => handleOptionSelected("sound")}>
                        <Text style={styles.text}>SOUND</Text>
                        <Checkbox style={{ marginRight: 8 }} value={settings?.isSoundOn} />
                    </Button>
                    <Button customStyle={styles.row} onPress={() => resetImage()}>
                        <Text style={styles.text}>RESET BACKGROUND IMAGE</Text>
                    </Button>
                    <Button customStyle={styles.row} onPress={() => resetSettings()}>
                        <Text style={styles.text}>RESET ALL SETTINGS</Text>
                    </Button>
                </ScrollView>
            )}
        </View>
    );
};

export default Settings;
