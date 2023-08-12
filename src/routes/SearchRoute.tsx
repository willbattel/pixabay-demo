export default function SearchRoute() {

    function performSearch() {
        const formElement = document.getElementById("searchForm") as HTMLFormElement
        const formData = new FormData(formElement)
        const searchQuery = formData.get('searchQueryInput') as string
        
        // TODO: Perform search
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
