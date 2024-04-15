import React from "react";
import { connect } from "react-redux";
import Settings from "./Settings";

const SettingsContainer = (props) => <Settings {...props} />;

const mapStateToProps = (state) => {
    return {
        settings: { ...state.settings },
    };
};

export default connect(mapStateToProps, {})(SettingsContainer);
