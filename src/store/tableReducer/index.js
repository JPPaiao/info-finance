const stateInit = {
    revenues: [],
    expenses: [],
    all: [],
    totalRevenues: 0,
    totalExpenses: 0,
    total: 0,
}

function tableReducer(state = stateInit, action) {
    if (action.type === "table/separetor") {
        let sum = 0
        let min = 0
        
        for (let s of state.all) {
            s.description === "entrada"
                ? (sum += Number(s.value))
                : (min += Number(s.value))
        }

        return {
            ...state,
            revenues: state.all.filter((r) => r.description === "entrada"),
            expenses: state.all.filter((r) => r.description === "saida"),
            totalRevenues: sum,
            totalExpenses: min,
            total: sum - min,
        };
    } else if (action.type === "row/addRow") {
        return {
            ...state,
            all: [
                ...state.all,
                {
                    id: !state.all.length
                        ? state.all.length + 1
                        : state.all[state.all.length - 1].id + 1,
                    ...action.payload,
                },
            ],
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
    }

    return state
}

export { tableReducer }
