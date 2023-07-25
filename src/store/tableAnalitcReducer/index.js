const stateInit = {}

function tableAnalitcReducer(state = stateInit, action) {
    if (action.type === "tableData/setData") {
        return {...action.payload}
    }
    if (action.type === "tableData") {
        let columnsInputs = []
        let columnsOutputs = []
        let dataInputs = [...state.data.inputs]
        let dataOutputs = [...state.data.inputs]
        let dataTotal = {...state.dataTotal}

        action.payload.forEach((row) => {
            row.inputs.columns.filter(col => !columnsInputs.includes(col) ? columnsInputs.push(col) : null)
            row.outputs.columns.filter(col => !columnsOutputs.includes(col) ? columnsOutputs.push(col) : null)

            if (row.inputs.columns.length != 0) {
                dataInputs.push(row.inputs)
            }
            if (row.outputs.columns.length != 0) {
                dataOutputs.push(row.outputs)
            }
            dataTotal.totalInputs += row.inputs.total
            dataTotal.totalOutputs += row.outputs.total
            dataTotal.total = dataTotal.totalInputs - dataTotal.totalOutputs
        })

        columnsInputs.unshift("date")
        columnsOutputs.unshift("date")
        columnsInputs.push("total")
        columnsOutputs.push("total")

        return {
            columns: {
                inputs: columnsInputs,
                outputs: columnsOutputs,
            },
            data: {
                inputs: dataInputs,
                outputs: dataOutputs,
            },
            dataTotal: dataTotal,
        }
    }

    return state
}

export { tableAnalitcReducer }
