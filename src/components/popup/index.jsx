import { Button } from '../button'
import { Form } from 'react-router-dom'
import { Inputs } from '../inputs'
import { connect } from 'react-redux'
import { useState } from 'react'

function Popup({ modal, setModal, editRow, updates }) {
    if (!modal.isOpen) {
        return null
    }
    const date = new Date()
    const [newValues, setNewValues] = useState({
        id: modal.id,
        value: modal.value,
        column: modal.column,
        description: modal.description,
        date: date.toLocaleDateString(),
    })
    const handleEditRow = () => {
        editRow(newValues)
        updates()
        setModal({isOpen: !modal.isOpen})
    }

    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center'>
            <div className='text-center w-[400px] h-28 bg-zinc-400 rounded-md p-3'>
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
                            value={"entrada"}
                            onClick={e => setNewValues({...newValues, description: e.target.value})}
                        />
                        <Inputs
                            type={"radio"}
                            name={"description"}
                            children={"Saida"}
                            value={"saida"}
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
        </div>
    )
}

const mapStateToProps = state => {
    return {
        table: state.table
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deletRow: (id) => dispatch({ type: 'row/removeRow', id }),
        editRow: (newValue) => dispatch({ type: 'row/editRow', newValue }),
        updates: () => dispatch({ type: 'table/separetor' }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Popup)
