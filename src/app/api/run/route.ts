 
import { NextResponse } from "next/server"

// Proxy to Piston code execution API (no auth required).
// Docs: https://github.com/engineer-man/piston
const PISTON_URL = "https://emkc.org/api/v2/piston/execute"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // Validate minimal shape
    if (!body?.language || !body?.files?.length) {
      return new NextResponse("Missing language or files", { status: 400 })
    }

    const payload = {
      language: body.language as string,
      version: (body.version as string) || "*",
      files: body.files as { name: string; content: string }[],
      stdin: (body.stdin as string) || "",
      args: (body.args as string[]) || [],
      compile_timeout: 10000,
      run_timeout: 10000,
      compile_memory_limit: -1,
      run_memory_limit: -1,
    }

    const res = await fetch(PISTON_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const text = await res.text()
      return new NextResponse(text || "Piston error", { status: res.status })
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (e: unknown) {
    const errorMessage = (e as Error)?.message || "Server error";
    return new NextResponse(errorMessage, { status: 500 })
  }
}
