import styles from "/styles/about.module.css"

const about = () => (

    <div className={styles.container}>
    <div className={styles.header}>
    <div className={styles.aboutusside}>
      <h1 className={styles.aboutus}>MusoFind's Vision</h1>
    </div>
    <div>
      <p className={styles.brief}>Specializing in connecting musicians from all around the country by providing an easy-to-use platform for posting and searching gigs, fostering a vibrant and dynamic music scene.</p>
    </div>
    </div>
    <div className={styles.main}>
    <div className={styles.firstpara}>
      <p className={styles.info}> We understand the importance of having a platform where musicians can easily post gigs and find qualified individuals to play with them. Our platform allows musicians to create profiles, post information about their skills and experience, and browse through a wide variety of gigs posted by other musicians.</p>
      <div className={styles.imgonebckgrnd}>
      </div>{/* <img className={styles.aboutimgs} width="70vh" src={`images/about/trumpet.jpg`} alt="imagehere"></img> */}
    </div>
    <div className={styles.secondpara}>
    <div className={styles.imgtwobckgrnd}>
    </div>
      {/* <img className={styles.aboutimgs} width="70vh" src={`images/about/band.jpg`} alt="imagehere"></img> */}
      <p className= {styles.info}> We believe that by connecting musicians from all around the country, we are helping to create a vibrant and dynamic music scene. We strive to make it easy for musicians of all levels, whether they are just starting out or are experienced professionals, to find opportunities to play, grow, and connect with other musicians.</p> 
    </div>  
    <div className={styles.thirdpara}>
      <p className= {styles.info}> Our platform also includes tools to help musicians find bandmates, collaborate on music and share resources. By joining us now, musicians can start connecting with fellow musicians and finding gigs that aligns with their skills, passion and schedule.</p>
      <div className={styles.imgthreebckgrnd}>
      </div>
      {/* <img className={styles.aboutimgs} width="70vh" src={`images/about/drums.jpg`} alt="imagehere"></img> */}
    </div>
    </div>
    </div>
  )
  
  export default about
