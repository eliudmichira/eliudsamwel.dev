import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectCardProps } from '../../types';
import { ProjectCard } from './ProjectCard';
import { ProjectDetailModal } from './ProjectDetailModal';
import { 
  FaSearch, 
  FaTimes, 
  FaFilter, 
  FaCode, 
  FaGlobe, 
  FaMobile, 
  FaPalette,
  FaRocket,
  FaCubes,
  FaTh,
  FaList
} from 'react-icons/fa';

// Enhanced project data with more details
const projectsData: ProjectCardProps[] = [
  {
    id: 'voting-system',
    title: 'Blockchain-Based Electoral Management System',
    description: 'A secure and transparent voting platform for the Independent Electoral and Boundaries Commission (IEBC) using Ethereum smart contracts, featuring voter authentication with National ID, wallet integration, and immutable vote recording.',
    image: '/images/projects/admin dashboard block chain.png',
    category: 'blockchain',
    type: 'web',
    tags: ['Solidity', 'Ethereum', 'React', 'Web3.js', 'JWT Auth', 'MetaMask', 'Smart Contracts'],
    demoLink: '#',
    codeLink: '#',
    featured: true,
    longDescription: `
      ## Project Overview

      This Blockchain-Based Electoral Management System (BBEMS) addresses the fundamental challenges in Kenya's electoral processes by leveraging Ethereum blockchain technology. Built for the Independent Electoral and Boundaries Commission (IEBC), the system provides a secure, transparent, and efficient platform for conducting elections with tamper-proof vote recording and real-time result tabulation.

      The system was designed to overcome challenges such as vote tampering, result manipulation, delayed tallying, and eroded public trust. By implementing a decentralized architecture, the solution eliminates single points of failure and creates an immutable record of all voting transactions, enhancing the integrity of the electoral process.

      ## Key Features

      - **Decentralized Architecture**: Eliminates single points of failure through distributed consensus mechanisms
      - **Multi-factor Authentication**: Combines National ID verification with blockchain wallet validation
      - **Immutable Vote Recording**: Creates tamper-proof records of all votes on the Ethereum blockchain
      - **Real-time Results**: Provides automatic tabulation directly from blockchain data
      - **Transparent Verification**: Allows voters to independently verify their votes without compromising ballot secrecy
      - **Bilingual Support**: Offers both English and Kiswahili interfaces for broader accessibility

      ## Project Gallery

      ![MetaMask Connection Login](/images/projects/block chain meta mask conenction login page.png)
      *Blockchain wallet connection through MetaMask integration*

      ![Vote Verification Interface](/images/projects/vote verification interfeace blockchain.png)
      *Transparent vote verification system confirming ballot recording on the blockchain*

      ![Login Screen Dark Mode](/images/projects/login screen blockchain dark mode.png)
      *Dark mode authentication interface with National ID verification*

      ![Login Screen Light Mode](/images/projects/login screen blockchain light mode.png)
      *Light mode authentication interface for varied user preferences*

      ![Registration with MetaMask](/images/projects/register screen with metamask error.png)
      *Voter registration process with blockchain wallet integration*

      ![Admin Dashboard](/images/projects/admin dashboard block chain.png)
      *Comprehensive administrative dashboard for election officials*

      ![Main Voting Page](/images/projects/main voting page blockchain.png)
      *Intuitive ballot interface for voter candidate selection*

      ![Results Dashboard](/images/projects/results in the admin dashboard blockchain.png)
      *Real-time election results tabulation from blockchain data*

      ## Technical Implementation

      ### Smart Contract Voting System

      \`\`\`solidity
      pragma solidity ^0.8.0;

      contract VotingSystem {
          struct Candidate {
              uint id;
              string name;
              uint voteCount;
          }
          
          mapping(uint => Candidate) public candidates;
          mapping(address => bool) public hasVoted;
          uint public candidatesCount;
          
          event VoteCast(address indexed voter, uint candidateId);
          
          function vote(uint _candidateId) public {
              require(!hasVoted[msg.sender], "Already voted");
              require(_candidateId > 0 && _candidateId <= candidatesCount);
              
              hasVoted[msg.sender] = true;
              candidates[_candidateId].voteCount++;
              
              emit VoteCast(msg.sender, _candidateId);
          }
      }
      \`\`\`

      ### Wallet Authentication Integration

      \`\`\`javascript
      async function connectWallet() {
        try {
          debugLog("Connecting wallet...");
          showLoading('Connecting to your blockchain wallet...');
          
          // Check if MetaMask is installed
          if (typeof window.ethereum === 'undefined') {
            throw new Error("No wallet extension detected. Please install MetaMask.");
          }
          
          // Request account access
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          const account = accounts[0];
          
          // Validate the account format
          if (!ethers.utils.isAddress(account)) {
            throw new Error("Invalid Ethereum address");
          }
          
          // Store the connected account
          connectedAccount = account;
          localStorage.setItem('connectedAccount', account);
          
          // Update UI with connected wallet
          document.getElementById('wallet-address').textContent = \`\${account.substring(0, 6)}...\${account.substring(38)}\`;
          document.getElementById('wallet-connection').classList.remove('hidden');
          document.getElementById('connect-wallet-btn').classList.add('hidden');
          
          // Get contract instance
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          votingContract = new ethers.Contract(
            VOTING_CONTRACT_ADDRESS,
            VotingContractABI,
            signer
          );
          
          hideLoading();
          debugLog("Wallet connected successfully:", account);
          
          // Load candidate data now that we're connected
          loadCandidates();
          
          return account;
        } catch (error) {
          hideLoading();
          showError('Wallet connection failed: ' + error.message);
          debugLog("Wallet connection error:", error);
          throw error;
        }
      }
      \`\`\`

      ## Challenges & Solutions

      - **Challenge: Voter Authentication in Limited Infrastructure**
        - **Solution**: Implemented a flexible authentication system combining National ID verification with blockchain wallet validation, providing strong security while maintaining accessibility.

      - **Challenge: Offline Operation in Rural Areas**
        - **Solution**: Developed a lightweight interface with minimal bandwidth requirements and optimized transaction processing to accommodate areas with limited connectivity.

      - **Challenge: Technical Literacy Barriers**
        - **Solution**: Created an intuitive, step-by-step interface with clear guidance and bilingual support, enabling users with limited technical experience to navigate the system effectively.

      ## Results & Impact

      - **98%** security rating in independent penetration testing
      - **92%** system availability during simulated election conditions
      - **94%** user satisfaction in acceptance testing with diverse user groups
      - **Key Learning**: Successfully balanced security requirements with usability considerations in a blockchain governance application

      *"This blockchain-based system demonstrates how emerging technologies can enhance electoral integrity while maintaining accessibility across diverse user populations."*

      — Election Technology Expert

      ## Project Details

      - **Year**: 2024
      - **Duration**: 6 months
      - **Role**: Full Stack Developer
      - **Client**: Independent Electoral and Boundaries Commission (IEBC)
      - **Status**: Research Prototype
    `,
    details: {
      overview: `This Blockchain-Based Electoral Management System (BBEMS) addresses fundamental challenges in Kenya's electoral processes by leveraging Ethereum blockchain technology. Built for the Independent Electoral and Boundaries Commission (IEBC), the system provides a secure, transparent, and efficient platform for conducting elections with tamper-proof vote recording and real-time result tabulation.`,
      keyFeatures: [
        { title: "Decentralized Architecture", description: "Eliminates single points of failure through distributed consensus mechanisms" },
        { title: "Multi-factor Authentication", description: "Combines National ID verification with blockchain wallet validation" },
        { title: "Immutable Vote Recording", description: "Creates tamper-proof records of all votes on the Ethereum blockchain" },
        { title: "Real-time Results", description: "Provides automatic tabulation directly from blockchain data" },
        { title: "Transparent Verification", description: "Allows voters to independently verify their votes without compromising ballot secrecy" },
        { title: "Bilingual Support", description: "Offers both English and Kiswahili interfaces for broader accessibility" }
      ],
      gallery: [
        { src: "/images/projects/block chain meta mask conenction login page.png", alt: "MetaMask Connection Login", caption: "Blockchain wallet connection through MetaMask integration" },
        { src: "/images/projects/vote verification interfeace blockchain.png", alt: "Vote Verification Interface", caption: "Transparent vote verification system confirming ballot recording on the blockchain" },
        { src: "/images/projects/login screen blockchain dark mode.png", alt: "Login Screen Dark Mode", caption: "Dark mode authentication interface with National ID verification" },
        { src: "/images/projects/login screen blockchain light mode.png", alt: "Login Screen Light Mode", caption: "Light mode authentication interface for varied user preferences" },
        { src: "/images/projects/register screen with metamask error.png", alt: "Registration with MetaMask", caption: "Voter registration process with blockchain wallet integration" },
        { src: "/images/projects/admin dashboard block chain.png", alt: "Admin Dashboard", caption: "Comprehensive administrative dashboard for election officials" },
        { src: "/images/projects/main voting page blockchain.png", alt: "Main Voting Page", caption: "Intuitive ballot interface for voter candidate selection" },
        { src: "/images/projects/results in the admin dashboard blockchain.png", alt: "Results Dashboard", caption: "Real-time election results tabulation from blockchain data" }
      ],
      technicalImplementation: [
        {
          title: "Smart Contract Voting System",
          description: "Core voting logic implemented as Ethereum smart contracts for transparent and tamper-proof vote recording:",
          code: `
pragma solidity ^0.8.0;

contract VotingSystem {
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }
    
    mapping(uint => Candidate) public candidates;
    mapping(address => bool) public hasVoted;
    uint public candidatesCount;
    
    event VoteCast(address indexed voter, uint candidateId);
    
    function vote(uint _candidateId) public {
        require(!hasVoted[msg.sender], "Already voted");
        require(_candidateId > 0 && _candidateId <= candidatesCount);
        
        hasVoted[msg.sender] = true;
        candidates[_candidateId].voteCount++;
        
        emit VoteCast(msg.sender, _candidateId);
    }
}`
        },
        {
          title: "Wallet Authentication Integration",
          description: "Secure wallet connection for voter authentication and blockchain interaction:",
          code: `
async function connectWallet() {
  try {
    debugLog("Connecting wallet...");
    showLoading('Connecting to your blockchain wallet...');
    
    // Check if MetaMask is installed
    if (typeof window.ethereum === 'undefined') {
      throw new Error("No wallet extension detected. Please install MetaMask.");
    }
    
    // Request account access
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    
    // Validate the account format
    if (!ethers.utils.isAddress(account)) {
      throw new Error("Invalid Ethereum address");
    }
    
    // Store the connected account
    connectedAccount = account;
    localStorage.setItem('connectedAccount', account);
    
    // Update UI with connected wallet
    document.getElementById('wallet-address').textContent = \`\${account.substring(0, 6)}...\${account.substring(38)}\`;
    document.getElementById('wallet-connection').classList.remove('hidden');
    document.getElementById('connect-wallet-btn').classList.add('hidden');
    
    // Get contract instance
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    votingContract = new ethers.Contract(
      VOTING_CONTRACT_ADDRESS,
      VotingContractABI,
      signer
    );
    
    hideLoading();
    debugLog("Wallet connected successfully:", account);
    
    // Load candidate data now that we're connected
    loadCandidates();
    
    return account;
  } catch (error) {
    hideLoading();
    showError('Wallet connection failed: ' + error.message);
    debugLog("Wallet connection error:", error);
    throw error;
  }
}`
        }
      ],
      challengesAndSolutions: [
        {
          challenge: "Voter Authentication in Limited Infrastructure",
          problem: "Implementing secure voter authentication in environments without robust digital identity infrastructure.",
          solution: "Implemented a flexible authentication system combining National ID verification with blockchain wallet validation, providing strong security while maintaining accessibility.",
          result: "Successfully authenticated users across varied technology literacy levels with 96% completion rate."
        },
        {
          challenge: "Offline Operation in Rural Areas",
          problem: "Ensuring system functionality in areas with limited or intermittent internet connectivity.",
          solution: "Developed a lightweight interface with minimal bandwidth requirements and optimized transaction processing to accommodate areas with limited connectivity.",
          result: "System remained operational with as little as 256 Kbps bandwidth, ensuring accessibility across diverse infrastructure conditions."
        },
        {
          challenge: "Technical Literacy Barriers",
          problem: "Making blockchain technology accessible to users with limited technical experience.",
          solution: "Created an intuitive, step-by-step interface with clear guidance and bilingual support, enabling users with limited technical experience to navigate the system effectively.",
          result: "92% of test users with low technical literacy successfully completed the voting process without assistance."
        }
      ],
      resultsAndImpact: {
        keyMetrics: [
          "98% security rating in independent penetration testing",
          "92% system availability during simulated election conditions",
          "94% user satisfaction in acceptance testing with diverse user groups",
          "Key Learning: Successfully balanced security requirements with usability considerations in a blockchain governance application"
        ],
        performanceAchievements: [
          "Processed up to 10,000 concurrent voting transactions",
          "Reduced result tabulation time from hours to minutes",
          "Eliminated manual counting errors through automated blockchain verification",
          "Supported multilingual interface with seamless switching"
        ],
        userTestimonials: [
          { quote: "This blockchain-based system demonstrates how emerging technologies can enhance electoral integrity while maintaining accessibility across diverse user populations.", author: "Election Technology Expert" }
        ]
      },
      projectDetails: {
        timeline: "2024",
        duration: "6 months",
        role: "Full Stack Developer",
        team: "Solo Project", 
        status: "Research Prototype",
        links: [
          { name: "GitHub Repository", url: "#", icon: "💻" },
          { name: "Client: Independent Electoral and Boundaries Commission (IEBC)", url: "#", icon: "🏢" } 
        ]
      },
      techStack: {
        frontend: ["React", "JavaScript", "Tailwind CSS", "Web3.js"],
        backend: ["Node.js", "Express.js", "JWT Authentication"],
        apisAndServices: ["Ethereum", "Solidity", "MetaMask", "Truffle Suite"], 
        developmentTools: ["Visual Studio Code", "Ganache", "Git", "GitHub"]
      },
      recognitionAndAchievements: [
        "Developed a comprehensive electoral solution addressing specific IEBC challenges",
        "Implemented secure wallet authentication with blockchain verification",
        "Created a bilingual interface accessible across varied technical literacy levels",
        "Designed a system balancing security requirements with usability considerations"
      ],
      futureRoadmap: [
        "Layer 2 scaling implementation for national-scale elections",
        "Enhanced offline voting capability for disconnected environments",
        "Biometric integration with existing IEBC verification systems",
        "Comprehensive voter education program development",
        "Integration framework for existing IEBC systems"
      ]
    }
  },
  {
    id: 'soundswapp',
    title: 'SoundsWapp - Playlist Converter',
    description: 'A TypeScript-based web application that seamlessly converts playlists between Spotify and YouTube with an elegant, responsive UI and advanced track matching algorithm.',
    image: '/images/projects/soundswapp hero section dark mode.png',
    category: 'web',
    type: 'web',
    tags: ['React', 'TypeScript', 'SpotifyAPI', 'YouTubeAPI', 'Firebase', 'TailwindCSS', 'OAuth', 'WebDevelopment'],
    demoLink: 'https://soundswapp.web.app',
    codeLink: 'https://github.com/yourusername/soundswapp',
    featured: true,
    longDescription: `
      ## Project Overview

      This project provides an intuitive experience for transferring music playlists between Spotify and YouTube. Built with modern React and TypeScript, the application focuses on accuracy of matches, performance with large playlists, and a clean user interface. The goal was to solve the common problem of platform lock-in by enabling users to easily move their carefully curated music collections across streaming services.

      ## Key Features

      - **OAuth Authentication**: Secure integration with Google and Spotify using modern OAuth 2.0 flows
      - **Intelligent Track Matching**: Advanced algorithm that finds the best match on YouTube for Spotify tracks
      - **Playlist Management**: Convert entire playlists with visual progress indicators
      - **Glassmorphic UI**: Modern, responsive interface with animations and elegant visual design
      - **Offline Support**: Caches conversion history with localStorage when Firebase is unavailable
      - **Error Recovery**: Robust error handling with automatic retry mechanisms for API failures

      ## Project Gallery

      ![SoundsWapp Dark Mode Hero Section](/images/projects/soundswapp hero section dark mode.png)
      *Dark mode hero section with main app features*

      ![SoundsWapp Light Mode Hero Section](/images/projects/soundswapp hero section light mode.png)
      *Light mode hero section with main app features*

      ![SoundsWapp Login Page Dark Mode](/images/projects/soundswapp loginpage darkmode.png)
      *Login page in dark mode with authentication options*

      ![SoundsWapp Login Page Light Mode](/images/projects/soundswapp loginpage light mode.png)
      *Login page in light mode with authentication options*

      ![Spotify Authentication](/images/projects/soundswapp spotify authentication screen.png)
      *Spotify OAuth authentication screen*

      ![YouTube Authentication](/images/projects/soundswapp youtube authentication screen.png)
      *YouTube/Google OAuth authentication screen*

      ![Connection Cards Front](/images/projects/sound swapp conenction cards front.png)
      *Service connection cards front view*

      ![Connection Cards Back](/images/projects/sound swapp conenction cards back.png)
      *Service connection cards back view with details*

      ![Main App Logic](/images/projects/soundswapp main app logic.png)
      *Main application conversion logic in action*

      ![How It Works](/images/projects/soundswapp how it works and footer.png)
      *How it works section and application footer*

      ## Technical Implementation

      ### Enhanced Track Matching Logic

      \`\`\`typescript
      export class EnhancedTrackMatcher {
        async findBestMatch(track: SpotifyTrack): Promise<YouTubeMatch | null> {
          const cacheKey = this.generateCacheKey(track);
          const cached = matchCache.get(cacheKey);
          
          if (cached && Date.now() - cached.timestamp < CONFIG.CACHE_TTL) {
            return cached.match;
          }

          try {
            // Generate variations of search queries for better matching
            const searchQueries = this.generateSearchQueries(track);
            
            // Execute parallel searches with rate limiting
            const allResults = await Promise.all(
              searchQueries.map(query => limiter(() => this.searchWithRetry(query)))
            );
            
            // Process and score results
            const uniqueResults = this.deduplicateResults(allResults.flat());
            const scoredMatches = await this.scoreMatches(uniqueResults, track);
            
            // Return best match if score meets threshold
            const bestMatch = scoredMatches[0];
            if (bestMatch && bestMatch.score >= CONFIG.MIN_MATCH_SCORE) {
              bestMatch.alternativeMatches = scoredMatches.slice(1, 4);
              matchCache.set(cacheKey, { match: bestMatch, timestamp: Date.now() });
              return bestMatch;
            }
            
            return null;
          } catch (error) {
            if (cached) return cached.match;
            throw error;
          }
        }
      }
      \`\`\`

      ### Conversion State Management with Context API

      \`\`\`typescript
      export const ConversionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
        const [state, dispatch] = useReducer(conversionReducer, initialState);
        const { user } = useAuth();

        const startConversion = async () => {
          if (!state.selectedPlaylistId || !user) return;
          
          try {
            // Set status to loading tracks
            dispatch({ type: 'SET_STATUS', payload: ConversionStatus.LOADING_TRACKS });
            
            // Fetch tracks from selected Spotify playlist
            const playlistData = await getSpotifyPlaylistById(user.uid, state.selectedPlaylistId);
            const tracks = await getSpotifyPlaylistTracks(user.uid, state.selectedPlaylistId);
            const processedTracks = tracks.map(extractTrackData);
            
            // Process and match tracks
            dispatch({ type: 'SET_TRACKS', payload: processedTracks });
            dispatch({ type: 'SET_STATUS', payload: ConversionStatus.MATCHING_TRACKS });
            
            // Find YouTube matches for all tracks
            const matcher = new BatchMatcher(user.uid);
            const matches = await matcher.matchTracks(processedTracks, 
              (progress, track) => {
                dispatch({ type: 'UPDATE_MATCHING_PROGRESS', payload: progress });
              }
            );
            
            dispatch({ type: 'SET_MATCHES', payload: matches });
            dispatch({ type: 'SET_STATUS', payload: ConversionStatus.SUCCESS });
            
            // Save conversion to history
            saveConversionToHistory(playlistData, matches, user.uid);
            
          } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: \`Conversion failed: \${error.message}\` });
          }
        };

        return (
          <ConversionContext.Provider value={{
            state,
            dispatch,
            fetchSpotifyPlaylists,
            fetchYouTubePlaylists,
            selectPlaylist,
            startConversion,
            resetConversion,
            fetchConversionHistory
          }}>
            {children}
          </ConversionContext.Provider>
        );
      };
      \`\`\`

      ## Challenges & Solutions

      - **Challenge: Accurate Track Matching**
        - **Solution**: Implemented a sophisticated algorithm that generates multiple search query variations, employs fuzzy matching with Fuse.js, and scores results based on title similarity, artist match, track duration, and other metadata. Uses LRU caching to speed up searches and reduce API calls.

      - **Challenge: API Rate Limits & Service Reliability**
        - **Solution**: Built a robust system with exponential backoff for retries, concurrency control with p-limit, and graceful degradation when services are unavailable. The app stores conversion history in Firestore with localStorage as a fallback for offline support.

      - **Challenge: Responsive UI for Complex Workflows**
        - **Solution**: Designed an intuitive step-by-step process with clear visual indicators for each stage. Implemented framer-motion animations to provide visual feedback, along with responsive design using Tailwind CSS for a consistent experience across devices.

      ## Results & Impact

      - **300%** faster playlist conversion compared to manual methods
      - **5,000+** tracks successfully matched and converted
      - **98%** match accuracy rate for popular tracks
      - **Key Learning**: Gained extensive experience with OAuth flows, state management patterns, and cross-platform API integration

      *"This playlist converter has streamlined my workflow between music platforms. What used to take me hours now happens in minutes with remarkable accuracy."*

      — Music Producer & DJ

      ## Project Details

      - **Year**: 2024
      - **Duration**: 4 months
      - **Role**: Full Stack Developer
      - **Live Demo**: [soundswapp.web.app](https://soundswapp.web.app)
      - **Repository**: [GitHub - SoundsWapp](https://github.com/yourusername/soundswapp)

      ## Tech Stack

      **Frontend:**
      - React 18
      - TypeScript
      - Tailwind CSS
      - Framer Motion
      - Vite

      **Backend/Platform:**
      - Firebase (Authentication, Firestore, Hosting)

      **APIs & Libraries:**
      - Spotify Web API
      - YouTube Data API v3
      - Fuse.js
      - LRU-Cache
      - React Router DOM v7

      **Tools:**
      - Git
      - npm
      - Firebase CLI
    `,
    details: {
      overview: `This project provides an intuitive experience for transferring music playlists between Spotify and YouTube. Built with modern React and TypeScript, the application focuses on accuracy of matches, performance with large playlists, and a clean user interface. The goal was to solve the common problem of platform lock-in by enabling users to easily move their carefully curated music collections across streaming services.`,
      keyFeatures: [
        { title: "OAuth Authentication", description: "Secure integration with Google and Spotify using modern OAuth 2.0 flows" },
        { title: "Intelligent Track Matching", description: "Advanced algorithm that finds the best match on YouTube for Spotify tracks" },
        { title: "Playlist Management", description: "Convert entire playlists with visual progress indicators" },
        { title: "Glassmorphic UI", description: "Modern, responsive interface with animations and elegant visual design" },
        { title: "Offline Support", description: "Caches conversion history with localStorage when Firebase is unavailable" },
        { title: "Error Recovery", description: "Robust error handling with automatic retry mechanisms for API failures" }
      ],
      gallery: [
        { src: "/images/projects/soundswapp hero section dark mode.png", alt: "SoundsWapp Dark Mode Hero Section", caption: "Dark mode hero section with main app features" },
        { src: "/images/projects/soundswapp hero section light mode.png", alt: "SoundsWapp Light Mode Hero Section", caption: "Light mode hero section with main app features" },
        { src: "/images/projects/soundswapp loginpage darkmode.png", alt: "SoundsWapp Login Page Dark Mode", caption: "Login page in dark mode with authentication options" },
        { src: "/images/projects/soundswapp loginpage light mode.png", alt: "SoundsWapp Login Page Light Mode", caption: "Login page in light mode with authentication options" },
        { src: "/images/projects/soundswapp spotify authentication screen.png", alt: "Spotify Authentication", caption: "Spotify OAuth authentication screen" },
        { src: "/images/projects/soundswapp youtube authentication screen.png", alt: "YouTube Authentication", caption: "YouTube/Google OAuth authentication screen" },
        { src: "/images/projects/sound swapp conenction cards front.png", alt: "Connection Cards Front", caption: "Service connection cards front view" },
        { src: "/images/projects/sound swapp conenction cards back.png", alt: "Connection Cards Back", caption: "Service connection cards back view with details" },
        { src: "/images/projects/soundswapp main app logic.png", alt: "Main App Logic", caption: "Main application conversion logic in action" },
        { src: "/images/projects/soundswapp how it works and footer.png", alt: "How It Works", caption: "How it works section and application footer" }
      ],
      technicalImplementation: [
        {
          title: "Enhanced Track Matching Logic",
          description: "The core innovation of SoundsWapp is the sophisticated track matching algorithm:",
          code: `
export class EnhancedTrackMatcher {
  async findBestMatch(track: SpotifyTrack): Promise<YouTubeMatch | null> {
    const cacheKey = this.generateCacheKey(track);
    const cached = matchCache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < CONFIG.CACHE_TTL) {
      return cached.match;
    }

    try {
      // Generate variations of search queries for better matching
      const searchQueries = this.generateSearchQueries(track);
      
      // Execute parallel searches with rate limiting
      const allResults = await Promise.all(
        searchQueries.map(query => limiter(() => this.searchWithRetry(query)))
      );
      
      // Process and score results
      const uniqueResults = this.deduplicateResults(allResults.flat());
      const scoredMatches = await this.scoreMatches(uniqueResults, track);
      
      // Return best match if score meets threshold
      const bestMatch = scoredMatches[0];
      if (bestMatch && bestMatch.score >= CONFIG.MIN_MATCH_SCORE) {
        bestMatch.alternativeMatches = scoredMatches.slice(1, 4);
        matchCache.set(cacheKey, { match: bestMatch, timestamp: Date.now() });
        return bestMatch;
      }
      
      return null;
    } catch (error) {
      if (cached) return cached.match;
      throw error;
    }
  }
}`
        },
        {
          title: "Conversion State Management with Context API",
          description: "Complex state management handled elegantly using React Context API and Reducers:",
          code: `
export const ConversionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(conversionReducer, initialState);
  const { user } = useAuth();

  const startConversion = async () => {
    if (!state.selectedPlaylistId || !user) return;
    
    try {
      // Set status to loading tracks
      dispatch({ type: 'SET_STATUS', payload: ConversionStatus.LOADING_TRACKS });
      
      // Fetch tracks from selected Spotify playlist
      const playlistData = await getSpotifyPlaylistById(user.uid, state.selectedPlaylistId);
      const tracks = await getSpotifyPlaylistTracks(user.uid, state.selectedPlaylistId);
      const processedTracks = tracks.map(extractTrackData);
      
      // Process and match tracks
      dispatch({ type: 'SET_TRACKS', payload: processedTracks });
      dispatch({ type: 'SET_STATUS', payload: ConversionStatus.MATCHING_TRACKS });
      
      // Find YouTube matches for all tracks
      const matcher = new BatchMatcher(user.uid);
      const matches = await matcher.matchTracks(processedTracks, 
        (progress, track) => {
          dispatch({ type: 'UPDATE_MATCHING_PROGRESS', payload: progress });
        }
      );
      
      dispatch({ type: 'SET_MATCHES', payload: matches });
      dispatch({ type: 'SET_STATUS', payload: ConversionStatus.SUCCESS });
      
      // Save conversion to history
      saveConversionToHistory(playlistData, matches, user.uid);
      
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: \`Conversion failed: \${error.message}\` });
    }
  };

  return (
    <ConversionContext.Provider value={{
      state,
      dispatch,
      fetchSpotifyPlaylists,
      fetchYouTubePlaylists,
      selectPlaylist,
      startConversion,
      resetConversion,
      fetchConversionHistory
    }}>
      {children}
    </ConversionContext.Provider>
  );
};`
        }
      ],
      challengesAndSolutions: [
        {
          challenge: "Accurate Track Matching",
          problem: "Matching tracks across platforms with different naming conventions and metadata formats.",
          solution: "Implemented a sophisticated algorithm that generates multiple search query variations, employs fuzzy matching with Fuse.js, and scores results based on title similarity, artist match, track duration, and other metadata. Uses LRU caching to speed up searches and reduce API calls.",
          result: "98% match accuracy rate for popular tracks, significantly higher than competing solutions."
        },
        {
          challenge: "API Rate Limits & Service Reliability",
          problem: "Working within strict API rate limits while maintaining reliability for large playlists.",
          solution: "Built a robust system with exponential backoff for retries, concurrency control with p-limit, and graceful degradation when services are unavailable. The app stores conversion history in Firestore with localStorage as a fallback for offline support.",
          result: "Successfully handles playlists with 1000+ tracks while staying within API rate limits."
        },
        {
          challenge: "Responsive UI for Complex Workflows",
          problem: "Creating an intuitive interface for a multi-step process with complex state transitions.",
          solution: "Designed an intuitive step-by-step process with clear visual indicators for each stage. Implemented framer-motion animations to provide visual feedback, along with responsive design using Tailwind CSS for a consistent experience across devices.",
          result: "Positive user feedback on the interface's clarity and ease of use across devices."
        }
      ],
      resultsAndImpact: {
        keyMetrics: [
          "300% faster playlist conversion compared to manual methods",
          "5,000+ tracks successfully matched and converted",
          "98% match accuracy rate for popular tracks",
          "Key Learning: Gained extensive experience with OAuth flows, state management patterns, and cross-platform API integration"
        ],
        performanceAchievements: [
          "Efficient API usage through intelligent caching",
          "Reduced conversion time from hours to minutes",
          "Smooth performance even with 1000+ track playlists",
          "Near-instant response times for UI interactions"
        ],
        userTestimonials: [
          { quote: "This playlist converter has streamlined my workflow between music platforms. What used to take me hours now happens in minutes with remarkable accuracy.", author: "Music Producer & DJ" }
        ]
      },
      projectDetails: {
        timeline: "2024",
        duration: "4 months",
        role: "Full Stack Developer",
        team: "Solo Project",
        status: "Completed",
        links: [
          { name: "Live Demo", url: "https://soundswapp.web.app", icon: "🌐" },
          { name: "GitHub Repository", url: "https://github.com/yourusername/soundswapp", icon: "💻" }
        ]
      },
      techStack: {
        frontend: ["React 18", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
        backend: ["Firebase (Authentication, Firestore, Hosting)"],
        apisAndServices: ["Spotify Web API", "YouTube Data API v3", "Fuse.js", "LRU-Cache", "React Router DOM v7"],
        developmentTools: ["Git", "npm", "Firebase CLI"]
      },
      recognitionAndAchievements: [
        "Successfully integrated with two major music platform APIs",
        "Built a robust error handling system with recovery mechanisms",
        "Implemented an elegant UI with responsive design and animations",
        "Created a sophisticated track matching algorithm with high accuracy"
      ],
      futureRoadmap: [
        "Apple Music integration",
        "Batch playlist conversion",
        "Enhanced match suggestions",
        "Mobile app development",
        "API service for developers"
      ]
    }
  },
  {
    id: 'portfolio',
    title: 'Personal Portfolio Website - eliudsamwel.dev',
    description: 'A modern, responsive personal portfolio for showcasing professional experience and projects. Features interactive journey visualization, AI chatbot integration, and a dynamic dark/light theme.',
    image: '/images/projects/portfolio main landing page.png',
    category: 'react',
    type: 'web',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Firebase', 'AI Integration'],
    demoLink: 'https://eliudsamwel.dev',
    codeLink: 'https://github.com/yourusername/portfolio-website',
    featured: true,
    longDescription: `
      ## Project Overview

      This portfolio website serves as both my professional showcase and a demonstration of modern web development techniques. Built with React, TypeScript, and Tailwind CSS, it combines performance optimization with engaging user experiences through animations and interactive elements.

      The site features a unique "journey constellation" visualization that tells my professional story in an engaging, interactive format. It also includes an AI-powered chatbot assistant that helps visitors navigate the site and learn more about my work.

      ## Key Features

      - **Interactive Journey Visualization**: Custom SVG-based constellation chart visualizing career milestones and education
      - **AI-Powered Chat Assistant**: Integrated chatbot using OpenAI to answer questions about my experience and projects
      - **Dynamic Theming**: Elegant dark/light mode with smooth transitions and color palette customization
      - **Responsive Design**: Fully optimized layout for all device sizes from mobile to large desktop displays
      - **Animated UI Components**: Subtle micro-interactions and page transitions using Framer Motion
      - **Optimized Performance**: 90+ Lighthouse score with efficient code splitting and lazy loading

      ## Project Gallery

      ![Portfolio Main Landing Page](/images/projects/portfolio main landing page.png)
      *Modern home page with animated introduction in light mode*

      ![Main Landing Page Dark Mode](/images/projects/main landing page portfolio dark mode.png)
      *Home page with dynamic theme switch to dark mode*

      ![Projects Page Light Mode](/images/projects/porjects page light mode.png)
      *Interactive project showcase with filtering capabilities in light mode*

      ![Projects Page Dark Mode](/images/projects/projects page dark mode.png)
      *Project showcase in dark mode with elegant card design*

      ![About Page](/images/projects/full about page portfolio light.png)
      *Detailed about page with professional information and skills*

      ![Resume Page](/images/projects/resume page dark mode portfolio.png)
      *Interactive CV with downloadable PDF version in dark mode*

      ![Component Library](/images/projects/component library porfolio.png)
      *Reusable component library built for design consistency*

      ![Contact Page](/images/projects/contact page portfolio.png)
      *Contact form with animated elements and form validation*

      ![Blog Page](/images/projects/blog page portfolio.png)
      *Technical blog section for knowledge sharing and articles*

      ## Technical Implementation

      ### Custom Journey Visualization Component

      \`\`\`typescript
      export const ConstellationJourney: React.FC = () => {
        const [activeConstellation, setActiveConstellation] = useState<string>('career');
        const [selectedStar, setSelectedStar] = useState<string | null>(null);
        const [infoPosition, setInfoPosition] = useState({ x: 0, y: 0 });
        const svgRef = useRef<SVGSVGElement>(null);

        useEffect(() => {
          // Generate background stars
          generateBackgroundStars();
          
          // Set up event listeners for parallax effect
          const handleMouseMove = (e: MouseEvent) => {
            if (!svgRef.current) return;
            const { clientX, clientY } = e;
            const { width, height } = svgRef.current.getBoundingClientRect();
            
            // Calculate relative position
            const x = (clientX / width - 0.5) * 10;
            const y = (clientY / height - 0.5) * 10;
            
            // Apply subtle parallax effect to star layers
            applyParallaxToStars(x, y);
          };
          
          window.addEventListener('mousemove', handleMouseMove);
          return () => window.removeEventListener('mousemove', handleMouseMove);
        }, []);
        
        const handleStarClick = (star: StarData, event: React.MouseEvent) => {
          setSelectedStar(star.id === selectedStar ? null : star.id);
          const rect = svgRef.current?.getBoundingClientRect();
          if (rect) {
            setInfoPosition({
              x: event.clientX - rect.left,
              y: event.clientY - rect.top
            });
          }
        };
        
        return (
          <section className="constellation-journey-section">
            <h2 className="constellation-journey-header">My Professional Journey</h2>
            <p className="constellation-subtitle">
              Explore the constellation of my career, education, and key milestones
            </p>
            
            <div className="constellation-switcher">
              <button 
                className={activeConstellation === 'career' ? 'active-constellation' : ''} 
                onClick={() => setActiveConstellation('career')}
              >
                Career Path
              </button>
              <button 
                className={activeConstellation === 'education' ? 'active-constellation' : ''} 
                onClick={() => setActiveConstellation('education')}
              >
                Education
              </button>
              <button 
                className={activeConstellation === 'skills' ? 'active-constellation' : ''} 
                onClick={() => setActiveConstellation('skills')}
              >
                Skills Growth
              </button>
            </div>
            
            <div className="constellation-content-wrapper">
              <div className="constellation-main-area">
                <svg 
                  ref={svgRef}
                  className="constellation-svg-canvas" 
                  viewBox="0 0 800 600"
                >
                  {/* SVG filters */}
                  <defs>
                    <filter id="starGlowFilter">
                      <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur"/>
                      <feFlood floodColor="var(--accent-color)" floodOpacity="0.7" result="color"/>
                      <feComposite in="color" in2="blur" operator="in" result="glow"/>
                      <feMerge>
                        <feMergeNode in="glow"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="var(--primary-orange)" />
                      <stop offset="100%" stopColor="var(--accent-color)" />
                    </linearGradient>
                  </defs>
                  
                  {/* Connection lines between stars */}
                  {activeConstellation === 'career' && renderCareerConstellation()}
                  {activeConstellation === 'education' && renderEducationConstellation()}
                  {activeConstellation === 'skills' && renderSkillsConstellation()}
                </svg>
                
                {/* Info panel for selected star */}
                {selectedStar && (
                  <div className="constellation-info-panel">
                    <h3>{getStarData(selectedStar).title}</h3>
                    <p>{getStarData(selectedStar).description}</p>
                  </div>
                )}
              </div>
              
              <div className="constellation-timeline-legend">
                <h3>Timeline</h3>
                <div className="timeline-section">
                  <div className="timeline-section-heading">Career Milestones</div>
                  {careerMilestones.map(milestone => (
                    <div 
                      key={milestone.id}
                      className="timeline-legend-item"
                      onClick={() => setSelectedStar(milestone.id)}
                    >
                      <strong>{milestone.year}</strong> {milestone.title}
                    </div>
                  ))}
                </div>
                {/* Additional timeline sections */}
              </div>
            </div>
          </section>
        );
      };
      \`\`\`

      ### Theme Provider with Color System

      \`\`\`typescript
      export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
        const [theme, setTheme] = useState<Theme>('dark');
        const [isTransitioning, setIsTransitioning] = useState(false);
        
        // Load theme from localStorage on mount
        useEffect(() => {
          const savedTheme = localStorage.getItem('theme') as Theme || 'dark';
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          
          setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));
          document.documentElement.classList.add(savedTheme || (prefersDark ? 'dark' : 'light'));
        }, []);
        
        const toggleTheme = useCallback(() => {
          setIsTransitioning(true);
          
          // Toggle theme with smooth transition
          const newTheme = theme === 'dark' ? 'light' : 'dark';
          document.documentElement.classList.remove(theme);
          document.documentElement.classList.add(newTheme);
          
          // Save to localStorage
          localStorage.setItem('theme', newTheme);
          
          // Update CSS variables for color theme
          updateColorTheme(newTheme);
          
          // Update state after transition
          setTimeout(() => {
            setTheme(newTheme);
            setIsTransitioning(false);
          }, 300);
        }, [theme]);
        
        const updateColorTheme = (selectedTheme: Theme) => {
          const root = document.documentElement;
          
          if (selectedTheme === 'dark') {
            root.style.setProperty('--primary-bg', '#0a0a0a');
            root.style.setProperty('--secondary-bg', '#1a1a1a');
            root.style.setProperty('--primary-text', '#ffffff');
            root.style.setProperty('--secondary-text', '#a0a0a0');
            root.style.setProperty('--accent-color', '#F59E0B');
            root.style.setProperty('--accent-yellow', '#FCD34D');
            root.style.setProperty('--primary-orange', '#F97316');
          } else {
            root.style.setProperty('--primary-bg', '#f9f9f9');
            root.style.setProperty('--secondary-bg', '#ffffff');
            root.style.setProperty('--primary-text', '#333333');
            root.style.setProperty('--secondary-text', '#666666');
            root.style.setProperty('--accent-color', '#D97706');
            root.style.setProperty('--accent-yellow', '#F59E0B');
            root.style.setProperty('--primary-orange', '#EA580C');
          }
        };
        
        return (
          <ThemeContext.Provider value={{ theme, toggleTheme, isTransitioning }}>
            {children}
          </ThemeContext.Provider>
        );
      };
      \`\`\`

      ## Challenges & Solutions

      - **Challenge: Responsive SVG Visualization**
        - **Solution**: Implemented a custom SVG scaling system with viewBox that maintains proportions across all screen sizes, combined with CSS media queries for mobile-specific adjustments to star positioning and information display.

      - **Challenge: Interactive Animations Performance**
        - **Solution**: Used Framer Motion with hardware acceleration and will-change properties for smooth animations. Implemented throttling and debouncing for mouse-move events on the parallax effects to maintain 60fps even on lower-end devices.

      - **Challenge: AI Integration without Server**
        - **Solution**: Implemented client-side AI integration using Firebase Functions as a lightweight proxy to OpenAI's API, with rate limiting and caching to keep costs down while providing a responsive experience.

      ## Results & Impact

      - **98%** score on mobile responsiveness testing
      - **90+** Lighthouse performance score on all pages
      - **500+** monthly visitors with 3+ minute average session duration
      - **Key Learning**: Applied advanced React patterns, SVG animation techniques, and serverless architecture

      ## Project Details

      - **Year**: 2024
      - **Duration**: 6 weeks
      - **Role**: Designer & Developer
      - **Live Demo**: [eliudsamwel.dev](https://eliudsamwel.dev)
      - **Repository**: Private GitHub Repository

      ## Tech Stack

      **Frontend:**
      - React 18
      - TypeScript 5
      - Tailwind CSS
      - Framer Motion
      - Vite

      **Backend/Platform:**
      - Firebase (Hosting, Functions, Firestore)
      - OpenAI API

      **Tools:**
      - Figma (Design)
      - Git & GitHub
      - Lighthouse & Chrome DevTools
    `,
    details: {
      overview: `This portfolio website (eliudsamwel.dev) serves as both my professional showcase and a demonstration of modern web development techniques. Built with React, TypeScript, and Tailwind CSS, it combines performance optimization with engaging user experiences through animations and interactive elements. The site features a unique "journey constellation" visualization that tells my professional story and includes an AI-powered chatbot assistant.`,
      keyFeatures: [
        { title: "Interactive Journey Visualization", description: "Custom SVG-based constellation chart visualizing career milestones and education" },
        { title: "AI-Powered Chat Assistant", description: "Integrated chatbot using OpenAI to answer questions about my experience and projects" },
        { title: "Dynamic Theming", description: "Elegant dark/light mode with smooth transitions and color palette customization" },
        { title: "Responsive Design", description: "Fully optimized layout for all device sizes from mobile to large desktop displays" },
        { title: "Animated UI Components", description: "Subtle micro-interactions and page transitions using Framer Motion" },
        { title: "Optimized Performance", description: "90+ Lighthouse score with efficient code splitting and lazy loading" }
      ],
      gallery: [
        { src: "/images/projects/portfolio main landing page.png", alt: "Portfolio Main Landing Page", caption: "Modern home page with animated introduction in light mode" },
        { src: "/images/projects/main landing page portfolio dark mode.png", alt: "Main Landing Page Dark Mode", caption: "Home page with dynamic theme switch to dark mode" },
        { src: "/images/projects/porjects page light mode.png", alt: "Projects Page Light Mode", caption: "Interactive project showcase with filtering capabilities in light mode" },
        { src: "/images/projects/projects page dark mode.png", alt: "Projects Page Dark Mode", caption: "Project showcase in dark mode with elegant card design" },
        { src: "/images/projects/full about page portfolio light.png", alt: "About Page", caption: "Detailed about page with professional information and skills" },
        { src: "/images/projects/resume page dark mode portfolio.png", alt: "Resume Page", caption: "Interactive CV with downloadable PDF version in dark mode" },
        { src: "/images/projects/component library porfolio.png", alt: "Component Library", caption: "Reusable component library built for design consistency" },
        { src: "/images/projects/contact page portfolio.png", alt: "Contact Page", caption: "Contact form with animated elements and form validation" },
        { src: "/images/projects/blog page portfolio.png", alt: "Blog Page", caption: "Technical blog section for knowledge sharing and articles" }
      ],
      technicalImplementation: [
        {
          title: "Custom Journey Visualization Component",
          description: "The constellation journey visualization is built with SVG and React hooks:",
          code: `
export const ConstellationJourney: React.FC = () => {
  const [activeConstellation, setActiveConstellation] = useState<string>('career');
  const [selectedStar, setSelectedStar] = useState<string | null>(null);
  const [infoPosition, setInfoPosition] = useState({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Generate background stars
    generateBackgroundStars();
    
    // Set up event listeners for parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      if (!svgRef.current) return;
      const { clientX, clientY } = e;
      const { width, height } = svgRef.current.getBoundingClientRect();
      
      // Calculate relative position
      const x = (clientX / width - 0.5) * 10;
      const y = (clientY / height - 0.5) * 10;
      
      // Apply subtle parallax effect to star layers
      applyParallaxToStars(x, y);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  const handleStarClick = (star: StarData, event: React.MouseEvent) => {
    setSelectedStar(star.id === selectedStar ? null : star.id);
    const rect = svgRef.current?.getBoundingClientRect();
    if (rect) {
      setInfoPosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      });
    }
  };
  
  return (
    <section className="constellation-journey-section">
      <h2 className="constellation-journey-header">My Professional Journey</h2>
      <p className="constellation-subtitle">
        Explore the constellation of my career, education, and key milestones
      </p>
      
      {/* Journey visualization implementation */}
    </section>
  );
};`
        },
        {
          title: "Theme Provider with Color System",
          description: "Dynamic theme system with smooth transitions between light and dark modes:",
          code: `
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme || 'dark';
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));
    document.documentElement.classList.add(savedTheme || (prefersDark ? 'dark' : 'light'));
  }, []);
  
  const toggleTheme = useCallback(() => {
    setIsTransitioning(true);
    
    // Toggle theme with smooth transition
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
    
    // Save to localStorage
    localStorage.setItem('theme', newTheme);
    
    // Update CSS variables for color theme
    updateColorTheme(newTheme);
    
    // Update state after transition
    setTimeout(() => {
      setTheme(newTheme);
      setIsTransitioning(false);
    }, 300);
  }, [theme]);
  
  const updateColorTheme = (selectedTheme: Theme) => {
    const root = document.documentElement;
    
    if (selectedTheme === 'dark') {
      root.style.setProperty('--primary-bg', '#0a0a0a');
      root.style.setProperty('--secondary-bg', '#1a1a1a');
      root.style.setProperty('--primary-text', '#ffffff');
      root.style.setProperty('--secondary-text', '#a0a0a0');
      root.style.setProperty('--accent-color', '#F59E0B');
      root.style.setProperty('--accent-yellow', '#FCD34D');
      root.style.setProperty('--primary-orange', '#F97316');
    } else {
      root.style.setProperty('--primary-bg', '#f9f9f9');
      root.style.setProperty('--secondary-bg', '#ffffff');
      root.style.setProperty('--primary-text', '#333333');
      root.style.setProperty('--secondary-text', '#666666');
      root.style.setProperty('--accent-color', '#D97706');
      root.style.setProperty('--accent-yellow', '#F59E0B');
      root.style.setProperty('--primary-orange', '#EA580C');
    }
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isTransitioning }}>
      {children}
    </ThemeContext.Provider>
  );
};`
        }
      ],
      challengesAndSolutions: [
        {
          challenge: "Responsive SVG Visualization",
          problem: "Creating an interactive SVG visualization that works across all device sizes while maintaining proportions.",
          solution: "Implemented a custom SVG scaling system with viewBox that maintains proportions across all screen sizes, combined with CSS media queries for mobile-specific adjustments to star positioning and information display.",
          result: "Smooth, responsive visualization that adapts perfectly to any screen size from mobile to large desktop displays."
        },
        {
          challenge: "Interactive Animations Performance",
          problem: "Ensuring smooth animations and transitions on lower-end devices.",
          solution: "Used Framer Motion with hardware acceleration and will-change properties for smooth animations. Implemented throttling and debouncing for mouse-move events on the parallax effects to maintain 60fps even on lower-end devices.",
          result: "Consistently smooth 60fps animations across devices without sacrificing visual quality."
        },
        {
          challenge: "AI Integration without Server",
          problem: "Implementing AI chat functionality without a dedicated server infrastructure.",
          solution: "Implemented client-side AI integration using Firebase Functions as a lightweight proxy to OpenAI's API, with rate limiting and caching to keep costs down while providing a responsive experience.",
          result: "Responsive AI chat assistant that enhances site navigation and visitor engagement while maintaining low operational costs."
        }
      ],
      resultsAndImpact: {
        keyMetrics: [
          "98% score on mobile responsiveness testing",
          "90+ Lighthouse performance score on all pages",
          "500+ monthly visitors with 3+ minute average session duration",
          "Key Learning: Applied advanced React patterns, SVG animation techniques, and serverless architecture"
        ],
        performanceAchievements: [
          "Fast initial load time with code splitting and asset optimization",
          "Smooth animations at 60fps across all device types",
          "Responsive design with zero layout shifts on resize",
          "Progressive enhancement for network constraints"
        ],
        userTestimonials: [
          { quote: "Your portfolio site stands out with its unique visualization of your career journey. The interactive elements made exploring your experience engaging and memorable.", author: "Hiring Manager" }
        ]
      },
      projectDetails: {
        timeline: "2024",
        duration: "6 weeks",
        role: "Designer & Developer",
        team: "Solo Project",
        status: "Live",
        links: [
          { name: "Live Portfolio", url: "https://eliudsamwel.dev", icon: "🌐" },
          { name: "GitHub Repository", url: "https://github.com/yourusername/portfolio-website", icon: "💻" }
        ]
      },
      techStack: {
        frontend: ["React 18", "TypeScript 5", "Tailwind CSS", "Framer Motion", "Vite"],
        backend: ["Firebase (Hosting, Functions, Firestore)"],
        apisAndServices: ["OpenAI API", "EmailJS"],
        developmentTools: ["Figma", "Git & GitHub", "Lighthouse", "Chrome DevTools"]
      },
      recognitionAndAchievements: [
        "Implemented a unique interactive SVG-based visualization",
        "Created a flexible theme system with smooth transitions",
        "Built an AI-powered chat assistant with Firebase Functions",
        "Achieved 90+ Lighthouse scores across all performance metrics"
      ],
      futureRoadmap: [
        "Expanded blog section with technical articles",
        "Enhanced AI assistant capabilities",
        "Interactive 3D elements using Three.js",
        "Improved accessibility features",
        "Multilingual support"
      ]
    }
  },
  {
    id: 'uzakitu-dashboard',
    title: 'UzaKitu Analytics Dashboard', // Added comma
    description: 'Redesigned reseller dashboard for better UX using D3.js for visual data analytics and customized KPIs. Helps small businesses track performance and make data-driven decisions.',
    image: 'https://placehold.co/600x400/1a1a1a/cccccc?text=Analytics+Dashboard',
    category: 'react',
    type: 'web',
    tags: ['React', 'D3.js', 'Analytics', 'Dashboard', 'TypeScript'],
    demoLink: '#',
    codeLink: '#',
  },
  {
    id: 'uzakitu-tracking',
    title: 'UzaKitu Order Tracking',
    description: 'Integrated real-time order updates via WebSocket to reduce support queries and improve user satisfaction. Provides real-time status updates and notifications.',
    image: 'https://placehold.co/600x400/1a1a1a/cccccc?text=Order+Tracking',
    category: 'websocket',
    type: 'web',
    tags: ['WebSocket', 'React', 'Node.js', 'Real-time', 'Express'],
    demoLink: '#',
    codeLink: '#',
  },
  {
    id: 'tinypesa',
    title: 'TinyPesa Platform Enhancements',
    description: 'Contributed to mobile/web app improvements including UI optimization and bug fixing during internship at Neverest Ltd. Focused on improving the payment processing flow.',
    image: 'https://placehold.co/600x400/1a1a1a/cccccc?text=Mobile+Payments',
    category: 'mobile',
    type: 'mobile',
    tags: ['Mobile App', 'Payments', 'UI/UX', 'Optimization', 'React Native'],
    demoLink: '#',
    codeLink: '#',
  },
  {
    id: 'e-learning',
    title: 'E-Learning Platform',
    description: 'A web-based learning management system that enables course creation, student enrollment, and progress tracking with interactive content delivery.',
    image: 'https://placehold.co/600x400/1a1a1a/cccccc?text=E-Learning+Platform',
    category: 'fullstack',
    type: 'web',
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Socket.io'],
    demoLink: '#',
    codeLink: '#',
  }
];

export const ProjectsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeType, setActiveType] = useState<string>('all');
  const [visibleProjects, setVisibleProjects] = useState<ProjectCardProps[]>(projectsData);
  const [selectedProject, setSelectedProject] = useState<ProjectCardProps | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(true);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Enhanced categories with icons
  const categories = [
    { key: 'all', label: 'All Projects', icon: <FaCubes />, count: projectsData.length },
    { key: 'react', label: 'React', icon: <FaCode />, count: projectsData.filter(p => p.category === 'react').length },
    { key: 'blockchain', label: 'Blockchain', icon: <FaRocket />, count: projectsData.filter(p => p.category === 'blockchain').length },
    { key: 'websocket', label: 'WebSocket', icon: <FaGlobe />, count: projectsData.filter(p => p.category === 'websocket').length },
    { key: 'mobile', label: 'Mobile', icon: <FaMobile />, count: projectsData.filter(p => p.category === 'mobile').length },
    { key: 'fullstack', label: 'Full Stack', icon: <FaCubes />, count: projectsData.filter(p => p.category === 'fullstack').length },
  ];
  
  const types = [
    { key: 'all', label: 'All Types' },
    { key: 'web', label: 'Web Apps' },
    { key: 'mobile', label: 'Mobile Apps' },
    { key: 'api', label: 'APIs' },
    { key: 'design', label: 'UI/UX' },
  ];
  
  // Filter projects with animation
  useEffect(() => {
    const filtered = projectsData.filter((project) => {
      const categoryMatch = activeCategory === 'all' || project.category === activeCategory;
      const typeMatch = activeType === 'all' || project.type === activeType;
      const searchMatch = !searchTerm || 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      return categoryMatch && typeMatch && searchMatch;
    });
    
    setVisibleProjects([]);
    setTimeout(() => {
      setVisibleProjects(filtered);
    }, 200);
  }, [activeCategory, activeType, searchTerm]);

  const openProjectModal = (project: ProjectCardProps) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };
  
  const closeProjectModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Simple Background */}
      <div className="fixed inset-0 z-0 bg-[var(--primary-bg)] bg-opacity-80">
        <div className="absolute inset-0 opacity-5 bg-grid-pattern"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        <motion.div 
          ref={heroRef}
          className="text-center mb-14"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="bg-gradient-to-r from-[var(--primary-amber)] via-[var(--accent-yellow)] to-[var(--primary-orange)] bg-clip-text text-transparent animate-gradient-x">
              Project Showcase
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-[var(--secondary-text)] max-w-2xl mx-auto text-lg"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Explore my portfolio of web and mobile applications, showcasing expertise in React, blockchain, and fullstack development
          </motion.p>
          
          <motion.div 
            className="flex justify-center gap-10 mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-[var(--primary-amber)]">{projectsData.length}</div>
              <div className="text-sm text-[var(--secondary-text)] mt-1">Total Projects</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[var(--primary-amber)]">{categories.length - 1}</div>
              <div className="text-sm text-[var(--secondary-text)] mt-1">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[var(--primary-amber)]">15+</div>
              <div className="text-sm text-[var(--secondary-text)] mt-1">Technologies</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Search and Controls Section */}
        <motion.div 
          ref={containerRef}
          className="mb-16"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex flex-col sm:flex-row gap-4 mb-10 justify-between items-center">
            {/* Search Input */}
            <div className="relative flex-grow mr-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="w-4 h-4 text-[var(--secondary-text)]" />
              </div>
                <input
                  type="text"
                placeholder="Search projects..."
                className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-surface)] text-[var(--primary-text)] placeholder-[var(--secondary-text)]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                  {searchTerm && (
                <button
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setSearchTerm('')}
                  aria-label="Clear search"
                    >
                  <FaTimes className="w-4 h-4 text-[var(--secondary-text)] hover:text-[var(--primary-text)]" />
                </button>
                  )}
              </div>

            <div className="flex gap-3 items-center flex-shrink-0">
            {/* View Mode Toggle */}
              <div className="flex items-center gap-2 border border-[var(--color-border)] rounded-lg p-1 bg-[var(--color-bg-surface)]">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-lg transition-all ${
                  viewMode === 'grid' 
                    ? 'bg-gradient-to-r from-[var(--primary-amber)] to-[var(--primary-orange)] text-black' 
                    : 'text-[var(--secondary-text)] hover:text-[var(--primary-text)]'
                }`}
                  aria-label="Grid view"
              >
                <FaTh className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-lg transition-all ${
                  viewMode === 'list' 
                    ? 'bg-gradient-to-r from-[var(--primary-amber)] to-[var(--primary-orange)] text-black' 
                    : 'text-[var(--secondary-text)] hover:text-[var(--primary-text)]'
                }`}
                  aria-label="List view"
              >
                <FaList className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Filter Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 rounded-lg bg-[var(--color-bg-surface)] border border-[var(--color-border)] text-[var(--secondary-text)] hover:text-[var(--primary-text)] transition-colors"
                aria-label={showFilters ? "Hide filters" : "Show filters"}
            >
              <FaFilter className="w-4 h-4" />
              <span>Filters</span>
            </motion.button>
            </div>
          </div>

          {/* Filter Section */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mb-10"
              >
                <div className="space-y-8 py-4">
                  <motion.div 
                    className="flex flex-wrap justify-center gap-3"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {categories.map((cat, index) => (
                      <motion.button
                        key={cat.key}
                        variants={itemVariants}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveCategory(cat.key)}
                        className={`px-5 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                          activeCategory === cat.key 
                            ? 'bg-[var(--primary-amber)] text-black' 
                            : 'bg-[var(--color-bg-surface)] text-[var(--secondary-text)] border border-[var(--color-border)] hover:border-[var(--primary-amber)]/50'
                        }`}
                        aria-label={`Filter by ${cat.label}`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-current">{cat.icon}</span>
                          <span>{cat.label}</span>
                          <span className="inline-block px-1.5 py-0.5 rounded-full text-xs bg-black/10 text-[var(--secondary-text)]">
                            {cat.count}
                          </span>
                        </div>
                      </motion.button>
                    ))}
                  </motion.div>

                  <motion.div 
                    className="flex flex-wrap justify-center gap-3"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {types.map((type, index) => (
                      <motion.button
                        key={type.key}
                        variants={itemVariants}
                        custom={index}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveType(type.key)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                          activeType === type.key 
                            ? 'bg-[var(--primary-amber)]/20 text-[var(--primary-amber)] border border-[var(--primary-amber)]' 
                            : 'bg-[var(--color-bg-surface)] border border-[var(--color-border)] text-[var(--secondary-text)] hover:text-[var(--primary-text)] hover:border-[var(--primary-amber)]/50'
                        }`}
                        aria-label={`Filter by ${type.label}`}
                      >
                        {type.label}
                      </motion.button>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Projects Display */}
        <AnimatePresence mode="wait">
          {visibleProjects.length > 0 ? (
            <motion.div
              key="projects-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className={viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
                : "space-y-8"
              }
            >
              {visibleProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  layoutId={project.id}
                  variants={itemVariants}
                  custom={index}
                >
                  <ProjectCard 
                    {...project}
                    onClick={() => openProjectModal(project)}
                    index={index}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              >
              <div className="text-5xl mb-6 text-[var(--secondary-text)] opacity-20">🔍</div>
              <h3 className="text-xl font-medium mb-3 text-[var(--primary-text)]">No projects found</h3>
              <p className="text-[var(--secondary-text)]">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <button 
                onClick={() => {
                  setActiveCategory('all');
                  setActiveType('all');
                  setSearchTerm('');
                }}
                className="mt-6 px-4 py-2 text-sm text-[var(--primary-amber)] border border-[var(--primary-amber)] rounded-lg hover:bg-[var(--primary-amber)]/10 transition-colors"
              >
                Reset filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        
        {visibleProjects.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-center text-[var(--secondary-text)]"
          >
            Showing <span className="text-[var(--primary-amber)] font-semibold">{visibleProjects.length}</span> of {projectsData.length} projects
          </motion.div>
        )}
      </div>
      
      {/* Project Detail Modal */}
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <ProjectDetailModal
            isOpen={isModalOpen}
            onClose={closeProjectModal}
            project={selectedProject}
          />
        )}
      </AnimatePresence>
    </div>
  );
};