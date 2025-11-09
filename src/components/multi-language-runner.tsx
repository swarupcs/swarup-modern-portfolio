'use client';

import { useCallback, useMemo, useState } from 'react';
import {
  Play,
  RotateCw,
  Download,
  TerminalSquare,
  Code2,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type LanguageKey = 'javascript' | 'c' | 'cpp' | 'java' | 'go';

const LANGUAGE_MAP: Record<
  LanguageKey,
  { pistonLang: string; version: string; sample: string; filename?: string }
> = {
  javascript: {
    pistonLang: 'javascript',
    version: '18.15.0',
    sample: `// JavaScript (Node)
// Reads from standard input and echoes with a greeting.
console.log("Hello from JavaScript ✅");
process.stdin.setEncoding("utf8");
let data = "";
process.stdin.on("data", chunk => data += chunk);
process.stdin.on("end", () => {
  if (data.trim()) console.log("You entered:", data.trim());
});`,
    filename: 'index.js',
  },
  c: {
    pistonLang: 'c',
    version: '10.2.0',
    sample: `// C (GCC)
#include <stdio.h>
int main() {
  char input[256];
  printf("Hello from C ✅\\n");
  if (fgets(input, sizeof(input), stdin)) {
    printf("You entered: %s", input);
  }
  return 0;
}`,
    filename: 'main.c',
  },
  cpp: {
    pistonLang: 'cpp',
    version: '10.2.0',
    sample: `// C++ (G++)
#include <bits/stdc++.h>
using namespace std;
int main() {
  cout << "Hello from C++ ✅" << endl;
  string s; if (getline(cin, s)) {
    cout << "You entered: " << s << endl;
  }
  return 0;
}`,
    filename: 'main.cpp',
  },
  java: {
    pistonLang: 'java',
    version: '15.0.2',
    sample: `// Java (OpenJDK)
import java.util.*;
public class Main {
  public static void main(String[] args) {
    System.out.println("Hello from Java ✅");
    try (Scanner sc = new Scanner(System.in)) {
      if (sc.hasNextLine()) {
        String line = sc.nextLine();
        System.out.println("You entered: " + line);
      }
    }
  }
}`,
    filename: 'Main.java',
  },
  go: {
    pistonLang: 'go',
    version: '1.20.2',
    sample: `// Go
package main
import (
  "bufio"
  "fmt"
  "os"
)
func main() {
  fmt.Println("Hello from Go ✅")
  in := bufio.NewReader(os.Stdin)
  line, _ := in.ReadString('\\n')
  if len(line) > 0 {
    fmt.Println("You entered:", line)
  }
}`,
    filename: 'main.go',
  },
};

type RunResult = {
  run: { stdout: string; stderr: string; code: number; signal: string | null };
  compile?: { stdout: string; stderr: string; code: number };
};

export default function MultiLanguageRunner() {
  const [language, setLanguage] = useState<LanguageKey>('javascript');
  const [code, setCode] = useState<string>(LANGUAGE_MAP['javascript'].sample);
  const [stdin, setStdin] = useState<string>('Type something and press Run');
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<RunResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filename, setFilename] = useState<string>(
    LANGUAGE_MAP['javascript'].filename || 'main.txt'
  );

  const langOptions = useMemo(
    () => Object.keys(LANGUAGE_MAP) as LanguageKey[],
    []
  );

  const onLanguageChange = useCallback((lang: LanguageKey) => {
    setLanguage(lang);
    setCode(LANGUAGE_MAP[lang].sample);
    setFilename(LANGUAGE_MAP[lang].filename || 'main.txt');
    setOutput(null);
    setError(null);
  }, []);

  const runCode = useCallback(async () => {
    try {
      setIsRunning(true);
      setError(null);
      setOutput(null);

      const meta = LANGUAGE_MAP[language];
      const res = await fetch('/api/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: meta.pistonLang,
          version: meta.version,
          files: [{ name: filename, content: code }],
          stdin,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Failed to run code');
      }
      const data: RunResult = await res.json();
      setOutput(data);
    } catch (e: unknown) {
      const errorMessage = (e as Error)?.message || 'Unknown error';
      setError(errorMessage);
    } finally {
      setIsRunning(false);
    }
  }, [language, code, stdin, filename]);

  const reset = useCallback(() => {
    const m = LANGUAGE_MAP[language];
    setCode(m.sample);
    setStdin('');
    setOutput(null);
    setError(null);
  }, [language]);

  const downloadSource = useCallback(() => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || 'source.txt';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }, [code, filename]);

  return (
    <section className='py-16'>
      <div className='container px-4 md:px-6'>
        <div className='mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between'>
          <div>
            <div className='inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground'>
              <Code2 className='h-3.5 w-3.5' />
              <span>Code Runner</span>
            </div>
            <h2 className='mt-3 text-2xl font-bold tracking-tight md:text-3xl'>
              Run code in multiple languages
            </h2>
            <CardDescription className='mt-1 max-w-2xl'>
              Supports JavaScript (Node), C, C++, Java, and Go. Provide optional
              standard input, run the code safely in a sandbox, and view
              stdout/stderr.
            </CardDescription>
          </div>

          <div className='flex flex-wrap items-center gap-2'>
            <Select
              value={language}
              onValueChange={(v) => onLanguageChange(v as LanguageKey)}
            >
              <SelectTrigger className='w-[200px]'>
                <SelectValue placeholder='Select language' />
              </SelectTrigger>
              <SelectContent>
                {langOptions.map((key) => (
                  <SelectItem key={key} value={key}>
                    {key.toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              className='w-[200px]'
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              placeholder='Filename'
            />
            <Button variant='outline' onClick={reset}>
              <RotateCw className='mr-2 h-4 w-4' />
              Reset
            </Button>
            <Button variant='secondary' onClick={downloadSource}>
              <Download className='mr-2 h-4 w-4' />
              Export
            </Button>
            <Button onClick={runCode} disabled={isRunning}>
              {isRunning ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Running...
                </>
              ) : (
                <>
                  <Play className='mr-2 h-4 w-4' />
                  Run
                </>
              )}
            </Button>
          </div>
        </div>

        <div className='grid gap-6 lg:grid-cols-2'>
          <Card className='border'>
            <CardHeader className='pb-2'>
              <CardTitle className='text-base font-semibold tracking-tight'>
                Source Code
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                aria-label='Source code'
                className='min-h-[320px] font-mono text-sm'
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
              />
              <div className='mt-4'>
                <Label htmlFor='stdin'>Standard Input (optional)</Label>
                <Textarea
                  id='stdin'
                  aria-label='Standard input'
                  className='mt-2 min-h-[100px] font-mono text-sm'
                  value={stdin}
                  onChange={(e) => setStdin(e.target.value)}
                  spellCheck={false}
                  placeholder='Enter input that your program reads from stdin'
                />
              </div>
            </CardContent>
          </Card>

          <Card className='border'>
            <CardHeader className='pb-2'>
              <div className='flex items-center gap-2'>
                <TerminalSquare className='h-4 w-4' />
                <CardTitle className='text-base font-semibold tracking-tight'>
                  Output
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {error ? (
                <pre className='whitespace-pre-wrap rounded-md border bg-red-500/10 p-3 text-sm text-red-500'>
                  {error}
                </pre>
              ) : output ? (
                <div className='space-y-4'>
                  <div>
                    <div className='mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground'>
                      stdout
                    </div>
                    <pre className='whitespace-pre-wrap rounded-md border bg-muted/30 p-3 text-sm'>
                      {output.run?.stdout || '(empty)'}
                    </pre>
                  </div>
                  <div>
                    <div className='mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground'>
                      stderr
                    </div>
                    <pre className='whitespace-pre-wrap rounded-md border bg-muted/30 p-3 text-sm'>
                      {output.run?.stderr || '(empty)'}
                    </pre>
                  </div>
                  {'compile' in output && output.compile ? (
                    <div>
                      <div className='mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground'>
                        compile
                      </div>
                      <pre className='whitespace-pre-wrap rounded-md border bg-muted/30 p-3 text-sm'>
                        {output.compile?.stdout ||
                          output.compile?.stderr ||
                          '(empty)'}
                      </pre>
                    </div>
                  ) : null}
                  <div className='text-xs text-muted-foreground'>
                    Exit code: {output.run?.code}{' '}
                    {output.run?.signal ? `(signal: ${output.run.signal})` : ''}
                  </div>
                </div>
              ) : (
                <div className='text-sm text-muted-foreground'>
                  Run your code to see output here.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
