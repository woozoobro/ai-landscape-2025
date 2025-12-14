---
description: Commit changes with conventional commit format
allowed-tools: Bash(git add:*), Bash(git status:*), Bash(git commit:*)
---

## 커밋 컨벤션

**형식**:
```
<type>: <한글 메시지>

<optional description>
```

**타입 (6개)**:
- `page`: 페이지 작업
- `docs`: 문서/기획 작업
- `fix`: 버그/오류 수정
- `refactor`: 코드/구조 개선
- `chore`: 사소한 변경사항
- `feat`: 새 기능 추가

**예시**:
```
page: 대시보드 페이지 추가
docs: 프로젝트 기획안 작성
fix: 이미지 깨짐 현상 수정
refactor: 레이아웃 구조 정리
chore: 파일 정리
feat: 웹검색 기능 추가
```

**description 포함 예시**:
```
page: 대시보드 페이지 추가

- 차트 컴포넌트 구현
- 데이터 테이블 추가
- 반응형 레이아웃 적용
```

**사용법**:
- `/commit` - 모든 변경사항 커밋
- `/commit 특정 작업 설명` - 해당 작업만 선택해서 커밋

$ARGUMENTS

위 인자가 있으면 해당 작업 관련 파일만 선택해서 커밋하고, 없으면 전체 변경사항을 커밋하세요.
