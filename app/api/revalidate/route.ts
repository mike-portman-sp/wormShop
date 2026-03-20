import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  const body = await req.json();
  const type = body?.result?._type;
  const slug = body?.result?.slug?.current;

  if (type === "product") {
    revalidatePath("/shop");
    if (slug) revalidatePath(`/shop/${slug}`);
  } else {
    revalidatePath("/");
    if (slug) revalidatePath(`/${slug}`);
  }

  return NextResponse.json({ revalidated: true, type, slug });
}
