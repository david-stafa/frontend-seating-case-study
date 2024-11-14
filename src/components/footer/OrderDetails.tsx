import { CartItem, DeleteCartItemFunction } from "@/types/types";
import OrderOverviewPopover from "./OrderOverviewPopover";
import { formatCurrency } from "@/lib/utils";
import CheckoutDialog from "./CheckoutDialog";

export default function OrderDetails({
	shoppingCart,
	deleteCartItem,
}: {
	shoppingCart: CartItem[];
	deleteCartItem: DeleteCartItemFunction;
}) {
	// total price of items in shopping cart formatted to CZK
	const shoppingCartPrice = formatCurrency(totalPrice(shoppingCart));

	return (
		// bottom cart affix (wrapper)
		<nav className="sticky bottom-0 left-0 right-0 flex justify-center border-t border-zinc-200 bg-white">
			{/* inner content */}
			<div className="flex max-w-screen-lg grow items-center justify-between gap-4 p-6">
				{/* total in cart state */}
				<div className="flex flex-col">
					<span>Total for {shoppingCart.length} tickets</span>
					<span className="text-2xl font-semibold">{shoppingCartPrice}</span>
				</div>
				{/* in cart seats row and position */}
				<div className={`text-lg font-bold`}>
					{getSeatPosition(shoppingCart)}
				</div>

				{/* checkout button */}
				<div>
					<OrderOverviewPopover
						shoppingCart={shoppingCart}
						deleteCartItem={deleteCartItem}
						shoppingCartPrice={shoppingCartPrice}
					/>
					<CheckoutDialog shoppingCart={shoppingCart} />
				</div>
			</div>
		</nav>
	);
}

// get total priice items in cart
function totalPrice(cart: CartItem[]) {
	let itemsPrice = 0;
	cart.forEach((item) => {
		itemsPrice += item.ticketType.price;
	});
	return itemsPrice;
}

// get row letter and seat position of a seat in cart and return span with that data
function getSeatPosition(cart: CartItem[]) {
	return cart.map((item, i) => {
		return (
			<span
				key={i}
				// color VIP and Regular ticket accordingly
				className={`${item.ticketType.name === "VIP ticket" ? "text-[#ec6e63]" : "text-[#7f46db]"} mr-1`}
			>
				{item.seat.row + item.seat.place.toString()}
			</span>
		);
	});
}
