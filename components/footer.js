import React from "react"
import styles from "../styles/Footer.module.css"


export default function footer() {
    return <footer>

        <h3 className={styles.footerMain}>Copyright @2022 <span className={styles.footerSpan}> React McReactface</span></h3>
        <a
            data-testid="react-link"
            target="_blank"
            rel="noreferrer"
            href="https://reactjs.org/"
        >
            <img
                data-testid="logo-img"
                className={styles.links}
                src="/Pictures/react-logo.png"
                alt="react"
            />
        </a>
    </footer>
}
