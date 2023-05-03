import { Button } from "../../components/button"
import { useEffect, useMemo, useState } from "react"
import { connect } from "react-redux"
import Tables from "../../components/tables"
import { store } from "../../store"
import { useLoaderData } from "react-router-dom"

async function loaderTable() {
    const tableData = store.getState().tableDay.all
    let dataJson = JSON.stringify(tableData.length > 0 ? tableData : null)
    const data = await fetch('http://127.0.0.1:5000/analysis/tableMonth', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: dataJson
    })
    .then(r => r.json())
    .catch(e => [])

    store.dispatch({ type: "tableData/setData", data })

    return data
}

function TablesRouter({ table, setData, revenues }) {
    const tableData = useLoaderData()

    useEffect(() => {
        revenues()
    }, [])

    const data = useMemo(
        () =>{
            return table.data.map(row => ({
                col1: row.date,
                col2: "",
                col3: "",
                col4: `R$ ${row.Caixa}`,
                col5: `R$ ${row.Cartão}`,
                col6: `R$ ${row.Pix}`,
                col7: `R$ ${row.Ifood}`,
                col8: "",
                col9: `R$ ${row.total}`,
            }
        ))},
        [table.data]
    )

    const columns = useMemo(
        () => table.columns.map(column => {
            return column
        }),
        [table.columns]
    )

    return (
        <section className="bg-zinc-300 rounded p-4 w-full min-h-[480px]">
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
            <div className="w-full h-full p-2 my-2 bg-zinc-600 ">
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
        revenues: () => dispatch({ type: "tableColumns/revenues" }),
        setData: (data) => dispatch({ type: "tableData/setData", data })
    }
}

export { loaderTable }
export default connect(mapStateToProps, mapDispatchToProps)(TablesRouter)
