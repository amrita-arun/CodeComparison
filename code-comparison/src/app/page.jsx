"use client"
import Image from "next/image";
import UploadForm from "./components/UploadForm.jsx";
import ComparisonView from "./components/ComparisonView.jsx";
import {useState} from "react";

export default function Home() {
  const [comparisonData, setComparisonData] = useState(null);

  return (
    <div>
      <h1>Code Comparison Tool</h1>
      {!comparisonData ? (
        <UploadForm setComparisonData={setComparisonData} />
      ) : (
        <div>
          <h2>Comparison Data:</h2>
          <pre>{JSON.stringify(comparisonData.userCode, null, 2)}</pre>

          <ComparisonView userCode={comparisonData.userCode} unmatched={comparisonData.unmatchedCode.functions}/>
          
         { /*<pre>{JSON.stringify(comparisonData, null, 2)}</pre> */}
        </div>
      )}
    </div>
  )
}
