import {Link} from "react-router-dom"

function NotFoundPage() {
    return (
        <div className='not-found'>
            <h2 className='not-found__code'>404</h2>
            <p>not found</p>
            <Link className='button button--primary' to='/'>Go back</Link>
        </div>
    )
}

export default NotFoundPage
