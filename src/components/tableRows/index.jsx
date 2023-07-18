import { UpIcon, DownIcon } from "../icons/icons"

function TableRows() {

    // Dados que vamos receber do back-end
    const dataMonths = {
        julho: {
            20: [
                {
                    id: 1,
                    value: 300,
                    date: "20/07/2023",
                    desciption: "input",
                    text: "caixa"
                },
                {
                    id: 2,
                    value: 300,
                    date: "20/07/2023",
                    desciption: "output",
                    text: "pix"
                },
                {
                    id: 3,
                    value: 300,
                    date: "20/07/2023",
                    desciption: "input",
                    text: "cartao"
                },
            ],
            21: [
                {
                    id: 1,
                    value: 300,
                    date: "21/07/2023",
                    desciption: "output",
                    text: "caixa"
                },
                {
                    id: 2,
                    value: 300,
                    date: "21/07/2023",
                    desciption: "input",
                    text: "cartao"
                },
            ]
        },
        agosto: {
            3: [
                {
                    id: 1,
                    value: 300,
                    date: "3/08/2023",
                    desciption: "input",
                    text: "caixa"
                },
                {
                    id: 2,
                    value: 300,
                    date: "3/08/2023",
                    desciption: "output",
                    text: "pix"
                },
                {
                    id: 3,
                    value: 300,
                    date: "3/08/2023",
                    desciption: "input",
                    text: "cartao"
                },
            ],
            4: [
                {
                    id: 1,
                    value: 300,
                    date: "4/08/2023",
                    desciption: "output",
                    text: "caixa"
                },
                {
                    id: 2,
                    value: 300,
                    date: "4/08/2023",
                    desciption: "input",
                    text: "cartao"
                },
            ]
        }
    }
    const months = Object.keys(dataMonths)
    
    return (
        <div className="w-full mt-7">
            {
                months.map(month => {
                    return (
                        <>
                            <h1 className="text-5xl p-3 font-semibold text-zinc-900">
                                {month}
                            </h1>
                            {
                                Object.keys(dataMonths[month]).map(day => {
                                    return (
                                        <div>
                                            <h2 className="text-2xl px-3 py-1 font-medium text-zinc-900">
                                                {day}/{month}
                                            </h2>
                                            {
                                                dataMonths[month][day].map(data => {
                                                    let icon = data.desciption == "input" ? <UpIcon classname={"text-green-600"} /> : <DownIcon classname={"text-red-600"} />
    
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
                        </>
                    )
                })
            }
        </div>
    ) 
}

export { TableRows }
