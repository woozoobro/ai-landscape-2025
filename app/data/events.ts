export type Company = "Anthropic" | "OpenAI" | "Google";

export interface EventNode {
  id: string;
  label: string;
  company: Company;
  date: string; // YYYY-MM
  description: string;
  importance: 1 | 2 | 3 | 4 | 5; // 1=minor, 5=major milestone
  position?: [number, number, number]; // To be calculated or preset
  media?: {
    type: "image" | "webm" | "mp4";
    src: string; // /media/filename.webm or /media/filename.png
  };
  sources?: Array<{
    label?: string; // "공식 발표", "문서" 등 (없으면 URL만 표시)
    url: string;
  }>;
}

export const events: EventNode[] = [
  // ============================================
  // Anthropic (8개)
  // ============================================
  {
    id: "a-code-preview",
    label: "Claude Code Preview",
    company: "Anthropic",
    date: "2025-02",
    description: "터미널 기반 에이전틱 코딩 도구. 파일 읽기/수정, 명령어 실행 가능. IDE가 아닌 CLI로 출시한 게 영리했음.",
    importance: 5,
    media: {
      type: "image",
      src: "/claude-code-preview.webp",
    },
    sources: [
      { label: "공식 발표", url: "https://www.anthropic.com/news/claude-3-7-sonnet" },
    ],
  },
  {
    id: "a-mcp-openai",
    label: "MCP, OpenAI 채택",
    company: "Anthropic",
    date: "2025-03",
    description: "OpenAI가 MCP 공식 채택. ChatGPT 데스크톱 앱, Agents SDK에 적용. 웹 검색 기능도 함께 출시.",
    importance: 3,
    media: {
      type: "image",
      src: "/openai-mcp-tweet.png",
    },
    sources: [
      { label: "OpenAI MCP 문서", url: "https://openai.github.io/openai-agents-python/mcp/" },
      { label: "웹 검색 출시", url: "https://claude.com/blog/web-search" },
    ],
  },
  {
    id: "a-code-release",
    label: "Claude Code 정식",
    company: "Anthropic",
    date: "2025-05",
    description: "IDE 플러그인(VS Code, JetBrains), GitHub 통합, SDK 공개. 개발자가 직접 에이전트 구축 가능.",
    importance: 5,
    media: {
      type: "image",
      src: "/claude-code-demo.gif",
    },
    sources: [
      { label: "Claude 4 발표", url: "https://www.anthropic.com/news/claude-4" },
    ],
  },
  {
    id: "a-chrome",
    label: "Claude for Chrome",
    company: "Anthropic",
    date: "2025-08",
    description: "크롬 확장 프로그램 Research Preview. 캘린더, 이메일, 파일 관리 자동화. Max 구독자 1,000명 한정 테스트.",
    importance: 5,
    media: {
      type: "image",
      src: "/beta-claude-chrome.png",
    },
    sources: [
      { label: "공식 블로그", url: "https://claude.com/blog/claude-for-chrome" },
    ],
  },
  {
    id: "a-files",
    label: "파일 생성 기능",
    company: "Anthropic",
    date: "2025-09",
    description: "Excel, Word, PPT, PDF를 AI가 직접 생성. 수식 포함된 재무 모델도 가능.",
    importance: 3,
    media: {
      type: "mp4",
      src: "/claude-file-creation.mp4",
    },
    sources: [
      { label: "공식 블로그", url: "https://claude.com/blog/create-files" },
    ],
  },
  {
    id: "a-skills",
    label: "Claude Skills",
    company: "Anthropic",
    date: "2025-10",
    description: "Claude에게 전문 스킬 장착. 엑셀 전문가, 브랜드 가이드라인 등 필요할 때만 불러서 사용.",
    importance: 5,
    media: {
      type: "mp4",
      src: "/claude-skills.mp4",
    },
    sources: [
      { label: "공식 발표", url: "https://www.anthropic.com/news/skills" },
    ],
  },
  {
    id: "a-excel",
    label: "Claude in Excel",
    company: "Anthropic",
    date: "2025-11",
    description: "Microsoft Excel에 Claude가 빌트인. 스프레드시트 작업을 자연어로 처리.",
    importance: 3,
    media: {
      type: "image",
      src: "/claude-in-excel.png",
    },
    sources: [
      { label: "Claude in Excel", url: "https://www.claude.com/claude-in-excel" },
    ],
  },
  {
    id: "a-chrome-mcp",
    label: "MCP 표준화",
    company: "Anthropic",
    date: "2025-12",
    description: "Claude Code 매출 약 1조원 달성. Slack 통합. Claude for Chrome 모든 유료 구독자 확대. MCP를 재단에 기부하여 업계 오픈 표준화. Bun 인수.",
    importance: 5,
    media: {
      type: "mp4",
      src: "/claude-in-chrome-official.mp4",
    },
    sources: [
      { label: "Claude Code $1B", url: "https://www.anthropic.com/news/anthropic-acquires-bun-as-claude-code-reaches-usd1b-milestone" },
      { label: "Slack 통합", url: "https://claude.com/blog/claude-code-and-slack" },
      { label: "Chrome 정식", url: "https://www.anthropic.com/news/claude-for-chrome" },
      { label: "MCP 재단 기부", url: "https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation" },
    ],
  },

  // ============================================
  // OpenAI (13개)
  // ============================================
  {
    id: "o-operator",
    label: "Operator",
    company: "OpenAI",
    date: "2025-01",
    description: "브라우저 제어 에이전트 최초 공개. Computer Use 대응.",
    importance: 4,
  },
  {
    id: "o-deep-research",
    label: "Deep Research",
    company: "OpenAI",
    date: "2025-02",
    description: "30분간 자율 웹서핑 후 보고서 작성. 다양한 소스 분석.",
    importance: 3,
  },
  {
    id: "o-gpt4.5",
    label: "GPT-4.5",
    company: "OpenAI",
    date: "2025-02",
    description: "GPT-4 계열 점진적 업그레이드.",
    importance: 3,
  },
  {
    id: "o-oseries",
    label: "o-series",
    company: "OpenAI",
    date: "2025-04",
    description: "새로운 추론 모델 라인업 공개 (o3, o4-mini).",
    importance: 4,
  },
  {
    id: "o-ioproducts",
    label: "io Products",
    company: "OpenAI",
    date: "2025-05",
    description: "Jony Ive 하드웨어 스타트업 인수. 스크린 없는 AI 디바이스 개발.",
    importance: 4,
  },
  {
    id: "o-codex-preview",
    label: "Codex Preview",
    company: "OpenAI",
    date: "2025-05",
    description: "새로운 코딩 모델 Research Preview.",
    importance: 3,
  },
  {
    id: "o-operator-chatgpt",
    label: "Operator → ChatGPT",
    company: "OpenAI",
    date: "2025-07",
    description: "Operator가 ChatGPT에 완전 통합. Agent Mode로 편입.",
    importance: 3,
  },
  {
    id: "o-gpt5",
    label: "GPT-5",
    company: "OpenAI",
    date: "2025-08",
    description: "차세대 플래그십 모델 출시.",
    importance: 5,
  },
  {
    id: "o-codex-cli",
    label: "Codex CLI",
    company: "OpenAI",
    date: "2025-08",
    description: "커맨드라인 코딩 도구 출시.",
    importance: 3,
  },
  {
    id: "o-sora2",
    label: "Sora 2",
    company: "OpenAI",
    date: "2025-09",
    description: "비디오 생성 모델. iOS 앱으로 틱톡 같은 SNS 형태 출시.",
    importance: 4,
  },
  {
    id: "o-atlas",
    label: "Atlas Browser",
    company: "OpenAI",
    date: "2025-10",
    description: "ChatGPT 전용 브라우저 공개.",
    importance: 4,
  },
  {
    id: "o-gpt5.1",
    label: "GPT-5.1",
    company: "OpenAI",
    date: "2025-11",
    description: "GPT-5 개선 버전.",
    importance: 3,
  },
  {
    id: "o-gpt5.2",
    label: "GPT-5.2",
    company: "OpenAI",
    date: "2025-12",
    description: "GPT-5 추가 개선.",
    importance: 3,
  },
  {
    id: "o-disney",
    label: "Disney x Sora",
    company: "OpenAI",
    date: "2025-12",
    description: "디즈니와 비디오 콘텐츠 파트너십 체결.",
    importance: 4,
  },

  // ============================================
  // Google (13개)
  // ============================================
  {
    id: "g-gemini2pro",
    label: "Gemini 2.0 Pro",
    company: "Google",
    date: "2025-02",
    description: "Gemini 2.0 Pro & Flash-Lite 공개.",
    importance: 3,
  },
  {
    id: "g-gemini2.5",
    label: "Gemini 2.5",
    company: "Google",
    date: "2025-03",
    description: "Experimental thinking 기능 업데이트.",
    importance: 4,
  },
  {
    id: "g-notebook-audio",
    label: "NotebookLM Audio",
    company: "Google",
    date: "2025-04",
    description: "Audio Overviews 50개 언어로 확대.",
    importance: 3,
  },
  {
    id: "g-io2025",
    label: "Google I/O 2025",
    company: "Google",
    date: "2025-05",
    description: "Veo 3 (네이티브 오디오 비디오), Imagen 4 발표.",
    importance: 4,
  },
  {
    id: "g-gemini-cli",
    label: "Gemini CLI",
    company: "Google",
    date: "2025-06",
    description: "오픈소스 AI 에이전트 CLI 도구.",
    importance: 3,
  },
  {
    id: "g-nano-banana",
    label: "Nano Banana",
    company: "Google",
    date: "2025-08",
    description: "온디바이스 이미지 편집 모델.",
    importance: 2,
  },
  {
    id: "g-notebook-video",
    label: "NotebookLM Video",
    company: "Google",
    date: "2025-08",
    description: "Video Overviews 기능 추가.",
    importance: 2,
  },
  {
    id: "g-veo3.1",
    label: "Veo 3.1",
    company: "Google",
    date: "2025-10",
    description: "Image Bridging, scene extension 기능 추가.",
    importance: 3,
  },
  {
    id: "g-gemini3",
    label: "Gemini 3.0",
    company: "Google",
    date: "2025-11",
    description: "Deep Think 탑재. LMArena 1500점 돌파로 1위 탈환.",
    importance: 5,
  },
  {
    id: "g-antigravity",
    label: "Antigravity IDE",
    company: "Google",
    date: "2025-11",
    description: "VS Code 포크 기반 agent-first IDE. 구글 클라우드 락인.",
    importance: 4,
  },
  {
    id: "g-nano-pro",
    label: "Nano Banana Pro",
    company: "Google",
    date: "2025-11",
    description: "온디바이스 이미지 편집 모델 업그레이드.",
    importance: 2,
  },
  {
    id: "g-genui",
    label: "Generative UI",
    company: "Google",
    date: "2025-11",
    description: "프롬프트로 커스텀 UI 자동 생성.",
    importance: 3,
  },
  {
    id: "g-gentabs",
    label: "Gen Tabs",
    company: "Google",
    date: "2025-12",
    description: "Generative UI 실험 프로젝트.",
    importance: 2,
  },
];
