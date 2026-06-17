import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import type { PortfolioData } from "../types";

interface ProfileGuardProps {
  data: PortfolioData;
  children: React.ReactNode;
}

export default function ProfileGuard({ data, children }: ProfileGuardProps) {
  const navigate = useNavigate();
  const isComplete = data.name && data.title && data.email;
  const toastShown = useRef(false);

  useEffect(() => {
    if (!isComplete && !toastShown.current) {
      toastShown.current = true;
      toast.error("Please complete your profile first");
      navigate("/create", { replace: true });
    }
  }, [isComplete, navigate]);

  if (!isComplete) return null;

  return <>{children}</>;
}
