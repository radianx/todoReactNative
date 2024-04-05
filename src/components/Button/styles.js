import { StyleSheet } from "react-native";

const container = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3F52E3",
    padding: 10,
    borderRadius: 5,
};

export const styles = StyleSheet.create({
    container: {
        ...container,
    },
    pressed: {
        ...container,
        backgroundColor: "#0000aa",
    },
    buttonText: {
        color: "#fff",
        fontFamily: "OpenSansBold",
    },
});
