"use client";

import { useEffect, useState } from "react";
import {
  AccountStatus,
  getStripeConnectAccountStatus,
} from "@/actions/getStripeConnectAccountStatus";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { createStripeConnectLoginLink } from "@/actions/createStripeConnectLoginLink";

const SellerDashboard = () => {
  const [accountCreatePending, setAccountCreatePending] = useState(false);
  const [accountLinkCreatePending, setAccountLinkCreatePending] =
    useState(false);
  const [error, setError] = useState(false);
  const [accountStatus, setAccountStatus] = useState<AccountStatus | null>(
    null,
  );

  const router = useRouter();
  const { user } = useUser();
  const stripeConnectId = useQuery(api.users.getUsersStripeConnectId, {
    userId: user?.id || "",
  });

  const isReadyToAcceptPayments =
    accountStatus?.isActive && accountStatus?.payoutsEnabled;

  const handleManageAccount = async () => {
    try {
      if (stripeConnectId && accountStatus?.isActive) {
        const loginUrl = await createStripeConnectLoginLink(stripeConnectId);
        window.location.href = loginUrl;
      }
    } catch (error) {
      console.error("Error accessing Stripe Connect portal: ", error);
      setError(true);
    }
  };

  const fetchAccountStatus = async () => {
    if (stripeConnectId) {
      try {
        const status = await getStripeConnectAccountStatus(stripeConnectId);
        setAccountStatus(status);
      } catch (error) {
        console.error("Error fetching account status: ", error);
      }
    }
  };

  useEffect(() => {
    if (stripeConnectId) {
      fetchAccountStatus();
    }
  }, [stripeConnectId]);

  return <div>seller dashboard</div>;
};

export default SellerDashboard;
