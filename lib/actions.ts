"use server";
import { cookies } from "next/headers";

export async function getCookieMongodbID() {
  const cookieStore = cookies();

  return cookieStore.get("authorize")?.value;
}

export async function loginAction(formData: FormData) {
  console.log(formData);
}
