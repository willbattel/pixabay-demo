import { pixabayApiKey } from "../secrets"

export default function SearchRoute() {

    async function performSearch() {
        // Get raw user input from form
        const formElement = document.getElementById("searchForm") as HTMLFormElement
        const formData = new FormData(formElement)
        const searchQuery = formData.get('searchQueryInput') as string

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

        // TODO: Fetch
    }

    return (
        <div>
            <div>
                <form id="searchForm">
                    <input name="searchQueryInput" type="search" placeholder="Search for images" />
                </form>
                <button onClick={performSearch}>Search</button>
            </div>
            <div>
                TODO: Search results
            </div>
        </div>
    )
}
