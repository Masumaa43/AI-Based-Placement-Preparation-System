import React, { useState } from 'react';
import { 
  TreePine, 
  Flame, 
  Droplets, 
  Sparkles, 
  PlusCircle, 
  Calendar, 
  ShieldCheck, 
  Trophy, 
  ArrowRight, 
  Check, 
  Info, 
  RotateCw, 
  BookOpen,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { GardenState, PlantedTree, SubjectId, TreeSpecies, TreeStage } from '../types';
import { SPECIES_CATALOG, STAGE_META, getTodayDateString } from '../data/garden';
import { SUBJECT_METAS } from '../data/subjects';

interface StudyGardenModuleProps {
  garden: GardenState;
  onPlantTree: (subject: SubjectId, customName?: string) => void;
  onWaterTree: (treeId: string) => void;
  onUseFertilizer: (treeId: string) => void;
  onSimulateNextDay: () => void;
  onNavigateToTab: (tab: string, subjectId?: SubjectId) => void;
}

export const StudyGardenModule: React.FC<StudyGardenModuleProps> = ({
  garden,
  onPlantTree,
  onWaterTree,
  onUseFertilizer,
  onSimulateNextDay,
  onNavigateToTab
}) => {
  const [selectedTree, setSelectedTree] = useState<PlantedTree | null>(null);
  const [isPlantModalOpen, setIsPlantModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<SubjectId>('dsa');
  const [customTreeName, setCustomTreeName] = useState('');
  const [activeTab, setActiveTab] = useState<'meadow' | 'catalog' | 'stats'>('meadow');

  const todayStr = getTodayDateString();
  const hasPlantedToday = garden.trees.some(t => t.plantedDate === todayStr);
  const totalXP = garden.trees.reduce((acc, t) => acc + t.xpContributed, 0);

  const handleConfirmPlant = () => {
    onPlantTree(selectedSubject, customTreeName.trim() || undefined);
    setIsPlantModalOpen(false);
    setCustomTreeName('');
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  const handleWaterClick = (treeId: string) => {
    onWaterTree(treeId);
    try {
      confetti({
        particleCount: 40,
        spread: 45,
        origin: { y: 0.7 }
      });
    } catch (e) {}
  };

  const handleFertilizeClick = (treeId: string) => {
    onUseFertilizer(treeId);
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  // Render a visual SVG tree according to species and stage
  const renderTreeGraphic = (species: TreeSpecies, stage: TreeStage) => {
    const isWatered = true;
    let trunkColor = '#854d0e';
    let leafColor = '#10b981';
    let blossomColor = '#f43f5e';

    if (species === 'binary_cypress') {
      leafColor = '#0d9488'; // teal
    } else if (species === 'blossom_cherry') {
      leafColor = '#f472b6'; // pink
      blossomColor = '#ec4899';
    } else if (species === 'quantum_willow') {
      leafColor = '#06b6d4'; // cyan
    } else if (species === 'golden_sequoia') {
      leafColor = '#eab308'; // gold
      trunkColor = '#b45309';
    } else if (species === 'zen_bonsai') {
      leafColor = '#84cc16'; // lime
      trunkColor = '#78350f';
    }

    if (stage === 'seed') {
      return (
        <div className="flex flex-col items-center justify-center h-28">
          <div className="w-8 h-8 rounded-full bg-amber-800/80 border-2 border-amber-900 flex items-center justify-center shadow-xs animate-bounce">
            <span className="text-xs">🌰</span>
          </div>
          <div className="w-12 h-2 rounded-full bg-slate-300 mt-2"></div>
        </div>
      );
    }

    if (stage === 'sprout') {
      return (
        <div className="flex flex-col items-center justify-center h-28">
          <svg className="w-12 h-14" viewBox="0 0 48 56" fill="none">
            {/* Stem */}
            <path d="M24 50 Q24 35 22 28 Q20 20 24 16" stroke="#15803d" strokeWidth="3" strokeLinecap="round" />
            {/* Leaves */}
            <path d="M22 28 Q10 24 12 14 Q20 18 22 28 Z" fill={leafColor} opacity="0.9" />
            <path d="M23 22 Q34 16 32 8 Q24 14 23 22 Z" fill={leafColor} />
            {/* Earth mound */}
            <ellipse cx="24" cy="52" rx="14" ry="3" fill="#cbd5e1" />
          </svg>
        </div>
      );
    }

    if (stage === 'sapling') {
      return (
        <div className="flex flex-col items-center justify-center h-28">
          <svg className="w-16 h-20" viewBox="0 0 64 80" fill="none">
            {/* Trunk */}
            <path d="M32 74 L32 40 M32 52 L22 42 M32 46 L42 36" stroke={trunkColor} strokeWidth="3.5" strokeLinecap="round" />
            {/* Leaves Clusters */}
            <circle cx="22" cy="40" r="9" fill={leafColor} opacity="0.9" />
            <circle cx="42" cy="34" r="10" fill={leafColor} opacity="0.9" />
            <circle cx="32" cy="24" r="14" fill={leafColor} />
            {species === 'blossom_cherry' && (
              <>
                <circle cx="28" cy="20" r="2.5" fill="#fff" />
                <circle cx="36" cy="26" r="2" fill="#fff" />
              </>
            )}
            <ellipse cx="32" cy="75" rx="18" ry="4" fill="#cbd5e1" />
          </svg>
        </div>
      );
    }

    if (stage === 'blooming') {
      return (
        <div className="flex flex-col items-center justify-center h-28">
          <svg className="w-20 h-24" viewBox="0 0 80 96" fill="none">
            {/* Main Trunk with roots */}
            <path d="M38 90 L38 52 Q38 42 30 36 M42 90 L42 50 Q42 42 50 34" stroke={trunkColor} strokeWidth="5" strokeLinecap="round" />
            {/* Broad Foliage */}
            <ellipse cx="40" cy="38" rx="26" ry="24" fill={leafColor} opacity="0.95" />
            <ellipse cx="28" cy="34" rx="16" ry="16" fill={leafColor} />
            <ellipse cx="52" cy="34" rx="16" ry="16" fill={leafColor} />
            <ellipse cx="40" cy="22" rx="18" ry="18" fill={leafColor} />
            {/* Highlights/Blossoms */}
            <circle cx="32" cy="26" r="3" fill="#ffffff" opacity="0.8" />
            <circle cx="48" cy="32" r="3.5" fill="#ffffff" opacity="0.7" />
            <circle cx="40" cy="42" r="2.5" fill="#ffffff" opacity="0.6" />
            <ellipse cx="40" cy="91" rx="22" ry="4" fill="#cbd5e1" />
          </svg>
        </div>
      );
    }

    // Ancient Elder
    return (
      <div className="flex flex-col items-center justify-center h-28 relative">
        <div className="absolute -top-1 right-2 text-amber-500 animate-pulse text-xs">✨</div>
        <svg className="w-24 h-28" viewBox="0 0 96 112" fill="none">
          {/* Robust Gnarled Trunk */}
          <path d="M44 105 L44 58 Q34 46 20 40 M52 105 L52 56 Q62 44 76 38 M48 60 L48 36" stroke={trunkColor} strokeWidth="7" strokeLinecap="round" />
          {/* Layered Majestic Canopy */}
          <circle cx="48" cy="36" r="26" fill={leafColor} />
          <circle cx="28" cy="42" r="18" fill={leafColor} opacity="0.9" />
          <circle cx="68" cy="40" r="18" fill={leafColor} opacity="0.9" />
          <circle cx="48" cy="18" r="18" fill={leafColor} />
          {/* Aura details */}
          <circle cx="48" cy="32" r="4" fill="#fef08a" opacity="0.9" />
          <circle cx="34" cy="28" r="3" fill="#ffffff" opacity="0.8" />
          <circle cx="62" cy="26" r="3" fill="#ffffff" opacity="0.8" />
          <ellipse cx="48" cy="106" rx="26" ry="5" fill="#94a3b8" />
        </svg>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner - Streak & Forest Stats */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-50/80 via-white to-slate-50 border border-emerald-100 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/70 border border-emerald-200 text-emerald-800 text-xs font-semibold">
              <TreePine className="w-3.5 h-3.5 text-emerald-600" />
              <span>Study Streak Garden • Level {garden.gardenLevel} Forest</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Maintain Streak, Grow Your Forest
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              Every day you study, take a quiz, or complete a workout, you maintain your streak and plant a thriving tree in your virtual study meadow. Unlock ancient species and keep your forest blooming!
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs">
            {/* Streak */}
            <div className="text-center px-2 py-1 border-r border-slate-100">
              <div className="flex items-center justify-center gap-1 text-emerald-600 text-xs font-bold uppercase tracking-wider mb-0.5">
                <Flame className="w-3.5 h-3.5 text-emerald-600" />
                <span>Streak</span>
              </div>
              <div className="text-2xl font-black text-slate-900">{garden.currentStreak} <span className="text-xs font-medium text-slate-400">days</span></div>
              <div className="text-[10px] text-slate-500">Best: {garden.longestStreak} days</div>
            </div>

            {/* Trees Planted */}
            <div className="text-center px-2 py-1 border-r border-slate-100">
              <div className="flex items-center justify-center gap-1 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-0.5">
                <TreePine className="w-3.5 h-3.5 text-emerald-600" />
                <span>Trees</span>
              </div>
              <div className="text-2xl font-black text-slate-900">{garden.trees.length}</div>
              <div className="text-[10px] text-slate-500">Planted</div>
            </div>

            {/* Prep XP */}
            <div className="text-center px-2 py-1 border-r border-slate-100">
              <div className="flex items-center justify-center gap-1 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-0.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Oxygen</span>
              </div>
              <div className="text-2xl font-black text-slate-900">{totalXP}</div>
              <div className="text-[10px] text-slate-500">Study XP</div>
            </div>

            {/* Fertilizer */}
            <div className="text-center px-2 py-1">
              <div className="flex items-center justify-center gap-1 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-0.5">
                <Droplets className="w-3.5 h-3.5 text-emerald-600" />
                <span>Boosters</span>
              </div>
              <div className="text-2xl font-black text-slate-900">{garden.fertilizerCharges}</div>
              <div className="text-[10px] text-slate-500">Available</div>
            </div>
          </div>
        </div>

        {/* Action strip */}
        <div className="mt-6 pt-5 border-t border-emerald-100/70 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {hasPlantedToday ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-bold">
                <Check className="w-4 h-4 text-emerald-700" />
                <span>Today's Study Tree is Planted & Flourishing!</span>
              </span>
            ) : (
              <button
                onClick={() => setIsPlantModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs cursor-pointer transition-colors"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Plant Today's Day {garden.currentStreak + 1} Tree</span>
              </button>
            )}

            <button
              onClick={() => onNavigateToTab('workout')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold shadow-xs cursor-pointer transition-colors"
            >
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              <span>Daily Speed Workout</span>
            </button>
          </div>

          {/* Testing helper */}
          <div className="flex items-center gap-2">
            <button
              onClick={onSimulateNextDay}
              title="Simulates advancing to the next study day to test the streak maintain and tree planting cycle"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-[11px] font-medium transition-colors cursor-pointer"
            >
              <RotateCw className="w-3 h-3 text-slate-500" />
              <span>Simulate Next Day (Test Streak)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('meadow')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'meadow'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          🌿 The Living Meadow ({garden.trees.length} Trees)
        </button>
        <button
          onClick={() => setActiveTab('catalog')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'catalog'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          📖 Tree Species Arboretum
        </button>
        <button
          onClick={() => setActiveTab('stats')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'stats'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          🛡️ Streak Maintenance Rules
        </button>
      </div>

      {/* MEADOW TAB */}
      {activeTab === 'meadow' && (
        <div className="space-y-6">
          {/* Visual Garden Field */}
          <div className="relative bg-gradient-to-b from-emerald-50/50 via-slate-50 to-emerald-50/30 border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs overflow-hidden">
            {/* Decorative subtle grass dots */}
            <div className="absolute inset-0 pointer-events-none opacity-25">
              <div className="absolute top-8 left-12 text-emerald-300 text-lg">🌱</div>
              <div className="absolute top-20 right-24 text-emerald-300 text-lg">🌿</div>
              <div className="absolute bottom-12 left-1/3 text-emerald-300 text-sm">✿</div>
              <div className="absolute bottom-16 right-16 text-emerald-300 text-sm">❀</div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl flex items-center gap-2">
                  <span>Your Study Meadow</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold border border-emerald-200">
                    Day {garden.currentStreak} of Mastery
                  </span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Click on any tree to water it, apply fertilizer boosters, or view its study origin.
                </p>
              </div>

              {!hasPlantedToday && (
                <button
                  onClick={() => setIsPlantModalOpen(true)}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Plant Today's Tree</span>
                </button>
              )}
            </div>

            {/* Trees Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {garden.trees.map((tree) => {
                const spec = SPECIES_CATALOG[tree.species];
                const stage = STAGE_META[tree.stage];
                const isSelected = selectedTree?.id === tree.id;

                return (
                  <div
                    key={tree.id}
                    onClick={() => setSelectedTree(tree)}
                    className={`relative bg-white border rounded-2xl p-5 shadow-xs transition-all cursor-pointer group hover:shadow-md hover:border-emerald-300 ${
                      isSelected
                        ? 'border-emerald-500 ring-2 ring-emerald-500/30'
                        : 'border-slate-200/90'
                    }`}
                  >
                    {/* Streak Day Badge */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        Streak Day {tree.streakDay}
                      </span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${spec.badgeColor}`}>
                        {stage.label}
                      </span>
                    </div>

                    {/* Visual Tree Center */}
                    <div className="my-2 py-2 flex items-center justify-center transition-transform group-hover:scale-105">
                      {renderTreeGraphic(tree.species, tree.stage)}
                    </div>

                    {/* Info */}
                    <div className="text-center mt-2">
                      <h4 className="font-bold text-slate-900 text-sm truncate">{tree.name}</h4>
                      <div className="text-[11px] text-emerald-700 font-medium">{spec.tagline}</div>
                    </div>

                    {/* Bottom Metadata */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span className="capitalize font-medium text-slate-700">{tree.subjectFocus}</span>
                      <span className="font-bold text-emerald-700">+{tree.xpContributed} XP</span>
                    </div>

                    {/* Quick Water Button on card */}
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWaterClick(tree.id);
                        }}
                        className="flex-1 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-[11px] font-bold flex items-center justify-center gap-1 cursor-pointer transition-colors"
                      >
                        <Droplets className="w-3 h-3 text-emerald-600" />
                        <span>Water (+20 XP)</span>
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* Ready Plot for Today (if not planted yet) */}
              {!hasPlantedToday && (
                <div
                  onClick={() => setIsPlantModalOpen(true)}
                  className="border-2 border-dashed border-emerald-300 hover:border-emerald-500 bg-emerald-50/30 hover:bg-emerald-50/60 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all min-h-[220px]"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3 shadow-xs">
                    <PlusCircle className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">Day {garden.currentStreak + 1} Plot Waiting</h4>
                  <p className="text-xs text-slate-600 mt-1 max-w-[180px]">
                    Answer a question or review a topic to plant today's sapling!
                  </p>
                  <span className="mt-3 px-3 py-1 rounded-lg bg-emerald-600 text-white text-[11px] font-bold shadow-xs">
                    Plant Now
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Selected Tree Detail Drawer */}
          {selectedTree && (
            <div className="bg-white border border-emerald-200/90 rounded-3xl p-6 sm:p-8 shadow-xs animate-fadeIn space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                    <TreePine className="w-8 h-8 text-emerald-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-slate-900">{selectedTree.name}</h3>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">
                        Streak Day {selectedTree.streakDay}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Species: <span className="font-semibold text-slate-700">{SPECIES_CATALOG[selectedTree.species].name}</span> • Planted on {selectedTree.plantedDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleWaterClick(selectedTree.id)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Droplets className="w-4 h-4" />
                    <span>Nurture & Water (+20 XP)</span>
                  </button>

                  <button
                    onClick={() => handleFertilizeClick(selectedTree.id)}
                    disabled={garden.fertilizerCharges <= 0}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Fertilizer Boost ({garden.fertilizerCharges} left)</span>
                  </button>

                  <button
                    onClick={() => setSelectedTree(null)}
                    className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-medium cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>

              {/* Lore & Subject Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="font-bold text-slate-800 mb-1">Botanical CS Lore</div>
                  <p className="text-slate-600 leading-relaxed">{SPECIES_CATALOG[selectedTree.species].lore}</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="font-bold text-slate-800 mb-1">Growth Stage Status</div>
                  <p className="text-slate-600 leading-relaxed">
                    Currently at <strong className="text-slate-900">{STAGE_META[selectedTree.stage].label}</strong>. Water daily to evolve it towards Ancient Elder status.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="font-bold text-slate-800 mb-1">Interview Subject Association</div>
                  <p className="text-slate-600 leading-relaxed">
                    Linked to <strong className="text-emerald-700 uppercase">{selectedTree.subjectFocus}</strong>. Strengthening this subject directly radiates oxygen to your tree.
                  </p>
                  <button
                    onClick={() => onNavigateToTab('subjects', selectedTree.subjectFocus === 'general' ? 'dbms' : selectedTree.subjectFocus)}
                    className="mt-2 text-emerald-700 font-bold hover:underline inline-flex items-center gap-1"
                  >
                    <span>Practice {selectedTree.subjectFocus}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* CATALOG / ARBORETUM TAB */}
      {activeTab === 'catalog' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs">
            <h3 className="text-xl font-extrabold text-slate-900 mb-1">
              Tree Species Arboretum & Unlock Requirements
            </h3>
            <p className="text-xs text-slate-600 mb-6">
              As you maintain consecutive study streaks, new botanical species unlock to diversify your meadow.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {Object.values(SPECIES_CATALOG).map((spec) => {
                const isUnlocked = garden.currentStreak >= spec.unlockedAtStreak || garden.trees.some(t => t.species === spec.id);

                return (
                  <div
                    key={spec.id}
                    className={`rounded-2xl p-5 border text-xs transition-all ${
                      isUnlocked
                        ? 'bg-white border-emerald-200 shadow-xs'
                        : 'bg-slate-50/80 border-slate-200 opacity-70'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2.5 py-0.5 rounded-md font-bold text-[10px] border ${spec.badgeColor}`}>
                        {spec.rarity}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500 font-semibold">
                        Streak Req: {spec.unlockedAtStreak} Days
                      </span>
                    </div>

                    <h4 className="font-extrabold text-slate-900 text-base">{spec.name}</h4>
                    <p className="text-emerald-700 font-medium mb-3">{spec.tagline}</p>
                    <p className="text-slate-600 leading-relaxed mb-3">{spec.description}</p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-[11px] text-slate-700 italic">
                      "{spec.lore}"
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-slate-500">
                        {isUnlocked ? '✓ Unlocked & Growing' : `Locked (Reach ${spec.unlockedAtStreak}-day streak)`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* RULES & STATS TAB */}
      {activeTab === 'stats' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900">
                Streak & Garden Maintenance Rules
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                The science of neuroplasticity and habit formation embedded into your interview prep.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Daily Study Threshold</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Completing any one of the following counts as maintaining your daily streak:
                </p>
                <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside">
                  <li>Finishing a 15-Minute Daily Speed Workout</li>
                  <li>Answering 2+ subject quiz questions</li>
                  <li>Checking in on the Mood & Mindset Barometer</li>
                  <li>Syncing your LeetCode problem solved count</li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Automatic Tree Planting</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Each day your streak increments, a new seedling is planted into your garden. If you maintain streaks across consecutive days:
                </p>
                <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside">
                  <li>Day 1: Emerald CS Oak</li>
                  <li>Day 3: Binary Cypress</li>
                  <li>Day 5: Mindset Sakura</li>
                  <li>Day 7: Quantum Willow</li>
                  <li>Day 10: Golden Sequoia</li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Streak Freeze & Protection</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Life happens! You have <strong>{garden.streakFreezes} Streak Freeze</strong> in your inventory. If you take a rest day, your freeze automatically activates to keep your forest intact.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PLANT TODAY'S TREE MODAL */}
      {isPlantModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <TreePine className="w-5 h-5" />
                </span>
                <h3 className="font-bold text-slate-900 text-lg">Plant Streak Day {garden.currentStreak + 1} Tree</h3>
              </div>
              <button
                onClick={() => setIsPlantModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Select the tech subject focus for today's study session to cultivate a tailored tree in your meadow.
            </p>

            {/* Subject Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800">Choose Subject Focus</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SUBJECT_METAS.map((subj) => (
                  <button
                    key={subj.id}
                    onClick={() => setSelectedSubject(subj.id)}
                    className={`p-2.5 rounded-xl border text-xs font-medium text-left cursor-pointer transition-all ${
                      selectedSubject === subj.id
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="truncate">{subj.title}</div>
                    <div className="text-[10px] text-slate-500 uppercase">{subj.id}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Tree Custom Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">Tree Name (Optional)</label>
              <input
                type="text"
                value={customTreeName}
                onChange={(e) => setCustomTreeName(e.target.value)}
                placeholder="e.g., Dynamic Programming Willow"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2.5">
              <button
                onClick={() => setIsPlantModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPlant}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs cursor-pointer transition-colors"
              >
                Plant Tree & Maintain Streak
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
