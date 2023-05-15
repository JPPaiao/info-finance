function Button({ children, type, style, onClick, className }) {
    onClick = (onClick == undefined) ? null : onClick

    return (
        <div className="text-center flex justify-center items-center">
            <button
                style={style}
                type={type}
                onClick={onClick}
                className={"rounded bg-blue-900 hover:bg-blue-600 text-white transition-all " + className}
            >
                {children}
            </button>
        </div>
    )
}

export { Button }