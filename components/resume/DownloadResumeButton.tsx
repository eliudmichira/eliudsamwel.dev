import React, { useState } from 'react';

interface DownloadResumeButtonProps {
  className?: string;
}

export const DownloadResumeButton: React.FC<DownloadResumeButtonProps> = ({ 
  className = ''
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDownload = async (format: 'pdf' | 'docx') => {
    try {
      setIsLoading(true);
      setShowDropdown(false);
      
      const fileName = 'Eliud Michira Samwel Resume';
      const fileUrl = format === 'pdf' 
        ? '/Eliud Michira Samwel Resume.pdf'
        : '/Eliud Michira Samwel Resume.docx';
      
      // Create a temporary link to trigger download
      const link = document.createElement('a');
      link.href = fileUrl;
      link.setAttribute('download', `${fileName}.${format}`);
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
    <div className={`relative ${className}`}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        disabled={isLoading}
        className="lifted-primary pill flex items-center gap-2 px-6 py-3 text-xs sm:text-sm uppercase tracking-widest font-black disabled:opacity-70 disabled:cursor-not-allowed w-full sm:w-auto justify-center"
        aria-label="Download Resume"
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
            Download Resume
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </>
        )}
      </button>

      {/* Dropdown Menu */}
      {showDropdown && !isLoading && (
        <div className="card-embossed absolute top-full left-0 right-0 mt-2 z-50 overflow-hidden">
          <button
            onClick={() => handleDownload('pdf')}
            className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-t-lg flex items-center gap-3 transition-colors"
          >
            <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
            </svg>
            <div>
              <div className="font-medium text-gray-900 dark:text-white">PDF Format</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Best for viewing and printing</div>
            </div>
          </button>
          
          <button
            onClick={() => handleDownload('docx')}
            className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-b-lg flex items-center gap-3 transition-colors"
          >
            <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
            </svg>
            <div>
              <div className="font-medium text-gray-900 dark:text-white">DOCX Format</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Editable in Microsoft Word</div>
            </div>
          </button>
        </div>
      )}

      {/* Backdrop to close dropdown */}
      {showDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
};
