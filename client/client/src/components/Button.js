export default function Button({label}) {
    return (
        <button className="px-6 py-2 bg-emerald-900 text-white rounded-lg hover:bg-emerald-950">
          {label}
        </button>
    )
}