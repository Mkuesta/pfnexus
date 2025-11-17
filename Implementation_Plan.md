# AI Startup Marketplace - Phase-by-Phase Implementation
## Next.js 14 + Supabase + Tailwind + shadcn/ui

**Timeline: 13 Weeks**

---

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Database**: Supabase (PostgreSQL)  
- **Styling**: Tailwind CSS + shadcn/ui
- **Auth**: Supabase Auth
- **Deployment**: Vercel + Supabase

---

## Phase 0: Project Setup (Week 1)

### Tasks

```bash
# 1. Initialize Next.js
npx create-next-app@latest ai-startup-marketplace --typescript --tailwind --app

# 2. Install dependencies
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
npm install lucide-react date-fns

# 3. Initialize shadcn/ui
npx shadcn-ui@latest init

# 4. Install shadcn components
npx shadcn-ui@latest add button input label card select dialog dropdown-menu table tabs badge avatar separator toast form checkbox radio-group textarea switch
```

### Environment Setup

Create `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
```

### Project Structure

```
app/
├── (auth)/
│   ├── login/
│   └── signup/
├── (investor)/
│   └── investor/
│       ├── dashboard/
│       ├── startups/
│       └── lists/
├── (startup)/
│   └── startup/
│       ├── dashboard/
│       ├── profile/
│       └── investors/
├── api/
├── layout.tsx
└── page.tsx

components/
├── ui/ (shadcn)
├── auth/
├── investor/
├── startup/
└── shared/

lib/
├── supabase/
├── types/
└── utils/

hooks/
```

### Tests

- [ ] Next.js starts without errors
- [ ] Supabase client initializes
- [ ] Environment variables loaded
- [ ] shadcn/ui components available

---

## Phase 1: Database Schema & Authentication (Week 2-3)

### Database Schema (Run in Supabase SQL Editor)

```sql
-- Core Tables
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT CHECK (role IN ('investor', 'startup', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  website TEXT,
  description TEXT,
  tagline TEXT,
  headquarters_location TEXT,
  year_founded INTEGER,
  employee_count INTEGER,
  is_claimed BOOLEAN DEFAULT FALSE,
  claimed_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE company_tech (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  ai_category TEXT[],
  model_architecture TEXT,
  llm_provider TEXT,
  ml_frameworks TEXT[],
  cloud_provider TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE traction_signals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  monthly_traffic INTEGER,
  hiring_velocity INTEGER,
  open_positions INTEGER,
  estimated_revenue_min DECIMAL,
  estimated_revenue_max DECIMAL,
  g2_rating DECIMAL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE deal_readiness_scores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  overall_score INTEGER CHECK (overall_score >= 0 AND overall_score <= 100),
  calculated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE investor_firms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  website TEXT,
  firm_type TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE investment_criteria (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  firm_id UUID REFERENCES investor_firms(id) ON DELETE CASCADE,
  stages TEXT[],
  check_size_min DECIMAL,
  check_size_max DECIMAL,
  ai_categories TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE introduction_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  investor_user_id UUID REFERENCES profiles(id),
  company_id UUID REFERENCES companies(id),
  message TEXT,
  status TEXT CHECK (status IN ('pending', 'accepted', 'declined')) DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE saved_lists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE saved_list_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  list_id UUID REFERENCES saved_lists(id) ON DELETE CASCADE,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  deal_stage TEXT,
  added_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Basic RLS Policies
CREATE POLICY "Public companies are viewable by everyone"
  ON companies FOR SELECT USING (true);

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT USING (auth.uid() = id);
```

### Authentication Pages

Create `app/(auth)/login/page.tsx` and `app/(auth)/signup/page.tsx` with:
- Email/password form
- Role selection (investor/startup)
- Error handling
- Redirect to appropriate dashboard

### Middleware

Create `middleware.ts`:
```typescript
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  await supabase.auth.getSession()
  return res
}
```

### Tests

- [ ] Database schema created
- [ ] User signup works
- [ ] User login works  
- [ ] Profile created on signup
- [ ] RLS policies working
- [ ] Auth redirects working

---

## Phase 2: Investor Dashboard & Listings (Week 4-5)

### Seed Sample Data

```typescript
// scripts/seed.ts
const companies = [
  {
    name: 'VectorAI',
    slug: 'vectorai',
    description: 'Next-gen vector databases',
    employee_count: 25,
    year_founded: 2022
  },
  // ... 10-15 more companies
]

// Insert companies, tech data, traction signals, scores
```

### Components

1. **CompanyCard** (`components/investor/company-card.tsx`)
   - Logo, name, tagline
   - Deal readiness badge
   - Key metrics
   - View details / Save buttons

2. **CompanyList** (`components/investor/company-list.tsx`)
   - Grid of CompanyCards
   - Loading states
   - Empty states

3. **Dashboard** (`app/(investor)/investor/dashboard/page.tsx`)
   - Stats cards (total startups, saved lists, intros)
   - Recent companies
   - Quick actions

4. **Company Detail** (`app/(investor)/investor/startups/[slug]/page.tsx`)
   - Tabs: Overview, Technology, Team, Traction, Funding
   - Action buttons: Request Intro, Save, Export
   - All company data displayed

### Tests

- [ ] Sample data seeded
- [ ] Company list renders
- [ ] Company cards display correctly
- [ ] Detail page shows all tabs
- [ ] Navigation works
- [ ] Data fetching works

---

## Phase 3: Search & Filtering (Week 6)

### Filter Component

Create `components/investor/startup-filters.tsx` with:
- AI Categories (checkboxes)
- Deal Readiness Score (slider/select)
- Funding Stage (checkboxes)
- Team Size (range inputs)
- LLM Provider (checkboxes)
- Cloud Provider (checkboxes)
- Reset button

### Search Page

Create `app/(investor)/investor/startups/page.tsx`:
- Search bar (name/description)
- Filter sidebar
- Results grid
- Results count
- Real-time filtering

### Filter Logic

```typescript
const handleFilterChange = (filters) => {
  let filtered = [...allCompanies]
  
  // Filter by AI category
  if (filters.aiCategories.length > 0) {
    filtered = filtered.filter(c => 
      c.tech?.ai_category?.some(cat => filters.aiCategories.includes(cat))
    )
  }
  
  // Filter by score
  if (filters.minScore > 0) {
    filtered = filtered.filter(c => 
      c.deal_readiness?.overall_score >= filters.minScore
    )
  }
  
  // ... more filters
  
  setFilteredCompanies(filtered)
}
```

### Tests

- [ ] AI category filter works
- [ ] Score filter works
- [ ] Multiple filters work together
- [ ] Search works
- [ ] Reset clears filters
- [ ] Count updates correctly

---

## Phase 4: Startup Dashboard & Profile (Week 7-8)

### Startup Dashboard

Create `app/(startup)/startup/dashboard/page.tsx`:
- Stats: Profile completeness, views, intro requests
- Pending intro requests
- Profile edit link
- Investor browse link

### Profile Claiming

1. **Claim Flow** (`app/(startup)/startup/profile/claim/page.tsx`)
   - Search for company
   - Verify email domain
   - Request claim
   - Admin approval (manual for MVP)

2. **Profile Edit** (`app/(startup)/startup/profile/edit/page.tsx`)
   - Multi-step form
   - Basic Info: name, description, location
   - Technology: AI categories, tech stack
   - Team: Add/edit members
   - Fundraising: Status, target amount
   - Save/Cancel actions

### Investor Browse (For Startups)

Create `app/(startup)/startup/investors/page.tsx`:
- List of investor firms
- Filters: Stage focus, check size, sectors
- Firm cards with criteria
- View firm detail

### Tests

- [ ] Startup dashboard renders
- [ ] Profile claim works
- [ ] Profile edit saves
- [ ] Investor browse works
- [ ] Filters work for investors
- [ ] Navigation works

---

## Phase 5: Introduction Request System (Week 9)

### Request Introduction Flow

1. **Request Button** (On company detail page)
   - Opens dialog/modal
   - Message textarea
   - Submit button

2. **Create Request** (API route)
```typescript
// app/api/introductions/route.ts
export async function POST(req) {
  const { companyId, message } = await req.json()
  const { user } = await supabase.auth.getUser()
  
  const { data, error } = await supabase
    .from('introduction_requests')
    .insert({
      investor_user_id: user.id,
      company_id: companyId,
      message,
      status: 'pending'
    })
  
  // Send email notification to startup
  
  return Response.json({ data, error })
}
```

3. **Startup Inbox** (`app/(startup)/startup/intro-requests/page.tsx`)
   - List of pending requests
   - Investor info
   - Message
   - Accept/Decline buttons

4. **Accept/Decline Actions**
   - Update request status
   - Share contact info (if accepted)
   - Send email notification

### Notifications

Simple email notifications using Supabase Edge Functions or Resend:
- New intro request → Startup
- Request accepted → Investor
- Request declined → Investor

### Tests

- [ ] Request intro button works
- [ ] Request creates record
- [ ] Startup sees request
- [ ] Accept updates status
- [ ] Decline updates status
- [ ] Emails sent (if implemented)

---

## Phase 6: Saved Lists & Deal Pipeline (Week 10)

### Create List

```typescript
// app/api/lists/route.ts
export async function POST(req) {
  const { name, description } = await req.json()
  const { user } = await supabase.auth.getUser()
  
  const { data } = await supabase
    .from('saved_lists')
    .insert({ user_id: user.id, name, description })
    .select()
    .single()
  
  return Response.json({ data })
}
```

### List Management

Create `app/(investor)/investor/lists/page.tsx`:
- Create new list
- View all lists
- Delete list
- Rename list

### List Detail

Create `app/(investor)/investor/lists/[id]/page.tsx`:
- List name and description
- Company cards
- Add companies button
- Remove from list
- Deal stage dropdown per company
- Notes per company
- Export list (CSV)

### Add to List Flow

1. On company card/detail: "Save to list" button
2. Opens modal with list selection
3. Select existing list or create new
4. Add to `saved_list_items`

### Tests

- [ ] Create list works
- [ ] View lists works
- [ ] Add company to list works
- [ ] Remove from list works
- [ ] Update deal stage works
- [ ] Export works
- [ ] Delete list works

---

## Phase 7: Polish & Deploy (Week 11-13)

### Week 11: Polish

**UI Improvements:**
- Loading skeletons
- Error boundaries
- Toast notifications
- Empty states
- 404 pages
- Mobile responsiveness

**Performance:**
- Image optimization
- Code splitting
- Lazy loading
- Query optimization
- Caching strategy

### Week 12: Advanced Features

**Email Notifications:**
- Setup Resend/SendGrid
- Welcome email
- Weekly digest for investors
- Intro request notifications

**Analytics:**
- Track page views
- Track filter usage
- Track intro requests
- Dashboard for admin

**SEO:**
- Meta tags
- Sitemap
- robots.txt
- OpenGraph images

### Week 13: Testing & Deployment

**Integration Tests:**
```typescript
describe('End-to-End Flows', () => {
  test('Investor can search, filter, and request intro', async () => {
    // Login as investor
    // Go to startups page
    // Apply filters
    // Click company
    // Request introduction
    // Verify request created
  })
  
  test('Startup can claim profile and manage intros', async () => {
    // Login as startup
    // Claim profile
    // View intro requests
    // Accept request
    // Verify status updated
  })
})
```

**Deployment:**

1. **Database:** Already on Supabase
2. **Frontend:** Deploy to Vercel
   ```bash
   vercel --prod
   ```
3. **Environment Variables:** Set in Vercel dashboard
4. **Domain:** Configure custom domain
5. **Monitoring:** Setup Sentry for errors

### Final Checklist

- [ ] All features working
- [ ] Mobile responsive
- [ ] Performance optimized
- [ ] SEO implemented
- [ ] Email notifications working
- [ ] Error handling robust
- [ ] Tests passing
- [ ] Deployed to production
- [ ] Domain configured
- [ ] Monitoring setup

---

## Complete Test Suite

```typescript
// __tests__/integration.test.ts

describe('Full Platform Tests', () => {
  describe('Authentication', () => {
    test('User can sign up as investor')
    test('User can sign up as startup')
    test('User can login')
    test('User redirected based on role')
    test('Protected routes require auth')
  })
  
  describe('Investor Flows', () => {
    test('Can view company list')
    test('Can filter companies')
    test('Can search companies')
    test('Can view company details')
    test('Can request introduction')
    test('Can save to list')
    test('Can create list')
    test('Can manage lists')
    test('Can export list')
  })
  
  describe('Startup Flows', () => {
    test('Can claim profile')
    test('Can edit profile')
    test('Can view intro requests')
    test('Can accept intro request')
    test('Can decline intro request')
    test('Can browse investors')
    test('Can filter investors')
  })
  
  describe('Data Integrity', () => {
    test('RLS policies enforced')
    test('User can only edit own data')
    test('Intro requests link correctly')
    test('Lists belong to correct user')
  })
  
  describe('Performance', () => {
    test('Page loads under 2s')
    test('Filters respond instantly')
    test('Images optimized')
    test('No memory leaks')
  })
})
```

---

## Running the Project

```bash
# Development
npm run dev

# Build
npm run build

# Start production
npm start

# Run tests
npm test

# Run lint
npm run lint

# Type check
npm run type-check
```

---

## Key Files Reference

```
Configuration:
- next.config.js
- tailwind.config.ts
- tsconfig.json
- .env.local
- middleware.ts

Core Lib:
- lib/supabase/client.ts
- lib/supabase/server.ts
- lib/types/database.ts
- lib/utils.ts

Key Components:
- components/investor/company-list.tsx
- components/investor/company-card.tsx
- components/investor/startup-filters.tsx
- components/startup/profile-form.tsx
- components/shared/header.tsx
- components/shared/footer.tsx

Key Pages:
- app/(auth)/login/page.tsx
- app/(investor)/investor/dashboard/page.tsx
- app/(investor)/investor/startups/page.tsx
- app/(investor)/investor/startups/[slug]/page.tsx
- app/(startup)/startup/dashboard/page.tsx
- app/(startup)/startup/profile/edit/page.tsx
```

---

## Troubleshooting

**Supabase Connection Issues:**
- Check environment variables
- Verify Supabase project is active
- Check RLS policies

**Build Errors:**
- Clear .next folder
- Delete node_modules and reinstall
- Check TypeScript errors

**Deployment Issues:**
- Verify environment variables in Vercel
- Check build logs
- Ensure database migrations ran

---

## Next Steps After MVP

1. **Data Enrichment Pipeline**
   - Web scraping setup
   - GitHub API integration
   - Automated data updates

2. **Advanced Matching**
   - ML-based recommendations
   - Similarity scoring
   - Auto-matching investors to startups

3. **Multi-Niche Expansion**
   - Cybersecurity startups
   - Climate tech startups
   - Copy architecture for new domains

4. **Mobile Apps**
   - React Native
   - Push notifications
   - Offline support

---

**END OF IMPLEMENTATION PLAN**
