import { Button } from "@/components/ui/button.tsx";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { cn } from "@/lib/utils.ts";
import { X } from "lucide-react";
import React from "react";

interface SeatProps extends React.HTMLAttributes<HTMLElement> {
	disabled: boolean | undefined;
	seatNumber: number;
}

export const Seat = React.forwardRef<HTMLDivElement, SeatProps>(
	(props, ref) => {
		const isInCart = false;
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
						<span className="text-xs font-medium">{props.disabled ? <X size="20px" strokeWidth="1px"/> : props.seatNumber}</span>
					</div>
				</PopoverTrigger>
				<PopoverContent>
					<pre>{JSON.stringify({ seatData: null }, null, 2)}</pre>

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
