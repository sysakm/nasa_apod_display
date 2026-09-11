import {NavLink, Outlet} from "react-router-dom";

function AppLayout() {
    return (
        <>
            <header>
                <NavLink to='/home'>Home</NavLink>
                <NavLink to='/date'>Choose by Date</NavLink>
                <NavLink to='/random'>Random Pictures</NavLink>
                <NavLink to='/saved'>Saved</NavLink>
            </header>
            <main>
                <Outlet/>
            </main>
        </>
    )
}

export default AppLayout