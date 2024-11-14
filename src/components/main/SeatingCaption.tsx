import { X } from "lucide-react";

export default function SeatingCaption() {
	return (
		<div className="flex flex-col pl-3 pb-2">
			<div className="mb-2 mt-4 text-sm">Caption: </div>
			<div className="flex">
				<div className="flex items-center mr-2">
					<span className="mr-1 text-xs">VIP:</span>
					<div className="transition-color flex size-8 items-center justify-center rounded-full bg-gradient-to-r from-[#f7f5ff] to-[#ec6e63] hover:opacity-70">
						<span className="text-xs font-medium">
							12
						</span>
					</div>
				</div>
				<div className="flex items-center">
					<span className="mr-1 text-xs">Regular:</span>
					<div className="transition-color flex size-8 items-center justify-center rounded-full bg-gradient-to-r from-[#f7f5ff] to-[#7f46db] hover:opacity-70">
						<span className="text-xs font-medium">
							12
						</span>
					</div>
				<div className="flex items-center ml-2">
					<span className="mr-1 text-xs">Taken:</span>
					<div className="transition-color flex size-8 items-center justify-center rounded-full bg-zinc-200">
						<span className="text-xs font-medium">
							<X size="20px" strokeWidth="1px" />
						</span>
					</div>
				</div>
				</div>
			</div>
		</div>
	);
}

{
	/* <div
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
></div>

<span className="text-xs font-medium">
	<X size="20px" strokeWidth="1px" /> 
</span>; */
}
