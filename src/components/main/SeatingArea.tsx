import axios from "axios";
import { Seat } from "../Seat";
import React, { useEffect, useState } from "react";

// Number of rows in venue
const ROWS = 10;
// Number of seats in one row
const COLUMNS = 15;

type TicketType = {
	id: string;
	name: string;
	price: number;
};

type SeatRows = {
	seatRow: number;
	seats: {
		seatId: string;
		place: number;
		ticketTypeId: string;
		taken?: boolean;
	}[];
}[];

export default function SeatingArea() {
	const [tickets, setTickets] = useState<TicketType | null>(null);
	const [seatRows, setSeatRows] = useState<SeatRows | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// fetch tickets and seating data
	const getTicketsAndSeats = async () => {
		try {
			const res = await axios.get(
				"https://nfctron-frontend-seating-case-study-2024.vercel.app/event-tickets?eventId=3348b37f-6ee2-4513-ac40-b55eb676319b",
			);
			setTickets(res.data.ticketTypes);
			setSeatRows(res.data.seatRows);
		} catch (err) {
			setError("Something went wrong. Please try again later.");
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getTicketsAndSeats();
	}, []);

	// return error message when fetching fails
	if (error) return <p>{error}</p>;

	return (
		// venue card
		<div className="grow rounded-md bg-white p-3 shadow-sm">
			{/* stage div */}
			<div className="flex items-center">
				<span className="mb-4 w-full border-b pb-2 text-center">Stage</span>
			</div>
			{/* seating div */}
			<div
				className="grid h-fit"
				style={{
					gridTemplateColumns: `repeat(${COLUMNS + 1}, 1fr)`,
					gridAutoRows: "40px",
				}}
			>
				{/* render skeleton UI when fetching is in progress */}
				{loading
					? seatingMapSkeleton()
					: // seating map
						seatRows &&
						Array.from({ length: ROWS * COLUMNS }, (_, i) => {
							const rowIndex = Math.floor(i / COLUMNS); // calculate current row index
							const seatInRow = (i % COLUMNS) + 1; // seat position within the row

							// check if the seat is free
							const isSeatFree = checkIfSeatIsFree(i, seatRows);

							return (
								<React.Fragment key={i}>
									{/* display the row letter only once for each row */}
									{seatInRow === 1 && (
										<span className="m-auto">
											{String.fromCharCode(65 + rowIndex)}
										</span> // Convert row index to letter (0 -> 'A', 1 -> 'B', etc.)
									)}
									{/* seat element */}
									<Seat
										// if isSeatFree === false -> disabled === true -> renders disabled seat
										disabled={!isSeatFree}
										seatNumber={seatInRow}
									/>
								</React.Fragment>
							);
						})}
			</div>
		</div>
	);
}

// function to compare seating map and fetch data to provide free and taken seats
function checkIfSeatIsFree(seatIndex: number, seatRows: SeatRows) {
	const rowIndex = Math.floor(seatIndex / COLUMNS); // calculate current row
	const placeInRow = (seatIndex % COLUMNS) + 1; // calculate seat position within the row

	// check if the row exists before accessing its seats
	if (seatRows[rowIndex] && seatRows[rowIndex].seats) {
		// Check if any seat from fetched API in the current row matches the calculated placeInRow
		return seatRows[rowIndex].seats.some((seat) => seat.place === placeInRow);
	}
	// if the row doesn't exist or there are no seats in it, return false -> seat is taken
	return false;
}

function seatingMapSkeleton() {
	return Array.from({ length: ROWS * COLUMNS }, (_, i) => {
		const rowIndex = Math.floor(i / COLUMNS); // calculate current row index
		const seatInRow = (i % COLUMNS) + 1; // seat position within the row

		return (
			<React.Fragment key={i}>
				{/* display the row letter only once for each row */}
				{seatInRow === 1 && (
					<span className="m-auto">{String.fromCharCode(65 + rowIndex)}</span> // Convert row index to letter (0 -> 'A', 1 -> 'B', etc.)
				)}
				{/* seat skeleton element*/}
				<div
					key={i}
					className="size-8 animate-pulse rounded-full bg-zinc-300"
				/>
			</React.Fragment>
		);
	});
}
