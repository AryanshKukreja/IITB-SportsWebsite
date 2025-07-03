import React, { useState} from 'react';
import emailjs from 'emailjs-com';
import './form.css'; 
const ContactMe = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const isGmail = (email) => {
        return email.endsWith('@gmail.com');
    };

    const submitForm = (e) => {
        e.preventDefault();
        const { name, email, message } = formData;

        if (!name) {
            alert("Please enter your name.");
            return;
        }

        if (!message) {
            alert("Please enter a message.");
            return;
        }

        if (!isGmail(email)) {
            alert("Please enter a valid Gmail address.");
            return;
        }

        // Initialize Email.js with your user ID
        emailjs.init("FqoF0sUuLlnJgcAAM");

        const params = {
            from: name,
            email: email,
            message: message,
        };

        const serviceID = "service_vp6zhr7";
        const templateID = "template_629a8kh";

        emailjs.send(serviceID, templateID, params)
            .then((res) => {
                alert("Email Sent Successfully");
                setFormData({ name: '', email: '', message: '' });
            })
            .catch((error) => {
                alert("Error sending email: " + error);
            });
    };

    return (
        <section id="ContactMe">
            <div className="contact-section">
                <h2><span className='white-text'>Need help?</span><span className='green-text'> Pitch us!</span></h2>
                <form id="contactForm" onSubmit={submitForm}>
                    <label htmlFor="name">Your Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="email">Your Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="message">Message:</label>
                    <textarea
                        id="message"
                        name="message"
                        rows="4"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    ></textarea>

                    <button type="submit">Send Message</button>
                </form>
            </div>
        </section>
    );
};

export default ContactMe;