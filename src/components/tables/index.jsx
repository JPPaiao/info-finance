import { useTable } from "react-table"
import { Button } from "../button"

function Tables({ columns, data, stateRows }) {
    const [rowsTable, setRowsTable] = stateRows
    const tableInstance = useTable({ columns, data })
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance

    const handleEdit = (id) => {

    }

    const handleDelete = (id) => {
        const deleteRow = rowsTable.filter(row => row.id != id)
        setRowsTable(deleteRow)
    }

    return (
        <table
            {...getTableProps()}
            className="bg-zinc-200 p-5 w-full"
        >
            <thead className="w-full">
                {
                    headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}
                            className="flex justify-around"
                        >
                            {
                                headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()}>
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
            <tbody {...getTableBodyProps()} className="w-full">
                {
                    rows.map(row => {
                        prepareRow(row)
                        return (
                            <tr
                                {...row.getRowProps()}
                                className="border-2 border-zinc-100 flex justify-around w-full"
                            >
                                {
                                    row.cells.map(cell => {
                                        return (
                                            <td
                                                {...cell.getCellProps()}
                                                className="text-center"
                                            >
                                                {
                                                    cell.render('Cell')
                                                }
                                            </td>
                                        )
                                    })
                                }
                                <td className="flex gap-3">
                                    <Button
                                        onClick={() => handleEdit(row.cells[0].value)}
                                        className={"px-2 py-1"}
                                    >
                                        edit
                                    </Button>
                                    <Button
                                        onClick={() => handleDelete(row.cells[0].value)}
                                        className={"px-2 py-1"}
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

export { Tables }