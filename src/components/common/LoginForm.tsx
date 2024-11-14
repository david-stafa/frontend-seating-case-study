import axios, { AxiosError, AxiosResponse } from "axios";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";

interface LogInFormProps {
	setLogInResponse: React.Dispatch<React.SetStateAction<AxiosResponse | null>>;
	setIsLogInLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LoginForm(props: LogInFormProps) {
	const [email, setEmail] = useState("frontend@nfctron.com");
	const [password, setPassword] = useState("Nfctron2025");

	const [error, setError] = useState<AxiosError | undefined>(undefined);

	// log in API call - POST/login
	async function handleLogin(e: { preventDefault: () => void }) {
		e.preventDefault();
		try {
			props.setIsLogInLoading(true)
			const requestBody = { email, password };
			const res = await axios.post(
				"https://nfctron-frontend-seating-case-study-2024.vercel.app/login",
				requestBody,
			);
			props.setLogInResponse(res);
		} catch (error: unknown) {
			setError(error as AxiosError);
			console.log(error);
		} finally {
			console.log("response");
			props.setIsLogInLoading(false)
		}
	}

	return (
		<div className="mb-2">
			{/* handle unauthorized log in */}
			{error?.status === 401 && (
				<div className="mb-1 text-sm font-bold text-red-500">
					Wrong email or password. Please try again.
				</div>
			)}
			{/* handle other errors */}
			{error?.status === 400 && error.status > 401 && (
				<div className="mb-1 text-sm font-bold text-red-500">
					Somethind went wrong. Please try again.
				</div>
			)}
			<form onSubmit={handleLogin}>
				{/* email address input */}
				<div className="mb-3">
					<Label htmlFor="email">Email address :</Label>
					<Input
						onChange={(e) => {
							setEmail(e.target.value);
						}}
						type="email"
						id="email"
						required
						defaultValue={email}
					/>
				</div>
				{/* password input */}
				<div className="mb-3">
					<Label htmlFor="password">Password :</Label>
					<Input
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						type="password"
						id="password"
						required
						defaultValue={password}
					/>
				</div>
				{/* submit button */}
				<Button type="submit" variant="default">
					Log in
				</Button>
			</form>
		</div>
	);
}
