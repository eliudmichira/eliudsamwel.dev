import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { resumeData } from '../../data/resumeContent';
import { ResumeSection } from './ResumeSection';
import { ResumeSkillBadge } from './ResumeSkillBadge';
import { ResumeContactLink } from './ResumeContactLink';
import { ResumeExperienceItem } from './ResumeExperienceItem';
import { ResumeEducationItem } from './ResumeEducationItem';
import { ResumeReferenceItem } from './ResumeReferenceItem';
import { ResumeSkillBar } from './ResumeSkillBar';
import { SkillsRadarChart } from './SkillsRadarChart';
import { DownloadResumeButton } from './DownloadResumeButton';

interface ResumeTabProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const ResumeTabs: React.FC<ResumeTabProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📋' },
    { id: 'skills', label: 'Skills', icon: '🧠' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'education', label: 'Education', icon: '🎓' }
  ];
  
  return (
    <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mb-6 sm:mb-8 border-b border-[var(--card-border)] pb-2">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`px-3 sm:px-5 py-2 sm:py-3 rounded-t-lg font-medium transition-all duration-300 flex items-center gap-1 sm:gap-2 text-sm sm:text-base min-h-[44px] min-w-[44px] ${
            activeTab === tab.id 
              ? 'bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-600 text-white dark:!text-white shadow-lg' 
              : 'bg-[var(--secondary-bg)] text-[var(--secondary-text)] hover:bg-opacity-70 hover:text-[var(--primary-text)]'
          }`}
          onClick={() => setActiveTab(tab.id)}
          aria-current={activeTab === tab.id ? 'page' : undefined}
        >
          <span className="hidden sm:inline" aria-hidden="true">{tab.icon}</span>
          <span className="truncate">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export const ResumePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  const { 
    fullName, accentName, jobTitle, location, contactInfo,
    professionalSummary, coreCompetencies, experience,
    education, professionalDevelopment, references 
  } = resumeData;
  
  // Create a dataset for the radar chart
  const radarChartSkills = coreCompetencies.skills
    .filter(skill => skill.level)
    .sort((a, b) => (b.level || 0) - (a.level || 0))
    .slice(0, 8); // Limit to 8 skills for the chart

  // Staggered animation for children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      className="max-w-5xl mx-auto px-3 sm:px-4 py-6 sm:py-8 mt-20 sm:mt-24 w-full"
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Accessible Skip Link */}
      <a href="#resume-content" className="sr-only focus:not-sr-only focus:absolute focus:p-3 focus:bg-amber-500 focus:text-black focus:z-50">
        Skip to resume content
      </a>
      
      {/* Resume Header Section */}
      <motion.div className="text-center mb-8 sm:mb-12" variants={itemVariants}>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 sm:mb-4 leading-tight break-words overflow-wrap-anywhere hyphens-auto whitespace-normal">
          {fullName}{' '}
          <span className="bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-600 bg-clip-text text-transparent">
            {accentName}
          </span>
        </h1>
        <p className="text-sm sm:text-base md:text-xl text-[var(--secondary-text)] mb-4 sm:mb-6 max-w-2xl mx-auto px-2 break-words overflow-wrap-anywhere hyphens-auto whitespace-normal">{jobTitle}</p>
        
        <div className="flex items-center justify-center gap-2 text-[var(--secondary-text)] mb-4 sm:mb-6">
          <location.icon className="w-4 h-4 sm:w-5 sm:h-5 fill-current text-yellow-500" aria-hidden="true" />
          <span className="text-sm sm:text-base">{location.text}</span>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-x-4 sm:gap-x-6 gap-y-2 sm:gap-y-3 flex-wrap mb-6 sm:mb-8 px-2">
          {contactInfo.map((item, index) => (
            <ResumeContactLink key={index} {...item} />
          ))}
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 px-2">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto"
          >
          <DownloadResumeButton className="w-full sm:w-auto" />
          </motion.div>
          
          <motion.a
            href="#blog"
            onClick={() => {
              window.location.hash = '#blog';
              // Store the blog post ID in localStorage to open it when the blog page loads
              localStorage.setItem('openBlogPost', 'ats-resume-guide');
            }}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[var(--secondary-bg)] text-[var(--primary-text)] border border-[var(--card-border)] font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-md w-full sm:w-auto min-h-[44px]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="View ATS Resume Guide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-[var(--primary-amber)]" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
            <span className="text-sm sm:text-base">ATS Resume Guide</span>
          </motion.a>
        </div>
      </motion.div>
      
      {/* Tabs Navigation */}
      <motion.div variants={itemVariants}>
      <ResumeTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </motion.div>
      
      {/* Tab Content */}
      <div id="resume-content" className="transition-all duration-500 ease-in-out">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <ResumeSection title="Professional Summary">
              <p className="text-[var(--primary-text)] leading-relaxed">{professionalSummary}</p>
            </ResumeSection>

            <ResumeSection title="Core Competencies">
              <div className="flex flex-wrap gap-2 mb-6">
                {coreCompetencies.skills
                  .sort((a, b) => (b.level || 0) - (a.level || 0))
                  .slice(0, 12)
                  .map((skill, index) => (
                  <ResumeSkillBadge key={index} name={skill.name} level={skill.level} />
                ))}
                {coreCompetencies.skills.length > 12 && (
                  <button 
                    onClick={() => setActiveTab('skills')} 
                    className="px-3 py-1 rounded-full bg-[var(--secondary-bg)]/60 text-[var(--secondary-text)] text-sm hover:bg-[var(--primary-amber)]/20 hover:text-[var(--primary-amber)] transition-colors"
                    aria-label="View all skills"
                  >
                    +{coreCompetencies.skills.length - 12} more...
                  </button>
                )}
              </div>
              <div className="bg-[var(--card-bg)] rounded-lg border border-[var(--card-border)] p-4 mb-6">
                <h3 className="text-lg font-semibold mb-4 text-[var(--primary-text)]">Skill Categories</h3>
                <ul className="list-disc list-inside space-y-3 text-[var(--primary-text)]">
                {coreCompetencies.detailed.map((competency, index) => (
                    <li key={index} className="pl-2">
                      <strong className="font-semibold text-[var(--primary-amber)]">{competency.category}:</strong>{' '}
                      <span className="text-[var(--secondary-text)]">{competency.items}</span>
                  </li>
                ))}
              </ul>
              </div>
            </ResumeSection>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              <ResumeSection title="Recent Experience" defaultExpanded={true}>
                <div className="space-y-6">
                  {experience.slice(0, 2).map((item, index) => (
                    <ResumeExperienceItem key={index} {...item} />
                  ))}
                  {experience.length > 2 && (
                    <div className="text-center pt-2">
                      <button 
                        onClick={() => setActiveTab('experience')} 
                        className="text-[var(--accent-color)] hover:underline flex items-center justify-center gap-2 w-full py-2 rounded-lg hover:bg-[var(--secondary-bg)]/50 transition-colors"
                        aria-label="View all experience entries"
                      >
                        View all experience <span aria-hidden="true">→</span>
                      </button>
                    </div>
                  )}
                </div>
              </ResumeSection>

              <ResumeSection title="Education" defaultExpanded={true}>
                <div className="space-y-4">
                  {education.map((item, index) => (
                    <ResumeEducationItem key={index} {...item} />
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t border-[var(--card-border)]">
                  <h3 className="text-lg font-semibold mb-3 text-[var(--primary-text)]">Professional Development</h3>
                  <ul className="space-y-2">
                    {professionalDevelopment.slice(0, 3).map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span aria-hidden="true" className="text-[var(--primary-amber)] mt-1">•</span>
                        <div>
                          <span className="font-medium text-[var(--primary-text)]">{item.item}</span>
                          {item.source && <span className="text-[var(--secondary-text)]"> – {item.source}</span>}
                          {item.date && <span className="text-[var(--secondary-text)] text-sm"> ({item.date})</span>}
                        </div>
                      </li>
                    ))}
                    {professionalDevelopment.length > 3 && (
                      <li>
                        <button 
                          onClick={() => setActiveTab('skills')} 
                          className="text-[var(--accent-color)] hover:underline text-sm"
                          aria-label="View all professional development entries"
                        >
                          View more certifications...
                        </button>
                      </li>
                    )}
                  </ul>
                </div>
              </ResumeSection>
            </div>
          </motion.div>
        )}
        
        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <div className="lg:col-span-2">
            <ResumeSection title="Technical Skills">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    {coreCompetencies.skills
                      .sort((a, b) => (b.level || 0) - (a.level || 0))
                      .map((skill, index) => (
                  <ResumeSkillBar 
                    key={index} 
                    name={skill.name} 
                    level={skill.level || 50} 
                  />
                ))}
              </div>
            </ResumeSection>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-[var(--card-bg)] rounded-lg border border-[var(--card-border)] p-6 sticky top-4">
                  <h2 className="text-xl font-bold mb-6 text-center text-[var(--primary-text)]">Skills Visualization</h2>
                  <SkillsRadarChart skills={radarChartSkills} />
                  <p className="text-xs text-center text-[var(--secondary-text)] mt-4">
                    Top 8 skills by proficiency level
                  </p>
                </div>
              </div>
            </div>
            
            <ResumeSection title="Skill Categories">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {coreCompetencies.detailed.map((competency, index) => (
                  <motion.div 
                    key={index} 
                    className="bg-[var(--card-bg)] rounded-lg border border-[var(--card-border)] p-4 hover:border-[var(--primary-amber)]/50 transition-all duration-300"
                    whileHover={{ y: -5 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { delay: index * 0.1 }
                    }}
                  >
                    <h3 className="text-lg font-semibold text-[var(--primary-amber)] mb-2">{competency.category}</h3>
                    <p className="text-[var(--secondary-text)]">{competency.items}</p>
                  </motion.div>
                ))}
              </div>
            </ResumeSection>
            
            <ResumeSection title="Professional Development">
              <div className="bg-[var(--card-bg)] rounded-lg border border-[var(--card-border)] p-6">
                <ul className="space-y-4">
                {professionalDevelopment.map((item, index) => (
                    <motion.li 
                      key={index}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[var(--card-border)] last:border-0 last:pb-0"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ 
                        opacity: 1, 
                        x: 0,
                        transition: { delay: index * 0.1 }
                      }}
                    >
                      <div>
                    <span className="font-semibold text-[var(--primary-text)]">{item.item}</span>
                    {item.source && <span className="text-[var(--secondary-text)]"> – {item.source}</span>}
                      </div>
                      {item.date && (
                        <span className="text-[var(--primary-amber)] text-sm font-medium bg-[var(--primary-amber)]/10 px-3 py-1 rounded-full self-start">
                          {item.date}
                        </span>
                      )}
                    </motion.li>
                ))}
              </ul>
              </div>
            </ResumeSection>
          </motion.div>
        )}
        
        {/* Experience Tab */}
        {activeTab === 'experience' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
          <ResumeSection title="Professional Experience">
            <div className="space-y-8">
              {experience.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { delay: index * 0.1 }
                    }}
                  >
                    <ResumeExperienceItem {...item} />
                  </motion.div>
              ))}
            </div>
          </ResumeSection>
          </motion.div>
        )}
        
        {/* Education Tab */}
        {activeTab === 'education' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <ResumeSection title="Academic Background">
              <div className="space-y-6">
                {education.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ 
                          opacity: 1, 
                          y: 0,
                          transition: { delay: index * 0.1 }
                        }}
                        className="bg-[var(--card-bg)] rounded-lg border border-[var(--card-border)] p-6"
                      >
                        <ResumeEducationItem {...item} />
                      </motion.div>
                ))}
              </div>
            </ResumeSection>
              </div>
              
              <div className="lg:col-span-1">
                <ResumeSection title="Professional Development">
                  <div className="bg-[var(--card-bg)] rounded-lg border border-[var(--card-border)] p-6">
                    <ul className="space-y-4">
                      {professionalDevelopment.map((item, index) => (
                        <motion.li 
                          key={index}
                          className="pb-3 border-b border-[var(--card-border)] last:border-0 last:pb-0"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ 
                            opacity: 1, 
                            x: 0,
                            transition: { delay: index * 0.1 }
                          }}
                        >
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-semibold text-[var(--primary-text)]">{item.item}</span>
                            {item.date && (
                              <span className="text-[var(--primary-amber)] text-sm whitespace-nowrap ml-2">
                                {item.date}
                              </span>
                            )}
                          </div>
                          {item.source && (
                            <span className="text-[var(--secondary-text)] text-sm block">
                              {item.source}
                            </span>
                          )}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-xl font-bold mb-4 text-[var(--primary-text)]">Skills & Interests</h3>
                    <div className="bg-[var(--card-bg)] rounded-lg border border-[var(--card-border)] p-6">
                      <h4 className="text-lg font-semibold mb-3 text-[var(--primary-text)]">Languages</h4>
                      <div className="mb-6">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-[var(--primary-text)]">English</span>
                          <span className="text-xs text-[var(--secondary-text)]">Professional Proficiency</span>
                        </div>
                        <div className="w-full bg-[var(--secondary-bg)] rounded-full h-2.5">
                          <div className="h-2.5 rounded-full bg-[var(--accent-gradient)]" style={{ width: '95%' }}></div>
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-[var(--primary-text)]">Swahili</span>
                          <span className="text-xs text-[var(--secondary-text)]">Native</span>
                        </div>
                        <div className="w-full bg-[var(--secondary-bg)] rounded-full h-2.5">
                          <div className="h-2.5 rounded-full bg-[var(--accent-gradient)]" style={{ width: '100%' }}></div>
                        </div>
                      </div>
                      
                      <h4 className="text-lg font-semibold mb-3 text-[var(--primary-text)] mt-6">Interests</h4>
                      <div className="flex flex-wrap gap-2">
                        {['Blockchain Technology', 'Web3', 'Open Source', 'UI/UX Design', 'Tech Innovations'].map((interest, idx) => (
                          <span key={idx} className="px-3 py-1 rounded-full bg-[var(--primary-amber)]/10 text-[var(--primary-amber)] text-sm">
                            {interest}
                          </span>
                ))}
                      </div>
                    </div>
                  </div>
                </ResumeSection>
              </div>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* References Section - Always visible */}
      <motion.div 
        className="mt-12 pt-8 border-t border-[var(--card-border)]"
        variants={itemVariants}
      >
        <h2 className="text-2xl font-bold mb-4 text-[var(--primary-text)]">References</h2>
        <p className="text-[var(--secondary-text)]">{references[0].name}</p>
        
        <div className="mt-8 flex justify-center">
          <motion.button
            className="px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-600 text-black font-semibold shadow-lg flex items-center gap-2"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(245, 158, 11, 0.2)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.hash = '#contact'}
          >
            <span aria-hidden="true">✉️</span> Contact Me
          </motion.button>
      </div>
      </motion.div>
    </motion.div>
  );
};
