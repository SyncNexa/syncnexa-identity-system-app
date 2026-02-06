interface Verification {
  id: string;
  type: string;
  status: {
    value: "NOT_VERIFIED" | "VERIFIED" | "FAILED" | "PENDING";
    label: string;
  };
  date: Date;
  requirements: string[];
  action: {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
  };
  info?: {
    message?: string;
    label: string;
  };
}

interface VerificationCenter {
  overall_verification_percentage: number;
  is_fully_verified: boolean;
  pillars: Pillar[];
}

interface Pillar {
  id: string;
  user_id: string;
  pillar_name: string;
  weight_percentage: number;
  completion_percentage: number;
  status: string;
  created_at: string;
  updated_at: string;
  steps: Step[];
}

interface Step {
  id: string;
  step_name: string;
  step_order: number;
  step_type: string;
  status: "not_verified" | "verified" | "failed" | "pending";
  requirement_checklist: RequirementChecklist[];
  retry_count: number;
  user_id?: string;
  pillar_id?: string;
  status_message?: string;
  last_attempted_at?: string;
  verified_at?: string;
}

interface RequirementChecklist {
  requirement: string;
  met: boolean;
}
