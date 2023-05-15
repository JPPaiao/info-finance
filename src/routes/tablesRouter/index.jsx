import { Button } from "../../components/button"
import { useEffect, useMemo, useState } from "react"
import { connect } from "react-redux"
import { store } from "../../store"
import { useLoaderData } from "react-router-dom"
import Tables from "../../components/tables"

async function loaderTable() {
    return store.getState().tableMonth
}

function TablesRouter({ table }) {
    const tableData = useLoaderData()
    const [tableDescription, setTableDescription] = useState(true)
    const [columnsTable, setColumnsTable] = useState(tableData.columns.inputs)
    const [dataTable, setDataTable] = useState(tableData.data.inputs)
    const totalInputs = tableData.data.inputs.map(ins => ins['total'] =+ ins['total'])
    const totalOutputs = tableData.data.outputs.map(outs => outs['total'] =+ outs['total'])
    const totalMonth = `R$ ${totalInputs - totalOutputs}`

    useEffect(() => {
        tableDescription ? (
            setColumnsTable(tableData.columns.inputs),
            setDataTable(tableData.data.inputs)
        ) : (
            setColumnsTable(tableData.columns.outputs),
            setDataTable(tableData.data.outputs)
        )
    }, [tableDescription])

    const data = useMemo(
        () => dataTable.map((row, index) => {
                let rowsData = {
                    col1: row['date'],
                }

                for (let c=2; c <= columnsTable.length; c++) {
                    rowsData['col'+c] = `R$ ${parseFloat(row[columnsTable[c-1]])}`
                }

                return rowsData
            }
        ),
        [dataTable]
    )

    const columns = useMemo(
        () => columnsTable.map((column, index) => ({
            Header: column,
            accessor: `col${index + 1}`,
        })),
        [columnsTable]
    )

    return (
        <section className="bg-zinc-400 rounded p-4 w-full min-h-[480px]">
            <div className="flex gap-2 my-2 justify-between">
                <div className="flex gap-3 items-center">
                    <select className="h-6 shadow-lg" name="select">
                        <option defaultValue={"v1"}>Dia</option>
                        <option defaultValue={"v2"}>Semana</option>
                        <option defaultValue={"v3"} selected>Mes</option>
                    </select>
                    <Button
                        style={tableDescription ? { backgroundColor: "#27272A" } : {}}
                        className={"px-2 bg-zinc-500 hover:bg-zinc-800 shadow-lg"}
                        onClick={() => setTableDescription(true)}
                    >
                        Receitas
                    </Button>
                    <Button
                        style={!tableDescription ? { backgroundColor: "#27272A" } : {}}
                        className={"px-2 bg-zinc-500 hover:bg-zinc-800 shadow-lg"}
                        onClick={() => setTableDescription(false)}
                    >
                        Dispesas
                    </Button>
                </div>
                <div className="flex gap-2 p-2 rounded-md bg-zinc-300 font-semibold shadow-lg">
                    <div>Mês: {totalMonth}</div>
                    <div>Entradas: {totalInputs[0] === undefined ? 0 : `R$ ${parseFloat(totalInputs)}`}</div>
                    <div>Saídas: {totalOutputs[0] === undefined ? 0 : `R$ ${parseFloat(totalOutputs)}`}</div>
                </div>
            </div>
            <div className="w-full h-full my-3">
                <Tables columns={columns} data={data} />
            </div>
        </section>
    )
}

const mapStateToProps = state => {
    return {
        table: state.tableMonth,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        revenues: () => dispatch({ type: "tableColumns/revenues" })
    }
}

export { loaderTable }
export default connect(mapStateToProps, mapDispatchToProps)(TablesRouter)
