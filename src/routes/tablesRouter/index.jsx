import { Button } from "../../components/button"
import { useState } from "react"
import { connect } from "react-redux"
import { store } from "../../store"
import { useLoaderData } from "react-router-dom"
import { TableRows } from "../../components/tableRows"

async function loaderTable() {
    return store.getState().tableMonth
}

function TablesRouter({ table }) {
    const tableData = useLoaderData()
    const [tableDescription, setTableDescription] = useState(true)

    return (
        <section className="w-full min-h-[480px]">
            <div className="p-5 border-y-[10px] border-zinc-300">
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
                </div>
            </div>
            <div className="w-full h-full my-2 ">
                <TableRows dataMonth={tableData} />
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
