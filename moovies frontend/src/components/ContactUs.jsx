import "../css/ContactUs.css";
import locationImage from "../assets/location.png";
import email from "../assets/email.png";
import phone from "../assets/phone.png";
import web from "../assets/web.png";
import { useEffect, useState } from "react";
import { getContactUsData, addContactUsData } from "../services/api";

function ContactUs() {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
    file: null,
  });
  console.log(formData);

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

  const sendMessage = async (e) => {
    e.preventDefault();
  
    try {
      const form = new FormData();
      form.append("fullName", formData.fullName);
      form.append("email", formData.email);
      form.append("subject", formData.subject);
      form.append("message", formData.message);
      if (formData.file) {
        form.append("file", formData.file); 
      }
  
      const response = await addContactUsData(form); 
  
      console.log("Message sent successfully:", response);
  
      setFormData({
        fullName: "",
        email: "",
        subject: "",
        message: "",
        file: null,
      });
  
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

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
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  placeholder="Name"
                  required
                />
              </label>
              <label className="email">
                EMAIL
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Email"
                  required
                />
              </label>
            </div>
            <label className="subject">
              SUBJECT
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                placeholder="Subject"
                required
              />
            </label>
            <label className="message">
              MESSAGE
              <input
                type="text"
                name="message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Message"
                required
              />
            </label>
            <label className="file">
              ATTACH FILE / IMAGE
              <input
                type="file"
                name="file"
                onChange={(e) =>
                  setFormData({ ...formData, file: e.target.files[0] })
                }
                accept="image/*,.pdf,.doc,.docx"
              />
            </label>
            <div className="button">
              <button type="submit">Send Message</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
