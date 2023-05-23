import { Button } from '../button'
import { Form } from 'react-router-dom'
import { Inputs } from '../inputs'
import { connect } from 'react-redux'
import { useState } from 'react'

function Popup({ table, modal, setModal, editRow }) {
    if (!modal.isOpen) {
        return null
    }
    let state = table.all.filter(row => row.id == modal.id ? row : null)
    const [newValues, setNewValues] = useState(state[0])
    const handleEditRow = () => {
        editRow(newValues)
        setModal({isOpen: !modal.isOpen})
    }

    return (
        <>
            <div className='fixed top-0 left-0 right-0 bottom-0 z-50 opacity-90 bg-neutral-900 flex items-center justify-center'></div>
            <div className='text-center w-[400px] h-28 bg-zinc-200 rounded-md p-3 z-[999] absolute right-[36%]'>
                <div>
                    <Form className='flex items-center justify-center gap-3'>
                        <div>
                            id:
                            {modal.id}
                        </div>
                        <Inputs
                            type={"number"}
                            name={"value"}
                            value={newValues.value}
                            place={modal.value}
                            onChange={e => setNewValues({...newValues, value: e.target.value})}
                            required={false}
                            className={"px-1 w-24"}
                        />
                        <Inputs
                            type={"text"}
                            name={"column"}
                            value={newValues.column}
                            place={modal.column}
                            onChange={e => setNewValues({...newValues, column: e.target.value})}
                            required={false}
                            className={"px-1 w-24"}
                        />
                        <Inputs
                            type={"radio"}
                            name={"description"}
                            children={"Entrada"}
                            value={"input"}
                            onClick={e => setNewValues({...newValues, description: e.target.value})}
                        />
                        <Inputs
                            type={"radio"}
                            name={"description"}
                            children={"Saida"}
                            value={"output"}
                            onClick={e => setNewValues({...newValues, description: e.target.value})}
                        />
                    </Form>
                </div>
                <div className='flex items-center gap-3 justify-center mt-4'>
                    <Button
                        onClick={() => handleEditRow()}
                        type={"button"}
                        className={"px-2 py-1"}
                    >
                        Salvar
                    </Button>
                    <Button
                        onClick={() => setModal(!modal.isOpen)}
                        className={"px-2 py-1"}
                    >
                        Voltar
                    </Button>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        table: state.tableDay
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editRow: (newValue) => dispatch({ type: 'row/editRow', newValue }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Popup)
