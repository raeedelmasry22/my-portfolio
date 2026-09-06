// Screenshot imports — real project visuals
import veraImg from '@/imports/Screenshot_2026-09-02_002425.png'
import auraImg from '@/imports/Screenshot_2026-09-02_002804.png'
import matchpointImg from '@/imports/Screenshot_2026-09-02_002850.png'
import aylahImg from '@/imports/Screenshot_2026-09-02_002831.png'
import tvImg from '@/imports/Screenshot_2026-09-02_002333.png'
import shadyImg from '@/imports/Screenshot_2026-09-02_002627.png'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PipelineStep { step: string; label: string }
export interface ResultMetric { metric: string; value: string; note: string }

export interface AIProject {
  type: 'ai'
  id: string
  slug: string
  title: string
  category: string
  filters: string[]
  desc: string
  tech: string[]
  color: string
  patternType: string
  overview: string
  problem: string
  approach: string[]
  pipeline: PipelineStep[]
  keyFeatures: string[]
  results: ResultMetric[]
  learned: string[]
  demoUrl?: string
}

export interface UXProject {
  type: 'ux'
  id: string
  slug: string
  title: string
  category: string
  filters: string[]
  desc: string
  tech: string[]
  color: string
  platform: 'mobile' | 'web'
  screenshotSrc: string
  overview: string
  challenge: string
  goals: string[]
  uxProcess: string[]
  userFlow: string[]
  keyFeatures: string[]
  outcome: string
  figmaUrl?: string
  demoUrl?: string
}

export type AnyProject = AIProject | UXProject

// ─── AI Projects ──────────────────────────────────────────────────────────────

export const AI_PROJECTS: AIProject[] = [
  {
    type: 'ai',
    id: '01',
    slug: 'face-recognition',
    title: 'Smart Face Recognition System',
    category: 'Computer Vision',
    filters: ['Computer Vision'],
    desc: 'A CV project exploring face detection and recognition using Python, OpenCV, and classical ML — no deep learning.',
    tech: ['Python', 'OpenCV', 'Scikit-learn', 'NumPy', 'Haar Cascade', 'HOG + SVM'],
    color: '#2A82FF',
    patternType: 'cv',
    overview: 'Built to understand the fundamentals of computer vision — how machines detect faces in an image and match them to a known identity. Deliberately uses a classical ML pipeline (no deep learning) to build a solid understanding of foundational CV concepts.',
    problem: 'Given an image or live video stream, how can a program reliably detect where faces appear — and identify whose face it is — despite lighting variation, angle, and image quality differences?',
    approach: [
      'Use OpenCV\'s pre-trained Haar Cascade classifier for fast initial face detection in every frame.',
      'Extract the Region of Interest (ROI) from each detected face and normalize it to 64×64 resolution.',
      'Apply HOG (Histogram of Oriented Gradients) to each ROI, producing a compact feature vector.',
      'Train an SVM classifier on a small, manually collected identity dataset using Scikit-learn.',
      'Evaluate on a held-out test set and test on live webcam input to observe real-world behavior.',
    ],
    pipeline: [
      { step: '01', label: 'Input — image or webcam frame' },
      { step: '02', label: 'Grayscale conversion' },
      { step: '03', label: 'Haar Cascade face detection' },
      { step: '04', label: 'ROI extraction → resize 64×64' },
      { step: '05', label: 'HOG feature extraction' },
      { step: '06', label: 'SVM classification' },
      { step: '07', label: 'Label + confidence rendered on frame' },
    ],
    keyFeatures: [
      'Real-time face detection from webcam feed using OpenCV',
      'Multi-face detection support within a single frame',
      'Identity recognition across a small custom dataset',
      'Adjustable confidence threshold',
      'Bounding box and identity label overlay rendering',
    ],
    results: [
      { metric: 'Detection Accuracy', value: 'XX%', note: 'On test images under controlled lighting — replace with actual' },
      { metric: 'Recognition Accuracy', value: 'XX%', note: 'On custom identity dataset — replace with actual' },
      { metric: 'Inference Speed', value: '~XX ms / frame', note: 'CPU only — no GPU used' },
    ],
    learned: [
      'How classical CV pipelines work end-to-end — from raw pixels to a labeled output',
      'Strengths and limitations of Haar Cascades vs. modern DNN-based detectors',
      'How HOG features capture gradient structure to describe facial appearance compactly',
      'Why SVM performs well on high-dimensional feature vectors like HOG descriptors',
      'How lighting variation and occlusion create failure cases in classical systems',
    ],
  },
  {
    type: 'ai',
    id: '02',
    slug: 'digit-recognition',
    title: 'Handwritten Digit Recognition',
    category: 'Deep Learning',
    filters: ['AI & ML'],
    desc: 'A CNN trained on MNIST to explore deep learning fundamentals — architecture, training dynamics, and evaluation.',
    tech: ['Python', 'TensorFlow', 'Keras', 'NumPy', 'Matplotlib'],
    color: '#38C8FF',
    patternType: 'dl',
    overview: 'Uses the MNIST benchmark dataset to build a CNN that classifies handwritten digits (0–9). Served as hands-on introduction to deep learning — understanding convolutional layers, pooling, backpropagation, and the full supervised learning workflow.',
    problem: 'Recognizing a handwritten digit from a 28×28 grayscale image introduces every core concept behind modern CNNs: spatial feature extraction, hierarchical representations, and softmax multi-class classification.',
    approach: [
      'Load MNIST (60,000 training / 10,000 test images) and split into train/validation/test sets.',
      'Preprocess: normalize pixel values from [0, 255] to [0, 1] and reshape for CNN input.',
      'Design a simple CNN: two Conv2D layers with ReLU, MaxPooling, Flatten, and Dense layers.',
      'Train using Adam optimizer with categorical cross-entropy loss.',
      'Evaluate on the held-out test set and visualize predictions alongside failure cases.',
    ],
    pipeline: [
      { step: '01', label: 'MNIST load → train/val/test split' },
      { step: '02', label: 'Normalize [0,255] → [0,1]' },
      { step: '03', label: 'Conv2D(32 filters, 3×3) + ReLU' },
      { step: '04', label: 'MaxPooling(2×2)' },
      { step: '05', label: 'Conv2D(64 filters, 3×3) + ReLU' },
      { step: '06', label: 'MaxPooling → Flatten' },
      { step: '07', label: 'Dense(128) + ReLU → Softmax(10)' },
    ],
    keyFeatures: [
      'Full CNN training pipeline from raw MNIST data to evaluation',
      'Live prediction on custom hand-drawn digit input',
      'Per-class confidence score visualization',
      'Training / validation loss and accuracy curves',
      'Failure case analysis — inspecting where and why the model misclassifies',
    ],
    results: [
      { metric: 'Test Accuracy', value: 'XX%', note: 'MNIST benchmark — replace with your actual result' },
      { metric: 'Epochs to Converge', value: 'XX epochs', note: 'Until validation loss stabilized' },
      { metric: 'Total Parameters', value: '~XXK', note: 'Lightweight — no pretrained weights used' },
    ],
    learned: [
      'How convolutional layers extract local spatial features hierarchically across depth',
      'The role of MaxPooling in spatial downsampling and translation invariance',
      'How to detect overfitting early by monitoring train vs. validation loss divergence',
      'Why Softmax is the correct output activation for multi-class probability distribution',
      'The value of visualizing failure cases — not just accuracy — to understand model behavior',
    ],
  },
  {
    type: 'ai',
    id: '03',
    slug: 'student-performance',
    title: 'Student Performance Prediction',
    category: 'Machine Learning',
    filters: ['AI & ML'],
    desc: 'An ML classification project predicting academic risk from student data using EDA, feature engineering, and model comparison.',
    tech: ['Python', 'Pandas', 'Scikit-learn', 'NumPy', 'Matplotlib', 'Seaborn'],
    color: '#4DA8FF',
    patternType: 'data',
    overview: 'Explores whether machine learning can identify students at academic risk — based on study time, attendance, and family background — early enough to offer support. Covers the full data science workflow: EDA, feature engineering, model selection, and evaluation.',
    problem: 'Academic struggles often go undetected until too late for intervention. Can historical student data predict who is at risk of poor performance? A real challenge in educational data mining.',
    approach: [
      'Load and explore the UCI Student Performance dataset using Pandas, checking for missing values and class imbalance.',
      'Perform EDA: visualize feature distributions, correlation heatmaps, and target class balance.',
      'Feature engineer: encode categorical variables, bin continuous features, select relevant predictors.',
      'Train and compare three classifiers: Logistic Regression, Decision Tree, and Random Forest.',
      'Use 5-fold cross-validation and GridSearchCV for hyperparameter tuning.',
      'Evaluate using accuracy, precision, recall, F1 score, and confusion matrix.',
    ],
    pipeline: [
      { step: '01', label: 'CSV data loading & inspection' },
      { step: '02', label: 'EDA — distributions & correlations' },
      { step: '03', label: 'Feature engineering & encoding' },
      { step: '04', label: 'Train / test split (80% / 20%)' },
      { step: '05', label: 'Train 3 classifiers' },
      { step: '06', label: 'Cross-validation & GridSearchCV' },
      { step: '07', label: 'Evaluation & feature importance' },
    ],
    keyFeatures: [
      'Comprehensive EDA with correlation heatmaps and feature distribution plots',
      'Side-by-side comparison of three classification algorithms',
      'GridSearchCV hyperparameter optimization',
      'Feature importance ranking from the Random Forest classifier',
      'Confusion matrix and full classification report per model',
    ],
    results: [
      { metric: 'Best Model Accuracy', value: 'XX%', note: 'Random Forest on test set — replace with actual' },
      { metric: 'Weighted F1 Score', value: 'XX%', note: 'Across all classes — replace with actual' },
      { metric: 'Top 3 Predictors', value: 'Study time, Failures, Absences', note: 'By Random Forest feature importance' },
    ],
    learned: [
      'The complete data science workflow — from raw tabular data to actionable insights',
      'Why accuracy alone is misleading — precision/recall matters more in imbalanced classes',
      'How feature importance differs by algorithm type and what it actually means',
      'The overfitting risk in Decision Trees vs. ensemble robustness of Random Forest',
      'How to communicate model results honestly, including uncertainty, to a non-technical audience',
    ],
  },
  {
    type: 'ai',
    id: '04',
    slug: 'object-detection',
    title: 'AI Object Detection',
    category: 'Computer Vision',
    filters: ['Computer Vision'],
    desc: 'Real-time multi-class object detection using a pre-trained YOLO model on images and live webcam feed.',
    tech: ['Python', 'YOLOv5', 'OpenCV', 'NumPy', 'PyTorch'],
    color: '#60B8FF',
    patternType: 'cv2',
    overview: 'Explores real-time object detection using a pre-trained YOLOv5 model on COCO. The goal was to understand how modern detection systems locate and classify multiple objects in a single forward pass — and to build a working inference pipeline from scratch.',
    problem: 'Unlike classification, object detection must answer: what objects are present AND where? This "what + where" challenge requires bounding box regression, anchor-based prediction, and Non-Maximum Suppression.',
    approach: [
      'Load a pre-trained YOLOv5 model with COCO weights — covering 80 object classes.',
      'Build a custom inference pipeline: load input → preprocess → run inference → decode → render.',
      'Implement NMS to filter redundant bounding boxes around the same object.',
      'Render labeled bounding boxes with class names and confidence scores on each frame.',
      'Extend to real-time webcam input, adjusting thresholds to balance detection count vs. noise.',
    ],
    pipeline: [
      { step: '01', label: 'Input — image or video stream' },
      { step: '02', label: 'Resize & normalize for YOLO' },
      { step: '03', label: 'YOLOv5 forward pass' },
      { step: '04', label: 'Decode grid cell predictions' },
      { step: '05', label: 'Confidence threshold filtering' },
      { step: '06', label: 'Non-Maximum Suppression (NMS)' },
      { step: '07', label: 'Bounding box + label rendering' },
    ],
    keyFeatures: [
      'Multi-class detection across 80 COCO object categories',
      'Real-time webcam detection with live bounding box overlay',
      'Configurable confidence and NMS IoU thresholds',
      'Per-frame output saving for offline analysis',
      'Tested on a custom image set across varied scenes',
    ],
    results: [
      { metric: 'Detection Speed', value: '~XX FPS', note: 'CPU only — laptop hardware, no GPU' },
      { metric: 'Avg. Confidence', value: 'XX%', note: 'On custom test image set — replace with actual' },
      { metric: 'Test Set Size', value: 'XX images', note: 'Custom collected across varied scenes' },
    ],
    learned: [
      'How YOLO\'s grid-based system predicts multiple bounding boxes in a single forward pass',
      'Why NMS is essential — without it the same object gets dozens of overlapping boxes',
      'The significant performance gap between CPU and GPU for real-time inference',
      'How confidence thresholds shift the precision/recall balance in detection',
      'How to work with pre-trained weights and adapt an inference pipeline to custom inputs',
    ],
  },
]

// ─── UI/UX Projects ───────────────────────────────────────────────────────────

export const UX_PROJECTS: UXProject[] = [
  {
    type: 'ux',
    id: '01',
    slug: 'vera',
    title: 'VÉRA',
    category: 'UI/UX / Web Design',
    filters: ['UI/UX', 'Web Design'],
    desc: 'A premium automotive web experience designed around luxury, visual storytelling, and a refined browsing experience.',
    tech: ['Next.js', 'Framer Motion', 'RTL Design', 'Arabic Typography', 'Vercel'],
    color: '#C8A96E',
    platform: 'web',
    screenshotSrc: veraImg,
    overview: 'VÉRA is a luxury Arabic automotive brand website designed to create a high-end digital showroom experience that communicates prestige, exclusivity, and automotive craftsmanship — entirely in Arabic RTL.',
    challenge: 'Designing a digital experience that matches the cinematic quality of international luxury automotive brands — while adapting it fully to Arabic RTL typography, layout, and cultural context. The design needed to feel world-class without losing its Arabic identity.',
    goals: [
      'Create a full-bleed, dark, cinematic hero that immediately signals luxury',
      'Establish editorial RTL Arabic typography hierarchy that reads as premium',
      'Design smooth, narrative-driven scroll experience for vehicle storytelling',
      'Ensure the VÉRA brand identity feels established and confident, not like a startup',
    ],
    uxProcess: [
      'Studied luxury automotive websites (Lucid, Polestar, Rolls-Royce) for design language reference',
      'Established the VÉRA visual identity system: dark palette, gold accents, editorial typefaces',
      'Designed RTL-first layout logic — navbar, hero, grid, and footer all adapted for right-to-left',
      'Prototyped scroll-based vehicle reveal and transition animations',
      'Implemented in Next.js with Framer Motion for smooth, performant animations',
    ],
    userFlow: [
      'User lands on the full-screen hero — the car fills the viewport, tagline appears',
      'Scroll reveals brand narrative and vehicle feature highlights',
      'User navigates to vehicle detail page for specs, gallery, and experience sections',
      'Contact or inquiry CTA closes the experience',
    ],
    keyFeatures: [
      'Full-bleed cinematic hero with Arabic editorial headline',
      'RTL-adapted navigation and layout throughout',
      'Vehicle detail page with gallery and specs',
      'Smooth Framer Motion scroll animations',
      'Deployed and live on Vercel',
    ],
    outcome: 'A live, deployed luxury automotive website that demonstrates editorial UI/UX design, Arabic RTL product thinking, and the ability to ship polished, production-ready web experiences.',
    demoUrl: 'https://vera-beta-amber.vercel.app/vehicles/vera-s',
  },
  {
    type: 'ux',
    id: '02',
    slug: 'aura',
    title: 'AURA',
    category: 'UI/UX / Mobile Design',
    filters: ['UI/UX', 'Mobile Apps'],
    desc: 'A modern mobile experience focused on social interaction, rewards, and engaging user experiences.',
    tech: ['Figma', 'Mobile UI/UX', 'Gamification Design', 'Social Architecture'],
    color: '#8B5CF6',
    platform: 'mobile',
    screenshotSrc: auraImg,
    overview: 'AURA is a social mobile app built around a token-based reward economy — users earn AURA by sending tokens to followers, through profile views, and on every transfer. The design centers on making a financial/gamified mechanic feel social, exciting, and approachable.',
    challenge: 'Gamified reward systems can easily feel like crypto wallets or MLM schemes. The challenge was designing an experience that communicates the earning mechanics clearly and excitingly — while keeping the social layer front and center, not the financial one.',
    goals: [
      'Make the AURA token economy instantly understandable on first open',
      'Design a social feed and profile that feels engaging, not transactional',
      'Create visual excitement around earning and leaderboards without feeling casino-like',
      'Establish a dark, futuristic visual identity that matches the AURA brand concept',
    ],
    uxProcess: [
      'Mapped the core social earning mechanic and identified the key moments to celebrate (earning, ranking, profile visits)',
      'Designed the information architecture: feed, profile, leaderboard, wallet, messaging',
      'Built a visual language: dark background, purple-electric accents, glowing UI elements',
      'Prototyped onboarding flow to communicate the earning mechanic before first interaction',
      'Designed the global ranking system to drive aspirational behavior',
    ],
    userFlow: [
      'User onboards and sees their AURA balance and earning potential',
      'Explores feed — social content + AURA transfer activity',
      'Visits profiles to trigger view earnings; sends AURA to followers',
      'Checks global ranking to see their standing',
      'Withdraws or manages AURA balance',
    ],
    keyFeatures: [
      'Token economy social feed — blending content and AURA activity',
      'Profile page showing AURA earned, sent, and global ranking',
      'Global leaderboard with animated ranking display',
      'Send AURA flow — fast, visual, gamified transfer experience',
      'Messaging with AURA integration',
    ],
    outcome: 'A fully designed mobile app system that demonstrates strong mobile UX, gamification design thinking, and the ability to make complex reward mechanics feel simple and social.',
    figmaUrl: 'https://www.figma.com/design/RcVZTUlG98up5b6c2xih46/Untitled?node-id=0-1&t=J2lFyCsXBDiSTG76-1',
  },
  {
    type: 'ux',
    id: '03',
    slug: 'matchpoint',
    title: 'MatchPoint',
    category: 'UI/UX / Mobile Design',
    filters: ['UI/UX', 'Mobile Apps'],
    desc: 'A mobile booking experience designed to help users discover sports fields, check availability, and complete reservations with minimal friction.',
    tech: ['Figma', 'Mobile UI/UX', 'Booking Flow Design', 'Map Integration'],
    color: '#22C55E',
    platform: 'mobile',
    screenshotSrc: matchpointImg,
    overview: 'MatchPoint is a mobile app that lets players discover nearby sports fields, check live availability, and complete a booking in seconds. It focuses on removing friction from a process that typically involves calls, messages, and uncertainty.',
    challenge: 'Booking a sports field usually involves multiple steps, unclear pricing, and unknown availability. The challenge was compressing this into a fast, trustworthy mobile experience that works for a player who just wants to get on the field.',
    goals: [
      'Fast field discovery with location, sport type, and availability filters',
      'Clear, honest pricing and availability display — no hidden surprises',
      'Smooth multi-step booking flow: select → confirm → pay → booked',
      'Profile and bookings management for repeat users',
      'Onboarding that communicates the app\'s value in seconds',
    ],
    uxProcess: [
      'Mapped the end-to-end booking journey: discovery → field details → availability → booking → confirmation',
      'Identified friction points in typical field booking flows (unclear pricing, no real-time slots)',
      'Designed the field card system — consistent info hierarchy across home, search, and bookings',
      'Built the booking summary screen to build trust before payment commitment',
      'Prototyped the onboarding flow emphasizing the core value: "Book in seconds"',
    ],
    userFlow: [
      'User opens app → sees featured fields and filter options on home screen',
      'Selects field type (football/padel/etc.), browses available slots by date',
      'Views field detail — amenities, photos, location, availability calendar',
      'Selects time slot, reviews booking summary with full pricing',
      'Confirms booking — receives confirmation and manages it from profile',
    ],
    keyFeatures: [
      'Smart field discovery with sport type, location, and availability filters',
      'Real-time availability calendar per field',
      'Field detail page: amenities, photos, map, pricing, ratings',
      'Clear booking summary with transparent pricing breakdown',
      'Bookings management: upcoming and completed history',
    ],
    outcome: 'A complete mobile booking app design that demonstrates conversion-focused UX, complex multi-step flow management, and clear information architecture for a real-world service product.',
    figmaUrl: 'https://www.figma.com/design/RcVZTUlG98up5b6c2xih46/Untitled?node-id=0-1&t=J2lFyCsXBDiSTG76-1',
  },
  {
    type: 'ux',
    id: '04',
    slug: 'aylah',
    title: 'Aylah | آية',
    category: 'UI/UX / Mobile Design',
    filters: ['UI/UX', 'Mobile Apps'],
    desc: 'A clean and focused Quran experience designed around comfortable reading, simple navigation, and accessible content.',
    tech: ['Figma', 'Mobile UI/UX', 'Accessibility Design', 'Arabic Typography'],
    color: '#16A34A',
    platform: 'mobile',
    screenshotSrc: aylahImg,
    overview: "Aylah (آية) is a daily Quran and Islamic companion app designed to support spiritual practice through clean, distraction-free reading, organized surah navigation, integrated audio, duas, and dhikr tracking. The name comes from the Arabic word for 'verse'.",
    challenge: 'Quran apps often prioritize information density over reading experience. The challenge was designing an app that feels calm, intentional, and accessible — especially for daily reading of Arabic Quranic text — while integrating companion features without visual noise.',
    goals: [
      'Clean, distraction-free Quran reading experience with excellent Arabic typography',
      'Organized surah navigation with reading progress tracking',
      'Integrated audio player for recitation — minimal, non-intrusive',
      'Daily duas and dhikr section with clear categorization',
      'Settings: dark/light mode, font size, reading style preferences',
    ],
    uxProcess: [
      'Researched existing Quran apps to identify pain points: cluttered UI, poor Arabic rendering, difficult navigation',
      'Established the green/white visual identity — rooted in Islamic tradition without being clichéd',
      'Designed the reading view as the hero experience: generous margins, clear Arabic rendering, minimal chrome',
      'Built the information architecture: Home, Quran, Audio, Duas, Settings',
      'Designed accessibility-first: adjustable font size, high contrast, reading style options',
    ],
    userFlow: [
      'User opens app → home screen shows verse of the day, prayer times, and daily streak',
      'Navigates to Quran → browses surah list, continues where left off',
      'Reads a surah — clean reading view with audio player accessible below',
      'Visits Duas section → browses categories (Morning, Evening, Protection, Gratitude)',
      'Adjusts settings: font size, dark/light mode, reading style',
    ],
    keyFeatures: [
      'Distraction-free Quran reading with excellent Arabic text rendering',
      'Full surah list with verse counts and reading progress',
      'Integrated audio player with reciter selection',
      'Daily verse and prayer times on home screen',
      'Comprehensive duas library with categories and search',
    ],
    outcome: 'A complete Islamic companion app design demonstrating thoughtful Arabic UI design, accessibility thinking, and the ability to handle complex information architecture within a calm, focused experience.',
    figmaUrl: 'https://www.figma.com/design/RcVZTUlG98up5b6c2xih46/Untitled?node-id=0-1&t=J2lFyCsXBDiSTG76-1',
  },
  {
    type: 'ux',
    id: '05',
    slug: 'tv-maintenance',
    title: 'TV Maintenance',
    category: 'UI/UX / Web Design',
    filters: ['UI/UX', 'Web Design'],
    desc: 'A business-focused service website designed to present television maintenance services clearly and guide users toward contacting the business.',
    tech: ['Next.js', 'RTL Design', 'Arabic UI', 'WhatsApp Integration', 'Vercel'],
    color: '#2A82FF',
    platform: 'web',
    screenshotSrc: tvImg,
    overview: 'A professional service website for Mrkz Muhammad Ramadan — a TV screen repair and maintenance center. Designed in Arabic RTL with a dark, trustworthy aesthetic and a strong focus on driving customers to contact via WhatsApp.',
    challenge: 'Service businesses in Egypt often rely on social media pages without a professional web presence. The challenge was creating a credible, professional Arabic website that converts visitors to customers — primarily through WhatsApp, the dominant communication channel.',
    goals: [
      'Establish professional credibility that a social media page alone cannot provide',
      'Make the WhatsApp CTA immediately visible and action-driving across all devices',
      'Communicate service scope and expertise clearly in Arabic',
      'Dark, trustworthy visual identity that signals professionalism',
      'Fully responsive for mobile-first Egyptian audience',
    ],
    uxProcess: [
      'Identified the primary conversion goal: WhatsApp contact — made this the anchor for all CTAs',
      'Designed Arabic RTL layout with proper reading direction and typography hierarchy',
      'Established a dark blue/navy palette that communicates professionalism and trust',
      'Hero section: technician at work (authentic, not stock-feeling) + bold service headline',
      'Added trust signals: "Quality Guaranteed" badge, service scope description',
    ],
    userFlow: [
      'User finds the site (search or referral) → immediately sees the hero with service headline',
      'Scans hero: service description, technician image, trust badge',
      'Clicks prominent WhatsApp CTA in nav or hero — directed to WhatsApp chat',
      'Browses services section for additional confidence before contacting',
    ],
    keyFeatures: [
      'Full Arabic RTL layout with professional typography hierarchy',
      'Persistent WhatsApp CTA in navigation and hero section',
      'Hero with trust badge: "Quality Guaranteed — Reliable repairs for every fault"',
      'Dark professional aesthetic aligned with tech/service sector',
      'Mobile-responsive, deployed and live on Vercel',
    ],
    outcome: 'A live business website that demonstrates Arabic RTL web design, conversion-focused UX thinking, and the ability to build and deploy real products for real clients.',
    demoUrl: 'https://test6-six-iota.vercel.app/',
  },
  {
    type: 'ux',
    id: '06',
    slug: 'shady-farha',
    title: 'Shady & Farha',
    category: 'UI/UX / Web Experience',
    filters: ['UI/UX', 'Web Design'],
    desc: 'An interactive digital wedding invitation designed as an elegant and memorable online experience.',
    tech: ['React', 'Framer Motion', 'Watercolor Illustration', 'Web Animation', 'Vercel'],
    color: '#6B8FBF',
    platform: 'web',
    screenshotSrc: shadyImg,
    overview: "Shady & Farha is a bespoke digital wedding invitation delivered as a live, animated website. Featuring a watercolor-illustrated mansion hero, script typography, and a cinematic scroll experience — designed to feel as precious as a physical invitation.",
    challenge: 'A digital invitation has to compete with a physical card for emotional impact. The challenge was creating something that guests would open, be moved by, and remember — using web animation and illustration rather than paper and printing.',
    goals: [
      'An illustrated, cinematic first impression that stops the user and creates emotion',
      'Script typography that feels personal, not template-like',
      'Smooth scroll storytelling that reveals the wedding details elegantly',
      'Ambient music to heighten the emotional experience',
      'A design that feels completely unique to Shady and Farha',
    ],
    uxProcess: [
      'Chose watercolor illustration style for the hero — soft, romantic, non-digital feeling',
      'Designed the composition: illustrated mansion, cypress trees, garden, sky — with "Shady & Farha" in overlaid script',
      'Planned the scroll narrative: welcome → couple introduction → date/venue → RSVP',
      'Added ambient music that plays on interaction for immersion',
      'Built with React + Framer Motion for smooth animation performance',
    ],
    userFlow: [
      'Guest opens invitation link → full-screen illustrated hero with script names',
      'Scrolls to discover: "Welcome to our wedding" → couple details → event information',
      'Music plays to create an immersive, emotional atmosphere',
      'RSVP or contact section at the end',
    ],
    keyFeatures: [
      'Full-screen watercolor illustrated hero — illustrated architecture and garden',
      'Script typography for couple names with decorative ornaments',
      'Ambient background music experience',
      'Cinematic scroll-based storytelling flow',
      'Live, deployed and accessible by link',
    ],
    outcome: 'A live creative digital product that demonstrates versatility in design — from utility software to emotional, story-driven experiences. Proves that good UI/UX extends beyond apps and dashboards.',
    demoUrl: 'https://shadyfarha.vercel.app/',
  },
]

// Detail navigation follows the featured-work order first, then the AI projects.
export const ALL_PROJECTS: AnyProject[] = [...UX_PROJECTS, ...AI_PROJECTS]

export const FILTERS = ['All', 'UI/UX', 'AI & ML', 'Computer Vision', 'Web Design', 'Mobile Apps']
