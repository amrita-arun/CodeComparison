import { IncomingForm } from "formidable";
import fs from "fs/promises";
import axios from "axios";
import FormData from "form-data";
import { NextResponse } from "next/server";
import { Readable } from "stream";

export const config = {
  api: {
    bodyParser: false, // Disable Next.js's built-in body parser
  },
};

// Helper to create a Node.js Readable stream with headers
function toNodeRequest(webRequest) {
  const headers = {};
  for (const [key, value] of webRequest.headers) {
    headers[key] = value;
  }
  const readable = Readable.from(webRequest.body);
  return Object.assign(readable, { headers });
}

export async function POST(req) {
  // Convert the Web Streams API request to a Node.js-style request
  const nodeReq = toNodeRequest(req);

  return new Promise((resolve) => {
    const form = new IncomingForm();

    form.parse(nodeReq, async (err, fields, files) => {
      if (err) {
        console.error("Error parsing the files:", err);
        resolve(
          NextResponse.json({ error: "File parsing failed" }, { status: 500 })
        );
        return;
      }

      try {
        // Read the uploaded files
        const pdfFile = await fs.readFile(files.pdf[0].filepath);
        const codeFile = await fs.readFile(files.code[0].filepath);

        // Create FormData for FastAPI
        const formData = new FormData();
        formData.append("pdf", pdfFile, files.pdf[0].originalFilename);
        formData.append("code", codeFile, files.code[0].originalFilename);

        // Send the files to FastAPI
        const backendResponse = await axios.post(
          "http://0.0.0.0:8080",
          //"http://127.0.0.1:8000/parse-files",
          formData,
          {
            headers: formData.getHeaders(),
          }
        );

        // Return the response from FastAPI to the frontend
        resolve(NextResponse.json(backendResponse.data, { status: 200 }));
      } catch (error) {
        console.error("Error uploading files to backend:", error);
        resolve(
          NextResponse.json(
            { error: "Failed to process files with backend" },
            { status: 500 }
          )
        );
      }
    });
  });
}
