# Anthropic | OpenAI | Google

Anthropic은 전문가에게 '일의 깊이'를,
OpenAI는 '일상의 넓이'를,
구글은 '판의 크기'를 키우는 전략이었던 25년

| 회사      | 핵심 전략                                         | 상징 제품              |
| --------- | ------------------------------------------------- | ---------------------- |
| Anthropic | **개발자 생산성** (IDE → Browser → Skills)        | Claude Code            |
| OpenAI    | **소비자 플랫폼** (ChatGPT 중심 확장)             | GPT-5 + Atlas          |
| Google    | **인프라 지배** (Search + Workspace + Cloud 통합) | Gemini 3 + Antigravity |

## Anthropic

### 25.2월

- [Claude 3.7 Sonnet 출시](https://www.anthropic.com/news/claude-3-7-sonnet) - 하이브리드 추론 모델
  - 하나의 모델에서 빠른 응답 / extended thinking(깊은 사고) 모드 선택 가능
  > 빼기

- `Claude Code` Research Preview 함께 발표 
  - 터미널(CLI) 기반 에이전틱 코딩 도구. 파일 읽기/수정, 명령어 실행까지 가능
  - 당시 Cursor 같은 IDE 통합형이 주류였는데, CLI로 나온 게 영리했음
  - "터미널이라서 어떤 IDE든 가져다 쓸 수 있다" - Anthropic 엔지니어
  > 중요!
  > 미디어 필요

### 25.3월

- [웹 검색 기능 출시](https://claude.com/blog/web-search): 경쟁사 대비 늦은 편

- [OpenAI가 MCP 공식 채택](https://openai.github.io/openai-agents-python/mcp/) 
  - 챗GPT 데스크톱 앱, Agents SDK 등에 적용
  > 추가 필요

### 25.5월

- [Claude 4 출시](https://www.anthropic.com/news/claude-4)
  - Opus 4: 테스트에서 7시간 연속 작업 수행, 내부 안전 등급 "Level 3" (4단계 중)
  - extended thinking + tool use 동시 사용 가능
  > 빼기

- `Claude Code` 정식 출시
  - IDE 플러그인(VS Code, JetBrains), GitHub 통합
  - Claude Code SDK 공개 - 개발자가 직접 에이전트 구축 가능
  > 미디어 필요

### 25.8월

- [Claude Opus 4.1](https://www.anthropic.com/news/claude-opus-4-1)
  - Opus 4의 업그레이드 버전, 코딩 능력 대폭 향상
  - 코딩 벤치마크(SWE-bench) 74.5% 달성
  > 빼기

- [Claude for Chrome Research Preview](https://claude.com/blog/claude-for-chrome)
  - 크롬 브라우저에서 바로 쓰는 AI 비서
  - 웹서핑하면서 옆에서 Claude가 도와줌 (사이드 패널)
  - 캘린더 일정 잡기, 이메일 정리, 파일 관리까지 자동화
  - Max 구독자 1,000명 한정 테스트로 시작
  > 미디어 추가 필요

- 기타: Voice mode(음성 대화), 메모리 기능(대화 내용 기억) 추가

### 25.9월

- [Claude Sonnet 4.5 출시](https://www.anthropic.com/news/claude-sonnet-4-5)
  - "세계 최고의 코딩 모델" - Anthropic 공식 주장
  - 혼자서 30시간 연속 작업 가능 (이전 Opus 4는 7시간)
  - 컴퓨터 사용 능력 대폭 향상 (OSWorld 벤치마크 42% → 61%)
  > 빼기

- [Claude 파일 생성 기능 발표](https://claude.com/blog/create-files)
  - Excel, Word, PPT, PDF를 AI가 직접 만들어줌
  - "재무 모델 만들어줘" → 수식 포함된 엑셀 파일 뚝딱
  - 미디어 자료 필요
  > 미디어 추가 필요

### 25.10월

- [Claude Haiku 4.5](https://www.anthropic.com/news/claude-haiku-4-5)
  - 작고 빠른 경량 모델, 근데 성능은 Sonnet 4급
  - 가격은 1/3, 속도는 2배 이상 빠름
  > 빼기

- [Claude Skills 발표](https://www.anthropic.com/news/skills)
  - Claude에게 "전문 스킬"을 장착시키는 기능
  - 예: 엑셀 전문가 스킬, 브랜드 가이드라인 스킬 등
  - 필요할 때만 불러와서 사용 → 효율적
  > 미디어 추가 필요

### 25.11월

- [Claude Code 웹 버전](https://www.anthropic.com/news/claude-code-on-the-web)
  - 터미널 없이 브라우저에서 코딩 에이전트 사용
  - 여러 작업을 동시에 돌려놓고 모니터링 가능

- **Claude Code 연간 매출 $10억 달성** (5월 정식 출시 후 6개월 만)

  - Netflix, Spotify, KPMG, 로레알 등 글로벌 기업들이 사용 중

- [Claude Opus 4.5 출시](https://www.anthropic.com/news/claude-opus-4-5)
  - "세계 최고의 코딩·에이전트·컴퓨터 사용 모델" - Anthropic
  - 코딩 벤치마크(SWE-bench) **최초 80% 돌파** (80.9%)
  - 가격 3배 인하: $15 → $5 (입력 토큰 기준)
  > 빼기

- Claude for Excel 베타 출시
  > 미디어 추가 필요

> 🗣️ **해외 반응 (Reddit/HN)**
>
> - "AI 역사상 가장 미친 주. 7일 동안 '최고 모델'이 3번 바뀜" (Gemini 3 → GPT-5.1 → Opus 4.5)
> - "에이전트 시대를 연 모델. GPT-4가 채팅, Sonnet 3.5가 코딩이었다면, Opus 4.5는 에이전트"
> - "가격 인하는 환영. 근데 컨텍스트 20만은 아쉬움 (Gemini는 100만)"

### 25.12월

- [Bun 인수](https://www.anthropic.com/news/anthropic-acquires-bun-as-claude-code-reaches-usd1b-milestone)
  - Bun = 초고속 JavaScript 런타임 (Node.js 대체재)
  - Claude Code가 Bun 위에서 돌아감 → 핵심 인프라 내재화
  - 오픈소스(MIT 라이선스) 유지 약속
  > 빼기

- [Claude Code in Slack](https://claude.com/blog/claude-code-and-slack)
  - Slack 채팅에서 바로 코딩 작업 지시 가능
  - "이 버그 고쳐줘" → Claude가 알아서 코드 수정
  > 미디어 추가 필요

- [Claude for Chrome 정식 출시](https://www.anthropic.com/news/claude-for-chrome)
  - 8월 Research Preview → 11월 Max 전용 → **12월 모든 유료 구독자 확대**
  - Claude Code 통합, 워크플로우 녹화/학습 기능 추가
  > 미디어 추가 필요

- MCP(Model Context Protocol)를 재단에 기부 → 업계 오픈 표준화 추진
  > 미디어 추가 필요


> 🗣️ **해외 반응 (Reddit/HN)**
> - "Bun 오픈소스 유지한다니 다행. 근데 인수 후 '아무것도 안 바뀐다'는 말, 몇 년 지나면 항상 달라짐"
> - "Claude Code가 Bun으로 돌아가는 줄 몰랐음. 이제 이해됨"
> - "MCP 기부는 영리한 수. 표준 선점하려는 전략"

### 25년 총평 및 인사이트

- 2025년 전략 총평: "AI for Builders (개발자의 워크플로우 장악)"
  2025년 앤스로픽은 일반 대중보다는 **'실제 일을 하는 사람들(Builders & Workers)'**에 집중했습니다. 단순히 똑똑한 채팅봇을 넘어, IDE(Claude Code)와 브라우저(Claude for Chrome)로 확장하며 개발자와 지식 근로자의 작업 환경 자체를 점유하는 '워크플로우 침투 전략'을 성공적으로 수행했습니다.

- 가장 임팩트 있었던 모멘텀: Claude Code의 정식 출시와 매출 $10억 달성
  단순한 코딩 보조를 넘어, 파일 생성부터 배포까지 가능한 '에이전트'로서의 가능성을 입증했습니다. 특히 VS Code, JetBrains 등 기존 생태계에 플러그인 형태로 침투하여 실질적인 수익 모델을 증명해낸 점이 결정적이었습니다.

- Next Step & 기대 포인트: "The Anywhere Interface (플랫폼을 초월한 침투)"
  앤스로픽은 거대한 자체 OS나 플랫폼을 만드는 대신, 사용자가 있는 곳이면 어디든 가볍게 붙는 **'플러그인 전략'**을 취할 것입니다.

가장 원초적인 환경인 **터미널(CLI)**에는 Claude Code로, 가장 대중적인 브라우저에는 Claude for Chrome으로 침투했듯, 특정 플랫폼에 종속되지 않고 모든 업무 환경 위에서 작동하는 **'범용 에이전트 레이어(Universal Agent Layer)'**가 되는 것이 그들의 전략으로 보입니다.

---

## OpenAI

### 25.1월

- [Operator 출시](https://openai.com/index/introducing-operator/)
  - 브라우저 제어 에이전트 최초 공개
  - Anthropic의 Computer Use에 대응하는 소비자용 자동화 도구

### 25.2월

- [Deep Research 정식 출시](https://openai.com/index/introducing-deep-research/)
  - "보고서 써줘" 하면 혼자 30분동안 웹서핑하고 다양한 키워드들로 다양한 소스 분석후 보고서 작성
- [GPT4.5 공개](https://openai.com/index/introducing-gpt-4-5/)

### 25.4월

- [o-series 추론 모델 공개](https://openai.com/index/introducing-o3-and-o4-mini/)

### 25.5월

- [io Porudcts 인수 발표](https://openai.com/sam-and-jony/)
  - Jony Ive가 설립한 하드웨어 스타트업 전격 인수
  - 스크린 없는 AI 디바이스 개발 공식화
- [Codex Research Preview](https://openai.com/ko-KR/index/introducing-codex/)

### 25.7월

- [Operator가 ChatGPT에 완전 통합](https://openai.com/ko-KR/index/introducing-chatgpt-agent/)
  - 별도 사이트 폐쇄, ChatGPT의 "Agent Mode"로 편입
  - "글쓰기(Chat)"와 "일하기(Agent)" 모드를 스위칭하는 UI 도입

### 25.8월

- [GPT-5 출시](https://openai.com/ko-KR/index/introducing-gpt-5/)

- [Codex CLI 출시](https://developers.openai.com/codex/cli/)

### 25.9월

- [Sora 2 출시](https://openai.com/index/sora-2/)
  - Sora iOS 앱 roll out, 틱톡 같은 SNS

### 25.10월

- [챗GPT Atlas 브라우저 공개](https://openai.com/index/introducing-chatgpt-atlas/)

### 25.11월

- [GPT-5.1](https://openai.com/index/gpt-5-1/)

### 25.12월

- [GPT-5.2](https://openai.com/index/introducing-gpt-5-2/)

- [Codex Skills 도입](https://developers.openai.com/codex/skills/)

  - Anthropic의 Skills 개념을 Codex CLI와 ChatGPT에 채택
  - `SKILL.md` 마크다운 파일로 에이전트에게 "전문 스킬" 장착
  - `~/.codex/skills` 폴더에 저장, `codex --enable skills`로 활성화
  - Anthropic이 만든 오픈 표준이 업계 표준으로 확산되는 신호

- [Disney x Sora 파트너십](https://openai.com/index/disney-sora-agreement/)

### 25년 총평 및 인사이트

- 2025년 전략 총평
  Operator와 Atlas 등을 통해 **'소비자 플랫폼'**으로서의 입지를 굳건히 다졌으나, 하반기 구글의 기술적 퀀텀 점프(Gemini 3.0)로 인해 전략 수정이 불가피해졌습니다. 플랫폼 장악에는 성공했으나, **'가장 똑똑한 AI'**라는 핵심 정체성이 위협받으며 한 해를 긴장 속에 마무리하게 되었습니다.

- 가장 임팩트 있었던 모멘텀: GPT-5 출시와 Sora 2 앱 런칭
  GPT-5를 통해 다시 한번 모델 성능의 격차(Super-intelligence)를 증명함과 동시에, Sora를 틱톡과 같은 소셜 미디어 형태로 풀어내며 AI가 '도구'가 아닌 '놀이 문화'가 될 수 있음을 보여주었습니다.

- Next Step & 기대 포인트: "Code Red II: 다시, 압도적 지능으로"
  Jony Ive와 협업 중인 AI 하드웨어 디바이스가 'Next Big Thing'으로 대기 중이지만, 내부적으로는 11월 구글의 약진에 따른 '제2의 코드 레드' 분위기가 감지됩니다. 당분간은 폼팩터 확장보다는 차세대 모델(GPT-6) 연구와 모델 성능 격차 벌리기에 모든 역량을 다시 집중하며 '지능의 왕좌'를 탈환하려 할 것입니다.

---

## Google

### 25.2월

- [Gemini 2.0 Pro & Flash-Lite](https://blog.google/technology/google-deepmind/gemini-model-updates-february-2025/)

### 25.3월

- [Gemini 2.5 Pro Experimental](https://blog.google/technology/google-deepmind/gemini-model-thinking-updates-march-2025/)

### 25.4월

- [NotebookLM Audio Overviews](https://blog.google/technology/google-labs/notebooklm-audio-overviews-50-languages/)

### 25.5월

- [Google I/O](https://blog.google/technology/ai/io-2025-keynote/)

  - [Veo 3](https://deepmind.google/models/veo/): 세계최초 네이티브 오디오 포함 비디오 생성
  - [Imagen 4](https://deepmind.google/models/imagen/)
  - https://blog.google/technology/ai/generative-media-models-io-2025/

  - [Google AI Studio](https://aistudio.google.com/)

### 25.6월

- [Gemini CLI](https://blog.google/technology/developers/introducing-gemini-cli-open-source-ai-agent/)

### 25.8월

- [Nano Banana](https://blog.google/products/gemini/updated-image-editing-model/)
- NotebookLM Video Overviews

### 25.10월

- [Veo 3.1](https://gemini.google/kr/overview/video-generation/?hl=ko): Image Bridging, scene extension

### 25.11월

- [Gemini 3.0 Pro + Deep Think](https://blog.google/products/gemini/gemini-3/)
- [Google Antigravity IDE](https://antigravity.google/blog/introducing-google-antigravity): VS Code 포크 기반, agent-first IDE
- [Nano Banana Pro](https://blog.google/technology/ai/nano-banana-pro/): 11월
- [Generative UI](https://research.google/blog/generative-ui-a-rich-custom-visual-interactive-user-experience-for-any-prompt/)

### 25.12월

- [Gen Tabs](https://labs.google/disco)

### 25년 총평 및 인사이트

- 2025년 전략 총평: "Integrated Empire (인프라와 서비스의 수직 계열화)"
  구글은 자신들이 가진 가장 강력한 무기인 **'검색-워크스페이스-클라우드'**를 AI 하나로 묶어냈습니다. Gemini 3라는 압도적 두뇌에 Antigravity IDE라는 개발 환경, 그리고 Veo/Imagen의 멀티모달 기능까지 더해, 경쟁사들이 흉내 낼 수 없는 거대한 '수직 계열화'를 완성했습니다.

- 가장 임팩트 있었던 모멘텀: Gemini 3.0의 LMArena 1500점 돌파 & Antigravity IDE
  모델 성능 전쟁에서 다시 1위를 탈환하며 '기술의 구글' 위상을 회복했습니다. 또한 VS Code 포크 기반의 자체 IDE 출시는 구글 클라우드와 AI 모델을 락인(Lock-in) 시키는 가장 강력한 한 수가 되었습니다.

- Next Step & 기대 포인트: "Physical AI (로보틱스와의 결합)"
  DeepMind의 로보틱스 연구가 구체화되고 있습니다. 소프트웨어 상의 지능을 넘어, 실제 물리 세계를 이해하고 제어하는 로봇 지능(Embodied AI) 분야에서 구글이 가장 먼저 유의미한 상용화 사례를 만들 것으로 기대됩니다.

---

## 라이브 세션에서 줄만한 메시지나 키워드

[Thinking about Thinking](https://www.youtube.com/watch?v=d95J8yzvjbQ&t=4901s)

[고졸 OpenAI Engineer](https://www.youtube.com/watch?v=vq5WhoPCWQ8)

[바이브 코딩](https://x.com/karpathy/status/1886192184808149383)

[LLM한테 “너는 어떻게 생각해?”라고 묻지 마세요](https://x.com/karpathy/status/1997731268969304070)

[Context Engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)

[Agents](https://agents.md/)
https://aaif.io/

---

