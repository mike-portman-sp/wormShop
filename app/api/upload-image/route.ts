import { createClient } from "next-sanity";
import { NextRequest, NextResponse } from "next/server";

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "v2025-12-20",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const asset = await writeClient.assets.upload("image", buffer, {
    filename: file.name,
    contentType: file.type,
  });

  return NextResponse.json({ ref: asset._id });
}
