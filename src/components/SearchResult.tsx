import { Link } from "react-router-dom"
import { PixabaySearchResultItem } from "../types"

interface Props {
    pixabayItem: PixabaySearchResultItem
}

export default function SearchResult(props: Props) {
    return (
        <Link to={`/${props.pixabayItem.id}`} state={{
            pixabayItem: props.pixabayItem,
        }}>
            <div>
                <img src={props.pixabayItem.largeImageURL}/>
            </div>
        </Link>
    )
}
