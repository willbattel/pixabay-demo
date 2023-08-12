import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { PixabaySearchResultItem } from "../types";

interface State {
    pixabayItem: PixabaySearchResultItem
}

export default function DetailsRoute() {
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

    if (!pixabayItem) {
        return (
            <h2>Loading image details</h2>
        )
    }

    return (
        <div>
            <h2>Image details</h2>
            <ul>
                <li>User: {pixabayItem.user}</li>
                <li>Tags: {pixabayItem.tags}</li>
            </ul>
            <img src={pixabayItem.largeImageURL} />
        </div>
    )
}
