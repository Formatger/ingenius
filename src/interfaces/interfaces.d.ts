export interface CampaignInterface {
  filter(arg0: (campaign: { name: string; }) => boolean): unknown;
  id?: number;
  user?: string;
  name: string;
  start_date: Date | null;
  deadline: Date | null;
  contract_value: number | null;
  description: string;
  total_projects: number;
  invoice_paid: boolean;
  deal: string | null;
  campaign_stage: string | null; 

  brand_name: string;
  brand_image_url: string;
  representative: string;
  invoice_number: string;
  invoice_date: string;
  campaign_duration: string;
}

export interface ProjectInterface {
  start_date: Date | null;
  deadline: Date | null;
  name: string;
  contract_value: number | null;
  invoice_paid: boolean;
  description: string;
  campaign: string | null;
  creator: string | null;
  project_stage: string | null;

  invoice_number: string;
  invoice_date: string;
  campaign_duration: string;
  brand_name: string;
  brand_image_url: string;
  representative: string;
}

export interface DealInterface {
  name: string;
  contract_value: number | null;
  invoice_paid?: boolean;
  description?: string;
  start_date: Date | null;
  deadline: Date | null;
  brand: string | null;
  deal_stage: string | null;
  campaigns?: string[]; 

  invoice_number: string;
  invoice_date: string;
  campaign_duration: string;
  brand_name: string;
  brand_image_url: string;
  representative: string;

  id?: number;
  user?: string;
  brand_image_url?: string;
  brand_name?: string;
  brand_email?: string;
  brand_website?: string;
  representative?: string;
  total_campaigns?: number;
  invoice_number?: string; 
  invoice_date?: Date | null;
  deal_duration?: string; 
  deal_stage_name?: string; 
  deal_stage_order?: number; 
  created_at?: Date; 
}

export interface BrandInterface {
  name: string;
  website: string;
  representative: string;
  email: string;
  niche: string;
  profile_picture: string | null;
}

export interface CreatorInterface {
  name: string;
  email: string;
  internal: boolean;
  niche: string;
  profile_picture: string | null;
}