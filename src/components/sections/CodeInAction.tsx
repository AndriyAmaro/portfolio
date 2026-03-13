"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { Terminal, FileCode2, GitCommit, Play, Copy, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CodeInActionBackground, CodeInActionBackgroundLight } from "../ui/CodeInActionBackground";

// ---------------------------------------------------------------------------
// Code snippets from the real Pulse Ecosystem
// ---------------------------------------------------------------------------
interface CodeSnippet {
  id: string;
  filename: string;
  language: string;
  project: string;
  projectColor: string;
  description: string;
  code: string;
}

const snippets: CodeSnippet[] = [
  {
    id: "ds",
    filename: "Button.tsx",
    language: "TypeScript React",
    project: "Pulse Design System",
    projectColor: "#6366f1",
    description: "Componente com variantes type-safe e composição",
    code: `interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost' | 'danger'
  size: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  children: React.ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        buttonBase,
        variants[variant],
        sizes[size],
        isLoading && 'opacity-70 pointer-events-none'
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading && <Spinner className="mr-2" />}
      {children}
    </button>
  )
}`,
  },
  {
    id: "chat",
    filename: "websocket.gateway.ts",
    language: "TypeScript",
    project: "Pulse Chat",
    projectColor: "#14b8a6",
    description: "Gateway WebSocket com 32 eventos real-time",
    code: `@WebSocketGateway({ cors: true })
export class ChatGateway {
  @WebSocketServer()
  server: Server

  @SubscribeMessage('message:send')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: SendMessageDto
  ) {
    const message = await this.chatService
      .createMessage(payload)

    // Broadcast to room participants
    this.server
      .to(\`room:\${payload.roomId}\`)
      .emit('message:new', {
        ...message,
        sender: client.data.user,
        timestamp: new Date().toISOString(),
      })

    // Update unread counters
    await this.notificationService
      .incrementUnread(payload.roomId)
  }
}`,
  },
  {
    id: "finance",
    filename: "transaction.service.ts",
    language: "TypeScript",
    project: "Pulse Finance",
    projectColor: "#10b981",
    description: "Clean Architecture com repository pattern",
    code: `export class TransactionService {
  constructor(
    private readonly repo: TransactionRepository,
    private readonly cache: RedisCache,
    private readonly queue: BullMQQueue,
  ) {}

  async create(dto: CreateTransactionDto) {
    // Validate business rules
    await this.validateBalance(dto)

    const transaction = await this.repo.create({
      ...dto,
      status: 'pending',
      createdAt: new Date(),
    })

    // Invalidate dashboard cache
    await this.cache.invalidate(
      \`dashboard:\${dto.userId}\`
    )

    // Queue async processing
    await this.queue.add('process-transaction', {
      transactionId: transaction.id,
      priority: dto.amount > 10000 ? 1 : 5,
    })

    return transaction
  }
}`,
  },
];

// ---------------------------------------------------------------------------
// Commit log entries
// ---------------------------------------------------------------------------
const commits = [
  { hash: "a3f8d2e", msg: "feat(ds): add 12 new dashboard variants", time: "2h ago", project: "design-system" },
  { hash: "7c1b4f9", msg: "test(chat): WebSocket gateway 98 tests passing", time: "5h ago", project: "chat" },
  { hash: "e92d1a3", msg: "feat(finance): Redis cache + BullMQ queue", time: "1d ago", project: "finance" },
  { hash: "b4e7c8d", msg: "refactor(ds): migrate tokens to CSS variables", time: "2d ago", project: "design-system" },
  { hash: "1f3a9e2", msg: "fix(chat): race condition in room join", time: "3d ago", project: "chat" },
  { hash: "d8c2f5b", msg: "test(finance): 143 tests · Clean Architecture", time: "3d ago", project: "finance" },
  { hash: "f4a6e1c", msg: "feat(ds): responsive sidebar + mobile nav", time: "4d ago", project: "design-system" },
  { hash: "2b9d7f3", msg: "perf(chat): lazy load message history", time: "5d ago", project: "chat" },
];

const projectColors: Record<string, string> = {
  "design-system": "#6366f1",
  chat: "#14b8a6",
  finance: "#10b981",
};

// ---------------------------------------------------------------------------
// Typing animation for code
// ---------------------------------------------------------------------------
function useCodeTyping(code: string, isActive: boolean, speed = 12) {
  const [displayed, setDisplayed] = useState("");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setDisplayed("");
      setIsDone(false);
      return;
    }

    let i = 0;
    setDisplayed("");
    setIsDone(false);

    const timer = setInterval(() => {
      i++;
      if (i >= code.length) {
        setDisplayed(code);
        setIsDone(true);
        clearInterval(timer);
      } else {
        setDisplayed(code.slice(0, i));
      }
    }, speed);

    return () => clearInterval(timer);
  }, [code, isActive, speed]);

  return { displayed, isDone };
}

// ---------------------------------------------------------------------------
// Syntax highlighter (lightweight, no deps)
// ---------------------------------------------------------------------------
function highlightCode(code: string): string {
  return code
    // strings
    .replace(/(&#39;[^&#39;]*&#39;|'[^']*'|`[^`]*`)/g, '<span class="code-string">$1</span>')
    // keywords
    .replace(
      /\b(const|let|interface|export|function|async|await|return|new|import|from|class|extends|implements|type|readonly|private)\b/g,
      '<span class="code-keyword">$1</span>'
    )
    // types
    .replace(
      /\b(string|number|boolean|void|React|ReactNode|Server|Socket|Date)\b/g,
      '<span class="code-type">$1</span>'
    )
    // decorators
    .replace(/(@\w+)/g, '<span class="code-decorator">$1</span>')
    // comments
    .replace(/(\/\/.*)/g, '<span class="code-comment">$1</span>')
    // numbers
    .replace(/\b(\d+)\b/g, '<span class="code-number">$1</span>');
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------
export function CodeInAction() {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { displayed, isDone } = useCodeTyping(
    snippets[activeTab].code,
    isInView,
    8
  );

  useEffect(() => {
    const checkTheme = () => {
      setIsLightMode(document.documentElement.classList.contains("light-mode"));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(snippets[activeTab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section ref={sectionRef} id="code" className="relative py-24 md:py-32 overflow-hidden">
      {/* Animated Background */}
      {isLightMode ? <CodeInActionBackgroundLight /> : <CodeInActionBackground />}

      <div className="container-custom relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 code-section-badge"
          >
            <Terminal className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-medium">Engenharia Real</span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Código em <span className="gradient-text">Ação</span>
          </h2>
          <p className="code-subtitle max-w-2xl mx-auto">
            Snippets reais dos 3 projetos do Pulse Ecosystem.
            TypeScript rigoroso, arquitetura limpa, patterns de produção.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 items-stretch">
          {/* Code editor - 3 cols */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 flex"
          >
            <div className="code-editor rounded-none sm:rounded-2xl overflow-hidden group/editor flex flex-col w-screen sm:w-full -mx-4 sm:mx-0">
              {/* Top gradient accent bar */}
              <div className="h-[2px] bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500" />

              {/* Editor top bar */}
              <div className="code-editor-header flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                  {/* Traffic lights */}
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors" />
                  </div>
                  <FileCode2 className="w-4 h-4 text-[#6b7280]" />
                  <span className="text-xs text-[#9ca3af] font-mono">
                    {snippets[activeTab].filename}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-md font-mono font-semibold"
                    style={{
                      background: `${snippets[activeTab].projectColor}15`,
                      color: snippets[activeTab].projectColor,
                      border: `1px solid ${snippets[activeTab].projectColor}30`,
                    }}
                  >
                    {snippets[activeTab].language}
                  </span>
                  <button
                    onClick={handleCopy}
                    className="p-1.5 rounded-md hover:bg-white/10 transition-colors"
                    aria-label="Copiar código"
                  >
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-green-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-[#6b7280]" />
                    )}
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b code-tab-border">
                {snippets.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveTab(i)}
                    className={`relative px-4 py-2.5 text-xs font-medium transition-colors ${
                      activeTab === i
                        ? "text-white"
                        : "text-[#6b7280] hover:text-[#9ca3af]"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ background: s.projectColor }}
                      />
                      {s.project.replace("Pulse ", "")}
                    </span>
                    {activeTab === i && (
                      <motion.div
                        layoutId="codeTab"
                        className="absolute bottom-0 left-0 right-0 h-[2px]"
                        style={{ background: s.projectColor }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Code area with line numbers */}
              <div className="code-content flex-1 min-h-[300px] sm:min-h-[400px] overflow-auto font-mono text-[11px] sm:text-[13px] leading-relaxed">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex"
                  >
                    {/* Line numbers gutter */}
                    <div className="code-line-numbers select-none text-right pr-2 sm:pr-4 pl-2 sm:pl-4 py-3 sm:py-5 border-r border-white/[0.04]" aria-hidden="true">
                      {displayed.split("\n").map((_, i) => (
                        <div key={i} className="leading-relaxed">
                          {i + 1}
                        </div>
                      ))}
                    </div>
                    {/* Code */}
                    <pre className="whitespace-pre overflow-x-auto p-3 sm:p-5 flex-1 max-w-full">
                      <code
                        dangerouslySetInnerHTML={{
                          __html: highlightCode(displayed) + (isDone ? "" : '<span class="code-cursor">|</span>'),
                        }}
                      />
                    </pre>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom status bar */}
              <div className="code-status-bar flex items-center justify-between px-4 py-2 text-[10px]">
                <div className="flex items-center gap-3 text-[#6b7280]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    {snippets[activeTab].description}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[#6b7280] font-mono">
                  <span>UTF-8</span>
                  <span className="text-indigo-400/60">·</span>
                  <span>TypeScript</span>
                  <span className="text-indigo-400/60">·</span>
                  <span>Prettier</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Commit log - 2 cols */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2 flex"
          >
            <div className="code-commit-panel rounded-2xl overflow-hidden h-full flex flex-col w-full">
              {/* Top accent */}
              <div className="h-[2px] bg-gradient-to-r from-violet-500/50 via-indigo-500/50 to-violet-500/50" />

              {/* Panel header */}
              <div className="code-editor-header flex items-center gap-2 px-4 py-3">
                <GitCommit className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-semibold code-panel-title">
                  Commits Recentes
                </span>
                <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full code-commit-count font-mono font-semibold">
                  {commits.length}
                </span>
              </div>

              {/* Commit list */}
              <div className="p-3 space-y-2 flex-1">
                {commits.map((commit, i) => (
                  <motion.div
                    key={commit.hash}
                    initial={{ opacity: 0, x: 10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                    className="code-commit-item p-2.5 rounded-lg group"
                  >
                    <div className="flex items-start gap-3">
                      {/* Timeline dot */}
                      <div className="flex flex-col items-center gap-0.5 pt-0.5">
                        <div
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{
                            background: projectColors[commit.project],
                            boxShadow: `0 0 0 2px ${projectColors[commit.project]}25`,
                          }}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium code-commit-msg truncate leading-snug">
                          {commit.msg}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <code className="text-[10px] font-mono code-commit-hash px-1.5 py-0.5 rounded">
                            {commit.hash}
                          </code>
                          <span className="text-[10px] code-commit-time">
                            {commit.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Ecosystem stats */}
              <div className="px-3 pb-2">
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "Repos", value: "3", color: "#6366f1" },
                    { label: "Commits", value: "847", color: "#14b8a6" },
                    { label: "Lines", value: "52k", color: "#10b981" },
                  ].map((stat) => (
                    <div key={stat.label} className="code-commit-item rounded-lg p-2 text-center">
                      <p className="text-sm font-bold" style={{ color: stat.color }}>{stat.value}</p>
                      <p className="text-[9px] code-commit-time uppercase tracking-wider">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Run tests bar */}
              <div className="p-3">
                <div className="code-test-bar p-3 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Play className="w-3.5 h-3.5 text-green-400" />
                      <span className="text-xs font-semibold text-green-400">
                        All tests passing
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-green-400/60">✓ CI/CD</span>
                  </div>
                  <div className="flex items-center gap-4 text-[10px] code-test-stats">
                    <span>
                      <span className="text-green-400 font-bold">381</span> passed
                    </span>
                    <span>
                      <span className="text-red-400 font-bold">0</span> failed
                    </span>
                    <span>
                      <span className="text-yellow-400 font-bold">0</span> skipped
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div className="mt-2 h-1.5 rounded-full bg-green-500/10 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: "100%" } : {}}
                      transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-400"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
