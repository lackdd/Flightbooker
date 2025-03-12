import {useEffect, useState} from "react";
import axios from "axios";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable
} from '@tanstack/react-table'
import "./FlightSchedule.css";
import {useNavigate} from "react-router-dom";


const columnHelper = createColumnHelper();

const columns = [
    columnHelper.accessor(row => row.startingLocation, {
        id: 'startingLocation',
        cell: info => info.getValue(),
        header: () => 'Starting Location',
        filterFn: "includesString",
    }),
    columnHelper.accessor('destination', {
        header: ({column}) => (
            <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Destination {column.getIsSorted() === "asc" ? "🔼" : column.getIsSorted() === "desc" ? "🔽" : ""}
            </button>
        ),
        cell: info => info.getValue(),
        filterFn: "includesString",
    }),
    columnHelper.accessor('startingDateTime', {
        header: ({column}) => (
            <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Starting Date and Time {column.getIsSorted() === "asc" ? "🔼" : column.getIsSorted() === "desc" ? "🔽" : ""}
            </button>
        ),
        cell: info => info.getValue(),
        filterFn: "includesString",
    }),
    columnHelper.accessor('arrivalDateTime', {
        header: ({column}) => (
            <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Arrival Date and Time {column.getIsSorted() === "asc" ? "🔼" : column.getIsSorted() === "desc" ? "🔽" : ""}
            </button>
        ),
        cell: info => info.getValue(),
        filterFn: "includesString",
    }),
    columnHelper.accessor('duration', {
        header: ({column}) => (
            <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Duration {column.getIsSorted() === "asc" ? "🔼" : column.getIsSorted() === "desc" ? "🔽" : ""}
            </button>
        ),
        cell: info => info.getValue(),
        filterFn: "includesString",
    }),
    columnHelper.accessor('price', {
        header: ({column}) => (
            <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Price {column.getIsSorted === "asc" ? "🔼" : column.getIsSorted() === "desc" ? "🔽" : ""}
            </button>
        ),
        cell: info => info.getValue() + "€",
        filterFn: (row, columnId, value) => {
            // only filter if value is defined
            if (!value) return true;
            return row.getValue(columnId) <= value;
        },
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
    const [columnFilters, setColumnFilters] = useState([]);

    const navigate = useNavigate();

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
        getFilteredRowModel: getFilteredRowModel(),
        state: { sorting, columnFilters },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
    });

    return (
        <div className="page-container">
            <h1>Teretulemast Flightbooki! Palun plaanige oma lennuplaan.</h1>
            <div className="filters">
                <input
                    type="text"
                    placeholder="Search Destination"
                    onChange={(e) => table.getColumn("destination")?.setFilterValue(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Starting Date and Time"
                    onChange={(e) => table.getColumn("startingDateTime")?.setFilterValue(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Arrival Date and Time"
                    onChange={(e) => table.getColumn("arrivalDateTime")?.setFilterValue(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Duration"
                    onChange={(e) => table.getColumn("duration")?.setFilterValue(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Max Price (€)"
                    onChange={(e) => {
                        const value = e.target.value ? parseFloat(e.target.value) : undefined;
                        table.getColumn("price")?.setFilterValue(value);
                    }}
                />
            </div>
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
                    <tr
                        key={row.id}
                        onClick={() => navigate(`/seats/${row.original.id}`, { state: { flight: row.original } })}
                    >
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
