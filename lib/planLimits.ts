export const PLAN_LIMITS = {
  Hobby: {
    maxNotes: 5,
    maxCollaborators: 5,
    scribAi: false,
  },
  "Pro monthly": {
    maxNotes: 20,
    maxCollaborators: 20,
    scribAi: true,
  },
  "Pro yearly": {
    maxNotes: 20,
    maxCollaborators: 20,
    scribAi: true,
  },
} as const;

export type PlanName = keyof typeof PLAN_LIMITS;
export type PlanLimits = (typeof PLAN_LIMITS)[PlanName];
