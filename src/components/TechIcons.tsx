import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
  priority?: boolean;
}

// Icons8 Official Color Assets
export const ICONS8_MAP: Record<string, string> = {
  react: 'https://img.icons8.com/color/48/react-native.png',
  flutter: 'https://img.icons8.com/color/48/flutter.png',
  dart: 'https://img.icons8.com/color/48/dart.png',
  javascript: 'https://img.icons8.com/color/48/javascript--v1.png',
  typescript: 'https://img.icons8.com/color/48/typescript.png',
  html: 'https://img.icons8.com/color/48/html-5--v1.png',
  css: 'https://img.icons8.com/color/48/css3.png',
  laravel: 'https://img.icons8.com/fluency/48/laravel.png',
  php: 'https://img.icons8.com/color/48/php.png',
  node: 'https://img.icons8.com/color/48/nodejs.png',
  rest: 'https://img.icons8.com/color/48/api.png',
  mysql: 'https://img.icons8.com/color/48/mysql-logo.png',
  sqlserver: 'https://img.icons8.com/color/48/microsoft-sql-server.png',
  postgres: 'https://img.icons8.com/color/48/postgreesql.png',
  linux: 'https://img.icons8.com/color/48/linux--v1.png',
  git: 'https://img.icons8.com/color/48/git.png',
  nginx: 'https://img.icons8.com/color/48/nginx.png',
  cloud: 'https://img.icons8.com/color/48/cloud.png',
  ai: 'https://img.icons8.com/color/48/artificial-intelligence.png',
  docker: 'https://img.icons8.com/color/48/docker.png',
  redis: 'https://img.icons8.com/color/48/redis.png',
};

const resolveIcons8Url = (name: string): string => {
  const n = name.toLowerCase();
  if (n.includes('react')) return ICONS8_MAP.react;
  if (n.includes('flutter')) return ICONS8_MAP.flutter;
  if (n.includes('dart')) return ICONS8_MAP.dart;
  if (n.includes('typescript') || n.includes('ts')) return ICONS8_MAP.typescript;
  if (n.includes('javascript') || n.includes('js')) return ICONS8_MAP.javascript;
  if (n.includes('html') || n.includes('css')) return ICONS8_MAP.html;
  if (n.includes('laravel')) return ICONS8_MAP.laravel;
  if (n.includes('php')) return ICONS8_MAP.php;
  if (n.includes('node')) return ICONS8_MAP.node;
  if (n.includes('rest')) return ICONS8_MAP.rest;
  if (n.includes('sql server')) return ICONS8_MAP.sqlserver;
  if (n.includes('mysql')) return ICONS8_MAP.mysql;
  if (n.includes('postgres')) return ICONS8_MAP.postgres;
  if (n.includes('linux')) return ICONS8_MAP.linux;
  if (n.includes('git')) return ICONS8_MAP.git;
  if (n.includes('nginx')) return ICONS8_MAP.nginx;
  if (n.includes('docker')) return ICONS8_MAP.docker;
  if (n.includes('redis')) return ICONS8_MAP.redis;
  if (n.includes('cloud')) return ICONS8_MAP.cloud;
  if (n.includes('ai') || n.includes('ocr') || n.includes('document')) return ICONS8_MAP.ai;
  return ICONS8_MAP.react;
};

export const Icons8Image: React.FC<{
  name: string;
  alt?: string;
  className?: string;
  priority?: boolean;
}> = React.memo(({
  name,
  alt,
  className = 'w-6 h-6 object-contain',
  priority = false,
}) => {
  const url = resolveIcons8Url(name);
  return (
    <img
      src={url}
      alt={alt || `${name} icon`}
      width={48}
      height={48}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      crossOrigin="anonymous"
      referrerPolicy="no-referrer"
      className={className}
    />
  );
});

// Named Export Components
export const ReactIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', priority }) => (
  <Icons8Image name="react" className={className} priority={priority} />
);

export const FlutterIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', priority }) => (
  <Icons8Image name="flutter" className={className} priority={priority} />
);

export const DartIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', priority }) => (
  <Icons8Image name="dart" className={className} priority={priority} />
);

export const JsIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', priority }) => (
  <Icons8Image name="javascript" className={className} priority={priority} />
);

export const TsIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', priority }) => (
  <Icons8Image name="typescript" className={className} priority={priority} />
);

export const HtmlCssIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', priority }) => (
  <Icons8Image name="html" className={className} priority={priority} />
);

export const LaravelIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', priority }) => (
  <Icons8Image name="laravel" className={className} priority={priority} />
);

export const PhpIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', priority }) => (
  <Icons8Image name="php" className={className} priority={priority} />
);

export const NodeIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', priority }) => (
  <Icons8Image name="node" className={className} priority={priority} />
);

export const RestApiIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', priority }) => (
  <Icons8Image name="rest" className={className} priority={priority} />
);

export const MysqlIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', priority }) => (
  <Icons8Image name="mysql" className={className} priority={priority} />
);

export const SqlServerIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', priority }) => (
  <Icons8Image name="sqlserver" className={className} priority={priority} />
);

export const PostgresIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', priority }) => (
  <Icons8Image name="postgres" className={className} priority={priority} />
);

export const LinuxIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', priority }) => (
  <Icons8Image name="linux" className={className} priority={priority} />
);

export const GitIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', priority }) => (
  <Icons8Image name="git" className={className} priority={priority} />
);

export const NginxIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', priority }) => (
  <Icons8Image name="nginx" className={className} priority={priority} />
);

export const CloudIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', priority }) => (
  <Icons8Image name="cloud" className={className} priority={priority} />
);

export const AiIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', priority }) => (
  <Icons8Image name="ai" className={className} priority={priority} />
);

// Helper function to resolve Icons8 icon for any technology name
export const getTechIcon = (name: string, className = 'w-6 h-6', priority = false) => {
  return <Icons8Image name={name} className={className} priority={priority} />;
};

// Brand Accent Colors for Card Glow on Hover
export const getTechBrandColor = (name: string): { borderHover: string; glow: string } => {
  const n = name.toLowerCase();
  if (n.includes('react')) return { borderHover: 'group-hover:border-[#61DAFB]/50', glow: 'group-hover:shadow-[0_0_20px_rgba(97,218,251,0.2)]' };
  if (n.includes('flutter')) return { borderHover: 'group-hover:border-[#02569B]/50', glow: 'group-hover:shadow-[0_0_20px_rgba(2,86,155,0.25)]' };
  if (n.includes('dart')) return { borderHover: 'group-hover:border-[#0175C2]/50', glow: 'group-hover:shadow-[0_0_20px_rgba(1,117,194,0.25)]' };
  if (n.includes('javascript') || n.includes('js')) return { borderHover: 'group-hover:border-[#F7DF1E]/50', glow: 'group-hover:shadow-[0_0_20px_rgba(247,223,30,0.2)]' };
  if (n.includes('html') || n.includes('css')) return { borderHover: 'group-hover:border-[#E34F26]/50', glow: 'group-hover:shadow-[0_0_20px_rgba(227,79,38,0.2)]' };
  if (n.includes('laravel')) return { borderHover: 'group-hover:border-[#FF2D20]/50', glow: 'group-hover:shadow-[0_0_20px_rgba(255,45,32,0.25)]' };
  if (n.includes('php')) return { borderHover: 'group-hover:border-[#777BB4]/50', glow: 'group-hover:shadow-[0_0_20px_rgba(119,123,180,0.25)]' };
  if (n.includes('node')) return { borderHover: 'group-hover:border-[#339933]/50', glow: 'group-hover:shadow-[0_0_20px_rgba(51,153,51,0.25)]' };
  if (n.includes('rest')) return { borderHover: 'group-hover:border-[#06B6D4]/50', glow: 'group-hover:shadow-[0_0_20px_rgba(6,182,212,0.25)]' };
  if (n.includes('mysql')) return { borderHover: 'group-hover:border-[#00758F]/50', glow: 'group-hover:shadow-[0_0_20px_rgba(0,117,143,0.25)]' };
  if (n.includes('sql server')) return { borderHover: 'group-hover:border-[#CC292B]/50', glow: 'group-hover:shadow-[0_0_20px_rgba(204,41,43,0.25)]' };
  if (n.includes('postgres')) return { borderHover: 'group-hover:border-[#336791]/50', glow: 'group-hover:shadow-[0_0_20px_rgba(51,103,145,0.25)]' };
  if (n.includes('linux')) return { borderHover: 'group-hover:border-[#FFA500]/50', glow: 'group-hover:shadow-[0_0_20px_rgba(255,165,0,0.2)]' };
  if (n.includes('git')) return { borderHover: 'group-hover:border-[#F05032]/50', glow: 'group-hover:shadow-[0_0_20px_rgba(240,80,50,0.25)]' };
  if (n.includes('nginx')) return { borderHover: 'group-hover:border-[#009639]/50', glow: 'group-hover:shadow-[0_0_20px_rgba(0,150,57,0.25)]' };
  if (n.includes('cloud')) return { borderHover: 'group-hover:border-[#38BDF8]/50', glow: 'group-hover:shadow-[0_0_20px_rgba(56,189,248,0.25)]' };
  if (n.includes('ai') || n.includes('ocr') || n.includes('document')) return { borderHover: 'group-hover:border-[#818CF8]/50', glow: 'group-hover:shadow-[0_0_20px_rgba(129,140,248,0.25)]' };
  return { borderHover: 'group-hover:border-cyan-500/40', glow: 'group-hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]' };
};
