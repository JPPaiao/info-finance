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
    const [columnsTable, setColumnsTable] = useState(table.columns)

    useEffect(() => {
        setColumnsTable(table.columns)
    }, [table.columns])

    console.log(columnsTable)

    const data = useMemo(
        () => tableData.data.inputs.map((row, index) => {
                let rowsData = {
                    col0: row['date'],
                }

                for (let c=1; c <= columnsTable.inputs.length; c++) {
                    rowsData['col'+c] = row[columnsTable.inputs[c-1]]
                }

                return rowsData
            }
        ),
        [tableData.data.inputs]
    )

    const columns = useMemo(
        () => table.columns.inputs.map((column, index) => ({
            Header: column,
            accessor: `col${index + 1}`,
        })),
        [table.columns.inputs]
    )

    return (
        <section className="bg-zinc-400 rounded p-4 w-full min-h-[480px]">
            <div className="flex gap-2 my-2">
                <select name="select">
                    <option defaultValue={"v1"} >Dia</option>
                    <option defaultValue={"v2"}>Semana</option>
                    <option defaultValue={"v3"} selected>Mes</option>
                </select>
                <Button className={"px-2 bg-zinc-500 hover:bg-zinc-800"}>Receitas</Button>
                <Button className={"px-2 bg-zinc-500 hover:bg-zinc-800"}>Despesas</Button>
                <Button className={"px-2 bg-zinc-500 hover:bg-zinc-800"}>Colunas</Button>
            </div>
            <div className="w-full h-full p-2 my-2">
                <Tables columns={columns} data={data} />
            </div>
        </section>
    )
}

const mapStateToProps = state => {
    return {
        table: state.tableMonth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        revenues: () => dispatch({ type: "tableColumns/revenues" })
    }
}

export { loaderTable }
export default connect(mapStateToProps, mapDispatchToProps)(TablesRouter)
