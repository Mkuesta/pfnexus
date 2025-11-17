import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Eye, Mail, UserCheck, Edit, Search, ArrowRight, CheckCircle, XCircle, Clock } from "lucide-react";

export default function StartupDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Startup Dashboard</h1>
          <p className="text-muted-foreground">Manage your profile and connect with investors</p>
        </div>
        <Link href="/startup/profile">
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </Link>
      </div>

      {/* Profile Completeness Banner */}
      <Card className="mb-8 bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">Complete Your Profile</h3>
              <p className="text-muted-foreground">
                Your profile is 65% complete. Add more details to attract more investors.
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">65%</div>
              <Badge variant="outline">In Progress</Badge>
            </div>
          </div>
          <div className="mt-4 h-2 bg-primary/20 rounded-full">
            <div className="h-full w-[65%] bg-primary rounded-full" />
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              +23% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Intro Requests</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              3 pending review
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Saved by Investors</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              In 12 different lists
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pending Intro Requests */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Intro Requests</CardTitle>
            <CardDescription>
              Review requests from interested investors
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Sequoia Capital</p>
                <p className="text-sm text-muted-foreground">Series A Focus</p>
                <div className="flex items-center gap-1 mt-1">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">2 hours ago</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <XCircle className="h-4 w-4" />
                </Button>
                <Button size="sm">
                  <CheckCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">a16z</p>
                <p className="text-sm text-muted-foreground">Growth Stage</p>
                <div className="flex items-center gap-1 mt-1">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">1 day ago</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <XCircle className="h-4 w-4" />
                </Button>
                <Button size="sm">
                  <CheckCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Founders Fund</p>
                <p className="text-sm text-muted-foreground">Early Stage</p>
                <div className="flex items-center gap-1 mt-1">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">3 days ago</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <XCircle className="h-4 w-4" />
                </Button>
                <Button size="sm">
                  <CheckCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              View All Requests
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Manage your profile and discover investors
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/startup/profile" className="block">
              <Button variant="outline" className="w-full justify-start">
                <Edit className="mr-2 h-4 w-4" />
                Update Company Profile
              </Button>
            </Link>
            <Link href="/startup/investors" className="block">
              <Button variant="outline" className="w-full justify-start">
                <Search className="mr-2 h-4 w-4" />
                Browse Investors
              </Button>
            </Link>
            <Button variant="outline" className="w-full justify-start">
              <Mail className="mr-2 h-4 w-4" />
              Set Fundraising Status
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Eye className="mr-2 h-4 w-4" />
              View Profile Analytics
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
