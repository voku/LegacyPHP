export type PartId = 'head' | 'torso' | 'leftArm' | 'rightArm' | 'legs';

export interface MonsterPartData {
  id: PartId;
  title: string;
  subtitle: string;
  description: string;
  points: { summary: string; detail: string }[];
  icon: string;
}

export interface InteractivePartProps {
  id: PartId;
  isActive: boolean;
  onClick: (id: PartId) => void;
  onHover: (id: PartId | null) => void;
}

export type HealedState = Record<PartId, boolean>;
