import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

const UploadImage = ({ name, label, setValue, getValues, errors }) => {
  const [preview, setPreview] = useState('');

  // Effect to set initial image preview if available
  useEffect(() => {
    const imageUrl = getValues(name);
    if (imageUrl) {
      setPreview(imageUrl);
    }
  }, [getValues, name]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      setValue(name, file); // Set the image file in the form
    }
  };

  return (
    <div className="upload-image">
      <label htmlFor={name}>{label}</label>
      <input
        type="file"
        id={name}
        accept="image/*"
        onChange={handleImageChange}
      />
      {errors[name] && <p className="error">{errors[name].message}</p>}
      {preview && (
        <div className="image-preview">
          <img src={preview} alt="Preview" style={{ width: '100%', height: 'auto' }} />
        </div>
      )}
    </div>
  );
};

export default UploadImage;
