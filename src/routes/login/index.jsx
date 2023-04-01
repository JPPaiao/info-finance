import { Link, Form, useActionData, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Button } from "../../components/button"
import { Inputs } from "../../components/inputs"
import { useAuth } from "../../context/authProvider"

async function actionLogin({ request }) {
    const formData = await request.formData()
    const updates = Object.fromEntries(formData)

    const response = await fetch('http://127.0.0.1:5000/auth/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updates)
    })
    .then(r => r.json())
    .catch(r => r.json())

    if (response.Error) {
        return response
    }

    return response
}

function Login() {
    const auth = useAuth()
    const response = useActionData()
    const navigate = useNavigate()
    const [error, setError] = useState({})
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    })

    useEffect(() => {
        const handleLogin = async () => {
            if (response) {
                if (response.Error) {
                    setError(response)
                } else {
                    let nav = await auth.login(response.user)
                    navigate(nav)
                }
            }
        }
        handleLogin()
    }, [response])

    console.log(response)

    return (
        <div className="flex gap-10 justify-between h-screen w-full text-black">
            <section className="p-6 w-full flex justify-center">
                <div className="max-w-sm mx-auto w-full sm:m-auto">
                    <h1 className="text-xl text-center font-bold text-black">Info financeiro</h1>
                    <div className="mt-7">
                        <h2 className="font-bold text-center text-4xl text-blue-900">Login</h2>
                        {
                            (error == {})
                            ? (
                                <>
                                    {" "}
                                </>
                            ) : (
                                <p className="pt-4 text-center text-xl text-red-700 font-bold">
                                    {error.Error}
                                </p>
                            )
                        }
                        <Form method="post" className="flex flex-col gap-5 my-6">
                            <Inputs
                                children={"Email"}
                                name={"email"}
                                type={"email"}
                                value={inputs.email}
                                onChange={e => setInputs({...inputs, email: e.target.value})}
                                place={"Example@gmail.com"}
                            />
                            <Inputs
                                children={"Senha"}
                                name={"password"}
                                type={"password"}
                                value={inputs.password}
                                onChange={e => setInputs({...inputs, password: e.target.value})}
                                place={"*********"}
                            />
                            <Button children={"Entre"} type={"submit"} />
                        </Form>
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

export { Login, actionLogin }