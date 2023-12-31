import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PixabayResponse, PixabaySearchResultItem } from "../types";
import { pixabayApiKey } from "../secrets";

interface State {
    pixabayItem: PixabaySearchResultItem

    // Note: It may be better to use a tool like Redux to maintain 
    // the app state rather than duplicating it, but this works fine
    // for a project of this scope.
    pixabayItems: PixabaySearchResultItem[]
    searchQuery: string
}

export default function DetailsRoute() {
    const navigate = useNavigate()
    const { state, pathname } = useLocation()
    const [ pixabayItem, setPixabayItem ] = useState<PixabaySearchResultItem | null>(null)
    const [ didFinishLoading, setDidFinishLoading ] = useState<boolean>(false)

    // See above note regarding application state management.
    const pixabayItems = useRef<PixabaySearchResultItem[] | null>(null)
    const searchQuery = useRef<string | null>(null)

    const itemId = pathname.split("/")[1]

    const getPixabayItem = useCallback(async () => {
        if (!itemId) {
            setDidFinishLoading(true)
            console.error("Unable to determine the item ID.")
            return
        }
        
        // Build URL and send request
        const url = `https://pixabay.com/api/?key=${pixabayApiKey}&id=${itemId}&image_type=photo`
        try {
            const response = await fetch(url, {
                method: "GET",
            })
            const results = await response.json() as PixabayResponse
            const item = results.hits[0]
    
            if (!item) {
                setDidFinishLoading(true)
                console.error("No images found with ID.")
                return
            }
    
            // Re-render with item details
            setPixabayItem(item)
            setDidFinishLoading(true)
        }
        catch (err) {
            setDidFinishLoading(true)
            console.error(err)
        }
    }, [itemId])

    useEffect(() => {
        if (state) {
            // Render the item details from the provided state
            const _state = state as State
            if (_state.pixabayItem.id.toString() === itemId) {
                setPixabayItem(_state.pixabayItem)
            }
            else {
                console.error("Pixabay item ID does not match that of pathname.")
            }
            setDidFinishLoading(true)
            pixabayItems.current = _state.pixabayItems
            searchQuery.current = _state.searchQuery
        }
        else {
            // Fetch the item by ID
            getPixabayItem()
        }
    }, [getPixabayItem, itemId, setPixabayItem, state])

    function backToSearch() {
        navigate("/", {
            state: {
                pixabayItems: pixabayItems.current,
                searchQuery: searchQuery.current,
            }
        })
    }

    if (!didFinishLoading) {
        return (
            <div>
                <h2>Loading image details</h2>
                <button onClick={backToSearch}>Back to search</button>
            </div>
        )
    }

    if (!pixabayItem) {
        return (
            <div>
                <h2>There was a problem loading the image.</h2>
                <p>Check the console for details.</p>
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
