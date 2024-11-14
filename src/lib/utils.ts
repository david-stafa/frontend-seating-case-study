import { CartItem, TicketOrder } from "@/types/types";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const CURRENCY_FORMATTER = new Intl.NumberFormat("cs-CZ", {
	currency: "CZK",
	style: "currency",
	minimumFractionDigits: 0,
});

export function formatCurrency(amount: number) {
	return CURRENCY_FORMATTER.format(amount);
}

// user type according to user in expected by POST/order
type User = { firstName: string; lastName: string; email: string };

// function to create ticket order according to object expected by POST/order
export function createTicketsOrder(cart: CartItem[], eventId: string, user: User) {
	const ticketOrder: TicketOrder = {
		eventId: eventId,
		tickets: [],
		user: {
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName,
		},
	};

	// for each item in card create a ticket object according to ticket array of objects expected by POST/order
	cart.forEach((item) => {
		const oneTicket = {
			seatId: item.seat.seatId,
			ticketTypeId: item.ticketType.id,
		};
		ticketOrder.tickets.push(oneTicket);
	});

	return ticketOrder;
}

// ID of target event
export const EVENTID = "3348b37f-6ee2-4513-ac40-b55eb676319b";