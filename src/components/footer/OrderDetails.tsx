import { CartItem } from "@/types/types";
import { Button } from "../ui/button";

export default function OrderDetails({
	shoppingCart,
}: {
	shoppingCart: CartItem[];
}) {
	return (
		// bottom cart affix (wrapper)
		<nav className="sticky bottom-0 left-0 right-0 flex justify-center border-t border-zinc-200 bg-white">
			{/* inner content */}
			<div className="flex max-w-screen-lg grow items-center justify-between gap-4 p-6">
				{/* total in cart state */}

				<div className="flex flex-col">
					<span>Total for {shoppingCart.length} tickets</span>
					<span className="text-2xl font-semibold">
						{totalPrice(shoppingCart)} CZK
					</span>
				</div>
				<div className={`text-lg font-bold`}>
					{getSeatPosition(shoppingCart)}
				</div>

				{/* checkout button */}
				<Button disabled variant="default">
					Checkout now
				</Button>
			</div>
		</nav>
	);
}

function totalPrice(cart: CartItem[]) {
	let itemsPrice = 0;
	cart.forEach((item) => {
		itemsPrice += item.ticketType.price;
	});
	return itemsPrice;
}

function getSeatPosition(cart: CartItem[]) {
	return cart.map((item) => {
		return (
			<span
				className={`${item.ticketType.name === "VIP ticket" ? "text-[#ec6e63]" : "text-[#7f46db]"} mr-1`}
			>
				{item.seat.row + item.seat.place.toString()}
			</span>
		);
	});
}
