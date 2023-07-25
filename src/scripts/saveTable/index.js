import { store } from "../../store"

async function saveTable() {
    const table = store.getState().tableDay.all
    let dataJson = table.length > 0 ? table : null
    if (dataJson != null) {
        const data = await fetch('http://127.0.0.1:5000/analysis/tableMonth', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataJson)
        })
        .then(r => r.json())
        .catch(e => [])
        
        store.dispatch({ type: "tableData/setData", payload: data })
    }
}

export { saveTable }
