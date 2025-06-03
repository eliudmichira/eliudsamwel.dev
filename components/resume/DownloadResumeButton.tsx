import React, { useState } from 'react';

interface DownloadResumeButtonProps {
  pdfUrl?: string;
  className?: string;
}

export const DownloadResumeButton: React.FC<DownloadResumeButtonProps> = ({ 
  pdfUrl = '/Eliud%20Michira%20Samwel%20Resume.pdf',
  className = ''
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsLoading(true);
      
      // In a real implementation, you might want to track the download
      // or perform other actions before initiating the download
      
      // Create a temporary link to trigger download
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.setAttribute('download', 'Eliud Michira Samwel Resume.pdf');
      link.setAttribute('target', '_blank');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Download failed:', error);
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isLoading}
      className={`flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-600 text-white dark:text-black font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed border border-amber-500 shadow-md ${className}`}
      aria-label="Download Resume as PDF"
    >
      {isLoading ? (
        <>
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Downloading...
        </>
      ) : (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Download Resume (PDF)
        </>
      )}
    </button>
  );
}; 