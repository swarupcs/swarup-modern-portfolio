import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
// import CodingPlayground from "@/components/coding-playground"
// import MultiLanguageRunner from "@/components/multi-language-runner"

export default function PlaygroundProjectPage() {
  return (
    <main className="min-h-screen pt-28">
      <section className="px-4 md:px-6">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Interactive Playground</h1>
            <p className="mt-2 max-w-3xl text-muted-foreground">
              Try ideas quickly. Use the HTML/CSS/JS sandbox or run code in multiple languages (JavaScript, C, C++,
              Java, Go).
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/work">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Work
            </Link>
          </Button>
        </div>
      </section>

      {/* HTML/CSS/JS sandbox */}
      {/* <CodingPlayground /> */}

      {/* Multi-language code runner */}
      {/* <MultiLanguageRunner /> */}
    </main>
  )
}
