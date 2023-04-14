import { configureStore } from "@reduxjs/toolkit"
import { userAuthReducer } from "./userReducer"
import { tableReducer } from "./tableReducer"

const store = configureStore({ reducer: {
    user: userAuthReducer,
    table: tableReducer,
}})

export { store, userAuthReducer }
