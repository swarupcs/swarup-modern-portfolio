'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Play,
  RotateCw,
  Download,
  TerminalSquare,
  Code2,
  LayoutGrid,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

type ConsoleMessage = {
  type: 'log' | 'warn' | 'error' | 'info';
  text: string;
  ts: number;
};

const DEFAULT_HTML = ` HTML 
<div class="container">
  <h1>Hello, Playground! 👋</h1>
  <p>Edit HTML, CSS, and JS on the left. Your preview appears on the right.</p>
  <button id="btn" class="btn">Click me</button>
  <div id="output" class="output"></div>
</div>
`;

const DEFAULT_CSS = `/* CSS */
:root {
  --bg: #0b0b0c;
  --panel: hsl(240 5% 12%);
  --text: hsl(0 0% 96%);
  --muted: hsl(0 0% 70%);
  --primary: hsl(22 95% 54%);
}

html, body {
  height: 100%;
}

body {
  background: transparent;
  color: var(--text);
  font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans",
    "Apple Color Emoji", "Segoe UI Emoji";
}

.container {
  padding: 1rem;
  background: color-mix(in srgb, var(--panel) 75%, transparent);
  border: 1px solid hsl(240 4% 20%);
  border-radius: 0.75rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

h1 {
  font-size: 1.5rem;
  margin: 0 0 0.5rem 0;
  letter-spacing: -0.02em;
}

p {
  color: var(--muted);
  margin: 0 0 1rem 0;
}

.btn {
  appearance: none;
  border: 1px solid hsl(22 95% 40% / 0.7);
  background: linear-gradient(180deg, hsl(22 95% 54%), hsl(22 95% 48%));
  color: white;
  padding: 0.5rem 0.9rem;
  border-radius: 0.6rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 8px 20px hsl(22 95% 54% / 0.25);
}

.btn:hover {
  filter: brightness(1.05);
  transform: translateY(-1px);
}

.output {
  margin-top: 0.75rem;
  padding: 0.75rem;
  background: hsl(240 4% 10%);
  border: 1px dashed hsl(240 4% 20%);
  border-radius: 0.5rem;
  min-height: 40px;
  color: hsl(50 100% 70%);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
  font-size: 0.9rem;
}
`;

const DEFAULT_JS = `// JavaScript
console.log("Playground ready ✅");

const btn = document.getElementById("btn");
const out = document.getElementById("output");

let count = 0;
btn?.addEventListener("click", () => {
  count++;
  const msg = \`Clicked \${count} time\${count === 1 ? "" : "s"}\`;
  console.log(msg);
  if (out) out.textContent = msg;
});
`;

const TEMPLATES: Record<
  string,
  {
    html: string;
    css: string;
    js: string;
    description: string;
  }
> = {
  'Vanilla Starter': {
    html: DEFAULT_HTML,
    css: DEFAULT_CSS,
    js: DEFAULT_JS,
    description: 'HTML/CSS/JS starter with a button and console logger',
  },
  'Canvas Bubbles': {
    html: `<canvas id="c" width="600" height="300" style="width:100%; height:300px; display:block; border-radius:12px"></canvas>`,
    css: `body{background:transparent}`,
    js: `const c = document.getElementById("c");
const x = c.getContext("2d");
const W = c.width, H = c.height;
const bubbles = Array.from({length: 40}, () => ({
  x: Math.random()*W, y: H + Math.random()*H,
  r: 3 + Math.random()*8, s: 0.5 + Math.random()*1.5
}));
(function loop(){
  x.clearRect(0,0,W,H);
  for (const b of bubbles){
    b.y -= b.s;
    if (b.y < -b.r) { b.y = H + b.r; b.x = Math.random()*W }
    x.beginPath();
    x.arc(b.x, b.y, b.r, 0, Math.PI*2);
    x.fillStyle = "rgba(255,255,255,0.7)";
    x.fill();
  }
  requestAnimationFrame(loop);
})();`,
    description: 'A minimal canvas animation template',
  },
  'Tailwind CDN': {
    html: ` Tailwind via CDN 
<div class="min-h-[180px] grid place-items-center">
  <button class="px-6 py-3 rounded-xl bg-orange-500 text-white font-semibold shadow hover:shadow-lg transition">
    Tailwind Button
  </button>
</div>`,
    css: ``,
    js: ``,
    description: 'Use Tailwind via CDN in the preview frame',
  },
};

function buildSrcDoc(
  html: string,
  css: string,
  js: string,
  useTailwindCDN: boolean
) {
  const consoleBridge = `
    (function(){
      const send = (type, payload) => parent.postMessage({ source: "playground-console", type, payload }, "*");
      ["log","warn","error","info"].forEach((m)=>{
        const orig = console[m];
        console[m] = function(...args){
          try { send(m, args.map(a => typeof a === "object" ? JSON.stringify(a) : String(a))); }
          catch(_) {}
          orig.apply(console, args);
        }
      });
      window.onerror = function(message, source, lineno, colno){
        send("error", [String(message) + " (" + lineno + ":" + colno + ")"]);
      }
    })();
  `;
  const tailwindTag = useTailwindCDN
    ? `<script src="https://cdn.tailwindcss.com"></script>`
    : '';

  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8"/>
    ${tailwindTag}
    <style>${css}</style>
  </head>
  <body>
    ${html}
    <script>${consoleBridge}</script>
    <script>
      try{ ${js} } catch(e){ console.error(e && (e.stack || (e as Error).message) || e) }
    </script>
  </body>
</html>`;
}

export default function CodingPlayground() {
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');
  const [template, setTemplate] = useState<string>('Vanilla Starter');
  const [html, setHtml] = useState<string>(TEMPLATES['Vanilla Starter'].html);
  const [css, setCss] = useState<string>(TEMPLATES['Vanilla Starter'].css);
  const [js, setJs] = useState<string>(TEMPLATES['Vanilla Starter'].js);
  const [useTailwindCDN, setUseTailwindCDN] = useState<boolean>(false);
  const [autorun, setAutorun] = useState<boolean>(true);
  const [consoleMessages, setConsoleMessages] = useState<ConsoleMessage[]>([]);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const debounceRef = useRef<number | null>(null);

  // Receive console messages from iframe
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (!e?.data || e.data.source !== 'playground-console') return;
      const { type, payload } = e.data as {
        type: ConsoleMessage['type'];
        payload: string[];
      };
      const text = (payload || []).join(' ');
      setConsoleMessages((prev) => [...prev, { type, text, ts: Date.now() }]);
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  const run = useCallback(() => {
    const src = buildSrcDoc(html, css, js, useTailwindCDN);
    if (iframeRef.current) {
      // Reset console on each run for clarity
      setConsoleMessages([]);
      iframeRef.current.srcdoc = src;
    }
  }, [html, css, js, useTailwindCDN]);

  // Auto-run on edits with debounce
  useEffect(() => {
    if (!autorun) return;
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => run(), 400);
    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, [html, css, js, autorun, run]);

  // Initialize preview
  useEffect(() => {
    run();
  }, []); // eslint-disable-line

  const resetToTemplate = useCallback(
    (key: string) => {
      const t = TEMPLATES[key];
      if (!t) return;
      setHtml(t.html);
      setCss(t.css);
      setJs(t.js);
      setConsoleMessages([]);
      // Tailwind detection for this template
      setUseTailwindCDN(key === 'Tailwind CDN');
      setTimeout(() => run(), 0);
    },
    [run]
  );

  const downloadHTML = useCallback(() => {
    const src = buildSrcDoc(html, css, js, useTailwindCDN);
    const blob = new Blob([src], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'playground.html';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }, [html, css, js, useTailwindCDN]);

  const editorBase =
    'w-full min-h-[220px] md:min-h-[280px] rounded-lg border bg-background/60 p-3 font-mono text-sm outline-none focus:ring-2 focus:ring-primary/40';

  const consoleColor = useMemo(
    () => ({
      log: 'text-muted-foreground',
      info: 'text-blue-500',
      warn: 'text-yellow-500',
      error: 'text-red-500',
    }),
    []
  );

  return (
    <section id='playground' className='py-16 md:py-24'>
      <div className='container px-4 md:px-6'>
        <div className='mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between'>
          <div>
            <div className='inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground'>
              <Code2 className='h-3.5 w-3.5' />
              <span>Coding Playground</span>
            </div>
            <h2 className='mt-3 text-2xl font-bold tracking-tight md:text-3xl'>
              Experiment with code right on the page
            </h2>
            <p className='mt-1 max-w-2xl text-sm text-muted-foreground'>
              Edit HTML, CSS, and JavaScript. Toggle auto-run, switch templates,
              and view logs in the console panel.
            </p>
          </div>

          <div className='grid grid-cols-2 gap-3 sm:flex sm:items-center'>
            <div className='flex items-center gap-2'>
              <Label htmlFor='autorun' className='text-sm'>
                Auto-run
              </Label>
              <Switch
                id='autorun'
                checked={autorun}
                onCheckedChange={setAutorun}
              />
            </div>

            <div className='flex items-center gap-2'>
              <Label htmlFor='tailwind' className='text-sm'>
                Tailwind CDN
              </Label>
              <Switch
                id='tailwind'
                checked={useTailwindCDN}
                onCheckedChange={setUseTailwindCDN}
              />
            </div>

            <div className='col-span-2 flex items-center gap-2 sm:col-span-1'>
              <Select
                value={template}
                onValueChange={(val) => {
                  setTemplate(val);
                  resetToTemplate(val);
                }}
              >
                <SelectTrigger className='w-[190px]'>
                  <SelectValue placeholder='Select template' />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(TEMPLATES).map((key) => (
                    <SelectItem key={key} value={key}>
                      {key}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant='outline'
                size='sm'
                onClick={() => resetToTemplate(template)}
              >
                <RotateCw className='mr-2 h-4 w-4' />
                Reset
              </Button>
              <Button size='sm' onClick={run}>
                <Play className='mr-2 h-4 w-4' />
                Run
              </Button>
              <Button variant='secondary' size='sm' onClick={downloadHTML}>
                <Download className='mr-2 h-4 w-4' />
                Export
              </Button>
            </div>
          </div>
        </div>

        <div className='grid gap-6 lg:grid-cols-2'>
          {/* Editors */}
          <Card className='border'>
            <CardHeader className='pb-2'>
              <CardTitle className='text-base font-semibold tracking-tight'>
                Editor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs
                value={activeTab}
                onValueChange={(v) => setActiveTab(v as 'html' | 'css' | 'js')}
                className='w-full'
              >
                <TabsList className='grid w-full grid-cols-3'>
                  <TabsTrigger value='html'>HTML</TabsTrigger>
                  <TabsTrigger value='css'>CSS</TabsTrigger>
                  <TabsTrigger value='js'>JS</TabsTrigger>
                </TabsList>

                <TabsContent value='html' className='mt-3'>
                  <textarea
                    aria-label='HTML editor'
                    className={editorBase}
                    value={html}
                    onChange={(e) => setHtml(e.target.value)}
                    spellCheck={false}
                  />
                </TabsContent>
                <TabsContent value='css' className='mt-3'>
                  <textarea
                    aria-label='CSS editor'
                    className={editorBase}
                    value={css}
                    onChange={(e) => setCss(e.target.value)}
                    spellCheck={false}
                  />
                </TabsContent>
                <TabsContent value='js' className='mt-3'>
                  <textarea
                    aria-label='JS editor'
                    className={editorBase}
                    value={js}
                    onChange={(e) => setJs(e.target.value)}
                    spellCheck={false}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Preview + Console */}
          <div className='grid gap-6'>
            <Card className='overflow-hidden border'>
              <CardHeader className='pb-2'>
                <div className='flex items-center justify-between'>
                  <CardTitle className='text-base font-semibold tracking-tight'>
                    Preview
                  </CardTitle>
                  <div className='inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs text-muted-foreground'>
                    <LayoutGrid className='h-3.5 w-3.5' />
                    <span>Sandboxed</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className='p-0'>
                <iframe
                  ref={iframeRef}
                  title='Playground Preview'
                  className='h-[320px] w-full rounded-t-none rounded-md bg-white dark:bg-neutral-900'
                  sandbox='allow-scripts allow-same-origin'
                />
              </CardContent>
            </Card>

            <Card className='border'>
              <CardHeader className='pb-2'>
                <div className='flex items-center gap-2'>
                  <TerminalSquare className='h-4 w-4' />
                  <CardTitle className='text-base font-semibold tracking-tight'>
                    Console
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className='h-[140px] overflow-auto rounded-md border bg-muted/30 p-3 text-sm'>
                  {consoleMessages.length === 0 ? (
                    <div className='text-muted-foreground'>
                      No output yet. console.log will appear here.
                    </div>
                  ) : (
                    <ul className='space-y-1'>
                      {consoleMessages.map((m, i) => (
                        <li
                          key={m.ts + ':' + i}
                          className={consoleColor[m.type]}
                        >
                          <span className='mr-2 select-none text-muted-foreground'>
                            ›
                          </span>
                          {m.text}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <p className='mt-6 text-xs text-muted-foreground'>
          Tip: Use the Tailwind CDN toggle to quickly style your HTML without
          writing CSS.
        </p>
      </div>
    </section>
  );
}
