import React, { useState } from 'react';

const SubmitForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = () => {
    const newErrors = {};

    const namePattern = /^[A-Za-z\s]+$/; // Regular expression for alphabetic characters and spaces

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (!namePattern.test(formData.name)) {
      newErrors.name = 'Name should contain only letters and spaces';
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else {
      const phonePattern = /^\d+$/; // Regular expression for numbers only
      if (!phonePattern.test(formData.phone)) {
        newErrors.phone = 'Phone must contain only numbers';
      } else if (formData.phone.trim().length < 11) {
        newErrors.phone = 'Phone must be at least 11 digits long';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setFormData({
        name: '',
        email: '',
        phone: '',
      });
  
      setSuccessMessage('Form submitted successfully!');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>

          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
        </div>

        <div>
          <label htmlFor="phone">Phone:</label>

          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <span style={{ color: 'red' }}>{errors.phone}</span>}
        </div>
        
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
    </div>
  );
};

export default SubmitForm;
