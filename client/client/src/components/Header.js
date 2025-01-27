import { useEffect, useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";


export default function Header() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("userName");
        localStorage.removeItem("userId");
        setUser(null);
        navigate("/");
      };

    useEffect(() => {
      const storedUser = localStorage.getItem("userName");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      }
    }, []);

    return (
        <div className="mx-auto max-w-screen-auto px-8 bg-slate-900 shadow-lg shadow-slate-900 rounded-xl">
            <div className="flex h-16 items-center justify-between">
                <div className="flex-1">
                    <a
                        className="text-3xl font-bold text-yellow-500"
                        href="/"
                    >
                        Forum of Legends
                    </a>
                </div>
                {user ?
                <div className="grid grid-cols-3 gap-2">
                <h1
                    className="text-3xl text-right col-span-2 font-bold text-yellow-500 px-4"
                    >
                    Witaj, {user}!
                    </h1>
                    <button onClick={logout} className="px-6 py-2 bg-emerald-900 text-white rounded-lg hover:bg-emerald-950">
                        Wyloguj
                    </button> 
                </div> :
                <div className="grid grid-cols-2 gap-2">
                    <Button label="Zaloguj się" address="/login"/>
                    <Button label="Utwórz konto" address="/register"/>
                </div>
                }
            </div>
        </div>
    )
}