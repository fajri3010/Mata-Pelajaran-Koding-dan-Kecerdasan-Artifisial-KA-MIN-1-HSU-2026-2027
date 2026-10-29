export type ClassGrade = 'Kelas 5' | 'Kelas 6A' | 'Kelas 6B';

export type HardwareCategory = 'input' | 'output' | 'processing' | 'storage' | 'power_ports';

export interface HardwareItem {
  id: string;
  name: string;
  shortName: string;
  category: HardwareCategory;
  categoryLabel: string;
  summary: string;
  fullDefinition: string;
  functions: string[];
  typesOrSpecs?: string[];
  image: string;
  highlightSpecs?: { label: string; value: string }[];
  isInternal: boolean;
  notesOrigin: string; // reference to Raisya's notes
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  targetCategory: string;
}

export interface StudentProfile {
  name: string;
  grade: ClassGrade;
  completedAt?: string;
  score?: number;
  totalQuestions?: number;
  certificateId?: string;
}

export interface BuilderPart {
  id: string;
  name: string;
  category: string;
  description: string;
  iconName: string;
  installed: boolean;
  requiredSlot: 'socket' | 'dimm' | 'pcie' | 'bay' | 'psu' | 'ports';
  installedSlotLabel: string;
  specs: string;
}
