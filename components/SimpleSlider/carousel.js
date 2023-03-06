import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { useState } from "react"
// import styles from "./carousel.module.css";
import Head from "next/head"
// import "./slick.module.css";
// import "./slick-theme.module.css";
import styles from "../GigItem.module.css"
import GigItem from "../GigItem"

export const SimpleSlider = ({ gigarray }) => {
    // console.log("GigItem: ", gigarray)
    // console.log(<Slider/>)
    // console.log(gig.address1stline);

    // let thedate = new Date(gig.starttime);

    // //let mystart = new Date(gig.starttime).toLocaleString('uk');
    // let myend = new Date(gig.endtime).toLocaleString('uk');

    // let mystart = thedate.getDate()+ "/"+(thedate.getMonth()+1)+ "/"+thedate.getFullYear();
    const settings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 3,
        slidesToScroll: 1,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 920,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
        ],
    }

    //  fade: true,
    return (
        <Slider {...settings} className={styles.carousel}>
            {gigarray.map((gig) => (
                <GigItem key={gig.id} gig={gig}></GigItem>
            ))}
        </Slider>
    )
}

// import styles from "../GigItem.module.css";
