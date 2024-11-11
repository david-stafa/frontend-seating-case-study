import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import axios from "axios";

type Event = {
	eventId: "uuid";
	namePub: "string";
	description: "string";
	currencyIso: "string";
	dateFrom: "datetime";
	dateTo: "datetime";
	headerImageUrl: "string";
	place: "string";
} | null;

export default function EventInfo() {
	const [event, setEvent] = useState<Event>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const getEvent = async () => {
		try {
			const res = await axios.get(
				"https://nfctron-frontend-seating-case-study-2024.vercel.app/event"
			);
			setEvent(res.data);
		} catch (err) {
			setError("Something went wrong. Please try again later.");
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getEvent();
	}, []);

	if (error) return <p>{error}</p>;

	return (
		// event info
		<aside className="w-full max-w-sm bg-white rounded-md shadow-sm p-3 flex flex-col gap-2">

			{!event && loading ? (
				// skeleton when loading data
				<EventinfoSkeleton />
			) : (
				<>
					{/* event image */}
					<img
						src={event?.headerImageUrl}
						className="rounded-md overflow-clip"
					/>
					{/* event name */}
					<h1 className="text-xl text-zinc-900 font-semibold">
						{event?.namePub}
					</h1>
					{/* event description */}
					<p className="text-sm text-zinc-500">{event?.description}</p>
				</>
			)}
			{/* add to calendar button */}
			<Button variant="secondary" disabled>
				Add to calendar
			</Button>
		</aside>
	);
}

const EventinfoSkeleton = () => {
	return (
		<>
			{/* image skeleton */}
			<div className="bg-zinc-300 rounded-md h-44 animate-pulse" />
			{/* h1 skeleton */}
			<div className="w-full h-7 bg-zinc-300 animate-pulse rounded-md my-1" />
			{/* p skeletons */}
			<div className="w-full h-5 bg-zinc-300 animate-pulse rounded-md" />
			<div className="w-full h-5 bg-zinc-300 animate-pulse rounded-md" />
			<div className="w-2/4 h-5 bg-zinc-300 animate-pulse rounded-md" />
		</>
	);
};
