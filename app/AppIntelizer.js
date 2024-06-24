"use client";

import { useStore } from "@/store";

export default function AppInitializer({
  user,
  session,
  allOrders,
  children,
  totalInvestAmount,
  allUsers,
}) {
  useStore.setState({ allOrders });
  useStore.setState({ user });
  useStore.setState({ session });
  useStore.setState({ totalInvestAmount });
  useStore.setState({ allUsers });

  return children;
}
