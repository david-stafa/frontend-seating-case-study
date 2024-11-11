import { ReactNode } from "react";

export default function MainWrapper({ children }: { children: ReactNode }) {
	return (
		<main className="grow flex flex-col justify-center">
			<div className="max-w-screen-lg m-auto p-4 flex items-start grow gap-3 w-full">
				{children}
			</div>
		</main>
	);
}
