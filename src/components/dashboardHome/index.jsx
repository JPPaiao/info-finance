import { Form } from "react-router-dom"
import { useEffect, useMemo, useState } from "react"
import { Inputs } from "../inputs"
import { Button } from "../button"
import { store } from "../../store"
import { connect } from "react-redux"
import { UpIcon, DownIcon } from "../icons/icons"
import { TrashIcon, EditIcon } from "../icons/icons"
import Popup from "../popup"
import Tables from "../tables"

async function actionDashboard({ request }) {
    const formData = await request.formData()
    const updates = Object.fromEntries(formData)
    const date = new Date()
    const state = store

    updates['date'] = date.toLocaleDateString()
    state.dispatch({
        type: 'row/addRow',
        payload: updates
    })

    return updates
}

function DashboardHome({ table, deletRow, saveTableStore }) {
    const [modal, setModal] = useState({isOpen: false})
    const [load, setLoad] = useState(true)
    const [tableAll, setTableAll] = useState([])
    const [control, setControl] = useState(true)

    const handleEdit = (id) => {
        setModal({
            isOpen: true,
            id: id
        })
    }

    const handleDelete = (id) => {
        deletRow(id)
    }

    useEffect(() => {
        setTableAll(table.all)
    }, [table.all])

    useEffect(() => {
        async function saveTable() {
            setLoad(false)
            let dataJson = table.all.length > 0 ? table.all : null
            if (dataJson != null) {
                await fetch('http://127.0.0.1:5000/analysis/tableMonth', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(dataJson)
                })
                .then(r => r.json())
                .then(data => {
                    saveTableStore(data)
                    setLoad(true)
                })
                .catch(e => {
                    console.log(e)
                    setLoad(true)
                })
            }
        }

        saveTable()
    }, [control])

    const data = useMemo(
        () => tableAll.map(rows => {
                let descriptionRow = rows.description == 'inputs' ? 'entrada' : 'saída'
                const buttonsTable = [
                    <>
                        <Button
                            onClick={() => handleEdit(rows.id)}
                            className={"px-2 py-[1px]"}
                        >
                            <EditIcon className={"w-4"}/>
                        </Button>
                        <Button
                            onClick={() => handleDelete(rows.id)}
                            className={"px-2 py-[1px]"}
                        >
                            <TrashIcon className={"w-4"}/>
                        </Button>
                    </>
                ]

                return {
                    col1: rows.id,
                    col2: rows.value,
                    col3: rows.column,
                    col4: descriptionRow,
                    col5: rows.date,
                    col6: buttonsTable[0],
                }
            }
        ), [tableAll]
    )

    const columns = useMemo(
        () => {
            let buttonSave = <Button className={"px-2 py-1 text-base"}>
                {
                    load
                      ? <div onClick={() => setControl(!control)}>Salvar tabela</div>
                      : <div>Salvo com sucesso!</div>
                }
            </Button>

            return [
                {
                    Header: 'ID',
                    accessor: 'col1',
                },
                {
                    Header: 'Valor',
                    accessor: 'col2',
                },
                {
                    Header: 'Coluna',
                    accessor: 'col3',
                },
                {
                    Header: 'Descrição',
                    accessor: 'col4',
                },
                {
                    Header: 'Data',
                    accessor: 'col5',
                },
                {
                    Header: buttonSave,
                    accessor: 'col6',
                },
            ]
        },
        []
    )

    return (
        <section className="max-w-4xl mx-auto" id="popup-root">
            <div className="flex gap-5 justify-between my-3">
                <div className="px-10 py-4 m-1 w-72 rounded-sm bg-white shadow-lg">
                    <div className="flex flex-col gap-1">
                        <div className="text-2xl font-semibold text-center flex items-center justify-between text-green-600">
                            <UpIcon classname={"text-green-600"} />
                            <h1 className="flex justify-between items-center gap-3">
                                <span>R$</span>
                                +{table.totalInputs === 0 ? '0.000' : table.totalInputs}
                            </h1>
                        </div>
                    </div>
                    <hr className="border-zinc-700 my-3 w-full"/>
                    <div className="text-center text-3xl font-semibold">Entradas</div>
                </div>
                <div className="px-10 py-4 m-1 w-72 rounded-sm bg-white shadow-lg">
                    <div className="flex flex-col gap-1">
                        <div className="text-2xl font-semibold flex justify-between items-center text-red-600">
                            <DownIcon classname={"text-red-600"} />
                            <h1 className="flex justify-between items-center gap-3">
                                <span>R$</span>
                                -{table.totalOutputs === 0 ? '0.000' : table.totalOutputs}
                            </h1>
                        </div>
                    </div>
                    <hr className="border-zinc-700 my-3"/>
                    <div className="text-center text-3xl font-semibold">Saidas</div>
                </div>
                <div className="px-10 py-4 m-1 w-72 rounded-sm bg-white shadow-lg">
                    <div className="flex flex-col gap-1">
                        <h1
                            className="text-2xl font-semibold flex justify-between"
                            style={table.total > 0 ? {color: "#29A34A"} : table.total < 0 ? {color: "#DC2626"} : {color: "black"}}
                        >
                            <span>R$ </span>
                            {table.total === 0 ? '0.000' : table.total}

                        </h1>
                    </div>
                    <hr className="border-zinc-700 my-3"/>
                    <div className="text-center text-3xl font-semibold">Saldo</div>
                </div>
            </div>
            <div className="mt-3">
                <section className="flex flex-col justify-center mx-auto w-full rounded-sm bg-white shadow-lg">
                    <h1 className="font-semibold text-center m-1 text-xl">Digite o valor de entrada ou saida</h1>
                    <Form method="post" className="flex gap-5 justify-center items-center m-3">
                        <Inputs
                            type={"number"}
                            name={"value"}
                            place={"Digite o valor"}
                            required={true}
                            className={"px-3 py-1 w-44"}
                        />
                        <Inputs
                            type={"text"}
                            name={"column"}
                            place={"Digite a coluna"}
                            required={true}
                            className={"px-3 py-1 w-44"}
                        />
                        <Inputs
                            type={"radio"}
                            name={"description"}
                            value={"inputs"}
                            children={"Entrada"}
                        />
                        <Inputs
                            type={"radio"}
                            name={"description"}
                            value={"outputs"}
                            children={"Saida"}
                        />
                        <Button children={"Adicionar"} className={"w-full px-2 py-2"} />
                    </Form>
                <Popup modal={modal} setModal={setModal} />
                </section>
                <section className="h-full py-4">
                    <Tables data={data} columns={columns} setModal={setModal}  />
                </section>
            </div>
        </section>
    )
}

const mapStateToProps = state => {
    return {
        table: state.tableDay
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deletRow: (id) => dispatch({ type: 'row/deletRow', payload: id }),
        saveTableStore: (newTable) => dispatch({ type: "tableData/setData", payload: newTable})
    }
}

export { actionDashboard }
export default connect(mapStateToProps, mapDispatchToProps)(DashboardHome)
