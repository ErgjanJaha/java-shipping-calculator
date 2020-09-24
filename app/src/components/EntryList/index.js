import React from "react";
import "./index.less";
import Entry from "../Entry/";

const EntryList = ({entries}) => {

    const entryList = entries.entries.map(entry => (
        <Entry key={entry.id}
               {...entry}
        />
    ));

    if (entryList.length < 1) {
        entryList.push(<Entry key={1} />);
    }

    return (
        <div>
            <table
                className="EntryList-table"
            >
                <thead>
                    <tr>
                        <th>Receiver</th>
                        <th>Weight</th>
                        <th>Colour</th>
                        <th>Cost</th>
                    </tr>
                </thead>
                <tbody>{entryList}</tbody>
                <tfoot>
                    <tr>
                        <th>Total Weight</th>
                        <th>{entries.total[1]} kg</th>
                        <th>Total Cost</th>
                        <th>{Number(entries.total[0]).toFixed(2)} SEK</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default EntryList;