import { MoodResponse, MoodType } from '../types';

export const MOOD_CONFIG: Record<
  MoodType,
  { label: string; emoji: string; badge: string; color: string; bgGradient: string; description: string }
> = {
  bad: {
    label: 'Bad / Burnt Out',
    emoji: '🌧️',
    badge: 'Reset & Re-energize',
    color: 'from-emerald-600 to-teal-700',
    bgGradient: 'bg-emerald-50/60 border-emerald-200 text-emerald-950',
    description: 'Hit a wall on a tough problem, feeling imposter syndrome, or feeling drained from interview rounds.'
  },
  good: {
    label: 'Good / Steady',
    emoji: '🌱',
    badge: 'Consistent Progress',
    color: 'from-emerald-500 to-green-600',
    bgGradient: 'bg-emerald-50/80 border-emerald-200 text-emerald-950',
    description: 'Showing up, moving one topic at a time, and building steady daily engineering habits.'
  },
  better: {
    label: 'Better / Gaining Momentum',
    emoji: '⚡',
    badge: 'High Acceleration',
    color: 'from-teal-500 to-emerald-600',
    bgGradient: 'bg-teal-50/70 border-teal-200 text-teal-950',
    description: 'Core concepts are connecting, pattern recognition is sharp, and confidence is rising.'
  },
  best: {
    label: 'Best / In The Zone',
    emoji: '🔥',
    badge: 'Peak Interview Shape',
    color: 'from-emerald-600 to-green-700',
    bgGradient: 'bg-green-50/80 border-green-200 text-green-950',
    description: 'Cracking medium and hard problems with clarity, clear mental models, and top-tier focus.'
  }
};

export const FALLBACK_MOOD_RESPONSES: Record<MoodType, MoodResponse> = {
  bad: {
    mood: 'bad',
    tone: 'Compassionate, grounding, and empowering',
    headline: 'Every great software engineer was once stuck on a bug they thought they could never solve.',
    quotes: [
      {
        quote: "Failure is simply the opportunity to begin again, this time more intelligently.",
        author: "Henry Ford",
        context: "Rejected interviews or red compilation errors are just unit tests for your perseverance.",
        badge: "Resilience"
      },
      {
        quote: "The expert in anything was once a beginner who refused to quit.",
        author: "Helen Hayes",
        context: "Nobody is born knowing Dynamic Programming or OS Semaphore internals. It is just repeated exposure.",
        badge: "Patience"
      },
      {
        quote: "You don't have to see the whole staircase, just take the first step.",
        author: "Martin Luther King Jr.",
        context: "Don't stare at 500 LeetCode problems all at once. Just solve one small easy problem today to rebuild momentum.",
        badge: "Mindset"
      },
      {
        quote: "It's not that I'm so smart, it's just that I stay with problems longer.",
        author: "Albert Einstein",
        context: "When a concept feels impossible, your brain is physically rewiring synaptic connections. Rest, sleep, and try tomorrow.",
        badge: "Growth"
      }
    ],
    mindsetTip: "Step away from the screen for 15 minutes. Drink water, take a brisk walk, and remind yourself that struggling is the actual physiological process of learning.",
    recommendedAction: "Do NOT attempt a Hard question right now. Review 1 easy conceptual flashcard in OS or OOPs to get an effortless win."
  },
  good: {
    mood: 'good',
    tone: 'Encouraging, structured, and forward-looking',
    headline: 'Consistency outperforms occasional intensity every single day.',
    quotes: [
      {
        quote: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
        author: "Will Durant",
        context: "Doing 2 problems and 1 system concept every single day beats cramming 14 hours the night before.",
        badge: "Consistency"
      },
      {
        quote: "Small daily improvements over time lead to stunning results.",
        author: "Robin Sharma",
        context: "Mastering 1 DBMS normal form or 1 sliding window pattern today is an irreversible gain.",
        badge: "Compound Growth"
      },
      {
        quote: "Success is the sum of small efforts, repeated day in and day out.",
        author: "Robert Collier",
        context: "Stay in your steady rhythm. Protect your focus time.",
        badge: "Focus"
      }
    ],
    mindsetTip: "Pick one specific subject target for today (e.g. 5 questions on DBMS Normalization) and finish it before switching tabs.",
    recommendedAction: "Take the 10-question Core Tech Quiz on your weakest flagged subject."
  },
  better: {
    mood: 'better',
    tone: 'Energizing, ambitious, and sharp',
    headline: 'You are gaining speed. Now harness this wave to tackle topics you used to dodge.',
    quotes: [
      {
        quote: "Energy flows where attention goes.",
        author: "Tony Robbins",
        context: "Use this mental clarity to conquer tricky topics like Graph Traversals or Deadlock Avoidance.",
        badge: "Breakthrough"
      },
      {
        quote: "Simplicity is prerequisite for reliability.",
        author: "Edsger W. Dijkstra",
        context: "When you feel good, your solutions become cleaner, more modular, and interview-ready.",
        badge: "Craftsmanship"
      },
      {
        quote: "Action is the foundational key to all success.",
        author: "Pablo Picasso",
        context: "Ride this momentum. Try writing out your thoughts out loud like you're in a live Google/Amazon technical screen.",
        badge: "Execution"
      }
    ],
    mindsetTip: "Practice speaking your thoughts aloud while tracing edge cases. Interviewers score your problem-solving communication as much as the code.",
    recommendedAction: "Attempt a Medium DSA problem with a 25-minute timer to simulate real round pressure."
  },
  best: {
    mood: 'best',
    tone: 'Triumphant, peak-state, and inspirational',
    headline: 'You are in prime interview form. Let\'s convert this energy into absolute mastery.',
    quotes: [
      {
        quote: "Champions keep playing until they get it right.",
        author: "Billie Jean King",
        context: "When you are dialed in, every edge case becomes obvious and code flows effortlessly.",
        badge: "Peak State"
      },
      {
        quote: "The only limit to our realization of tomorrow will be our doubts of today.",
        author: "Franklin D. Roosevelt",
        context: "You belong in top tech companies. Back your preparation with absolute self-belief.",
        badge: "Unstoppable"
      },
      {
        quote: "Make it work, make it right, make it fast.",
        author: "Kent Beck",
        context: "Brute force first -> Optimize time/space -> Dry run with edge cases like a senior engineer.",
        badge: "Mastery"
      }
    ],
    mindsetTip: "Simulate a live FAANG mock interview: Pick a weak area and teach the concept to an imaginary junior dev.",
    recommendedAction: "Generate a custom AI mock interview question or test your speed in the 15-minute Tech Workout."
  }
};
