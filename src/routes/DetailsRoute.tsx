import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PixabaySearchResultItem } from "../types";

interface State {
    pixabayItem: PixabaySearchResultItem
}

export default function DetailsRoute() {
    const navigate = useNavigate()
    const { state, pathname } = useLocation()
    const [ pixabayItem, setPixabayItem ] = useState<PixabaySearchResultItem | null>(null)

    const itemId = pathname.split("/")[1]

    useEffect(() => {
        if (state) {
            const { pixabayItem } = state as State
            if (pixabayItem.id.toString() === itemId) {
                setPixabayItem(pixabayItem)
            }
            else {
                console.error("Pixabay item ID does not match that of pathname.")
            }
        }
        else {
            getPixabayItem()
        }
    }, [itemId, setPixabayItem, state])

    function getPixabayItem() {
        // TODO
    }

    function backToSearch() {
        navigate("/")
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
