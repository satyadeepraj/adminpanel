"use server";
import { revalidatePath } from "next/cache";


export async function revalidation() {
    revalidatePath("/", "layout");
  }
  