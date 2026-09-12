import {NavLink, Outlet} from "react-router-dom";

function AppLayout() {
    return (
        <div className='app-shell'>
            <header className='app-header'>
                <nav className='app-nav' aria-label='Primary navigation'>
                    <NavLink className='app-nav__link' to='/home'>Home</NavLink>
                    <NavLink className='app-nav__link' to='/date'>Choose by Date</NavLink>
                    <NavLink className='app-nav__link' to='/random'>Random Pictures</NavLink>
                    <NavLink className='app-nav__link' to='/saved'>Saved</NavLink>
                </nav>
            </header>
            <main className='app-main'>
                <Outlet/>
            </main>
        </div>
    )
}

export default AppLayout
