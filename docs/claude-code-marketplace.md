# Claude Code Marketplace & Plugins 가이드

> Claude Code 플러그인 및 스킬 마켓플레이스 정리 (2025년 12월 기준)

## 플러그인이란?

Claude Code 플러그인은 다음을 번들로 패키징한 것:
- **Slash commands** - 자주 쓰는 작업의 커스텀 단축키
- **Subagents** - 특정 개발 작업 전용 에이전트
- **MCP servers** - Model Context Protocol을 통한 외부 도구 연동
- **Hooks** - Claude Code 워크플로우 커스터마이징

## 스킬/플러그인 저장 위치

| 타입 | 저장 위치 | 특징 |
|------|----------|------|
| Personal Skills | `~/.claude/skills/` | 로컬 머신 전용 |
| Project Skills | `.claude/skills/` | 프로젝트에 커밋, 팀 공유 |
| Marketplace Plugins | Claude Code 내부 | 자동 관리 |

## 공식 리소스

### Anthropic 공식

| 이름 | 링크 | 설명 |
|------|------|------|
| Claude Code Plugins 문서 | [anthropic.com/news/claude-code-plugins](https://www.anthropic.com/news/claude-code-plugins) | 공식 플러그인 가이드 |
| Agent Skills 소개 | [anthropic.com/news/skills](https://www.anthropic.com/news/skills) | 공식 스킬 시스템 설명 |
| anthropics/skills | [github.com/anthropics/skills](https://github.com/anthropics/skills) | 공식 스킬 저장소 |
| anthropics/life-sciences | [github.com/anthropics/life-sciences](https://github.com/anthropics/life-sciences) | 생명과학 MCP 서버 (PubMed, BioRender 등) |

## 커뮤니티 마켓플레이스

### 대규모 컬렉션

| 이름 | 링크 | 규모 |
|------|------|------|
| jeremylongshore/claude-code-plugins-plus | [GitHub](https://github.com/jeremylongshore/claude-code-plugins-plus) | 243개 플러그인, 175개 Agent Skills |
| wshobson/agents | [GitHub](https://github.com/wshobson/agents) | 91개 에이전트, 47개 스킬, 45개 도구 |
| SkillsMP.com | [skillsmp.com](https://skillsmp.com/) | 웹 기반 스킬 디렉토리 |
| claudecodemarketplace.com | [claudecodemarketplace.com](https://claudecodemarketplace.com/) | 140+ 플러그인, 14개 카테고리 |

### 특화 마켓플레이스

| 이름 | 링크 | 특징 |
|------|------|------|
| travisvn/awesome-claude-skills | [GitHub](https://github.com/travisvn/awesome-claude-skills) | 큐레이션된 스킬 목록 |
| mhattingpete/claude-skills-marketplace | [GitHub](https://github.com/mhattingpete/claude-skills-marketplace) | Git 자동화, 테스팅, 코드 리뷰 |
| netresearch/claude-code-marketplace | [GitHub](https://github.com/netresearch/claude-code-marketplace) | Netresearch 큐레이션 |
| lst97/claude-code-sub-agents | [GitHub](https://github.com/lst97/claude-code-sub-agents) | 풀스택 개발 서브에이전트 |
| FrancyJGLisboa/agent-skill-creator | [GitHub](https://github.com/FrancyJGLisboa/agent-skill-creator) | 에이전트 생성 메타스킬 |

## 설치 방법

### 마켓플레이스 등록
```bash
# 공식 마켓플레이스 추가
/plugin marketplace add anthropics/skills
/plugin marketplace add anthropics/claude-code

# 커뮤니티 마켓플레이스 추가
/plugin marketplace add wshobson/agents
```

### 플러그인 설치
```bash
# 마켓플레이스에서 플러그인 설치
/plugin install plugin-name@marketplace-name

# 플러그인 관리
/plugin                    # 전체 메뉴
/plugin marketplace list   # 등록된 마켓플레이스
/plugin enable name        # 활성화
/plugin disable name       # 비활성화
```

### 수동 스킬 생성

`.claude/skills/my-skill/SKILL.md` 파일 생성:

```yaml
---
name: my-skill
description: 이 스킬이 하는 일과 언제 사용해야 하는지
---

# 스킬 이름

## 사용 방법
- 단계별 가이드 작성
- 예시 포함

## 예시
...
```

## 추천 플러그인 (용도별)

### 온보딩/코드베이스 이해
- `wshobson/agents` - 코드베이스 온보딩 에이전트 포함
- `anthropics/skills` - 공식 예제 스킬

### 문서화/글쓰기
- `obra/superpowers` - writing-skills 포함
- `mhattingpete/claude-skills-marketplace` - visual documentation

### DevOps/자동화
- `jeremylongshore/claude-code-plugins-plus` - DevOps 자동화 플러그인
- Git 자동화, 테스팅 스위트 포함

## 참고 자료

- [Simon Willison의 스킬 분석](https://simonwillison.net/2025/Oct/16/claude-skills/) - "Skills are maybe a bigger deal than MCP"
- [Claude Skills Deep Dive](https://leehanchung.github.io/blogs/2025/10/26/claude-skills-deep-dive/) - 기술적 심층 분석
- [Claude Code Complete Guide](https://www.siddharthbharath.com/claude-code-the-complete-guide/) - 전체 가이드

---

*마지막 업데이트: 2025년 12월*
