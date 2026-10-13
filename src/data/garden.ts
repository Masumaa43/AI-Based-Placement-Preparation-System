import { GardenState, PlantedTree, TreeSpecies, TreeStage, SubjectId } from '../types';

export interface TreeSpeciesConfig {
  id: TreeSpecies;
  name: string;
  tagline: string;
  unlockedAtStreak: number;
  badgeColor: string;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Legendary';
  description: string;
  lore: string;
}

export const SPECIES_CATALOG: Record<TreeSpecies, TreeSpeciesConfig> = {
  emerald_oak: {
    id: 'emerald_oak',
    name: 'Emerald Core Oak',
    tagline: 'Deep Roots in DBMS & OS',
    unlockedAtStreak: 1,
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    rarity: 'Common',
    description: 'A sturdy oak nurtured by transactional integrity and process scheduling fundamentals.',
    lore: 'Symbolizes solid architecture, atomic commits, and deadlock prevention.'
  },
  binary_cypress: {
    id: 'binary_cypress',
    name: 'Binary Cypress',
    tagline: 'Balanced like an AVL & Red-Black Tree',
    unlockedAtStreak: 3,
    badgeColor: 'bg-teal-100 text-teal-800 border-teal-300',
    rarity: 'Uncommon',
    description: 'Reaches high into the sky with self-balancing branches of logarithmic complexity.',
    lore: 'Planted on 3+ day streaks. Guarantees O(log N) lookup time for all study concepts.'
  },
  blossom_cherry: {
    id: 'blossom_cherry',
    name: 'Mindset Sakura',
    tagline: 'Emotional Resilience & Calm Focus',
    unlockedAtStreak: 5,
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    rarity: 'Rare',
    description: 'Blooms whenever you overcome pre-interview anxiety and maintain positive momentum.',
    lore: 'Its delicate petals remind you that every bug fixed is a step towards mastery.'
  },
  quantum_willow: {
    id: 'quantum_willow',
    name: 'Quantum Willow',
    tagline: 'Networking & Concurrency Elegance',
    unlockedAtStreak: 7,
    badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300',
    rarity: 'Rare',
    description: 'Weaves packet streams and async event loops with smooth, resilient boughs.',
    lore: 'Withstands sudden traffic spikes and complex distributed system questions.'
  },
  golden_sequoia: {
    id: 'golden_sequoia',
    name: 'Golden Sequoia',
    tagline: 'The Legendary 10-Day Streak Titan',
    unlockedAtStreak: 10,
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    rarity: 'Legendary',
    description: 'The crowning glory of true interview dedication. Imbued with elite FAANG-tier tenacity.',
    lore: 'Legends say this ancient giant absorbs imposter syndrome and converts it into pure algorithmic confidence.'
  },
  zen_bonsai: {
    id: 'zen_bonsai',
    name: 'Zen Bonsai',
    tagline: 'Purity in OOP & Clean Code',
    unlockedAtStreak: 14,
    badgeColor: 'bg-lime-100 text-lime-800 border-lime-300',
    rarity: 'Legendary',
    description: 'Pruned to perfection. Every branch represents single-responsibility and dependency inversion.',
    lore: 'Awarded to master technicians who code without bloated abstractions.'
  }
};

export const STAGE_META: Record<TreeStage, { label: string; icon: string; minXp: number; heightClass: string }> = {
  seed: { label: 'Seedling', icon: '🌰', minXp: 10, heightClass: 'h-10 text-xl' },
  sprout: { label: 'Sprout', icon: '🌱', minXp: 30, heightClass: 'h-14 text-2xl' },
  sapling: { label: 'Sapling', icon: '🌿', minXp: 75, heightClass: 'h-20 text-3xl' },
  blooming: { label: 'Blooming Tree', icon: '🌳', minXp: 150, heightClass: 'h-28 text-5xl' },
  ancient: { label: 'Ancient Elder', icon: '🌲', minXp: 300, heightClass: 'h-36 text-6xl' }
};

export function getTodayDateString(): string {
  const d = new Date();
  return d.toISOString().split('T')[0];
}

export function getPastDateString(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
}

export function createInitialGardenState(): GardenState {
  const today = getTodayDateString();
  const d1 = getPastDateString(4);
  const d2 = getPastDateString(3);
  const d3 = getPastDateString(2);
  const d4 = getPastDateString(1);

  const initialTrees: PlantedTree[] = [
    {
      id: 'tree-1',
      species: 'emerald_oak',
      name: 'Foundation Oak (DBMS)',
      stage: 'ancient',
      plantedDate: d1,
      streakDay: 1,
      subjectFocus: 'dbms',
      xpContributed: 320,
      wateredToday: true,
      notes: 'Planted on your first day of SQL & Normalization review.'
    },
    {
      id: 'tree-2',
      species: 'binary_cypress',
      name: 'Algorithm Cypress (DSA)',
      stage: 'blooming',
      plantedDate: d2,
      streakDay: 2,
      subjectFocus: 'dsa',
      xpContributed: 210,
      wateredToday: true,
      notes: 'Planted after mastering Two-Pointer and Binary Search logic.'
    },
    {
      id: 'tree-3',
      species: 'blossom_cherry',
      name: 'Resilience Sakura',
      stage: 'sapling',
      plantedDate: d3,
      streakDay: 3,
      subjectFocus: 'oops',
      xpContributed: 110,
      wateredToday: true,
      notes: 'Sprouted on Day 3 during Polymorphism and System Design deep dive.'
    },
    {
      id: 'tree-4',
      species: 'quantum_willow',
      name: 'Network Willow (CN & OS)',
      stage: 'sprout',
      plantedDate: d4,
      streakDay: 4,
      subjectFocus: 'os',
      xpContributed: 55,
      wateredToday: true,
      notes: 'Grew yesterday during CPU Scheduling & Deadlock simulation.'
    }
  ];

  return {
    currentStreak: 4,
    longestStreak: 4,
    lastActiveDate: d4, // Ready for today's session!
    trees: initialTrees,
    totalStudyMinutes: 185,
    totalQuestionsAnswered: 28,
    gardenLevel: 2,
    streakFreezes: 1,
    fertilizerCharges: 2
  };
}
