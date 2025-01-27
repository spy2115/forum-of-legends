import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from 'axios';
import TextareaAutosize from 'react-textarea-autosize';
import Button from "../components/Button"
import { useEffect, useState } from "react";

const schema = yup.object().shape({
    title: yup.string().required("Tytuł nie może być pusty.").max(99, "Zbyt długi tytuł."),
    content: yup.string().required("Wiadomość nie może być pusta.").max(499, "Zbyt długa treść."),
    // category: yup.string().required("Należy wybrać kategorię."),
});

export default function NewThread() {
    const [category, setCategory] = useState("-");
    const [categories, setCategories] = useState();

    const handleChange = (e) => {
        setCategory(e.target.value);
      };

    useEffect(() => {
        axios.get('/api/category', {
            headers: {
            'ngrok-skip-browser-warning': 'true',
            },
        })
        .then(response => {
            setCategories(response.data);
        })
        .catch(error => console.error(error));
        }, []);

    const onSubmit = async (data) => {
        try {
            const response = await fetch(`/api/threads`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: data.title,
                    author: 2,
                    category: category
                })
            })
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Unknown error occurred");
            }
            const threadData = await response.json();
            console.log("Thread created:", threadData);
            
            try {
                const response = await fetch(`/api/threads/${threadData.id}/comments`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        content: data.content,
                        author: 2,
                    })
                })
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || "Unknown error occurred");
                }
                const commentData = await response.json();
                console.log("Comment add:", commentData);
                } catch (error) {
                    console.error("Error adding comment:", error.message);
            }

            } catch (error) {
                console.error("Error creating thread:", error.message);
        }
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: "all",
    });

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="place-items-center pt-8">
                <div className="grid grid-cols my-8 w-1/2 bg-slate-900 border border-slate-400 p-6 rounded-xl">
                    <h1 className="text-white px-4 col-span-5"> Tytuł </h1>
                    <h1 className="text-white px-4 col-span-1"> Kategoria </h1>
                    <TextareaAutosize
                    className="col-span-5 bg-slate-600 mx-2 py-2 px-4 mb-2 rounded-3xl border border-slate-400 text-white bg-opacity-70"
                    type="text"
                    id="Title"
                    name="title"
                    {...register('title')}/>


                    <select
                        name="sortBy"
                        id="sortBy"
                        value={category}
                        onChange={handleChange}
                        className="col-span-1 bg-slate-600 mx-2 py-2 px-4 mb-2 rounded-3xl border border-slate-400 text-white bg-opacity-70"
                    >
                        {Array.isArray(categories) && categories.map(cat => (
                        <option key={cat.id} value={cat.name} >
                            {cat.name}
                        </option>
                        ))}
                    </select>

                    <label className="col-span-5 block text-sm font-medium text-red-500 mb-6 px-4"> {errors?.title && `${errors?.title.message}`} </label>
                    <label className="col-span-1 block text-sm font-medium text-red-500 mb-6 px-4"> {errors?.category && `${errors?.category.message}`} </label>

                    <h1 className="text-white px-4 col-span-1"> Treść </h1>
                    <TextareaAutosize
                    className="col-span-6 bg-slate-600 px-4 py-2 mb-2 rounded-3xl border border-slate-400 text-white bg-opacity-70"
                    type="text"
                    id="Content"
                    name="content"
                    {...register('content')}/>
                    <label className="col-span-6 block text-sm font-medium text-red-500 mb-6 px-4"> {errors?.content && `${errors?.content.message}`} </label>

                    <div className='col-span-5'/>
                    <Button label="Opublikuj" />
                </div>
            </div>
        </form>
    )
}