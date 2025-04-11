import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Job } from "@/lib/types";
import { fetchJobs, createJob, updateJob, deleteJob } from "@/lib/api";

export function useJobsQuery() {
  const queryClient = useQueryClient();

  // Fetch all jobs
  const jobsQuery = useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
    select: (data: Job[]) => {
      // Sort by application date (newest first)
      return [...data].sort(
        (a, b) =>
          new Date(b.applicationDate).getTime() -
          new Date(a.applicationDate).getTime()
      );
    },
  });

  // Create job mutation
  const createJobMutation = useMutation({
    mutationFn: (newJob: Omit<Job, "_id">) => createJob(newJob),
    onSuccess: () => {
      // Invalidate and refetch jobs query
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });

  // Update job mutation
  const updateJobMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Job> }) =>
      updateJob(id, data),
    onMutate: async ({ id, data }) => {
      // Cancel any outgoing refetches to avoid overwriting optimistic update
      await queryClient.cancelQueries({ queryKey: ["jobs"] });

      // Snapshot the previous value
      const previousJobs = queryClient.getQueryData<Job[]>(["jobs"]);

      // Optimistically update to the new value
      if (previousJobs) {
        queryClient.setQueryData<Job[]>(
          ["jobs"],
          previousJobs.map((job) =>
            job._id === id ? { ...job, ...data } : job
          )
        );
      }

      return { previousJobs };
    },
    onError: (_err, _variables, context) => {
      // If the mutation fails, roll back to the previous value
      if (context?.previousJobs) {
        queryClient.setQueryData<Job[]>(["jobs"], context.previousJobs);
      }
    },
    onSettled: () => {
      // Always refetch after success or error
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });

  // Delete job mutation
  const deleteJobMutation = useMutation({
    mutationFn: (id: string) => deleteJob(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["jobs"] });

      // Snapshot the previous value
      const previousJobs = queryClient.getQueryData<Job[]>(["jobs"]);

      // Optimistically remove the job
      if (previousJobs) {
        queryClient.setQueryData<Job[]>(
          ["jobs"],
          previousJobs.filter((job) => job._id !== id)
        );
      }

      return { previousJobs };
    },
    onError: (_err, _variables, context) => {
      // If the mutation fails, roll back
      if (context?.previousJobs) {
        queryClient.setQueryData<Job[]>(["jobs"], context.previousJobs);
      }
    },
    onSettled: () => {
      // Always refetch after success or error
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });

  return {
    jobs: jobsQuery.data || [],
    isLoading: jobsQuery.isLoading,
    isError: jobsQuery.isError,
    error: jobsQuery.error,
    refetch: jobsQuery.refetch,
    createJob: createJobMutation.mutate,
    isCreating: createJobMutation.isPending,
    updateJob: updateJobMutation.mutate,
    isUpdating: updateJobMutation.isPending,
    deleteJob: deleteJobMutation.mutate,
    isDeleting: deleteJobMutation.isPending,
  };
}
