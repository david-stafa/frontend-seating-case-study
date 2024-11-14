import { Card, CardTitle } from "@/components/ui/card";
import { SVGProps } from "react";
import { JSX } from "react/jsx-runtime";

export default function CheckoutSuccess() {
	return (
		<div className="flex flex-col items-center justify-center">
			<Card className="w-full max-w-md space-y-6 rounded-lg bg-white p-6 shadow-lg">
				<div className="flex flex-col items-center">
					<CircleCheckIcon className="h-16 w-16 text-green-500" />
					<CardTitle className="mt-4 text-3xl font-bold text-gray-900">
						Payment Successful
					</CardTitle>
					<p className="mt-2 text-gray-500 dark:text-gray-400">
						Thank you for your payment. Your order is being processed.
					</p>
				</div>
			</Card>
		</div>
	);
}

function CircleCheckIcon(
	props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<circle cx="12" cy="12" r="10" />
			<path d="m9 12 2 2 4-4" />
		</svg>
	);
}