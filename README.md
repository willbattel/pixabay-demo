# Pixabay Demo

This demo project takes a search query from the user and fetches image results from [Pixabay](https://pixabay.com/).

You can click an image to view a larger version and see details included by Pixabay.

## How to use

You must provide an API key in order to fetch from Pixabay. To do this, create the file `src/secrets.ts`, and inside include the following:

```
export const pixabayApiKey = "YOUR-API-KEY-HERE"
```

Using environment variables, other secret managers, or **keeping the key exclusively server-side altogether** would probably be best for a project of greater scope.

Install the required dependencies with `npm install`, then run the Vite development server locally with `npm run dev`. Alternatively, you can build the project with `npm run build`, afterwhich you can find the output files in the `dist` directory. 

## Technologies Used

- [React](https://react.dev)
- [Vite](https://vitejs.dev)
- [Vanilla Extract](https://vanilla-extract.style)
- ~~Love~~ ... I mean [TypeScript](https://www.typescriptlang.org)
