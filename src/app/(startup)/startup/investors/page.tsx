"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search, Building, DollarSign, MapPin, Target } from "lucide-react";
import { useState } from "react";

interface InvestorFirm {
  id: string;
  name: string;
  firmType: string;
  description: string;
  stages: string[];
  checkSizeMin: number;
  checkSizeMax: number;
  aiCategories: string[];
  locations: string[];
  recentInvestments: number;
}

const sampleInvestors: InvestorFirm[] = [
  {
    id: "1",
    name: "Sequoia Capital",
    firmType: "Venture Capital",
    description: "We help daring founders build legendary companies. Focused on AI infrastructure and applications.",
    stages: ["Seed", "Series A", "Series B"],
    checkSizeMin: 500000,
    checkSizeMax: 50000000,
    aiCategories: ["Generative AI", "MLOps", "Enterprise AI"],
    locations: ["Menlo Park, CA"],
    recentInvestments: 45,
  },
  {
    id: "2",
    name: "Andreessen Horowitz",
    firmType: "Venture Capital",
    description: "Software is eating the world. We back bold entrepreneurs building the future of AI.",
    stages: ["Seed", "Series A", "Series B", "Growth"],
    checkSizeMin: 1000000,
    checkSizeMax: 100000000,
    aiCategories: ["Generative AI", "NLP", "Computer Vision", "AI Agents"],
    locations: ["Menlo Park, CA", "San Francisco, CA"],
    recentInvestments: 62,
  },
  {
    id: "3",
    name: "Founders Fund",
    firmType: "Venture Capital",
    description: "We invest in revolutionary companies. AI that solves real problems.",
    stages: ["Seed", "Series A"],
    checkSizeMin: 250000,
    checkSizeMax: 25000000,
    aiCategories: ["AI Agents", "Code Generation", "Vector Databases"],
    locations: ["San Francisco, CA"],
    recentInvestments: 28,
  },
  {
    id: "4",
    name: "Greylock Partners",
    firmType: "Venture Capital",
    description: "Enterprise software and AI infrastructure investors. Long-term partners for ambitious founders.",
    stages: ["Series A", "Series B"],
    checkSizeMin: 5000000,
    checkSizeMax: 75000000,
    aiCategories: ["Enterprise AI", "MLOps", "Data Labeling"],
    locations: ["Menlo Park, CA", "Boston, MA"],
    recentInvestments: 35,
  },
];

function formatCurrency(amount: number): string {
  if (amount >= 1000000) return `$${(amount / 1000000).toFixed(0)}M`;
  if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
  return `$${amount}`;
}

export default function InvestorsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredInvestors = sampleInvestors.filter((investor) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      investor.name.toLowerCase().includes(query) ||
      investor.description.toLowerCase().includes(query) ||
      investor.aiCategories.some((cat) => cat.toLowerCase().includes(query))
    );
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Browse Investors</h1>
        <p className="text-muted-foreground">
          Find investors that match your stage and sector
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-xl mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name, focus area, or AI category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredInvestors.map((investor) => (
          <Card key={investor.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {investor.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-xl">{investor.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <Building className="h-4 w-4" />
                    {investor.firmType}
                  </CardDescription>
                </div>
                <Badge variant="secondary">
                  {investor.recentInvestments} recent deals
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{investor.description}</p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Target className="h-4 w-4" />
                    <span className="font-medium">Stage Focus</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {investor.stages.map((stage) => (
                      <Badge key={stage} variant="outline" className="text-xs">
                        {stage}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <DollarSign className="h-4 w-4" />
                    <span className="font-medium">Check Size</span>
                  </div>
                  <p>
                    {formatCurrency(investor.checkSizeMin)} - {formatCurrency(investor.checkSizeMax)}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">AI Focus Areas</p>
                <div className="flex flex-wrap gap-1">
                  {investor.aiCategories.map((category) => (
                    <Badge key={category} variant="secondary" className="text-xs">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {investor.locations.join(", ")}
              </div>

              <Button variant="outline" className="w-full">
                View Full Profile
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredInvestors.length === 0 && (
        <div className="text-center py-12">
          <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No investors found</h3>
          <p className="text-muted-foreground">Try adjusting your search terms</p>
        </div>
      )}
    </div>
  );
}
