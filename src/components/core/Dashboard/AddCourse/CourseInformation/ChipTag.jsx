import React, { useState, useEffect } from 'react';

const ChipTag = ({ name, label, register, setValue, errors, placeholder, getValues }) => {
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(false); // Local error state to control the error message display

  // Use effect to initialize tags from getValues on mount
  useEffect(() => {
    const initialTags = getValues(name) || [];
    setTags(initialTags);
  }, [getValues, name]);

  // Watch for form submit to show the error message
  useEffect(() => {
    if (errors[name] && tags.length === 0) {
      setError(true);
    } else {
      setError(false);
    }
  }, [errors, tags.length, name]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.value.trim() !== '') {
      e.preventDefault();
      const newTag = e.target.value.trim();
      if (!tags.includes(newTag)) {
        const updatedTags = [...tags, newTag];
        setTags(updatedTags);
        setValue(name, updatedTags); // Update the form field value
      }
      e.target.value = ''; // Clear the input field
    }
  };

  const handleDelete = (tagToDelete) => {
    const updatedTags = tags.filter((tag) => tag !== tagToDelete);
    setTags(updatedTags);
    setValue(name, updatedTags); // Update the form field value
  };

  return (
    <div>
      <label className="block text-gray-300">{label}</label>
      <div className="flex flex-wrap items-center gap-2">
        {tags.map((tag, index) => (
          <div key={index} className="bg-gray-700 text-white px-2 py-1 rounded-md flex items-center gap-1">
            {tag}
            <button type="button" onClick={() => handleDelete(tag)}>
              &times;
            </button>
          </div>
        ))}
        <input
          type="text"
          className="bg-gray-800 text-white px-2 py-1 rounded-md"
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
        />
      </div>
      {/* Show error message only when the form is submitted and no tags are present */}
      {error && <p className="text-red-500">At least one tag is required</p>}
    </div>
  );
};

export default ChipTag;