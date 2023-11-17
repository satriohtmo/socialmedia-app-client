import React, { useState } from "react";

const FileUploader = ({ fieldChange }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    fieldChange(file); // Pass the selected file to the parent component
    setSelectedImage(URL.createObjectURL(file)); // Display the selected image
  };

  return (
    <div className="flex flex-col items-center justify-center bg-dark-3 rounded-xl cursor-pointer">
      <input
        type="file"
        id="fileInput" // Ensure the input field has an ID associated with the label
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />

      <div className="file_uploader-box">
        {selectedImage ? (
          <img src={selectedImage} width={200} height={150} alt="selected" />
        ) : (
          <>
            <img src="/assets/file-upload.svg" width={100} height={77} alt="file upload" />

            <h3 className="base-medium text-light-2 mb-2 mt-6">Drag photo here</h3>
            <p className="text-light-4 small-regular mb-6">SVG, PNG, JPG</p>
          </>
        )}

        <label htmlFor="fileInput" className="shad-button_dark_4 text-center py-3 cursor-pointer">
          Select from computer
        </label>
      </div>
    </div>
  );
};

export default FileUploader;
