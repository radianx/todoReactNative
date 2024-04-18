import React from "react";
import { connect } from "react-redux";
import Settings from "./Settings";
import {
    resetImage,
    resetSettings,
    toggleHaptics,
    toggleHud,
    toggleSound,
    updateBackgroundImage,
    updatePlayer1Color,
    updatePlayer1Name,
    updatePlayer2Color,
    updatePlayer2Name,
    updateSelectedColor,
} from "../../redux/actions";

const SettingsContainer = (props) => <Settings {...props} />;

const mapStateToProps = (state) => {
    return {
        settings: { ...state.settings },
    };
};

export default connect(mapStateToProps, {
    resetImage,
    resetSettings,
    toggleHaptics,
    toggleHud,
    toggleSound,
    updateBackgroundImage,
    updatePlayer1Color,
    updatePlayer1Name,
    updatePlayer2Color,
    updatePlayer2Name,
    updateSelectedColor,
})(SettingsContainer);
