import React, { useMemo } from "react";
import { useTable, usePagination, useFilters } from "react-table";
import { AiFillDelete } from "react-icons/ai";
import { FaEye } from "react-icons/fa";

const AnswerTable = ({ answers, onDelete, onContentDisplay }) => {
    const columns = useMemo(
        () => [
            {
                Header: "Cevaplayan",
                accessor: "userName",
            },
            {
                Header: "Cevap ID",
                accessor: "_id",
            },
            {
                Header: "Cevap Tarihi",
                accessor: "createdAt",
                Cell: ({ value }) => new Date(value).toLocaleString(),
            },
            {
                Header: "",
                accessor: "actions",
                Cell: ({ row }) => (
                    <div className="flex gap-2">
                        <button
                            onClick={() => onContentDisplay(row.original)}
                            className="bg-primary-light text-white px-4 py-2 rounded hover:bg-primary-dark transition"
                        >
                            <FaEye className="inline-block" />
                        </button>
                        <button
                            onClick={() => onDelete(row.original._id)}
                            className="bg-danger text-white px-4 py-2 rounded hover:bg-danger-dark transition"
                        >
                            <AiFillDelete className="inline-block" />
                        </button>
                    </div>
                ),
            },
        ],
        []
    );

    const {
        getTableProps,
        getTheadProps,
        getTrProps,
        getThProps,
        getTdProps,
        headerGroups,
        rows,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data: answers,
            initialState: { pageIndex: 0 },
        },
        useFilters,
        usePagination
    );

    const pagination = useMemo(() => {
        const paginationButtons = [];

        if (canPreviousPage) {
            paginationButtons.push(
                <button
                    key="previous"
                    onClick={() => previousPage()}
                    className="bg-gray-100 px-4 py-2 rounded hover:bg-gray-200 transition"
                >
                    Önceki
                </button>
            );
        }

        paginationButtons.push(
            <span key="page-info" className="px-4 py-2">
                Sayfa {pageIndex + 1} / {pageCount}
            </span>
        );

        if (canNextPage) {
            paginationButtons.push(
                <button
                    key="next"
                    onClick={() => nextPage()}
                    className="bg-gray-100 px-4 py-2 rounded hover:bg-gray-200 transition"
                >
                    Sonraki
                </button>
            );
        }

        return paginationButtons;
    }, [canPreviousPage, canNextPage, pageIndex, pageCount, previousPage, nextPage]);

    return (
        <div className="overflow-x-auto p-4">
            <table {...getTableProps()} className="w-full h-[50%] shadow-md rounded-lg border">
                <thead>
                    {headerGroups?.map((headerGroup) => {
                        const { key, ...rest } = headerGroup.getHeaderGroupProps();
                        return (
                            <tr key={key} {...rest} className="bg-gray-100">
                                {headerGroup.headers?.map((column) => {
                                    const { key: thKey, ...thRest } = column.getHeaderProps();
                                    return (
                                        <th key={thKey} {...thRest} className="px-4 py-2">
                                            {column.render("Header")}
                                        </th>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </thead>
                <tbody>
                    {page?.map((row, i) => {
                        prepareRow(row);
                        const { key, ...rest } = row.getRowProps();
                        return (
                            <tr key={key} {...rest} className="hover:bg-gray-100">
                                {row.cells?.map((cell) => {
                                    const { key: tdKey, ...tdRest } = cell.getCellProps();
                                    return (
                                        <td key={tdKey} {...tdRest} className="px-4 py-2">
                                            {cell.render("Cell")}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="flex items-center justify-between mt-4 p-2 border rounded-sm shadow-sm">
                <select
                    className="bg-gray-100 px-4 py-2 rounded hover:bg-gray-200 transition focus:outline-none focus:ring-2 focus:ring-primary"
                    value={pageSize}
                    onChange={(e) => {
                        setPageSize(Number(e.target.value));
                    }}
                >
                    {[10, 20, 30, 40, 50]?.map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            {pageSize} satır
                        </option>
                    ))}
                </select>
                <div className="flex items-center gap-2">{pagination}</div>
            </div>
        </div>
    );
};

export default AnswerTable;

