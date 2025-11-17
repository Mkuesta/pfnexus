"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Save, Building, Code, TrendingUp } from "lucide-react";
import { toast } from "sonner";

export default function StartupProfilePage() {
  const [saving, setSaving] = useState(false);

  // Form state
  const [companyName, setCompanyName] = useState("My AI Startup");
  const [tagline, setTagline] = useState("Building the future of AI");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");
  const [yearFounded, setYearFounded] = useState("");
  const [employeeCount, setEmployeeCount] = useState("");
  const [fundraisingStatus, setFundraisingStatus] = useState("not_raising");
  const [targetRaise, setTargetRaise] = useState("");

  // Tech stack
  const [aiCategories, setAiCategories] = useState<string[]>([]);
  const [llmProvider, setLlmProvider] = useState("");
  const [cloudProvider, setCloudProvider] = useState("");

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
    toast.success("Profile saved successfully");
  };

  const toggleCategory = (category: string) => {
    setAiCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const categories = [
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

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Company Profile</h1>
          <p className="text-muted-foreground">
            Keep your profile updated to attract the right investors
          </p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic" className="gap-2">
            <Building className="h-4 w-4" />
            Basic Info
          </TabsTrigger>
          <TabsTrigger value="tech" className="gap-2">
            <Code className="h-4 w-4" />
            Technology
          </TabsTrigger>
          <TabsTrigger value="fundraising" className="gap-2">
            <TrendingUp className="h-4 w-4" />
            Fundraising
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Core details about your company
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Company Name</Label>
                  <Input
                    id="name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="tagline">Tagline</Label>
                <Input
                  id="tagline"
                  placeholder="One sentence about your company"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="description">Company Description</Label>
                <Textarea
                  id="description"
                  placeholder="Tell investors about your company, product, and vision..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  className="mt-2"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="location">Headquarters Location</Label>
                  <Input
                    id="location"
                    placeholder="City, State"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="founded">Year Founded</Label>
                  <Input
                    id="founded"
                    type="number"
                    placeholder="2023"
                    value={yearFounded}
                    onChange={(e) => setYearFounded(e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="employees">Employee Count</Label>
                  <Input
                    id="employees"
                    type="number"
                    placeholder="25"
                    value={employeeCount}
                    onChange={(e) => setEmployeeCount(e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tech">
          <Card>
            <CardHeader>
              <CardTitle>Technology Stack</CardTitle>
              <CardDescription>
                Help investors understand your technical capabilities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>AI Categories (select all that apply)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={category}
                        checked={aiCategories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                      />
                      <label htmlFor={category} className="text-sm cursor-pointer">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="llm">Primary LLM Provider</Label>
                  <Select value={llmProvider} onValueChange={setLlmProvider}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="openai">OpenAI</SelectItem>
                      <SelectItem value="anthropic">Anthropic</SelectItem>
                      <SelectItem value="google">Google</SelectItem>
                      <SelectItem value="meta">Meta</SelectItem>
                      <SelectItem value="opensource">Open Source</SelectItem>
                      <SelectItem value="proprietary">Proprietary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="cloud">Cloud Provider</Label>
                  <Select value={cloudProvider} onValueChange={setCloudProvider}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aws">AWS</SelectItem>
                      <SelectItem value="gcp">Google Cloud</SelectItem>
                      <SelectItem value="azure">Azure</SelectItem>
                      <SelectItem value="multi">Multi-cloud</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fundraising">
          <Card>
            <CardHeader>
              <CardTitle>Fundraising Status</CardTitle>
              <CardDescription>
                Signal your fundraising intentions to attract relevant investors
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Current Status</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                  <Card
                    className={`cursor-pointer transition-all ${
                      fundraisingStatus === "actively_raising"
                        ? "border-primary bg-primary/5"
                        : "hover:border-primary/50"
                    }`}
                    onClick={() => setFundraisingStatus("actively_raising")}
                  >
                    <CardContent className="pt-6 text-center">
                      <Badge className="bg-green-100 text-green-800 mb-2">Active</Badge>
                      <h4 className="font-semibold">Actively Raising</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Currently seeking investment
                      </p>
                    </CardContent>
                  </Card>
                  <Card
                    className={`cursor-pointer transition-all ${
                      fundraisingStatus === "open"
                        ? "border-primary bg-primary/5"
                        : "hover:border-primary/50"
                    }`}
                    onClick={() => setFundraisingStatus("open")}
                  >
                    <CardContent className="pt-6 text-center">
                      <Badge variant="secondary" className="mb-2">Open</Badge>
                      <h4 className="font-semibold">Open to Conversations</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Not actively raising but open
                      </p>
                    </CardContent>
                  </Card>
                  <Card
                    className={`cursor-pointer transition-all ${
                      fundraisingStatus === "not_raising"
                        ? "border-primary bg-primary/5"
                        : "hover:border-primary/50"
                    }`}
                    onClick={() => setFundraisingStatus("not_raising")}
                  >
                    <CardContent className="pt-6 text-center">
                      <Badge variant="outline" className="mb-2">Closed</Badge>
                      <h4 className="font-semibold">Not Currently Raising</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Not seeking investment now
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {fundraisingStatus === "actively_raising" && (
                <div>
                  <Label htmlFor="target">Target Raise Amount</Label>
                  <Input
                    id="target"
                    type="number"
                    placeholder="10000000"
                    value={targetRaise}
                    onChange={(e) => setTargetRaise(e.target.value)}
                    className="mt-2"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Enter amount in USD (e.g., 10000000 for $10M)
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
