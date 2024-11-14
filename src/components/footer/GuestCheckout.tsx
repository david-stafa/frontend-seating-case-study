import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { CartItem } from "@/types/types";
import axios, { AxiosResponse } from "axios";
import { createTicketsOrder, EVENTID } from "@/lib/utils";

export default function GuestCheckout({
	shoppingCart,
	setLoading,
	setError,
	setResponse,
	clearShoppingCart,
}: {
	shoppingCart: CartItem[];
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
	setError: React.Dispatch<React.SetStateAction<boolean>>;
	setResponse: React.Dispatch<React.SetStateAction<AxiosResponse | null>>;
	clearShoppingCart: () => void;
}) {
	// handle user inputs -> stored in these three values
	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");

	// create ticket order based on API requirements
	const ticketOrder = createTicketsOrder(shoppingCart, EVENTID, {
		email: email,
		firstName: firstName,
		lastName: lastName,
	});

	// post request with axios to create an order
	async function handleOrder(e: { preventDefault: () => void }) {
		// prevent page reload after submit
		e.preventDefault();
		try {
			// render loader
			setLoading(true);
			// send post request with ticketOrder request body
			const res = await axios.post(
				"https://nfctron-frontend-seating-case-study-2024.vercel.app/order",
				ticketOrder,
			);
			console.log("Final response:", res);
			//store response to variable in parent component -> display succes component if response.status === 200
			setResponse(res);
			clearShoppingCart();
		} catch (error: unknown) {
			// store error to variable in parent component -> display error components if true
			setError(true);
			// console.log error
			console.error("Order error:", error);
		} finally {
			// turn off loader
			setLoading(false);
		}
	}

	return (
		// guest order form
		<form onSubmit={handleOrder} className="grow">
			<div>
				{/* first name input */}
				<div className="mb-3">
					<Label htmlFor="guestEmail">First name :</Label>
					<Input
						onChange={(e) => {
							setFirstName(e.target.value);
						}}
						type="text"
						id="guestName"
						required
					/>{" "}
				</div>
				{/* last name input */}
				<div className="mb-3">
					<Label htmlFor="guestEmail">Last name :</Label>
					<Input
						onChange={(e) => {
							setLastName(e.target.value);
						}}
						type="text"
						id="guestSurname"
						required
					/>
				</div>
				{/* email input */}
				<div className="mb-3">
					<Label htmlFor="guestEmail">Email address :</Label>
					<Input
						onChange={(e) => {
							setEmail(e.target.value);
						}}
						type="email"
						id="guestEmail"
						required
					/>{" "}
				</div>
				{/* submit button */}
				<Button variant="default">Buy as guest</Button>
			</div>
		</form>
	);
}
