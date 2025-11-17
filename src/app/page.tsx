import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Users,
  BarChart3,
  Shield,
  Zap,
  Target,
  TrendingUp,
  Database,
  ArrowRight
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">AI Startup Marketplace</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Log In</Button>
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Badge variant="secondary" className="mb-4">
          Trusted by 500+ Investors and Startups
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Connect with the Best
          <span className="text-primary block">AI Startups & Investors</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          The two-sided marketplace with deep AI-specific intelligence, proprietary deal-readiness scoring,
          and direct introduction system. Unlike traditional databases, we facilitate active connections.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/signup?role=investor">
            <Button size="lg" className="text-lg px-8">
              I&apos;m an Investor
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/signup?role=startup">
            <Button size="lg" variant="outline" className="text-lg px-8">
              I&apos;m a Startup
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose Our Marketplace?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <Search className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Deep AI Intelligence</CardTitle>
              <CardDescription>
                50+ filters including model architecture, LLM providers, frameworks, and deployment types
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <BarChart3 className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Deal-Readiness Scoring</CardTitle>
              <CardDescription>
                Proprietary 0-100 algorithm assessing fundraising likelihood based on growth signals
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Two-Sided Discovery</CardTitle>
              <CardDescription>
                Mutual matching where startups can browse and evaluate potential investors
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Zap className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Direct Introductions</CardTitle>
              <CardDescription>
                Request intros with personalized messages and track connection status
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Target className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Verified Profiles</CardTitle>
              <CardDescription>
                Claimed profiles with user-verified data and confidence scores
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Data Security</CardTitle>
              <CardDescription>
                Enterprise-grade security with role-based access control
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* For Investors Section */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4">For Investors</Badge>
              <h2 className="text-3xl font-bold mb-4">
                Source AI Deals Smarter
              </h2>
              <ul className="space-y-3 text-lg">
                <li className="flex items-start gap-2">
                  <TrendingUp className="h-6 w-6 text-primary mt-1" />
                  <span>Filter by technical specs unavailable elsewhere</span>
                </li>
                <li className="flex items-start gap-2">
                  <TrendingUp className="h-6 w-6 text-primary mt-1" />
                  <span>Track hiring velocity and growth signals</span>
                </li>
                <li className="flex items-start gap-2">
                  <TrendingUp className="h-6 w-6 text-primary mt-1" />
                  <span>Save to custom lists and manage deal pipeline</span>
                </li>
                <li className="flex items-start gap-2">
                  <TrendingUp className="h-6 w-6 text-primary mt-1" />
                  <span>Export data to CSV/Excel for your records</span>
                </li>
              </ul>
              <Link href="/signup?role=investor" className="inline-block mt-6">
                <Button size="lg">Start Discovering Startups</Button>
              </Link>
            </div>
            <Card className="p-6">
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">1,000+</div>
                  <div className="text-muted-foreground">AI Startups</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">50+</div>
                  <div className="text-muted-foreground">Advanced Filters</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">85%</div>
                  <div className="text-muted-foreground">Intro Acceptance Rate</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* For Startups Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Card className="p-6 order-2 md:order-1">
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">500+</div>
                  <div className="text-muted-foreground">Verified Investors</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">$50B+</div>
                  <div className="text-muted-foreground">Capital Available</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">Free</div>
                  <div className="text-muted-foreground">For Startups</div>
                </div>
              </CardContent>
            </Card>
            <div className="order-1 md:order-2">
              <Badge variant="outline" className="mb-4">For Startups</Badge>
              <h2 className="text-3xl font-bold mb-4">
                Get Discovered by the Right Investors
              </h2>
              <ul className="space-y-3 text-lg">
                <li className="flex items-start gap-2">
                  <Target className="h-6 w-6 text-primary mt-1" />
                  <span>Claim and verify your company profile</span>
                </li>
                <li className="flex items-start gap-2">
                  <Target className="h-6 w-6 text-primary mt-1" />
                  <span>Signal fundraising status to attract interest</span>
                </li>
                <li className="flex items-start gap-2">
                  <Target className="h-6 w-6 text-primary mt-1" />
                  <span>Browse investors by stage and check size</span>
                </li>
                <li className="flex items-start gap-2">
                  <Target className="h-6 w-6 text-primary mt-1" />
                  <span>Accept qualified intro requests only</span>
                </li>
              </ul>
              <Link href="/signup?role=startup" className="inline-block mt-6">
                <Button size="lg" variant="outline">Claim Your Profile</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Connect?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join the marketplace that&apos;s changing how investors and AI startups find each other.
          </p>
          <Link href="/signup">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-muted-foreground" />
              <span className="text-muted-foreground">AI Startup Marketplace</span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-foreground">Privacy Policy</Link>
              <Link href="#" className="hover:text-foreground">Terms of Service</Link>
              <Link href="#" className="hover:text-foreground">Contact</Link>
            </div>
            <div className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} AI Startup Marketplace. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
