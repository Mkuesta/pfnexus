export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: 'investor' | 'startup' | 'admin'
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          role: 'investor' | 'startup' | 'admin'
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          role?: 'investor' | 'startup' | 'admin'
          created_at?: string
          updated_at?: string | null
        }
      }
      companies: {
        Row: {
          id: string
          name: string
          slug: string
          website: string | null
          description: string | null
          tagline: string | null
          logo_url: string | null
          headquarters_location: string | null
          year_founded: number | null
          employee_count: number | null
          is_claimed: boolean
          claimed_by: string | null
          fundraising_status: 'actively_raising' | 'open' | 'not_raising'
          target_raise_amount: number | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          slug: string
          website?: string | null
          description?: string | null
          tagline?: string | null
          logo_url?: string | null
          headquarters_location?: string | null
          year_founded?: number | null
          employee_count?: number | null
          is_claimed?: boolean
          claimed_by?: string | null
          fundraising_status?: 'actively_raising' | 'open' | 'not_raising'
          target_raise_amount?: number | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          website?: string | null
          description?: string | null
          tagline?: string | null
          logo_url?: string | null
          headquarters_location?: string | null
          year_founded?: number | null
          employee_count?: number | null
          is_claimed?: boolean
          claimed_by?: string | null
          fundraising_status?: 'actively_raising' | 'open' | 'not_raising'
          target_raise_amount?: number | null
          created_at?: string
          updated_at?: string | null
        }
      }
      company_tech: {
        Row: {
          id: string
          company_id: string
          ai_category: string[]
          primary_use_case: string | null
          model_architecture: string | null
          llm_provider: string | null
          ml_frameworks: string[]
          programming_languages: string[]
          cloud_provider: string | null
          infrastructure_tools: string[]
          vector_database: string | null
          deployment_type: string | null
          has_api: boolean
          compliance_certifications: string[]
          github_url: string | null
          github_stars: number | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          company_id: string
          ai_category?: string[]
          primary_use_case?: string | null
          model_architecture?: string | null
          llm_provider?: string | null
          ml_frameworks?: string[]
          programming_languages?: string[]
          cloud_provider?: string | null
          infrastructure_tools?: string[]
          vector_database?: string | null
          deployment_type?: string | null
          has_api?: boolean
          compliance_certifications?: string[]
          github_url?: string | null
          github_stars?: number | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          company_id?: string
          ai_category?: string[]
          primary_use_case?: string | null
          model_architecture?: string | null
          llm_provider?: string | null
          ml_frameworks?: string[]
          programming_languages?: string[]
          cloud_provider?: string | null
          infrastructure_tools?: string[]
          vector_database?: string | null
          deployment_type?: string | null
          has_api?: boolean
          compliance_certifications?: string[]
          github_url?: string | null
          github_stars?: number | null
          created_at?: string
          updated_at?: string | null
        }
      }
      traction_signals: {
        Row: {
          id: string
          company_id: string
          monthly_traffic: number | null
          traffic_growth_6m: number | null
          hiring_velocity: number | null
          open_positions: number | null
          estimated_revenue_min: number | null
          estimated_revenue_max: number | null
          customer_count: number | null
          notable_customers: string[]
          g2_rating: number | null
          g2_review_count: number | null
          press_mentions_6m: number | null
          social_following: number | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          company_id: string
          monthly_traffic?: number | null
          traffic_growth_6m?: number | null
          hiring_velocity?: number | null
          open_positions?: number | null
          estimated_revenue_min?: number | null
          estimated_revenue_max?: number | null
          customer_count?: number | null
          notable_customers?: string[]
          g2_rating?: number | null
          g2_review_count?: number | null
          press_mentions_6m?: number | null
          social_following?: number | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          company_id?: string
          monthly_traffic?: number | null
          traffic_growth_6m?: number | null
          hiring_velocity?: number | null
          open_positions?: number | null
          estimated_revenue_min?: number | null
          estimated_revenue_max?: number | null
          customer_count?: number | null
          notable_customers?: string[]
          g2_rating?: number | null
          g2_review_count?: number | null
          press_mentions_6m?: number | null
          social_following?: number | null
          created_at?: string
          updated_at?: string | null
        }
      }
      deal_readiness_scores: {
        Row: {
          id: string
          company_id: string
          overall_score: number
          growth_score: number | null
          traction_score: number | null
          funding_score: number | null
          product_score: number | null
          market_score: number | null
          calculated_at: string
        }
        Insert: {
          id?: string
          company_id: string
          overall_score: number
          growth_score?: number | null
          traction_score?: number | null
          funding_score?: number | null
          product_score?: number | null
          market_score?: number | null
          calculated_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          overall_score?: number
          growth_score?: number | null
          traction_score?: number | null
          funding_score?: number | null
          product_score?: number | null
          market_score?: number | null
          calculated_at?: string
        }
      }
      funding_rounds: {
        Row: {
          id: string
          company_id: string
          round_type: string
          amount: number | null
          date: string | null
          lead_investors: string[]
          all_investors: string[]
          valuation: number | null
          created_at: string
        }
        Insert: {
          id?: string
          company_id: string
          round_type: string
          amount?: number | null
          date?: string | null
          lead_investors?: string[]
          all_investors?: string[]
          valuation?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          round_type?: string
          amount?: number | null
          date?: string | null
          lead_investors?: string[]
          all_investors?: string[]
          valuation?: number | null
          created_at?: string
        }
      }
      team_members: {
        Row: {
          id: string
          company_id: string
          name: string
          title: string
          is_founder: boolean
          linkedin_url: string | null
          email: string | null
          bio: string | null
          created_at: string
        }
        Insert: {
          id?: string
          company_id: string
          name: string
          title: string
          is_founder?: boolean
          linkedin_url?: string | null
          email?: string | null
          bio?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          name?: string
          title?: string
          is_founder?: boolean
          linkedin_url?: string | null
          email?: string | null
          bio?: string | null
          created_at?: string
        }
      }
      investor_firms: {
        Row: {
          id: string
          name: string
          slug: string
          website: string | null
          logo_url: string | null
          description: string | null
          investment_thesis: string | null
          firm_type: string | null
          year_founded: number | null
          aum: number | null
          office_locations: string[]
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          slug: string
          website?: string | null
          logo_url?: string | null
          description?: string | null
          investment_thesis?: string | null
          firm_type?: string | null
          year_founded?: number | null
          aum?: number | null
          office_locations?: string[]
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          website?: string | null
          logo_url?: string | null
          description?: string | null
          investment_thesis?: string | null
          firm_type?: string | null
          year_founded?: number | null
          aum?: number | null
          office_locations?: string[]
          created_at?: string
          updated_at?: string | null
        }
      }
      investment_criteria: {
        Row: {
          id: string
          firm_id: string
          stages: string[]
          check_size_min: number | null
          check_size_max: number | null
          ai_categories: string[]
          geographic_preferences: string[]
          business_model_preferences: string[]
          revenue_requirements: number | null
          lead_preference: string | null
          created_at: string
        }
        Insert: {
          id?: string
          firm_id: string
          stages?: string[]
          check_size_min?: number | null
          check_size_max?: number | null
          ai_categories?: string[]
          geographic_preferences?: string[]
          business_model_preferences?: string[]
          revenue_requirements?: number | null
          lead_preference?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          firm_id?: string
          stages?: string[]
          check_size_min?: number | null
          check_size_max?: number | null
          ai_categories?: string[]
          geographic_preferences?: string[]
          business_model_preferences?: string[]
          revenue_requirements?: number | null
          lead_preference?: string | null
          created_at?: string
        }
      }
      introduction_requests: {
        Row: {
          id: string
          investor_user_id: string
          company_id: string
          message: string | null
          status: 'pending' | 'accepted' | 'declined'
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          investor_user_id: string
          company_id: string
          message?: string | null
          status?: 'pending' | 'accepted' | 'declined'
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          investor_user_id?: string
          company_id?: string
          message?: string | null
          status?: 'pending' | 'accepted' | 'declined'
          created_at?: string
          updated_at?: string | null
        }
      }
      saved_lists: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string | null
          created_at?: string
          updated_at?: string | null
        }
      }
      saved_list_items: {
        Row: {
          id: string
          list_id: string
          company_id: string
          deal_stage: string | null
          notes: string | null
          added_at: string
        }
        Insert: {
          id?: string
          list_id: string
          company_id: string
          deal_stage?: string | null
          notes?: string | null
          added_at?: string
        }
        Update: {
          id?: string
          list_id?: string
          company_id?: string
          deal_stage?: string | null
          notes?: string | null
          added_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Helper types for easier usage
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Company = Database['public']['Tables']['companies']['Row']
export type CompanyTech = Database['public']['Tables']['company_tech']['Row']
export type TractionSignal = Database['public']['Tables']['traction_signals']['Row']
export type DealReadinessScore = Database['public']['Tables']['deal_readiness_scores']['Row']
export type FundingRound = Database['public']['Tables']['funding_rounds']['Row']
export type TeamMember = Database['public']['Tables']['team_members']['Row']
export type InvestorFirm = Database['public']['Tables']['investor_firms']['Row']
export type InvestmentCriteria = Database['public']['Tables']['investment_criteria']['Row']
export type IntroductionRequest = Database['public']['Tables']['introduction_requests']['Row']
export type SavedList = Database['public']['Tables']['saved_lists']['Row']
export type SavedListItem = Database['public']['Tables']['saved_list_items']['Row']

// Extended types with relations
export type CompanyWithDetails = Company & {
  company_tech: CompanyTech | null
  traction_signals: TractionSignal | null
  deal_readiness_scores: DealReadinessScore | null
  funding_rounds: FundingRound[]
  team_members: TeamMember[]
}

export type InvestorFirmWithCriteria = InvestorFirm & {
  investment_criteria: InvestmentCriteria | null
}
