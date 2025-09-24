import React from 'react';
import { useState } from 'react';
import './Feedback.css'

export const Feedback = ({ onSubmit }) => {
        const [name, setName] = useState('');
        const [rollNumber, setRollNumber] = useState('');
        const [person1, setPerson1] = useState('');
        const [person2, setPerson2] = useState('');
        const [ldap, setLdap] = useState('');
        const [description, setDescription] = useState('');
        const [image, setImage] = useState(null);
        
        const feedbackData = {
          name,
          rollNumber,
          person1,
          person2,
          ldap,
          description,
          image
        };
        const handleSubmit = (event) => {
          event.preventDefault();
            if (!name) {
            alert("Please enter your name.");
            return;
          }
            else if (!rollNumber) {
            alert("Please enter your roll number.");
            return;
          }
            else if (!ldap) {
            alert("Please enter your LDAP.");
            return;
          }
            else if (!description) {
            alert("Please enter a description.");
            return;
          }
            else if (!person1) {
            alert("Please select Person 1.");
            return;
          }
            else if(image === null){
            alert("Please upload an image.");
            return;
          }
          onSubmit(feedbackData);
        };
      return (
        <>
        <div>
            <h1 className='football-turf-heading'>Feedback Form</h1>
        </div>
        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="rollNumber">Roll Number:</label>
            <input
              type="text"
              id="rollNumber"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value.trim().toLowerCase())}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="ldap">LDAP:</label>
            <input
              type="text"
              id="ldap"
              value={ldap}
              onChange={(e) => setLdap(e.target.value.trim().toLowerCase())}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              className='Feedback-description-box'
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value.trim().toLowerCase())}
              required
            />
          </div>
      
          <div className="form-group">
            <label htmlFor="Feedback-person-1">Person 1</label>
            <select
              id="Feedback-person-1"
              value={person1}
              onChange={(e) => setPerson1(e.target.value)}
              required
            >
              <option value="">Tag Person 1 (mandatory)</option>
              <option value="Akshat Karkar">Akshat Karkar - Institute Board Games Secretary</option>
              <option value="Deepraj">Deepraj - Institute Basketball Secretary</option>
              <option value="Ghanshyam Choudhary">Ghanshyam Choudhary - Institute Volleyball Secretary</option>
              <option value="J Sai Charan">J Sai Charan - Institute Badminton Secretary</option>
              <option value="Kanak Tembhare">Kanak Tembhare - Institute Indian Games Secretary</option>
              <option value="Khushal">Khushal - Institute Hockey Secretary</option>
              <option value="Manthan Goyal">Manthan Goyal - Institute Squash Secretary</option>
              <option value="Meet Vanja">Meet Vanja - Institute Aquatics Secretary</option>
              <option value="Nehal Gupta">Nehal Gupta - Institute Lawn Tennis Secretary</option>
              <option value="Pradyumna Gugulothu">Pradyumna Gugulothu - Institute Cricket Secretary</option>
              <option value="Praveen Kumar">Praveen Kumar - Institute Athletics Secretary</option>
              <option value="Prateek Behera">Prateek Behera - Institute Weightlifting Secretary</option>
              <option value="Sameer Chopra">Sameer Chopra - Institute Table Tennis Secretary</option>
              <option value="Yash Shah">Yash Shah - Institute Football Secretary</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="Feedback-person-2">Person 2</label>
            <select
              id="Feedback-person-2"
              value={person2}
              onChange={(e) => setPerson2(e.target.value)}
              required
            >
              <option value="">Tag Person 2 (optional)</option>
              <option value="Akshat Karkar">Akshat Karkar - Institute Board Games Secretary</option>
              <option value="Deepraj">Deepraj - Institute Basketball Secretary</option>
              <option value="Ghanshyam Choudhary">Ghanshyam Choudhary - Institute Volleyball Secretary</option>
              <option value="J Sai Charan">J Sai Charan - Institute Badminton Secretary</option>
              <option value="Kanak Tembhare">Kanak Tembhare - Institute Indian Games Secretary</option>
              <option value="Khushal">Khushal - Institute Hockey Secretary</option>
              <option value="Manthan Goyal">Manthan Goyal - Institute Squash Secretary</option>
              <option value="Meet Vanja">Meet Vanja - Institute Aquatics Secretary</option>
              <option value="Nehal Gupta">Nehal Gupta - Institute Lawn Tennis Secretary</option>
              <option value="Pradyumna Gugulothu">Pradyumna Gugulothu - Institute Cricket Secretary</option>
              <option value="Praveen Kumar">Praveen Kumar - Institute Athletics Secretary</option>
              <option value="Prateek Behera">Prateek Behera - Institute Weightlifting Secretary</option>
              <option value="Sameer Chopra">Sameer Chopra - Institute Table Tennis Secretary</option>
              <option value="Yash Shah">Yash Shah - Institute Football Secretary</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="image">Upload Image:</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <button type="submit" className="submit-btn">Submit</button>
        </form>
        </>
      );
}

export default Feedback;