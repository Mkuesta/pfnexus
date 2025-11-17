"use client";

import Link from "next/link";
import { CompanyWithDetails } from "@/lib/types/database";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Building,
  MapPin,
  Calendar,
  Users,
  Bookmark,
  TrendingUp,
  Star
} from "lucide-react";

interface CompanyCardProps {
  company: CompanyWithDetails;
  onSave?: (companyId: string) => void;
}

function getScoreVariant(score: number): "default" | "secondary" | "outline" {
  if (score >= 80) return "default";
  if (score >= 60) return "secondary";
  return "outline";
}

function getScoreLabel(score: number): string {
  if (score >= 80) return "High";
  if (score >= 60) return "Medium";
  return "Low";
}

function formatRevenue(min: number | null, max: number | null): string {
  if (!min && !max) return "N/A";
  const formatNum = (n: number) => {
    if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `$${(n / 1000).toFixed(0)}K`;
    return `$${n}`;
  };
  if (min && max) return `${formatNum(min)} - ${formatNum(max)}`;
  if (min) return `${formatNum(min)}+`;
  return `Up to ${formatNum(max!)}`;
}

export function CompanyCard({ company, onSave }: CompanyCardProps) {
  const score = company.deal_readiness_scores?.overall_score || 0;
  const tech = company.company_tech;
  const traction = company.traction_signals;

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {company.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <Link
                href={`/investor/startups/${company.slug}`}
                className="font-semibold text-lg hover:text-primary transition-colors"
              >
                {company.name}
              </Link>
              <p className="text-sm text-muted-foreground line-clamp-1">
                {company.tagline || "AI Startup"}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Badge variant={getScoreVariant(score)} className="font-mono">
              {score}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {getScoreLabel(score)} Score
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        {/* AI Categories */}
        <div className="flex flex-wrap gap-1.5">
          {tech?.ai_category?.slice(0, 3).map((category) => (
            <Badge key={category} variant="outline" className="text-xs">
              {category}
            </Badge>
          ))}
          {(tech?.ai_category?.length || 0) > 3 && (
            <Badge variant="outline" className="text-xs">
              +{tech!.ai_category!.length - 3}
            </Badge>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {company.description}
        </p>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{company.employee_count || "N/A"} employees</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="truncate">{company.headquarters_location || "N/A"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Founded {company.year_founded || "N/A"}</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <span className="truncate">
              {formatRevenue(
                traction?.estimated_revenue_min || null,
                traction?.estimated_revenue_max || null
              )}
            </span>
          </div>
        </div>

        {/* Traction Highlights */}
        {traction && (
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            {traction.hiring_velocity && traction.hiring_velocity > 0 && (
              <div className="flex items-center gap-1">
                <Building className="h-3 w-3" />
                <span>+{traction.hiring_velocity} hires/mo</span>
              </div>
            )}
            {traction.g2_rating && (
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span>{traction.g2_rating.toFixed(1)} ({traction.g2_review_count})</span>
              </div>
            )}
          </div>
        )}

        {/* Fundraising Status */}
        {company.fundraising_status === "actively_raising" && (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Actively Raising
          </Badge>
        )}
        {company.fundraising_status === "open" && (
          <Badge variant="secondary">
            Open to Conversations
          </Badge>
        )}
      </CardContent>

      <CardFooter className="pt-4 flex gap-2">
        <Link href={`/investor/startups/${company.slug}`} className="flex-1">
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onSave?.(company.id)}
          title="Save to list"
        >
          <Bookmark className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
