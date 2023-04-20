const stateInit = {
    data: {
        expenses: [],
        revenues: [],
    },
    columns: [
        {
            Header: "Data",
            accessor: "col1",
        },
    ],
};

function tableAnalitcReducer(state = stateInit, action) {
    if (action.type === "tableData/setData") {
        return state;
    } else if (action.type === "tableColumns/revenues") {
        const columnsRevenues = [
            "",
            "Caixa",
            "Cartão",
            "Pix",
            "Ifood",
            "",
            "Total",
        ];
        const newColumns = [state.columns[0]];
        columnsRevenues.map((column, index) => {
            newColumns.push({
                Header: column,
                accessor: `col${index + 3}`,
            });
        });

        return {
            ...state,
            columns: newColumns,
        };
    }

    return state;
}

export { tableAnalitcReducer };
