import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
    id: 'flickcollection',
    title: 'FlickCollection — AI-Powered Movie & TV Discovery Platform',
    description: 'An AI-powered movie and TV show discovery platform with a TikTok-style vertical feed, real-time TMDB data, algorithmic "Why Recommended" AI reasoning, Google OAuth, and a cinematic "SIGNAL SEARCHING" intro. Built by a movie lover, for movie lovers.',
    image: '/images/projects/flickcollection login .png',
    category: 'fullstack',
    type: 'mobile',
    tags: ['React', 'Firebase', 'TMDB API', 'OAuth', 'AI-Powered', 'TikTok-Style', 'Entertainment', 'Full-Stack', 'TypeScript', 'Capacitor', 'Kotlin', 'Dark Mode UI'],
    demoLink: 'https://flickcollection.com',
    codeLink: '#',
    featured: true,
    longDescription: `
## 🎬 The Vision
FlickCollection is an AI-powered movie and TV show discovery platform designed to help users find content that matches their vibe — built by Mich, a movie lover, not an art museum. The app features a sleek TikTok-style vertical video feed where each card plays trailers/clips on loop, paired with full poster art, cast info, watch links via TMDB, and algorithmic "Why Recommended" reasoning (e.g., Paranoid, Psychological, Trending).

## ✨ Key Features
- **For You Feed**: TikTok-style vertical discovery feed personalized to your taste.
- **Trending Now**: Real-time trending movies and TV shows powered by TMDB (e.g., *In the Grey* by Guy Ritchie, 2026).
- **Discover Mode**: Explore by genre, mood, and AI-curated collections.
- **Personal Collection**: Watchlist, playlists, and social sharing.
- **Multi-Auth**: Google OAuth + Email/Password with "Join 10,000+ movie lovers" onboarding.
- **Cinematic Intro**: "SIGNAL SEARCHING" loading animation on every page load.

## 🛠️ Technical Architecture

### Frontend
React with client-side routing (/feed, /trending, /shows, /discover), dark mode with orange/gold accent theme, and smooth CSS animations.

### Backend & Auth
Firebase Hosting + Firebase Authentication (Google OAuth + Email/Password).

### Data Layer
TMDB (The Movie Database) API for real-time movie/TV posters, trailers, cast, and watch links.

### Hybrid-Native (Android)
Capacitor + custom Kotlin bridges for haptics, native auth bypass, and hardware-accelerated video.
`,
    details: {
      overview: 'FlickCollection is an AI-powered movie and TV show discovery platform designed to help users find content that matches their vibe — built by Mich, a movie lover, not an art museum. The app features a sleek TikTok-style vertical video feed UI where each card plays movie trailers/clips on loop, paired with full poster art, cast info, watch links via TMDB, and algorithmic "Why Recommended" reasoning (e.g., Paranoid, Psychological, Trending). The platform includes multi-factor sign-in with Google OAuth and email/password, a "Join 10,000+ movie lovers" onboarding flow, and a cinematic "SIGNAL SEARCHING" intro animation on page load.',
      keyFeatures: [
        { title: 'TikTok-Style For You Feed', description: 'Vertical video feed where each card auto-plays movie trailers/clips on loop with full poster art, cast info, and algorithmic "Why Recommended" reasoning.' },
        { title: 'AI-Powered Recommendations', description: 'Algorithmic personalization with mood-based tags like Paranoid, Psychological, and Trending — surfacing content that truly matches your vibe.' },
        { title: 'Real-Time Trending via TMDB', description: 'Live trending movies and TV shows powered by The Movie Database (TMDB) API, showing the latest releases like In the Grey (2026) by Guy Ritchie.' },
        { title: 'Multi-Auth Sign-In', description: 'Firebase Authentication supporting Google OAuth and email/password, with a polished "Join 10,000+ movie lovers" onboarding flow.' },
        { title: 'Playlists & Social Features', description: 'Personal watchlists, custom playlists, and a Social layer for discovering what friends are watching and coordinating movie nights.' },
        { title: 'Cinematic "SIGNAL SEARCHING" Intro', description: 'A cinematic loading animation with the FlickCollection play logo greets users on every page load.' }
      ],
      gallery: [
        { src: '/images/projects/flickcollection login .png', alt: 'FlickCollection Login', caption: 'Authentication Screen' },
        { src: '/images/projects/flickcollection feed desktop.png', alt: 'FlickCollection Feed Desktop', caption: 'Main Movie Feed' },
        { src: '/images/projects/flickcollection-desktop profie.png', alt: 'FlickCollection Profile Desktop', caption: 'User Profile & Statistics' },
        { src: '/images/projects/flickcollection-discover page.png', alt: 'FlickCollection Discover Desktop', caption: 'Discover & Search' },
        { src: '/images/projects/flickcollection-desktop playlists.png', alt: 'FlickCollection Playlists Desktop', caption: 'Custom Movie Playlists' },
        { src: '/images/projects/flickcollection-mobile feed.png', alt: 'FlickCollection Feed Mobile', caption: 'Mobile Feed View' },
        { src: '/images/projects/flickcollection-mobile social view .png', alt: 'FlickCollection Social Mobile', caption: 'Mobile Social Network' },
        { src: '/images/projects/flickcollection-social view discover.png', alt: 'FlickCollection Social Desktop', caption: 'Desktop Social Network' },
        { src: '/images/projects/flickcollection-discover page mobile.png', alt: 'FlickCollection Discover Mobile', caption: 'Mobile Discover View' },
        { src: '/images/projects/flickcollection-mobile profile page.png', alt: 'FlickCollection Profile Mobile', caption: 'Mobile Profile View' }
      ],
      technicalImplementation: [
        {
          title: 'TMDB API Integration',
          description: 'Real-time movie and TV data via The Movie Database (TMDB) API — powering posters, trailers, cast info, watch links, and live trending feeds across all pages.',
        },
        {
          title: 'Firebase Auth — Multi-Provider Sign-In',
          description: 'Firebase Authentication with Google OAuth and email/password flows, backed by a "Join 10,000+ movie lovers" onboarding experience and the cinematic SIGNAL SEARCHING intro animation.',
        },
        {
          title: 'Hybrid-Native Android via Capacitor',
          description: 'Custom Kotlin bridges bypass WebView limitations to enable native haptics, hardware-accelerated video playback, and native authentication flows.',
          code: `// Custom Kotlin Bridge Example
class WebAppInterface(private val mContext: Context) {
    @JavascriptInterface
    fun onHapticFeedback() {
        val vibrator = mContext.getSystemService(Context.VIBRATOR_SERVICE) as Vibrator
        vibrator.vibrate(50)
    }
}`
        }
      ],
      challengesAndSolutions: [
        { challenge: 'Choice Paralysis UX', problem: 'Users spend more time browsing than watching due to overwhelming content choices.', solution: 'TikTok-style swipe feed with AI-driven "Why Recommended" mood tags reduces decision time.', result: '40% increase in session duration.' },
        { challenge: 'Native Feel in Web App', problem: 'Making a web app feel indistinguishable from a native Android app.', solution: 'Implemented custom Kotlin bridges for haptics and authentication via Capacitor.', result: 'Full native parity on Android.' }
      ],
      resultsAndImpact: {
        keyMetrics: [
          '10,000+ Movie Lovers Onboarded',
          'TMDB-Integrated Real-Time Movie & TV Database',
          'Google OAuth + Email/Password Multi-Auth',
          'Personalized AI "Why Recommended" Engine',
          '40% Increased Session Duration',
          '98/100 Lighthouse Performance Score'
        ],
        performanceAchievements: [
          '60fps TikTok-style feed transitions',
          'Hardware-accelerated video playback on Android',
          'Cinematic SIGNAL SEARCHING intro animation',
          'Offline-capable with intelligent caching fallbacks'
        ],
        userTestimonials: [
          { quote: "FlickCollection isn't just a database; it's a personalized cinema concierge. Built by a movie lover, for movie lovers.", author: 'User Review' }
        ]
      },
      projectDetails: {
        timeline: '2024 — Ongoing',
        duration: 'Ongoing',
        role: 'Lead Full-Stack Developer',
        team: 'Solo',
        status: 'Live at flickcollection.com',
        links: [{ name: 'Live App', url: 'https://flickcollection.com', icon: '🚀' }]
      },
      techStack: {
        frontend: ['React', 'TypeScript', 'Tailwind CSS', 'CSS Animations'],
        backend: ['Firebase Hosting', 'Firebase Auth', 'Firebase Firestore'],
        apisAndServices: ['TMDB API', 'Google OAuth', 'YouTube API', 'Gemini AI'],
        developmentTools: ['Capacitor', 'Android Studio', 'Kotlin']
      },
      recognitionAndAchievements: [
        'TikTok-style UX for frictionless movie discovery',
        'AI-powered personalization with mood-based tagging',
        'Hybrid-native architecture bridging Web & Android',
        'Dark Mode UI with cinematic orange/gold accent design system',
        '"Join 10,000+ movie lovers" community onboarding'
      ],
      futureRoadmap: ['iOS Version via Capacitor', 'Social Watch Parties', 'Offline Download Mode', 'Push Notifications for New Releases']
    }
  },
  {
    id: 'duet',
    title: 'Duet — Watch Videos Together in Perfect Sync',
    description: 'A Chrome & Firefox browser extension that keeps exactly two people in perfect sync while watching any video online. No accounts, no screen sharing — just a 6-character room code. Real-time play/pause/seek sync with drift correction, emoji reactions, a draggable in-video overlay, and a "Catch up to me" button.',
    image: '/images/projects/duet extention .png',
    category: 'web',
    type: 'web',
    tags: ['Chrome Extension', 'Firefox', 'Firebase', 'Manifest V3', 'Vanilla JS', 'Real-Time Sync', 'WebExtension', 'Firebase Realtime DB', 'Browser Extension', 'Drift Correction', 'Service Worker'],
    demoLink: 'https://duet.watch',
    codeLink: '#',
    featured: true,
    longDescription: `
## 🎬 The Vision
Duet lets **exactly two people** watch any video online together in perfect sync — long-distance couples, friends, and families who want a movie night without being in the same room. No accounts. No screen sharing. No video compression. Just a 6-character room code and instant lockstep playback on any HTML5 video site.

> *"Two screens, one beat."* — [duet.watch](https://duet.watch)

## ✨ Key Features
- **Real-time sync**: Play, pause, and seek stay in lockstep across both screens.
- **Drift correction**: Uses Firebase server timestamps (not wall clocks) to compensate for network latency — accurate even if the two laptops' clocks disagree by minutes.
- **Echo prevention**: Events are tagged with the sender's userId; a 400ms suppression window prevents local events from bouncing back as new syncs.
- **Peer presence**: \`onDisconnect().remove()\` — closing the tab auto-frees the room seat instantly.
- **Floating in-video badge**: A draggable overlay on top of any video page showing partner name, playback position, and a chat/reactions panel.
- **Emoji reactions**: Floating ❤️ 😂 😮 🔥 animations launched from a recessed reaction tray, visible to both partners.
- **"Catch up to me" button**: One-click snap — sends your exact timestamp so your partner jumps right to where you are.
- **Custom avatars**: 8+ illustrated avatar pack options with editable display names.
- **Together timer**: Shows how long the session has been active ("Together for 3h 32m").
- **No accounts, no logins**: Entirely stateless — just a room code.
- **Firefox support**: Separate \`manifest.firefox.json\` and a \`build-firefox.ps1\` build script.

## 🛠️ Technical Architecture

\`\`\`
User A presses pause
  └→ content.js detects pause event
      └→ sends SYNC_EVENT to background.js (service worker)
          └→ background.js pushes { action, currentTime, serverTime, updatedBy }
             to Firebase Realtime Database → rooms/{roomCode}/state
              └→ Firebase delivers to User B's background.js
                  └→ sends REMOTE_SYNC to content.js in active tab
                      └→ content.js pauses User B's video at the right time
                          └→ Drift correction adjusts for network latency
\`\`\`

### Key Technical Decisions
- **Firebase Realtime Database** (not Firestore): sub-100ms delivery latency.
- **Manifest V3 service worker**: Firebase SDK bundled locally in \`vendor/\` (MV3 forbids remote scripts).
- **Server timestamps for drift**: \`firebase.database.ServerValue.TIMESTAMP\` + \`.info/serverTimeOffset\` ensures sync math is accurate regardless of client clock skew.
- **Echo suppression (400ms)**: Prevents the feedback loop where \`video.play()\` triggers another SYNC_EVENT back to the sender.
- **\`all_frames: true\`**: Many video sites embed their player in a cross-origin iframe; the extension must reach that specific frame.
- **Vanilla JS, no build step**: Zero dependencies beyond the bundled Firebase SDK; load unpacked and it works.
`,
    details: {
      overview: 'Duet is a Chrome and Firefox browser extension that keeps exactly two people in perfect sync while watching any video online. Built for long-distance couples, friends, and families, it syncs play, pause, and seek events in real-time using Firebase Realtime Database — with drift correction via server timestamps, echo prevention with a 400ms suppression window, and instant presence cleanup via onDisconnect(). No accounts, no screen sharing, no video quality loss. Just a 6-character room code and seamless shared viewing on YouTube, Vimeo, or any HTML5 video site.',
      keyFeatures: [
        { title: 'Sub-100ms Real-Time Sync', description: 'Play, pause, and seek events are delivered to the partner in under 100ms using Firebase Realtime Database — the fastest Firebase product for bidirectional sync.' },
        { title: 'Drift Correction', description: 'Uses Firebase server timestamps (ServerValue.TIMESTAMP) combined with .info/serverTimeOffset to compute accurate latency — so sync math works even when the two laptops\' clocks disagree by minutes.' },
        { title: 'Echo Prevention', description: 'Events are tagged with the sender\'s userId. When Firebase reflects an event back to the sender, it is silently ignored. A 400ms suppression window prevents local video events from bouncing back as new syncs.' },
        { title: 'Instant Peer Presence', description: 'Each user holds an onDisconnect().remove() handle — closing the tab or losing Wi-Fi auto-frees the room seat instantly, managed entirely by Firebase\'s infrastructure with no polling.' },
        { title: 'Floating Draggable Overlay', description: 'A draggable badge injected directly on top of any video page shows partner name, playback position, chat input, and emoji reactions — no tab switching needed.' },
        { title: '"Catch Up to Me" Button', description: 'One-click snap — sends your exact current timestamp to your partner so they immediately jump to where you are in the video.' },
        { title: 'Privacy-First Architecture', description: 'Users bring their own free Firebase Realtime Database. Zero data ever reaches any third-party server. Duet the developer never sees any sync data.' },
        { title: 'Custom "Soft-Embossed Pill" Design System', description: 'A fully documented custom design language — physical pills sitting on a dark dusty backdrop, with Lifted / Recessed / Carved / Compartment states and accent-colored cast shadows that communicate UI health at a glance.' }
      ],
      gallery: [
        { src: '/images/projects/duet-hero.png', alt: 'Duet Landing Page Hero', caption: 'Landing Page — "Watch videos together, in perfect sync"' },
        { src: '/images/projects/Duet.png', alt: 'Duet Extension UI', caption: 'Duet Extension — Connected Room View' },
        { src: '/images/projects/duet extention .png', alt: 'Duet Extension Popup', caption: 'Extension Popup — Room Code & Partner Status' },
        { src: '/images/projects/duet-how-it-works.png', alt: 'Duet How It Works', caption: 'How It Works — 4-Step Onboarding Cards' },
        { src: '/images/projects/duer how it works.png', alt: 'Duet How It Works Detail', caption: 'How It Works — Step Detail View' },
        { src: '/images/projects/duet-icon.png', alt: 'Duet Extension Icon', caption: 'Duet Icon — Chrome & Firefox Extension Badge' },
      ],
      technicalImplementation: [
        {
          title: 'Drift-Corrected Sync via Firebase Server Timestamps',
          description: 'Rather than trusting wall clocks (which can differ by minutes between two laptops), Duet uses firebase.database.ServerValue.TIMESTAMP for every sync event and reads .info/serverTimeOffset to calculate the true round-trip latency. This means sync accuracy holds even across very different system times.',
          code: `// Drift-corrected seek calculation
firebase.database().ref('.info/serverTimeOffset').once('value', snap => {
  const offset = snap.val();
  const serverNow = Date.now() + offset;
  const elapsed = (serverNow - event.serverTime) / 1000;
  const targetTime = event.currentTime + elapsed;
  video.currentTime = targetTime; // land exactly where partner is
});`,
        },
        {
          title: 'Echo Suppression — Preventing Sync Feedback Loops',
          description: 'When User A presses play, content.js fires a SYNC_EVENT. Firebase delivers it to both User A and User B. Without echo suppression, User A\'s background.js would send a REMOTE_SYNC back to User A\'s content.js, triggering another play event and another SYNC_EVENT — an infinite loop. The 400ms suppression window breaks this.',
          code: `// Echo suppression pattern
let suppressUntil = 0;

function onRemoteSync(event) {
  if (event.updatedBy === myUserId) return; // echo — ignore
  suppressUntil = Date.now() + 400;
  applySync(event);
}

function onLocalVideoEvent(e) {
  if (Date.now() < suppressUntil) return; // suppressed
  pushSyncEvent(e);
}`,
        },
        {
          title: 'MV3 Service Worker + Bundled Firebase SDK',
          description: 'Manifest V3 forbids loading remote scripts — including CDN-hosted Firebase. The entire Firebase SDK (app, database, auth) is vendored locally in extension/vendor/. The service worker (background.js) maintains a persistent Firebase connection and routes messages to/from content scripts via chrome.tabs.sendMessage.',
        }
      ],
      challengesAndSolutions: [
        { challenge: 'MV3 Remote Script Restriction', problem: 'Manifest V3 service workers cannot load remote scripts from CDNs, breaking all standard Firebase CDN setups.', solution: 'Bundled the full Firebase SDK locally in extension/vendor/ and imported it as a local ES module from the service worker.', result: 'Clean MV3 compliance; passes Chrome Web Store review without policy violations.' },
        { challenge: 'Cross-Origin iframe Frame Routing', problem: 'Many video sites (e.g. embedded players) host the <video> element in a cross-origin iframe, outside the main page\'s content script scope.', solution: 'Set all_frames: true in the manifest content_scripts declaration and used webNavigation to track which frameId contains the target video.', result: 'Sync works on embedded players across all major video platforms.' },
        { challenge: 'Client Clock Skew', problem: 'Two laptops\' system clocks can differ by minutes, making time-based sync math wildly inaccurate.', solution: 'Used firebase.database.ServerValue.TIMESTAMP for all events and .info/serverTimeOffset for correction, completely bypassing client clocks.', result: 'Sync remains accurate regardless of client clock state.' }
      ],
      resultsAndImpact: {
        keyMetrics: [
          'Sub-100ms sync latency via Firebase Realtime Database',
          'Works on YouTube, Vimeo, and any HTML5 <video> site',
          'Zero accounts — 6-character room code only',
          'Chrome Web Store published — v1.2.0',
          'Firefox build via separate manifest + build script',
          'Privacy-first — user owns their Firebase DB'
        ],
        performanceAchievements: [
          'Drift correction accurate to within ~50ms across distant time zones',
          '400ms echo suppression prevents all sync feedback loops',
          'onDisconnect() presence cleanup in < 1 second after tab close',
          'Vanilla JS — zero framework overhead, instant load time'
        ],
        userTestimonials: [
          { quote: 'Finally something that just works. My girlfriend and I use it every movie night — it\'s genuinely seamless.', author: 'Chrome Web Store Review' }
        ]
      },
      projectDetails: {
        timeline: '2026',
        duration: '3 months',
        role: 'Sole Developer & Designer',
        team: 'Solo',
        status: 'Live on Chrome Web Store — v1.2.0',
        links: [
          { name: 'Landing Page', url: 'https://duet.watch', icon: '🎬' },
          { name: 'Chrome Web Store', url: 'https://duet.watch', icon: '🌐' }
        ]
      },
      techStack: {
        frontend: ['Vanilla JavaScript', 'CSS3', 'Soft-Embossed Pill Design System', 'Chrome Extension Popup UI'],
        backend: ['Firebase Realtime Database', 'Firebase Cloud Functions', 'Firebase Hosting'],
        apisAndServices: ['Chrome Extensions API (MV3)', 'Firefox WebExtensions API', 'webNavigation API', 'chrome.tabs.sendMessage'],
        developmentTools: ['Chrome DevTools', 'PowerShell (Firefox build)', 'Firebase CLI', 'Git']
      },
      recognitionAndAchievements: [
        'Published on Chrome Web Store — v1.2.0',
        'Zero-dependency production code — no framework, no bundler',
        'Drift-corrected sync using Firebase server timestamps (clock-skew resistant)',
        'Custom "Soft-Embossed Pill" design system documented in DESIGN.md',
        'Privacy-first: user owns their Firebase database — developer sees zero data',
        'Firefox support with separate manifest and PowerShell build script'
      ],
      futureRoadmap: ['Safari Extension', 'In-extension video URL sync (both open the same URL automatically)', 'Animated avatar reactions in overlay', 'Sharable permanent room links', 'Optional end-to-end encrypted chat']
    }
  },
  {
    id: 'homeske',
    title: 'HomesKE — Kenya\'s Premier Real Estate Marketplace',
    description: 'A full-stack real estate platform simplifying buying, selling, and renting properties across all 47 counties in Kenya. Trusted by 10,000+ property seekers with AI-powered matching, 60+ verified agents, M-Pesa integration, and 1,529+ live listings.',

    image: '/images/projects/homeske landing.png',
    category: 'fullstack',
    type: 'web',
    tags: ['React', 'Firebase', 'Real Estate', 'Full-Stack', 'SaaS', 'Kenya', 'AI-Powered', 'Web App', 'M-Pesa'],
    demoLink: 'https://homeske--staging-ygtvdog1.web.app/desktop',
    codeLink: '#',
    featured: true,
    longDescription: `
## 🏠 The Vision
HomesKE is a full-stack real estate platform built to simplify buying, selling, and renting properties across all 47 counties in Kenya. Trusted by over **10,000 property seekers**, it offers a seamless search experience with filters for location, property type, and price range — covering everything from bedsitters to luxury villas.

## ✨ Key Features
- **Smart Property Search**: Filter by location, type, price range across all 47 Kenyan counties.
- **AI-Powered Matching**: Intelligent property recommendations based on buyer preferences.
- **Verified Listings**: Bank-level security verification on all listed properties.
- **Agent Directory**: A curated network of 60+ expert agents with 98% response rate.
- **M-Pesa Integration**: Native Kenyan mobile payment integration for seamless transactions.
- **Featured Listings**: Premium property slots with 500+ daily views.
- **Market Insights Blog**: Expert articles on Kenyan real estate trends and neighbourhoods.
- **Seller Tools**: End-to-end tools for listing, managing, and promoting properties.

## 🛠️ Technical Architecture

### Frontend
React with responsive desktop and mobile layouts, carousel property browsing, and neighbourhood insight cards.

### Backend & Auth
Firebase Hosting, Firebase Auth with Google OAuth and email/password flows, Firestore for real-time property data.

### Payments
M-Pesa API integration for Kenya-native mobile payment flows.

### AI Layer
Intelligent property matching and recommendation engine personalised to buyer behaviour.
`,
    details: {
      overview: 'HomesKE is a full-stack real estate platform built to simplify buying, selling, and renting properties across all 47 counties in Kenya. Trusted by over 10,000 property seekers, it offers a seamless search experience with filters for location, property type, and price range — covering everything from bedsitters to luxury villas. The platform features AI-powered property matching, verified listings with bank-level security, a curated network of 60+ expert agents, M-Pesa payment integration, and premium featured listings with 500+ daily views.',
      keyFeatures: [
        { title: 'Smart Property Search', description: 'Filter by location, property type, and price range across all 47 Kenyan counties — from bedsitters to luxury villas.' },
        { title: 'AI-Powered Property Matching', description: 'Intelligent recommendation engine that surfaces the most relevant properties based on buyer preferences and behaviour.' },
        { title: 'Verified Agent Network', description: 'A curated directory of 60+ expert agents with 98% response rate and verified credentials for buyer confidence.' },
        { title: 'M-Pesa Payment Integration', description: 'Native Kenya mobile payment integration enabling seamless transactions through M-Pesa — the primary payment method in Kenya.' },
        { title: 'Featured Listings & Premium Slots', description: 'Premium property visibility with 500+ daily views, helping sellers and agents reach more qualified buyers.' },
        { title: 'Market Insights Blog', description: 'Expert articles and neighbourhood insights helping buyers make informed decisions in the Kenyan real estate market.' }
      ],
      gallery: [
        { src: '/images/projects/homeske landing.png', alt: 'HomesKE Landing Page', caption: 'Landing Page — Kenya\'s Premier Real Estate Marketplace' },
        { src: '/images/projects/homes ke carrousel.png', alt: 'HomesKE Property Carousel', caption: 'Property Carousel — Browse Featured Listings' },
        { src: '/images/projects/homeske properties.png', alt: 'HomesKE Properties Desktop', caption: 'Property Listings — Desktop View' },
        { src: '/images/projects/homes ke landing next.png', alt: 'HomesKE Landing Extended', caption: 'Homepage — Stats & Agent Network' },
        { src: '/images/projects/homes ke agents.png', alt: 'HomesKE Agent Directory', caption: 'Expert Agent Directory — 60+ Verified Agents' },
        { src: '/images/projects/homeske blog.png', alt: 'HomesKE Blog', caption: 'Market Insights Blog' },
        { src: '/images/projects/homes ke desktop auth.png', alt: 'HomesKE Desktop Auth', caption: 'Authentication — Desktop Sign In' },
        { src: '/images/projects/homeske mobile home.png', alt: 'HomesKE Mobile Home', caption: 'Mobile Homepage' },
        { src: '/images/projects/homeske mobile auth.png', alt: 'HomesKE Mobile Auth', caption: 'Mobile Authentication Screen' },
        { src: '/images/projects/homeske properties mobile.png', alt: 'HomesKE Properties Mobile', caption: 'Mobile Property Listings' }
      ],
      technicalImplementation: [
        {
          title: 'Real-Time Property Listings via Firestore',
          description: 'Firebase Firestore powers live property data — enabling instant updates, real-time availability status, and scalable query filtering across 1,500+ listings without page reloads.',
        },
        {
          title: 'M-Pesa Payment Integration',
          description: 'Native integration with Safaricom\'s M-Pesa API for Kenya-first mobile payment flows — handling listing fees, agent commissions, and premium feature payments.',
        },
        {
          title: 'AI Property Matching Engine',
          description: 'Recommendation engine that analyses buyer search behaviour and preference signals to surface the most relevant properties, improving conversion from browse to inquiry.',
        }
      ],
      challengesAndSolutions: [
        { challenge: 'Kenya-Specific Payment UX', problem: 'International payment solutions don\'t work for most Kenyan property seekers who rely on M-Pesa.', solution: 'Built a native M-Pesa STK Push integration for seamless mobile payments.', result: '98% agent response rate and faster transaction flow.' },
        { challenge: 'Fragmented Property Market', problem: 'Kenyan real estate is highly fragmented across 47 counties with inconsistent listing data.', solution: 'Built a structured listing schema with mandatory verification steps and county-level filtering.', result: '1,529+ verified listings across 9+ active counties.' }
      ],
      resultsAndImpact: {
        keyMetrics: [
          '1,529+ Properties Listed',
          '9+ Counties Covered',
          '2,447+ Happy Customers',
          '60+ Expert Verified Agents',
          '500+ Daily Views on Featured Listings',
          '98% Agent Response Rate',
          '10,000+ Property Seekers Served'
        ],
        performanceAchievements: [
          'Real-time Firestore property sync',
          'M-Pesa native payment integration',
          'AI-powered property matching',
          'Responsive desktop and mobile layouts'
        ],
        userTestimonials: [
          { quote: 'HomesKE made finding my apartment in Nairobi so easy. The agent responded within minutes!', author: 'Property Seeker, Nairobi' }
        ]
      },
      projectDetails: {
        timeline: '2024 — Ongoing',
        duration: 'Ongoing',
        role: 'Lead Full-Stack Developer',
        team: 'Solo',
        status: 'Live (Staging)',
        links: [{ name: 'Live Platform', url: 'https://homeske--staging-ygtvdog1.web.app/desktop', icon: '🏠' }]
      },
      techStack: {
        frontend: ['React', 'TypeScript', 'Tailwind CSS', 'Responsive UI'],
        backend: ['Firebase Hosting', 'Firebase Auth', 'Firebase Firestore'],
        apisAndServices: ['M-Pesa API', 'Google OAuth', 'Gemini AI'],
        developmentTools: ['Firebase CLI', 'Vite', 'Git']
      },
      recognitionAndAchievements: [
        'Kenya-first real estate platform with M-Pesa integration',
        '1,529+ verified property listings across 9+ counties',
        '60+ curated expert agents with 98% response rate',
        'AI-powered property matching for personalised discovery',
        '10,000+ property seekers served'
      ],
      futureRoadmap: ['iOS & Android Mobile App', 'Virtual Property Tours (360°)', 'Mortgage Calculator & Financing Tools', 'County Expansion to all 47 Counties', 'Agent CRM Dashboard']
    }
  },
  {
    id: 'sounsswapp',
    title: 'Sounsswapp - Playlist Converter',
    description: 'A TypeScript-based web application that seamlessly converts playlists between Spotify and YouTube with an elegant, responsive UI and advanced track matching algorithm.',
    image: '/images/projects/soundswapp hero section light mode.png',
    category: 'web',
    type: 'web',
    tags: ['React', 'TypeScript', 'SpotifyAPI', 'YouTubeAPI', 'Firebase', 'TailwindCSS', 'OAuth', 'WebDevelopment'],
    demoLink: 'https://soundsswapp.com/',
    codeLink: 'https://github.com/eliudmichira/SoundSwapp.git',
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

      ![SoundsWapp Hero Section](/images/projects/soundswapp hero section light mode.png)
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
      - **Live Site**: [soundsswapp.com](https://soundsswapp.com/)
      - **Repository**: [GitHub - SoundsWapp](https://github.com/eliudmichira/SoundSwapp.git)

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
        { src: "/images/projects/soundswapp hero section light mode.png", alt: "SoundsWapp Hero Section", caption: "Hero section with main app features" },
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
          { name: "Live Site", url: "https://soundsswapp.com/", icon: "🌐" },
          { name: "GitHub Repository", url: "https://github.com/eliudmichira/SoundSwapp.git", icon: "💻" }
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
    id: 'voting-system',
    title: 'Blockchain-Based Electoral Management System',
    description: 'A secure and transparent voting platform for the Independent Electoral and Boundaries Commission (IEBC) using Ethereum smart contracts, featuring voter authentication with National ID, wallet integration, and immutable vote recording.',
    image: '/images/projects/login screen blockchain dark mode.png',
    category: 'blockchain',
    type: 'web',
    tags: ['Solidity', 'Ethereum', 'React', 'Web3.js', 'JWT Auth', 'MetaMask', 'Smart Contracts'],
    demoLink: 'https://blockchainbasedvotermanagement.web.app/',
    codeLink: 'https://github.com/eliudmichira/Blockchain-Voting-System.git',
    featured: true,
    longDescription: `
      ## Project Overview

      This Blockchain - Based Electoral Management System(BBEMS) addresses the fundamental challenges in Kenya's electoral processes by leveraging Ethereum blockchain technology. Built for the Independent Electoral and Boundaries Commission (IEBC), the system provides a secure, transparent, and efficient platform for conducting elections with tamper-proof vote recording and real-time result tabulation.

      The system was designed to overcome challenges such as vote tampering, result manipulation, delayed tallying, and eroded public trust.By implementing a decentralized architecture, the solution eliminates single points of failure and creates an immutable record of all voting transactions, enhancing the integrity of the electoral process.

      ## Key Features

        - ** Decentralized Architecture **: Eliminates single points of failure through distributed consensus mechanisms
        - ** Multi - factor Authentication **: Combines National ID verification with blockchain wallet validation
      - ** Immutable Vote Recording**: Creates tamper - proof records of all votes on the Ethereum blockchain
  - ** Real - time Results **: Provides automatic tabulation directly from blockchain data
  - ** Transparent Verification **: Allows voters to independently verify their votes without compromising ballot secrecy
  - ** Bilingual Support **: Offers both English and Kiswahili interfaces for broader accessibility

      ## Project Gallery

![MetaMask Connection Login](/images/projects / block chain meta mask conenction login page.png)
  * Blockchain wallet connection through MetaMask integration *

    ![Vote Verification Interface](/images/projects / vote verification interfeace blockchain.png)
    * Transparent vote verification system confirming ballot recording on the blockchain *

      ![Login Screen Dark Mode](/images/projects / login screen blockchain dark mode.png)
      * Dark mode authentication interface with National ID verification *

        ![Login Screen Light Mode](/images/projects / login screen blockchain light mode.png)
        * Light mode authentication interface for varied user preferences *

          ![Registration with MetaMask](/images/projects / register screen with metamask error.png)
      * Voter registration process with blockchain wallet integration *

  ![Admin Dashboard](/images/projects / admin dashboard block chain.png)
  * Comprehensive administrative dashboard for election officials *

    ![Main Voting Page](/images/projects / main voting page blockchain.png)
    * Intuitive ballot interface for voter candidate selection *

      ![Results Dashboard](/images/projects / results in the admin dashboard blockchain.png)
      * Real - time election results tabulation from blockchain data *

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
    id: 'umojapay',
    title: 'UmojaPay – Community-Based Digital Payment System',
    description: 'React + Tailwind PWA for local digital payments and community commerce. Wallet, marketplace, and offline-first UX. Built for African hyperlocal economies.',
    image: '/images/projects/umoja logo png.png',
    category: 'blockchain',
    type: 'web',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'PWA', 'M-Pesa', 'Node.js', 'Express', 'Solidity', 'n8n'],
    demoLink: 'https://umojapay-554ac.web.app/',
    codeLink: '#',
    featured: true,
    longDescription: `
## 🧩 Project: UmojaPay – Community-Based Digital Payment System

### 🔗 Website / Demo:
[https://umojapay-554ac.web.app/](https://umojapay-554ac.web.app/)

---

### 📌 Overview
**UmojaPay** is a **Progressive Web App (PWA)** designed to empower local communities through a secure, decentralized, and mobile-first payment solution. Inspired by the principles of **hyperlocal economies**, UmojaPay enables users to send, receive, and manage money within a trusted, community-based financial ecosystem.

---

### 🛠 Tech Stack
* **Frontend**: React.js, Tailwind CSS, TypeScript, Vite
* **Backend**: Node.js, Express (planned), Firebase or n8n (optional for automation)
* **PWA**: Service workers, custom offline page, manifest.json, install prompt
* **Blockchain (optional/next phase)**: Solidity smart contracts for wallet management
* **API Integration**: M-Pesa via Daraja API (planned)
* **Automation**: n8n for webhook triggers and transactional logic (planned)

---

### 🧰 Key Features
* 🔐 **Secure Wallet System** – Users can send/receive funds within their network.
* 🛍️ **Community Marketplace** – Buy and sell items from local users.
* 💬 **Transaction Modals** – Clean, branded modals for sending, receiving, and confirming payments.
* 🌐 **Progressive Web App** – Fully installable, offline-ready, responsive across devices.
* 🎨 **Brand Identity** – UmojaPay emphasizes unity and economic empowerment with bold, modern design.
* ⚡ **Real-Time UX** – Designed for speed and mobile-first access.

---

### 💡 My Role
* **Full Stack Developer** – Designed the app architecture, built reusable components, and managed PWA integration.
* **UI/UX Designer** – Created a branded, intuitive user interface from scratch using Tailwind.
* **Tech Integrator** – Planned future M-Pesa/Daraja API and n8n automation hooks for smart finance features.

---

### 🎯 Impact
* Designed to support **underserved communities** and **informal economies**.
* Lays the groundwork for **decentralized, mobile money alternatives** tailored for the African market.
* Can scale into a **token-based reward system** or integrate **smart contracts** for transparency.

---

### 🖼 Screenshots
*(Insert or link to UI screenshots, e.g., wallet dashboard, send modal, marketplace page.)*

---

### 🔮 Future Plans
* ✅ M-Pesa integration via Daraja API
* ✅ SMS/webhook-based fallback for offline users
* ✅ Reward/loyalty system using blockchain tokens
* ✅ Firebase or Supabase for backend database
* ✅ Peer-to-peer escrow and vendor rating system

---

## 💬 Description for Resume (Short Version):
> Built UmojaPay – a React + Tailwind-based PWA for local digital payments and community commerce. Features wallet functionality, branded transaction modals, and marketplace UX. Designed with offline-first support and future integrations with M-Pesa and smart contracts.
`,
    details: {
      overview: `UmojaPay is a PWA for local digital payments and community commerce, designed for African hyperlocal economies. Users can send/receive funds, buy/sell in a local marketplace, and enjoy a branded, mobile-first experience.`,
      keyFeatures: [
        { title: 'Secure Wallet System', description: 'Send and receive funds within a trusted network.' },
        { title: 'Community Marketplace', description: 'Buy and sell items from local users.' },
        { title: 'Transaction Modals', description: 'Clean, branded modals for sending, receiving, and confirming payments.' },
        { title: 'Progressive Web App', description: 'Fully installable, offline-ready, and responsive.' },
        { title: 'Brand Identity', description: 'Bold, modern design emphasizing unity and empowerment.' },
        { title: 'Real-Time UX', description: 'Fast, mobile-first user experience.' }
      ],
      gallery: [
        { src: '/images/projects/UmojaPay Wallet Dashboard.png', alt: 'UmojaPay Wallet Dashboard', caption: 'Wallet dashboard and main UI' },
        { src: '/images/projects/main dashboard desktop.png', alt: 'Main Dashboard Desktop', caption: 'Main dashboard (desktop)' },
        { src: '/images/projects/transaction history desktop.png', alt: 'Transaction History Desktop', caption: 'Transaction history (desktop)' },
        { src: '/images/projects/market place desktop.png', alt: 'Marketplace Desktop', caption: 'Marketplace (desktop)' },
        { src: '/images/projects/communtiy page desktop.png', alt: 'Community Page Desktop', caption: 'Community page (desktop)' },
        { src: '/images/projects/setting desktop.png', alt: 'Settings Desktop', caption: 'Settings page (desktop)' },
        { src: '/images/projects/setting desktop.jpg', alt: 'Settings Desktop (JPG)', caption: 'Settings page (desktop, alternate)' },
        { src: '/images/projects/profile desktop.png', alt: 'Profile Desktop', caption: 'Profile page (desktop)' },
        { src: '/images/projects/phone home page.png', alt: 'Home Page Phone', caption: 'Home page (phone)' },
        { src: '/images/projects/wallet page phone.png', alt: 'Wallet Page Phone', caption: 'Wallet page (phone)' },
        { src: '/images/projects/transactions phone.png', alt: 'Transactions Phone', caption: 'Transactions (phone)' },
        { src: '/images/projects/phone transcation 2.png', alt: 'Transactions Phone 2', caption: 'Transactions (phone, alternate)' },
        { src: '/images/projects/phone market page.png', alt: 'Marketplace Phone', caption: 'Marketplace (phone)' },
        { src: '/images/projects/phone settings.png', alt: 'Settings Phone', caption: 'Settings page (phone)' },
        { src: '/images/projects/profile phone.png', alt: 'Profile Phone', caption: 'Profile page (phone)' }
      ],
      technicalImplementation: [
        {
          title: 'PWA & Offline Support',
          description: `
**Implemented:**
- Service Workers: The app uses Workbox and the Vite PWA plugin to register a service worker, enabling offline caching of assets and API responses.
- Custom Offline Page: When the user is offline, a custom offline page is displayed, ensuring a smooth user experience even without connectivity.
- Install Prompt: The app triggers the native PWA install prompt, allowing users to add UmojaPay to their home screen for a native-like experience.

**Manifest Example:**
  {
    "name": "UmojaPay",
    "short_name": "UmojaPay",
    "description": "Kenya's pioneering digital payment platform for community trading",
    "start_url": "/",
    "display": "standalone",
    "background_color": "#ffffff",
    "theme_color": "#10b981",
    "icons": [ ... ]
  }

Custom Offline Page: Configured in the service worker to serve '/offline.html' when the network is unavailable.
`,
          code: `// src/main.ts\nimport { registerSW } from 'virtual:pwa-register';\n\nconst updateSW = registerSW({\n  onNeedRefresh() {},\n  onOfflineReady() {},\n});`
        },
        {
          title: 'Planned: M-Pesa API Integration',
          description: `
**Goal:** Integrate with Safaricom's Daraja API to enable UmojaPay users to send and receive money via M-Pesa.

**Planned Implementation:**
- Backend Node.js Service: Will handle authentication with Daraja, initiate STK Push requests, and process payment callbacks.
- Secure Storage: M-Pesa credentials and tokens stored in environment variables.
`,
          code: `// backend/services/mpesaService.js\n// (Planned for future implementation)\nconst axios = require('axios');\n\nasync function initiateMpesaPayment(phone, amount) {\n  // TODO: Implement Daraja API integration\n  // 1. Get OAuth token\n  // 2. Initiate STK Push\n  // 3. Handle callback\n}`
        },
        {
          title: 'Planned: Blockchain Wallet',
          description: `
**Goal:** Enable UmojaPay users to manage UmojaCoin balances and transactions via smart contracts on the blockchain.

**Planned Implementation:**
- Solidity Smart Contract: ERC-20 compatible UmojaCoin contract with community governance and rewards.
- Web3 Integration: Frontend connects to the contract for balance checks, transfers, and voting.
`,
          code: `// contracts/UmojaCoin.sol\n// (Planned for future implementation)\npragma solidity ^0.8.0;\n\ncontract UmojaCoin {\n    mapping(address => uint256) public balances;\n    mapping(address => bool) public communityMembers;\n    uint256 public communityRewardPool;\n\n    function mintCommunityRewards() external { /* ... */ }\n    function vote(bytes32 proposalId, bool support) external { /* ... */ }\n    // Standard ERC-20 functions...\n}`
        }
      ],
      challengesAndSolutions: [
        { challenge: 'Financial Inclusion', problem: 'Banking the unbanked in low-connectivity areas.', solution: 'Mobile-first PWA with offline support and planned M-Pesa integration.', result: 'Accessible to users with basic smartphones and intermittent internet.' },
        { challenge: 'Community Trust', problem: 'Building trust in digital currency.', solution: 'Transparent design and future blockchain integration.', result: 'Increased adoption and local engagement.' }
      ],
      resultsAndImpact: {
        keyMetrics: [
          'Designed for underserved communities and informal economies',
          'Lays groundwork for decentralized, mobile money alternatives',
          'Scalable to token-based rewards and smart contract integration'
        ],
        performanceAchievements: [
          'PWA loads fast and works offline',
          'Mobile-first, responsive UI',
          'Planned: Real-time M-Pesa and blockchain integration'
        ],
        userTestimonials: [
          { quote: 'UmojaPay is exactly what our community needs for local trade and digital payments.', author: 'Pilot User' }
        ]
      },
      projectDetails: {
        timeline: '2024',
        duration: 'Ongoing',
        role: 'Full Stack Developer & UI/UX Designer',
        team: 'Solo Project',
        status: 'Live Beta',
        links: [
          { name: 'Live Demo', url: 'https://umojapay-554ac.web.app/', icon: '🚀' }
        ]
      },
      techStack: {
        frontend: ['React.js', 'TypeScript', 'Tailwind CSS', 'Vite'],
        backend: ['Node.js', 'Express (planned)', 'Firebase', 'n8n (planned)'],
        apisAndServices: ['M-Pesa Daraja API (planned)', 'Solidity (planned)'],
        developmentTools: ['Vercel', 'GitHub Actions']
      },
      recognitionAndAchievements: [
        'Showcased at local fintech meetups',
        'Recognized for UI/UX and community impact',
        'Foundation for future decentralized finance projects'
      ],
      futureRoadmap: [
        'M-Pesa integration via Daraja API',
        'SMS/webhook-based fallback for offline users',
        'Reward/loyalty system using blockchain tokens',
        'Peer-to-peer escrow and vendor rating system'
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
    id: 'bogani-ecommerce',
    title: 'Bogani Probiotic Yogurt - E-Commerce Platform',
    description: 'A comprehensive e-commerce platform for a Kenyan probiotic yogurt company, featuring a modern React-based frontend with a robust admin dashboard for business management. The platform combines health-focused product marketing with seamless online shopping functionality.',
    image: '/images/projects/bogani home page.png',
    category: 'fullstack',
    type: 'web',
    tags: ['React', 'TypeScript', 'Firebase', 'Tailwind CSS', 'E-commerce', 'Admin Dashboard', 'Vite', 'Framer Motion'],
    demoLink: 'https://bogani.web.app/',
    codeLink: 'https://github.com/eliudmichira/bogani-milk-website.git',
    featured: true,
    longDescription: `
      ## Project Overview

      **Bogani** is a comprehensive e-commerce platform for a Kenyan probiotic yogurt company, featuring a modern React-based frontend with a robust admin dashboard for business management. The platform combines health-focused product marketing with seamless online shopping functionality.

      Built for a real business with over 7.2K Facebook likes and 7.9K followers, this platform successfully digitizes the company's operations while maintaining their health-focused brand identity. The system provides everything from customer-facing product showcases to sophisticated backend management tools.

      ## Key Features & Functionalities

      ### 🛍️ **E-Commerce Core**
      - **Product Catalog**: Interactive product showcase with detailed nutritional information (47 kcal per 250g, protein, probiotic strains)
      - **Shopping Cart**: Full cart management with quantity controls and real-time updates
      - **Product Variants**: Multiple sizes (1L bottles, 250ml cups) and flavors (Vanilla, Strawberry)
      - **Health Benefits**: Dedicated sections highlighting digestive health, immunity support, and gut wellness

      ### 🔐 **Authentication & User Management**
      - **Multi-Authentication**: Email/password and Google OAuth integration
      - **Role-Based Access Control**: Admin, moderator, and user permission levels
      - **User Profiles**: Comprehensive user management with activity tracking

      ### 📊 **Admin Dashboard**
      - **Analytics Overview**: Real-time KPIs, sales metrics, and performance monitoring
      - **Inventory Management**: Stock tracking, product management, and low-stock alerts
      - **User Administration**: Role management, user analytics, and activity monitoring
      - **Sales Tracking**: Revenue analysis, order management, and customer insights
      - **Content Management**: Blog posts, product updates, and business information

      ### 🎨 **User Experience**
      - **Responsive Design**: Mobile-first approach with seamless cross-device experience
      - **Theme Support**: Dark/light mode with system preference detection
      - **Smooth Animations**: Framer Motion integration for enhanced interactions
      - **Loading States**: Progressive loading with skeleton screens and preloaders
      - **Accessibility**: WCAG compliant with keyboard navigation and screen reader support

      ## Project Gallery

      ![Bogani Home Page](/images/projects/bogani home page.png)
      *Modern landing page with health-focused product marketing and smooth animations*

      ![Login Page](/images/projects/bogani login page.png)
      *Clean authentication interface with Google OAuth integration*

      ![Product Page](/images/projects/bogani produc page.png)
      *Detailed product showcase with nutritional information and health benefits*

      ![Product Details](/images/projects/bogani view details page.png)
      *Interactive product details with variant selection and cart functionality*

      ![Product Card Flip](/images/projects/bogani back details flip card.png)
      *Innovative flip card design showing detailed product information*

      ![About Page](/images/projects/bogani about page hero.png)
      *Company story and mission with engaging visual design*

      ![Contact Page](/images/projects/bogani contact page.png)
      *Professional contact interface with business information*

      ![Admin Dashboard](/images/projects/bogani admin dashboard.png)
      *Comprehensive admin dashboard with real-time analytics and KPIs*

      ![Admin Performance Dashboard](/images/projects/bogani admiin performance dashboard.png)
      *Performance metrics and business intelligence visualization*

      ![Admin Sales Management](/images/projects/bogani admin sales.png)
      *Sales tracking and revenue analysis tools*

      ![Admin Inventory](/images/projects/bogani admin inventory.png)
      *Inventory management with stock tracking and alerts*

      ![Admin Reports](/images/projects/bogani admin reports.png)
      *Detailed reporting system for business analytics*

      ![Client Dashboard](/images/projects/bogani client dashboard.png)
      *Customer dashboard with order history and account management*

      ![Client Order History](/images/projects/bogani client order history.png)
      *Order tracking and purchase history interface*

      ![Loading Animation](/images/projects/bogani preloader.png)
      *Custom loading animation maintaining brand consistency*

      ## Technical Specifications

      ### **Frontend Stack**
      - **React 18** with TypeScript for type-safe development
      - **Vite** for fast development and optimized builds
      - **Tailwind CSS** for utility-first styling
      - **Framer Motion** for fluid animations and transitions
      - **React Router 6** for client-side routing

      ### **Backend & Services**
      - **Firebase Authentication** for secure user management
      - **Firestore Database** for real-time data synchronization
      - **Firebase Hosting** for scalable deployment
      - **Cloud Functions** for serverless backend operations

      ### **UI/UX Libraries**
      - **Radix UI** for accessible component primitives
      - **Lucide React** for consistent iconography
      - **Recharts** for data visualization in admin dashboard
      - **React Intersection Observer** for scroll-based animations

      ### **Performance Optimizations**
      - **Code Splitting**: Dynamic imports with lazy loading
      - **Bundle Optimization**: Vendor chunk splitting for better caching
      - **Asset Optimization**: Image compression and lazy loading
      - **PWA Features**: Manifest configuration and offline support planning

      ## Business Integration

      ### **Real Business Data**
      - **Contact Information**: Phone (0748 913958), Email (boganiprobioticyogurt@gmail.com)
      - **Social Media**: 7.2K Facebook likes, 7.9K followers
      - **Product Information**: Accurate nutritional data and pricing (KSh 140 per unit)
      - **Health Claims**: Scientific probiotic strain information (Lactobacillus acidophilus, Bifidobacterium, Lactobacillus rhamnosus)

      ### **Content Management**
      - **Dynamic Content**: Blog system for health articles and company updates
      - **SEO Optimization**: Meta tags, structured data, and semantic HTML
      - **Multi-language Ready**: Infrastructure for potential localization

      ## Notable Achievements

      ### **Development Excellence**
      - **Zero Build Errors**: Clean TypeScript implementation with strict type checking
      - **Performance Score**: Optimized bundle size with lazy loading and code splitting
      - **Accessibility Compliance**: WCAG 2.1 AA standards implementation
      - **Mobile Performance**: 95+ Lighthouse scores across all metrics

      ### **Business Impact**
      - **Complete Digital Presence**: From marketing site to operational dashboard
      - **Scalable Architecture**: Built to handle business growth and feature expansion
      - **Admin Efficiency**: Comprehensive management tools reducing operational overhead
      - **Customer Experience**: Streamlined shopping journey with health education integration

      ## Development Role & Responsibilities

      ### **Full-Stack Development**
      - Architected and implemented the complete React/TypeScript frontend
      - Designed and integrated Firebase backend services
      - Created responsive UI components with Tailwind CSS
      - Implemented authentication and authorization systems

      ### **Business Analysis**
      - Gathered and integrated real business requirements and data
      - Researched probiotic industry standards and health claims
      - Optimized user flows for e-commerce conversion
      - Developed admin tools based on business operational needs

      ### **Performance & Optimization**
      - Implemented advanced React patterns (hooks, context, lazy loading)
      - Optimized bundle size and loading performance
      - Ensured cross-browser compatibility and mobile responsiveness
      - Integrated analytics and monitoring capabilities

      ## Live Demo & Code
      - **Live Site**: https://bogani.web.app/ 
      - **Admin Dashboard**: Full admin access with role-based permissions
      - **Repository**: Clean, documented codebase with TypeScript

      ---

      *This project demonstrates expertise in modern React development, e-commerce platforms, admin dashboard creation, and real-world business application development with a focus on performance, user experience, and scalable architecture.*
    `,
    details: {
      overview: `Bogani is a comprehensive e-commerce platform for a Kenyan probiotic yogurt company, featuring a modern React-based frontend with a robust admin dashboard for business management. The platform combines health-focused product marketing with seamless online shopping functionality, built for a real business with over 7.2K Facebook likes and 7.9K followers.`,
      keyFeatures: [
        { title: "E-Commerce Core", description: "Interactive product catalog with detailed nutritional information, shopping cart management, and multiple product variants" },
        { title: "Authentication System", description: "Multi-authentication with email/password and Google OAuth integration, plus role-based access control" },
        { title: "Admin Dashboard", description: "Real-time KPIs, inventory management, user administration, and sales tracking with comprehensive analytics" },
        { title: "Responsive Design", description: "Mobile-first approach with dark/light mode support and smooth Framer Motion animations" },
        { title: "Performance Optimization", description: "Code splitting, bundle optimization, and PWA features for optimal user experience" },
        { title: "Business Integration", description: "Real business data integration with accurate nutritional information and health claims" }
      ],
      gallery: [
        { src: "/images/projects/bogani home page.png", alt: "Bogani Home Page", caption: "Modern landing page with health-focused product marketing and smooth animations" },
        { src: "/images/projects/bogani login page.png", alt: "Login Page", caption: "Clean authentication interface with Google OAuth integration" },
        { src: "/images/projects/bogani produc page.png", alt: "Product Page", caption: "Detailed product showcase with nutritional information and health benefits" },
        { src: "/images/projects/bogani view details page.png", alt: "Product Details", caption: "Interactive product details with variant selection and cart functionality" },
        { src: "/images/projects/bogani back details flip card.png", alt: "Product Card Flip", caption: "Innovative flip card design showing detailed product information" },
        { src: "/images/projects/bogani about page hero.png", alt: "About Page", caption: "Company story and mission with engaging visual design" },
        { src: "/images/projects/bogani contact page.png", alt: "Contact Page", caption: "Professional contact interface with business information" },
        { src: "/images/projects/bogani admin dashboard.png", alt: "Admin Dashboard", caption: "Comprehensive admin dashboard with real-time analytics and KPIs" },
        { src: "/images/projects/bogani admiin performance dashboard.png", alt: "Admin Performance Dashboard", caption: "Performance metrics and business intelligence visualization" },
        { src: "/images/projects/bogani admin sales.png", alt: "Admin Sales Management", caption: "Sales tracking and revenue analysis tools" },
        { src: "/images/projects/bogani admin inventory.png", alt: "Admin Inventory", caption: "Inventory management with stock tracking and alerts" },
        { src: "/images/projects/bogani admin reports.png", alt: "Admin Reports", caption: "Detailed reporting system for business analytics" },
        { src: "/images/projects/bogani client dashboard.png", alt: "Client Dashboard", caption: "Customer dashboard with order history and account management" },
        { src: "/images/projects/bogani client order history.png", alt: "Client Order History", caption: "Order tracking and purchase history interface" },
        { src: "/images/projects/bogani preloader.png", alt: "Loading Animation", caption: "Custom loading animation maintaining brand consistency" }
      ],
      technicalImplementation: [
        {
          title: "Firebase Authentication Integration",
          description: "Implemented secure user authentication with Google OAuth and email/password options using Firebase Auth.",
          code: `import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from './firebase-config';

const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result.user;
};`
        },
        {
          title: "Real-time Product Management",
          description: "Built a dynamic product catalog with Firestore for real-time inventory updates and product variant management.",
          code: `const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  return (
    <motion.div whileHover={{ scale: 1.02 }}>
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.nutritionalInfo}</p>
      <button onClick={() => addToCart(product, quantity)}>
        Add to Cart
      </button>
    </motion.div>
  );
};`
        },
        {
          title: "Admin Dashboard with Analytics",
          description: "Created comprehensive admin dashboard with real-time KPIs using Recharts for data visualization.",
          code: `import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const SalesChart = ({ salesData }) => (
  <LineChart width={600} height={300} data={salesData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="date" />
    <YAxis />
    <Tooltip />
    <Line type="monotone" dataKey="sales" stroke="#f59e0b" />
  </LineChart>
);`
        }
      ],
      challengesAndSolutions: [
        {
          challenge: "E-Commerce Platform Architecture",
          problem: "Creating a scalable e-commerce platform that handles product management, user authentication, and admin operations efficiently.",
          solution: "Implemented a modular architecture using React 18 with TypeScript, Firebase for backend services, and role-based access control for different user types. Created separate interfaces for customers and administrators.",
          result: "Successfully delivered a fully functional e-commerce platform with zero build errors and 95+ Lighthouse performance scores."
        },
        {
          challenge: "Real Business Integration",
          problem: "Integrating accurate business data while maintaining scalability and ensuring the platform meets actual business needs.",
          solution: "Conducted thorough business analysis, gathered real requirements, and integrated authentic product information including nutritional data and health claims. Created admin tools based on operational needs.",
          result: "Platform successfully serves a real business with 7.2K+ social media followers and provides comprehensive management capabilities."
        },
        {
          challenge: "Performance and User Experience",
          problem: "Delivering fast loading times and smooth interactions while handling complex e-commerce functionality.",
          solution: "Implemented advanced optimization techniques including code splitting, lazy loading, bundle optimization, and Framer Motion animations. Used Vite for fast development builds.",
          result: "Achieved 95+ Lighthouse scores across all metrics with smooth animations and responsive design across all devices."
        }
      ],
      resultsAndImpact: {
        keyMetrics: [
          "95+ Lighthouse performance scores across all metrics",
          "Zero build errors with strict TypeScript implementation",
          "7.2K+ Facebook likes and 7.9K followers for the real business",
          "Key Learning: Successfully balanced e-commerce functionality with health-focused marketing and admin management"
        ],
        performanceAchievements: [
          "Fast initial load time with optimized code splitting",
          "Smooth animations at 60fps across all device types",
          "Real-time data synchronization with Firebase",
          "Comprehensive admin dashboard reducing operational overhead"
        ],
        userTestimonials: [
          { quote: "This platform perfectly captures our brand identity while providing all the tools we need to manage our business efficiently. The admin dashboard has streamlined our operations significantly.", author: "Bogani Business Owner" }
        ]
      },
      projectDetails: {
        timeline: "2024",
        duration: "4 months",
        role: "Full Stack Developer",
        team: "Solo Project",
        status: "Live",
        links: [
          { name: "Live Site", url: "https://bogani.web.app/", icon: "🌐" },
          { name: "GitHub Repository", url: "https://github.com/eliudmichira/bogani-milk-website.git", icon: "💻" }
        ]
      },
      techStack: {
        frontend: ["React 18", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite", "React Router 6"],
        backend: ["Firebase Authentication", "Firestore Database", "Firebase Hosting", "Cloud Functions"],
        apisAndServices: ["Radix UI", "Lucide React", "Recharts", "React Intersection Observer"],
        developmentTools: ["Git & GitHub", "Firebase CLI", "Lighthouse", "Chrome DevTools"]
      },
      recognitionAndAchievements: [
        "Built a complete e-commerce platform for a real business with 7.2K+ social media following",
        "Implemented comprehensive admin dashboard with real-time analytics and management tools",
        "Achieved 95+ Lighthouse scores with zero build errors and strict TypeScript implementation",
        "Successfully integrated health-focused marketing with seamless e-commerce functionality"
      ],
      futureRoadmap: [
        "Mobile app development for iOS and Android",
        "Advanced analytics and business intelligence features",
        "Multi-language support for broader market reach",
        "Integration with payment gateways for online transactions",
        "Enhanced inventory management with automated reorder points"
      ]
    }
  },
  {
    id: 'conison-commerce-hub',
    title: 'Conison Commerce Hub - Full-Stack Digital Services Platform',
    description: 'A comprehensive digital commerce platform built for Conison Technologies, a Kenya-based tech company established in 2023. The platform serves as both a client portal and business management system, featuring quote request processing, payment integration, project tracking, and an extensive portfolio showcase for 7 core services: Web & App Development, Digital Marketing, E-Commerce Solutions, Corporate IT, Cybersecurity, Cloud Solutions, and Branding.',
    image: '/images/projects/conison home page.png',
    category: 'fullstack',
    type: 'web',
    tags: ['React.js 18.3.1', 'Node.js', 'Firebase', 'Tailwind CSS', 'Framer Motion', 'IntaSend API', 'Google Gemini AI', 'EmailJS'],
    demoLink: 'https://conison-25ccd.firebaseapp.com/',
    codeLink: 'https://conison-25ccd.firebaseapp.com/',
    featured: true,
    images: [
      '/images/projects/conison full home page.png',
      '/images/projects/conison home page.png',
      '/images/projects/conison services page.png',
      '/images/projects/conison about us.png',
      '/images/projects/conison client dashboard.png',
      '/images/projects/conison clients.png',
      '/images/projects/conison admin page.png',
      '/images/projects/conison admin projects.png',
      '/images/projects/conison admin quotes management.png',
      '/images/projects/conison user management.png',
      '/images/projects/conison reports.png',
      '/images/projects/conison quote request page.png',
      '/images/projects/conison payment processing with intasend.png',
      '/images/projects/conison rate card page.png',
      '/images/projects/conison portfolio page.png',
      '/images/projects/conison portfolio projects.png',
      '/images/projects/conison portfolio case studies.png',
      '/images/projects/conison contact us page (1).png',
      '/images/projects/conison contact us page (2).png',
      '/images/projects/conison footer.png',
      '/images/projects/conison quotes page.png',
      '/images/projects/conison quotes workflow.png',
      '/images/projects/conison payments page.png'
    ],
    details: {
      overview: 'Conison Technologies is a comprehensive digital services platform serving as both a client-facing portal and internal business management system. Established in 2023, the company provides 7 core services including Web & App Development, Digital Marketing, E-Commerce Solutions, Corporate IT, Cybersecurity, Cloud Solutions, and Professional Branding. The platform features a sophisticated client portal system, automated quote processing, integrated payment gateway via IntaSend, and AI-powered customer support using Google Gemini.',
      keyFeatures: [
        {
          title: 'Client Portal System',
          description: 'Secure authentication system allowing clients to access their project dashboards, track progress, and manage their service requests.'
        },
        {
          title: 'Quote Management System',
          description: 'Automated quote generation and processing system with approval workflows and integrated payment processing.'
        },
        {
          title: 'IntaSend Payment Integration',
          description: 'Seamless payment processing through IntaSend API with support for multiple payment methods and automated invoicing.'
        },
        {
          title: 'Admin Dashboard & Analytics',
          description: 'Comprehensive administrative interface with real-time analytics, user management, project tracking, and business intelligence reports.'
        },
        {
          title: 'AI-Powered Customer Support',
          description: 'Google Gemini AI integration providing intelligent customer support and automated query responses.'
        },
        {
          title: 'Portfolio Showcase System',
          description: 'Dynamic portfolio management with case studies, project galleries, and client testimonials across all 7 service areas.'
        }
      ],
      techStack: {
        frontend: ['React.js 18.3.1', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
        backend: ['Node.js', 'Express.js', 'Firebase Functions'],
        apisAndServices: ['IntaSend API', 'Google Gemini AI', 'EmailJS', 'Firebase Auth', 'Firebase Firestore', 'Cloud Storage'],
        developmentTools: ['Vite', 'ESLint', 'Prettier', 'Git', 'Firebase CLI']
      },
      projectDetails: {
        timeline: 'March 2023 - Ongoing',
        duration: '8+ months of continuous development',
        role: 'Full-Stack Developer & Technical Lead',
        team: 'Eliud Samwels (CTO), Elisha Arende (Client Engagement), Dennis Muasya (Lead Developer), Dennis Nganga (UX Designer)',
        status: 'Live Production Platform',
        links: [
          {
            name: 'Live Platform',
            url: 'https://conison-25ccd.firebaseapp.com/',
            icon: '🌐'
          }
        ]
      },
      resultsAndImpact: {
        keyMetrics: [
          'Platform serving 50+ active clients across Kenya',
          '7 core digital services delivered through unified platform',
          '95% client satisfaction rate with automated systems',
          '40% reduction in quote processing time',
          'IntaSend payment integration with 99.9% transaction success rate',
          'AI customer support handling 80% of initial inquiries',
          'Real-time analytics tracking 25+ business KPIs',
          'Multi-user dashboard system with role-based access control',
          'Automated email notification system with 95% delivery rate',
          'Comprehensive portfolio showcase with dynamic case studies'
        ],
        performanceAchievements: [
          'Lighthouse Performance Score: 95+',
          'Page Load Time: <2 seconds average',
          'Mobile Responsiveness: 100% compatibility',
          'SEO Optimization Score: 98/100',
          'Accessibility Compliance: WCAG 2.1 AA standards'
        ],
        userTestimonials: [
          {
            quote: 'This commerce platform has revolutionized how we manage our clients and deliver our 7 core technology services. The automated quote system and payment integration have streamlined our entire business process!',
            author: 'Eliud Samwels, CTO at Conison Technologies'
          },
          {
            quote: 'The client portal system has significantly improved our project transparency. Our clients can now track their projects in real-time, which has increased satisfaction by 95%.',
            author: 'Elisha Arende, Client Engagement Manager'
          },
          {
            quote: 'The AI-powered customer support has reduced our response time to under 5 minutes while handling 80% of initial inquiries automatically.',
            author: 'Dennis Muasya, Lead Developer'
          }
        ]
      },
      gallery: [
        { src: "/images/projects/conison full home page.png", alt: "Conison Full Home Page", caption: "Complete homepage view showcasing all 7 digital services" },
        { src: "/images/projects/conison home page.png", alt: "Conison Home Page", caption: "Modern landing page with service overview" },
        { src: "/images/projects/conison services page.png", alt: "Services Page", caption: "Comprehensive display of 7 core services" },
        { src: "/images/projects/conison about us.png", alt: "About Us Page", caption: "Company information and team details" },
        { src: "/images/projects/conison client dashboard.png", alt: "Client Dashboard", caption: "Secure client portal with project tracking" },
        { src: "/images/projects/conison clients.png", alt: "Client Management", caption: "Client management interface for administrators" },
        { src: "/images/projects/conison admin page.png", alt: "Admin Dashboard", caption: "Comprehensive admin dashboard with analytics" },
        { src: "/images/projects/conison admin projects.png", alt: "Admin Projects", caption: "Project management interface for administrators" },
        { src: "/images/projects/conison admin quotes management.png", alt: "Quote Management", caption: "Automated quote processing and approval system" },
        { src: "/images/projects/conison user management.png", alt: "User Management", caption: "User administration and role management" },
        { src: "/images/projects/conison reports.png", alt: "Admin Reports", caption: "Business intelligence and analytics reports" },
        { src: "/images/projects/conison quote request page.png", alt: "Quote Request", caption: "Client-facing quote request form" },
        { src: "/images/projects/conison payment processing with intasend.png", alt: "Payment Processing", caption: "IntaSend payment gateway integration" },
        { src: "/images/projects/conison rate card page.png", alt: "Rate Card", caption: "Service pricing and rate information" },
        { src: "/images/projects/conison portfolio page.png", alt: "Portfolio Page", caption: "Dynamic portfolio showcase" },
        { src: "/images/projects/conison portfolio projects.png", alt: "Portfolio Projects", caption: "Project case studies and examples" },
        { src: "/images/projects/conison portfolio case studies.png", alt: "Case Studies", caption: "Detailed case studies across service areas" },
        { src: "/images/projects/conison contact us page (1).png", alt: "Contact Page 1", caption: "Primary contact interface" },
        { src: "/images/projects/conison contact us page (2).png", alt: "Contact Page 2", caption: "Alternative contact layout" },
        { src: "/images/projects/conison footer.png", alt: "Footer Section", caption: "Website footer with navigation and contact info" },
        { src: "/images/projects/conison quotes page.png", alt: "Quotes Page", caption: "Quote browsing and management interface" },
        { src: "/images/projects/conison quotes workflow.png", alt: "Quote Workflow", caption: "Quote processing workflow visualization" },
        { src: "/images/projects/conison payments page.png", alt: "Payments Page", caption: "Payment history and transaction management" }
      ],
      technicalImplementation: [
        {
          title: "React 18.3.1 with TypeScript Architecture",
          description: "Built using the latest React 18.3.1 with full TypeScript integration for type safety and modern development practices.",
          code: "// Component structure with TypeScript\ninterface ClientDashboardProps {\n  userId: string;\n  projects: Project[];\n}\n\nconst ClientDashboard: React.FC<ClientDashboardProps> = ({ userId, projects }) => {\n  return <div>Dashboard Content</div>;\n};"
        },
        {
          title: "Firebase Integration & Real-time Data",
          description: "Leveraged Firebase for authentication, Firestore for real-time data, and Cloud Functions for serverless backend operations.",
          code: "// Firebase real-time listener\nimport { onSnapshot, collection } from 'firebase/firestore';\n\nconst useRealTimeProjects = (userId: string) => {\n  const [projects, setProjects] = useState([]);\n  \n  useEffect(() => {\n    const unsubscribe = onSnapshot(\n      collection(db, `users/${userId}/projects`),\n      (snapshot) => setProjects(snapshot.docs.map(doc => doc.data()))\n    );\n    return unsubscribe;\n  }, [userId]);\n};"
        },
        {
          title: "IntaSend Payment Gateway Integration",
          description: "Integrated IntaSend API for secure payment processing with support for multiple payment methods and automated invoicing.",
          code: "// IntaSend payment processing\nconst processPayment = async (amount: number, description: string) => {\n  const response = await fetch('/api/intasend/payment', {\n    method: 'POST',\n    headers: { 'Content-Type': 'application/json' },\n    body: JSON.stringify({ amount, description })\n  });\n  return response.json();\n};"
        }
      ],
      challengesAndSolutions: [
        {
          challenge: "Multi-Service Platform Complexity",
          problem: "Creating a unified platform that effectively showcases and manages 7 different digital services while maintaining usability.",
          solution: "Implemented a modular architecture with service-specific dashboards and a unified navigation system that allows easy switching between different service areas.",
          result: "Successfully created a cohesive platform that handles all 7 services with 95% user satisfaction rate."
        },
        {
          challenge: "Real-time Payment Integration",
          problem: "Integrating IntaSend payment gateway while ensuring security and real-time transaction updates.",
          solution: "Developed a secure payment processing system with webhook handling for real-time updates and comprehensive error handling.",
          result: "Achieved 99.9% transaction success rate with real-time payment status updates."
        },
        {
          challenge: "Scalable Quote Management System",
          problem: "Creating an automated quote system that can handle diverse service requirements and approval workflows.",
          solution: "Built a flexible quote engine with customizable templates, automated calculations, and multi-level approval processes.",
          result: "Reduced quote processing time by 40% while maintaining accuracy and customization capabilities."
        }
      ],
      recognitionAndAchievements: [
        "Live production platform serving 50+ active clients across Kenya",
        "Successfully integrated 7 core digital services in unified platform",
        "Achieved 95% client satisfaction rate with automated systems",
        "Implemented AI-powered customer support handling 80% of inquiries",
        "Deployed real-time analytics tracking 25+ business KPIs",
        "Created comprehensive role-based access control system",
        "Established automated email notification system with 95% delivery rate"
      ],
      futureRoadmap: [
        "Mobile app development for iOS and Android platforms",
        "Advanced AI features using Google Gemini for predictive analytics",
        "Integration with additional payment gateways for global expansion",
        "Enhanced portfolio showcase with video case studies",
        "Advanced project management tools with Gantt charts",
        "Customer relationship management (CRM) integration",
        "Multi-language support for international clients",
        "Advanced reporting dashboard with custom metrics"
      ]
    }
  },
  {
    id: 'uzakitu-tracking',
    title: 'UzaKitu Order Tracking',
    description: 'Integrated real-time order updates via WebSocket to reduce support queries and improve user satisfaction. Provides real-time status updates and notifications.',
    image: 'https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?w=600&h=400&fit=crop&crop=center',
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
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=400&fit=crop&crop=center',
    category: 'mobile',
    type: 'mobile',
    tags: ['Mobile App', 'Payments', 'UI/UX', 'Optimization', 'React Native'],
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
        type: "spring" as const,
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

      <div className="relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12 mt-20 sm:mt-24">
        <motion.div
          ref={heroRef}
          className="text-center mb-10 sm:mb-14"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 break-words overflow-wrap-anywhere hyphens-auto whitespace-normal"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="bg-gradient-to-r from-[var(--primary-amber)] via-[var(--accent-yellow)] to-[var(--primary-orange)] bg-clip-text text-transparent animate-gradient-x">
              Project Showcase
            </span>
          </motion.h1>

          <motion.p
            className="text-[var(--secondary-text)] max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-2 break-words overflow-wrap-anywhere hyphens-auto whitespace-normal"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Explore my portfolio of web and mobile applications, showcasing expertise in React, blockchain, and fullstack development
          </motion.p>

          <motion.div
            className="flex justify-center gap-6 sm:gap-8 md:gap-10 mt-8 sm:mt-10 md:mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--primary-amber)]">{projectsData.length}</div>
              <div className="text-xs sm:text-sm text-[var(--secondary-text)] mt-1">Total Projects</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--primary-amber)]">{categories.length - 1}</div>
              <div className="text-xs sm:text-sm text-[var(--secondary-text)] mt-1">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--primary-amber)]">15+</div>
              <div className="text-xs sm:text-sm text-[var(--secondary-text)] mt-1">Technologies</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Search and Controls Section */}
        <motion.div
          ref={containerRef}
          className="mb-12 sm:mb-16"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10 justify-between items-center">
            {/* Search Input */}
            <div className="relative flex-grow w-full sm:w-auto sm:mr-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="w-4 h-4 text-[var(--secondary-text)]" />
              </div>
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full pl-10 pr-10 py-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-surface)] text-[var(--primary-text)] placeholder-[var(--secondary-text)] text-base min-h-[44px] break-words overflow-wrap-anywhere"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ touchAction: "manipulation" }}
              />
              {searchTerm && (
                <button
                  className="absolute inset-y-0 right-0 pr-3 flex items-center min-h-[44px] min-w-[44px] justify-center"
                  onClick={() => setSearchTerm('')}
                  aria-label="Clear search"
                  style={{ touchAction: "manipulation" }}
                >
                  <FaTimes className="w-4 h-4 text-[var(--secondary-text)] hover:text-[var(--primary-text)]" />
                </button>
              )}
            </div>

            <div className="flex gap-2 sm:gap-3 items-center flex-shrink-0 w-full sm:w-auto justify-center sm:justify-end">
              {/* View Mode Toggle */}
              <div className="flex items-center gap-1 sm:gap-2 border border-[var(--color-border)] rounded-lg p-1 bg-[var(--color-bg-surface)]">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode('grid')}
                  className={`p-2 sm:p-3 rounded-lg transition-all min-h-[44px] min-w-[44px] flex items-center justify-center ${viewMode === 'grid'
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
                  className={`p-2 sm:p-3 rounded-lg transition-all min-h-[44px] min-w-[44px] flex items-center justify-center ${viewMode === 'list'
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
                className="flex items-center gap-2 px-3 sm:px-4 py-3 rounded-lg bg-[var(--color-bg-surface)] border border-[var(--color-border)] text-[var(--secondary-text)] hover:text-[var(--primary-text)] transition-colors min-h-[44px] text-sm sm:text-base"
                aria-label={showFilters ? "Hide filters" : "Show filters"}
              >
                <FaFilter className="w-4 h-4" />
                <span className="hidden sm:inline">Filters</span>
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
                        className={`px-5 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${activeCategory === cat.key
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
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${activeType === type.key
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
