const stateInit = {
    all: [],
    totalInputs: 0.000,
    totalOutputs: 0.000,
    total: 0.000,
}

function tableDayReducer(state = stateInit, action) {
    const update = (table) => {
        let inputs = 0.000
        let outputs = 0.000

        for (let row of table) {
            row.description === "inputs"
                ? (inputs += Number(row.value))
                : (outputs += Number(row.value))
        }

        return {
            totalInputs: inputs,
            totalOutputs: outputs,
            total: inputs - outputs,
        }
    }

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
        let updates = update(tableAll)

        return {
            ...state,
            all: tableAll,
            ...updates
        }
    } else if (action.type === "row/deletRow") {
        const filter = state.all.filter((row) => row.id != action.payload)
        let updates = update(filter)

        return {
            ...state,
            all: filter,
            ...updates
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
        let updates = update(filterAll)

        return {
            ...state,
            all: filterAll,
            ...updates
        }
    }

    return state
}

export { tableDayReducer }
