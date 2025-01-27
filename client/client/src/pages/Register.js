import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../components/Button"

const schema = yup.object().shape({
    username: yup.string().required("Należy podać nazwę.").max(50, "Zbyt długa nazwa."),
	email: yup.string().email("Nieprawidłowy format adresu e-mail.").required("E-mail jest wymagany.").max(50, "Zbyt długi e-mail."),
	password: yup.string().required("Hasło jest wymagane.").min(6, "Hasło musi mieć przynajmniej 6 znaków.").max(30, "Zbyt długie hasło."),
	password_confirmation: yup.string().oneOf([yup.ref('password'), null], 'Hasła muszą się zgadzać.')
});

export default function Register() {
    const onSubmit = async (data) => {
        try {
            const response = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: data.username,
                    email: data.email,
                    password: data.password
                })
            })
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Unknown error occurred");
            }
            const userData = await response.json();
            console.log("User created:", userData);
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
                <div className="grid grid-cols my-8 w-1/4 bg-slate-900 border border-slate-400 p-6 rounded-xl">
                    <h1 className="text-white px-4"> Nazwa użytkownika</h1>
                    <input
                    type="text"
                    id="Username"
                    name="username"
                    {...register('username')}
                    className="bg-slate-600 mt-2 px-4 py-2 rounded-3xl border border-slate-400 text-white bg-opacity-70" />
                    <label className="block text-sm font-medium text-red-500 mb-6 px-4"> {errors?.username && `${errors?.username.message}`} </label>
                    
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
                    
                    <h1 className="text-white px-4"> Powtórz hasło</h1>
                    <input
                    type="password"
                    id="PasswordConfirmation"
                    name="password_confirmation"
                    {...register('password_confirmation')}
                    className="bg-slate-600 mt-2 px-4 py-2 rounded-3xl border border-slate-400 text-white bg-opacity-70" />
                    <label className="block text-sm font-medium text-red-500 mb-6 px-4"> {errors?.password_confirmation && `${errors?.password_confirmation.message}`} </label>

                    <Button label="Zarejestruj się" />
                </div>
            </div>
        </form>
    )
}