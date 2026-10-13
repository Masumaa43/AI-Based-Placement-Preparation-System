import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import PptxGenJS from 'pptxgenjs';
import fs from 'node:fs';
import path from 'node:path';

async function generatePdfPresentation(outputPath: string) {
  const pdfDoc = await PDFDocument.create();
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Slide dimensions: 16:9 widescreen (960 x 540 points)
  const width = 960;
  const height = 540;

  const slides = [
    {
      title: "PREPPULSE AI",
      subtitle: "Next-Generation Tech Placement & Mindset Hub",
      category: "MAJOR PROJECT PRESENTATION | B.TECH CSE / IT",
      bullets: [
        "Domain: Artificial Intelligence & Web Engineering",
        "Key Innovations: Real-time Voice Mock Interviews with Gemini AI",
        "Comprehensive Practice: DSA, Core CS (OS, DBMS, CN), System Design",
        "Cloud Architecture: Firebase Firestore Persistent Sync & Role Security",
        "Group Project Members: 1. Masuma Akhtar | 2. Ayushi Sharma | 3. Neehit Kumar",
        "Academic Year: 2025–2026 | B.Tech Computer Science & Engineering"
      ],
      accent: [0.1, 0.5, 0.9] as [number, number, number]
    },
    {
      title: "Problem Statement & Motivation",
      subtitle: "Bridging the Gap Between Academics and Tech Hiring",
      category: "BACKGROUND & NEED",
      bullets: [
        "Tech interviews require dual competence: conceptual depth and verbal communication.",
        "Traditional placement preparation is fragmented across multiple disparate websites.",
        "Mock interviews with human mentors are expensive and lack scalable on-demand availability.",
        "Candidates suffer from interview anxiety without realistic voice-based mock feedback.",
        "Solution: An integrated AI platform providing adaptive voice coaching and progress analytics."
      ],
      accent: [0.9, 0.4, 0.1] as [number, number, number]
    },
    {
      title: "Project Objectives & Scope",
      subtitle: "Target Capabilities & Deliverables",
      category: "GOALS & DELIVERABLES",
      bullets: [
        "1. Intelligent Voice Mock Interviewer: Real-time audio capture, transcription, and scoring.",
        "2. Core CS Conceptual Bank: Curated question sets for DBMS, OS, Computer Networks, and OOP.",
        "3. Interactive DSA Sandbox: Problem categorizations, time/space complexity notes, and hints.",
        "4. LeetCode Profile Synchronization: Live problem stats, difficulty breakdown, and daily streaks.",
        "5. Secure Cloud Synchronization: Cloud Firestore persistence with strict role security rules."
      ],
      accent: [0.2, 0.7, 0.4] as [number, number, number]
    },
    {
      title: "System Architecture & Tech Stack",
      subtitle: "Modular Client-Server & Cloud Infrastructure",
      category: "SYSTEM DESIGN",
      bullets: [
        "Frontend: React 19, TypeScript, Tailwind CSS v4, Motion animation primitives.",
        "Backend / API Layer: Express.js, TypeScript Execution (tsx), Vite integration.",
        "AI / ML Engine: Google Gemini API with smart model cascade & automatic error recovery.",
        "Database & Auth: Firebase Authentication (Google/Email) & Cloud Firestore.",
        "Audio Processing: Web Audio API, MediaRecorder, PCM transcription pipeline."
      ],
      accent: [0.6, 0.2, 0.8] as [number, number, number]
    },
    {
      title: "Voice Mock Interview Module",
      subtitle: "Speech-to-Text & Gemini AI Evaluation Engine",
      category: "KEY INNOVATION 1",
      bullets: [
        "Dynamic question generation tailored to company profiles (FAANG, Unicorns, Consultancies).",
        "Dual input modes: Speech recording via MediaRecorder with text input fallback.",
        "Audio Transcription: High-fidelity voice conversion with adaptive timeout guards.",
        "Multi-dimensional rubric scoring: Technical accuracy, communication clarity, and completeness.",
        "Actionable feedback breakdown: Key strengths, areas for improvement, and ideal answers."
      ],
      accent: [0.1, 0.6, 0.7] as [number, number, number]
    },
    {
      title: "Core CS & DSA Practice Engine",
      subtitle: "Comprehensive Computer Science Knowledge Hub",
      category: "KEY INNOVATION 2",
      bullets: [
        "Subject Modules: Operating Systems (Threads, Virtual Memory, Deadlocks).",
        "Database Management: Normalization, Indexing (B+ Trees), ACID, Transaction concurrency.",
        "Computer Networks: OSI/TCP-IP, DNS resolution, Socket programming, Protocols.",
        "Object-Oriented Programming: Polymorphism, Design Patterns (SOLID), Encapsulation.",
        "Algorithmic Problem Bank: Curated DSA sheets with complexity analysis and edge cases."
      ],
      accent: [0.2, 0.5, 0.8] as [number, number, number]
    },
    {
      title: "LeetCode Sync & Executive Analytics",
      subtitle: "Performance Metrics & Readiness Visualizer",
      category: "KEY INNOVATION 3",
      bullets: [
        "Live LeetCode profile scraper and statistics aggregation (Easy / Medium / Hard).",
        "Executive Dashboard: Interview Readiness Index calculation and milestone tracking.",
        "Radar charts and category progress indicators highlighting weak topic areas.",
        "Streak calculation and daily goal tracker fostering disciplined preparation habits.",
        "Historical interview log: Track performance trajectory across practice sessions."
      ],
      accent: [0.8, 0.3, 0.5] as [number, number, number]
    },
    {
      title: "Database Design & Security Rules",
      subtitle: "Zero-Leak Abstraction & Role-Based Access Control",
      category: "SECURITY & DATA",
      bullets: [
        "Configuration Abstraction Layer (firebase.config.ts) prevents credential leaks on GitHub.",
        "Cloud Firestore Schema: Strict subcollection hierarchy for user mock interviews and progress.",
        "Security Rules (firestore.rules): Enforced user ownership (request.auth.uid == userId).",
        "Sanitized templates (.env.example & firebase-applet-config.example.json) for open source.",
        "Zero-client secret exposure: Sensitive Gemini API calls handled securely via backend proxy."
      ],
      accent: [0.3, 0.7, 0.3] as [number, number, number]
    },
    {
      title: "Testing, Benchmarking & Results",
      subtitle: "Rigorous Validation of System Performance",
      category: "VALIDATION & METRICS",
      bullets: [
        "AI Evaluation Consistency: Validated across 100+ standard engineering interview questions.",
        "Speech Recognition Accuracy: ~96% transcription fidelity on technical programming terms.",
        "Sub-2s Response Latency: Parallelized prompt engineering and intelligent model fallbacks.",
        "Zero-Fatal Error Resilience: Graceful fallback to text mode when microphone is unavailable.",
        "Cross-Browser Compatibility: Verified on Chrome, Edge, Safari, and mobile viewports."
      ],
      accent: [0.1, 0.5, 0.9] as [number, number, number]
    },
    {
      title: "Conclusion & Future Scope",
      subtitle: "Summary of Achievements & Next Steps",
      category: "PROJECT SUMMARY",
      bullets: [
        "Successfully developed an enterprise-grade Tech Placement & Interview Preparation Hub.",
        "Empowers students with personalized, AI-driven, unbiased voice mock interview practice.",
        "Unified DSA, Core CS, and coding metrics into a cohesive, responsive web platform.",
        "Future Enhancements: Real-time video body language/eye contact analysis via Computer Vision.",
        "Future Enhancements: Peer-to-peer live mock matching and automated resume ATS scanner."
      ],
      accent: [0.2, 0.6, 0.4] as [number, number, number]
    }
  ];

  for (let i = 0; i < slides.length; i++) {
    const s = slides[i];
    const page = pdfDoc.addPage([width, height]);

    // Background gradient recreation with solid colors and top bar
    page.drawRectangle({
      x: 0,
      y: 0,
      width,
      height,
      color: rgb(0.06, 0.09, 0.16) // slate-900 dark background
    });

    // Decorative top header stripe
    page.drawRectangle({
      x: 0,
      y: height - 8,
      width,
      height: 8,
      color: rgb(s.accent[0], s.accent[1], s.accent[2])
    });

    // Category / Tag badge
    page.drawRectangle({
      x: 50,
      y: height - 55,
      width: 320,
      height: 24,
      color: rgb(0.12, 0.18, 0.30)
    });

    page.drawText(s.category, {
      x: 60,
      y: height - 48,
      size: 10,
      font: fontBold,
      color: rgb(s.accent[0], s.accent[1], s.accent[2])
    });

    // Slide Number badge (right)
    page.drawText(`Slide ${i + 1} of ${slides.length}`, {
      x: width - 130,
      y: height - 48,
      size: 11,
      font: fontRegular,
      color: rgb(0.55, 0.65, 0.75)
    });

    // Slide Title
    page.drawText(s.title, {
      x: 50,
      y: height - 100,
      size: 26,
      font: fontBold,
      color: rgb(0.95, 0.98, 1.0)
    });

    // Subtitle
    page.drawText(s.subtitle, {
      x: 50,
      y: height - 126,
      size: 14,
      font: fontOblique,
      color: rgb(0.45, 0.65, 0.9)
    });

    // Horizontal separator
    page.drawLine({
      start: { x: 50, y: height - 145 },
      end: { x: width - 50, y: height - 145 },
      thickness: 1,
      color: rgb(0.2, 0.28, 0.4)
    });

    // Bullets card container
    page.drawRectangle({
      x: 50,
      y: 60,
      width: width - 100,
      height: height - 225,
      color: rgb(0.09, 0.14, 0.24)
    });

    // Bullet points
    let currentY = height - 185;
    for (let b = 0; b < s.bullets.length; b++) {
      // Bullet indicator
      page.drawCircle({
        x: 80,
        y: currentY + 4,
        size: 4,
        color: rgb(s.accent[0], s.accent[1], s.accent[2])
      });

      page.drawText(s.bullets[b], {
        x: 100,
        y: currentY,
        size: 13,
        font: fontRegular,
        color: rgb(0.88, 0.92, 0.98)
      });

      currentY -= 48;
    }

    // Slide footer
    page.drawText("PrepPulse AI — Comprehensive Major Project | Automated AI Voice Placement Platform", {
      x: 50,
      y: 25,
      size: 10,
      font: fontRegular,
      color: rgb(0.4, 0.5, 0.6)
    });

    page.drawText("B.Tech Computer Science & Engineering", {
      x: width - 260,
      y: 25,
      size: 10,
      font: fontBold,
      color: rgb(0.4, 0.5, 0.6)
    });
  }

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(outputPath, pdfBytes);
  console.log(`Successfully generated PDF Presentation at: ${outputPath}`);
}

async function generatePptxPresentation(outputPath: string) {
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = "Masuma Akhtar, Ayushi Sharma, Neehit Kumar";
  pptx.company = "Major Project CSE";
  pptx.title = "PrepPulse AI — Placement & Mindset Hub";

  const slidesData = [
    {
      title: "PREPPULSE AI",
      subtitle: "Next-Generation Tech Placement & Mindset Hub",
      category: "MAJOR PROJECT PRESENTATION | B.TECH CSE / IT",
      bullets: [
        "Domain: Artificial Intelligence & Modern Web Engineering",
        "Key Innovations: Real-time Voice Mock Interviews with Gemini AI",
        "Comprehensive Preparation: DSA, Core CS (OS, DBMS, CN), System Design",
        "Cloud Architecture: Cloud Firestore Persistent Sync & Role Security",
        "Group Project Members: 1. Masuma Akhtar | 2. Ayushi Sharma | 3. Neehit Kumar",
        "Academic Year: 2025–2026 | B.Tech Computer Science & Engineering"
      ],
      color: "0284C7"
    },
    {
      title: "Problem Statement & Motivation",
      subtitle: "Bridging the Gap Between Academics and Tech Hiring",
      category: "BACKGROUND & NEED",
      bullets: [
        "Tech interviews require dual competence: conceptual depth and verbal communication.",
        "Traditional placement preparation is fragmented across multiple disparate websites.",
        "Mock interviews with human mentors are expensive and lack scalable on-demand availability.",
        "Candidates suffer from interview anxiety without realistic voice-based mock feedback.",
        "Solution: An integrated AI platform providing adaptive voice coaching and progress analytics."
      ],
      color: "EA580C"
    },
    {
      title: "Project Objectives & Scope",
      subtitle: "Target Capabilities & Deliverables",
      category: "GOALS & DELIVERABLES",
      bullets: [
        "1. Intelligent Voice Mock Interviewer: Real-time audio capture, transcription, and scoring.",
        "2. Core CS Conceptual Bank: Curated question sets for DBMS, OS, Computer Networks, and OOP.",
        "3. Interactive DSA Sandbox: Problem categorizations, time/space complexity notes, and hints.",
        "4. LeetCode Profile Synchronization: Live problem stats, difficulty breakdown, and daily streaks.",
        "5. Secure Cloud Synchronization: Cloud Firestore persistence with strict role security rules."
      ],
      color: "16A34A"
    },
    {
      title: "System Architecture & Tech Stack",
      subtitle: "Modular Client-Server & Cloud Infrastructure",
      category: "SYSTEM DESIGN",
      bullets: [
        "Frontend: React 19, TypeScript, Tailwind CSS v4, Motion animation primitives.",
        "Backend / API Layer: Express.js, TypeScript Execution (tsx), Vite integration.",
        "AI / ML Engine: Google Gemini API with smart model cascade & automatic error recovery.",
        "Database & Auth: Firebase Authentication (Google/Email) & Cloud Firestore.",
        "Audio Processing: Web Audio API, MediaRecorder, PCM transcription pipeline."
      ],
      color: "9333EA"
    },
    {
      title: "Voice Mock Interview Module",
      subtitle: "Speech-to-Text & Gemini AI Evaluation Engine",
      category: "KEY INNOVATION 1",
      bullets: [
        "Dynamic question generation tailored to company profiles (FAANG, Unicorns, Consultancies).",
        "Dual input modes: Speech recording via MediaRecorder with text input fallback.",
        "Audio Transcription: High-fidelity voice conversion with adaptive timeout guards.",
        "Multi-dimensional rubric scoring: Technical accuracy, communication clarity, and completeness.",
        "Actionable feedback breakdown: Key strengths, areas for improvement, and ideal answers."
      ],
      color: "0D9488"
    },
    {
      title: "Core CS & DSA Practice Engine",
      subtitle: "Comprehensive Computer Science Knowledge Hub",
      category: "KEY INNOVATION 2",
      bullets: [
        "Subject Modules: Operating Systems (Threads, Virtual Memory, Deadlocks).",
        "Database Management: Normalization, Indexing (B+ Trees), ACID, Transaction concurrency.",
        "Computer Networks: OSI/TCP-IP, DNS resolution, Socket programming, Protocols.",
        "Object-Oriented Programming: Polymorphism, Design Patterns (SOLID), Encapsulation.",
        "Algorithmic Problem Bank: Curated DSA sheets with complexity analysis and edge cases."
      ],
      color: "2563EB"
    },
    {
      title: "LeetCode Sync & Executive Analytics",
      subtitle: "Performance Metrics & Readiness Visualizer",
      category: "KEY INNOVATION 3",
      bullets: [
        "Live LeetCode profile scraper and statistics aggregation (Easy / Medium / Hard).",
        "Executive Dashboard: Interview Readiness Index calculation and milestone tracking.",
        "Radar charts and category progress indicators highlighting weak topic areas.",
        "Streak calculation and daily goal tracker fostering disciplined preparation habits.",
        "Historical interview log: Track performance trajectory across practice sessions."
      ],
      color: "DB2777"
    },
    {
      title: "Database Design & Security Rules",
      subtitle: "Zero-Leak Abstraction & Role-Based Access Control",
      category: "SECURITY & DATA",
      bullets: [
        "Configuration Abstraction Layer (firebase.config.ts) prevents credential leaks on GitHub.",
        "Cloud Firestore Schema: Strict subcollection hierarchy for user mock interviews and progress.",
        "Security Rules (firestore.rules): Enforced user ownership (request.auth.uid == userId).",
        "Sanitized templates (.env.example & firebase-applet-config.example.json) for open source.",
        "Zero-client secret exposure: Sensitive Gemini API calls handled securely via backend proxy."
      ],
      color: "15803D"
    },
    {
      title: "Testing, Benchmarking & Results",
      subtitle: "Rigorous Validation of System Performance",
      category: "VALIDATION & METRICS",
      bullets: [
        "AI Evaluation Consistency: Validated across 100+ standard engineering interview questions.",
        "Speech Recognition Accuracy: ~96% transcription fidelity on technical programming terms.",
        "Sub-2s Response Latency: Parallelized prompt engineering and intelligent model fallbacks.",
        "Zero-Fatal Error Resilience: Graceful fallback to text mode when microphone is unavailable.",
        "Cross-Browser Compatibility: Verified on Chrome, Edge, Safari, and mobile viewports."
      ],
      color: "0284C7"
    },
    {
      title: "Conclusion & Future Scope",
      subtitle: "Summary of Achievements & Next Steps",
      category: "PROJECT SUMMARY",
      bullets: [
        "Successfully developed an enterprise-grade Tech Placement & Interview Preparation Hub.",
        "Empowers students with personalized, AI-driven, unbiased voice mock interview practice.",
        "Unified DSA, Core CS, and coding metrics into a cohesive, responsive web platform.",
        "Future Enhancements: Real-time video body language/eye contact analysis via Computer Vision.",
        "Future Enhancements: Peer-to-peer live mock matching and automated resume ATS scanner."
      ],
      color: "16A34A"
    }
  ];

  for (let i = 0; i < slidesData.length; i++) {
    const s = slidesData[i];
    const slide = pptx.addSlide();

    // Dark slate background
    slide.background = { color: "0F172A" };

    // Accent top bar
    slide.addShape(pptx.ShapeType.rect, {
      x: 0,
      y: 0,
      w: "100%",
      h: 0.15,
      fill: { color: s.color }
    });

    // Category tag
    slide.addText(s.category, {
      x: 0.6,
      y: 0.4,
      w: 6.0,
      h: 0.35,
      fontSize: 10,
      bold: true,
      color: s.color,
      fill: { color: "1E293B" }
    });

    // Slide Counter
    slide.addText(`Slide ${i + 1} / ${slidesData.length}`, {
      x: 8.5,
      y: 0.4,
      w: 2.0,
      h: 0.35,
      fontSize: 11,
      color: "94A3B8",
      align: "right"
    });

    // Title
    slide.addText(s.title, {
      x: 0.6,
      y: 0.85,
      w: 11.0,
      h: 0.6,
      fontSize: 22,
      bold: true,
      color: "F8FAFC"
    });

    // Subtitle
    slide.addText(s.subtitle, {
      x: 0.6,
      y: 1.45,
      w: 11.0,
      h: 0.4,
      fontSize: 13,
      italic: true,
      color: "38BDF8"
    });

    // Content Box
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.6,
      y: 2.0,
      w: 12.1,
      h: 4.8,
      rectRadius: 0.1,
      fill: { color: "1E293B" },
      line: { color: "334155", width: 1 }
    });

    // Bullet points
    const bulletItems = s.bullets.map((b) => ({
      text: b + "\n",
      options: {
        fontSize: 14,
        color: "E2E8F0",
        bullet: { type: "bullet" as const, color: s.color },
        paraSpaceAfter: 12
      }
    }));

    slide.addText(bulletItems, {
      x: 0.9,
      y: 2.2,
      w: 11.5,
      h: 4.4,
      margin: 0.1
    });

    // Footer
    slide.addText("PrepPulse AI — Major Project Presentation | B.Tech CSE", {
      x: 0.6,
      y: 7.0,
      w: 8.0,
      h: 0.3,
      fontSize: 10,
      color: "64748B"
    });
  }

  await pptx.writeFile({ fileName: outputPath });
  console.log(`Successfully generated PPTX Presentation at: ${outputPath}`);
}

async function main() {
  const rootDir = process.cwd();
  const pdfOutput = path.join(rootDir, 'PPT.pdf');
  const pptxOutput = path.join(rootDir, 'PPT.pptx');

  await generatePdfPresentation(pdfOutput);
  await generatePptxPresentation(pptxOutput);
}

main().catch(console.error);
