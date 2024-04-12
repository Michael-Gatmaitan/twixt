"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";



export default function Home() {
  return (
    <main className="flex container flex-col items-center justify-between">
      <div className="flex items-center gap-2">

      </div>
      {/* <ModeToggle /> */}

      <p className="text-2xl">EVERYTHING IS STILL ON GOING TO TESTS LOL</p>

      <Link href="posts/create/">CREATE POST</Link>
      <Link href="posts/">POST</Link>
    </main >
  );
}
