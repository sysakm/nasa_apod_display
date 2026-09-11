import {createBrowserRouter, redirect} from "react-router-dom";
import AppLayout from "../AppLayout.tsx";
import HomePage from "../pages/HomePage.tsx";
import NotFoundPage from "../pages/NotFoundPage.tsx";
import DatePage from "../pages/DatePage.tsx";
import {store} from "./store.ts";
import {loadTodayPhoto} from "../features/today/todayThunks.ts";
import RandomPage from "../pages/RandomPage.tsx";

function homeLoader() {
    const displayRandom = store.getState().today.displayRandom
    void store.dispatch(loadTodayPhoto({displayRandom}))
    return null
}

export const router = createBrowserRouter([
    {
        Component: AppLayout,
        children: [
            {
                index: true, loader: () => redirect('/home')
            },
            {
                path: '/home', Component: HomePage, loader: homeLoader
            },
            {
                path: '/date', Component: DatePage
            },
            {
                path: '/random', Component: RandomPage
            },
            {
                path: '*', Component: NotFoundPage
            }
        ]
    }
])