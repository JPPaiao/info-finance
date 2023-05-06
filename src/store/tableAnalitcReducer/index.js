const stateInit = {
    columns: {
        inputs: [],
        outputs: [],
    },
    data: {
        inputs: [],
        outputs: []
    }
}

function tableAnalitcReducer(state = stateInit, action) {
    if (action.type === "tableData/setData") {
        let columnsInputs = action.payload[0].inputs.columns
        let columnsOutputs = action.payload[0].outputs.columns
        let newColumnsInputs = columnsInputs.filter((col, i) => columnsInputs.indexOf(col) === i)
        let newColumnsOutputs = columnsOutputs.filter((col, i) => columnsOutputs.indexOf(col) === i)

        newColumnsInputs.unshift('date')
        newColumnsOutputs.unshift('date')
        newColumnsInputs.push('total')
        newColumnsOutputs.push('total')

        return {
            columns: {
                inputs: newColumnsInputs,
                outputs: newColumnsOutputs,
            },
            data: {
                inputs: [
                    ...state.data.inputs,
                    action.payload[0].inputs
                ],
                outputs: [
                    ...state.data.outputs,
                    action.payload[0].outputs
                ],
            }
        }
    }

    return state
}

export { tableAnalitcReducer }
