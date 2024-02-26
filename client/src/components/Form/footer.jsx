import { Link } from "react-router-dom";


const footer = ({ err, redirectTxt, redirectAnchor, redirectLink }) => {
    return (
        <>
            <p className="text-center mt-3 font-medium">{redirectTxt} <ins><Link to={redirectLink}>{redirectAnchor}</Link></ins></p>
            {
                err && (typeof err === "object" ? err.map((e, index) => (
                    <p key={e.message + index} className="text-red-500 text-center mt-3 font-medium">{e.msg}</p>
                )) : <p className="text-red-500 text-center mt-3 font-medium">{err}</p>
                )}
        </>
    )
}

export default footer