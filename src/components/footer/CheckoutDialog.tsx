import { useState } from "react";
import LoginForm from "../common/LoginForm";
import { Button } from "../ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import GuestCheckout from "./GuestCheckout";
import { ApiResponse, CartItem } from "@/types/types";
import Loader from "../ui/loader";
import CheckoutSuccess from "../ui/checkoutSuccess";
import CheckoutError from "../ui/checkoutError";

export default function CheckoutDialog({
	shoppingCart,
}: {
	shoppingCart: CartItem[];
}) {

	// value from loged in user or guest checkout order 
	const [response, setResponse] = useState<ApiResponse | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	return (
		<Dialog>
			<DialogTrigger asChild disabled={shoppingCart.length === 0}>
				<Button variant="default" className="ml-1">
					Checkout now
				</Button>
			</DialogTrigger>
			<DialogContent className="bg-white">
				<DialogHeader>
					<DialogTitle>Checkout your order</DialogTitle>
					<DialogDescription>Log in or continue as a guest.</DialogDescription>
				</DialogHeader>
				{loading ? (
					// display loader if API call is in progress
					<Loader />
				) : error ? (
					// display error component if API call resolves in error
					<CheckoutError />
				) : response?.status === 200 ? (
					// display sucess if API call is successfull -> response.status === 200
					<CheckoutSuccess />
				) : (
					<div className="flex justify-between">
						{/* Log in */}
						<LoginForm />
						{/* Vertical divider */}
						<div className="mx-1 w-0.5 bg-gray-200" />
						{/* Guest checkout */}
						<GuestCheckout
							shoppingCart={shoppingCart}
							setLoading={setLoading}
							setError={setError}
							setResponse={setResponse}
						/>
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
}
