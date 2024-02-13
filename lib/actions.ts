"use server";
import { cookies } from "next/headers";

export async function getCookieMongodbID() {
  const cookieStore = cookies();

  return cookieStore.get("mongodbid")?.value;
}
