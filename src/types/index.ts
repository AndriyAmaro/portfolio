// ===== PROJECT TYPES =====
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  problem?: string;
  solution?: string;
  challenges?: string[];
  featured: boolean;
}

// ===== SKILL TYPES =====
export type SkillLevel = "beginner" | "intermediate" | "advanced" | "expert";

export interface Skill {
  name: string;
  icon: string;
  level: SkillLevel;
  percentage: number;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

// ===== CONTACT FORM TYPES =====
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactMessage extends ContactFormData {
  id: string;
  createdAt: Date;
}

// ===== API RESPONSE TYPES =====
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

// ===== NAVIGATION TYPES =====
export interface NavLink {
  label: string;
  href: string;
}

// ===== SOCIAL LINKS =====
export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}
