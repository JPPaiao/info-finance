function Button({ children, type, onClick }) {
    onClick = (onClick == undefined) ? null : onClick

    return (
        <div className="text-center mt-2">
            <button
                type={type}
                onClick={onClick}
                className="rounded-lg text-xl bg-blue-900 hover:bg-blue-600 px-2 py-2 w-[90%] text-white"
            >
                {children}
            </button>
        </div>
    )
}

export { Button }