import {
    CREATE_ENTRY, CREATED_ENTRY,
    LIST_ENTRIES, LISTED_ENTRIES
} from "../constants";

const createReducer = (state = {
    entries: [],
    loadingEntries: true,
    creatingEntry: true
}, action) => {
    switch(action.type) {
        case LIST_ENTRIES:
            return Object.assign({}, state, {
                loadingEntries: true
            });
        case LISTED_ENTRIES:
            return Object.assign({}, state, {
                entries: action.entries,
                loadingEntries: false
            });
        case CREATE_ENTRY:
            return Object.assign({}, state, {
                creatingEntry: true,
                entries: [action.entry]
            });
        case CREATED_ENTRY:
            return Object.assign({}, state, {
                creatingEntry: false
            });
        default:
            return true;
    }
}
export default createReducer;