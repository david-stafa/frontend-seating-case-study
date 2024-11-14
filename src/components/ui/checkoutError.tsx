import { AlertCircle, X } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default function CheckoutError() {
	return (
		<div className="flex items-center justify-center">
			<Card className="w-full max-w-md">
				<CardHeader>
					<div className="mb-2 flex justify-center">
						<div className="relative">
							<div className="flex h-14 w-14 items-center justify-center rounded-full">
								<X className="h-8 w-8 text-red-600" strokeWidth={3} />
							</div>
							<div className="absolute inset-0 rounded-full border-4 border-red-600"></div>
						</div>
					</div>
					<CardTitle className="mt-4 text-center text-3xl font-bold text-red-600">
						Payment Failed
					</CardTitle>
					<CardDescription className="text-center">
						We're sorry, but there was an issue processing your payment.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<Alert variant="destructive">
						<AlertCircle className="h-4 w-4" />
						<AlertTitle>Error</AlertTitle>
						<AlertDescription>
							Your payment could not be processed. Please check your payment
							details and try again.
						</AlertDescription>
					</Alert>
				</CardContent>
			</Card>
		</div>
	);
}