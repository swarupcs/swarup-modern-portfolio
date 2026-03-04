import type React from 'react';
import type { IconType } from 'react-icons';

import {
  SiReact, SiNextdotjs, SiVuedotjs, SiNuxtdotjs, SiAngular, SiSvelte,
  SiSolid, SiAstro, SiRemix, SiQwik,
  SiTailwindcss, SiSass, SiStyledcomponents, SiCss3, SiHtml5, SiBootstrap,
  SiMui, SiAntdesign, SiChakraui, SiShadcnui, SiFramer,
  SiTypescript, SiJavascript, SiPython, SiRust, SiGo, SiKotlin, SiSwift,
  SiCplusplus, SiC, SiSharp, SiPhp, SiRuby, SiScala, SiDart, SiR,
  SiElixir, SiLua, SiHaskell,
  SiRedux, SiRecoil,
  SiChartdotjs, SiD3Dotjs, SiApacheecharts,
  SiNodedotjs, SiExpress, SiNestjs, SiFastapi, SiDjango, SiFlask,
  SiLaravel, SiRubyonrails, SiSpring, SiDotnet, SiHono, SiAdonisjs,
  SiPostgresql, SiMysql, SiSqlite, SiMariadb,
  SiMongodb, SiFirebase, SiRedis, SiInfluxdb, SiElasticsearch, SiSupabase,
  SiPrisma, SiDrizzle, SiSequelize, SiHibernate,
  SiJsonwebtokens, SiAuth0, SiKeycloak,
  SiVercel, SiNetlify, SiAmazon, SiGooglecloud, SiRailway, SiRender,
  SiDigitalocean, SiHeroku, SiCloudflare,
  SiDocker, SiKubernetes, SiTerraform, SiAnsible, SiJenkins,
  SiGithubactions, SiCircleci, SiHelm, SiNginx, SiApache, SiCaddy, SiVault,
  SiGrafana, SiPrometheus, SiDatadog, SiSentry, SiNewrelic, SiElasticstack,
  SiOpentelemetry,
  SiApachekafka, SiRabbitmq, SiApachepulsar,
  SiVitest, SiJest, SiCypress, SiSelenium, SiMocha, SiJasmine, SiStorybook,
  SiVite, SiWebpack, SiTurborepo, SiEsbuild, SiBabel, SiSwc,
  SiBun, SiDeno, SiNpm, SiYarn, SiPnpm,
  SiExpo, SiFlutter, SiIonic, SiCapacitor,
  SiContentful, SiSanity, SiStrapi, SiWordpress, SiGhost, SiPayloadcms,
  SiGraphql, SiApollographql, SiTrpc, SiSocketdotio,
  SiOpenai, SiHuggingface, SiPytorch, SiTensorflow, SiScipy, SiNumpy,
  SiPandas, SiScikitlearn, SiKeras, SiJupyter, SiLangchain,
  SiStripe, SiTwilio, SiSendgrid,
  SiGit, SiGithub, SiGitlab, SiBitbucket,
  SiPostman, SiInsomnia, SiFigma, SiAdobexd, SiSketch, SiNotion, SiJira,
  SiLinear, SiConfluence, SiSlack, SiZapier, SiWebflow, SiShopify,
  SiAlgolia, SiMapbox,
  SiThreedotjs, SiWebgl, SiWebassembly,
  SiElectron, SiTauri,
  SiSolana, SiEthereum, SiIpfs,
} from 'react-icons/si';

import { GiBrain, GiArtificialIntelligence, GiCircuitry } from 'react-icons/gi';
import { TbBrandPlanetscale, TbBrandReactNative, TbApi } from 'react-icons/tb';
import { BiLogoVisualStudio } from 'react-icons/bi';

export const techIconsWithColors: Record<
  string,
  { icon: IconType; color: string; category?: string }
> = {
  // ── Frontend Frameworks ──────────────────────────────────────
  React: { icon: SiReact, color: '#61DAFB', category: 'Frontend' },
  'Next.js': { icon: SiNextdotjs, color: '#ffffff', category: 'Frontend' },
  'Vue.js': { icon: SiVuedotjs, color: '#4FC08D', category: 'Frontend' },
  'Nuxt.js': { icon: SiNuxtdotjs, color: '#00DC82', category: 'Frontend' },
  Angular: { icon: SiAngular, color: '#DD0031', category: 'Frontend' },
  Svelte: { icon: SiSvelte, color: '#FF3E00', category: 'Frontend' },
  SvelteKit: { icon: SiSvelte, color: '#FF3E00', category: 'Frontend' },
  'Solid.js': { icon: SiSolid, color: '#2C4F7C', category: 'Frontend' },
  Astro: { icon: SiAstro, color: '#FF5D01', category: 'Frontend' },
  Remix: { icon: SiRemix, color: '#121212', category: 'Frontend' },
  Qwik: { icon: SiQwik, color: '#AC7EF4', category: 'Frontend' },

  // ── Styling ──────────────────────────────────────────────────
  'Tailwind CSS': { icon: SiTailwindcss, color: '#06B6D4', category: 'Styling' },
  Sass: { icon: SiSass, color: '#CC6699', category: 'Styling' },
  'styled-components': { icon: SiStyledcomponents, color: '#DB7093', category: 'Styling' },
  CSS3: { icon: SiCss3, color: '#1572B6', category: 'Styling' },
  HTML5: { icon: SiHtml5, color: '#E34F26', category: 'Styling' },
  Bootstrap: { icon: SiBootstrap, color: '#7952B3', category: 'Styling' },
  'Material UI': { icon: SiMui, color: '#007FFF', category: 'Styling' },
  'Ant Design': { icon: SiAntdesign, color: '#0170FE', category: 'Styling' },
  'Chakra UI': { icon: SiChakraui, color: '#319795', category: 'Styling' },
  'shadcn/ui': { icon: SiShadcnui, color: '#ffffff', category: 'Styling' },
  'Framer Motion': { icon: SiFramer, color: '#BB4B96', category: 'Styling' },

  // ── Languages ────────────────────────────────────────────────
  TypeScript: { icon: SiTypescript, color: '#3178C6', category: 'Language' },
  JavaScript: { icon: SiJavascript, color: '#F7DF1E', category: 'Language' },
  Python: { icon: SiPython, color: '#3776AB', category: 'Language' },
  Rust: { icon: SiRust, color: '#CE422B', category: 'Language' },
  Go: { icon: SiGo, color: '#00ADD8', category: 'Language' },
  Golang: { icon: SiGo, color: '#00ADD8', category: 'Language' },
  Kotlin: { icon: SiKotlin, color: '#7F52FF', category: 'Language' },
  Swift: { icon: SiSwift, color: '#F05138', category: 'Language' },
  'C++': { icon: SiCplusplus, color: '#00599C', category: 'Language' },
  C: { icon: SiC, color: '#A8B9CC', category: 'Language' },
  'C#': { icon: SiSharp, color: '#239120', category: 'Language' },
  PHP: { icon: SiPhp, color: '#777BB4', category: 'Language' },
  Ruby: { icon: SiRuby, color: '#CC342D', category: 'Language' },
  Scala: { icon: SiScala, color: '#DC322F', category: 'Language' },
  Dart: { icon: SiDart, color: '#0175C2', category: 'Language' },
  R: { icon: SiR, color: '#276DC3', category: 'Language' },
  Elixir: { icon: SiElixir, color: '#6E4A7E', category: 'Language' },
  Lua: { icon: SiLua, color: '#2C2D72', category: 'Language' },
  Haskell: { icon: SiHaskell, color: '#5D4F85', category: 'Language' },

  // ── State Management ─────────────────────────────────────────
  Redux: { icon: SiRedux, color: '#764ABC', category: 'State' },
  Recoil: { icon: SiRecoil, color: '#1677FF', category: 'State' },
  Zustand: { icon: SiReact, color: '#FFB649', category: 'State' },
  Jotai: { icon: SiReact, color: '#ffffff', category: 'State' },

  // ── Data Visualization ───────────────────────────────────────
  'Chart.js': { icon: SiChartdotjs, color: '#FF6384', category: 'Visualization' },
  'D3.js': { icon: SiD3Dotjs, color: '#F9A03C', category: 'Visualization' },
  D3: { icon: SiD3Dotjs, color: '#F9A03C', category: 'Visualization' },
  'Apache ECharts': { icon: SiApacheecharts, color: '#AA344D', category: 'Visualization' },

  // ── Backend Frameworks ───────────────────────────────────────
  'Node.js': { icon: SiNodedotjs, color: '#339933', category: 'Backend' },
  'Express.js': { icon: SiExpress, color: '#ffffff', category: 'Backend' },
  Express: { icon: SiExpress, color: '#ffffff', category: 'Backend' },
  NestJS: { icon: SiNestjs, color: '#E0234E', category: 'Backend' },
  FastAPI: { icon: SiFastapi, color: '#009688', category: 'Backend' },
  Django: { icon: SiDjango, color: '#092E20', category: 'Backend' },
  Flask: { icon: SiFlask, color: '#ffffff', category: 'Backend' },
  Laravel: { icon: SiLaravel, color: '#FF2D20', category: 'Backend' },
  'Ruby on Rails': { icon: SiRubyonrails, color: '#D30001', category: 'Backend' },
  'Spring Boot': { icon: SiSpring, color: '#6DB33F', category: 'Backend' },
  '.NET': { icon: SiDotnet, color: '#512BD4', category: 'Backend' },
  'ASP.NET': { icon: SiDotnet, color: '#512BD4', category: 'Backend' },
  Hono: { icon: SiHono, color: '#E36002', category: 'Backend' },
  AdonisJS: { icon: SiAdonisjs, color: '#5A45FF', category: 'Backend' },

  // ── SQL Databases ─────────────────────────────────────────────
  PostgreSQL: { icon: SiPostgresql, color: '#336791', category: 'Database' },
  MySQL: { icon: SiMysql, color: '#4479A1', category: 'Database' },
  SQLite: { icon: SiSqlite, color: '#003B57', category: 'Database' },
  MariaDB: { icon: SiMariadb, color: '#003545', category: 'Database' },

  // ── NoSQL Databases ──────────────────────────────────────────
  MongoDB: { icon: SiMongodb, color: '#13AA52', category: 'Database' },
  Mongoose: { icon: SiMongodb, color: '#13AA52', category: 'Database' },
  Firebase: { icon: SiFirebase, color: '#FFCA28', category: 'Database' },
  Firestore: { icon: SiFirebase, color: '#FFCA28', category: 'Database' },
  Redis: { icon: SiRedis, color: '#DC382D', category: 'Database' },
  InfluxDB: { icon: SiInfluxdb, color: '#22ADF6', category: 'Database' },
  Elasticsearch: { icon: SiElasticsearch, color: '#005571', category: 'Database' },
  Supabase: { icon: SiSupabase, color: '#3ECF8E', category: 'Database' },
  PlanetScale: { icon: TbBrandPlanetscale, color: '#000000', category: 'Database' },
  Cassandra: { icon: SiApache, color: '#1287B1', category: 'Database' },
  DynamoDB: { icon: SiAmazon, color: '#4053D6', category: 'Database' },
  Neo4j: { icon: SiElasticsearch, color: '#008CC1', category: 'Database' },
  CouchDB: { icon: SiApache, color: '#EA2328', category: 'Database' },

  // ── ORMs & Query Builders ────────────────────────────────────
  Prisma: { icon: SiPrisma, color: '#5a67d8', category: 'ORM' },
  Drizzle: { icon: SiDrizzle, color: '#C5F74F', category: 'ORM' },
  Sequelize: { icon: SiSequelize, color: '#52B0E7', category: 'ORM' },
  Hibernate: { icon: SiHibernate, color: '#59666C', category: 'ORM' },

  // ── Auth ─────────────────────────────────────────────────────
  JWT: { icon: SiJsonwebtokens, color: '#d63aff', category: 'Auth' },
  Auth0: { icon: SiAuth0, color: '#EB5424', category: 'Auth' },
  Keycloak: { icon: SiKeycloak, color: '#4D4D4D', category: 'Auth' },

  // ── Cloud & Hosting ──────────────────────────────────────────
  Vercel: { icon: SiVercel, color: '#ffffff', category: 'Cloud' },
  Netlify: { icon: SiNetlify, color: '#00C7B7', category: 'Cloud' },
  AWS: { icon: SiAmazon, color: '#FF9900', category: 'Cloud' },
  GCP: { icon: SiGooglecloud, color: '#4285F4', category: 'Cloud' },
  'Google Cloud': { icon: SiGooglecloud, color: '#4285F4', category: 'Cloud' },
  Azure: { icon: BiLogoVisualStudio, color: '#0078D4', category: 'Cloud' },
  Cloudflare: { icon: SiCloudflare, color: '#F48120', category: 'Cloud' },
  Heroku: { icon: SiHeroku, color: '#430098', category: 'Cloud' },
  Railway: { icon: SiRailway, color: '#0B0D0E', category: 'Cloud' },
  Render: { icon: SiRender, color: '#46E3B7', category: 'Cloud' },
  DigitalOcean: { icon: SiDigitalocean, color: '#0080FF', category: 'Cloud' },

  // ── DevOps & Infrastructure ──────────────────────────────────
  Docker: { icon: SiDocker, color: '#2496ED', category: 'DevOps' },
  Kubernetes: { icon: SiKubernetes, color: '#326CE5', category: 'DevOps' },
  Terraform: { icon: SiTerraform, color: '#7B42BC', category: 'DevOps' },
  Ansible: { icon: SiAnsible, color: '#EE0000', category: 'DevOps' },
  Jenkins: { icon: SiJenkins, color: '#D24939', category: 'DevOps' },
  'GitHub Actions': { icon: SiGithubactions, color: '#2088FF', category: 'DevOps' },
  CircleCI: { icon: SiCircleci, color: '#343434', category: 'DevOps' },
  Helm: { icon: SiHelm, color: '#0F1689', category: 'DevOps' },
  Nginx: { icon: SiNginx, color: '#009639', category: 'DevOps' },
  Apache: { icon: SiApache, color: '#D22128', category: 'DevOps' },
  Caddy: { icon: SiCaddy, color: '#1EAD3E', category: 'DevOps' },
  Vault: { icon: SiVault, color: '#FFEC6E', category: 'DevOps' },

  // ── Monitoring & Observability ───────────────────────────────
  Grafana: { icon: SiGrafana, color: '#F46800', category: 'Monitoring' },
  Prometheus: { icon: SiPrometheus, color: '#E6522C', category: 'Monitoring' },
  Datadog: { icon: SiDatadog, color: '#632CA6', category: 'Monitoring' },
  Sentry: { icon: SiSentry, color: '#362D59', category: 'Monitoring' },
  'New Relic': { icon: SiNewrelic, color: '#1CE783', category: 'Monitoring' },
  OpenTelemetry: { icon: SiOpentelemetry, color: '#F5A800', category: 'Monitoring' },
  'ELK Stack': { icon: SiElasticstack, color: '#005571', category: 'Monitoring' },

  // ── Messaging & Queues ───────────────────────────────────────
  Kafka: { icon: SiApachekafka, color: '#231F20', category: 'Messaging' },
  RabbitMQ: { icon: SiRabbitmq, color: '#FF6600', category: 'Messaging' },
  'Apache Pulsar': { icon: SiApachepulsar, color: '#188FFF', category: 'Messaging' },

  // ── Testing ──────────────────────────────────────────────────
  Vitest: { icon: SiVitest, color: '#6E9F18', category: 'Testing' },
  Jest: { icon: SiJest, color: '#C21325', category: 'Testing' },
  Cypress: { icon: SiCypress, color: '#17202C', category: 'Testing' },
  Selenium: { icon: SiSelenium, color: '#43B02A', category: 'Testing' },
  Mocha: { icon: SiMocha, color: '#8D6748', category: 'Testing' },
  Jasmine: { icon: SiJasmine, color: '#8A4182', category: 'Testing' },
  Storybook: { icon: SiStorybook, color: '#FF4785', category: 'Testing' },
  Playwright: { icon: SiNodedotjs, color: '#2EAD33', category: 'Testing' },

  // ── Build Tools & Bundlers ───────────────────────────────────
  Vite: { icon: SiVite, color: '#646CFF', category: 'Build' },
  Webpack: { icon: SiWebpack, color: '#8DD6F9', category: 'Build' },
  Turborepo: { icon: SiTurborepo, color: '#EF4444', category: 'Build' },
  esbuild: { icon: SiEsbuild, color: '#FFCF00', category: 'Build' },
  Babel: { icon: SiBabel, color: '#F9DC3E', category: 'Build' },
  SWC: { icon: SiSwc, color: '#F5A623', category: 'Build' },
  Rollup: { icon: SiVite, color: '#FF3333', category: 'Build' },
  Parcel: { icon: SiWebpack, color: '#E17B46', category: 'Build' },

  // ── Package Managers & Runtimes ──────────────────────────────
  Bun: { icon: SiBun, color: '#FBF0DF', category: 'Runtime' },
  Deno: { icon: SiDeno, color: '#ffffff', category: 'Runtime' },
  npm: { icon: SiNpm, color: '#CB3837', category: 'Runtime' },
  Yarn: { icon: SiYarn, color: '#2C8EBB', category: 'Runtime' },
  pnpm: { icon: SiPnpm, color: '#F69220', category: 'Runtime' },

  // ── Mobile ───────────────────────────────────────────────────
  'React Native': { icon: TbBrandReactNative, color: '#61DAFB', category: 'Mobile' },
  Expo: { icon: SiExpo, color: '#ffffff', category: 'Mobile' },
  Flutter: { icon: SiFlutter, color: '#02569B', category: 'Mobile' },
  Ionic: { icon: SiIonic, color: '#3880FF', category: 'Mobile' },
  Capacitor: { icon: SiCapacitor, color: '#119EFF', category: 'Mobile' },

  // ── CMS & Headless ───────────────────────────────────────────
  Contentful: { icon: SiContentful, color: '#2478CC', category: 'CMS' },
  Sanity: { icon: SiSanity, color: '#F03E2F', category: 'CMS' },
  Strapi: { icon: SiStrapi, color: '#4945FF', category: 'CMS' },
  WordPress: { icon: SiWordpress, color: '#21759B', category: 'CMS' },
  Ghost: { icon: SiGhost, color: '#15171A', category: 'CMS' },
  Payload: { icon: SiPayloadcms, color: '#ffffff', category: 'CMS' },

  // ── API & Communication ──────────────────────────────────────
  GraphQL: { icon: SiGraphql, color: '#E10098', category: 'API' },
  Apollo: { icon: SiApollographql, color: '#311C87', category: 'API' },
  tRPC: { icon: SiTrpc, color: '#2596BE', category: 'API' },
  'Socket.io': { icon: SiSocketdotio, color: '#ffffff', category: 'API' },
  WebSockets: { icon: SiSocketdotio, color: '#ffffff', category: 'API' },
  REST: { icon: TbApi, color: '#6366F1', category: 'API' },

  // ── AI & ML ──────────────────────────────────────────────────
  'OpenAI API': { icon: SiOpenai, color: '#412991', category: 'AI/ML' },
  OpenAI: { icon: SiOpenai, color: '#412991', category: 'AI/ML' },
  'Hugging Face': { icon: SiHuggingface, color: '#FFD21E', category: 'AI/ML' },
  PyTorch: { icon: SiPytorch, color: '#EE4C2C', category: 'AI/ML' },
  TensorFlow: { icon: SiTensorflow, color: '#FF6F00', category: 'AI/ML' },
  SciPy: { icon: SiScipy, color: '#8CAAE6', category: 'AI/ML' },
  NumPy: { icon: SiNumpy, color: '#013243', category: 'AI/ML' },
  Pandas: { icon: SiPandas, color: '#150458', category: 'AI/ML' },
  'scikit-learn': { icon: SiScikitlearn, color: '#F7931E', category: 'AI/ML' },
  Keras: { icon: SiKeras, color: '#D00000', category: 'AI/ML' },
  Jupyter: { icon: SiJupyter, color: '#F37626', category: 'AI/ML' },
  LangChain: { icon: SiLangchain, color: '#1C3C3C', category: 'AI/ML' },
  'Machine Learning': { icon: GiBrain, color: '#a78bfa', category: 'AI/ML' },
  'Deep Learning': { icon: GiBrain, color: '#818cf8', category: 'AI/ML' },
  'Generative AI': { icon: GiArtificialIntelligence, color: '#C084FC', category: 'AI/ML' },
  'Computer Vision': { icon: GiCircuitry, color: '#34D399', category: 'AI/ML' },

  // ── Payments & Services ──────────────────────────────────────
  Stripe: { icon: SiStripe, color: '#5469D4', category: 'Services' },
  Twilio: { icon: SiTwilio, color: '#F22F46', category: 'Services' },
  SendGrid: { icon: SiSendgrid, color: '#1A82E2', category: 'Services' },

  // ── Version Control ──────────────────────────────────────────
  Git: { icon: SiGit, color: '#F05032', category: 'Tools' },
  GitHub: { icon: SiGithub, color: '#ffffff', category: 'Tools' },
  GitLab: { icon: SiGitlab, color: '#FC6D26', category: 'Tools' },
  Bitbucket: { icon: SiBitbucket, color: '#0052CC', category: 'Tools' },

  // ── Developer Tools ──────────────────────────────────────────
  Postman: { icon: SiPostman, color: '#FF6C02', category: 'Tools' },
  Insomnia: { icon: SiInsomnia, color: '#4000BF', category: 'Tools' },
  Figma: { icon: SiFigma, color: '#F24E1E', category: 'Tools' },
  'Adobe XD': { icon: SiAdobexd, color: '#FF61F6', category: 'Tools' },
  Sketch: { icon: SiSketch, color: '#F7B500', category: 'Tools' },
  Notion: { icon: SiNotion, color: '#ffffff', category: 'Tools' },
  Jira: { icon: SiJira, color: '#0052CC', category: 'Tools' },
  Linear: { icon: SiLinear, color: '#5E6AD2', category: 'Tools' },
  Confluence: { icon: SiConfluence, color: '#172B4D', category: 'Tools' },
  Slack: { icon: SiSlack, color: '#4A154B', category: 'Tools' },
  Zapier: { icon: SiZapier, color: '#FF4A00', category: 'Tools' },
  Webflow: { icon: SiWebflow, color: '#4353FF', category: 'Tools' },
  Shopify: { icon: SiShopify, color: '#7AB55C', category: 'Tools' },
  Algolia: { icon: SiAlgolia, color: '#003DFF', category: 'Tools' },
  Mapbox: { icon: SiMapbox, color: '#000000', category: 'Tools' },

  // ── 3D & Graphics ────────────────────────────────────────────
  'Three.js': { icon: SiThreedotjs, color: '#ffffff', category: '3D/Graphics' },
  WebGL: { icon: SiWebgl, color: '#990000', category: '3D/Graphics' },
  WebAssembly: { icon: SiWebassembly, color: '#654FF0', category: '3D/Graphics' },

  // ── Desktop ──────────────────────────────────────────────────
  Electron: { icon: SiElectron, color: '#47848F', category: 'Desktop' },
  Tauri: { icon: SiTauri, color: '#FFC131', category: 'Desktop' },

  // ── Web3 & Blockchain ────────────────────────────────────────
  Solana: { icon: SiSolana, color: '#9945FF', category: 'Web3' },
  Ethereum: { icon: SiEthereum, color: '#627EEA', category: 'Web3' },
  IPFS: { icon: SiIpfs, color: '#65C2CB', category: 'Web3' },
  Hardhat: { icon: SiEthereum, color: '#FFF100', category: 'Web3' },
  'Web3.js': { icon: SiEthereum, color: '#F16822', category: 'Web3' },
};

export const techIcons: Record<string, IconType> = Object.fromEntries(
  Object.entries(techIconsWithColors).map(([k, v]) => [k, v.icon]),
);

export function getTechIcon(techName: string) {
  return techIcons[techName] || null;
}

export function getTechColor(techName: string) {
  return techIconsWithColors[techName]?.color || '#6b7280';
}

export function getTechCategory(techName: string) {
  return techIconsWithColors[techName]?.category || 'Other';
}

export function TechBadgeWithIcon({
  tech,
  className = '',
}: {
  tech: string;
  className?: string;
}) {
  const techData = techIconsWithColors[tech];
  const IconComponent = techData?.icon;

  return (
    <div
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/8 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-200 ${className}`}
    >
      {IconComponent && (
        <IconComponent
          className='w-3.5 h-3.5 shrink-0'
          style={{ color: techData?.color }}
        />
      )}
      <span className='text-xs font-medium text-white/80'>{tech}</span>
    </div>
  );
}