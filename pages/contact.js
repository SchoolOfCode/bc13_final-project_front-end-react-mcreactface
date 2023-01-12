// export default function contact() {
//     return <div>contact</div>
// }
import styles from "/styles/contact.module.css"
import React from "react";

const Contact = () => {
  return (
    <div
      name="contact"
      className={styles.contactcontainer}
    >
      <form
        method="POST"
        action="https://getform.io/f/e0fab6fa-841a-4826-95fa-7094639ba2ae"
        className={styles.formcontainer}
      >
        <div className= {styles.padbtm}>
          <p className= {styles.headingcontainer}>
            Contact Us
          </p>
          <p className={styles.pcontainer}>
            Submit the form below to get in contact with us.
          </p>
        </div>
        <input
          className={styles.namecontainer}
          type="text"
          placeholder="Name"
          name="name"
        />
        <input
          className={styles.emailcontainer}
          type="text"
          placeholder="Email"
          name="Email"
        />
        <textarea
          className={styles.textcontainer}
          name="message"
          rows="10"
          placeholder="Message"
        />
        <button className={styles.buttoncontainer}>
          Send us an Enquiry!
        </button>
      </form>
    </div>
  );
};

export default Contact;
