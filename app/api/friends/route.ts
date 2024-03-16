import connectDB from "@/lib/mongodb";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const frStatus = searchParams.get("status");

  if (frStatus === null) {
    return new Error("status params is empty");
  }

  await connectDB();
}
