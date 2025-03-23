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
    columnHelper.accessor('startingDateTimeFormatted', {
        header: ({column}) => (
            <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Starting Date and
                Time {column.getIsSorted() === "asc" ? "🔼" : column.getIsSorted() === "desc" ? "🔽" : ""}
            </button>
        ),
        cell: info => info.getValue(),
        filterFn: "includesString",
    }),
    columnHelper.accessor('arrivalDateTimeFormatted', {
        header: ({column}) => (
            <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Arrival Date and
                Time {column.getIsSorted() === "asc" ? "🔼" : column.getIsSorted() === "desc" ? "🔽" : ""}
            </button>
        ),
        cell: info => info.getValue(),
        filterFn: "includesString",
    }),
    columnHelper.accessor("startingDate", {
        header: "",
        filterFn: (row, columnId, filterValue) =>
            row.getValue(columnId) === filterValue,
        enableSorting: false,
        cell: () => null,
        enableHiding: false,
    }),
    columnHelper.accessor("arrivalDate", {
        header: "",
        filterFn: (row, columnId, filterValue) =>
            row.getValue(columnId) === filterValue,
        enableSorting: false,
        cell: () => null,
        enableHiding: false,
    }),
    columnHelper.accessor('duration', {
        header: ({ column }) => (
            <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Duration {column.getIsSorted() === "asc" ? "🔼" : column.getIsSorted() === "desc" ? "🔽" : ""}
            </button>
        ),
        cell: info => info.getValue(),
        filterFn: "includesString",
    }),
    columnHelper.accessor("durationMinutes", {
        header: "",
        cell: () => null,
        filterFn: (row, columnId, filterValue) => {
            if (!filterValue) return true;
            return row.getValue(columnId) <= filterValue;
        },
        enableSorting: false,
        enableHiding: true,
    }),
    columnHelper.accessor('price', {
        header: ({ column }) => (
            <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Price {column.getIsSorted() === "asc" ? "🔼" : column.getIsSorted() === "desc" ? "🔽" : ""}
            </button>
        ),
        cell: info => info.getValue() + "€",
        sortingFn: 'basic',
        filterFn: (row, columnId, value) => {
            if (!value) return true;
            const price = row.getValue(columnId);
            return (
                (value.min == null || price >= value.min) &&
                (value.max == null || price <= value.max)
            );
        }
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
    let hours = Math.floor(duration / 60);
    let minutes = duration % 60;
    return `${hours > 0 ? hours + " Hours " : ""}${minutes > 0 ? minutes + " Minutes" : ""}`.trim();
}

function FlightSchedule() {
    const [flights, setFlights] = useState([]);
    const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);
    const [priceMin, setPriceMin] = useState();
    const [priceMax, setPriceMax] = useState();


    const navigate = useNavigate();

    const [columnVisibility, setColumnVisibility] = useState({
        startingDate: false,
        arrivalDate: false,
    });


    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/flights`)
                const formattedFlights = response.data.map(f => ({
                    ...f,
                    startingDateTimeFormatted: formatDateTime(f.startingDateTime),
                    arrivalDateTimeFormatted: formatDateTime(f.arrivalDateTime),
                    startingDate: f.startingDateTime.slice(0, 10),
                    arrivalDate: f.arrivalDateTime.slice(0, 10),
                    durationMinutes: f.duration,
                    duration: formatDuration(f.duration),
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
        state: {sorting, columnFilters, columnVisibility},
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
    });

    return (
        <div className="flight">
            <div className="page-container">
                <h1 className="h1">Teretulemast Flightbooki! Palun plaanige oma lennuplaan.</h1>
                <p style={{ color: "white" }}>Palun vajutage lennu peale, mis teile huvi pakub.</p>
                <div className="filters">
                    <input
                        type="text"
                        placeholder="Search Destination"
                        onChange={(e) => table.getColumn("destination")?.setFilterValue(e.target.value)}
                    />
                    <input
                        type="date"
                        onChange={(e) => {
                            table.getColumn("startingDate")?.setFilterValue(e.target.value);
                        }}
                    />
                    <input
                        type="date"
                        onChange={(e) => {
                            table.getColumn("arrivalDate")?.setFilterValue(e.target.value);
                        }}
                    />

                    <input
                        type="number"
                        placeholder="Max Duration (minutes)"
                        onChange={(e) => {
                            const value = e.target.value ? parseInt(e.target.value, 10) : undefined;
                            table.getColumn("durationMinutes")?.setFilterValue(value);
                        }}
                    />
                    <input
                        type="number"
                        placeholder="Min Price (€)"
                        onChange={(e) => {
                            const val = e.target.value ? parseFloat(e.target.value) : undefined;
                            setPriceMin(val);
                            table.getColumn("price")?.setFilterValue({ min: val, max: priceMax });
                        }}
                    />
                    <input
                        type="number"
                        placeholder="Max Price (€)"
                        onChange={(e) => {
                            const val = e.target.value ? parseFloat(e.target.value) : undefined;
                            setPriceMax(val);
                            table.getColumn("price")?.setFilterValue({ min: priceMin, max: val });
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
                                onClick={() => navigate(`/seats/${row.original.id}`, {state: {flight: row.original}})}
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
        </div>
    );
}

export default FlightSchedule;
