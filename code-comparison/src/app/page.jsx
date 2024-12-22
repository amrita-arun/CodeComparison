"use client"
import Image from "next/image";
import UploadForm from "./components/UploadForm.jsx";
import ComparisonView from "./components/ComparisonView.jsx";
import {useState} from "react";

export default function Home() {
  const [comparisonData, setComparisonData] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100	flex flex-col">
      <div className="container mx-auto bg-gray-100 pt-5 text-center">
        <div className="pt-9 text-zinc-800 text-[50px] font-black font-['Montserrat']">Check for code you’re not supposed to use</div>
        
        {!comparisonData ? (
          <UploadForm className="container mx-auto px-8" setComparisonData={setComparisonData} />
        ) : (
          <div className="container mx-auto">
            <UploadForm setComparisonData={setComparisonData} />
            <ComparisonView userCode={comparisonData.userCode} unmatched={comparisonData.unmatchedCode.functions}/>
            
            {/*<pre>{JSON.stringify(comparisonData, null, 2)}</pre> */}
          </div>
        )}
      </div >
      <div className="mt-auto"></div>
    </div>
  );
}
