import { useTable } from "react-table"
import { Button } from "../button"
import { connect } from "react-redux"
import { TrashIcon, EditIcon } from "../icons/icons"

function Tables({ table, updates, deletRow, editRow, columns, data, setModal }) {
    const tableInstance = useTable({ columns, data })
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance

    // const handleEdit = (row) => {
    //     setModal({
    //         isOpen: true,
    //         id: row[0].value,
    //         value: row[1].value,
    //         column: row[2].value,
    //         description: row[3].value,
    //     })
    //     updates()
    // }

    // const handleDelete = (id) => {
    //     deletRow(id)
    //     updates()
    // }

    return (
        <table
            {...getTableProps()}
            className="bg-zinc-300 p-5 w-full flex flex-col rounded-md"
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
                                        className="flex items-center justify-center w-36 border border-zinc-400"
                                    >
                                        {
                                            column.render('Header')
                                        }
                                    </th>
                                ))
                            }
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
                                                className="border flex items-center justify-center border-zinc-400 text-center w-36"
                                            >
                                                {
                                                    cell.render('Cell')
                                                }
                                            </td>
                                        )
                                    })
                                }
                                {/* <td className="flex justify-center w-32 px-2 gap-3 border border-zinc-400">
                                    <Button
                                        onClick={() => handleEdit(row.cells)}
                                        className={"px-2 py-[2px]"}
                                    >
                                        <EditIcon className={"w-4"}/>
                                    </Button>
                                    <Button
                                        onClick={() => handleDelete(row.cells[0].value)}
                                        className={"px-2 py-[2px]"}
                                    >
                                        <TrashIcon className={"w-4"}/>
                                    </Button>
                                </td> */}
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
        updates: () => dispatch({ type: 'table/separetor' }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tables)
