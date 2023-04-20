import { configureStore } from "@reduxjs/toolkit"
import { userAuthReducer } from "./userReducer"
import { tableDayReducer } from "./tableDayReducer"
import { tableAnalitcReducer } from "./tableAnalitcReducer"

const store = configureStore({ reducer: {
    user: userAuthReducer,
    tableDay: tableDayReducer,
    tableMonth: tableAnalitcReducer,
}})

export { store, userAuthReducer }
