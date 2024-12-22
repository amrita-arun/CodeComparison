"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "../../components/ui/button";

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
        <div className="container mx-auto px-11">
            <div className="flex items-center justify-center mt-8">
                <div className="font-semibold font-['Montserrat']">Class PDF</div>
                <input className="font-medium font-['Montserrat'] text-sm ml-2 text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" 
                    accept="application/pdf"
                    onChange={(e) => setPdfFile(e.target.files[0])}
                />
                <div className="font-semibold font-['Montserrat'] ml-5">Your Code</div>
                <input className="font-medium font-['Montserrat'] text-sm ml-2 text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" 
                    accept=".py"
                    onChange={(e) => setCodeFile(e.target.files[0])}
                />
                <Button onClick={handleUpload} className="ml-5">Submit</Button>
            </div>
        </div>
    );
};

export default UploadForm;