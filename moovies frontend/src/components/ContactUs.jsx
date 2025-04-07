import "../css/ContactUs.css";
import locationImage from "../assets/location.png";
import email from "../assets/email.png";
import phone from "../assets/phone.png";
import web from "../assets/web.png";
import { useEffect, useState } from "react";
import { getContactUsData } from "../services/api";

function ContactUs() {
  const [data, setData] = useState("");
  const [error, setError] = useState(null);
  useEffect(() => {
    const loadContactUsData = async () => {
      try {
        const contactUsData = await getContactUsData();
        console.log(contactUsData);
        setData(contactUsData);
      } catch (err) {
        console.log(err);
        setError("failed to load contactUsData");
      }
    };
    loadContactUsData();
  }, []);
  const sendMessage = () => {};

  return (
    <div className="contactus">
      <div className="box">
        <div className="left">
          <h2>Let's get in touch</h2>
          <p>We are open for any suggetions or just to have chat</p>
          <div className="contact-info">
            <img src={locationImage} alt="location" />
            <h4>
              <strong>Address:</strong> {data.address}
            </h4>
          </div>

          <div className="contact-info">
            <img src={phone} alt="phone" />
            <h4>
              <strong>Phone:</strong> {data.phone}
            </h4>
          </div>

          <div className="contact-info">
            <img src={email} alt="email" />
            <h4>
              <strong>Email:</strong> {data.email}
            </h4>
          </div>

          <div className="contact-info">
            <img src={web} alt="web" />
            <h4>
              <strong>Web:</strong> {data.web}
            </h4>
          </div>
          {error && <div className="error-message">{error}</div>}
        </div>
        <div className="right">
          <div className="title">
            <h2>Get in touch</h2>
          </div>
          <form onSubmit={sendMessage} className="add-details">
            <div className="row">
              <label className="fullName">
                FULL NAME
                <input
                  type="text"
                  name="fullName"
                  placeholder="Name"
                  required
                />
              </label>
              <label className="email">
                EMAIL
                <input type="text" name="email" placeholder="Email" required />
              </label>
            </div>
            <label className="subject">
              SUBJECT
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
              />
            </label>
            <label className="message">
              MESSAGE
              <input
                type="text"
                name="message"
                placeholder="Message"
                required
              />
            </label>
          </form>
          <button type="submit">Send Message</button>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
