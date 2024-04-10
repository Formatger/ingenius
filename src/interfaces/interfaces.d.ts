export interface CampaignInterface {
  filter(arg0: (campaign: { name: string; }) => boolean): unknown;
  id: number;
  description: string;
  brand_name: string;
  campaign_name: string;
  total_projects: number;
  contract_value: number;
  brand_image_url: string;
  representative: string;
  invoice_number: string;
  invoice_date: string;
  campaign_duration: string;
  campaign_stage: string;
}

export interface ProjectInterface {
  id: string;
  name: string,
  description: string,
  campaign: string,
  campaign_name: string
  creator: string,
  creator_name: string;
  deadline: string,
  contract_value: number,
  invoice_paid: boolean,
  project_stage: string,
  created_at: any;
  start_date: any;
  project_duration: any;
}

export interface DealInterface {
  id: string;
  name: string,
  description: string,
  campaigns: string,
  deadline: string,
  contract_value: number,
  invoice_paid: boolean,
  deal: string,
  created_at: any;
  start_date: any;
  description: string,
}

export interface BrandInterface {
  campaign_name: any;
  name: number;
  website: string;
  representative: number;
  email: string;
  niche: string;
  profile_picture: string;
}

export interface CreatorInterface {
  campaign_name: any;
  name: number;
  website: string;
  representative: number;
  email: string;
  niche: string;
  profile_picture: string;
}