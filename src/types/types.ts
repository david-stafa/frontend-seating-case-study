export type TicketType = {
	id: string;
	name: string;
	price: number;
}[];

export type SeatRows = {
	seatRow: number;
	seats: {
		seatId: string;
		place: number;
		ticketTypeId: string;
	}[];
}[];

export type SeatType = {
	seatId: string;
	place: number;
	ticketTypeId: string;
	row?: string;
};

export type AddCartItemFunction = (item: CartItem) => void;
export type DeleteCartItemFunction = (seatID: string) => void;

export type CartItem = {
	seat: SeatType;
	ticketType: {
		id: string;
		name: string;
		price: number;
	};
};

export type TicketOrder = {
	eventId: string;
	user: {
		email: string;
		firstName: string;
		lastName: string;
	};
	tickets: { ticketTypeId: string; seatId: string }[];
};