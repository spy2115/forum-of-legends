export default function Button({label}) {
    return (
        <button className="px-6 py-2 bg-emerald-800 text-white rounded hover:bg-emerald-900">
          {label}
        </button>
    )
}