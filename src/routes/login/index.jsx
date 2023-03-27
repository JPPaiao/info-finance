import { Link } from "react-router-dom"
import { Button } from "../../components/button"
import { Inputs } from "../../components/inputs"

function Login() {
    return (
        <div className="flex gap-10 justify-between h-screen w-full text-black">
            <section className="p-6 w-full flex justify-center">
                <div className="max-w-sm mx-auto w-full sm:m-auto">
                    <h1 className="text-xl text-center font-bold text-black">Info financeiro</h1>
                    <div className="mt-7">
                        <h2 className="font-bold text-center text-4xl text-blue-900">Login</h2>
                        <form className="flex flex-col gap-5 my-6">
                            <Inputs children={"Email"} type={"email"} place={"Example@gmail.com"} />
                            <Inputs children={"Senha"} type={"password"} place={"*********"} />
                            <Button children={"Entre"} type={"button"} />
                        </form>
                        <div className="text-center text-sm">
                            <p className="text-zinc-800 font-semibold">Ainda não tem conta? <Link className="text-blue-900 hover:text-blue-600 font-bold" to="register">Cadastre-se</Link></p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="sm:block hidden w-full">
                img
            </section>
        </div>
    )
}

export { Login }