import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../components/Button"

const schema = yup.object().shape({
	email: yup.string().email("Nieprawidłowy format adresu e-mail.").required("E-mail jest wymagany."),
	password: yup.string().required("Hasło jest wymagane."),
});

export default function Login() {
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password
                })
            })
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Unknown error occurred");
            }
            const userData = await response.json();
            console.log("Logged in successfully:", userData);
            localStorage.setItem("userName", JSON.stringify(userData.user.name));
            localStorage.setItem("userId", JSON.stringify(userData.user.id));
            navigate("/");
            
            } catch (error) {
                console.error("Error creating user:", error.message);
        }}


    const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		mode: "all",
	});

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="place-items-center pt-8">
                <div className="grid grid-cols my-8 w-1/4 bg-slate-900 border border-slate-400 bg-opacity-70 p-6 rounded-xl">
                    <h1 className="text-white px-4"> E-mail</h1>
                    <input
                    type="email"
                    id="Email"
                    name="email"
                    {...register('email')}
                    className="bg-slate-600 mt-2 px-4 py-2 rounded-3xl border border-slate-400 text-white bg-opacity-70" />
                    <label className="block text-sm font-medium text-red-500 mb-6 px-4"> {errors?.email && `${errors?.email.message}`} </label>
                    
                    <h1 className="text-white px-4"> Hasło</h1>
                    <input
                    type="password"
                    id="Password"
                    name="password"
                    {...register('password')}
                    className="bg-slate-600 mt-2 px-4 py-2 rounded-3xl border border-slate-400 text-white bg-opacity-70" />
                    <label className="block text-sm font-medium text-red-500 mb-6 px-4"> {errors?.password && `${errors?.password.message}`} </label>
                    
                    <Button label="Zaloguj się" />
                </div>
            </div>
        </form>
    )
}