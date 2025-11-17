# Product Requirements Document (PRD)
## Two-Sided AI Startup Marketplace Platform
### Connecting Private Equity Firms with AI Startups

**Version 1.0** | November 17, 2025

---

## 1. Executive Summary

This platform is a **two-sided marketplace** designed to connect Private Equity firms and investors with high-quality AI startups. Unlike traditional platforms like Crunchbase or PitchBook that serve as databases, this platform operates as an **active marketplace** where both sides have dedicated views, profiles, and interaction capabilities.

The platform differentiates itself through:
- Deep AI-specific intelligence and technical filters
- Proprietary data enrichment and deal-readiness scoring
- Mutual discovery model where startups can browse and evaluate investors
- Direct introduction and connection system

---

## 2. Platform Vision & Core Concept

### 2.1 Two-Sided Marketplace Model

The platform operates with two distinct but interconnected user experiences:

| **Investor Side** | **Startup Side** |
|-------------------|------------------|
| Browse and filter AI startups | Browse relevant investors |
| Access deep startup intelligence | View investor profiles & portfolios |
| View deal-readiness scores | See investment criteria |
| Request introductions | Signal fundraising readiness |
| Export startup lists | Manage intro requests |
| Track deal pipeline | Update company profile |

### 2.2 Value Proposition

#### For Investors
- **Deepest AI-specific intelligence**: Technical filters unavailable elsewhere (model architecture, frameworks, dataset types)
- **Proprietary data enrichment**: Automated scraping, tech stack analysis, revenue estimation
- **Deal-readiness scoring**: Algorithmic assessment of fundraising likelihood
- **Direct access**: Verified founder contact information
- **Competitive intelligence**: Track startup momentum and hiring trends

#### For Startups
- **Investor discovery**: Find PE firms that match your stage, vertical, and geography
- **Investment criteria transparency**: Understand what each firm is looking for
- **Portfolio insights**: See similar companies they've invested in
- **Control your narrative**: Update profile data and signal fundraising status
- **Qualified leads**: Only receive intro requests from verified, relevant investors

---

## 3. User Personas

### 3.1 Investor Personas

| Persona | Role | Primary Goal | Key Features Used |
|---------|------|--------------|-------------------|
| **Growth Equity Analyst** | Mid-level investment professional | Source deals matching specific investment thesis | Advanced filters, traction signals, exports |
| **VC Associate** | Early-stage investment team member | Identify emerging AI companies before Series A | GitHub metrics, hiring velocity, founder backgrounds |
| **Corporate M&A Team** | Strategic acquisition group | Find acquisition targets with specific tech capabilities | Tech stack filters, product intelligence, team composition |
| **Family Office Investor** | Independent wealth manager | Direct investments in mature AI companies | Revenue estimates, customer traction, deal-readiness |

### 3.2 Startup Personas

| Persona | Role | Primary Goal | Key Features Used |
|---------|------|--------------|-------------------|
| **AI Startup Founder** | CEO/Co-founder | Raise Series A/B funding | Investor search, profile updates, intro management |
| **CTO/Technical Lead** | Technical co-founder | Ensure technical details are accurately represented | Tech stack updates, product information edits |
| **BD/Growth Lead** | Business development | Strategic partnerships and visibility | Traction signals, customer stories, case studies |

---

## 4. AI Startup Data Points

### 4.1 Company Basic Information

| Data Point | Source Type | Update Frequency | Notes |
|------------|-------------|------------------|-------|
| Company name | Crunchbase / PitchBook / User | User-controlled | Required field |
| Logo | Website scraping / Clearbit | Weekly | Automated enrichment |
| Description / Tagline | Website / LinkedIn / User | User-controlled | User can edit |
| Website URL | Public database | Static | Verified |
| LinkedIn URL | LinkedIn search | Monthly | Automated discovery |
| Twitter/X handle | Website footer / Social links | Monthly | Social signals |
| Headquarters location | LinkedIn / Crunchbase | Quarterly | City, State, Country |
| Year founded | Crunchbase / PitchBook | Static | Historical data |
| Employee count | LinkedIn / Clearbit | Monthly | Team size tracking |
| Industry/Sector tags | AI classification model | User-controlled | Multi-select |

### 4.2 AI Technology & Product Data

| Data Point | Source Type | Update Frequency | Notes |
|------------|-------------|------------------|-------|
| **AI Category** | ML classification / User | User-controlled | NLP, Computer Vision, MLOps, Generative AI, etc. |
| **Primary use case** | Website parsing / User | User-controlled | Content Generation, Code Gen, Analytics, etc. |
| **Model type/architecture** | Tech blog / GitHub / User | Quarterly | Transformer, Diffusion, CNN, RNN, Custom |
| **LLM provider used** | Documentation / User | Quarterly | OpenAI, Anthropic, Meta, Google, Open-source |
| **ML frameworks** | Job postings / GitHub | Monthly | PyTorch, TensorFlow, JAX, Scikit-learn |
| **Programming languages** | Job postings / BuiltWith | Monthly | Python, JavaScript, etc. |
| **Cloud provider** | Job postings / Documentation | Quarterly | AWS, GCP, Azure, Multi-cloud |
| **Infrastructure tools** | Tech blog / GitHub | Quarterly | LangChain, LlamaIndex, Vector DBs |
| **Vector database** | Documentation / User | Quarterly | Pinecone, Weaviate, Chroma, etc. |
| **Dataset type** | Research papers / User | User-controlled | Proprietary, Synthetic, Public, Industry-specific |
| **Deployment type** | Product page / User | User-controlled | Cloud, On-premise, Hybrid, Edge |
| **API availability** | Documentation scraping | Monthly | REST, GraphQL, SDK availability |
| **Integration ecosystem** | Marketplace data | Monthly | Zapier, Slack, etc. |
| **Compliance certifications** | Security page / User | Quarterly | SOC 2, HIPAA, GDPR, ISO 27001 |
| **GitHub repository** | GitHub search | Static | Public repo link |
| **GitHub stars** | GitHub API | Daily | Popularity metric |
| **GitHub commits/month** | GitHub API | Weekly | Development velocity |

### 4.3 Team & People Data

| Data Point | Source Type | Update Frequency | Notes |
|------------|-------------|------------------|-------|
| **Founder names** | LinkedIn / Crunchbase | User-controlled | Key decision makers |
| **Founder LinkedIn profiles** | LinkedIn scraping | Monthly | Professional backgrounds |
| **Founder emails** | Hunter.io / User verification | Quarterly | Verified contacts |
| **Founder backgrounds** | LinkedIn / Crunchbase | Quarterly | Previous experience |
| **Previous companies** | LinkedIn | Quarterly | Career history |
| **Education background** | LinkedIn | Static | Universities, degrees |
| **Key executives** | LinkedIn / User | User-controlled | C-suite team |
| **Team composition** | LinkedIn job titles | Monthly | Engineering, Sales, Marketing ratios |
| **Engineering % of team** | LinkedIn analysis | Monthly | Technical team size |
| **Advisors** | Website / LinkedIn / User | User-controlled | Strategic advisors |

### 4.4 Traction & Growth Signals

| Data Point | Source Type | Update Frequency | Notes |
|------------|-------------|------------------|-------|
| **Estimated monthly traffic** | SimilarWeb **(Placeholder)** | Monthly | Website visitors |
| **Traffic growth (6-month)** | SimilarWeb **(Placeholder)** | Monthly | Growth trajectory |
| **Hiring velocity** | LinkedIn / Job boards | Weekly | New hires per month |
| **Open positions count** | Careers page scraping | Weekly | Active hiring signal |
| **Estimated revenue range** | Revenue model / User | User-controlled | ARR brackets |
| **Pricing model** | Pricing page | Monthly | Subscription, Usage-based, etc. |
| **Pricing tiers** | Pricing page | Monthly | Starter, Pro, Enterprise |
| **Customer count (disclosed)** | Website / Press | Quarterly | Public customer numbers |
| **Notable customers** | Case studies / Logos | Monthly | Enterprise clients |
| **G2 rating** | G2 API | Weekly | Review score |
| **G2 review count** | G2 API | Weekly | Number of reviews |
| **Product Hunt score** | Product Hunt | Static | Launch performance |
| **App store ratings** | App stores | Weekly | Mobile app ratings (if applicable) |
| **Recent product launches** | Blog / PR / User | Weekly | Product updates |
| **Press mentions (6-month)** | News API / Scraping | Weekly | Media coverage |
| **Social media following** | Twitter / LinkedIn | Weekly | Audience size |

### 4.5 Funding & Investment Data

| Data Point | Source Type | Update Frequency | Notes |
|------------|-------------|------------------|-------|
| **Total funding raised** | Crunchbase / PitchBook | Weekly | Cumulative amount |
| **Latest funding round** | Crunchbase / PitchBook | Weekly | Seed, Series A, B, etc. |
| **Latest round date** | Crunchbase / PitchBook | Weekly | When they raised |
| **Latest round amount** | Crunchbase / PitchBook | Weekly | Raise size |
| **Number of funding rounds** | Crunchbase / PitchBook | Weekly | Funding history |
| **Investor list** | Crunchbase / PitchBook | Weekly | All investors |
| **Lead investors** | Crunchbase / Press | Weekly | Lead per round |
| **Valuation (if public)** | Press / PitchBook | As announced | Post-money valuation |
| **Fundraising status** | User input / Signals | User-controlled | Actively Raising / Open / Not Raising |
| **Target round size** | User input | User-controlled | How much they want to raise |
| **Months since last raise** | Calculated | Real-time | Runway indicator |

### 4.6 Deal-Readiness Score

**Proprietary algorithm scoring startups on fundraising likelihood (0-100 scale)**

#### Score Components (Weighted):
- **Growth signals (30%)**: Hiring velocity, traffic growth, GitHub activity
- **Traction signals (25%)**: Revenue indicators, customer count, review scores
- **Funding timeline (20%)**: Months since last raise, typical runway indicators
- **Product maturity (15%)**: Tech stack completeness, API availability, integrations
- **Market momentum (10%)**: Press mentions, social growth, industry positioning

#### Score Interpretation:
- **80-100**: Highly likely to raise within 3 months
- **60-79**: Likely to raise within 6 months
- **40-59**: Possible fundraising within 12 months
- **0-39**: Not actively signaling fundraising

---

## 5. Investor Profile Data Points

### 5.1 Firm Basic Information

| Data Point | Source Type | Update Frequency | Notes |
|------------|-------------|------------------|-------|
| **Firm name** | User registration | User-controlled | Required field |
| **Firm type** | User input / Crunchbase | User-controlled | VC, Corporate VC, Family Office, PE |
| **Website** | User input | User-controlled | Firm website |
| **Logo** | User upload | User-controlled | Firm branding |
| **Description** | User input | User-controlled | Firm overview |
| **Investment thesis** | User input | User-controlled | Investment focus |
| **Office locations** | User input | User-controlled | Geographic presence |
| **Year founded** | Crunchbase / User | User-controlled | Firm history |
| **AUM / Fund size** | User input / PitchBook | User-controlled | Assets under management |

### 5.2 Investment Criteria

| Data Point | Source Type | Update Frequency | Notes |
|------------|-------------|------------------|-------|
| **Stage focus** | User input | User-controlled | Pre-seed, Seed, Series A-D, Growth |
| **Check size min/max** | User input | User-controlled | Investment range |
| **Sector focus (AI categories)** | User input | User-controlled | Which AI verticals |
| **Geographic preferences** | User input | User-controlled | Regions they invest in |
| **Business model preference** | User input | User-controlled | B2B, B2C, Enterprise, SMB |
| **Revenue requirements** | User input | User-controlled | Minimum ARR, etc. |
| **Lead vs follow preference** | User input | User-controlled | Deal structure |

### 5.3 Portfolio & Track Record

| Data Point | Source Type | Update Frequency | Notes |
|------------|-------------|------------------|-------|
| **Portfolio companies list** | Crunchbase / User | Monthly | All portfolio companies |
| **Number of portfolio companies** | Calculated | Real-time | Total count |
| **Investment dates** | Crunchbase | Monthly | When invested |
| **Investment stages** | Crunchbase | Monthly | Stage of each investment |
| **Recent investments (12 months)** | Crunchbase / Press | Weekly | Recent activity |
| **Notable exits** | Crunchbase / User | User-controlled | Success stories |
| **Investment velocity** | Calculated | Monthly | Deals per quarter |

### 5.4 Team Information

| Data Point | Source Type | Update Frequency | Notes |
|------------|-------------|------------------|-------|
| **Partners list** | User input / Website | User-controlled | Investment partners |
| **Partner LinkedIn profiles** | LinkedIn / User | User-controlled | Professional profiles |
| **Partner areas of focus** | User input | User-controlled | Sector expertise |
| **Associates/Analysts** | User input | User-controlled | Junior team |
| **Team size** | LinkedIn / User | Quarterly | Total employees |

---

## 6. Platform Features

### 6.1 Investor Side Features

#### Startup Discovery & Search
- **Advanced filtering system** (50+ filters including):
  - General: Revenue, stage, location, team size, year founded
  - AI-specific: Category, model type, LLM provider, frameworks, deployment
  - Traction: Hiring velocity, traffic growth, deal-readiness score
  - Funding: Stage, total raised, months since last raise

#### Startup Profile Views
- **Overview Tab**: Company snapshot, key metrics, deal-readiness score
- **Technology Tab**: AI architecture, tech stack, integrations, API
- **Team Tab**: Founders, executives, composition, backgrounds
- **Traction Tab**: Revenue estimates, customers, reviews, growth metrics
- **Funding Tab**: Funding history, investors, valuation, fundraising status

#### Deal Management Tools
- Save startups to custom lists
- Tag and categorize companies
- Add internal notes
- Track deal stage (Researching, Reaching Out, In Conversation, Diligence, Passed)
- Export lists to CSV/Excel
- Invite team members to collaborate
- Set reminders for follow-ups

#### Introduction Request System
- Request introduction to founders
- Include personalized message
- Track intro request status
- Receive notification when accepted

### 6.2 Startup Side Features

#### Investor Discovery & Search
- **Filter investors by**:
  - Investment stage and check size
  - Sector focus (AI categories)
  - Geographic location
  - Firm type and fund size
  - Recent investment activity

#### Investor Profile Views
- **Firm Overview**: Description, thesis, fund info, locations
- **Investment Criteria**: Stage, check size, sectors, geography
- **Portfolio Companies**: List of investments, similar companies
- **Team**: Partners, associates, expertise areas

#### Company Profile Management
- Claim and verify company profile
- Update company information
- Edit technology details
- Add/update team members
- Upload pitch deck (private, shown only to verified investors)
- Add customer case studies
- Set visibility preferences

#### Fundraising Signal Management
- Signal fundraising status (Actively Raising, Open to Conversations, Not Currently Raising)
- Specify target round amount
- Indicate preferred investor types
- Control visibility of fundraising status

#### Introduction Request Management
- View incoming intro requests
- Review investor profiles
- Accept or decline requests
- Set auto-response preferences
- Track conversation history

---

## 7. Data Sources & Processing

### 7.1 Data Sources

#### Public Databases (Baseline)
- **Crunchbase**: Funding data, investors, founders
- **PitchBook**: Private market data, valuations
- **LinkedIn**: Team data, hiring signals

#### Web Scraping (Enrichment)
- Company websites: Product info, tech stack hints
- Career pages: Open positions, team growth
- Tech blogs: Architecture details, model info
- Documentation: API specs, integrations
- Pricing pages: Revenue models, tiers

#### Technical Sources
- **GitHub**: Repository activity, stars, tech stack
- **HuggingFace**: Model cards, datasets
- **BuiltWith**: Infrastructure detection
- Research papers: Technical approaches

#### Traction Signals
- **SimilarWeb**: Traffic estimates **(Placeholder - to be integrated)**
- **G2/Capterra**: Review scores and counts
- **Product Hunt**: Launch data, upvotes
- App stores: Mobile ratings (if applicable)

#### Contact & Social
- **Hunter.io**: Email verification
- **Clearbit**: Company enrichment
- **Twitter/X**: Social presence
- News APIs: Press mentions

#### User Submissions
- Startup profile claims and updates
- Investor profile creation
- Fundraising status signals
- Manual corrections and additions

### 7.2 Processing Pipeline

1. **Discovery**: Identify AI startups via database queries, web crawling, and manual additions
2. **Classification**: ML model categorizes companies by AI type, use case, industry
3. **Enrichment**: Scrape additional data points from multiple sources
4. **Tech Stack Extraction**: NLP analysis of job postings, documentation, GitHub repos
5. **Signal Calculation**: Compute hiring velocity, traffic trends, GitHub activity
6. **Deal-Readiness Scoring**: Algorithm combines signals into 0-100 score
7. **Quality Check**: Flag incomplete or low-quality profiles for manual review
8. **Refresh Cycle**: Daily/weekly/monthly updates based on data type

---

## 8. MVP Scope & Phased Rollout

### 8.1 MVP Features (Phase 1 - Months 1-4)

**Goal**: Launch functional two-sided marketplace for AI startups within 3-4 months

#### Investor Side MVP
- Basic startup search and filtering (10-15 key filters)
- Startup profile pages (core data sections only)
- Simple deal-readiness score (v1 algorithm)
- Save startups to lists
- Request introductions
- Export to CSV

#### Startup Side MVP
- Browse investors with basic filters
- View investor profiles (basic info + portfolio)
- Claim company profile
- Update core company information
- Signal fundraising status
- Manage intro requests (accept/decline)

#### Data Coverage MVP
- 500-1,000 AI startups (US-focused initially)
- Basic data from Crunchbase/PitchBook
- Website scraping for company descriptions
- LinkedIn data for team and hiring
- Manual AI categorization (will automate in Phase 2)

#### Excluded from MVP
- GitHub deep analysis
- Advanced revenue estimation
- Traffic analytics (SimilarWeb integration)
- Complex filtering (will add incrementally)
- Team collaboration features
- Mobile apps

### 8.2 Phase 2 Enhancements (Months 5-8)

- Expand to 2,000+ startups, add international coverage
- Add all advanced filters from full specification
- GitHub integration and metrics
- Traffic estimation (via third-party API)
- Enhanced deal-readiness algorithm
- Team collaboration for investors
- Pitch deck uploads for startups
- Email notifications and alerts

### 8.3 Phase 3 Advanced Features (Months 9-12)

- AI-powered matching recommendations
- Advanced analytics dashboard for investors
- API access for enterprise customers
- Second vertical expansion (e.g., Cybersecurity startups)
- Deal pipeline CRM features
- Mobile applications (iOS/Android)

---

## 9. User Flows

### 9.1 Investor Journey

1. **Sign up / Log in**
   - Create account with work email
   - Email verification required

2. **Complete profile**
   - Add firm information
   - Specify investment criteria
   - Admin approval (to verify legitimacy)

3. **Search startups**
   - Apply filters (AI category, stage, location, etc.)
   - Browse ranked results

4. **Review startup profiles**
   - Read company overview, tech details, team
   - Check traction signals and deal-readiness score

5. **Take action**
   - Save to list
   - Add notes
   - Request introduction

6. **Connect with startup**
   - Startup accepts intro request
   - Contact details shared

### 9.2 Startup Journey

1. **Discover profile**
   - Startup finds their company listed on platform
   - Or receives notification from platform

2. **Claim profile**
   - Verify company ownership (email domain verification)
   - Gain edit access

3. **Update information**
   - Edit company description, tech details
   - Add team members
   - Upload pitch deck (optional)

4. **Signal fundraising**
   - Set status: Actively Raising / Open to Conversations / Not Raising
   - Specify target round size (optional)

5. **Browse investors**
   - Filter by stage, check size, sector focus
   - View investor profiles and portfolios

6. **Manage intro requests**
   - Review incoming requests from investors
   - Accept or decline based on fit
   - Email/calendar integration for follow-up

---

## 10. Monetization Strategy

### 10.1 Revenue Model Options

#### Option 1: Investor Subscription Tiers (Recommended for MVP)
- **Free tier**: Limited searches (10/month), basic filters
- **Professional**: $499/month - Unlimited searches, all filters, 50 intro requests/month
- **Enterprise**: $2,000/month - API access, team seats, unlimited intros, analytics

#### Option 2: Per-Introduction Fee
- Charge $50-200 per accepted introduction
- Success-based model (only charge when startup accepts)

#### Option 3: Freemium + Data Licensing
- Free for basic use
- License aggregated, anonymized data to research firms

#### Recommended Approach
- Start with Investor Subscription model
- Keep startup side free to encourage participation
- Consider premium startup features in Phase 2 (e.g., promoted profiles)

### 10.2 Startup Side Monetization (Future)
- Promoted profiles (increased visibility)
- Premium analytics (see who viewed profile)
- Priority support for profile verification
- Advanced matching recommendations

---

## 11. Success Metrics & KPIs

### 11.1 Platform Health Metrics
- Number of verified AI startups in database
- Data completeness score (% of profiles with all fields)
- Data freshness (avg. days since last update)
- Startup profile claim rate

### 11.2 Investor Engagement
- Number of active investor accounts
- Searches per user per month
- Intro requests sent per week
- Conversion: searches → profile views → intro requests
- Retention rate (monthly/quarterly)

### 11.3 Startup Engagement
- % of startups with claimed profiles
- Profile update frequency
- Intro request acceptance rate
- Investor searches by startups

### 11.4 Business Metrics
- Monthly Recurring Revenue (MRR)
- Customer Acquisition Cost (CAC)
- Lifetime Value (LTV)
- Conversion rate: free → paid
- Churn rate

---

## 12. Technical Architecture

### 12.1 System Components

#### Frontend Application
- React-based web application
- Responsive design for desktop and tablet
- Separate views/routes for investors and startups

#### Backend API
- RESTful API (Node.js/Python)
- Authentication and authorization
- Role-based access control (investor vs. startup)

#### Database
- PostgreSQL for structured data
- MongoDB for flexible/semi-structured data
- Redis for caching

#### Data Pipeline
- Scheduled scraping jobs (Apache Airflow)
- Data enrichment processors
- ML classification models
- Quality validation and deduplication

#### Search & Analytics
- Elasticsearch for full-text search
- Analytics tracking (Amplitude/Mixpanel)

### 12.2 Data Model (Simplified)

Key database tables/collections:
- **companies**: Core startup data
- **investors**: Investor firm profiles
- **users**: Platform users (linked to companies or investors)
- **tech_stack**: Technology details per company
- **team_members**: Founder and team data
- **funding_rounds**: Funding history
- **traction_signals**: Hiring, traffic, GitHub metrics
- **intro_requests**: Connection requests between investors and startups
- **saved_lists**: Investor deal lists
- **portfolio_companies**: Investor portfolio data

---

## 13. Risk Mitigation & Open Questions

### 13.1 Key Risks

#### Data Quality Risk
- **Mitigation**: Manual review process, user corrections, quality scoring
- Ongoing monitoring of data accuracy

#### Startup Participation
- **Risk**: Startups don't claim profiles or engage
- **Mitigation**: Outreach campaigns, clear value prop, keep startup side free

#### Investor Trust
- **Risk**: Investors question data reliability
- **Mitigation**: Transparency about data sources, confidence scores, verified tags

#### Competition
- **Risk**: Crunchbase/PitchBook expand AI coverage
- **Mitigation**: Deep AI-specific intelligence, two-sided marketplace model, speed to market

### 13.2 Open Questions

1. What is the optimal pricing for investor subscriptions?
2. Should we offer any paid features to startups, or keep entirely free?
3. How do we incentivize startups to keep profiles updated?
4. Should we manually curate the startup list or allow self-submissions?
5. What's the right balance between data transparency and privacy?
6. How do we prevent spam or low-quality intro requests?
7. Should we offer deal origination as a service (human-powered sourcing)?

---

## 14. Next Steps

1. **Validate assumptions**: Interview 10-15 PE firms and 20-30 AI startups
2. **Finalize MVP scope**: Confirm must-have features and data points
3. **Set up data pipeline**: Begin building scrapers and enrichment tools
4. **Design wireframes**: Create mockups for both investor and startup views
5. **Build MVP**: 3-4 month development timeline
6. **Beta launch**: Invite 20-30 beta users (investors + startups)
7. **Iterate based on feedback**: Refine product and add features
8. **Full launch**: Public release with marketing campaign

---

## Appendix: Key Differentiators vs. Competitors

### vs. Crunchbase
- ✅ AI-specific filters (model type, LLM provider, frameworks)
- ✅ Two-sided marketplace (startups can browse investors)
- ✅ Deal-readiness scoring
- ✅ Direct introduction system

### vs. PitchBook
- ✅ Real-time data updates (not quarterly)
- ✅ Startup engagement (profile claims, updates)
- ✅ Technical depth (GitHub, tech stack analysis)
- ✅ Lower price point for smaller funds

### vs. AngelList
- ✅ Focus on post-seed companies with traction
- ✅ Deep technical intelligence
- ✅ AI-specific categorization
- ✅ Institutional investor focus (not just angels)

---

**End of Document**