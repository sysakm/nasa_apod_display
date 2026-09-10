import {Link} from "react-router-dom"

function NotFoundPage() {
    return (
        <div>
            <h2>404</h2>
            <p>not found</p>
            <Link to='/'>Go back</Link>
        </div>
    )
}

export default NotFoundPage