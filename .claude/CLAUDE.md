# AI Landscape 2025

2025년 생성형 AI 트렌드를 시각화한 타임라인 웹사이트

## 프로젝트 목적

- 인프런 라이브 세션 "(무료 Live) 2025 생성형 AI 트렌드 총 정리" 보조 자료
- OpenAI / Google / Anthropic 3사의 2025년 주요 발표를 타임라인으로 시각화
- 무료 공개 프로젝트

## 기술 스택

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19 + TailwindCSS v4
- **Language**: TypeScript

## 프로젝트 구조

```
ai-landscape-2025/
├── app/                    # Next.js 페이지
├── docs/                   # 조사 자료 (markdown)
│   └── inflearn-live.md    # 3사 트렌드 정리 문서
├── public/                 # 정적 자산
└── .claude/                # Claude Code 설정
```

## 핵심 콘텐츠 (docs/inflearn-live.md)

3개 AI 개발사의 2025년 타임라인:
- **Anthropic**: Claude Code 중심 개발자 생산성 전략
- **OpenAI**: ChatGPT 중심 소비자 플랫폼 전략
- **Google**: Search + Workspace + Cloud 통합 인프라 전략


## 작업 가이드

1. `docs/` 폴더의 markdown 자료를 기반으로 페이지 구현
2. 타임라인 시각화에 집중 (인터랙티브하고 보기 좋게)
3. 반응형 디자인 필수 (모바일에서도 잘 보여야 함)
4. 한국어 콘텐츠
