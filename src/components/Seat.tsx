import { Button } from "@/components/ui/button.tsx";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { cn, formatCurrency } from "@/lib/utils.ts";
import { SeatType, TicketType } from "@/types/types";
import { X } from "lucide-react";
import React from "react";

interface SeatProps extends React.HTMLAttributes<HTMLElement> {
	disabled: boolean | undefined;
	seatNumber: number;
	seatData?: SeatType;
	ticketTypes?: TicketType;
	rowLetter: string;
}

export const Seat = React.forwardRef<HTMLDivElement, SeatProps>(
	(props, ref) => {
		const isInCart = false;
		// get correct ticket type according to seat's ticketTypeId
		// run the function only if both seatData and ticketTypes are true
		const ticketData =
			props.seatData &&
			props.ticketTypes &&
			getTicketData(props.seatData.ticketTypeId, props.ticketTypes);

		return (
			<Popover>
				<PopoverTrigger disabled={props.disabled} className="m-auto">
					<div
						className={cn(
							"transition-color flex size-8 items-center justify-center rounded-full",
							props.className,
							props.disabled
								? "bg-zinc-200"
								: "bg-gradient-to-r from-[#f7f5ff] to-[#7f46db] hover:to-[#f7f5ff]",
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
							<div>{`Řada: ${props.seatData.place} Sedadlo: ${props.seatData.place}`}</div>
							<div>{ticketData?.name}</div>
							<div>{formatCurrency(ticketData.price)}</div>
						</main>
					)}
					<footer className="flex flex-col">
						{isInCart ? (
							<Button disabled variant="destructive" size="sm">
								Remove from cart
							</Button>
						) : (
							<Button disabled variant="default" size="sm">
								Add to cart
							</Button>
						)}
					</footer>
				</PopoverContent>
			</Popover>
		);
	},
);

function getTicketData(ticketID: string, refTicketArray: TicketType) {
	return refTicketArray.find((element) => element.id === ticketID);
}
