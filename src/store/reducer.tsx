const initialState = {
    users: [],
    search: {}
};

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'INIT':
            return {
                ...state,
                users: action.payload
            };
        case 'SEARCH':
            return {
                ...state,
                search: action.payload
            };
        default:
            return state;
    }
};

export default reducer;