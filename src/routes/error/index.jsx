import { useRouteError } from "react-router-dom"

function ErrorPage() {
    const error = useRouteError()
    console.error(error)

    return (
        <div className="">
            <h1>Oops!</h1>
            <p>Desculpe, houve um erro inesperado</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    )
}

export { ErrorPage }