import {useEffect, useState} from "react";
import axios from "axios";
import {createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, useReactTable} from '@tanstack/react-table'
import "./FlightSchedule.css";


const columnHelper = createColumnHelper();

const columns = [
    /*columnHelper.accessor('flightNumber', {
        cell: info => info.getValue(),
        header: () => 'Flight Number',
        footer: info => info.column.id,
    }),*/
    columnHelper.accessor(row => row.startingLocation, {
        id: 'startingLocation',
        cell: info => info.getValue(),
        header: ({ column }) => (
            <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Starting Location {column.getIsSorted() === "asc" ? "🔼" : column.getIsSorted() === "desc" ? "🔽" : ""}
            </button>
        ),
    }),
/*    columnHelper.accessor('startingLocationCity', {
        header: () => 'Starting Location City',
        cell: info => info.getValue(),
        footer: info => info.column.id,
    }),
    columnHelper.accessor('startingLocationCountry', {
        header: () => 'Starting Location Country',
        cell: info => info.getValue(),
        footer: info => info.column.id,
    }),
    columnHelper.accessor('startingLocationIATA', {
        header: () => 'Starting Location IATA',
        cell: info => info.getValue(),
        footer: info => info.column.id,
    }),*/
    columnHelper.accessor('destination', {
        header: ({column}) => (
            <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Destination {column.getIsSorted() === "asc" ? "🔼" : column.getIsSorted() === "desc" ? "🔽" : ""}
            </button>
        ),
        cell: info => info.getValue(),
    }),
/*    columnHelper.accessor('destinationCity', {
        header: () => 'Destination City',
        cell: info => info.getValue(),
        footer: info => info.column.id,
    }),
    columnHelper.accessor('destinationCountry', {
        header: () => 'Destination Country',
        cell: info => info.getValue(),
        footer: info => info.column.id,
    }),
    columnHelper.accessor('destinationIATA', {
        header: () => 'Destination IATA',
        cell: info => info.getValue(),
        footer: info => info.column.id,
    }),*/
    columnHelper.accessor('startingDateTime', {
        header: ({column}) => (
            <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Starting Date and Time {column.getIsSorted() === "asc" ? "🔼" : column.getIsSorted() === "desc" ? "🔽" : ""}
            </button>
        ),
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('arrivalDateTime', {
        header: ({column}) => (
            <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Arrival Date and Time {column.getIsSorted() === "asc" ? "🔼" : column.getIsSorted() === "desc" ? "🔽" : ""}
            </button>
        ),
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('duration', {
        header: ({column}) => (
            <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Duration {column.getIsSorted() === "asc" ? "🔼" : column.getIsSorted() === "desc" ? "🔽" : ""}
            </button>
        ),
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('price', {
        header: ({column}) => (
            <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Price {column.getIsSorted === "asc" ? "🔼" : column.getIsSorted() === "desc" ? "🔽" : ""}
            </button>
        ),
        cell: info => info.getValue() + "€",
    }),
];

function formatDateTime(isoString) {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short"
    }).format(date);
}

function formatDuration(duration) {
    let hours = Math.round(duration / 60);
    let minutes = duration % 60;
    return `${hours > 0 ? hours + " Hours " : ""}${minutes > 0 ? minutes + " Minutes" : ""}`.trim();
}

function FlightSchedule() {
    const [flights, setFlights] = useState([]);
    const [sorting, setSorting] = useState([]);

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/flights")
                const formattedFlights = response.data.map(f => ({
                    ...f,
                    startingDateTime: formatDateTime(f.startingDateTime),
                    arrivalDateTime: formatDateTime(f.arrivalDateTime),
                    duration: formatDuration(f.duration)
                }));
                setFlights(formattedFlights);
                //console.log(response.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchFlights();
    }, []);

    const table = useReactTable({
        data: flights,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: { sorting },
        onSortingChange: setSorting,
    })

    return (
        <div className="page-container">
            <h1>Teretulemast Flightbooki! Palun plaanige oma lennuplaan.</h1>
            <div className="container">
            <table>
                <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th key={header.id}>
                                {header.isPlaceholder
                                ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody>
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
                <tfoot>
                {table.getFooterGroups().map(footerGroup => (
                    <tr key={footerGroup.id}>
                        {footerGroup.headers.map(header => (
                            <th key={header.id}>
                                {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.footer,
                                        header.getContext()
                                    )}
                            </th>
                        ))}
                    </tr>
                ))}
                </tfoot>
            </table>
            </div>
        </div>
    );
}

export default FlightSchedule;
