import Hero from '@/components/hero';
import About from '@/components/about';
import Skills from '@/components/skills';
import GithubStats from '@/components/github-stats';
import LeetcodeStats from '@/components/leetcode-stats';

export default function Home() {
  return (
    <div className='min-h-screen flex flex-col'>
      <main>
        <Hero />
        <About />
        <Skills />
        {/* <CodingPlayground /> */}
        <GithubStats />
        <LeetcodeStats />
      </main>
    </div>
  );
}
