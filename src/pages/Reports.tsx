
import React, { useState } from "react";
import { fetchResources } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/dashboard/DataTable";

interface Resource {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}

const Reports = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: resourceData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["resources", page, pageSize],
    queryFn: () => fetchResources(page, pageSize),
  });

  const filteredResources = resourceData?.data.filter((resource) => {
    if (!searchTerm) return true;
    const name = resource.name.toLowerCase();
    const pantoneValue = resource.pantone_value.toLowerCase();
    const search = searchTerm.toLowerCase();
    return name.includes(search) || pantoneValue.includes(search);
  }) || [];

  const resourceColumns = [
    {
      key: "color",
      header: "Color",
      cell: (resource: Resource) => (
        <div className="flex items-center gap-3">
          <div
            className="h-6 w-6 rounded-md"
            style={{ backgroundColor: resource.color }}
          />
          <div>
            <div className="font-medium">{resource.name}</div>
            <div className="text-sm text-muted-foreground">
              {resource.pantone_value}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "year",
      header: "Year",
      cell: (resource: Resource) => <span>{resource.year}</span>,
    },
    {
      key: "hex",
      header: "Hex Value",
      cell: (resource: Resource) => <span>{resource.color}</span>,
    },
    {
      key: "pantone",
      header: "Pantone",
      cell: (resource: Resource) => (
        <span className="hidden md:inline">{resource.pantone_value}</span>
      ),
    },
  ];

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h2 className="text-xl font-bold text-destructive mb-2">
          Error loading reports
        </h2>
        <p className="text-muted-foreground">Please try again later</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground">
          View and analyze system resources
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resource Report</CardTitle>
          <CardDescription>Overview of available resources</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={resourceColumns}
            data={filteredResources}
            isLoading={isLoading}
            totalItems={resourceData?.total || 0}
            currentPage={page}
            pageSize={pageSize}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
            onSearch={setSearchTerm}
            searchPlaceholder="Search resources..."
            keyField="id"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
