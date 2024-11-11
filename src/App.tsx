import "./App.css";
import Header from "./components/header/Header";
import OrderDetails from "./components/footer/OrderDetails";
import MainWrapper from "./components/main/MainWrapper";
import SeatingArea from "./components/main/SeatingArea";
import EventInfo from "./components/main/EventInfo";

function App() {
	const isLoggedIn = false;

	return (
		<div className="flex flex-col grow">
			{/* header with logo, event name and user actions */}
			<Header isLoggedIn={isLoggedIn} />

			{/* event layout */}
			<MainWrapper>
				<SeatingArea />
				<EventInfo />
			</MainWrapper>

			{/* footer with order details and checkout */}
			<OrderDetails />
		</div>
	);
}

export default App;
