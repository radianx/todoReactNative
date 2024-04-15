const initialState = {
    player1Color: "#3C91E6",
    player2Color: "#C33C54",
    selectedColor: "#F4D35E",
    backgroundImage: { uri: null },
};

const settingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "UPDATE_PLAYER_1_COLOR": {
            return { ...state, player1Color: action.payload };
        }
        case "UPDATE_PLAYER_2_COLOR": {
            return { ...state, player2Color: action.payload };
        }
        case "UPDATE_SELECTED_COLOR": {
            return { ...state, selectedColor: action.payload };
        }
        case "UPDATE_BACKGROUND_IMAGE": {
            return { ...state, backgroundImage: action.payload };
        }
        default:
            return state;
    }
};

export default settingsReducer;
