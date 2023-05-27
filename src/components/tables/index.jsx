import { useTable } from "react-table"
import { connect } from "react-redux"

function Tables({ columns, data }) {
    const tableInstance = useTable({ columns, data })
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance

    return (
        <table
            {...getTableProps()}
            className="bg-white p-5 w-full flex flex-col rounded-sm shadow-lg"
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
                                        className="flex items-center justify-center w-36 border border-zinc-400 text-lg"
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
                                                className="border flex items-center justify-center border-zinc-400 text-center gap-2 w-36 text-lg"
                                            >
                                                {
                                                    cell.render('Cell')
                                                }
                                            </td>
                                        )
                                    })
                                }
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

export default connect(mapStateToProps)(Tables)
