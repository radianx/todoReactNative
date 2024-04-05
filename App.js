import React, { useCallback, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Button from "./src/components/Button";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as ScreenOrientation from "expo-screen-orientation";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

const App = () => {
    const [fontsLoaded, fontError] = useFonts({
        OpenSansBold: require("./src/assets/fonts/OpenSans-Bold.ttf"),
        OpenSansRegular: require("./src/assets/fonts/OpenSans-Regular.ttf"),
    });

    const [orientation, setOrientation] = useState(ScreenOrientation.Orientation.PORTRAIT_UP);

    useEffect(() => {
        ScreenOrientation.getOrientationAsync().then((data) => setOrientation(data.orientation));

        const subscription = ScreenOrientation.addOrientationChangeListener((evt) =>
            setOrientation(evt.orientationInfo.orientation)
        );

        return () => ScreenOrientation.removeOrientationChangeListener(subscription);
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded || fontError) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);

    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
                {orientation === ScreenOrientation.Orientation.PORTRAIT_UP ? (
                    <>
                        <Text style={styles.greet}>Hola Adrian!</Text>
                        <Text style={styles.text}>Hoy es alto dia!</Text>
                        <View style={styles.center}>
                            <Text style={styles.textBold}>Que hay para hacer?</Text>
                        </View>
                        <Button label="tap me" />
                        <StatusBar style="auto" />
                    </>
                ) : (
                    <View style={styles.landscape}>
                        <View style={styles.container}>
                            <Text style={styles.greet}>Hola Adrian!</Text>
                            <Text style={styles.text}>Hoy es alto dia!</Text>
                            <View style={styles.center}>
                                <Text style={styles.textBold}>Que hay para hacer?</Text>
                            </View>
                            <Button label="tap me" />
                            <StatusBar style="auto" />
                        </View>
                        <View style={styles.container}>
                            <Text>Lado derecho bitch</Text>
                        </View>
                    </View>
                )}
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    center: {
        padding: 10,
        alignItems: "center",
    },
    landscape: {
        flexDirection: "row",
    },
    container: {
        flex: 1,
        backgroundColor: "#222",
        padding: 20,
    },
    text: {
        color: "#fff",
        fontFamily: "OpenSansRegular",
    },
    greet: {
        color: "#fff",
        fontFamily: "OpenSansBold",
        fontSize: 40,
    },
    textBold: {
        color: "#fff",
        fontFamily: "OpenSansBold",
    },
});

export default App;
