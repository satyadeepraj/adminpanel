"use client";

import { useStore } from "@/store";

export default function AppInitializer({
  user,
  product,
  session,
  allOrders,
  children,
  totalInvestAmount,
  allUsers,
}) {
  useStore.setState({ allOrders });
  useStore.setState({ user });
  useStore.setState({ product });
  useStore.setState({ session });
  useStore.setState({ totalInvestAmount });
  useStore.setState({ allUsers });

  return children;
}
