import { useState } from "react";
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
import { CartItem } from "@/types/types";
import Loader from "../ui/loader";
import CheckoutSuccess from "../ui/checkoutSuccess";
import CheckoutError from "../ui/checkoutError";
import LogInCheckout from "./LogInCheckout";
import { AxiosResponse } from "axios";

export default function CheckoutDialog({
	shoppingCart,
	clearShoppingCart,
}: {
	shoppingCart: CartItem[];
	clearShoppingCart: () => void;
}) {
	// value from loged in user or guest checkout order
	const [response, setResponse] = useState<AxiosResponse | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	return (
		<Dialog>
			<DialogTrigger
				asChild
				disabled={shoppingCart.length === 0}
			>
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
						<LogInCheckout
							shoppingCart={shoppingCart}
							setLoading={setLoading}
							setError={setError}
							setResponse={setResponse}
							clearShoppingCart={clearShoppingCart}
						/>
						{/* Vertical divider */}
						<div className="mx-4 w-0.5 bg-gray-200" />
						{/* Guest checkout */}
						<GuestCheckout
							shoppingCart={shoppingCart}
							setLoading={setLoading}
							setError={setError}
							setResponse={setResponse}
							clearShoppingCart={clearShoppingCart}
						/>
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
}
