const stateInit = {
    all: [],
    totalInputs: 0.000,
    totalOutputs: 0.000,
    total: 0.000,
}

function tableDayReducer(state = stateInit, action) {
    if (action.type === "row/addRow") {
        let tableAll = [
            ...state.all,
            {
                id: !state.all.length
                    ? state.all.length + 1
                    : state.all[state.all.length - 1].id + 1,
                ...action.payload,
            },
        ]
        let inputs = 0
        let outputs = 0

        for (let rowTable of tableAll) {
            rowTable.description === "inputs"
                ? (inputs += Number(rowTable.value))
                : (outputs += Number(rowTable.value))
        }

        return {
            ...state,
            all: tableAll,
            totalInputs: inputs,
            totalOutputs: outputs,
            total: inputs - outputs,
        }
    } else if (action.type === "row/removeRow") {
        const filter = state.all.filter((row) => row.id != action.id)

        return {
            ...state,
            all: filter,
        }
    } else if (action.type === "row/deletAll") {
        return {
            ...state,
            all: [],
        }
    } else if (action.type === "row/editRow") {
        const filterAll = state.all.filter(fil => fil.id !== action.newValue.id)
        const rowEdit = {
            id: Number(action.newValue.id),
            value: Number(action.newValue.value),
            column: action.newValue.column,
            description: action.newValue.description,
            date: action.newValue.date
        }

        filterAll.splice(action.newValue.id-1, 0, rowEdit)
        return {
            ...state,
            all: filterAll
        }
    }

    return state
}

export { tableDayReducer }
