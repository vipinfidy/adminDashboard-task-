
import React, { useEffect, useState } from "react";
import { fetchUsers, fetchResources, User, Resource } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import StatsCard from "@/components/dashboard/StatsCard";
import { DataTable } from "@/components/dashboard/DataTable";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users, Database, Calendar, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  const [userPage, setUserPage] = useState(1);
  const [userPageSize, setUserPageSize] = useState(5);
  
  const {
    data: userData,
    isLoading: isLoadingUsers,
    error: userError,
    refetch: refetchUsers,
  } = useQuery({
    queryKey: ["users", userPage, userPageSize],
    queryFn: () => fetchUsers(userPage, userPageSize),
  });

  const {
    data: resourcesData,
    isLoading: isLoadingResources,
  } = useQuery({
    queryKey: ["resources"],
    queryFn: () => fetchResources(1, 10),
  });

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
            <div className="text-sm text-muted-foreground">{user.email}</div>
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
      key: "id",
      header: "ID",
      cell: (user: User) => <span className="text-muted-foreground">#{user.id}</span>,
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
  ];

  const resourceChartData = resourcesData?.data.slice(0, 5).map(resource => ({
    name: resource.name,
    value: resource.year,
    color: resource.color,
  }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your admin dashboard</p>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Users"
          value={userData?.total || "—"}
          icon={<Users className="h-5 w-5" />}
          description="Total registered users"
          trend={{ value: 12, isPositive: true }}
          isLoading={isLoadingUsers}
        />
        <StatsCard
          title="Active Users"
          value={userData ? Math.floor(userData.total / 2) : "—"}
          icon={<Users className="h-5 w-5" />}
          description="Currently active users"
          trend={{ value: 8.5, isPositive: true }}
          isLoading={isLoadingUsers}
        />
        <StatsCard
          title="Resources"
          value={resourcesData?.total || "—"}
          icon={<Database className="h-5 w-5" />}
          description="Available resources"
          isLoading={isLoadingResources}
        />
        <StatsCard
          title="Last Updated"
          value="Today"
          icon={<Calendar className="h-5 w-5" />}
          description="Last system activity"
        />
      </div>

      {/* Recent users */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
            <CardDescription>List of recently added users to the system</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={userColumns}
              data={userData?.data || []}
              isLoading={isLoadingUsers}
              totalItems={userData?.total || 0}
              currentPage={userPage}
              pageSize={userPageSize}
              onPageChange={setUserPage}
              onPageSizeChange={setUserPageSize}
              onSearch={() => {}}
              keyField="id"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resources</CardTitle>
            <CardDescription>Available system resources</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingResources ? (
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-8 bg-muted animate-pulse-slow rounded-md" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {resourcesData?.data.slice(0, 5).map((resource) => (
                  <div key={resource.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-4 w-4 rounded-full"
                        style={{ backgroundColor: resource.color }}
                      />
                      <span className="font-medium">{resource.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Year: {resource.year}
                    </span>
                  </div>
                ))}
                <a 
                  href="/reports" 
                  className="text-sm text-primary flex items-center hover:underline mt-4"
                >
                  View all resources
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
