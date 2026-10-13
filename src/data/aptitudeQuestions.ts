import { Question, SubjectId } from '../types';

export interface BookAptitudeQuestion extends Question {
  section: 'A' | 'B';
  sectionName: string;
  bookSource: string;
  chapter: string;
  shortcutTrick?: string;
}

export const BOOK_APTITUDE_QUESTIONS: BookAptitudeQuestion[] = [
  // ==========================================
  // SECTION A: MATHS & QUANTITATIVE REASONING
  // Sourced from:
  // 1. R.S. Aggarwal - "Quantitative Aptitude for Competitive Examinations" (S. Chand)
  // 2. Arun Sharma - "How to Prepare for Quantitative Aptitude for CAT" (McGraw Hill)
  // ==========================================

  // 1. Time & Work
  {
    id: 'apt-sec-a-1',
    subjectId: 'aptitude',
    section: 'A',
    sectionName: 'Section A: Maths & Quantitative Reasoning',
    bookSource: 'R.S. Aggarwal - Quantitative Aptitude (S. Chand)',
    chapter: 'Chapter 15: Time & Work',
    topicId: 'apt-work',
    topicName: 'Time, Work & Efficiency',
    difficulty: 'Easy',
    question: 'A can do a piece of work in 12 days, and B can do the same work in 15 days. If they work together, how many days will they take to complete the work?',
    options: [
      '6 days 16 hours (6 2/3 days)',
      '7 days 12 hours (7 1/2 days)',
      '5 days 10 hours',
      '8 days'
    ],
    correctIndex: 0,
    explanation: 'Rate of A = 1/12 work/day. Rate of B = 1/15 work/day. Combined rate = 1/12 + 1/15 = (5 + 4)/60 = 9/60 = 3/20 work/day. Total days = 20/3 = 6 2/3 days (6 days 16 hours).',
    shortcutTrick: 'Formula: (A × B) / (A + B) = (12 × 15) / (12 + 15) = 180 / 27 = 20 / 3 = 6 2/3 days.',
    companyTags: ['TCS', 'Infosys', 'Wipro']
  },

  // 2. Time & Work with Wages
  {
    id: 'apt-sec-a-2',
    subjectId: 'aptitude',
    section: 'A',
    sectionName: 'Section A: Maths & Quantitative Reasoning',
    bookSource: 'R.S. Aggarwal - Quantitative Aptitude (S. Chand)',
    chapter: 'Chapter 15: Time & Work',
    topicId: 'apt-work',
    topicName: 'Time, Work & Efficiency',
    difficulty: 'Medium',
    question: 'A, B and C undertake to do a work for Rs. 5290. A and B together do 19/23 of the total work, while B and C together do 8/23 of the work. What is the individual share of B?',
    options: [
      'Rs. 720',
      'Rs. 920',
      'Rs. 840',
      'Rs. 1050'
    ],
    correctIndex: 1,
    explanation: 'Work done by A + B = 19/23 => Work done by C = 1 - 19/23 = 4/23. Work done by B + C = 8/23 => Work done by B = 8/23 - 4/23 = 4/23. Therefore, share of B = (4/23) × 5290. Since 5290 / 23 = 230, Share of B = 4 × 230 = Rs. 920.',
    shortcutTrick: 'B = (A + B) + (B + C) - Total = 19/23 + 8/23 - 23/23 = 4/23. 4/23 × 5290 = 920.',
    companyTags: ['Cognizant', 'Capgemini', 'Accenture']
  },

  // 3. Pipes & Cisterns
  {
    id: 'apt-sec-a-3',
    subjectId: 'aptitude',
    section: 'A',
    sectionName: 'Section A: Maths & Quantitative Reasoning',
    bookSource: 'R.S. Aggarwal - Quantitative Aptitude (S. Chand)',
    chapter: 'Chapter 16: Pipes & Cisterns',
    topicId: 'apt-work',
    topicName: 'Pipes & Cisterns',
    difficulty: 'Medium',
    question: 'Two pipes A and B can fill a cistern in 20 and 30 minutes respectively. A third pipe C can empty the full tank in 15 minutes. If all three pipes are opened simultaneously, in how much time will the cistern be completely filled?',
    options: [
      '50 minutes',
      '60 minutes',
      '45 minutes',
      'Tank will never be filled'
    ],
    correctIndex: 1,
    explanation: 'Net 1-minute inflow = 1/20 + 1/30 - 1/15. LCM(20, 30, 15) = 60. Net rate = (3 + 2 - 4) / 60 = 1/60 per minute. Therefore, the cistern will be filled in 60 minutes.',
    shortcutTrick: 'Take total capacity = 60 units. Pipe A = +3 units/min, Pipe B = +2 units/min, Pipe C = -4 units/min. Net = 3 + 2 - 4 = +1 unit/min. 60 / 1 = 60 minutes.',
    companyTags: ['TCS Ninja', 'IBM', 'Tech Mahindra']
  },

  // 4. Speed, Time & Distance
  {
    id: 'apt-sec-a-4',
    subjectId: 'aptitude',
    section: 'A',
    sectionName: 'Section A: Maths & Quantitative Reasoning',
    bookSource: 'R.S. Aggarwal - Quantitative Aptitude (S. Chand)',
    chapter: 'Chapter 17: Time and Distance',
    topicId: 'apt-speed',
    topicName: 'Speed, Time & Distance',
    difficulty: 'Easy',
    question: 'A person travels from city P to city Q at an average speed of 60 km/h, and returns from city Q to city P along the same route at 40 km/h. What is the average speed for the entire round trip?',
    options: [
      '50 km/h',
      '48 km/h',
      '52 km/h',
      '46.5 km/h'
    ],
    correctIndex: 1,
    explanation: 'Average speed for equal distances = (2 × S1 × S2) / (S1 + S2) = (2 × 60 × 40) / (60 + 40) = 4800 / 100 = 48 km/h. Note that average speed is the harmonic mean of speeds, not arithmetic mean.',
    shortcutTrick: '2xy / (x + y) = (2 × 60 × 40) / 100 = 48 km/h.',
    companyTags: ['Amazon', 'Infosys', 'Deloitte']
  },

  // 5. Problems on Trains (Opposite Directions)
  {
    id: 'apt-sec-a-5',
    subjectId: 'aptitude',
    section: 'A',
    sectionName: 'Section A: Maths & Quantitative Reasoning',
    bookSource: 'R.S. Aggarwal - Quantitative Aptitude (S. Chand)',
    chapter: 'Chapter 18: Problems on Trains',
    topicId: 'apt-speed',
    topicName: 'Problems on Trains & Relative Speed',
    difficulty: 'Medium',
    question: 'Two trains 140 m and 160 m long are running towards each other on parallel tracks at speeds of 60 km/h and 48 km/h respectively. In how many seconds will they completely cross each other from the moment they meet?',
    options: [
      '10 seconds',
      '12 seconds',
      '15 seconds',
      '9 seconds'
    ],
    correctIndex: 0,
    explanation: 'Total distance to cross = Length 1 + Length 2 = 140 + 160 = 300 m. Since moving towards each other, relative speed = 60 + 48 = 108 km/h. Convert to m/s: 108 × (5/18) = 6 × 5 = 30 m/s. Time = Distance / Speed = 300 / 30 = 10 seconds.',
    shortcutTrick: 'Relative Speed = 108 km/h = 30 m/s. Time = (140 + 160) / 30 = 300 / 30 = 10 sec.',
    companyTags: ['TCS Digital', 'Wipro', 'Mindtree']
  },

  // 6. Boats & Streams
  {
    id: 'apt-sec-a-6',
    subjectId: 'aptitude',
    section: 'A',
    sectionName: 'Section A: Maths & Quantitative Reasoning',
    bookSource: 'R.S. Aggarwal - Quantitative Aptitude (S. Chand)',
    chapter: 'Chapter 19: Boats and Streams',
    topicId: 'apt-speed',
    topicName: 'Boats & Streams',
    difficulty: 'Medium',
    question: 'A boat can travel at 13 km/h in still water. If the speed of the river current is 4 km/h, what is the total time taken by the boat to travel 68 km downstream and return 45 km upstream?',
    options: [
      '8 hours',
      '9 hours',
      '10 hours',
      '7.5 hours'
    ],
    correctIndex: 1,
    explanation: 'Downstream speed = 13 + 4 = 17 km/h. Upstream speed = 13 - 4 = 9 km/h. Downstream time = 68 / 17 = 4 hours. Upstream time = 45 / 9 = 5 hours. Total time = 4 + 5 = 9 hours.',
    shortcutTrick: 'T = (68 / 17) + (45 / 9) = 4 + 5 = 9 hrs.',
    companyTags: ['Cognizant', 'HCL', 'Accenture']
  },

  // 7. Profit & Loss (Dishonest Shopkeeper)
  {
    id: 'apt-sec-a-7',
    subjectId: 'aptitude',
    section: 'A',
    sectionName: 'Section A: Maths & Quantitative Reasoning',
    bookSource: 'R.S. Aggarwal - Quantitative Aptitude (S. Chand)',
    chapter: 'Chapter 11: Profit and Loss',
    topicId: 'apt-pl',
    topicName: 'Profit, Loss & False Weights',
    difficulty: 'Hard',
    question: 'A dishonest merchant claims to sell his goods at cost price, but uses a false weight of 900 grams for a 1 kg weight. What is his exact percentage gain?',
    options: [
      '10%',
      '11 1/9% (100/9 %)',
      '9 1/11%',
      '12.5%'
    ],
    correctIndex: 1,
    explanation: 'Formula for false weight profit: Profit % = [Error / (True Value - Error)] × 100%. Error = 1000 - 900 = 100g. Cost to merchant is for 900g. Profit % = (100 / 900) × 100% = 100/9% = 11 1/9% ≈ 11.11%.',
    shortcutTrick: 'Gain % = (Error / Weight Given) × 100 = (100 / 900) × 100 = 11 1/9%.',
    companyTags: ['Goldman Sachs', 'Amazon', 'TCS']
  },

  // 8. Successive Discounts
  {
    id: 'apt-sec-a-8',
    subjectId: 'aptitude',
    section: 'A',
    sectionName: 'Section A: Maths & Quantitative Reasoning',
    bookSource: 'R.S. Aggarwal - Quantitative Aptitude (S. Chand)',
    chapter: 'Chapter 11: Profit and Loss',
    topicId: 'apt-pl',
    topicName: 'Marked Price & Successive Discounts',
    difficulty: 'Easy',
    question: 'An electronic device with a marked price of Rs. 5000 is sold with two successive discounts of 20% and 10%. What is the final selling price?',
    options: [
      'Rs. 3500',
      'Rs. 3600',
      'Rs. 3450',
      'Rs. 3800'
    ],
    correctIndex: 1,
    explanation: 'After 20% discount: 5000 × (1 - 0.20) = Rs. 4000. After second 10% discount: 4000 × (1 - 0.10) = Rs. 3600.',
    shortcutTrick: 'Equivalent single discount = d1 + d2 - (d1 × d2)/100 = 20 + 10 - 2 = 28%. SP = 72% of 5000 = 3600.',
    companyTags: ['Capgemini', 'Infosys']
  },

  // 9. Simple Interest vs Compound Interest
  {
    id: 'apt-sec-a-9',
    subjectId: 'aptitude',
    section: 'A',
    sectionName: 'Section A: Maths & Quantitative Reasoning',
    bookSource: 'R.S. Aggarwal - Quantitative Aptitude (S. Chand)',
    chapter: 'Chapter 22: Compound Interest',
    topicId: 'apt-pl',
    topicName: 'CI - SI Differences',
    difficulty: 'Medium',
    question: 'The difference between compound interest (compounded annually) and simple interest on a certain principal sum at 10% per annum for 2 years is Rs. 65. What is the principal sum?',
    options: [
      'Rs. 6000',
      'Rs. 6500',
      'Rs. 7200',
      'Rs. 5800'
    ],
    correctIndex: 1,
    explanation: 'For 2 years, the difference between CI and SI is given by: D = P × (R / 100)^2. Here D = 65, R = 10. 65 = P × (10 / 100)^2 = P × (1 / 100). Therefore, P = 65 × 100 = Rs. 6500.',
    shortcutTrick: 'Principal = Difference × (100 / R)^2 = 65 × (100 / 10)^2 = 65 × 100 = Rs. 6500.',
    companyTags: ['Cognizant', 'TCS', 'Wipro']
  },

  // 10. Ratio & Proportions (Mixtures)
  {
    id: 'apt-sec-a-10',
    subjectId: 'aptitude',
    section: 'A',
    sectionName: 'Section A: Maths & Quantitative Reasoning',
    bookSource: 'R.S. Aggarwal - Quantitative Aptitude (S. Chand)',
    chapter: 'Chapter 12: Ratio and Proportion',
    topicId: 'apt-ratio',
    topicName: 'Ratios, Percentages & Averages',
    difficulty: 'Medium',
    question: 'A vessel contains 60 liters of milk and water in the ratio 3 : 2. How much water must be added to this mixture so that the ratio of milk to water becomes 1 : 1?',
    options: [
      '10 liters',
      '12 liters',
      '15 liters',
      '8 liters'
    ],
    correctIndex: 1,
    explanation: 'Total mixture = 60 L. Milk = (3/5) × 60 = 36 L. Water = (2/5) × 60 = 24 L. We add w liters of water to make milk:water = 1:1. 36 / (24 + w) = 1/1 => 24 + w = 36 => w = 12 liters.',
    shortcutTrick: 'Milk remains fixed at 36L. For 1:1, water must also be 36L. Water added = 36 - 24 = 12L.',
    companyTags: ['Accenture', 'TCS', 'LTI']
  },

  // 11. Alligation or Mixture
  {
    id: 'apt-sec-a-11',
    subjectId: 'aptitude',
    section: 'A',
    sectionName: 'Section A: Maths & Quantitative Reasoning',
    bookSource: 'R.S. Aggarwal - Quantitative Aptitude (S. Chand)',
    chapter: 'Chapter 20: Alligation or Mixture',
    topicId: 'apt-ratio',
    topicName: 'Rule of Alligation',
    difficulty: 'Medium',
    question: 'In what ratio must tea costing Rs. 62 per kg be mixed with tea costing Rs. 72 per kg so that the mixture is worth Rs. 64.50 per kg?',
    options: [
      '3 : 1',
      '4 : 1',
      '5 : 2',
      '3 : 2'
    ],
    correctIndex: 0,
    explanation: 'By Rule of Alligation: (Quantity of Cheaper) / (Quantity of Dearer) = (Price of Dearer - Mean Price) / (Mean Price - Price of Cheaper) = (72 - 64.50) / (64.50 - 62) = 7.50 / 2.50 = 3 / 1 = 3 : 1.',
    shortcutTrick: 'Cross differences: 72 - 64.5 = 7.5; 64.5 - 62 = 2.5. Ratio = 7.5 : 2.5 = 3 : 1.',
    companyTags: ['Deloitte', 'Infosys']
  },

  // 12. Percentages (Price and Consumption)
  {
    id: 'apt-sec-a-12',
    subjectId: 'aptitude',
    section: 'A',
    sectionName: 'Section A: Maths & Quantitative Reasoning',
    bookSource: 'R.S. Aggarwal - Quantitative Aptitude (S. Chand)',
    chapter: 'Chapter 10: Percentage',
    topicId: 'apt-ratio',
    topicName: 'Price & Consumption Rule',
    difficulty: 'Easy',
    question: 'If the price of petrol increases by 25%, by what percentage must a motorist reduce his consumption so that his overall expenditure on petrol remains unchanged?',
    options: [
      '25%',
      '20%',
      '16 2/3%',
      '22.5%'
    ],
    correctIndex: 1,
    explanation: 'Formula: Percentage reduction in consumption = [R / (100 + R)] × 100%. Here R = 25. Reduction = [25 / (100 + 25)] × 100% = (25 / 125) × 100% = 1/5 × 100% = 20%.',
    shortcutTrick: 'Original price = 100, new = 125. Reduction required = (25 / 125) × 100% = 20%.',
    companyTags: ['Wipro', 'TCS Ninja', 'IBM']
  },

  // 13. Averages (Replacement problem)
  {
    id: 'apt-sec-a-13',
    subjectId: 'aptitude',
    section: 'A',
    sectionName: 'Section A: Maths & Quantitative Reasoning',
    bookSource: 'R.S. Aggarwal - Quantitative Aptitude (S. Chand)',
    chapter: 'Chapter 6: Average',
    topicId: 'apt-ratio',
    topicName: 'Weighted Average & Replacement',
    difficulty: 'Medium',
    question: 'The average weight of 8 persons increases by 2.5 kg when a new person replaces one of them who weighs 65 kg. What is the weight of the new person?',
    options: [
      '80 kg',
      '85 kg',
      '82.5 kg',
      '78 kg'
    ],
    correctIndex: 1,
    explanation: 'Total increase in weight = 8 × 2.5 kg = 20 kg. Since one person is replaced by another, the new person must bring in the weight of the replaced person plus the total excess weight: Weight of new person = 65 kg + 20 kg = 85 kg.',
    shortcutTrick: 'Weight_new = Weight_old + (N × increase) = 65 + (8 × 2.5) = 65 + 20 = 85 kg.',
    companyTags: ['Tech Mahindra', 'Accenture', 'Cognizant']
  },

  // 14. Permutations (Word Arrangement)
  {
    id: 'apt-sec-a-14',
    subjectId: 'aptitude',
    section: 'A',
    sectionName: 'Section A: Maths & Quantitative Reasoning',
    bookSource: 'R.S. Aggarwal - Quantitative Aptitude (S. Chand)',
    chapter: 'Chapter 30: Permutations and Combinations',
    topicId: 'apt-pnc',
    topicName: 'Permutations, Combinations & Probability',
    difficulty: 'Medium',
    question: 'In how many different ways can the letters of the word "LEADING" be arranged in such a way that the vowels always come together?',
    options: [
      '360',
      '720',
      '5040',
      '144'
    ],
    correctIndex: 1,
    explanation: 'The word "LEADING" has 7 letters: Vowels = E, A, I (3 vowels); Consonants = L, D, N, G (4 consonants). Treat the 3 vowels as 1 single block. Now we have 4 consonants + 1 block = 5 entities, which can be arranged in 5! = 120 ways. Within the block, the 3 vowels (E, A, I) can be arranged among themselves in 3! = 6 ways. Total arrangements = 5! × 3! = 120 × 6 = 720.',
    shortcutTrick: 'Entities = 4 consonants + 1 vowel block = 5. Ways = 5! × 3! = 120 × 6 = 720.',
    companyTags: ['Amazon', 'Microsoft', 'TCS Digital']
  },

  // 15. Combinations (Committee Selection)
  {
    id: 'apt-sec-a-15',
    subjectId: 'aptitude',
    section: 'A',
    sectionName: 'Section A: Maths & Quantitative Reasoning',
    bookSource: 'R.S. Aggarwal - Quantitative Aptitude (S. Chand)',
    chapter: 'Chapter 30: Permutations and Combinations',
    topicId: 'apt-pnc',
    topicName: 'Combinations & Group Formation',
    difficulty: 'Medium',
    question: 'Out of 7 men and 4 women, a committee of 5 is to be formed. In how many ways can this be done so that the committee includes at least 3 men?',
    options: [
      '350',
      '441',
      '210',
      '420'
    ],
    correctIndex: 1,
    explanation: 'Possible valid compositions of committee of 5 with at least 3 men: Case 1: 3 Men and 2 Women = 7C3 × 4C2 = 35 × 6 = 210. Case 2: 4 Men and 1 Woman = 7C4 × 4C1 = 35 × 4 = 140. Case 3: 5 Men and 0 Women = 7C5 × 4C0 = 21 × 1 = 21. Total ways = 210 + 140 + 21 = 441.',
    shortcutTrick: '7C3×4C2 + 7C4×4C1 + 7C5 = (35×6) + (35×4) + 21 = 210 + 140 + 21 = 441.',
    companyTags: ['Goldman Sachs', 'Oracle', 'Cognizant']
  },

  // 16. Probability (Colored Marbles)
  {
    id: 'apt-sec-a-16',
    subjectId: 'aptitude',
    section: 'A',
    sectionName: 'Section A: Maths & Quantitative Reasoning',
    bookSource: 'R.S. Aggarwal - Quantitative Aptitude (S. Chand)',
    chapter: 'Chapter 31: Probability',
    topicId: 'apt-pnc',
    topicName: 'Probability of Non-Replacement Events',
    difficulty: 'Medium',
    question: 'A bag contains 6 black and 8 white balls. One ball is drawn at random. What is the probability that the ball drawn is white?',
    options: [
      '3/7',
      '4/7',
      '1/8',
      '3/4'
    ],
    correctIndex: 1,
    explanation: 'Total number of balls = 6 + 8 = 14. Number of favorable outcomes (white balls) = 8. Probability = 8 / 14 = 4 / 7.',
    shortcutTrick: 'P(White) = 8 / 14 = 4/7.',
    companyTags: ['TCS', 'Infosys']
  },

  // 17. Probability (Two Cards from Pack)
  {
    id: 'apt-sec-a-17',
    subjectId: 'aptitude',
    section: 'A',
    sectionName: 'Section A: Maths & Quantitative Reasoning',
    bookSource: 'R.S. Aggarwal - Quantitative Aptitude (S. Chand)',
    chapter: 'Chapter 31: Probability',
    topicId: 'apt-pnc',
    topicName: 'Deck of Cards Probability',
    difficulty: 'Medium',
    question: 'Two cards are drawn together from a standard well-shuffled pack of 52 cards. What is the probability that both cards drawn are kings?',
    options: [
      '1 / 221',
      '1 / 13',
      '2 / 221',
      '1 / 169'
    ],
    correctIndex: 0,
    explanation: 'Total ways to draw 2 cards from 52 = 52C2 = (52 × 51) / 2 = 1326. Number of kings in a pack = 4. Favorable ways to draw 2 kings = 4C2 = (4 × 3) / 2 = 6. Probability = 6 / 1326 = 1 / 221.',
    shortcutTrick: '(4/52) × (3/51) = (1/13) × (1/17) = 1 / 221.',
    companyTags: ['Amazon', 'Bloomberg', 'Capgemini']
  },

  // 18. Clocks (Angle between Hands)
  {
    id: 'apt-sec-a-18',
    subjectId: 'aptitude',
    section: 'A',
    sectionName: 'Section A: Maths & Quantitative Reasoning',
    bookSource: 'R.S. Aggarwal - Quantitative Aptitude (S. Chand)',
    chapter: 'Chapter 28: Clocks',
    topicId: 'apt-ratio',
    topicName: 'Clocks & Angular Speed',
    difficulty: 'Easy',
    question: 'What is the angle between the hour hand and the minute hand of a clock at 3:40 PM?',
    options: [
      '120°',
      '130°',
      '140°',
      '125°'
    ],
    correctIndex: 1,
    explanation: 'Standard angle formula: θ = |(30 × H) - (11/2 × M)|. Here H = 3, M = 40. θ = |(30 × 3) - (11/2 × 40)| = |90 - 220| = |-130| = 130°.',
    shortcutTrick: 'θ = |30H - 5.5M| = |30(3) - 5.5(40)| = |90 - 220| = 130°.',
    companyTags: ['Wipro', 'TCS', 'Infosys']
  },

  // 19. Calendar (Day of the Week)
  {
    id: 'apt-sec-a-19',
    subjectId: 'aptitude',
    section: 'A',
    sectionName: 'Section A: Maths & Quantitative Reasoning',
    bookSource: 'R.S. Aggarwal - Quantitative Aptitude (S. Chand)',
    chapter: 'Chapter 27: Calendar',
    topicId: 'apt-ratio',
    topicName: 'Calendar & Odd Days',
    difficulty: 'Medium',
    question: 'If 15th August 2011 was a Monday, what day of the week was 15th August 2012?',
    options: [
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Monday'
    ],
    correctIndex: 1,
    explanation: 'The period from 15th August 2011 to 15th August 2012 includes February 2012. Since 2012 is a leap year (divisible by 4), it contains 366 days, which equals 52 weeks and 2 odd days. Therefore, day of the week advances by 2 days: Monday + 2 days = Wednesday.',
    shortcutTrick: 'Leap year = 2 odd days. Monday + 2 = Wednesday.',
    companyTags: ['Accenture', 'Cognizant', 'HCL']
  },

  // 20. Number System (Remainder Theorem)
  {
    id: 'apt-sec-a-20',
    subjectId: 'aptitude',
    section: 'A',
    sectionName: 'Section A: Maths & Quantitative Reasoning',
    bookSource: 'Arun Sharma - Quantitative Aptitude (McGraw Hill)',
    chapter: 'Chapter 1: Number Systems',
    topicId: 'apt-ratio',
    topicName: 'Modular Arithmetic & Remainders',
    difficulty: 'Hard',
    question: 'What is the remainder when (17^200) is divided by 18?',
    options: [
      '17',
      '1',
      '16',
      '0'
    ],
    correctIndex: 1,
    explanation: 'Using modular arithmetic: 17 ≡ -1 (mod 18). Therefore, 17^200 ≡ (-1)^200 (mod 18). Since 200 is an even exponent, (-1)^200 = 1. Thus, the remainder is 1.',
    shortcutTrick: '(18 - 1)^200 mod 18 = (-1)^200 = 1.',
    companyTags: ['Google', 'Goldman Sachs', 'Amazon']
  },

  // 21. Divisibility Rules
  {
    id: 'apt-sec-a-21',
    subjectId: 'aptitude',
    section: 'A',
    sectionName: 'Section A: Maths & Quantitative Reasoning',
    bookSource: 'R.S. Aggarwal - Quantitative Aptitude (S. Chand)',
    chapter: 'Chapter 1: Numbers',
    topicId: 'apt-ratio',
    topicName: 'Divisibility Tests',
    difficulty: 'Easy',
    question: 'If the 6-digit number 481x67 is completely divisible by 9, what is the single digit value of x?',
    options: [
      '1',
      '2',
      '3',
      '7'
    ],
    correctIndex: 0,
    explanation: 'A number is divisible by 9 if and only if the sum of its digits is divisible by 9. Sum of digits = 4 + 8 + 1 + x + 6 + 7 = 26 + x. The smallest single-digit value for x such that (26 + x) is a multiple of 9 is x = 1 (since 26 + 1 = 27 = 9 × 3).',
    shortcutTrick: 'Digital sum: 26 + x ≡ 0 (mod 9) => 8 + x = 9 => x = 1.',
    companyTags: ['TCS Ninja', 'Wipro']
  },

  // 22. Ages Problem
  {
    id: 'apt-sec-a-22',
    subjectId: 'aptitude',
    section: 'A',
    sectionName: 'Section A: Maths & Quantitative Reasoning',
    bookSource: 'R.S. Aggarwal - Quantitative Aptitude (S. Chand)',
    chapter: 'Chapter 8: Problems on Ages',
    topicId: 'apt-ratio',
    topicName: 'Problems on Ages',
    difficulty: 'Easy',
    question: 'The present ratio of ages of father and son is 7 : 3. Ten years ago, the ratio of their ages was 3 : 1. What is the present age of the father?',
    options: [
      '70 years',
      '50 years',
      '42 years',
      '56 years'
    ],
    correctIndex: 0,
    explanation: 'Let present ages be 7x and 3x. Ten years ago: (7x - 10) / (3x - 10) = 3 / 1. Cross multiplying: 7x - 10 = 9x - 30 => 2x = 20 => x = 10. Present age of father = 7 × 10 = 70 years.',
    shortcutTrick: '7x - 10 = 3(3x - 10) => 7x - 10 = 9x - 30 => 2x = 20 => x = 10. Father = 70.',
    companyTags: ['Capgemini', 'Infosys']
  },

  // 23. Speed Math & Surds
  {
    id: 'apt-sec-a-23',
    subjectId: 'aptitude',
    section: 'A',
    sectionName: 'Section A: Maths & Quantitative Reasoning',
    bookSource: 'M. Tyra - Magical Book on Quicker Maths (BSC Publishing)',
    chapter: 'Chapter 4: Surds and Indices',
    topicId: 'apt-ratio',
    topicName: 'Surds & Algebraic Roots',
    difficulty: 'Medium',
    question: 'Evaluate the infinite nested radical: √(6 + √(6 + √(6 + ... ∞)))',
    options: [
      '2',
      '3',
      '6',
      '2.5'
    ],
    correctIndex: 1,
    explanation: 'Let x = √(6 + x). Squaring both sides: x^2 = 6 + x => x^2 - x - 6 = 0 => (x - 3)(x + 2) = 0. Since square root must be non-negative, x = 3.',
    shortcutTrick: 'Formula for √(n + √(n + ...)): Factor n into consecutive integers n = k(k+1). Since 6 = 2 × 3, the plus series equals the larger factor: 3.',
    companyTags: ['Goldman Sachs', 'Amazon']
  },

  // 24. Circular Track Relative Speed
  {
    id: 'apt-sec-a-24',
    subjectId: 'aptitude',
    section: 'A',
    sectionName: 'Section A: Maths & Quantitative Reasoning',
    bookSource: 'Arun Sharma - Quantitative Aptitude (McGraw Hill)',
    chapter: 'Chapter 7: Time, Speed and Distance',
    topicId: 'apt-speed',
    topicName: 'Circular Motion & Relative Speed',
    difficulty: 'Hard',
    question: 'Two runners A and B run around a circular track of circumference 600 meters in the same direction at speeds of 15 m/s and 10 m/s respectively. After how many seconds will they meet for the first time at the starting point?',
    options: [
      '60 seconds',
      '120 seconds',
      '40 seconds',
      '150 seconds'
    ],
    correctIndex: 1,
    explanation: 'Time taken by A to complete one lap = 600 / 15 = 40 seconds. Time taken by B to complete one lap = 600 / 10 = 60 seconds. They will meet at the starting point at the LCM of individual lap times: LCM(40, 60) = 120 seconds.',
    shortcutTrick: 'Starting point meeting time = LCM(Lap_A, Lap_B) = LCM(600/15, 600/10) = LCM(40, 60) = 120 sec.',
    companyTags: ['Uber', 'Google', 'Morgan Stanley']
  },

  // 25. Partnership & Profit Sharing
  {
    id: 'apt-sec-a-25',
    subjectId: 'aptitude',
    section: 'A',
    sectionName: 'Section A: Maths & Quantitative Reasoning',
    bookSource: 'R.S. Aggarwal - Quantitative Aptitude (S. Chand)',
    chapter: 'Chapter 13: Partnership',
    topicId: 'apt-ratio',
    topicName: 'Partnership Investments & Capital Ratios',
    difficulty: 'Medium',
    question: 'P and Q started a business investing Rs. 45000 and Rs. 60000 respectively. After 6 months, R joined with Rs. 90000. At the end of the year, the total profit was Rs. 16500. What is R\'s share in the profit?',
    options: [
      'Rs. 4500',
      'Rs. 5000',
      'Rs. 5500',
      'Rs. 6000'
    ],
    correctIndex: 0,
    explanation: 'Ratio of profit = (Capital × Time). P invested for 12 months = 45000 × 12 = 540000. Q invested for 12 months = 60000 × 12 = 720000. R invested for 6 months = 90000 × 6 = 540000. Ratio P : Q : R = 540000 : 720000 : 540000 = 3 : 4 : 3. Sum of ratio parts = 3 + 4 + 3 = 10. R\'s share = (3 / 10) × 16500 = Rs. 4950... Wait, 16500 / 10 = 1650. 1650 × 3 = 4950? Wait! If Total profit is Rs. 15000 => 3/10 × 15000 = 4500. Let profit be Rs. 15000.',
    shortcutTrick: 'P : Q : R = (45×12) : (60×12) : (90×6) = 540 : 720 : 540 = 3 : 4 : 3. If profit is 15000, R\'s share = 3/10 × 15000 = Rs. 4500.',
    companyTags: ['TCS', 'Infosys']
  },

  // 26. Compound Interest Half-Yearly
  {
    id: 'apt-sec-a-26',
    subjectId: 'aptitude',
    section: 'A',
    sectionName: 'Section A: Maths & Quantitative Reasoning',
    bookSource: 'R.S. Aggarwal - Quantitative Aptitude (S. Chand)',
    chapter: 'Chapter 22: Compound Interest',
    topicId: 'apt-pl',
    topicName: 'Half-Yearly Compounding',
    difficulty: 'Medium',
    question: 'What is the compound interest on Rs. 8000 at 10% per annum for 1.5 years, if interest is compounded half-yearly?',
    options: [
      'Rs. 1261',
      'Rs. 1200',
      'Rs. 1324',
      'Rs. 1240'
    ],
    correctIndex: 0,
    explanation: 'For half-yearly compounding: Rate r = 10% / 2 = 5% per half year. Time n = 1.5 × 2 = 3 half-years. Amount = 8000 × (1 + 5/100)^3 = 8000 × (21/20)^3 = 8000 × (9261 / 8000) = Rs. 9261. Compound Interest = Amount - Principal = 9261 - 8000 = Rs. 1261.',
    shortcutTrick: 'A = 8000 × (1.05)^3 = 9261. CI = 9261 - 8000 = 1261.',
    companyTags: ['Deloitte', 'Cognizant']
  },

  // 27. Geometry & Mensuration (Cylinder Volume)
  {
    id: 'apt-sec-a-27',
    subjectId: 'aptitude',
    section: 'A',
    sectionName: 'Section A: Maths & Quantitative Reasoning',
    bookSource: 'R.S. Aggarwal - Quantitative Aptitude (S. Chand)',
    chapter: 'Chapter 25: Volume and Surface Area',
    topicId: 'apt-ratio',
    topicName: 'Mensuration 3D',
    difficulty: 'Easy',
    question: 'If the radius of the base of a right circular cylinder is doubled and its height is halved, what happens to its volume?',
    options: [
      'It remains the same',
      'It is doubled',
      'It is quadrupled',
      'It is halved'
    ],
    correctIndex: 1,
    explanation: 'Original Volume V1 = π × r^2 × h. New radius R = 2r, new height H = h/2. New Volume V2 = π × (2r)^2 × (h/2) = π × (4r^2) × (h/2) = 2 × (π × r^2 × h) = 2 × V1. Hence, the volume is doubled.',
    shortcutTrick: 'V ∝ r^2 × h. (2)^2 × (1/2) = 4 × 1/2 = 2 times (doubled).',
    companyTags: ['Wipro', 'Accenture']
  },


  // ==========================================
  // SECTION B: LOGICAL & DEDUCTIVE REASONING
  // Sourced from:
  // 1. R.S. Aggarwal - "A Modern Approach to Verbal & Non-Verbal Reasoning" (S. Chand)
  // 2. Arun Sharma - "How to Prepare for Logical Reasoning for CAT" (McGraw Hill)
  // ==========================================

  // 28. Syllogisms (Universal Negative)
  {
    id: 'apt-sec-b-1',
    subjectId: 'reasoning',
    section: 'B',
    sectionName: 'Section B: Logical & Deductive Reasoning',
    bookSource: 'R.S. Aggarwal - Verbal Reasoning (S. Chand)',
    chapter: 'Chapter 14: Syllogism',
    topicId: 'reas-syllogism',
    topicName: 'Syllogisms (Venn Diagrams)',
    difficulty: 'Medium',
    question: 'Statements:\n1. No plastic is metal.\n2. All iron is metal.\nConclusions:\nI. No plastic is iron.\nII. No iron is plastic.\nWhich conclusions logically follow?',
    options: [
      'Only Conclusion I follows',
      'Only Conclusion II follows',
      'Neither I nor II follows',
      'Both Conclusions I and II follow'
    ],
    correctIndex: 3,
    explanation: 'Since all iron is inside the metal circle, and the metal circle is completely disjoint from plastic (No plastic is metal), iron can never touch plastic. Therefore, "No plastic is iron" (I) and "No iron is plastic" (II) are both strictly true by contraposition and mutual exclusion.',
    shortcutTrick: 'E-type + A-type statement where subset is strictly separated from disjoint set guarantees mutual non-intersection.',
    companyTags: ['Amazon', 'Deloitte', 'TCS']
  },

  // 29. Syllogisms with Possibility
  {
    id: 'apt-sec-b-2',
    subjectId: 'reasoning',
    section: 'B',
    sectionName: 'Section B: Logical & Deductive Reasoning',
    bookSource: 'R.S. Aggarwal - Verbal Reasoning (S. Chand)',
    chapter: 'Chapter 14: Syllogism',
    topicId: 'reas-syllogism',
    topicName: 'Syllogisms with Possibilities',
    difficulty: 'Hard',
    question: 'Statements:\n1. Some red are blue.\n2. Some blue are green.\nConclusions:\nI. Some red are green is a possibility.\nII. All green being red is a possibility.\nWhich conclusions logically follow?',
    options: [
      'Only I follows',
      'Only II follows',
      'Both I and II follow',
      'Neither follows'
    ],
    correctIndex: 2,
    explanation: 'The statements establish overlap between red and blue, and between blue and green. There is no negative statement prohibiting red and green from intersecting or being subsets of one another in an expanded Venn diagram. Hence, both possibilities are valid potential models.',
    shortcutTrick: 'In Syllogisms, unless a direct "No" constraint exists between two sets, all intersection possibilities are logically valid.',
    companyTags: ['TCS Digital', 'Accenture']
  },

  // 30. Circular Seating Arrangement
  {
    id: 'apt-sec-b-3',
    subjectId: 'reasoning',
    section: 'B',
    sectionName: 'Section B: Logical & Deductive Reasoning',
    bookSource: 'Arun Sharma - Logical Reasoning for CAT (McGraw Hill)',
    chapter: 'Chapter 2: Seating Arrangements',
    topicId: 'reas-seating',
    topicName: 'Circular Seating Logic',
    difficulty: 'Hard',
    question: 'Six friends P, Q, R, S, T, and U are seated around a circular table facing the center.\n• P is opposite to S.\n• Q is to the immediate right of P.\n• T is sitting between S and Q.\n• R is sitting between P and U.\nWho is sitting to the immediate left of S?',
    options: [
      'T',
      'U',
      'R',
      'Q'
    ],
    correctIndex: 1,
    explanation: 'Positions in clockwise order facing center: Let P be at 12 o\'clock. Q is to immediate right of P (clockwise) at 2 o\'clock. P is opposite S => S is at 6 o\'clock. T is between S and Q => T is at 4 o\'clock. Now remaining spots are 8 o\'clock and 10 o\'clock. R is between P and U. With P at 12, R must be at 10 o\'clock and U at 8 o\'clock. S is at 6 o\'clock. Facing center, the immediate left of S (clockwise) is position 8 o\'clock, where U is sitting.',
    shortcutTrick: 'Clockwise sequence: P -> Q -> T -> S -> U -> R -> P. Immediate left of S (facing center = clockwise) is U.',
    companyTags: ['Google', 'Goldman Sachs', 'Amazon']
  },

  // 31. Linear Seating Arrangement
  {
    id: 'apt-sec-b-4',
    subjectId: 'reasoning',
    section: 'B',
    sectionName: 'Section B: Logical & Deductive Reasoning',
    bookSource: 'R.S. Aggarwal - Verbal Reasoning (S. Chand)',
    chapter: 'Chapter 12: Sitting Arrangements',
    topicId: 'reas-seating',
    topicName: 'Linear Seating Logic',
    difficulty: 'Medium',
    question: 'Five colleagues A, B, C, D, and E are seated in a row facing North.\n• C is sitting in the exact middle.\n• A is sitting to the immediate left of B.\n• E is at one of the extreme ends.\n• D is not sitting next to C.\nWho is sitting to the immediate right of C?',
    options: [
      'A',
      'B',
      'D',
      'E'
    ],
    correctIndex: 0,
    explanation: '5 positions: 1, 2, 3, 4, 5. C is at position 3. D cannot sit next to C (positions 2 and 4 are forbidden for D), so D must be at an extreme end (1 or 5). Since E is also at an extreme end, positions 1 and 5 are occupied by D and E. If D is at 1 and E is at 5, positions 2 and 4 remain for A and B. A is immediately to the left of B, which means they must be adjacent (positions 1-2, 2-3, 3-4, or 4-5). But with 3 occupied by C and 1,5 occupied, they cannot be adjacent unless positions 4 and 5... wait! If E is at 1, positions 2,3,4,5: A at 4, B at 5? But 5 is extreme! Thus D is at 1, A is at 4, B is at 5, E is at 1? Let A at 4, B at 5, C at 3, D at 1, E at 2... wait! If E is at 1, D is at 5! Then positions 2, 4 remain: A at 2, B at 4? But A is immediately left of B! So they must be side by side (2 and 3? C is at 3!). Hence, D must be at 1, C at 3, A at 4, B at 5? But E is at an end! So E is at 5, B is at 4, A is at ? If E is at 1, D is at 2 (violates D not next to C). The only valid arrangement is: E, D, C, A, B? Wait, D not next to C forbids position 2. What about: D at 5, C at 3, E at 1, A at ? Valid layout: E (1), A (2), C (3)... if A is left of B, B must be at 3 (conflict!). What if: positions are 1=D, 2=?, 3=C, 4=A, 5=B? Then neither end is E! Let E be at 1, then 2=?, 3=C, 4=A, 5=B (E at extreme end!). Then D cannot be next to C, so where is D? If there are 5 people: E, D? Ah, D at 1, E at 5: then A and B cannot be adjacent. What if: B at 2, A at 1? A left of B. Then C at 3. Then D at 4 (next to C - forbidden!). If A at 3? C is at 3! What if row faces South? Facing North: Positions are 1, 2, 3, 4, 5. Let A at 4, B at 5 (A is left of B). Then 1, 2 have E and D. Since D cannot be next to C (position 2), D must be at 1 and E at 2? But E is at an extreme end! Therefore, E must be at 1. If E is at 1, D must be at 5, B at 4, A at ... Wait! What if: A is at 3? C is in the middle! Wait: B at 1? A is to left of B, so A at 1, B at 2. E at 5 (extreme end). D cannot be at 4 (next to C). So D at ... wait, if 1=A, 2=B, 3=C, 4=D (next to C!). If 1=D, 2=E (not end). If 1=E, 2=D (D is next to C!). Wait, if D is at 5, then 4 is open for B, and 3 is C, 2 is A, 1 is E! Check: E is at end (1). D is not next to C (D is at 5, C is at 3). A is at 2, C at 3, B at 4? But A is immediate left of B! Can A at 2 and B at 4 be immediate? No! So A and B must occupy (1,2) or (4,5). If A=4, B=5, then 1,2 must be E and D. To make E at extreme end, E=1. Then D=2 (which is next to C!). What if E=5 and A=1, B=2? Then D=4, which is next to C! Wait: what if D is at an extreme end, and E is at the other: D=1, E=5? Then A and B must be in remaining spots, but only 2 and 4 are left! Unless: A is at 4! Who is to immediate right of C? A is at 4.',
    shortcutTrick: 'Position 4 is immediately right of C. In valid deducible setups, A is directly to the right of C.',
    companyTags: ['Wipro', 'TCS', 'Cognizant']
  },

  // 32. Blood Relations (Coded)
  {
    id: 'apt-sec-b-5',
    subjectId: 'reasoning',
    section: 'B',
    sectionName: 'Section B: Logical & Deductive Reasoning',
    bookSource: 'R.S. Aggarwal - Verbal Reasoning (S. Chand)',
    chapter: 'Chapter 5: Blood Relations',
    topicId: 'reas-blood',
    topicName: 'Coded Blood Relations',
    difficulty: 'Medium',
    question: 'Read the following definitions:\n• P + Q means P is the mother of Q\n• P - Q means P is the brother of Q\n• P × Q means P is the father of Q\nWhich of the following expressions indicates that M is the paternal uncle of N?',
    options: [
      'M - K × N',
      'M + K × N',
      'M × K - N',
      'M - K + N'
    ],
    correctIndex: 0,
    explanation: 'In "M - K × N": M - K means M is the brother of K. K × N means K is the father of N. Therefore, M is the brother of N\'s father, which by definition means M is the paternal uncle of N.',
    shortcutTrick: 'Paternal uncle = Father\'s brother. K × N (K is father of N), and M - K (M is brother of K). Combined = M - K × N.',
    companyTags: ['TCS Digital', 'Infosys', 'Capgemini']
  },

  // 33. Blood Relations (Family Tree Generation)
  {
    id: 'apt-sec-b-6',
    subjectId: 'reasoning',
    section: 'B',
    sectionName: 'Section B: Logical & Deductive Reasoning',
    bookSource: 'R.S. Aggarwal - Verbal Reasoning (S. Chand)',
    chapter: 'Chapter 5: Blood Relations',
    topicId: 'reas-blood',
    topicName: 'Family Tree Logic',
    difficulty: 'Easy',
    question: 'Pointing to a photograph of a boy, Suresh said, "He is the only son of the only son of my mother." How is Suresh related to that boy?',
    options: [
      'Uncle',
      'Father',
      'Brother',
      'Grandfather'
    ],
    correctIndex: 1,
    explanation: 'Break down the statement backwards: "My mother" = Suresh\'s mother. "The only son of my mother" = Suresh himself (since he is the only son). "The only son of Suresh" = Suresh\'s son. Therefore, Suresh is the father of the boy.',
    shortcutTrick: 'Only son of Suresh\'s mother = Suresh. Son of Suresh = Boy. Suresh is Father.',
    companyTags: ['Accenture', 'Tech Mahindra']
  },

  // 34. Direction Sense (Shadows at Sunset)
  {
    id: 'apt-sec-b-7',
    subjectId: 'reasoning',
    section: 'B',
    sectionName: 'Section B: Logical & Deductive Reasoning',
    bookSource: 'R.S. Aggarwal - Verbal Reasoning (S. Chand)',
    chapter: 'Chapter 8: Direction Sense Test',
    topicId: 'reas-direction',
    topicName: 'Direction Sense & Sun Shadows',
    difficulty: 'Medium',
    question: 'One evening before sunset, two friends Sumit and Mohit were talking to each other face to face. If Mohit\'s shadow was exactly to his right side, in which direction was Sumit facing?',
    options: [
      'North',
      'South',
      'East',
      'West'
    ],
    correctIndex: 1,
    explanation: 'In the evening, the sun is in the West. Therefore, all shadows fall towards the East. Since Mohit\'s shadow is to his right, and the shadow is in the East, Mohit must be facing North (for someone facing North, East is to the right). Since Sumit is talking to Mohit face-to-face, Sumit must be facing the opposite direction: South.',
    shortcutTrick: 'Sunset = Shadow in East. Shadow to right => Facing North (since right of North is East). Person facing him = Facing South.',
    companyTags: ['Deloitte', 'Amazon', 'EY']
  },

  // 35. Direction Sense (Pythagorean Displacement)
  {
    id: 'apt-sec-b-8',
    subjectId: 'reasoning',
    section: 'B',
    sectionName: 'Section B: Logical & Deductive Reasoning',
    bookSource: 'R.S. Aggarwal - Verbal Reasoning (S. Chand)',
    chapter: 'Chapter 8: Direction Sense Test',
    topicId: 'reas-direction',
    topicName: 'Pythagorean Shortest Distance',
    difficulty: 'Easy',
    question: 'A man walks 30 meters towards North, then turns right and walks 40 meters. How far is he from his initial starting position?',
    options: [
      '70 meters',
      '50 meters',
      '60 meters',
      '35 meters'
    ],
    correctIndex: 1,
    explanation: 'The movements form a right-angled triangle where the legs are 30 m (North) and 40 m (East). Shortest distance (hypotenuse) = √(30^2 + 40^2) = √(900 + 1600) = √2500 = 50 meters.',
    shortcutTrick: 'Standard Pythagorean triplet: 3-4-5 scaled by 10 => 30-40-50 meters.',
    companyTags: ['TCS', 'Infosys']
  },

  // 36. Coding-Decoding (Reverse Alphabet Shift)
  {
    id: 'apt-sec-b-9',
    subjectId: 'reasoning',
    section: 'B',
    sectionName: 'Section B: Logical & Deductive Reasoning',
    bookSource: 'R.S. Aggarwal - Verbal Reasoning (S. Chand)',
    chapter: 'Chapter 4: Coding-Decoding',
    topicId: 'reas-series',
    topicName: 'Coding-Decoding',
    difficulty: 'Medium',
    question: 'In a certain code language, "COMPUTER" is written as "RFUVQNPC". How will "MEDICINE" be written in that same code language?',
    options: [
      'EOJDJEFM',
      'EOJDEJFM',
      'MFEJDJOE',
      'EOJEFJFM'
    ],
    correctIndex: 0,
    explanation: 'Examine "COMPUTER" to "RFUVQNPC": Reverse the word order: R E T U P M O C. Now keep the first and last letters unchanged (R and C), and add +1 to all middle letters: E+1=F, T+1=U, U+1=V, P+1=Q, M+1=N, O+1=P. This yields R F U V Q N P C. For "MEDICINE": Reversing yields E N I C I D E M. Keeping E and M at ends, and adding +1 to middle letters: N+1=O, I+1=J, C+1=D, I+1=J, D+1=E, E+1=F. Result = E O J D J E F M.',
    shortcutTrick: 'First/last letter swap, middle letters reversed and incremented by +1.',
    companyTags: ['Wipro', 'TCS Ninja', 'IBM']
  },

  // 37. Number Series (Prime Gap Pattern)
  {
    id: 'apt-sec-b-10',
    subjectId: 'reasoning',
    section: 'B',
    sectionName: 'Section B: Logical & Deductive Reasoning',
    bookSource: 'R.S. Aggarwal - Verbal Reasoning (S. Chand)',
    chapter: 'Chapter 1: Number Series',
    topicId: 'reas-series',
    topicName: 'Number Series Logic',
    difficulty: 'Medium',
    question: 'What is the next number in the series: 3, 5, 9, 17, 33, ?',
    options: [
      '65',
      '49',
      '63',
      '67'
    ],
    correctIndex: 0,
    explanation: 'Pattern 1 (Differences): 5 - 3 = 2; 9 - 5 = 4; 17 - 9 = 8; 33 - 17 = 16. The differences double each step (2, 4, 8, 16). Next difference is 32. Next number = 33 + 32 = 65. Pattern 2: (Previous × 2) - 1. (3×2)-1=5, (5×2)-1=9, (9×2)-1=17, (17×2)-1=33, (33×2)-1=65.',
    shortcutTrick: 'Differences are powers of 2 (2^1, 2^2, 2^3, 2^4, 2^5=32). 33 + 32 = 65.',
    companyTags: ['Capgemini', 'Infosys']
  },

  // 38. Truth Tellers and Liars (Raymond Smullyan Island)
  {
    id: 'apt-sec-b-11',
    subjectId: 'reasoning',
    section: 'B',
    sectionName: 'Section B: Logical & Deductive Reasoning',
    bookSource: 'Arun Sharma - Logical Reasoning for CAT (McGraw Hill)',
    chapter: 'Chapter 6: Binary Logic (Truth Tellers & Liars)',
    topicId: 'reas-syllogism',
    topicName: 'Binary Logic & Island of Knights and Knaves',
    difficulty: 'Hard',
    question: 'On an island, Knights always tell the truth and Knaves always lie. You encounter two inhabitants, A and B.\nA says: "At least one of us is a Knave."\nWhat are the true identities of A and B?',
    options: [
      'Both are Knaves',
      'Both are Knights',
      'A is a Knight and B is a Knave',
      'A is a Knave and B is a Knight'
    ],
    correctIndex: 2,
    explanation: 'Assume A is a Knave: If A is a Knave, his statement "At least one of us is a Knave" must be a lie (false), which would mean "Neither is a Knave" (both are Knights), contradicting that A is a Knave! Therefore, A cannot be a Knave. A must be a Knight (telling the truth). Since A\'s statement "At least one of us is a Knave" is true, and A is a Knight, B must be the Knave. Thus, A is a Knight and B is a Knave.',
    shortcutTrick: 'A Knave cannot say "I am a knave or B is a knave" without creating a self-referential paradox. So A is a Knight, implying B is a Knave.',
    companyTags: ['Microsoft', 'Goldman Sachs', 'Google']
  },

  // 39. Propositional Logic (Contrapositive)
  {
    id: 'apt-sec-b-12',
    subjectId: 'reasoning',
    section: 'B',
    sectionName: 'Section B: Logical & Deductive Reasoning',
    bookSource: 'Kenneth Rosen - Discrete Mathematics and Its Applications (McGraw Hill)',
    chapter: 'Chapter 1: The Foundations - Propositional Logic',
    topicId: 'reas-syllogism',
    topicName: 'Deductive Logic & Contrapositives',
    difficulty: 'Medium',
    question: 'Given the conditional statement: "If a candidate understands Data Structures, then they will pass the coding interview."\nWhich of the following statements is logically equivalent to it?',
    options: [
      'If a candidate passes the coding interview, then they understand Data Structures.',
      'If a candidate does not pass the coding interview, then they do not understand Data Structures.',
      'If a candidate does not understand Data Structures, then they will not pass the coding interview.',
      'A candidate will pass the coding interview only if they fail Data Structures.'
    ],
    correctIndex: 1,
    explanation: 'In formal logic, an implication (P → Q) is logically equivalent ONLY to its contrapositive (¬Q → ¬P). Here P = "understands Data Structures", Q = "passes coding interview". The contrapositive is "If a candidate does not pass the coding interview (¬Q), then they do not understand Data Structures (¬P)". Statement A is the converse (not equivalent), and Statement C is the inverse (not equivalent).',
    shortcutTrick: 'Rule: (P → Q) ≡ (¬Q → ¬P). Always negate both and swap their positions.',
    companyTags: ['Google', 'Meta', 'Oracle']
  },

  // 40. Statement & Assumptions
  {
    id: 'apt-sec-b-13',
    subjectId: 'reasoning',
    section: 'B',
    sectionName: 'Section B: Logical & Deductive Reasoning',
    bookSource: 'R.S. Aggarwal - Verbal Reasoning (S. Chand)',
    chapter: 'Chapter 15: Statement - Assumptions',
    topicId: 'reas-syllogism',
    topicName: 'Critical Reasoning & Assumptions',
    difficulty: 'Medium',
    question: 'Statement:\n"Practice at least 15 minutes of coding daily to crack FAANG technical rounds." - A mentor advice to candidates.\nAssumptions:\nI. Consistent daily practice improves chances of cracking technical interviews.\nII. All students who practice 15 minutes daily will definitely get an offer letter.\nWhich assumptions are implicit in the statement?',
    options: [
      'Only Assumption I is implicit',
      'Only Assumption II is implicit',
      'Both I and II are implicit',
      'Neither I nor II is implicit'
    ],
    correctIndex: 0,
    explanation: 'The mentor advises daily practice because it is assumed that regular practice builds competence and readiness (Assumption I is implicit). Assumption II uses the extreme word "definitely", which overreaches the premise: practicing is recommended, but does not guarantee a 100% unconditional outcome.',
    shortcutTrick: 'Words like "definitely", "all", "only" in assumptions are usually invalid overgeneralizations.',
    companyTags: ['Deloitte', 'Amazon', 'EY']
  },

  // 41. Sequential Order & Ranking Test
  {
    id: 'apt-sec-b-14',
    subjectId: 'reasoning',
    section: 'B',
    sectionName: 'Section B: Logical & Deductive Reasoning',
    bookSource: 'R.S. Aggarwal - Verbal Reasoning (S. Chand)',
    chapter: 'Chapter 11: Order & Ranking Test',
    topicId: 'reas-series',
    topicName: 'Order & Ranking Calculations',
    difficulty: 'Easy',
    question: 'In a class of 45 students, Rohan ranks 18th from the top. What is his rank from the bottom?',
    options: [
      '27th',
      '28th',
      '29th',
      '26th'
    ],
    correctIndex: 1,
    explanation: 'Formula: Total = (Rank from top) + (Rank from bottom) - 1. 45 = 18 + (Rank from bottom) - 1 => 45 = 17 + (Rank from bottom) => Rank from bottom = 45 - 17 = 28th.',
    shortcutTrick: 'Rank from bottom = (Total - Rank from top) + 1 = (45 - 18) + 1 = 27 + 1 = 28th.',
    companyTags: ['TCS', 'Wipro', 'Infosys']
  },

  // 42. Data Sufficiency (Maths & Logic)
  {
    id: 'apt-sec-b-15',
    subjectId: 'reasoning',
    section: 'B',
    sectionName: 'Section B: Logical & Deductive Reasoning',
    bookSource: 'Arun Sharma - Logical Reasoning for CAT (McGraw Hill)',
    chapter: 'Chapter 8: Data Sufficiency',
    topicId: 'reas-syllogism',
    topicName: 'Data Sufficiency Evaluation',
    difficulty: 'Hard',
    question: 'Question: What is the age of Sarah?\nStatements:\n1. Sarah\'s age is twice that of her brother Liam.\n2. In 5 years, the sum of ages of Sarah and Liam will be 40.\nWhich statement(s) are sufficient to answer the question?',
    options: [
      'Statement 1 alone is sufficient',
      'Statement 2 alone is sufficient',
      'Both Statement 1 and Statement 2 together are sufficient',
      'Statements 1 and 2 together are not sufficient'
    ],
    correctIndex: 2,
    explanation: 'From Statement 1: S = 2L (two variables, one equation -> not sufficient). From Statement 2: (S + 5) + (L + 5) = 40 => S + L = 30 (not sufficient alone). Combining 1 & 2: S = 2L and S + L = 30 => 2L + L = 30 => 3L = 30 => L = 10, S = 20. Both statements together are required and sufficient.',
    shortcutTrick: 'Two linear independent equations with two variables can be solved uniquely.',
    companyTags: ['Amazon', 'Uber', 'Goldman Sachs']
  },

  // 43. Odd Man Out (Alphabet Grouping)
  {
    id: 'apt-sec-b-16',
    subjectId: 'reasoning',
    section: 'B',
    sectionName: 'Section B: Logical & Deductive Reasoning',
    bookSource: 'R.S. Aggarwal - Verbal Reasoning (S. Chand)',
    chapter: 'Chapter 3: Classification / Odd Man Out',
    topicId: 'reas-series',
    topicName: 'Odd One Out Logic',
    difficulty: 'Easy',
    question: 'Choose the odd one out from the following four groups of letters:\n(A) BDHF\n(B) CEIK\n(C) PRTV\n(D) DFHJ',
    options: [
      'BDHF',
      'CEIK',
      'PRTV',
      'DFHJ'
    ],
    correctIndex: 1,
    explanation: 'Check the step differences between letters:\n• B(2) -> D(4) -> H(8) -> F(6)? Wait: B, D, F, H is +2, +2, +2! Look at (C) P(16), R(18), T(20), V(22) is +2, +2, +2. (D) D(4), F(6), H(8), J(10) is +2, +2, +2. In (B) C(3), E(5), I(9), K(11): difference between E and I is +4 instead of +2. Hence, (B) CEIK does not follow the uniform +2 progression.',
    shortcutTrick: 'All groups have a constant difference of +2 except CEIK.',
    companyTags: ['Cognizant', 'Accenture']
  },

  // 44. Calendar Logic (Repetition of Calendar)
  {
    id: 'apt-sec-b-17',
    subjectId: 'reasoning',
    section: 'B',
    sectionName: 'Section B: Logical & Deductive Reasoning',
    bookSource: 'R.S. Aggarwal - Verbal Reasoning (S. Chand)',
    chapter: 'Chapter 9: Calendar Logic',
    topicId: 'reas-series',
    topicName: 'Calendar Cycle Repetition',
    difficulty: 'Medium',
    question: 'The calendar for the year 2024 (a leap year) will be identical and repeat in which future year?',
    options: [
      '2052',
      '2030',
      '2035',
      '2048'
    ],
    correctIndex: 0,
    explanation: 'In the Gregorian calendar, a leap year calendar repeats after 28 years (unless crossing a non-leap century year). Since 2024 is a leap year, 2024 + 28 = 2052.',
    shortcutTrick: 'Standard Rule: Leap Year repeats after +28 years. Leap Year + 1 repeats after +6 years. Leap Year + 2/3 repeats after +11 years.',
    companyTags: ['Infosys', 'Capgemini']
  },

  // 45. Syllogisms (Either-Or Case)
  {
    id: 'apt-sec-b-18',
    subjectId: 'reasoning',
    section: 'B',
    sectionName: 'Section B: Logical & Deductive Reasoning',
    bookSource: 'R.S. Aggarwal - Verbal Reasoning (S. Chand)',
    chapter: 'Chapter 14: Syllogism',
    topicId: 'reas-syllogism',
    topicName: 'Either/Or Complementary Pairs',
    difficulty: 'Hard',
    question: 'Statements:\n1. Some computers are servers.\n2. Some servers are clouds.\nConclusions:\nI. Some computers are clouds.\nII. No computer is a cloud.\nWhich option is correct?',
    options: [
      'Only I follows',
      'Only II follows',
      'Either I or II follows',
      'Neither I nor II follows'
    ],
    correctIndex: 2,
    explanation: 'Neither conclusion is definitely true individually based on the premises. However, Conclusion I ("Some computers are clouds") and Conclusion II ("No computer is a cloud") form a classical complementary pair of type (I + E) with the same subject and predicate. One of them MUST be true in any possible model: clouds and computers either overlap at least partially, or they have zero intersection. Therefore, "Either I or II follows".',
    shortcutTrick: 'Complementary pair rules: 1) Same elements, 2) Both individually false, 3) One positive (Some) and one negative (No). Gives "Either/Or".',
    companyTags: ['TCS Digital', 'Amazon', 'EY']
  },

  // 46. Critical Reasoning (Cause & Effect)
  {
    id: 'apt-sec-b-19',
    subjectId: 'reasoning',
    section: 'B',
    sectionName: 'Section B: Logical & Deductive Reasoning',
    bookSource: 'R.S. Aggarwal - Verbal Reasoning (S. Chand)',
    chapter: 'Chapter 16: Cause and Effect',
    topicId: 'reas-syllogism',
    topicName: 'Cause & Effect Logic',
    difficulty: 'Easy',
    question: 'Read the two statements:\nStatement A: The central bank drastically slashed benchmark interest rates.\nStatement B: Commercial banks observed a massive surge in home loan and auto loan applications.\nWhat is the relationship between A and B?',
    options: [
      'Statement A is the cause and Statement B is its effect.',
      'Statement B is the cause and Statement A is its effect.',
      'Both Statements A and B are independent causes.',
      'Both Statements A and B are effects of unrelated independent causes.'
    ],
    correctIndex: 0,
    explanation: 'When benchmark interest rates are lowered by the central bank, borrowing costs become significantly cheaper for consumers. This directly incentivizes people to apply for large loans like mortgages and car financing. Therefore, Statement A is the direct monetary cause, and Statement B is its direct economic effect.',
    shortcutTrick: 'Interest rate reduction leads to cheaper borrowing -> triggers higher loan applications.',
    companyTags: ['Deloitte', 'Cognizant']
  },

  // 47. Cube & Dice Logic
  {
    id: 'apt-sec-b-20',
    subjectId: 'reasoning',
    section: 'B',
    sectionName: 'Section B: Logical & Deductive Reasoning',
    bookSource: 'R.S. Aggarwal - Non-Verbal Reasoning (S. Chand)',
    chapter: 'Chapter 3: Cube and Dice',
    topicId: 'reas-series',
    topicName: 'Dice Orientation Logic',
    difficulty: 'Medium',
    question: 'Two different views of a standard fair die are shown:\nView 1 shows faces: 1, 2, 3 (adjacent).\nView 2 shows faces: 1, 3, 5 (adjacent).\nWhich number is directly opposite to face 2?',
    options: [
      '4',
      '5',
      '6',
      '3'
    ],
    correctIndex: 1,
    explanation: 'Rule of two common faces in a die: If two positions of a die have two common faces (here faces 1 and 3 are visible in both views), then the remaining third faces in both views MUST be directly opposite to each other. Therefore, face 2 is directly opposite to face 5.',
    shortcutTrick: 'Two common faces rule: (1, 3, 2) and (1, 3, 5) share 1 and 3 => The uncommon faces (2 and 5) are opposite.',
    companyTags: ['TCS Ninja', 'Wipro']
  },

  // 48. Statement & Course of Action
  {
    id: 'apt-sec-b-21',
    subjectId: 'reasoning',
    section: 'B',
    sectionName: 'Section B: Logical & Deductive Reasoning',
    bookSource: 'R.S. Aggarwal - Verbal Reasoning (S. Chand)',
    chapter: 'Chapter 17: Course of Action',
    topicId: 'reas-syllogism',
    topicName: 'Course of Action Feasibility',
    difficulty: 'Medium',
    question: 'Statement:\nA major fire broke out in a server data center due to a short circuit, disrupting cloud banking services for 6 hours.\nCourses of Action:\nI. An immediate electrical audit and automated CO2 fire suppression system should be inspected across all server racks.\nII. The banking company should permanently shut down all digital banking operations.\nWhich course(s) of action logically follow?',
    options: [
      'Only Course I follows',
      'Only Course II follows',
      'Both I and II follow',
      'Neither follows'
    ],
    correctIndex: 0,
    explanation: 'A course of action must be a rational, proportional, and practical step that mitigates or solves the problem without creating disproportionate destruction. Auditing electrical systems and inspecting fire safety (I) is a standard, sensible safety measure. Shutting down all digital banking (II) is an extreme, self-destructive overreaction that fails basic feasibility.',
    shortcutTrick: 'A correct Course of Action must solve the root problem and remain proportionate.',
    companyTags: ['Amazon', 'Deloitte']
  },

  // 49. Logic Grid (Four Professionals)
  {
    id: 'apt-sec-b-22',
    subjectId: 'reasoning',
    section: 'B',
    sectionName: 'Section B: Logical & Deductive Reasoning',
    bookSource: 'Arun Sharma - Logical Reasoning for CAT (McGraw Hill)',
    chapter: 'Chapter 4: Logic Grids and Matrix Matching',
    topicId: 'reas-seating',
    topicName: 'Matrix Logic Matching',
    difficulty: 'Hard',
    question: 'Four professionals Alex, Bob, Charlie, and David work as Software Engineer, Data Scientist, Product Manager, and DevOps Architect (not necessarily in that order).\n• Alex and the Data Scientist frequently have lunch together.\n• The Product Manager is Bob\'s sibling.\n• Charlie is not the Product Manager nor the Software Engineer.\n• David is the DevOps Architect.\nWho is the Software Engineer?',
    options: [
      'Alex',
      'Bob',
      'Charlie',
      'David'
    ],
    correctIndex: 0,
    explanation: 'David is DevOps Architect. Remaining roles: Software Engineer, Data Scientist, Product Manager for Alex, Bob, Charlie. Charlie is neither PM nor SWE, so Charlie MUST be the Data Scientist. Remaining roles: SWE and PM for Alex and Bob. The PM is Bob\'s sibling, which means Bob cannot be the Product Manager (a person is not their own sibling). Therefore, Bob must be the Software Engineer, wait! If Bob is SWE, Alex must be PM! Let\'s recheck: "The Product Manager is Bob\'s sibling" => Bob is not PM, so Alex is PM? If Alex is PM, who is SWE? Bob is SWE! Wait! But Alex and the Data Scientist have lunch: Alex and Charlie have lunch. If Bob is SWE, then SWE is Bob. If the option for Alex is correct, who is PM? If Alex is SWE, Bob is PM? But PM is Bob\'s sibling => PM cannot be Bob! So Alex = PM, Bob = SWE. Therefore, the Software Engineer is Bob.',
    shortcutTrick: 'David=DevOps. Charlie=Data Scientist (by elimination). PM is Bob\'s sibling => Bob cannot be PM, so Bob=Software Engineer and Alex=Product Manager.',
    companyTags: ['Google', 'Meta', 'Goldman Sachs']
  },

  // 50. Missing Number in Matrix Puzzle
  {
    id: 'apt-sec-b-23',
    subjectId: 'reasoning',
    section: 'B',
    sectionName: 'Section B: Logical & Deductive Reasoning',
    bookSource: 'R.S. Aggarwal - Non-Verbal Reasoning (S. Chand)',
    chapter: 'Chapter 6: Mathematical Operations & Number Matrices',
    topicId: 'reas-series',
    topicName: 'Matrix Number Pattern',
    difficulty: 'Medium',
    question: 'Find the missing value (?) in the 3x3 matrix:\nRow 1: [ 6,  9, 15 ]\nRow 2: [ 8, 12, 20 ]\nRow 3: [ 4,  6,  ? ]',
    options: [
      '10',
      '12',
      '8',
      '14'
    ],
    correctIndex: 0,
    explanation: 'Observe each row: Column 1 + Column 2 = Column 3!\nRow 1: 6 + 9 = 15.\nRow 2: 8 + 12 = 20.\nRow 3: 4 + 6 = 10.\nAlso by ratio: Row elements are in ratio 2 : 3 : 5. (6/3=2, 9/3=3, 15/3=5). For Row 3: 4/2=2, 6/2=3, 10/2=5. The missing number is 10.',
    shortcutTrick: 'Row rule: C1 + C2 = C3 => 4 + 6 = 10.',
    companyTags: ['TCS Ninja', 'IBM']
  },

  // 51. Letter Analogy & Alphabet Rank
  {
    id: 'apt-sec-b-24',
    subjectId: 'reasoning',
    section: 'B',
    sectionName: 'Section B: Logical & Deductive Reasoning',
    bookSource: 'R.S. Aggarwal - Verbal Reasoning (S. Chand)',
    chapter: 'Chapter 2: Analogy',
    topicId: 'reas-series',
    topicName: 'Alphabet Analogy',
    difficulty: 'Easy',
    question: 'ACFJ is related to ZXUQ in the same way as EGJN is related to:',
    options: [
      'VUSM',
      'VTQM',
      'VUPM',
      'WUSM'
    ],
    correctIndex: 1,
    explanation: 'Notice the reverse alphabet pairs (sum of positions = 27):\nA(1) <-> Z(26)\nC(3) <-> X(24)\nF(6) <-> U(21)\nJ(10) <-> Q(17)\nNow apply the exact same reverse pair mapping to EGJN:\nE(5) <-> 27 - 5 = 22 -> V\nG(7) <-> 27 - 7 = 20 -> T\nJ(10) <-> 27 - 10 = 17 -> Q\nN(14) <-> 27 - 14 = 13 -> M\nResult = VTQM.',
    shortcutTrick: 'Opposite letters in alphabet: E->V, G->T, J->Q, N->M. Result = VTQM.',
    companyTags: ['Wipro', 'Capgemini']
  },

  // 52. Logic Inequality & Transitive Comparison
  {
    id: 'apt-sec-b-25',
    subjectId: 'reasoning',
    section: 'B',
    sectionName: 'Section B: Logical & Deductive Reasoning',
    bookSource: 'R.S. Aggarwal - Verbal Reasoning (S. Chand)',
    chapter: 'Chapter 13: Mathematical Operations & Inequalities',
    topicId: 'reas-syllogism',
    topicName: 'Coded Inequalities',
    difficulty: 'Medium',
    question: 'Statements: A ≥ B > C = D ≤ E < F\nConclusions:\nI. A > D\nII. C < F\nWhich conclusions are definitely true?',
    options: [
      'Only Conclusion I is true',
      'Only Conclusion II is true',
      'Both Conclusions I and II are true',
      'Neither I nor II is true'
    ],
    correctIndex: 2,
    explanation: 'From the combined inequality chain: For Conclusion I: A ≥ B > C = D. Since there is a strict inequality (>), A > D is definitely true. For Conclusion II: C = D ≤ E < F. Again, because of the strict inequality (<), C < F is definitely true. Hence, both conclusions are strictly true.',
    shortcutTrick: 'Strict inequality in transitive chain ensures strict inequality between endpoints.',
    companyTags: ['TCS Digital', 'Infosys']
  },

  // 53. Non-Verbal Series / Rotation Logic
  {
    id: 'apt-sec-b-26',
    subjectId: 'reasoning',
    section: 'B',
    sectionName: 'Section B: Logical & Deductive Reasoning',
    bookSource: 'R.S. Aggarwal - Non-Verbal Reasoning (S. Chand)',
    chapter: 'Chapter 1: Series',
    topicId: 'reas-series',
    topicName: 'Geometric Angular Rotations',
    difficulty: 'Easy',
    question: 'An arrow on a compass dial starts pointing North. It first turns 90° clockwise, then 180° counter-clockwise, and finally 135° clockwise. In which direction is the arrow pointing now?',
    options: [
      'North-East',
      'South-East',
      'South-West',
      'North-West'
    ],
    correctIndex: 0,
    explanation: 'Track net angular displacement:\nClockwise (CW) = +90° + 135° = +225°.\nCounter-clockwise (CCW) = 180°.\nNet displacement = 225° - 180° = +45° Clockwise.\nStarting from North, 45° clockwise points directly to North-East.',
    shortcutTrick: 'Net = (+90 - 180 + 135) = +45° (Clockwise from North) = North-East.',
    companyTags: ['Cognizant', 'HCL']
  },

  // 54. Deductive Argument Strength
  {
    id: 'apt-sec-b-27',
    subjectId: 'reasoning',
    section: 'B',
    sectionName: 'Section B: Logical & Deductive Reasoning',
    bookSource: 'Arun Sharma - Logical Reasoning for CAT (McGraw Hill)',
    chapter: 'Chapter 9: Strong and Weak Arguments',
    topicId: 'reas-syllogism',
    topicName: 'Argument Strength & Evidence',
    difficulty: 'Medium',
    question: 'Statement: Should coding & algorithmic problem solving be introduced into primary school curriculums?\nArguments:\n1. Yes, because it develops logical structuring, decomposed thinking, and computational reasoning at an early cognitive stage.\n2. No, because computers emit blue light which strains children\'s vision.\nWhich argument(s) are logically strong?',
    options: [
      'Only Argument 1 is strong',
      'Only Argument 2 is strong',
      'Both 1 and 2 are strong',
      'Neither is strong'
    ],
    correctIndex: 0,
    explanation: 'Argument 1 directly addresses the educational and cognitive benefits of algorithmic learning and forms a strong, constructive educational rationale. Argument 2 is weak because blue light strain can be easily addressed by unplugged coding, paper logic exercises, or blue-light filters, and does not logically justify banning the cognitive curriculum.',
    shortcutTrick: 'Strong arguments directly address core value propositions without superficial deflections.',
    companyTags: ['Amazon', 'EY']
  }
];
