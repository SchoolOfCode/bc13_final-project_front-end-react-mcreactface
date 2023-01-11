// export default function contact() {
//     return <div>contact</div>
// }

import React from "react";

const Contact = () => {
  return (
    <div
      name="contact"
      className="w-full h-screen bg-[#4b6892] flex justify-center items-center p-4"
    >
      <form
        method="POST"
        action="https://getform.io/f/e0fab6fa-841a-4826-95fa-7094639ba2ae"
        className="flex flex-col max-w-[600px] w-full"
      >
        <div className="pb-8">
          <p className="text-6xl font-bold inline border-b-4 border-[#0c203b] text-white">
            {" "}
            Contact Us
          </p>
          <p className="text-gray-300 py-4 pt-8 text-2xl">
            {" "}
            Submit the form below or send me an email-
            Mohamedabdiqani321@gmail.com{" "}
          </p>
        </div>
        <input
          className=" bg-gray-200 p-2"
          type="text"
          placeholder="Name"
          name="name"
        />
        <input
          className="my-4 p-2 bg-gray-200"
          type="text"
          placeholder="Email"
          name="Email"
        />
        <textarea
          className=" bg-gray-200 p-2"
          name="message"
          rows="10"
          placeholder="message"
        />
        <button className="text-white border-2 hover:bg-[#0c203b] hover:border-[#0c203b] px-4 py-3 my-8 mx-auto flex items-center">
          Send us an Enquiry
        </button>
      </form>
    </div>
  );
};

export default Contact;
