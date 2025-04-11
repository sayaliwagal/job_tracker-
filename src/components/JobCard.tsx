import { memo } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatusBadge } from "./StatusBadge";
import { Job, JobStatus } from "@/lib/types";
import { useJobsQuery } from "@/hooks/useJobsQuery";

interface JobCardProps {
  job: Job;
}

export const JobCard = memo(function JobCard({ job }: JobCardProps) {
  const { updateJob, deleteJob, isUpdating, isDeleting } = useJobsQuery();

  const handleStatusChange = (newStatus: JobStatus) => {
    if (job._id && newStatus !== job.status) {
      updateJob({ id: job._id,data: { status: newStatus, company: job.company, role: job.role }});
    }
  };

  const handleDelete = () => {
    if (job._id) {
      deleteJob(job._id);
    }
  };

  const formattedDate = new Date(job.applicationDate).toLocaleDateString();

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold">{job.company}</CardTitle>
          <StatusBadge status={job.status} />
        </div>
        <p className="text-md font-medium">{job.role}</p>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>Applied: {formattedDate}</span>
            {job.link && (
              <a
                href={job.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View Job
              </a>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <div>
          <Select
            defaultValue={job.status}
            onValueChange={(value) => handleStatusChange(value as JobStatus)}
            disabled={isUpdating}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Applied">Applied</SelectItem>
              <SelectItem value="Interview">Interview</SelectItem>
              <SelectItem value="Offer">Offer</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          variant="destructive"
          size="sm"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
});
