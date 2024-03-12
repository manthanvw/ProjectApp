// DomainForm.jsx
import React, { useState } from 'react';

const DomainForm = () => {
  const [newDomain, setNewDomain] = useState('');

  const handleDomainSubmit = async () => {
    if (newDomain.trim() !== '') {
      try {
        const response = await fetch('http://localhost:8000/api/v1/addDomain', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: newDomain }),
        });

        if (response.ok) {
          // Successfully added domain, you may want to handle this accordingly
          console.log('Domain added successfully');
          addDomain({ name: newDomain }); // Update the UI with the new domain
          setNewDomain(''); // Clear the input
        } else {
          // Handle error, for example:
          console.error('Error adding domain:', response.statusText);
        }
      } catch (error) {
        console.error('Error adding domain:', error.message);
      }
    }
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        value={newDomain}
        onChange={(e) => setNewDomain(e.target.value)}
        className="form-control mb-2"
        placeholder="Enter new domain"
      />
      <button className="btn btn-success" onClick={handleDomainSubmit}>
        Submit Domain
      </button>
    </div>
  );
};

export default DomainForm;
