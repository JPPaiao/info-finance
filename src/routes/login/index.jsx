import { useEffect, useState } from "react"
import { Form, Link, useActionData, useNavigate } from "react-router-dom"
import { Button } from "../../components/button"
import { EmailIcon, EyeIcon, LockIcon } from "../../components/icons/icons"
import { Inputs } from "../../components/inputs"
import { store } from "../../store"

async function actionLogin({ request }) {
    const storeUser = store
    const formData = await request.formData()
    const updates = Object.fromEntries(formData)
    const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
    })
        .then((r) => r.json())
        .catch((r) => r.json())

    if (response.Error) {
        return response
    }

    storeUser.dispatch({ type: "user/login", payload: response.user })
    return response
}

function Login() {
    const responseAction = useActionData()
    const navigate = useNavigate()
    const [error, setError] = useState({})
    const [eye, setEye] = useState(false)
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    })

    useEffect(() => {
        const handleLogin = () => {
            if (responseAction) {
                if (responseAction.Error) {
                    setError(responseAction)
                } else {
                    navigate("/dashboard")
                }
            }
        };
        handleLogin()
    }, [responseAction])

    return (
        <div className="flex gap-1 justify-between h-screen w-full text-black">
            <section className="p-6 w-full max-w-lg flex justify-center">
                <div className="max-w-sm mx-auto w-full sm:m-auto">
                    <h1 className="text-xl text-center font-bold text-black">
                        Info Finance
                    </h1>
                    <div className="mt-7">
                        <h2 className="font-bold text-center text-4xl text-blue-900">
                            Login
                        </h2>
                        {error == {} ? (
                            <>{" "}</>
                        ) : (
                            <p className="pt-4 text-center text-xl text-red-700 font-bold">
                                {error.Error}
                            </p>
                        )}
                        <Form
                            method="post"
                            className="flex flex-col gap-5 my-6"
                        >
                            <div className="relative">
                                <EmailIcon className="absolute top-[38px] left-3 text-zinc-500" />
                                <Inputs
                                    children={"Email"}
                                    name={"email"}
                                    type={"email"}
                                    value={inputs.email}
                                    place={"Example@gmail.com"}
                                    onChange={(e) =>
                                        setInputs({
                                            ...inputs,
                                            email: e.target.value,
                                        })
                                    }
                                    className={"px-10 py-2"}
                                />
                            </div>
                            <div className="relative">
                                <LockIcon className="absolute top-[38px] left-3 text-zinc-500" />
                                <Inputs
                                    children={"Senha"}
                                    name={"password"}
                                    type={eye ? "text" : "password"}
                                    value={inputs.password}
                                    place={"*********"}
                                    onChange={(e) =>
                                        setInputs({
                                            ...inputs,
                                            password: e.target.value,
                                        })
                                    }
                                    className={"px-10 py-2"}
                                />
                                <span
                                    className="absolute top-[38px] right-3 cursor-pointer"
                                    onClick={() => setEye(!eye)}
                                >
                                    <EyeIcon
                                        eyes={eye}
                                        className={"text-zinc-500"}
                                    />
                                </span>
                            </div>
                            <Button
                                children={"Entre"}
                                type={"submit"}
                                className={"w-[90%] text-xl px-2 py-2"}
                            />
                        </Form>
                        <div className="text-center text-sm">
                            <p className="text-zinc-800 font-semibold">
                                Ainda não tem conta?{" "}
                                <Link
                                    className="text-blue-900 hover:text-blue-600 font-bold"
                                    to="register"
                                >
                                    Cadastre-se
                                </Link>
                            </p>
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

export { Login, actionLogin }
