import { PixabaySearchResultItem } from "../types"

import * as componentStyles from './SearchResult.css'

interface Props {
    onClick: () => void,
    pixabayItem: PixabaySearchResultItem
}

export default function SearchResult(props: Props) {
    return (
        <div className={componentStyles.resultContainer} onClick={props.onClick}>
            <img className={componentStyles.resultImage} src={props.pixabayItem.largeImageURL} />
        </div>
    )
}
