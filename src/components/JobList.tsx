import { useState, useMemo } from "react";
import { JobCard } from "./JobCard";
import { FilterBar } from "./FilterBar";
import { useJobsQuery } from "@/hooks/useJobsQuery";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

export function JobList() {
  const { jobs, isLoading, isError, refetch } = useJobsQuery();
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Filter by status
      const statusMatch = statusFilter === "all" || job.status === statusFilter;

      // Filter by date
      const dateMatch = !dateFilter || job.applicationDate.includes(dateFilter);

      return statusMatch && dateMatch;
    });
  }, [jobs, statusFilter, dateFilter]);

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center p-12">
        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
        <span>Loading job applications...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertDescription className="flex flex-col gap-4">
          <p>Failed to load job applications.</p>
          <Button onClick={() => refetch()} variant="outline">
            Try Again
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="w-full">
      <FilterBar
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        dateFilter={dateFilter}
        onDateFilterChange={setDateFilter}
      />

      {filteredJobs.length === 0 ? (
        <div className="text-center p-8 border border-dashed rounded-lg">
          <p className="text-gray-500">No job applications found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredJobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
