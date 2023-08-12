import { PixabaySearchResultItem } from "../types"

interface Props {
    onClick: () => void,
    pixabayItem: PixabaySearchResultItem
}

export default function SearchResult(props: Props) {
    return (
        <div onClick={props.onClick}>
            <img src={props.pixabayItem.largeImageURL}/>
        </div>
    )
}
