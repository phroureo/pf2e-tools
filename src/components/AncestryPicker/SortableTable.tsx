import React, { useState, useMemo } from "react";
import { toProperCase } from "../../utils/textManip";
import TraitPill from "../TraitPill"; // Assume TraitPill is correctly imported

type Data = Record<string, any>;
type SortKeys = string;
type SortOrder = "ascn" | "desc";

const sortData = ({
    tableData,
    sortKey,
    reverse,
}: {
    tableData: Data[];
    sortKey: SortKeys;
    reverse: boolean;
}) => {
    if (!sortKey) return tableData;

    const sortedData = [...tableData].sort((a, b) =>
        a[sortKey] > b[sortKey] ? 1 : -1
    );

    return reverse ? sortedData.reverse() : sortedData;
};

const SortButton: React.FC<{
    isActive: boolean;
    sortOrder: SortOrder;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}> = ({ isActive, sortOrder, onClick }) => (
    <button
        onClick={onClick}
        className={`sort-button ${isActive ? (sortOrder === "desc" ? "sort-reverse" : "sort-active") : ""}`}
        style={{ padding: "0", margin: "0", background: "transparent" }}
    >
        {sortOrder === "ascn" ? "▲" : "▼"}
    </button>
);

const SortableTable: React.FC<{ data: Data[] }> = ({ data }) => {
    const [sortKey, setSortKey] = useState<SortKeys | null>(null);
    const [sortOrder, setSortOrder] = useState<SortOrder>("ascn");

    const headers = data.length > 0 ? Object.keys(data[0]) : [];

    const sortedData = useMemo(
        () =>
            sortData({
                tableData: data,
                sortKey: sortKey || "",
                reverse: sortOrder === "desc",
            }),
        [data, sortKey, sortOrder]
    );

    const handleSort = (key: SortKeys) => {
        if (sortKey === key) {
            setSortOrder((prevOrder) => (prevOrder === "ascn" ? "desc" : "ascn"));
        } else {
            setSortKey(key);
            setSortOrder("ascn");
        }
    };

    const renderCellContent = (value: any, propertyName: string, dataInstance: any) => {
        // Check if the property is marked with `@showInTrait`
        const isTrait = Reflect.getMetadata("showInTrait", dataInstance, propertyName);

        if (isTrait) {
            // If the value is an array, render each item as a TraitPill
            if (Array.isArray(value)) {
                return (
                    <div style={{ gap: "2px", display: "flex", flexWrap: "wrap" }}>
                        {value.map((trait: string, index: number) => (
                            <TraitPill key={index} trait={trait} />
                        ))}
                    </div>
                );
            }

            // If the value is a string, render it as a TraitPill
            if (typeof value === "string") {
                if (value !== "") {
                    return <TraitPill trait={value} />;
                }
            }
            return "";
        }

        // Default rendering for non-trait values
        return value;
    };

    

    return (
        <div
            style={{
                overflowY: "auto",
                width: "100%", // Constrain width to parent
                maxWidth: "100%", // Prevent exceeding the parent width
                maxHeight: "calc(100vh - 75px)",
                boxSizing: "border-box",
                padding: "10px",
            }}
        >
            <table
                style={{
                    width: "100%", // Match the container's width
                    tableLayout: "fixed", // Prevent dynamic column expansion
                    borderCollapse: "collapse",
                    boxSizing: "border-box",
                }}
            >
                <thead style={{ 
                    position: "sticky", 
                    top: 0, 
                    zIndex: 1 
                    }}>
                    <tr style={{ textWrap: "nowrap" }}>
                        {headers.map((header, index) => (
                            <th
                                key={header}
                                className={
                                    index >= headers.length - 2 ? "hide-on-small-screen" : ""
                                } // Add class to last two columns
                                style={{
                                    padding: "8px",
                                    background: "#1b1b2f",
                                    textAlign: "left",
                                    color: "white",
                                    borderBottom: "1px solid #666",
                                    position: "sticky", // Ensures the header remains fixed
                                    top: 0, // Required for sticky behavior
                                    boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.1)", // Subtle shadow for distinction
                                }}
                            >
                                {toProperCase(header)}
                                <SortButton
                                    isActive={sortKey === header}
                                    sortOrder={sortKey === header ? sortOrder : "ascn"}
                                    onClick={() => handleSort(header)}
                                />
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((row, index) => (
                        <tr key={index} style={{ padding: "8px" }}>
                            {headers.map((header, headerIndex) => (
                                <td
                                    key={header}
                                    className={
                                        headerIndex >= headers.length - 2
                                            ? "hide-on-small-screen"
                                            : ""
                                    } // Add class to last two columns
                                    style={{
                                        margin: "2px",
                                        padding: "8px",
                                        borderBottom: "1px solid #333",
                                        textAlign: "left",
                                    }}
                                >
                                    {renderCellContent(row[header], header, row)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SortableTable;
