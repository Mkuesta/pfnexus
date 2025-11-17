"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, FolderOpen, MoreVertical, Trash2, Edit, Download } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import Link from "next/link";

interface SavedList {
  id: string;
  name: string;
  description: string;
  companyCount: number;
  createdAt: string;
}

const sampleLists: SavedList[] = [
  {
    id: "1",
    name: "Series A Prospects",
    description: "High-potential AI startups ready for Series A funding",
    companyCount: 12,
    createdAt: "2024-11-01",
  },
  {
    id: "2",
    name: "NLP Companies",
    description: "Natural language processing focused startups",
    companyCount: 8,
    createdAt: "2024-10-15",
  },
  {
    id: "3",
    name: "Infrastructure Plays",
    description: "MLOps and AI infrastructure companies",
    companyCount: 15,
    createdAt: "2024-10-20",
  },
];

export default function ListsPage() {
  const [lists, setLists] = useState<SavedList[]>(sampleLists);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [newListDescription, setNewListDescription] = useState("");

  const handleCreateList = () => {
    if (!newListName.trim()) {
      toast.error("Please enter a list name");
      return;
    }

    const newList: SavedList = {
      id: Date.now().toString(),
      name: newListName,
      description: newListDescription,
      companyCount: 0,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setLists([newList, ...lists]);
    setCreateDialogOpen(false);
    setNewListName("");
    setNewListDescription("");
    toast.success("List created successfully");
  };

  const handleDeleteList = (listId: string) => {
    setLists(lists.filter((l) => l.id !== listId));
    toast.success("List deleted");
  };

  const handleExportList = (listId: string) => {
    toast.success("Export started", {
      description: "Your CSV file will be ready shortly",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Lists</h1>
          <p className="text-muted-foreground">Organize and track your deal pipeline</p>
        </div>
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create List
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New List</DialogTitle>
              <DialogDescription>
                Create a list to organize and track AI startups
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="name">List Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Series A Prospects"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="description">Description (optional)</Label>
                <Input
                  id="description"
                  placeholder="What is this list for?"
                  value={newListDescription}
                  onChange={(e) => setNewListDescription(e.target.value)}
                  className="mt-2"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateList}>Create List</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {lists.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <FolderOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No lists yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first list to start organizing AI startups
            </p>
            <Button onClick={() => setCreateDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Your First List
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lists.map((list) => (
            <Card key={list.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{list.name}</CardTitle>
                    <CardDescription className="mt-1">{list.description || "No description"}</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Rename
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleExportList(list.id)}>
                        <Download className="h-4 w-4 mr-2" />
                        Export CSV
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteList(list.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">
                    {list.companyCount} {list.companyCount === 1 ? "company" : "companies"}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    Created {new Date(list.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <Link href={`/investor/lists/${list.id}`}>
                  <Button variant="outline" className="w-full mt-4">
                    View List
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
