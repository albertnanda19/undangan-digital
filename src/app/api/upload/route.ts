import { NextResponse } from "next/server";
import { uploadImage } from "@/lib/cloudinary";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "undangan-digital";

    if (!file) {
      return NextResponse.json({ data: null, error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    const result = await uploadImage(base64, folder);
    return NextResponse.json({ data: result, error: null });
  } catch (err) {
    return NextResponse.json(
      { data: null, error: err instanceof Error ? err.message : "Upload failed" },
      { status: 500 }
    );
  }
}
