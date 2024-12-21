from fastapi import FastAPI, File, UploadFile
from parser import extract_code_snippets
from parser import get_unmatched_code

app = FastAPI()

@app.get("/parse-files")
async def parse_files(pdf: UploadFile = File(...), code: UploadFile = File(...)):
    pdf_path = f"/tmp/{pdf.filename}"
    code_path = f"/tmp/{code.filename}"

    with open(pdf_path, "wb") as f:
        f.write(await pdf.read())
    with open(code_path, "wb") as f:
        f.write(await code.read())

    pdf_snippets = extract_code_snippets(pdf_path)
    unmatched_code = get_unmatched_code(pdf_snippets, code_path)

    return {
        "pdfSnippets": pdf_snippets,
        "unmatchedCode": unmatched_code
    }

