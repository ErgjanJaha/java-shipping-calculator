import {
    CREATE_ENTRY,
    CREATED_ENTRY,
    LIST_ENTRIES,
    LISTED_ENTRIES
} from "./constants";

export function loadEntries() {
    return (dispatch) => {
        dispatch({
            type: LIST_ENTRIES,
        });

        fetch('http://localhost:8080/api/list')
            .then((response) => response.json())
            .then((response) => dispatch(entriesListed(response)));
    }
}

export function entriesListed(entries) {
    return {
        type: LISTED_ENTRIES,
        entries,
    };
}

export function createEntry() {
    return (dispatch, getState) => {
        const form = getState().form.entry.values;
        console.log(form);
        const entry = {
            fullname: form.fullname,
            weight: form.weight,
            colour: hexToRgb(form.colour),
            country: form.country
        };
        let formData = new URLSearchParams();

        for (let k in entry) {
            formData.append(k, entry[k]);
        }
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: formData
        };
        fetch('http://localhost:8080/api/add/entry', requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.success === true) {
                    dispatch({
                        type: CREATED_ENTRY,
                        entries: data.entries,
                    })
                }
            });
        dispatch({
            type: CREATE_ENTRY,
            entry,
        });
    }
}

function hexToRgb(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    let rgb = result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : hex;
    return `rgb(${rgb.r},${rgb.g},${rgb.b})`;
}