const stateInit = {
    user: null
}

function userAuthReducer(state=stateInit, action) {
    if (action.type === "user/login") {
        return {
            ...state,
            user: action.payload,
        }
    } else if (action.type === "user/register") {
        return {
            ...state,
            user: action.payload,
        }
    }

    return state
}

export { userAuthReducer }
