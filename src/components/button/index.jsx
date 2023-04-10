function Button({ children, type, onClick, className }) {
    onClick = (onClick == undefined) ? null : onClick

    return (
        <div className="text-center flex justify-center items-center">
            <button
                type={type}
                onClick={onClick}
                className={"rounded-lg bg-blue-900 hover:bg-blue-600 text-white " + className}
            >
                {children}
            </button>
        </div>
    )
}

export { Button }