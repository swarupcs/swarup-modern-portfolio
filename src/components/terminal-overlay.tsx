'use client';

import { useState, useRef, useEffect } from 'react';
import { useTerminal } from '@/components/terminal-provider';
import { X, Terminal as TerminalIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface HistoryItem {
  command: string;
  output: React.ReactNode;
}

export function TerminalOverlay() {
  const { isOpen, setIsOpen } = useTerminal();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      if (history.length === 0) {
        setHistory([
          {
            command: '',
            output: (
              <div className="mb-4">
                <p className="text-green-400 font-bold">Welcome to SwarupOS v1.0.0</p>
                <p className="text-gray-400">Type &apos;help&apos; to see available commands.</p>
              </div>
            ),
          },
        ]);
      }
    }
  }, [isOpen, history.length]);

  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, isOpen]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;

    let output: React.ReactNode = '';
    const args = cmd.split(' ');
    const mainCommand = args[0].toLowerCase();

    switch (mainCommand) {
      case 'help':
        output = (
          <div className="grid grid-cols-[100px_1fr] gap-2 text-gray-300">
            <div className="text-green-400">help</div><div>Show this help message</div>
            <div className="text-green-400">ls</div><div>List available pages/sections</div>
            <div className="text-green-400">cd</div><div>Navigate to a page (e.g., &apos;cd projects&apos;)</div>
            <div className="text-green-400">cat</div><div>View contents (e.g., &apos;cat resume.txt&apos;)</div>
            <div className="text-green-400">clear</div><div>Clear the terminal</div>
            <div className="text-green-400">whoami</div><div>Display current user</div>
            <div className="text-green-400">date</div><div>Display current date</div>
            <div className="text-green-400">exit</div><div>Close the terminal</div>
          </div>
        );
        break;
      case 'ls':
        output = (
          <div className="flex flex-wrap gap-4 text-blue-400">
            <span className="text-gray-300">about.txt</span>
            <span className="text-gray-300">resume.txt</span>
            <span>projects/</span>
            <span>blog/</span>
            <span>contact/</span>
          </div>
        );
        break;
      case 'cd':
        const dir = args[1]?.replace(/\/$/, '');
        const validDirs = ['projects', 'blog', 'contact'];
        if (!dir) {
          output = 'cd: missing operand';
        } else if (dir === '..') {
          output = 'Navigating to home...';
          router.push('/');
          setTimeout(() => setIsOpen(false), 500);
        } else if (validDirs.includes(dir)) {
          output = `Navigating to /${dir}...`;
          router.push(`/${dir}`);
          setTimeout(() => setIsOpen(false), 500);
        } else {
          output = `cd: ${dir}: No such file or directory`;
        }
        break;
      case 'cat':
        const file = args[1];
        if (file === 'about.txt') {
          output = "Hi, I'm Swarup. I'm a developer who loves building cool things, exploring algorithms, and sharing knowledge.";
        } else if (file === 'resume.txt') {
          output = "Loading resume data...\nSkills: React, Next.js, Node.js, TypeScript, etc.\nExperience: Please visit /experience page for full details.";
        } else {
          output = `cat: ${file}: No such file or directory`;
        }
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'whoami':
        output = 'guest';
        break;
      case 'date':
        output = new Date().toString();
        break;
      case 'exit':
        setIsOpen(false);
        setInput('');
        return;
      default:
        output = `command not found: ${mainCommand}`;
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
    setInput('');
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 text-green-400 font-mono text-sm sm:text-base flex flex-col backdrop-blur-md">
      <div className="flex justify-between items-center border-b border-green-900/50 bg-black/50 p-3">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-5 h-5 text-green-500" />
          <span className="text-gray-400 text-sm">guest@swarup-portfolio:~</span>
        </div>
        <button 
          onClick={() => setIsOpen(false)}
          className="hover:bg-white/10 p-1.5 rounded-md transition-colors text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div 
        className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4" 
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((item, i) => (
          <div key={i} className="space-y-1">
            {item.command && (
              <div className="flex gap-2">
                <span className="text-green-500 font-semibold">guest@swarup:~$</span>
                <span className="text-gray-100">{item.command}</span>
              </div>
            )}
            <div className="text-gray-300 whitespace-pre-wrap">{item.output}</div>
          </div>
        ))}
        <form onSubmit={handleCommand} className="flex gap-2 mt-2 items-center">
          <span className="text-green-500 font-semibold">guest@swarup:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none border-none text-gray-100 w-full"
            autoFocus
            autoComplete="off"
            spellCheck="false"
          />
        </form>
        <div ref={bottomRef} className="h-4" />
      </div>
    </div>
  );
}
