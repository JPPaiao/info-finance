import { Inputs } from "../../components/inputs"
import { Button } from "../../components/button"
import { Link } from "react-router-dom"

function Register() {
    return (
        <div className="flex w-full h-full gap-10 justify-between">
            <section className="p-4 w-full justify-center">
                <div className="max-w-sm mx-auto w-full sm:auto">
                    <h1 className="text-xl text-center font-bold text-black">Info financeiro</h1>
                    <div className="mt-2">
                        <h2 className="font-bold text-center text-4xl text-blue-900">Cadastro</h2>
                        <form className="flex flex-col gap-4 my-5">
                            <Inputs children={"Nome"} type={"text"} place={"Nome Exemplo da Silva"} />
                            <Inputs children={"Email"} type={"email"} place={"Exemplo@gmail.com"} />
                            <Inputs children={"Senha"} type={"password"} place={"*********"} />
                            <Inputs children={"Confirmar senha"} type={"password"} place={"*********"} />
                            <Button children={"Entre"} type={"button"} />
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