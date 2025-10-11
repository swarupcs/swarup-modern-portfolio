import Hero from '@/components/hero';
import About from '@/components/about';
import Skills from '@/components/skills';
import GithubStats from '@/components/github-stats';
import LeetcodeStats from '@/components/leetcode-stats';
import CodingPlayground from '@/components/coding-playground';

export default function Home() {
  return (
    <div className='min-h-screen'>
      <main>
        <Hero />
        <About />
        <Skills />
        <CodingPlayground />
        <GithubStats />
        <LeetcodeStats />
      </main>
    </div>
  );
}
