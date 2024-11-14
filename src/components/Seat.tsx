import { Button } from "@/components/ui/button.tsx";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { cn, formatCurrency } from "@/lib/utils.ts";
import {
	AddCartItemFunction,
	CartItem,
	DeleteCartItemFunction,
	SeatType,
	TicketType,
} from "@/types/types";
import { X } from "lucide-react";
import React from "react";

interface SeatProps extends React.HTMLAttributes<HTMLElement> {
	disabled: boolean | undefined;
	seatNumber: number;
	seatData?: SeatType;
	ticketTypes?: TicketType;
	rowLetter: string;
	addCartItem: AddCartItemFunction;
	deleteCartItem: DeleteCartItemFunction;
	shoppingCart: CartItem[];
}

export const Seat = React.forwardRef<HTMLDivElement, SeatProps>(
	(props, ref) => {
		// get correct ticket type according to seat's ticketTypeId
		// run the function only if both seatData and ticketTypes are true
		const ticketData =
			props.seatData &&
			props.ticketTypes &&
			getTicketData(props.seatData.ticketTypeId, props.ticketTypes);

		// check if ticket/seat is in cart or not
		const itemInCart =
			props.seatData?.seatId &&
			isInCart(props.shoppingCart, props.seatData?.seatId);

		// check if the ticket/seat is VIP
		const isVIP = ticketData?.name === "VIP ticket";

		return (
			<Popover>
				<PopoverTrigger disabled={props.disabled} className="m-auto">
					<div
						className={cn(
							"transition-color flex size-8 items-center justify-center rounded-full",
							props.className,
							// styling according to ticket/seat data - disabled, regular VIP and InCart has different styles
							props.disabled
								? "bg-zinc-200"
								: `bg-gradient-to-r from-[#f7f5ff] to-[#7f46db] hover:opacity-70`,
							isVIP && "to-[#ec6e63]",
							itemInCart &&
								`border-2 ${isVIP ? "border-[#ec6e63] from-[#f0b7b7]" : "border-[#7f46db] from-[#7f46db71]"} to-white`,
						)}
						ref={ref}
					>
						{/* rendering X icon if seat is disabled or seat number if seat is free */}
						<span className="text-xs font-medium">
							{props.disabled ? (
								<X size="20px" strokeWidth="1px" />
							) : (
								props.seatNumber
							)}
						</span>
					</div>
				</PopoverTrigger>
				<PopoverContent>
					{props.seatData && ticketData && (
						// seat details
						<main>
							<div>{`Row: ${props.rowLetter} - Seat: ${props.seatData.place}`}</div>
							<div>{ticketData?.name}</div>
							<div>{formatCurrency(ticketData.price)}</div>
						</main>
					)}
					<footer className="flex flex-col">
						{itemInCart ? (
							<Button
								variant="destructive"
								size="sm"
								onClick={() => {
									// handle deleting ticket from shopping cart
									// ensure that required data are provided
									if (props.seatData?.seatId) {
										props.deleteCartItem(props.seatData?.seatId);
									} else {
										console.warn(
											"Incomplete data: Please contact us if this occurs again.",
										);
									}
								}}
							>
								Remove from cart
							</Button>
						) : (
							<Button
								variant="default"
								size="sm"
								onClick={() => {
									// Handle adding ticket to shopping cart
									// ensure that required data are provided
									if (ticketData && props.seatData) {
										props.addCartItem({
											ticketType: { ...ticketData },
											seat: { ...props.seatData, row: props.rowLetter },
										});
									} else {
										console.warn(
											"Incomplete data: Please, contact us if this occurs again.",
										);
									}
								}}
							>
								Add to cart
							</Button>
						)}
					</footer>
				</PopoverContent>
			</Popover>
		);
	},
);

// find if target seat is VIP or Regular
function getTicketData(ticketID: string, refTicketArray: TicketType) {
	// copmare tickets ID from fetched API with selected seat and its ticketID
	// returns ticket data or undefined
	return refTicketArray.find((element) => element.id === ticketID);
}

// check if seat/ticket is in shopping cart or not
function isInCart(cart: CartItem[], id: string) {
	// find target seat/ticket by its ID compared to shopping cart array of objects
	// returns boolean
	return cart.some((item) => item.seat.seatId == id);
}
