
import React, { useState } from "react";
import { fetchUsers, User } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/dashboard/DataTable";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";

const Users = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  const {
    data: userData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users", page, pageSize],
    queryFn: () => fetchUsers(page, pageSize),
  });
  
  const filteredUsers = userData?.data.filter((user) => {
    if (!searchTerm) return true;
    const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
    const email = user.email.toLowerCase();
    const search = searchTerm.toLowerCase();
    return fullName.includes(search) || email.includes(search);
  }) || [];
  
  const userColumns = [
    {
      key: "user",
      header: "User",
      cell: (user: User) => (
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
            <AvatarFallback>{user.first_name[0]}{user.last_name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{`${user.first_name} ${user.last_name}`}</div>
            <div className="text-sm text-muted-foreground hidden sm:block">{user.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: "email",
      header: "Email",
      cell: (user: User) => <span className="hidden md:inline">{user.email}</span>,
    },
    {
      key: "status",
      header: "Status",
      cell: (user: User) => {
        // Simulate some users being active and some being inactive
        const isActive = user.id % 2 === 0;
        return (
          <Badge variant={isActive ? "default" : "secondary"}>
            {isActive ? "Active" : "Inactive"}
          </Badge>
        );
      },
    },
    {
      key: "actions",
      header: "Actions",
      cell: (user: User) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSelectedUser(user)}
        >
          View
        </Button>
      ),
    },
  ];

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h2 className="text-xl font-bold text-destructive mb-2">Error loading users</h2>
        <p className="text-muted-foreground">Please try again later</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
        <p className="text-muted-foreground">Manage your system users</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>A list of all users in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={userColumns}
            data={filteredUsers}
            isLoading={isLoading}
            totalItems={userData?.total || 0}
            currentPage={page}
            pageSize={pageSize}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
            onSearch={setSearchTerm}
            searchPlaceholder="Search users..."
            keyField="id"
          />
        </CardContent>
      </Card>
      
      {/* User details dialog */}
      <Dialog open={!!selectedUser} onOpenChange={(open) => !open && setSelectedUser(null)}>
        {selectedUser && (
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>User Details</DialogTitle>
              <DialogDescription>
                Detailed information about the user
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center py-4">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={selectedUser.avatar} alt={`${selectedUser.first_name} ${selectedUser.last_name}`} />
                <AvatarFallback className="text-3xl">{selectedUser.first_name[0]}{selectedUser.last_name[0]}</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-bold">{`${selectedUser.first_name} ${selectedUser.last_name}`}</h3>
              <p className="text-muted-foreground">{selectedUser.email}</p>
              
              <div className="grid grid-cols-2 gap-4 w-full mt-6">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">ID</p>
                  <p className="font-medium">#{selectedUser.id}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge variant={selectedUser.id % 2 === 0 ? "default" : "secondary"}>
                    {selectedUser.id % 2 === 0 ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedUser(null)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default Users;
