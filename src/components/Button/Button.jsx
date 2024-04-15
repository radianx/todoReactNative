import propTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { styles } from "./styles";

const Button = (props) => {
    const { onPress, label, customStyle, children } = props;

    const [isPressing, setIsPressing] = useState(false);
    const [currentStyle, setCurrentStyle] = useState(customStyle ?? styles.container);

    useEffect(() => {
        if (isPressing) {
            setCurrentStyle(customStyle ? customStyle.pressed : styles.pressed);
        } else {
            setCurrentStyle(customStyle ? customStyle.container : styles.container);
        }
    }, [isPressing]);

    return (
        <Pressable
            onPress={onPress}
            onPressIn={() => setIsPressing(true)}
            onPressOut={() => setIsPressing(false)}>
            <View style={currentStyle}>
                {children ? children : <Text style={styles.buttonText}>{label}</Text>}
            </View>
        </Pressable>
    );
};

Button.propTypes = {
    onPress: propTypes.func.isRequired,
    label: propTypes.string,
    children: propTypes.node,
    customStyle: propTypes.shape({
        pressed: propTypes.object,
        container: propTypes.object,
    }),
};

export default Button;
