"use client";

import { useState } from "react";
import axios from "axios";

const UploadForm = ({ setComparisonData }) => {
    const [pdfFile, setPdfFile] = useState(null);
    const [codeFile, setCodeFile] = useState(null);
    
    const handleUpload = async () => {
        if (pdfFile == null || codeFile == null) {
            alert("Please upload both files.")
            return;
        }

        const formData = new FormData();
        formData.append("pdf", pdfFile);
        formData.append("code", codeFile);

        try {
            const response = await axios.post("./api/upload", formData)
            setComparisonData(response.data);
        } catch ( error ) {
            console.error("Error uploading file: ", error)
        }
    };

    return (
        <div>
            <h2>Upload Files</h2>
            <div>
            <label>
                Upload PDF:
                <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setPdfFile(e.target.files[0])}
                />
            </label>
            </div>
            <div>
            <label>
                Upload Code:
                <input
                    type="file"
                    accept=".py"
                    onChange={(e) => setCodeFile(e.target.files[0])}
                />
            </label>
            </div>
            <button onClick={handleUpload}>Submit</button>
        </div>
    );
};

export default UploadForm;