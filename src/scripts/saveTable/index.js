import { store } from "../../store"

async function saveTable() {
    const tableAll = store.getState().tableDay.all
    let dataJson = JSON.stringify(tableAll.length > 0 ? tableAll : null)
    const data = await fetch('http://127.0.0.1:5000/analysis/tableMonth', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: dataJson
    })
    .then(r => r.json())
    .catch(e => [])

    store.dispatch({ type: "tableData/setData", payload: data })
}

export { saveTable }
