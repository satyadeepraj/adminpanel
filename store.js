import { create } from "zustand"

export const useStore = create(() => ({
  session : null,
  user : null,
  allOrders:null,
  totalInvestAmount : null,
  allUsers:[],
}));
