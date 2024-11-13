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
			<PopoverTrigger>
				<Button>Tickets overview</Button>
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

function ticketTableCells(
	cart: CartItem[],
	deleteFunction: DeleteCartItemFunction,
) {
	return cart.map((item) => {
		return (
			<TableRow>
				<TableCell className="font-medium">
					{item.ticketType.name === "VIP ticket" ? "VIP" : "Regular"}
				</TableCell>
				<TableCell>{item.seat.row + item.seat.place.toString()}</TableCell>
				<TableCell>{formatCurrency(item.ticketType.price)}</TableCell>
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
