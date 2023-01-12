import React from "react"
import styles from "../styles/Footer.module.css"


export default function footer() {
    return <footer className={styles.footerMain}>

        <h3 className={styles.footerCright}>Copyright @2022 <span className={styles.footerSpan}> React McReactface</span></h3>
        <div className={styles.footerDiv}>
            <a
                data-testid="youtube-link"
                target="_blank"
                rel="noreferrer"
                href="https://www.youtube.com"
            >
                <img
                    data-testid="logo-img"
                    src={`images/youtubeNew.jpg`}
                    alt="youtube"
                    className={styles.linksLogo}
                />
            </a>
            <a
                data-testid="twitter-link"
                target="_blank"
                rel="noreferrer"
                href="https://twitter.com/home"
            >
                <img
                    data-testid="logo-img"
                    src={`images/twitterNew.jpg`}
                    alt="twitter"
                    className={styles.linksLogo}
                />
            </a>
            <a
                data-testid="instagram-link"
                target="_blank"
                rel="noreferrer"
                href="https://www.instagram.com/"
            >
                <img
                    data-testid="logo-img"
                    src={`images/instaNew.jpg`}
                    alt="instagram"
                    className={styles.linksLogo}
                />
            </a>
            <a
                data-testid="facebook-link"
                target="_blank"
                rel="noreferrer"
                href="https://www.facebook.com/"
            >
                <img
                    data-testid="logo-img"
                    src={`images/facebookNew.jpg`}
                    alt="facebook"
                    className={styles.linksLogo}
                />
            </a>
        </div>
    </footer>
}
