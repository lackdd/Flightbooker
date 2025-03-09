import {useEffect, useState} from "react";
import axios from "axios";
import {createColumnHelper, flexRender, getCoreRowModel, useReactTable} from '@tanstack/react-table'


const columnHelper = createColumnHelper();

const columns = [
    columnHelper.accessor('flightNumber', {
        cell: info => info.getValue(),
        header: () => 'Flight Number',
        footer: info => info.column.id,
    }),
    columnHelper.accessor(row => row.startingLocation, {
        id: 'startingLocation',
        cell: info => info.getValue(),
        header: () => 'Starting Location',
        footer: info => info.column.id,
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
        header: () => 'Destination',
        cell: info => info.getValue(),
        footer: info => info.column.id,
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
    columnHelper.accessor('price', {
        header: () => 'Price',
        cell: info => info.getValue(),
        footer: info => info.column.id,
    }),
    columnHelper.accessor('startingDateTime', {
        header: () => 'Starting Date and Time',
        cell: info => info.getValue(),
        footer: info => info.column.id,
    }),
    columnHelper.accessor('arrivalDateTime', {
        header: () => 'Arrival Date and Time',
        cell: info => info.getValue(),
        footer: info => info.column.id,
    }),
    columnHelper.accessor('duration', {
        header: () => 'Duration',
        cell: info => info.getValue(),
        footer: info => info.column.id,
    }),
];

function FlightSchedule() {
    const [flights, setFlights] = useState([]);

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/flights")
                setFlights(response.data);
                //console.log(response.data);
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchFlights();
    }, [])

    const table = useReactTable({
        data: flights,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <>
            <h1>Teretulemast Flightbooki! Palun plaanige oma lennuplaan.</h1>
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
        </>
    );
}

export default FlightSchedule;
