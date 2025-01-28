import { useEffect, useState } from "react";
import axios from 'axios';
import Button from "../components/Button"

export default function Categories(){
    const [categories, setCategories] = useState();

    useEffect(() => {
        axios.get('/api/categories', {
            headers: {
            'ngrok-skip-browser-warning': 'true',
            },
        })
        .then(response => {
            setCategories(response.data);
        })
        .catch(error => console.error(error));
        }, []);

    return (
        <div className="place-items-center pt-8">
            <h1 className="text-2xl text-white font-bold mt-12"> Lista kategorii:</h1>
            <div className="grid grid-cols my-8 w-1/4 bg-slate-900 bg-opacity-70 border border-slate-400 p-6 rounded-xl gap-3">
                {Array.isArray(categories) && categories.map(cat => (
                    <Button key={cat.id} label={cat.name} address={`/category/threads/${cat.name}`} />
                ))}
            </div>
        </div>
    )
}