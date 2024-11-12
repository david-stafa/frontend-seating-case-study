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
};
