import { useTable } from "react-table"
import { Button } from "../button"
import { connect } from "react-redux"

function Tables({ table, deleteAll, updates, deletRow, editRow, columns, data }) {
    const tableInstance = useTable({ columns, data })
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance

    const handleEdit = (id) => {
        updates()
    }

    const handleDelete = (id) => {
        deletRow(id)
        updates()
    }

    const handleDeleteAll = () => {
        deleteAll()
        updates()
    }

    return (
        <table
            {...getTableProps()}
            className="bg-zinc-200 p-5 w-full flex flex-col rounded-md"
        >
            <thead
                className="w-full"
            >
                {
                    headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}
                            className="w-full flex justify-center"
                        >
                            {
                                headerGroup.headers.map(column => (
                                    <th
                                        {...column.getHeaderProps()}
                                        className="w-full text-center max-w-[138px] border border-zinc-400"
                                    >
                                        {
                                            column.render('Header')
                                        }
                                    </th>
                                ))
                            }
                            <th className="flex justify-center w-[126px] max-w-[138px] border border-zinc-400">
                                <Button
                                    className={"px-1"}
                                    onClick={() => handleDeleteAll()}
                                >
                                    Resetar tabela
                                </Button>
                            </th>
                        </tr>

                    ))
                }
            </thead>
            <tbody
                {...getTableBodyProps()}
                className="w-full"
            >
                {
                    rows.map(row => {
                        prepareRow(row)
                        return (
                            <tr
                                {...row.getRowProps()}
                                className="w-full flex justify-center"
                            >
                                {
                                    row.cells.map(cell => {
                                        return (
                                            <td
                                                {...cell.getCellProps()}
                                                className="w-full border border-zinc-400 text-center max-w-[138px]"
                                            >
                                                {
                                                    cell.render('Cell')
                                                }
                                            </td>
                                        )
                                    })
                                }
                                <td className="flex justify-center px-2 gap-3 border border-zinc-400">
                                    <Button
                                        onClick={() => handleEdit(row.cells[0].value)}
                                        className={"px-2 py-[2px]"}
                                    >
                                        edit
                                    </Button>
                                    <Button
                                        onClick={() => handleDelete(row.cells[0].value)}
                                        className={"px-2 py-[2px]"}
                                    >
                                        delet
                                    </Button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
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
        editRow: (id) => dispatch({ type: 'row/editRow', id }),
        deleteAll: () => dispatch({ type: 'row/deletAll' }),
        updates: () => dispatch({ type: 'table/separetor' }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tables)
