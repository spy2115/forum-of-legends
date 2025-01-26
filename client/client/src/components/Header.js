import Button from "./Button";


export default function Header() {
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
                
                <div className="grid grid-cols-2 gap-2">
                    <Button label="Zaloguj się"/>
                    <Button label="Utwórz konto"/>
                </div>
            </div>
        </div>
    )
}