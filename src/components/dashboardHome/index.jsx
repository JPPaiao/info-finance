import { Form } from "react-router-dom"
import { useMemo } from "react"
import { Inputs } from "../inputs"
import { Button } from "../button"
import { store } from "../../store"
import { connect } from "react-redux"
import Tables from "../tables"

async function actionDashboard({ request }) {
    const formData = await request.formData()
    const updates = Object.fromEntries(formData)
    const state = store

    state.dispatch({
        type: 'row/addRow',
        payload: updates
    })
    state.dispatch({
        type: 'table/separetor',
    })

    return updates
}

function DashboardHome({ table }) {
    const data = useMemo(
        () => {
            return table.all.map(r => ({
                col1: r.id,
                col2: r.value,
                col3: r.column,
                col4: r.description,
                col5: r.date,
            }))
        },
        [table.all]
    )

    const columns = useMemo(
        () => [
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
        ],
        []
    )

    return (
        <section className="max-w-4xl mx-auto">
            <div className="flex gap-7 justify-center my-3">
                <div className="px-10 py-4 m-1 rounded-md bg-zinc-200">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl font-semibold">Hoje R$ {table.totalRevenues}</h1>
                        <span className="text-sm text-neutral-500">Mês/jan R$2,000</span>
                    </div>
                    <hr className="border-zinc-700 my-3"/>
                    <div className="text-center text-3xl font-semibold">Entradas</div>
                </div>
                <div className="px-10 py-4 m-1 rounded-md bg-zinc-200">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl font-semibold">Hoje R$ {table.totalExpenses}</h1>
                        <span className="text-sm text-neutral-500">Mês/jan R$2,000</span>
                    </div>
                    <hr className="border-zinc-700 my-3"/>
                    <div className="text-center text-3xl font-semibold">Saidas</div>
                </div>
                <div className="px-10 py-4 m-1 rounded-md bg-zinc-200">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl font-semibold">Hoje R$ {table.total}</h1>
                        <span className="text-sm text-neutral-500">Mês/jan R$2,000</span>
                    </div>
                    <hr className="border-zinc-700 my-3"/>
                    <div className="text-center text-3xl font-semibold">Total</div>
                </div>
            </div>
            <div className="mt-3">
                <section className="flex flex-col justify-center mx-auto w-[85%] rounded-lg bg-zinc-200">
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
                            value={"entrada"}
                            children={"Entrada"}
                        />
                        <Inputs
                            type={"radio"}
                            name={"description"}
                            value={"saida"}
                            children={"Saida"}
                        />
                        <Button children={"Adicionar"} className={"w-full px-3 py-2"} />
                    </Form>
                </section>
                <section className="h-full p-4">
                    <Tables data={data} columns={columns} />
                </section>
            </div>
        </section>
    )
}

const mapStateToProps = state => {
    return {
        table: state.table
    }
}

export { actionDashboard }
export default connect(mapStateToProps)(DashboardHome)
