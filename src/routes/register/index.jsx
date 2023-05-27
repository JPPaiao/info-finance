import { useState } from "react"
import { Inputs } from "../../components/inputs"
import { Button } from "../../components/button"
import { Link } from "react-router-dom"

function Register() {
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
        number: "",
    })

    function handleChange(e) {
        let inputValue = e.target.value
        let inputName = e.target.name

        if (inputName === 'name') {
            setInputs({ ...inputs, name: inputValue })
        } else if (inputName === 'email') {
            setInputs({ ...inputs, email: inputValue })
        } else if (inputName === 'password') {
            setInputs({ ...inputs, password: inputValue })
        } else if (inputName == 'number') {
            setInputs({ ...inputs, number: inputValue })
        }
    }

    return (
        <div className="flex w-full h-screen justify-between gap-1">
            <section className="p-2 max-w-lg w-full flex justify-center items-center">
                <div className="max-w-sm mx-auto w-full sm:auto">
                    <h1 className="text-xl text-center font-bold text-black">Info financeiro</h1>
                    <div className="mt-2">
                        <h2 className="font-bold text-center text-4xl text-blue-900">Cadastro</h2>
                        <form className="flex flex-col gap-5 my-6">
                            <Inputs
                                name={"name"}
                                type={"text"}
                                place={"Nome"}
                                required={true}
                                value={inputs.name}
                                onChange={e => handleChange(e)}
                                className={"px-3 py-[6px]"}
                            />
                            <Inputs
                                name={"email"}
                                type={"email"}
                                place={"Email"}
                                required={true}
                                value={inputs.email}
                                onChange={e => handleChange(e)}
                                className={"px-3 py-[6px]"}
                            />
                            <Inputs
                                name={"password"}
                                type={"password"}
                                place={"Senha"}
                                required={true}
                                value={inputs.password}
                                onChange={e => handleChange(e)}
                                className={"px-3 py-[6px]"}
                            />
                            <Inputs
                                type={"password"}
                                place={"Confirmar senha"}
                                className={"px-3 py-[6px]"}
                            />
                            <Inputs
                                name={"number"}
                                type={"number"}
                                place={"Celular"}
                                required={true}
                                value={inputs.number}
                                onChange={e => handleChange(e)}
                                className={"px-3 py-[6px]"}
                            />
                            <Button
                                children={"Entre"}
                                type={"button"}
                                onClick={() => console.log(inputs)}
                                className={"w-[90%] text-xl py-2"}
                            />
                        </form>
                        <div className="text-center text-sm">
                            <p className="text-zinc-800 font-semibold">Ja possui conta? <Link className="text-blue-900 hover:text-blue-600 font-bold" to="/">Entrar</Link></p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="sm:block hidden w-full">
                <img
                    src="https://img.freepik.com/free-photo/businesspeople-working-finance-accounting-analyze-financi_74952-1411.jpg?w=740&t=st=1681439990~exp=1681440590~hmac=40b40208f0d60ea6f2cf0b1b31ff8c69027d5f7d8d2eb0ae7e0ce53f17739503"
                    alt=""
                    className="w-full h-full"
                />
            </section>
        </div>
    )
}

export { Register }