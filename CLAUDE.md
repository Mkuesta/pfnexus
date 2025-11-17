# AI Startup Marketplace - Claude Code Configuration

## Project Overview

This is a **two-sided AI startup marketplace** platform connecting Private Equity firms and investors with high-quality AI startups. Unlike traditional databases like Crunchbase or PitchBook, this operates as an **active marketplace** where both sides have dedicated views, profiles, and interaction capabilities.

### Key Differentiators
- Deep AI-specific intelligence and technical filters (model architecture, frameworks, dataset types)
- Proprietary data enrichment and deal-readiness scoring (0-100 scale)
- Mutual discovery model where startups can browse and evaluate investors
- Direct introduction and connection system

---

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Database**: Supabase (PostgreSQL with Row Level Security)
- **Styling**: Tailwind CSS + shadcn/ui
- **Authentication**: Supabase Auth
- **Deployment**: Vercel + Supabase
- **Additional Libraries**: lucide-react, date-fns

---

## Project Structure

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
├── ui/ (shadcn components)
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

---

## Database Schema

### Core Tables
- **profiles** - User profiles (investor, startup, admin roles)
- **companies** - AI startup data (name, description, location, metrics)
- **company_tech** - Technology stack (AI category, model architecture, LLM provider, frameworks)
- **traction_signals** - Growth metrics (traffic, hiring, revenue estimates)
- **deal_readiness_scores** - Proprietary scoring (0-100)
- **investor_firms** - Investor company profiles
- **investment_criteria** - Stage focus, check sizes, AI categories
- **introduction_requests** - Connection requests (pending/accepted/declined)
- **saved_lists** - Investor deal lists
- **saved_list_items** - Companies in lists with deal stages

### Important: Row Level Security (RLS)
All tables use RLS. Always ensure:
- Public data is readable by authenticated users
- Users can only modify their own data
- Sensitive data requires appropriate role checks

---

## Key Features

### Investor Side
1. **Startup Discovery** - Advanced filtering (50+ filters including AI-specific)
2. **Startup Profiles** - Tabs: Overview, Technology, Team, Traction, Funding
3. **Deal Management** - Save to lists, tag, add notes, track deal stages
4. **Introduction Requests** - Request intros with personalized messages
5. **Export** - CSV/Excel export of startup lists

### Startup Side
1. **Investor Discovery** - Filter by stage, check size, sector focus
2. **Profile Management** - Claim profile, edit information, upload pitch deck
3. **Fundraising Signals** - Set status (Actively Raising, Open, Not Raising)
4. **Intro Request Management** - Accept/decline requests from verified investors

---

## Deal-Readiness Score Algorithm

**Proprietary algorithm scoring startups on fundraising likelihood (0-100)**

### Score Components (Weighted):
- **Growth signals (30%)**: Hiring velocity, traffic growth, GitHub activity
- **Traction signals (25%)**: Revenue indicators, customer count, review scores
- **Funding timeline (20%)**: Months since last raise, runway indicators
- **Product maturity (15%)**: Tech stack completeness, API availability, integrations
- **Market momentum (10%)**: Press mentions, social growth, industry positioning

### Score Interpretation:
- **80-100**: Highly likely to raise within 3 months
- **60-79**: Likely to raise within 6 months
- **40-59**: Possible fundraising within 12 months
- **0-39**: Not actively signaling fundraising

---

## Development Guidelines

### Code Style
- Use TypeScript strictly - no `any` types without justification
- Follow Next.js 14 App Router conventions
- Use server components by default, client components only when needed
- Implement proper error boundaries and loading states
- Use shadcn/ui components for consistent design

### Supabase Best Practices
- Always use typed queries with generated types
- Implement RLS policies for all new tables
- Use Supabase Auth helpers for Next.js
- Prefer server-side data fetching with `createServerComponentClient`
- Handle errors gracefully with user-friendly messages

### Security Requirements
- Validate all user inputs
- Sanitize data before database operations
- Never expose sensitive data (API keys, service role keys)
- Implement rate limiting for API routes
- Use HTTPS for all external communications

### Performance Guidelines
- Optimize images with Next.js Image component
- Implement code splitting and lazy loading
- Use React Query or SWR for client-side data fetching
- Cache frequently accessed data
- Minimize database queries with proper joins

---

## Testing Strategy

### Unit Tests
- Test individual components in isolation
- Test utility functions and hooks
- Mock Supabase client for consistent results

### Integration Tests
- Test complete user flows (investor journey, startup journey)
- Test database operations with RLS policies
- Test authentication and authorization

### E2E Tests
- Investor: search, filter, request intro, manage lists
- Startup: claim profile, edit info, manage intro requests
- Cross-role interactions

---

## Implementation Phases

1. **Phase 0** (Week 1): Project setup, dependencies, structure
2. **Phase 1** (Week 2-3): Database schema, authentication
3. **Phase 2** (Week 4-5): Investor dashboard, company listings
4. **Phase 3** (Week 6): Search and filtering system
5. **Phase 4** (Week 7-8): Startup dashboard, profile management
6. **Phase 5** (Week 9): Introduction request system
7. **Phase 6** (Week 10): Saved lists and deal pipeline
8. **Phase 7** (Week 11-13): Polish, advanced features, deployment

---

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
```

---

## Common Commands

```bash
# Development
npm run dev

# Build
npm run build

# Start production
npm start

# Run tests
npm test

# Lint
npm run lint

# Type check
npm run type-check
```

---

## User Personas

### Investors
- Growth Equity Analyst - Source deals matching investment thesis
- VC Associate - Identify emerging AI companies pre-Series A
- Corporate M&A Team - Find acquisition targets with specific tech
- Family Office Investor - Direct investments in mature AI companies

### Startups
- AI Startup Founder - Raise Series A/B funding
- CTO/Technical Lead - Ensure technical accuracy
- BD/Growth Lead - Strategic partnerships and visibility

---

## Monetization Model

### Investor Subscription Tiers (Recommended for MVP)
- **Free**: Limited searches (10/month), basic filters
- **Professional** ($499/month): Unlimited searches, all filters, 50 intro requests/month
- **Enterprise** ($2,000/month): API access, team seats, unlimited intros, analytics

### Future Startup Features
- Promoted profiles (increased visibility)
- Premium analytics (see who viewed profile)
- Priority support for profile verification

---

## Key Metrics to Track

### Platform Health
- Number of verified AI startups
- Data completeness score
- Startup profile claim rate

### Investor Engagement
- Active accounts, searches per user
- Intro requests sent, acceptance rate
- Conversion: searches → views → intros

### Business Metrics
- Monthly Recurring Revenue (MRR)
- Customer Acquisition Cost (CAC)
- Lifetime Value (LTV)
- Churn rate

---

## Important Considerations

### Data Quality
- Implement manual review process
- Allow user corrections
- Quality scoring for profiles
- Monitor data accuracy

### Startup Participation
- Clear value proposition (keep startup side free)
- Outreach campaigns
- Incentivize profile updates

### Investor Trust
- Transparency about data sources
- Confidence scores for estimates
- Verified tags for claimed profiles

---

## File Naming Conventions

- Components: PascalCase (e.g., `CompanyCard.tsx`)
- Pages: lowercase with hyphens (e.g., `startup-detail`)
- Utilities: camelCase (e.g., `formatDate.ts`)
- Types: PascalCase with `.types.ts` suffix
- API routes: lowercase in `api/` directory

---

## Git Workflow

- Use feature branches for new development
- Write clear, descriptive commit messages
- Create pull requests for code review
- Squash commits before merging
- Keep main branch deployable

---

## Resources

- [Next.js 14 Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/)
