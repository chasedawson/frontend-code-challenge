# GFW frontend code challenge

Hi👋! First of all, thanks for taking the time to do this.

## Overview

Our main [app](https://globalfishingwatch.org/map) maintains a large and complex state between its components and the URL, so we would like to know your approach to synchronizing the state between them.

## Main Objective

Sync the state of the `"Presence"` and `"Satellite"` [switches](src/components/Sidebar.tsx) in the sidebar with the URL to ensure changes are reflected on the visibility in the [Map](src/components/Main.tsx) for

- The [Heatmap layer](src/layers/FourwingsHeatmapTileLayer.ts)
- The [Satellite layer](src/layers/SatelliteLayer.ts)

### Requisites

- The cleaner url, the better
- Refreshing the page should maintain the state

## Extra Objective

Please don't spend too much time here, and don't write any code!
We just want something to start the conversation in the following interview.

We've developed a custom layer in Deck called [`FourwingsHeatmapTileLayer`](src/layers/FourwingsHeatmapTileLayer.ts) to render aggregated temporal data.
Could you take a look and share your thoughts about your approach to improving the rendering performance?

## Submission guidelines

Feel free to push your code to any public/private repo or send a zipped version to this [email](joseangel@globalfishingwatch.org)

If you prefer a private repo for privacy reasons, please include the `j8seangel` user in Git Hub or GitLab.

## Project setup

To run the project, follow these steps:

Install the dependencies:

```bash
yarn install
```

Start the development server:

```bash
yarn dev
```

Open your browser and navigate to <http://localhost:5173/> to see the application running.

Have fun, and see you soon!

## My Approach

### State Management

I implemented global state management using the `useContext` hook to track active layers, avoiding extra, potentially unnecessary dependencies. This implementation creates a custom hook and follows React best practices for optimizing re-renders through memoization of the context value.

### URL Synchronization

I added `react-router-dom` as a dependency and implemented URL synchronization using `react-router-dom`'s `useSearchParams` hook to maintain a clean, human-readable URL structure (e.g., `presence=true&satellite=false`) that serves as the source of truth for layer visibility state. This approach ensures state persistence across page refreshes.

Since there are only two layers, I interpreted a clean URL as one that is human-readable and that clearly maps to the application state. To scale to more layers in the future, we could consider:

- only showing layers with true values in the URL
- encoding active layers as bit flags
- query parameter grouping

But for the current requirements, this approach provides the best balance of simplicity and functionality.

### Other Notes

I changed the default start and end time of the Timebar to be the full available range.
