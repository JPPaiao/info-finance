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
        <div className="flex w-full h-full gap-10 justify-between">
            <section className="p-4 w-full justify-center">
                <div className="max-w-sm mx-auto w-full sm:auto">
                    <h1 className="text-xl text-center font-bold text-black">Info financeiro</h1>
                    <div className="mt-2">
                        <h2 className="font-bold text-center text-4xl text-blue-900">Cadastro</h2>
                        <form className="flex flex-col gap-4 my-5">
                            <Inputs
                                children={"Nome"}
                                name={"name"}
                                type={"text"}
                                place={"Nome Exemplo da Silva"}
                                required={true}
                                value={inputs.name}
                                onChange={e => handleChange(e)}
                            />
                            <Inputs
                                children={"Email"}
                                name={"email"}
                                type={"email"}
                                place={"Exemplo@gmail.com"}
                                required={true}
                                value={inputs.email}
                                onChange={e => handleChange(e)}
                            />
                            <Inputs
                                children={"Senha"}
                                name={"password"}
                                type={"password"}
                                place={"*********"}
                                required={true}
                                value={inputs.password}
                                onChange={e => handleChange(e)}
                            />
                            <Inputs
                                children={"Confirmar senha"}
                                type={"password"}
                                place={"*********"}
                            />
                            <Inputs
                                children={"Celular"}
                                name={"number"}
                                type={"number"}
                                place={"(00) 00000-0000"}
                                required={true}
                                value={inputs.number}
                                onChange={e => handleChange(e)}
                            />
                            <Button
                                children={"Entre"}
                                type={"button"}
                                onClick={() => console.log(inputs)}
                            />
                        </form>
                        <div className="text-center text-sm">
                            <p className="text-zinc-800 font-semibold">Ja possui conta? <Link className="text-blue-900 hover:text-blue-600 font-bold" to="/">Entrar</Link></p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="hidden w-full sm:block">
                img
            </section>
        </div>
    )
}

export { Register }