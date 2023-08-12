import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PixabayResponse, PixabaySearchResultItem } from "../types";

interface State {
    pixabayItem: PixabaySearchResultItem

    // Note: It may be better to use a tool like Redux to maintain 
    // the app state rather than duplicating it, but this works fine
    // for a project of this scope.
    pixabayResponse: PixabayResponse
    searchQuery: string
}

export default function DetailsRoute() {
    const navigate = useNavigate()
    const { state, pathname } = useLocation()
    const [ pixabayItem, setPixabayItem ] = useState<PixabaySearchResultItem | null>(null)

    // See above note regarding application state management.
    const pixabayResponse = useRef<PixabayResponse | null>(null)
    const searchQuery = useRef<string | null>(null)

    const itemId = pathname.split("/")[1]

    useEffect(() => {
        if (state) {
            const _state = state as State
            if (_state.pixabayItem.id.toString() === itemId) {
                setPixabayItem(_state.pixabayItem)
            }
            else {
                console.error("Pixabay item ID does not match that of pathname.")
            }
            pixabayResponse.current = _state.pixabayResponse
            searchQuery.current = _state.searchQuery
        }
        else {
            getPixabayItem()
        }
    }, [itemId, setPixabayItem, state])

    function getPixabayItem() {
        // TODO
    }

    function backToSearch() {
        navigate("/", {
            state: {
                pixabayResponse: pixabayResponse.current,
                searchQuery: searchQuery.current,
            }
        })
    }

    if (!pixabayItem) {
        return (
            <div>
                <h2>Loading image details</h2>
                <button onClick={backToSearch}>Back to search</button>
            </div>
            
        )
    }

    return (
        <div>
            <h2>Image details</h2>
            <button onClick={backToSearch}>Back to search</button>
            <ul>
                <li>User: {pixabayItem.user}</li>
                <li>Tags: {pixabayItem.tags}</li>
            </ul>
            <img src={pixabayItem.largeImageURL} />
        </div>
    )
}
