# Anthropic | OpenAI | Google
Anthropic은 전문가에게 '일의 깊이'를, 
OpenAI는 '일상의 넓이'를, 
구글은 '판의 크기'를 키우는 전략이었던 25년

| 회사 | 핵심 전략 | 상징 제품 |
|------|----------|----------|
| Anthropic | **개발자 생산성** (IDE → Browser → Skills) | Claude Code |
| OpenAI | **소비자 플랫폼** (ChatGPT 중심 확장) | GPT-5 + Atlas |
| Google | **인프라 지배** (Search + Workspace + Cloud 통합) | Gemini 3 + Antigravity |

## Anthropic

### 25.2월
- `Claude 3.7 Sonnet` 출시 (2월 24일) - 하이브리드 추론 모델
  - 하나의 모델에서 빠른 응답 / extended thinking(깊은 사고) 모드 선택 가능  
- `Claude Code` Research Preview 함께 발표
  - 터미널(CLI) 기반 에이전틱 코딩 도구. 파일 읽기/수정, 명령어 실행까지 가능
  - 당시 Cursor 같은 IDE 통합형이 주류였는데, CLI로 나온 게 영리했음
  - "터미널이라서 어떤 IDE든 가져다 쓸 수 있다" - Anthropic 엔지니어

### 25.3월
- 웹 검색 기능 출시 (경쟁사 대비 늦은 편)
- OpenAI가 MCP 공식 채택, 챗GPT 데스크톱 앱, Agents SDK 등에 적용

### 25.5월
- `Claude 4` (Opus 4 & Sonnet 4) 출시 (5월 22일)
  - Opus 4: 테스트에서 7시간 연속 작업 수행, 내부 안전 등급 "Level 3" (4단계 중)
  - extended thinking + tool use 동시 사용 가능
- `Claude Code` 정식 출시
  - IDE 플러그인(VS Code, JetBrains), GitHub 통합
  - Claude Code SDK 공개 - 개발자가 직접 에이전트 구축 가능

### 25.8월
- `Claude Opus 4.1` 출시 (8월 5일)
  - Opus 4의 업그레이드 버전, 코딩 능력 대폭 향상
  - 코딩 벤치마크(SWE-bench) 74.5% 달성

- `Claude for Chrome` Research Preview (8월 25일)
  - 크롬 브라우저에서 바로 쓰는 AI 비서
  - 웹서핑하면서 옆에서 Claude가 도와줌 (사이드 패널)
  - 캘린더 일정 잡기, 이메일 정리, 파일 관리까지 자동화
  - Max 구독자 1,000명 한정 테스트로 시작

- 기타: Voice mode(음성 대화), 메모리 기능(대화 내용 기억) 추가

> 🗣️ **해외 반응 (Reddit/HN)**
> - "캘린더 일정 잡아달라고 했더니 회의 상세, 초대장, 안건까지 알아서 채워줌. 진짜 비서 같음"
> - "근데 보안이 좀 걱정됨. 악성 이메일이 Claude한테 '이메일 삭제해'라고 지시하면 진짜 삭제해버림" (테스트 결과 11%는 속음)
> - "가격이 GPT보다 비싸서 좀..."

### 25.9월
- `Claude Sonnet 4.5` 출시 (9월 29일)
  - "세계 최고의 코딩 모델" - Anthropic 공식 주장
  - 혼자서 30시간 연속 작업 가능 (이전 Opus 4는 7시간)
  - 컴퓨터 사용 능력 대폭 향상 (OSWorld 벤치마크 42% → 61%)

- Claude 파일 생성 기능 발표 (정식 출시는 10월)
  - Excel, Word, PPT, PDF를 AI가 직접 만들어줌
  - "재무 모델 만들어줘" → 수식 포함된 엑셀 파일 뚝딱

> 🗣️ **해외 반응 (Reddit/HN)**
> - "코딩은 확실히 좋아졌는데, 성격이 좀 공격적으로 변한 느낌"
> - "버그 잡아달라고 했더니 이미 고쳐진 부분을 자꾸 수정함. 결국 내가 직접 해결"
> - "GPT-5 대비 엄청 큰 발전은 아닌 듯"

### 25.10월
- `Claude Haiku 4.5` 출시 (10월 15일)
  - 작고 빠른 경량 모델, 근데 성능은 Sonnet 4급
  - 가격은 1/3, 속도는 2배 이상 빠름
  - **무료 사용자도 이용 가능** (파격적 결정)

- `Claude Skills` 발표 (10월 16일)
  - Claude에게 "전문 스킬"을 장착시키는 기능
  - 예: 엑셀 전문가 스킬, 브랜드 가이드라인 스킬 등
  - 필요할 때만 불러와서 사용 → 효율적

- `Claude Code 웹 버전` 출시 (10월 20일)
  - 터미널 없이 브라우저에서 코딩 에이전트 사용
  - 여러 작업을 동시에 돌려놓고 모니터링 가능

> 🗣️ **해외 반응 (Reddit/HN)**
> - Haiku 4.5: "속도 괴물. UI 작업엔 최고인데, 긴 세션에선 흐름 놓침"
> - Skills: "MCP보다 더 큰 변화일 수도" - Simon Willison
> - Claude Code 웹: "드디어 터미널 안 써도 됨. 비개발자도 접근 가능해짐"

### 25.11월
- **Claude Code 연간 매출 $10억 달성** (5월 정식 출시 후 6개월 만)
  - Netflix, Spotify, KPMG, 로레알 등 글로벌 기업들이 사용 중

- `Claude Opus 4.5` 출시 (11월 24일)
  - "세계 최고의 코딩·에이전트·컴퓨터 사용 모델" - Anthropic
  - 코딩 벤치마크(SWE-bench) **최초 80% 돌파** (80.9%)
  - 가격 3배 인하: $15 → $5 (입력 토큰 기준)

- **Microsoft & NVIDIA 파트너십** (11월 18일)
  - NVIDIA $100억 + Microsoft $50억 투자 유치
  - 1기가와트 규모 AI 컴퓨팅 인프라 구축

- **$500억 미국 데이터센터 투자** 발표 (11월 13일)
  - 텍사스, 뉴욕에 전용 데이터센터 건설 (2026년 가동)

- Claude for Excel 정식 출시, Claude for Chrome 확대
- "Endless chat" 기능: 대화 길이 제한 없이 계속 대화 가능

> 🗣️ **해외 반응 (Reddit/HN)**
> - "AI 역사상 가장 미친 주. 7일 동안 '최고 모델'이 3번 바뀜" (Gemini 3 → GPT-5.1 → Opus 4.5)
> - "에이전트 시대를 연 모델. GPT-4가 채팅, Sonnet 3.5가 코딩이었다면, Opus 4.5는 에이전트"
> - "가격 인하는 환영. 근데 컨텍스트 20만은 아쉬움 (Gemini는 100만)"

### 25.12월
- **Bun 인수** (12월 3일) - Anthropic 첫 번째 인수!
  - Bun = 초고속 JavaScript 런타임 (Node.js 대체재)
  - Claude Code가 Bun 위에서 돌아감 → 핵심 인프라 내재화
  - 오픈소스(MIT 라이선스) 유지 약속

- `Claude Code in Slack` (12월 8일)
  - Slack 채팅에서 바로 코딩 작업 지시 가능
  - "이 버그 고쳐줘" → Claude가 알아서 코드 수정

- **대형 파트너십 연달아 발표**
  - Snowflake $2억 파트너십 (12월 3일): 12,600개 기업에 Claude 제공
  - Accenture 파트너십 (12월 9일): 컨설턴트 3만 명 Claude 교육

- MCP(Model Context Protocol)를 재단에 기부 → 업계 오픈 표준화 추진

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

가장 원초적인 환경인 **터미널(CLI)**에는 Claude Code로, 가장 대중적인 브라우저에는 Claude for Chrome으로 침투했듯, 특정 플랫폼에 종속되지 않고 모든 업무 환경 위에서 작동하는 **'범용 에이전트 레이어(Universal Agent Layer)'**가 되는 것이 그들의 최종 목표로 보입니다.

---

## OpenAI
### 25.1월 
- Operator 출시
    - 브라우저 제어 에이전트 최초 공개
    - Claude의 Computer Use에 대응하는 소비자용 자동화 도구
    - Anthropic의 Computer Use에 대응하는 전략

### 25.2월
- Deep Research 정식 출시
- GPT4.5 공개

### 25.4월
- o-series 추론 모델 공개: o3 &o4-mini

- Codex CLI 오픈소스 출시

### 25.5월
- Codex(클라우드 코딩 에이전트) Research Preview 출시
    - https://openai.com/ko-KR/index/introducing-codex/

### 25.8월
- GPT-5 출시
    - https://openai.com/ko-KR/index/introducing-gpt-5/

- Codex 대규모 업그레이드
    - IDE 확장/CLI/웹/모바일 "개발 환경 전반" 확장 강조

### 25.9월
- Sora 2 출시
    - Sora iOS 앱 roll out, 틱톡 같은 SNS

### 25.10월
- 챗GPT Atlas (브라우저) 공개

### 25.11월
GPT-5.1

### 25.12월
GPT-5.2

Disney랑 협업

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
- Gemini 2.0 Pro & Flash-Lite

### 25.3월
- Gemini 2.5 Pro Experimental: 3/25 - 첫 "thinking" 모델, LMArena 1위

### 25.4월
- NotebookLM Audio Overviews

### 25.5월 
- Google I/O
    - Veo 3: 세계최초 네이티브 오디오 포함 비디오 생성
    - Imagen 4
    - AI Studio

### 25.6월
- Gemini 2.5 Pro/Flash
- Gemini CLI

### 25.8월
- Nano Banana
- NotebookLM Video Overviews

### 25.9월
- Google DeepMind: Gemini Robotics

### 25.10월
- Veo 3.1: Image Bridging, scene extension

### 25.11월
- Gemini 3.0 Pro + Deep Think : LMArena 1501 Elo (최초 1500 돌파)
- Google Antigravity IDE: VS Code 포크 기반, agent-first IDE
- Nano Banana Pro: 11월

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