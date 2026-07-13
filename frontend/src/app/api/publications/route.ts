import { NextResponse } from "next/server";
import { getPublications } from "@/lib/api";

export async function GET() {
  try {
    const publications = await getPublications();
    return NextResponse.json(publications);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
