import React, { useCallback, useEffect, useState } from "react";
import { Dimensions, ImageBackground, Pressable, Text, View } from "react-native";
import Button from "../../components/Button/Button";
import { Asset } from "expo-asset";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { styles } from "./styles";

const Main = (props) => {
    const { navigation, settings } = props;

    const [playerOneMemory, setPlayerOneMemory] = useState(0);
    const [playerTwoMemory, setPlayerTwoMemory] = useState(0);
    const [indexPressed, setIndexPressed] = useState(0);
    const [isPlayerOne, setIsPlayerOne] = useState(false);

    const firstRow = [1, 2, 3, 4, 5];
    const secondRow = [6, 7, 8, 9, 10];

    const image = {
        uri: Asset.fromModule(require("../../assets/images/wallpaper1.jpg")).uri,
    };

    const onSettingsClick = () => {
        navigation.navigate("Settings");
    };

    useEffect(() => {
        if (indexPressed == -1) {
            setPlayerOneMemory(0);
            setPlayerTwoMemory(0);
            return;
        }
        const properMemory = indexPressed + 1;
        if (isPlayerOne) {
            setPlayerOneMemory(properMemory);
            setPlayerTwoMemory(properMemory * -1);
        } else {
            setPlayerTwoMemory(properMemory);
            setPlayerOneMemory(properMemory * -1);
        }
    }, [indexPressed]);

    const handlePress = (index, isPlayerOne) => {
        setIndexPressed(index);
        setIsPlayerOne(isPlayerOne);
    };

    const [fontsLoaded, fontError] = useFonts({
        OpenSansBold: require("../../assets/fonts/OpenSans-Bold.ttf"),
        OpenSansRegular: require("../../assets/fonts/OpenSans-Regular.ttf"),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded || fontError) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);

    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <ImageBackground style={styles.image} source={settings.backgroundImage}>
            <View style={styles.landscape} onLayout={onLayoutRootView}>
                <View style={{ ...styles.playerRow, transform: [{ rotate: "180deg" }] }}>
                    <Text
                        style={!isPlayerOne || indexPressed === -1 ? styles.textBold : styles.text}>
                        Memory {playerTwoMemory}
                    </Text>
                </View>
                <View style={styles.mainRow}>
                    <View style={styles.side}>
                        <View style={styles.reverseRow}>
                            {firstRow.map((number, index) => (
                                <Pressable
                                    key={number}
                                    style={{
                                        ...styles.cell,
                                        borderWidth:
                                            indexPressed === index && isPlayerOne ? 1 : undefined,
                                        backgroundColor:
                                            indexPressed === index && isPlayerOne
                                                ? `${settings.selectedColor}`
                                                : `${settings.player1Color}99`,
                                    }}
                                    onPress={() => handlePress(index, true)}>
                                    <Text style={styles.textBold}>{number}</Text>
                                </Pressable>
                            ))}
                        </View>
                        <View style={styles.row}>
                            {secondRow.map((number, index) => (
                                <Pressable
                                    key={number}
                                    style={{
                                        ...styles.cell,
                                        borderWidth:
                                            indexPressed === index + 5 && isPlayerOne
                                                ? 1
                                                : undefined,
                                        backgroundColor:
                                            indexPressed === index + 5 && isPlayerOne
                                                ? `${settings.selectedColor}`
                                                : `${settings.player1Color}99`,
                                    }}
                                    onPress={() => handlePress(index + 5, true)}>
                                    <Text style={styles.textBold}>{number}</Text>
                                </Pressable>
                            ))}
                        </View>
                    </View>
                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                        <Pressable
                            style={{ width: 70, height: "50%" }}
                            onPress={() => handlePress(-1, false)}>
                            <LinearGradient
                                colors={
                                    indexPressed == -1
                                        ? [`${settings.selectedColor}`, `${settings.selectedColor}`]
                                        : [
                                              `${settings.player1Color}99`,
                                              `${settings.player2Color}99`,
                                          ]
                                }
                                start={{ x: 0, y: 0.5 }}
                                end={{ x: 1, y: 0.6 }}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: 50,
                                }}>
                                <Text style={styles.textBold}>0</Text>
                            </LinearGradient>
                        </Pressable>
                    </View>
                    <View style={styles.side}>
                        <View style={styles.reverseRow}>
                            {secondRow.map((number, index) => (
                                <Pressable
                                    key={number}
                                    style={{
                                        ...styles.cell,
                                        borderWidth:
                                            indexPressed === index + 5 && !isPlayerOne
                                                ? 1
                                                : undefined,
                                        backgroundColor:
                                            indexPressed === index + 5 && !isPlayerOne
                                                ? `${settings.selectedColor}`
                                                : `${settings.player2Color}99`,
                                    }}
                                    onPress={() => handlePress(index + 5, false)}>
                                    <Text
                                        style={{
                                            ...styles.textBold,
                                            transform: [{ rotate: "180deg" }],
                                        }}>
                                        {number}
                                    </Text>
                                </Pressable>
                            ))}
                        </View>
                        <View style={styles.row}>
                            {firstRow.map((number, index) => (
                                <Pressable
                                    key={number}
                                    style={{
                                        ...styles.cell,
                                        backgroundColor:
                                            indexPressed === index && !isPlayerOne
                                                ? `${settings.selectedColor}`
                                                : `${settings.player2Color}99`,
                                        borderWidth:
                                            indexPressed === index && !isPlayerOne ? 1 : undefined,
                                    }}
                                    onPress={() => handlePress(index, false)}>
                                    <Text
                                        style={{
                                            ...styles.textBold,
                                            transform: [{ rotate: "180deg" }],
                                        }}>
                                        {number}
                                    </Text>
                                </Pressable>
                            ))}
                        </View>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        height: "100%",
                    }}>
                    <View style={{ ...styles.playerRow, flex: 90 }}>
                        <Text
                            style={
                                isPlayerOne || indexPressed === -1 ? styles.textBold : styles.text
                            }>
                            Memory {playerOneMemory}
                        </Text>
                    </View>
                    <View style={{ ...styles.playerRow, flex: 10, alignItems: "center" }}>
                        <Button label="..." onPress={onSettingsClick} />
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
};

export default Main;
