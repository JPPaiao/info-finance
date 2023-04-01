function Inputs({ children, name, required, type, place, value, onChange }) {
    return (
        <div className="flex flex-col gap-1 font-semibold">
            <label htmlFor={type}>{children}</label>
            <input
                type={type}
                name={name}
                placeholder={place}
                value={value}
                onChange={onChange}
                required={required}
                className="outline-none px-4 py-2 border-zinc-500 rounded-md border-2 hover:border-blue-700 focus:border-blue-700"
            />
        </div>
    )
}

export { Inputs }