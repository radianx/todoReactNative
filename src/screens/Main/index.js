import React from "react";
import { connect } from "react-redux";
import Main from "./Main";
import { updateBackgroundImage, updateForegroundImage } from "../../redux/actions";

const MainContainer = (props) => <Main {...props} />;

const mapStateToProps = (state) => {
    return {
        settings: { ...state.settings },
    };
};

export default connect(mapStateToProps, { updateBackgroundImage, updateForegroundImage })(
    MainContainer
);
