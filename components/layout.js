import Navbar from "./navbar"
import RealFooter from "./footer"


export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            {children}
            <RealFooter />
        </>
    )
}
