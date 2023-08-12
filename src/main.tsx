import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App.tsx'
import './index.css'
import SearchRoute from './routes/SearchRoute.tsx';
import DetailsRoute from './routes/DetailsRoute.tsx';

// Get root DOM element and setup the router
const rootElement = document.getElementById("root");
if (!rootElement) {
    console.error("Could not get document's root element.")
}
else {
    const root = createRoot(rootElement)
    root.render(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<SearchRoute />} />
                    <Route path=":imageId" element={<DetailsRoute />} />
                </Route>
            </Routes>
        </BrowserRouter>,
    )
}
