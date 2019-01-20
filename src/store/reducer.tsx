const initialState = {
    users: []
};

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'INIT':
            return {
                ...state,
                users: action.payload
            };
        default:
            return state;
    }
};

export default reducer;