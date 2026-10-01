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
  const [hasError, setHasError] = React.useState(false);
  const url = resolveIcons8Url(name);

  if (hasError) {
    const label = name.slice(0, 2).toUpperCase();
    return (
      <span
        className={`inline-flex items-center justify-center font-mono font-bold text-[10px] rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 select-none ${className}`}
        title={name}
      >
        {label}
      </span>
    );
  }

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
      onError={() => setHasError(true)}
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

// Card Accent Colors for Hover (Pure Cyan Vibe)
export const getTechBrandColor = (_name: string): { borderHover: string; glow: string } => {
  return {
    borderHover: 'group-hover:border-cyan-500/40',
    glow: 'group-hover:shadow-[0_0_24px_rgba(34,211,238,0.2)]',
  };
};

