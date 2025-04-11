import { useState } from "react";

interface Toast {
  title: string;
  description: string;
  variant?: "default" | "destructive";
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = (props: Toast) => {
    setToasts((prev) => [...prev, props]);
    // Auto remove toast after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t !== props));
    }, 3000);
  };

  return { toast, toasts };
}
