import { useState } from "react"
import { UpIcon, DownIcon } from "../icons/icons"

function TableRows({ dataMonth }) {
    const [dataMonths, setDataMonths] = useState(dataMonth)    
    let months

    dataMonth === null || dataMonth === {} || dataMonth === undefined
    ? (
        <div></div>
    ) : months = Object.keys(dataMonths)

    return (
        <div className="max-w-lg">
            {
                months.map(month => {
                    return (
                        <div className="border-b-[10px] border-zinc-300 px-10 py-4">
                            <h1 className="text-6xl px-1 font-semibold text-zinc-900">
                                {month}
                            </h1>
                            {
                                Object.keys(dataMonths[month]).map(day => {
                                    let total_day = dataMonths[month][day]['total_day']
                                    console.log(dataMonths[month][day])
                                    return (
                                        <div className="py-3">
                                            <div className="flex justify-between px-1 py-2 font-medium text-zinc-900">
                                                <h2 className="text-3xl">
                                                    {day}/{month}
                                                </h2>
                                                <span 
                                                    style={total_day > 0 
                                                        ? {color: "rgb(67, 137, 94)"}
                                                        : {color: "rgb(196, 53, 44)"}
                                                    }
                                                    className="text-2xl"
                                                >
                                                    R$ {total_day}
                                                </span>
                                            </div>
                                            {
                                                dataMonths[month][day]['days'].map(data => {
                                                    let icon = data.description == "inputs" ? <UpIcon classname={"text-green-600"} /> : <DownIcon classname={"text-red-600"} />
    
                                                    return (
                                                        <div 
                                                            className="flex gap-1 justify-between max-w-md items-center text-xl my-1 p-1 border-b-2 border-zinc-800"
                                                        >
                                                            <span className="border-r-2 border-zinc-800 px-5">
                                                                {icon}
                                                            </span>
                                                            <span className="text-2xl px-3">
                                                                {data.text} 
                                                            </span>
                                                            <span className="text-xl px-2">
                                                                R$ {data.value}
                                                            </span>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
        </div>
    ) 
}

export { TableRows }
