"use client";

import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { RotateCcw } from "lucide-react";

export interface FilterState {
  aiCategories: string[];
  minScore: number;
  maxScore: number;
  fundingStatus: string[];
  llmProviders: string[];
  cloudProviders: string[];
  minEmployees: number;
  maxEmployees: number;
}

interface StartupFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
}

const AI_CATEGORIES = [
  "Generative AI",
  "NLP",
  "Computer Vision",
  "MLOps",
  "Vector Databases",
  "AI Agents",
  "Code Generation",
  "Data Labeling",
  "Search",
  "Enterprise AI",
];

const LLM_PROVIDERS = ["OpenAI", "Anthropic", "Google", "Meta", "Cohere"];

const CLOUD_PROVIDERS = ["AWS", "GCP", "Azure"];

export function StartupFilters({ filters, onFilterChange, onReset }: StartupFiltersProps) {
  const handleCategoryToggle = (category: string) => {
    const newCategories = filters.aiCategories.includes(category)
      ? filters.aiCategories.filter((c) => c !== category)
      : [...filters.aiCategories, category];
    onFilterChange({ ...filters, aiCategories: newCategories });
  };

  const handleFundingStatusToggle = (status: string) => {
    const newStatuses = filters.fundingStatus.includes(status)
      ? filters.fundingStatus.filter((s) => s !== status)
      : [...filters.fundingStatus, status];
    onFilterChange({ ...filters, fundingStatus: newStatuses });
  };

  const handleLLMProviderToggle = (provider: string) => {
    const newProviders = filters.llmProviders.includes(provider)
      ? filters.llmProviders.filter((p) => p !== provider)
      : [...filters.llmProviders, provider];
    onFilterChange({ ...filters, llmProviders: newProviders });
  };

  const handleCloudProviderToggle = (provider: string) => {
    const newProviders = filters.cloudProviders.includes(provider)
      ? filters.cloudProviders.filter((p) => p !== provider)
      : [...filters.cloudProviders, provider];
    onFilterChange({ ...filters, cloudProviders: newProviders });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Filters</h3>
        <Button variant="ghost" size="sm" onClick={onReset}>
          <RotateCcw className="h-4 w-4 mr-1" />
          Reset
        </Button>
      </div>

      <Separator />

      {/* Deal Readiness Score */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Deal Readiness Score</Label>
        <Select
          value={filters.minScore.toString()}
          onValueChange={(value) =>
            onFilterChange({ ...filters, minScore: parseInt(value) })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Any score" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Any score</SelectItem>
            <SelectItem value="80">80+ (High)</SelectItem>
            <SelectItem value="60">60+ (Medium)</SelectItem>
            <SelectItem value="40">40+ (Low)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* AI Category */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">AI Category</Label>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {AI_CATEGORIES.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`cat-${category}`}
                checked={filters.aiCategories.includes(category)}
                onCheckedChange={() => handleCategoryToggle(category)}
              />
              <label
                htmlFor={`cat-${category}`}
                className="text-sm leading-none cursor-pointer"
              >
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Fundraising Status */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Fundraising Status</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="status-raising"
              checked={filters.fundingStatus.includes("actively_raising")}
              onCheckedChange={() => handleFundingStatusToggle("actively_raising")}
            />
            <label htmlFor="status-raising" className="text-sm cursor-pointer">
              Actively Raising
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="status-open"
              checked={filters.fundingStatus.includes("open")}
              onCheckedChange={() => handleFundingStatusToggle("open")}
            />
            <label htmlFor="status-open" className="text-sm cursor-pointer">
              Open to Conversations
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="status-not"
              checked={filters.fundingStatus.includes("not_raising")}
              onCheckedChange={() => handleFundingStatusToggle("not_raising")}
            />
            <label htmlFor="status-not" className="text-sm cursor-pointer">
              Not Currently Raising
            </label>
          </div>
        </div>
      </div>

      <Separator />

      {/* Team Size */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Team Size</Label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label className="text-xs text-muted-foreground">Min</Label>
            <Input
              type="number"
              placeholder="0"
              value={filters.minEmployees || ""}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  minEmployees: parseInt(e.target.value) || 0,
                })
              }
              className="h-8"
            />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Max</Label>
            <Input
              type="number"
              placeholder="Any"
              value={filters.maxEmployees || ""}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  maxEmployees: parseInt(e.target.value) || 10000,
                })
              }
              className="h-8"
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* LLM Provider */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">LLM Provider</Label>
        <div className="space-y-2">
          {LLM_PROVIDERS.map((provider) => (
            <div key={provider} className="flex items-center space-x-2">
              <Checkbox
                id={`llm-${provider}`}
                checked={filters.llmProviders.includes(provider)}
                onCheckedChange={() => handleLLMProviderToggle(provider)}
              />
              <label
                htmlFor={`llm-${provider}`}
                className="text-sm cursor-pointer"
              >
                {provider}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Cloud Provider */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Cloud Provider</Label>
        <div className="space-y-2">
          {CLOUD_PROVIDERS.map((provider) => (
            <div key={provider} className="flex items-center space-x-2">
              <Checkbox
                id={`cloud-${provider}`}
                checked={filters.cloudProviders.includes(provider)}
                onCheckedChange={() => handleCloudProviderToggle(provider)}
              />
              <label
                htmlFor={`cloud-${provider}`}
                className="text-sm cursor-pointer"
              >
                {provider}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
