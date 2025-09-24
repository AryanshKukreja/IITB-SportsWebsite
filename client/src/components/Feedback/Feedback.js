import React, { useState, useEffect } from 'react';
import './Feedback.css';

// Configure API base URL using environment variable
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';

export const Feedback = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [person1, setPerson1] = useState('');
  const [person2, setPerson2] = useState('');
  const [ldapId, setLdapId] = useState('');
  const [problemDescription, setProblemDescription] = useState('');
  const [image, setImage] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Maximum file size (5MB)
  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

  // Fetch contacts from backend
  useEffect(() => {
    let isMounted = true;

    const fetchContacts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/feedback/contacts`);
        if (response.ok) {
          const data = await response.json();
          if (isMounted) {
            setContacts(data.contacts || []);
          }
        } else {
          console.error('Failed to fetch contacts:', response.status);
          if (isMounted) {
            setErrors(prev => ({ ...prev, contacts: 'Failed to load contacts' }));
          }
        }
      } catch (error) {
        console.error('Error fetching contacts:', error);
        if (isMounted) {
          setErrors(prev => ({ ...prev, contacts: 'Network error while loading contacts' }));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchContacts();

    return () => {
      isMounted = false;
    };
  }, []);

  // Simplified form validation - removed most restrictions
  const validateForm = () => {
    const newErrors = {};

    // Basic required field checks only
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!rollNumber.trim()) {
      newErrors.rollNumber = 'Roll number is required';
    }

    if (!ldapId.trim()) {
      newErrors.ldapId = 'LDAP ID is required';
    }

    if (!problemDescription.trim()) {
      newErrors.problemDescription = 'Problem description is required';
    }

    if (!person1) {
      newErrors.person1 = 'Please select at least one person to tag';
    }

    // Image validation - kept file size and type checks for security
    if (!image) {
      newErrors.image = 'Please upload an image';
    } else {
      if (image.size > MAX_FILE_SIZE) {
        newErrors.image = 'Image size must be less than 5MB';
      }
      if (!ALLOWED_FILE_TYPES.includes(image.type)) {
        newErrors.image = 'Please upload a valid image file (JPEG, PNG, GIF, WebP)';
      }
    }

    return newErrors;
  };

  // Handle file selection with validation
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setErrors(prev => ({ ...prev, image: '' }));
      
      if (file.size > MAX_FILE_SIZE) {
        setErrors(prev => ({ ...prev, image: 'Image size must be less than 5MB' }));
        e.target.value = '';
        return;
      }
      
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        setErrors(prev => ({ ...prev, image: 'Please upload a valid image file (JPEG, PNG, GIF, WebP)' }));
        e.target.value = '';
        return;
      }
      
      setImage(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    setErrors({});
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      const firstErrorField = Object.keys(formErrors)[0];
      const errorElement = document.getElementById(firstErrorField === 'person1' ? 'Feedback-person-1' : firstErrorField);
      if (errorElement) {
        errorElement.focus();
      }
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('name', name.trim());
      formData.append('rollNumber', rollNumber.trim());
      formData.append('ldapId', ldapId.trim());
      formData.append('problemDescription', problemDescription.trim());
      
      const taggedPersons = [person1];
      if (person2) {
        taggedPersons.push(person2);
      }
      formData.append('taggedPersons', JSON.stringify(taggedPersons));
      
      if (image) {
        formData.append('image', image);
      }

      const response = await fetch(`${API_BASE_URL}/api/feedback/submit`, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        alert('Feedback submitted successfully!');
        
        // Reset form
        setName('');
        setRollNumber('');
        setLdapId('');
        setProblemDescription('');
        setPerson1('');
        setPerson2('');
        setImage(null);
        setErrors({});
        
        const fileInput = document.getElementById('image');
        if (fileInput) fileInput.value = '';
        
        if (onSubmit) {
          onSubmit(result);
        }
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.error || 'Failed to submit feedback';
        
        if (errorData.field) {
          setErrors({ [errorData.field]: errorMessage });
        } else {
          alert(`Error: ${errorMessage}`);
        }
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div>Loading contacts...</div>
        {errors.contacts && (
          <div className="error-message">{errors.contacts}</div>
        )}
      </div>
    );
  }

  return (
    <>
      <div>
        <h1 className='football-turf-heading'>Feedback Form</h1>
      </div>
      <form className="booking-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name: <span className="required">*</span></label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={errors.name ? 'error' : ''}
            placeholder="Enter your full name"
            disabled={submitting}
            required
          />
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="rollNumber">Roll Number: <span className="required">*</span></label>
          <input
            type="text"
            id="rollNumber"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            className={errors.rollNumber ? 'error' : ''}
            placeholder="Enter your roll number"
            disabled={submitting}
            required
          />
          {errors.rollNumber && <div className="error-message">{errors.rollNumber}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="ldapId">LDAP ID: <span className="required">*</span></label>
          <input
            type="text"
            id="ldapId"
            value={ldapId}
            onChange={(e) => setLdapId(e.target.value)}
            className={errors.ldapId ? 'error' : ''}
            placeholder="Enter your LDAP ID"
            disabled={submitting}
            required
          />
          {errors.ldapId && <div className="error-message">{errors.ldapId}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="problemDescription">Problem Description: <span className="required">*</span></label>
          <textarea
            className={`Feedback-description-box ${errors.problemDescription ? 'error' : ''}`}
            id="problemDescription"
            value={problemDescription}
            onChange={(e) => setProblemDescription(e.target.value)}
            placeholder="Describe your problem in detail"
            rows="4"
            disabled={submitting}
            required
          />
          {errors.problemDescription && <div className="error-message">{errors.problemDescription}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="Feedback-person-1">Person 1: <span className="required">*</span></label>
          <select
            id="Feedback-person-1"
            value={person1}
            onChange={(e) => setPerson1(e.target.value)}
            className={errors.person1 ? 'error' : ''}
            disabled={submitting}
            required
          >
            <option value="">Tag Person 1 (mandatory)</option>
            {contacts.map((contact) => (
              <option key={contact.ldapId} value={contact.ldapId}>
                {contact.entityName}
              </option>
            ))}
          </select>
          {errors.person1 && <div className="error-message">{errors.person1}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="Feedback-person-2">Person 2 (Optional):</label>
          <select
            id="Feedback-person-2"
            value={person2}
            onChange={(e) => setPerson2(e.target.value)}
            disabled={submitting}
          >
            <option value="">Tag Person 2 (optional)</option>
            {contacts.map((contact) => (
              <option key={contact.ldapId} value={contact.ldapId}>
                {contact.entityName}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="image">Upload Image: <span className="required">*</span></label>
          <input
            type="file"
            id="image"
            accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
            onChange={handleImageChange}
            className={errors.image ? 'error' : ''}
            disabled={submitting}
            required
          />
          <small className="help-text">
            Maximum file size: 5MB. Supported formats: JPEG, PNG, GIF, WebP
          </small>
          {errors.image && <div className="error-message">{errors.image}</div>}
        </div>

        <button 
          type="submit" 
          className="submit-btn"
          disabled={submitting || contacts.length === 0}
        >
          {submitting ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>
    </>
  );
};

export default Feedback;
