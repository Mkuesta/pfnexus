"use client";

import { use, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { sampleCompanies } from "@/lib/data/sample-companies";
import { toast } from "sonner";
import {
  ArrowLeft,
  Globe,
  MapPin,
  Users,
  Calendar,
  Building,
  Bookmark,
  Mail,
  ExternalLink,
  TrendingUp,
  Star,
  Github,
  DollarSign,
  CheckCircle,
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function formatCurrency(amount: number | null): string {
  if (!amount) return "N/A";
  if (amount >= 1000000000) return `$${(amount / 1000000000).toFixed(1)}B`;
  if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
  if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
  return `$${amount}`;
}

function formatDate(dateString: string | null): string {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}

export default function CompanyDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  const [introMessage, setIntroMessage] = useState("");
  const [introDialogOpen, setIntroDialogOpen] = useState(false);

  const company = sampleCompanies.find((c) => c.slug === slug);

  if (!company) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Company not found</h1>
        <Link href="/investor/startups">
          <Button>Back to Startups</Button>
        </Link>
      </div>
    );
  }

  const tech = company.company_tech;
  const traction = company.traction_signals;
  const score = company.deal_readiness_scores;
  const latestRound = company.funding_rounds?.[0];

  const handleRequestIntro = () => {
    toast.success("Introduction request sent!", {
      description: `Your request to connect with ${company.name} has been submitted.`,
    });
    setIntroDialogOpen(false);
    setIntroMessage("");
  };

  const handleSave = () => {
    toast.success("Saved to list");
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Back Button */}
      <Link href="/investor/startups" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Startups
      </Link>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
              {company.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold">{company.name}</h1>
              {company.is_claimed && (
                <Badge variant="outline" className="gap-1">
                  <CheckCircle className="h-3 w-3" />
                  Verified
                </Badge>
              )}
            </div>
            <p className="text-lg text-muted-foreground mt-1">{company.tagline}</p>
            <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {company.headquarters_location}
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {company.employee_count} employees
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Founded {company.year_founded}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" onClick={handleSave}>
            <Bookmark className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Dialog open={introDialogOpen} onOpenChange={setIntroDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Mail className="h-4 w-4 mr-2" />
                Request Intro
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Request Introduction</DialogTitle>
                <DialogDescription>
                  Send a personalized message to {company.name}. They will receive your investor profile along with your message.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="message">Your Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Hi, I'm interested in learning more about your company..."
                    value={introMessage}
                    onChange={(e) => setIntroMessage(e.target.value)}
                    rows={5}
                    className="mt-2"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIntroDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleRequestIntro}>Send Request</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          {company.website && (
            <Button variant="outline" asChild>
              <a href={company.website} target="_blank" rel="noopener noreferrer">
                <Globe className="h-4 w-4 mr-2" />
                Website
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </Button>
          )}
        </div>
      </div>

      {/* Deal Readiness Score Card */}
      {score && (
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">Deal Readiness Score</h3>
                <p className="text-sm text-muted-foreground">
                  Based on growth signals, traction, and market momentum
                </p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-primary">{score.overall_score}</div>
                <Badge variant={score.overall_score >= 80 ? "default" : score.overall_score >= 60 ? "secondary" : "outline"}>
                  {score.overall_score >= 80 ? "High" : score.overall_score >= 60 ? "Medium" : "Low"} Likelihood
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="technology">Technology</TabsTrigger>
          <TabsTrigger value="traction">Traction</TabsTrigger>
          <TabsTrigger value="funding">Funding</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{company.description}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Fundraising Status</p>
                  <Badge className={
                    company.fundraising_status === "actively_raising"
                      ? "bg-green-100 text-green-800 hover:bg-green-100 mt-1"
                      : "mt-1"
                  }>
                    {company.fundraising_status === "actively_raising" && "Actively Raising"}
                    {company.fundraising_status === "open" && "Open to Conversations"}
                    {company.fundraising_status === "not_raising" && "Not Currently Raising"}
                  </Badge>
                </div>
                {company.target_raise_amount && (
                  <div>
                    <p className="text-sm text-muted-foreground">Target Raise</p>
                    <p className="font-semibold">{formatCurrency(company.target_raise_amount)}</p>
                  </div>
                )}
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground">AI Categories</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {tech?.ai_category?.map((cat) => (
                      <Badge key={cat} variant="outline" className="text-xs">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Technology Tab */}
        <TabsContent value="technology">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Stack</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Model Architecture</p>
                  <p className="font-medium">{tech?.model_architecture || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">LLM Provider</p>
                  <p className="font-medium">{tech?.llm_provider || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">ML Frameworks</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {tech?.ml_frameworks?.map((fw) => (
                      <Badge key={fw} variant="secondary">{fw}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Vector Database</p>
                  <p className="font-medium">{tech?.vector_database || "N/A"}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Infrastructure</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Cloud Provider</p>
                  <p className="font-medium">{tech?.cloud_provider || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Deployment Type</p>
                  <p className="font-medium">{tech?.deployment_type || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">API Available</p>
                  <Badge variant={tech?.has_api ? "default" : "secondary"}>
                    {tech?.has_api ? "Yes" : "No"}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Compliance</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {tech?.compliance_certifications?.map((cert) => (
                      <Badge key={cert} variant="outline">{cert}</Badge>
                    ))}
                  </div>
                </div>
                {tech?.github_url && (
                  <div>
                    <p className="text-sm text-muted-foreground">GitHub</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Github className="h-4 w-4" />
                      <span className="font-medium">{tech.github_stars?.toLocaleString()} stars</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Traction Tab */}
        <TabsContent value="traction">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Growth Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Traffic</p>
                  <p className="text-2xl font-bold">{traction?.monthly_traffic?.toLocaleString() || "N/A"}</p>
                  {traction?.traffic_growth_6m && (
                    <p className="text-sm text-green-600">+{traction.traffic_growth_6m}% (6 months)</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Hiring Velocity</p>
                  <p className="text-lg font-semibold">{traction?.hiring_velocity || 0} hires/month</p>
                  <p className="text-sm text-muted-foreground">{traction?.open_positions || 0} open positions</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Revenue
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Estimated ARR</p>
                  <p className="text-2xl font-bold">
                    {formatCurrency(traction?.estimated_revenue_min || null)} - {formatCurrency(traction?.estimated_revenue_max || null)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Customer Count</p>
                  <p className="text-lg font-semibold">{traction?.customer_count || "N/A"}</p>
                </div>
                {traction?.notable_customers && traction.notable_customers.length > 0 && (
                  <div>
                    <p className="text-sm text-muted-foreground">Notable Customers</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {traction.notable_customers.map((customer) => (
                        <Badge key={customer} variant="secondary">{customer}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Reviews & Social
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {traction?.g2_rating && (
                  <div>
                    <p className="text-sm text-muted-foreground">G2 Rating</p>
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-2xl font-bold">{traction.g2_rating.toFixed(1)}</span>
                      <span className="text-muted-foreground">({traction.g2_review_count} reviews)</span>
                    </div>
                  </div>
                )}
                <div>
                  <p className="text-sm text-muted-foreground">Press Mentions (6mo)</p>
                  <p className="text-lg font-semibold">{traction?.press_mentions_6m || 0}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Social Following</p>
                  <p className="text-lg font-semibold">{traction?.social_following?.toLocaleString() || "N/A"}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Funding Tab */}
        <TabsContent value="funding">
          <Card>
            <CardHeader>
              <CardTitle>Funding History</CardTitle>
            </CardHeader>
            <CardContent>
              {company.funding_rounds && company.funding_rounds.length > 0 ? (
                <div className="space-y-6">
                  {company.funding_rounds.map((round) => (
                    <div key={round.id} className="border-l-2 border-primary pl-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-lg">{round.round_type}</h4>
                          <p className="text-sm text-muted-foreground">{formatDate(round.date)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">{formatCurrency(round.amount)}</p>
                          {round.valuation && (
                            <p className="text-sm text-muted-foreground">
                              {formatCurrency(round.valuation)} valuation
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="mt-3">
                        <p className="text-sm text-muted-foreground">Lead Investors</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {round.lead_investors?.map((investor) => (
                            <Badge key={investor}>{investor}</Badge>
                          ))}
                        </div>
                      </div>
                      {round.all_investors && round.all_investors.length > (round.lead_investors?.length || 0) && (
                        <div className="mt-2">
                          <p className="text-sm text-muted-foreground">Other Investors</p>
                          <p className="text-sm">
                            {round.all_investors.filter((i) => !round.lead_investors?.includes(i)).join(", ")}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No funding information available</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Team Tab */}
        <TabsContent value="team">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
            </CardHeader>
            <CardContent>
              {company.team_members && company.team_members.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {company.team_members.map((member) => (
                    <div key={member.id} className="flex items-start gap-4 p-4 border rounded-lg">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{member.name}</h4>
                        <p className="text-sm text-muted-foreground">{member.title}</p>
                        {member.is_founder && (
                          <Badge variant="outline" className="mt-1">Founder</Badge>
                        )}
                        {member.bio && (
                          <p className="text-sm mt-2">{member.bio}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No team information available</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
