import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { Button } from "../ui/button";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";
import { CartItem, DeleteCartItemFunction } from "@/types/types";
import { formatCurrency } from "@/lib/utils";
import { X } from "lucide-react";

export default function OrderOverviewPopover({
	shoppingCart,
	deleteCartItem,
	shoppingCartPrice,
}: {
	shoppingCart: CartItem[];
	deleteCartItem: DeleteCartItemFunction;
	shoppingCartPrice: string;
}) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="secondary">Tickets overview</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[400px]">
				<Table>
					{shoppingCart.length === 0 && (
						<TableCaption>Add tickets to cart.</TableCaption>
					)}
					<TableHeader>
						<TableRow>
							<TableHead>Type</TableHead>
							<TableHead>Place</TableHead>
							<TableHead>Price</TableHead>
							<TableHead>Delete</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{ticketTableCells(shoppingCart, deleteCartItem)}
					</TableBody>
					{/* if there is one or more items in cart -> display table footer with total price  */}
					{shoppingCart.length > 1 && (
						<TableFooter>
							<TableRow>
								<TableCell colSpan={2}>Total</TableCell>
								<TableCell colSpan={2}>{shoppingCartPrice}</TableCell>
							</TableRow>
						</TableFooter>
					)}
				</Table>
			</PopoverContent>
		</Popover>
	);
}

// create ticket table cells for each ticket in shopping cart with according data and delete function
function ticketTableCells(
	cart: CartItem[],
	deleteFunction: DeleteCartItemFunction,
) {
	return cart.map((item, i) => {
		return (
			<TableRow key={i}>
				<TableCell className="font-medium">
					{item.ticketType.name === "VIP ticket" ? "VIP" : "Regular"}
				</TableCell>
				<TableCell>{item.seat.row + item.seat.place.toString()}</TableCell>
				<TableCell>{formatCurrency(item.ticketType.price)}</TableCell>
				{/* delete ticket from shopping cart action */}
				<TableCell>
					<X
						className="cursor-pointer"
						onClick={() => deleteFunction(item.seat.seatId)}
					/>
				</TableCell>
			</TableRow>
		);
	});
}
