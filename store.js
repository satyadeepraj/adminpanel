import { create } from "zustand"

export const useStore = create(() => ({
  session : null,
  user : null,
  product: null,
  allOrders:null,
  totalInvestAmount : null,
  allUsers:[],
}));
