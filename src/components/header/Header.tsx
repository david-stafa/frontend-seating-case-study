import { Button } from "@/components/ui/button.tsx";
import HeaderDropdownMenu from "./HeaderDropdownMenu";

export default function Header({ isLoggedIn }: { isLoggedIn: boolean }) {
	return (
		// header (wrapper)
		<nav className="sticky left-0 right-0 top-0 flex justify-center border-b border-zinc-200 bg-white">
			{/* inner content */}
			<div className="flex max-w-screen-lg grow items-center justify-between gap-3 p-4">
				{/* application/author image/logo placeholder */}
				<div className="flex w-full max-w-[250px]">
					<img src="/NfctronLogoDark.svg" alt="logo" />
				</div>
				{/* app/author title/name placeholder */}
				<div className="text-2xl font-bold transition-colors duration-300 text-[#25196a]">
					NFCtron Keynote 2024
				</div>
				{/* user menu */}
				<div className="flex w-full max-w-[250px] justify-end">
					{isLoggedIn ? (
						// User action dropdown menu
						<HeaderDropdownMenu />
					) : (
						<Button disabled variant="secondary">
							Login or register
						</Button>
					)}
				</div>
			</div>
		</nav>
	);
}
