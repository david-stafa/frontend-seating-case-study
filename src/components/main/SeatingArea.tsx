import axios from "axios";
import { Seat } from "../Seat";
import React, { useEffect, useState } from "react";
import { SeatRows, TicketType } from "@/types/types";

// Number of rows in venue
const ROWS = 10;
// Number of seats in one row
const COLUMNS = 15;

export default function SeatingArea() {
	const [tickets, setTickets] = useState<TicketType | undefined>(undefined);
	const [seatRows, setSeatRows] = useState<SeatRows | undefined>(undefined);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | undefined>(undefined);

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
							const rowLetter = String.fromCharCode(65 + rowIndex);

							// check if the seet is free and get its data
							const seatData = getSeatData(rowIndex, seatInRow, seatRows);

							return (
								<React.Fragment key={i}>
									{/* display the row letter only once for each row */}
									{seatInRow === 1 && (
										<span className="m-auto">{rowLetter}</span> // Convert row index to letter (0 -> 'A', 1 -> 'B', etc.)
									)}
									{/* seat element */}
									<Seat
										// if seatData === undefined -> disabled is passing true || if seatData === true -> disabled passing false -> seat is rendered as free
										disabled={!seatData}
										seatNumber={seatInRow}
										seatData={seatData}
										ticketTypes={tickets}
										rowLetter={rowLetter}
									/>
								</React.Fragment>
							);
						})}
			</div>
		</div>
	);
}

// check if free seat exists and get ist data from fetched API variable
function getSeatData(row: number, seatInRow: number, seatRows: SeatRows) {
	// check if the row exists before accessing its seats
	if (seatRows[row] && seatRows[row].seats) {
		// check if any seat from fetched API in the current row matches the calculated placeInRow
		return seatRows[row].seats.find((seat) => seat.place === seatInRow);
	}
	// if the row doesn't exist or there are no seats in it, return undefined -> seat is taken
	return undefined;
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
