import React from "react";

const Entry = ({fullname, weight, colour, price}) => {
    price = Number(price).toFixed(2);
    const FullRow = () => (
        <tr>
            <td> {fullname} </td>
            <td> {weight} kg </td>
            <td style={{background: colour}}></td>
            <td> {price} SEK </td>
        </tr>
    );

    const EmptyRow = () => (
        <tr>
            <td colSpan="4">There are no entries</td>
        </tr>
    )

    return (
        (typeof fullname === "undefined") ? <EmptyRow /> : <FullRow />
    );
}
export default Entry;