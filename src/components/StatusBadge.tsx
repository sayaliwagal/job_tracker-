import { Badge } from "@/components/ui/badge";
import { JobStatus } from "@/lib/types";

interface StatusBadgeProps {
  status: JobStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getVariant = () => {
    switch (status) {
      case "Applied":
        return "secondary";
      case "Interview":
        return "default";
      case "Offer":
        return "success";
      case "Rejected":
        return "destructive";
      default:
        return "outline";
    }
  };

  return <Badge variant={getVariant() as any}>{status}</Badge>;
}
