import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./carousel.module.css";
import Head from "next/head";
// import "./slick.module.css";
// import "./slick-theme.module.css";

export const SimpleSlider = () => {
  const settings = {

      dots: true,
      infinite: true,
      speed: 600,
      slidesToShow: 3,
      slidesToScroll: 1,
      adaptiveHeight: true,

   
    };
 
//  fade: true,
    return (
      
    <Slider {...settings} className= {styles.carousel}>
      <div className={styles.gigCard}>
                <p
                >image required</p>
            <div className={styles.gigCardSub}>
                <ol>
                    <li></li>
                    <li className={styles.bigtitle}>aaaaaaaa</li>
                    <li className={styles.title}>aaaaaaa</li>
                    <li className={styles.title}>
                      Sets
                    </li>
                    <li>
                        <data> required</data>
                    </li>
                </ol>
            </div>
        </div>
        <div className={styles.gigCard}>
                <p
                >image required</p>
            <div className={styles.gigCardSub}>
                <ol>
                    <li></li>
                    <li className={styles.bigtitle}>aaaaaaaa</li>
                    <li className={styles.title}>aaaaaaa</li>
                    <li className={styles.title}>
                      Sets
                    </li>
                    <li>
                        <data> required</data>
                    </li>
                </ol>
            </div>
        </div>
        <div className={styles.gigCard}>
                <p
                >image required</p>
            <div className={styles.gigCardSub}>
                <ol>
                    <li></li>
                    <li className={styles.bigtitle}>aaaaaaaa</li>
                    <li className={styles.title}>aaaaaaa</li>
                    <li className={styles.title}>
                      Sets
                    </li>
                    <li>
                        <data> required</data>
                    </li>
                </ol>
            </div>
        </div>
        <div className={styles.gigCard}>
                <p
                >image required</p>
            <div className={styles.gigCardSub}>
                <ol>
                    <li></li>
                    <li className={styles.bigtitle}>aaaaaaaa</li>
                    <li className={styles.title}>aaaaaaa</li>
                    <li className={styles.title}>
                      Sets
                    </li>
                    <li>
                        <data> required</data>
                    </li>
                </ol>
            </div>
        </div><div className={styles.gigCard}>
                <p
                >image required</p>
            <div className={styles.gigCardSub}>
                <ol>
                    <li></li>
                    <li className={styles.bigtitle}>aaaaaaaa</li>
                    <li className={styles.title}>aaaaaaa</li>
                    <li className={styles.title}>
                      Sets
                    </li>
                    <li>
                        <data> required</data>
                    </li>
                </ol>
            </div>
        </div>
        <div className={styles.gigCard}>
                <p
                >image required</p>
            <div className={styles.gigCardSub}>
                <ol>
                    <li></li>
                    <li className={styles.bigtitle}>aaaaaaaa</li>
                    <li className={styles.title}>aaaaaaa</li>
                    <li className={styles.title}>
                      Sets
                    </li>
                    <li>
                        <data> required</data>
                    </li>
                </ol>
            </div>
        </div>
       </Slider>
        )
       }


// import styles from "../GigItem.module.css";

