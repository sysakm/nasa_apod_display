# NASA APOD Display App

A React and TypeScript single-page application for browsing NASA's Astronomy Picture of the Day media.

## Features

- View today's APOD or load a random picture.
- Search for one APOD or a date range of up to 10 days.
- Load up to 10 random APOD entries.
- Display image and video entries.
- Save and remove pictures from any results page.
- Browse saved pictures.
- Persist saved pictures in the browser using `localStorage`.

## Technologies

- React
- TypeScript
- Vite
- Redux Toolkit
- React Router
- Axios

## Configuration

Create a `.env.local` file in the project directory:

```env
VITE_NASA_API_KEY=your_nasa_api_key
```

The `.env.local` file is ignored by Git and should not be committed.

## Persistence

Saved APOD entries are stored in `localStorage`. They survive page reloads but are available only in the same browser and origin.
