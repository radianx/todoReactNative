import propTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { styles } from "./styles";

const Button = (props) => {
    const { onPress, label } = props;

    const [isPressing, setIsPressing] = useState(false);
    const [currentStyle, setCurrentStyle] = useState(styles.container);

    useEffect(() => {
        if (isPressing) {
            setCurrentStyle(styles.pressed);
        } else {
            setCurrentStyle(styles.container);
        }
    }, [isPressing]);

    return (
        <Pressable
            onPress={onPress}
            onPressIn={() => setIsPressing(true)}
            onPressOut={() => setIsPressing(false)}>
            <View style={currentStyle}>
                <Text style={styles.buttonText}>{label}</Text>
            </View>
        </Pressable>
    );
};

Button.propTypes = {
    onPress: propTypes.func.isRequired,
    label: propTypes.string.isRequired,
};

export default Button;
