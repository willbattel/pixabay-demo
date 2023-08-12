import { useEffect, useRef, useState } from "react"
import { pixabayApiKey } from "../secrets"
import { PixabaySearchResultItem, PixabayResponse } from "../types"
import SearchResult from "../components/SearchResult"
import { useLocation, useNavigate } from "react-router-dom"

interface State {
    pixabayItems?: PixabaySearchResultItem[] | null
    searchQuery?: string | null
}

export default function SearchRoute() {
    const navigate = useNavigate()
    const { state } = useLocation()

    const [pixabayItems, setPixabayItems] = useState<PixabaySearchResultItem[]>([])
    const lastSearchQuery = useRef<string | null>(null)

    useEffect(() => {
        if (state) {
            const _state = state as State
            if (_state.pixabayItems && _state.searchQuery) {
                lastSearchQuery.current = _state.searchQuery
                setPixabayItems(_state.pixabayItems)
            }
        }
    }, [state])

    async function performSearch() {
        // Get raw user input from form
        const formElement = document.getElementById("searchForm") as HTMLFormElement
        const formData = new FormData(formElement)
        const searchQuery = formData.get('searchQueryInput') as string
        lastSearchQuery.current = searchQuery

        // Get sanitized, non-empty search components from input string
        const searchComponents = searchQuery
            .replace(/[^a-z0-9áéíóúñü ]/gim, "")
            .split(" ")
            .filter(component => !!component)

        // Ignore empty queries
        if (searchComponents.length < 1) {
            return
        }

        // Build URL and send request
        const url = `https://pixabay.com/api/?key=${pixabayApiKey}&q=${searchComponents.join("+")}&image_type=photo`
        const response = await fetch(url, {
            method: "GET",
        })
        const results = await response.json() as PixabayResponse
        setPixabayItems(results.hits)
    }

    const resultElements: JSX.Element[] = []
    for (const pixabayItem of pixabayItems) {
        const showDetails = () => {
            navigate(`/${pixabayItem.id}`, {
                state: {
                    pixabayItem: pixabayItem,
                    pixabayItems: pixabayItems,
                    searchQuery: lastSearchQuery.current,
                },
            })
        }
        resultElements.push(<SearchResult onClick={showDetails} pixabayItem={pixabayItem} key={pixabayItem.id} />)
    }

    return (
        <div>
            <div>
                <form id="searchForm">
                    <input name="searchQueryInput" type="search" placeholder="Search for images" defaultValue={lastSearchQuery.current ?? ""} />
                </form>
                <button onClick={performSearch}>Search</button>
            </div>
            <div>
                {resultElements}
            </div>
        </div>
    )
}
