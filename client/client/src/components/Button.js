import { Link } from "react-router-dom";

export default function Button({label, address}) {
    return (
        <button className="px-6 py-2 bg-emerald-900 text-white rounded-lg hover:bg-emerald-950">
          <a href={address}>
            {label}
          </a>
        </button>
    )
}