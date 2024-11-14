import axios, { AxiosResponse } from "axios";
import LoginForm from "../common/LoginForm";
import { useState } from "react";
import { Button } from "../ui/button";
import { CircleCheckIcon } from "../ui/checkoutSuccess";
import { CartItem } from "@/types/types";
import { createTicketsOrder, EVENTID } from "@/lib/utils";
import Loader from "../ui/loader";

interface LogInCheckoutProps {
	shoppingCart: CartItem[];
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
	setError: React.Dispatch<React.SetStateAction<boolean>>;
	setResponse: React.Dispatch<React.SetStateAction<AxiosResponse | null>>;
	clearShoppingCart: () => void;
}

export default function LogInCheckout(props: LogInCheckoutProps) {
	// store log in response from POST/login
	const [logInResponse, setLogInResponse] = useState<AxiosResponse | null>(
		null,
	);
	// store loading status when callin API POST/login
	const [isLogInLoading, setIsLogInLoading] = useState(false);

	// create ticket order to checkout logged in user cart
	const ticketOrder =
		logInResponse &&
		createTicketsOrder(props.shoppingCart, EVENTID, {
			firstName: logInResponse.data.user.firstName as string,
			lastName: logInResponse.data.user.lastName as string,
			email: logInResponse.data.user.email as string,
		});

	// post request with axios to create an order
	async function handleOrder(e: { preventDefault: () => void }) {
		// prevent page reload after submit
		e.preventDefault();
		try {
			// render loader
			props.setLoading(true);
			// send post request with ticketOrder request body
			const res = await axios.post(
				"https://nfctron-frontend-seating-case-study-2024.vercel.app/order",
				ticketOrder,
			);
			console.log("Final response:", res);
			//store response to variable in parent component -> display succes component if response.status === 200
			props.setResponse(res);
			props.clearShoppingCart();
		} catch (error: unknown) {
			// store error to variable in parent component -> display error components if true
			props.setError(true);
			// console.log error
			console.error("Order error:", error);
		} finally {
			// turn off loader
			props.setLoading(false);
		}
	}

	return (
		// disaplay loader when API call is in progress
		isLogInLoading ? (
			<div className="grow">
				<Loader />
			</div>
		) : // enable checkout if user logged in successfully
		logInResponse?.status === 200 ? (
			<div className="flex grow flex-col justify-center">
				{/* icon with message */}
				<div className="flex items-center justify-center">
					<CircleCheckIcon className="mr-2 h-8 w-8 text-green-500" />
					<span className="text-sm">Log in successfull.</span>
				</div>
				<div className="mt-6 flex flex-col items-center justify-center">
					{/* welcome message */}
					<span>
						{"Welcome back " + logInResponse.data.user.firstName + "!"}
					</span>
					{/* submit order button */}
					<Button className="mt-2" onClick={handleOrder}>
						Buy tickets
					</Button>
				</div>
			</div>
		) : (
			<LoginForm
				setLogInResponse={setLogInResponse}
				setIsLogInLoading={setIsLogInLoading}
			/>
		)
	);
}
