import {NavLink, Outlet} from "react-router-dom";

function AppLayout() {
    return (
        <>
            <header>
                <NavLink to='/home'>Home</NavLink>
                <NavLink to='/date'>Choose by Date</NavLink>
            </header>
            <main>
                <Outlet/>
            </main>
        </>
    )
}

export default AppLayout