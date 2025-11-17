-- AI Startup Marketplace Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- CORE TABLES
-- ============================================

-- User Profiles
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL CHECK (role IN ('investor', 'startup', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

-- AI Startup Companies
CREATE TABLE IF NOT EXISTS companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  website TEXT,
  description TEXT,
  tagline TEXT,
  logo_url TEXT,
  headquarters_location TEXT,
  year_founded INTEGER,
  employee_count INTEGER,
  is_claimed BOOLEAN DEFAULT FALSE,
  claimed_by UUID REFERENCES profiles(id),
  fundraising_status TEXT DEFAULT 'not_raising' CHECK (fundraising_status IN ('actively_raising', 'open', 'not_raising')),
  target_raise_amount DECIMAL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

-- Company Technology Stack
CREATE TABLE IF NOT EXISTS company_tech (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  ai_category TEXT[] DEFAULT '{}',
  primary_use_case TEXT,
  model_architecture TEXT,
  llm_provider TEXT,
  ml_frameworks TEXT[] DEFAULT '{}',
  programming_languages TEXT[] DEFAULT '{}',
  cloud_provider TEXT,
  infrastructure_tools TEXT[] DEFAULT '{}',
  vector_database TEXT,
  deployment_type TEXT,
  has_api BOOLEAN DEFAULT FALSE,
  compliance_certifications TEXT[] DEFAULT '{}',
  github_url TEXT,
  github_stars INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ,
  UNIQUE(company_id)
);

-- Traction Signals
CREATE TABLE IF NOT EXISTS traction_signals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  monthly_traffic INTEGER,
  traffic_growth_6m DECIMAL,
  hiring_velocity INTEGER,
  open_positions INTEGER,
  estimated_revenue_min DECIMAL,
  estimated_revenue_max DECIMAL,
  customer_count INTEGER,
  notable_customers TEXT[] DEFAULT '{}',
  g2_rating DECIMAL,
  g2_review_count INTEGER,
  press_mentions_6m INTEGER,
  social_following INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ,
  UNIQUE(company_id)
);

-- Deal Readiness Scores
CREATE TABLE IF NOT EXISTS deal_readiness_scores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  overall_score INTEGER NOT NULL CHECK (overall_score >= 0 AND overall_score <= 100),
  growth_score INTEGER,
  traction_score INTEGER,
  funding_score INTEGER,
  product_score INTEGER,
  market_score INTEGER,
  calculated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(company_id)
);

-- Funding Rounds
CREATE TABLE IF NOT EXISTS funding_rounds (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  round_type TEXT NOT NULL,
  amount DECIMAL,
  date DATE,
  lead_investors TEXT[] DEFAULT '{}',
  all_investors TEXT[] DEFAULT '{}',
  valuation DECIMAL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Team Members
CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  is_founder BOOLEAN DEFAULT FALSE,
  linkedin_url TEXT,
  email TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Investor Firms
CREATE TABLE IF NOT EXISTS investor_firms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  website TEXT,
  logo_url TEXT,
  description TEXT,
  investment_thesis TEXT,
  firm_type TEXT,
  year_founded INTEGER,
  aum DECIMAL,
  office_locations TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

-- Investment Criteria
CREATE TABLE IF NOT EXISTS investment_criteria (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  firm_id UUID REFERENCES investor_firms(id) ON DELETE CASCADE,
  stages TEXT[] DEFAULT '{}',
  check_size_min DECIMAL,
  check_size_max DECIMAL,
  ai_categories TEXT[] DEFAULT '{}',
  geographic_preferences TEXT[] DEFAULT '{}',
  business_model_preferences TEXT[] DEFAULT '{}',
  revenue_requirements DECIMAL,
  lead_preference TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(firm_id)
);

-- Introduction Requests
CREATE TABLE IF NOT EXISTS introduction_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  investor_user_id UUID REFERENCES profiles(id),
  company_id UUID REFERENCES companies(id),
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

-- Saved Lists
CREATE TABLE IF NOT EXISTS saved_lists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

-- Saved List Items
CREATE TABLE IF NOT EXISTS saved_list_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  list_id UUID REFERENCES saved_lists(id) ON DELETE CASCADE,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  deal_stage TEXT,
  notes TEXT,
  added_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(list_id, company_id)
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_companies_slug ON companies(slug);
CREATE INDEX IF NOT EXISTS idx_companies_location ON companies(headquarters_location);
CREATE INDEX IF NOT EXISTS idx_companies_year_founded ON companies(year_founded);
CREATE INDEX IF NOT EXISTS idx_companies_fundraising ON companies(fundraising_status);

CREATE INDEX IF NOT EXISTS idx_company_tech_ai_category ON company_tech USING GIN (ai_category);
CREATE INDEX IF NOT EXISTS idx_company_tech_llm_provider ON company_tech(llm_provider);
CREATE INDEX IF NOT EXISTS idx_company_tech_cloud_provider ON company_tech(cloud_provider);

CREATE INDEX IF NOT EXISTS idx_deal_scores ON deal_readiness_scores(overall_score DESC);

CREATE INDEX IF NOT EXISTS idx_intro_requests_status ON introduction_requests(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_intro_requests_investor ON introduction_requests(investor_user_id);
CREATE INDEX IF NOT EXISTS idx_intro_requests_company ON introduction_requests(company_id);

CREATE INDEX IF NOT EXISTS idx_saved_lists_user ON saved_lists(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_list_items_list ON saved_list_items(list_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_tech ENABLE ROW LEVEL SECURITY;
ALTER TABLE traction_signals ENABLE ROW LEVEL SECURITY;
ALTER TABLE deal_readiness_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE funding_rounds ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE investor_firms ENABLE ROW LEVEL SECURITY;
ALTER TABLE investment_criteria ENABLE ROW LEVEL SECURITY;
ALTER TABLE introduction_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_list_items ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Companies policies (public read, owner write)
CREATE POLICY "Companies are viewable by authenticated users" ON companies FOR SELECT TO authenticated USING (true);
CREATE POLICY "Claimed companies can be updated by owner" ON companies FOR UPDATE TO authenticated USING (claimed_by = auth.uid());

-- Company tech policies
CREATE POLICY "Company tech is viewable by authenticated users" ON company_tech FOR SELECT TO authenticated USING (true);
CREATE POLICY "Company tech can be updated by company owner" ON company_tech FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM companies WHERE companies.id = company_tech.company_id AND companies.claimed_by = auth.uid()));

-- Traction signals policies
CREATE POLICY "Traction signals are viewable by authenticated users" ON traction_signals FOR SELECT TO authenticated USING (true);

-- Deal readiness scores policies
CREATE POLICY "Scores are viewable by authenticated users" ON deal_readiness_scores FOR SELECT TO authenticated USING (true);

-- Funding rounds policies
CREATE POLICY "Funding rounds are viewable by authenticated users" ON funding_rounds FOR SELECT TO authenticated USING (true);

-- Team members policies
CREATE POLICY "Team members are viewable by authenticated users" ON team_members FOR SELECT TO authenticated USING (true);

-- Investor firms policies
CREATE POLICY "Investor firms are viewable by authenticated users" ON investor_firms FOR SELECT TO authenticated USING (true);

-- Investment criteria policies
CREATE POLICY "Investment criteria are viewable by authenticated users" ON investment_criteria FOR SELECT TO authenticated USING (true);

-- Introduction requests policies
CREATE POLICY "Users can view their own intro requests" ON introduction_requests FOR SELECT TO authenticated
  USING (investor_user_id = auth.uid() OR EXISTS (SELECT 1 FROM companies WHERE companies.id = company_id AND companies.claimed_by = auth.uid()));
CREATE POLICY "Investors can create intro requests" ON introduction_requests FOR INSERT TO authenticated
  WITH CHECK (investor_user_id = auth.uid() AND EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'investor'));
CREATE POLICY "Company owners can update intro requests" ON introduction_requests FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM companies WHERE companies.id = company_id AND companies.claimed_by = auth.uid()));

-- Saved lists policies
CREATE POLICY "Users can view own lists" ON saved_lists FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can create own lists" ON saved_lists FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update own lists" ON saved_lists FOR UPDATE TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can delete own lists" ON saved_lists FOR DELETE TO authenticated USING (user_id = auth.uid());

-- Saved list items policies
CREATE POLICY "Users can view own list items" ON saved_list_items FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM saved_lists WHERE saved_lists.id = list_id AND saved_lists.user_id = auth.uid()));
CREATE POLICY "Users can add to own lists" ON saved_list_items FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM saved_lists WHERE saved_lists.id = list_id AND saved_lists.user_id = auth.uid()));
CREATE POLICY "Users can update own list items" ON saved_list_items FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM saved_lists WHERE saved_lists.id = list_id AND saved_lists.user_id = auth.uid()));
CREATE POLICY "Users can remove from own lists" ON saved_list_items FOR DELETE TO authenticated
  USING (EXISTS (SELECT 1 FROM saved_lists WHERE saved_lists.id = list_id AND saved_lists.user_id = auth.uid()));

-- ============================================
-- TRIGGERS
-- ============================================

-- Auto-update timestamps
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_modtime BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER update_companies_modtime BEFORE UPDATE ON companies FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER update_company_tech_modtime BEFORE UPDATE ON company_tech FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER update_traction_signals_modtime BEFORE UPDATE ON traction_signals FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER update_investor_firms_modtime BEFORE UPDATE ON investor_firms FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER update_intro_requests_modtime BEFORE UPDATE ON introduction_requests FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER update_saved_lists_modtime BEFORE UPDATE ON saved_lists FOR EACH ROW EXECUTE FUNCTION update_modified_column();

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    COALESCE(NEW.raw_user_meta_data->>'role', 'investor')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
