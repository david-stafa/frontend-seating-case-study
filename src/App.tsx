import "./App.css";
import Header from "./components/header/Header";
import OrderDetails from "./components/footer/OrderDetails";
import MainWrapper from "./components/main/MainWrapper";
import SeatingArea from "./components/main/SeatingArea";
import EventInfo from "./components/main/EventInfo";
import { useState } from "react";
import { CartItem } from "./types/types";

function App() {
	const isLoggedIn = false;

	const [shoppingCart, setShoppingCart] = useState<CartItem[]>([]);

	function addCartItem(item: CartItem): void {
		setShoppingCart((prevCart) => [...prevCart, item]);
	}

	function deleteCartItem(seatID?: string): void {
		setShoppingCart((prevCart) =>
			prevCart.filter((cartItem) => cartItem.seat.seatId != seatID),
		);
	}

	function clearShoppingCart() {
		setShoppingCart([]);
	}

	console.log(shoppingCart);

	return (
		<div className="flex grow flex-col">
			{/* header with logo, event name and user actions */}
			<Header isLoggedIn={isLoggedIn} />

			{/* event layout */}
			<MainWrapper>
				<SeatingArea
					addCartItem={addCartItem}
					deleteCartItem={deleteCartItem}
					shoppingCart={shoppingCart}
				/>
				<EventInfo />
			</MainWrapper>

			{/* footer with order details and checkout */}
			<OrderDetails
				shoppingCart={shoppingCart}
				deleteCartItem={deleteCartItem}
				clearShoppingCart={clearShoppingCart}
			/>
		</div>
	);
}

export default App;
