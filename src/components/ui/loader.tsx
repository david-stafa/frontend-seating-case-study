export default function Loader() {
	return (
		<div className="flex h-fit w-fit items-center justify-center m-auto pt-3">
			<div className="flex flex-col items-center space-y-4">
				<div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-gray-900" />
				<p className="text-gray-500 dark:text-gray-400">Loading...</p>
			</div>
		</div>
	);
}