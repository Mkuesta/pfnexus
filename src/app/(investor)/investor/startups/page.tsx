"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CompanyCard } from "@/components/investor/company-card";
import { StartupFilters, FilterState } from "@/components/investor/startup-filters";
import { sampleCompanies } from "@/lib/data/sample-companies";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { toast } from "sonner";

const initialFilters: FilterState = {
  aiCategories: [],
  minScore: 0,
  maxScore: 100,
  fundingStatus: [],
  llmProviders: [],
  cloudProviders: [],
  minEmployees: 0,
  maxEmployees: 10000,
};

export default function StartupsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredCompanies = useMemo(() => {
    return sampleCompanies.filter((company) => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          company.name.toLowerCase().includes(query) ||
          company.description?.toLowerCase().includes(query) ||
          company.tagline?.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Deal readiness score filter
      const score = company.deal_readiness_scores?.overall_score || 0;
      if (score < filters.minScore) return false;

      // AI category filter
      if (filters.aiCategories.length > 0) {
        const companyCategories = company.company_tech?.ai_category || [];
        const hasMatchingCategory = filters.aiCategories.some((cat) =>
          companyCategories.includes(cat)
        );
        if (!hasMatchingCategory) return false;
      }

      // Fundraising status filter
      if (filters.fundingStatus.length > 0) {
        if (!filters.fundingStatus.includes(company.fundraising_status)) {
          return false;
        }
      }

      // LLM provider filter
      if (filters.llmProviders.length > 0) {
        const llmProvider = company.company_tech?.llm_provider;
        if (!llmProvider || !filters.llmProviders.includes(llmProvider)) {
          return false;
        }
      }

      // Cloud provider filter
      if (filters.cloudProviders.length > 0) {
        const cloudProvider = company.company_tech?.cloud_provider;
        if (!cloudProvider || !filters.cloudProviders.includes(cloudProvider)) {
          return false;
        }
      }

      // Employee count filter
      const employeeCount = company.employee_count || 0;
      if (employeeCount < filters.minEmployees) return false;
      if (filters.maxEmployees < 10000 && employeeCount > filters.maxEmployees) {
        return false;
      }

      return true;
    });
  }, [searchQuery, filters]);

  const handleSave = (companyId: string) => {
    toast.success("Company saved to list");
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
    toast.info("Filters reset");
  };

  const activeFilterCount =
    filters.aiCategories.length +
    filters.fundingStatus.length +
    filters.llmProviders.length +
    filters.cloudProviders.length +
    (filters.minScore > 0 ? 1 : 0) +
    (filters.minEmployees > 0 ? 1 : 0) +
    (filters.maxEmployees < 10000 ? 1 : 0);

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Desktop Sidebar Filters */}
      <aside className="hidden lg:block w-72 border-r bg-muted/30 p-4 overflow-y-auto">
        <StartupFilters
          filters={filters}
          onFilterChange={setFilters}
          onReset={handleResetFilters}
        />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Search and Mobile Filter Toggle */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search startups by name, description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Mobile Filter Button */}
          <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="ml-2 bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 overflow-y-auto">
              <StartupFilters
                filters={filters}
                onFilterChange={setFilters}
                onReset={handleResetFilters}
              />
            </SheetContent>
          </Sheet>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-medium text-foreground">
              {filteredCompanies.length}
            </span>{" "}
            {filteredCompanies.length === 1 ? "startup" : "startups"}
            {activeFilterCount > 0 && (
              <span className="ml-1">
                ({activeFilterCount} filter{activeFilterCount !== 1 ? "s" : ""}{" "}
                applied)
              </span>
            )}
          </p>
          {activeFilterCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetFilters}
              className="text-xs"
            >
              Clear all filters
            </Button>
          )}
        </div>

        {/* Results Grid */}
        {filteredCompanies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCompanies.map((company) => (
              <CompanyCard
                key={company.id}
                company={company}
                onSave={handleSave}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No startups found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters or search terms
            </p>
            <Button variant="outline" onClick={handleResetFilters}>
              Reset Filters
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
