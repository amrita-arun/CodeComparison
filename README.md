# Code Comparison Tool

A web application for students to easily identify unauthorized python code usage by highlighting methods or functions in their code that do not align with provided class materials.

## Features

PDF Parsing: Analyze and extract class materials using FastAPI and PyMuPDF.

Code Parsing: Parse and compare your python code to detect any unauthorized methods or functions.

Syntax Highlighting: Clearly highlight unmatched code for easy visual understanding.

Seamless Deployment: Frontend hosted on Vercel and backend on Railway for optimal performance.

## Demo
Visit the live application: [Code Comparison Tool](https://code-comparison.vercel.app/)

## Technology Stack
**Frontend:** React, Next.js, TailwindCSS
**Backend:** Python, FastAPI
**Parsing Libraries:** PyMuPDF, Formidable
**Deployment:** Vercel (Frontend), Railway (Backend)
**Additional Tools:** Axios for API communication

## How It Works
1. **Upload Files:** Upload your class PDF (e.g., lecture slides, homework guidelines) and your code file.
2. **Analysis:** The backend compares your code with class materials to detect any unmatched methods or functions.
3. **Visualization:** The frontend highlights the unmatched code so you can review and make necessary corrections.

## Future Enhancements
Add support for multiple files at once, and allow for users to create an account and store their previously uploaded PDFs to compare code with all PDFs simultaneously.
Add support for additional languages.
Implement a scoring system to quantify code similarity.
