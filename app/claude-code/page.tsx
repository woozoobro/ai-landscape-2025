'use client'

import React, { useState, useEffect } from 'react'

const ClaudeCodeGuide = () => {
  const [activeSection, setActiveSection] = useState('what-is')

  const sections = [
    { id: 'quick-start', title: '5분 만에 시작하기', number: '00' },
    { id: 'what-is', title: '코딩 어시스턴트란?', number: '01' },
    { id: 'tool-use', title: 'Tool Use', number: '02' },
    { id: 'tools', title: 'Tools with Claude Code', number: '03' },
    { id: 'setup', title: '셋업', number: '04' },
    { id: 'context', title: '컨텍스트 추가', number: '05' },
    { id: 'changes', title: 'Making Changes', number: '06' },
    { id: 'control', title: 'Controlling Context', number: '07' },
    { id: 'custom', title: 'Custom 커맨드', number: '08' },
    { id: 'mcp', title: 'MCP Servers', number: '09' },
    { id: 'agents-skills', title: 'Agents vs Skills', number: '10' },
    { id: 'github', title: 'Github Integration (개발자용)', number: '11' },
    { id: 'hooks', title: 'Hooks (개발자용)', number: '12' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200

      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="min-h-screen bg-white font-['Paperlogy']">
      {/* Navigation */}
      <nav className="fixed left-0 top-0 h-screen w-64 border-r border-gray-200 bg-white p-12">
        <div className="mb-16">
          <h1 className="text-sm font-light tracking-wider text-gray-400">GUIDE</h1>
          <h2 className="mt-2 text-xl font-light text-gray-900">Claude Code</h2>
        </div>

        <ul className="space-y-6">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => scrollToSection(section.id)}
                className={`group flex w-full items-start gap-3 text-left transition-colors cursor-pointer ${
                  activeSection === section.id ? 'text-gray-900' : 'text-gray-400'
                }`}
              >
                <span className="text-xs font-light">{section.number}</span>
                <span className="text-sm font-light">{section.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content */}
      <main className="ml-64 px-24 py-24">
        <div className="mx-auto max-w-4xl">

          {/* Reference Link */}
          <div className="mb-16 rounded-sm border border-blue-200 bg-blue-50 p-6">
            <div className="flex items-start gap-3">
              <span className="text-lg text-blue-400">📚</span>
              <div>
                <p className="text-sm font-light text-blue-900 mb-1">참고 자료</p>
                <a
                  href="https://www.anthropic.com/engineering/claude-code-best-practices"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-light text-blue-700 underline hover:text-blue-900 transition-colors"
                >
                  Claude Code Best Practices - Anthropic Engineering
                </a>
              </div>
            </div>
          </div>

          {/* 5분 만에 시작하기 */}
          <section id="quick-start" className="mb-32">
            <div className="mb-8">
              <span className="text-xs font-light tracking-wider text-gray-400">00</span>
            </div>
            <h2 className="mb-12 text-5xl font-light text-gray-900">5분 만에 시작하기</h2>

            <div className="mb-16 space-y-6 text-xl leading-relaxed text-gray-700">
              <p className="text-2xl font-light">
                Claude Code를 처음 사용하신다면, 이것만 알아도 바로 시작할 수 있습니다.
              </p>
            </div>

            {/* VSCode 통합 */}
            <div className="mb-16">
              <h3 className="mb-8 text-3xl font-light text-gray-900">VSCode에서 Claude Code</h3>
              <div className="mb-8 space-y-6 text-xl leading-relaxed text-gray-700">
                <p className="font-light">
                  VSCode에서 Claude Code를 열면 <strong>현재 열려있는 파일과 창을 자동으로 인식</strong>합니다.
                </p>
                <p className="font-light">
                  별도로 파일 경로를 알려주지 않아도 열린 창을 읽고 "이 스크립트 요약해줘", "이 섹션 내용 보완해줘", "이 페이지 컴포넌트 만들어줘" 같은 요청이 가능합니다.
                </p>
              </div>
            </div>

            {/* 슬래시 커맨드 */}
            <div className="mb-16">
              <h3 className="mb-8 text-3xl font-light text-gray-900">자주 쓰는 슬래시 커맨드</h3>
              <div className="mb-8 space-y-6 text-xl leading-relaxed text-gray-700">
                <p className="font-light">
                  <code className="rounded bg-gray-100 px-2 py-1 font-mono text-sm">/</code>를 입력하면 다양한 커맨드 목록이 나타납니다. 그 중 자주 사용하게 될 커맨드들:
                </p>
              </div>

              <div className="space-y-4">
                <div className="rounded-sm border border-gray-200 bg-white p-6">
                  <code className="mb-3 block font-mono text-lg text-gray-900">/clear</code>
                  <p className="text-xl font-light text-gray-700 mb-2">대화 내역을 완전히 초기화합니다.</p>
                  <p className="text-base font-light text-gray-500">새로운 주제로 시작하고 싶을 때 사용하세요.</p>
                </div>

                <div className="rounded-sm border border-gray-200 bg-white p-6">
                  <code className="mb-3 block font-mono text-lg text-gray-900">/compact</code>
                  <p className="text-xl font-light text-gray-700 mb-2">긴 대화를 요약해서 컨텍스트를 절약합니다.</p>
                  <p className="text-base font-light text-gray-500">대화가 길어져서 느려질 때 사용하세요.</p>
                </div>

                <div className="rounded-sm border border-gray-200 bg-white p-6">
                  <code className="mb-3 block font-mono text-lg text-gray-900">/context</code>
                  <p className="text-xl font-light text-gray-700 mb-2">현재 토큰 사용량을 확인합니다.</p>
                  <p className="text-base font-light text-gray-500">얼마나 많은 컨텍스트를 사용 중인지 확인할 때 유용합니다.</p>
                </div>
              </div>
            </div>

            {/* 파일 멘션 */}
            <div className="mb-16">
              <h3 className="mb-8 text-3xl font-light text-gray-900">파일 멘션으로 컨텍스트 추가</h3>
              <div className="mb-8 space-y-6 text-xl leading-relaxed text-gray-700">
                <p className="font-light">
                  <code className="rounded bg-gray-100 px-2 py-1 font-mono text-sm">@</code> 심볼로 특정 파일이나 폴더를 대화에 포함시킬 수 있습니다.
                </p>
              </div>

              <div className="rounded-sm border border-gray-200 bg-gray-50 p-6">
                <p className="font-mono text-base text-gray-700">@src/components/Button.tsx 이 컴포넌트 리팩토링 해줘</p>
              </div>
            </div>

            {/* 필수 키 바인딩 */}
            <div className="mb-16">
              <h3 className="mb-8 text-3xl font-light text-gray-900">필수 키 바인딩</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-6 rounded-sm border border-gray-200 bg-white p-6">
                  <kbd className="rounded bg-gray-100 px-3 py-2 font-mono text-base text-gray-900 border border-gray-300">Escape</kbd>
                  <div className="flex-1">
                    <p className="text-xl font-light text-gray-700 mb-1">응답 중단</p>
                    <p className="text-base font-light text-gray-500">Claude가 이상한 방향으로 가고 있을 때 즉시 멈출 수 있습니다.</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 rounded-sm border border-gray-200 bg-white p-6">
                  <kbd className="rounded bg-gray-100 px-3 py-2 font-mono text-base text-gray-900 border border-gray-300">Escape × 2</kbd>
                  <div className="flex-1">
                    <p className="text-xl font-light text-gray-700 mb-1">이전으로 되돌리기</p>
                    <p className="text-base font-light text-gray-500">대화 내역에서 이전 상태로 돌아갑니다.</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 rounded-sm border border-gray-200 bg-white p-6">
                  <kbd className="rounded bg-gray-100 px-3 py-2 font-mono text-base text-gray-900 border border-gray-300">Cmd/Ctrl + V</kbd>
                  <div className="flex-1">
                    <p className="text-xl font-light text-gray-700 mb-1">스크린샷 첨부</p>
                    <p className="text-base font-light text-gray-500">클립보드의 이미지를 바로 대화에 붙여넣을 수 있습니다.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 웹검색으로 최신 정보 활용 */}
            <div className="mb-16">
              <h3 className="mb-8 text-3xl font-light text-gray-900">웹검색으로 최신 정보 활용</h3>
              <div className="mb-8 space-y-6 text-xl leading-relaxed text-gray-700">
                <p className="font-light">
                  Claude Code는 <strong>실시간 웹검색</strong>이 가능합니다. 업계 트렌드, 경쟁사 조사, 기술 문서, 사례 분석 등을 바로 찾아서 업무에 활용할 수 있습니다.
                </p>
                <p className="font-light">
                  "2025년 AI 도입 사례 조사해줘" 같은 요청을 하면, 웹에서 최신 정보를 검색해서 정리해줍니다.
                </p>
              </div>

              <div className="rounded-sm border border-green-200 bg-green-50 p-6">
                <h4 className="mb-4 text-xl font-light text-green-900">💡 이럴 때 웹검색을 활용하세요</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-base text-green-400">•</span>
                    <span className="text-base font-light text-green-900">
                      &ldquo;React 19 새로운 기능 정리해줘&rdquo;
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-base text-green-400">•</span>
                    <span className="text-base font-light text-green-900">
                      &ldquo;SaaS 업계 최신 UX 트렌드 조사해줘&rdquo;
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-base text-green-400">•</span>
                    <span className="text-base font-light text-green-900">
                      &ldquo;기업들의 AI 도입 성공 사례 분석해줘&rdquo;
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-base text-green-400">•</span>
                    <span className="text-base font-light text-green-900">
                      &ldquo;경쟁사 서비스 특징과 차별점 비교해줘&rdquo;
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 핵심 개념: .claude 폴더 */}
            <div className="mb-16">
              <h3 className="mb-8 text-3xl font-light text-gray-900">.claude 폴더 구조</h3>
              <div className="mb-8 space-y-6 text-xl leading-relaxed text-gray-700">
                <p className="font-light">
                  프로젝트 루트에 있는 <code className="rounded bg-gray-100 px-2 py-1 font-mono text-sm">.claude</code> 폴더는 Claude Code의 설정을 관리합니다.
                </p>
                <p className="font-light">
                  이 폴더의 내용은 <strong>팀원들과 Git으로 공유</strong>되어, 모두가 같은 설정과 워크플로우를 사용할 수 있습니다.
                </p>
              </div>

              <div className="space-y-4">
                <div className="rounded-sm border border-gray-200 bg-white p-6">
                  <h4 className="mb-3 flex items-center gap-2">
                    <code className="font-mono text-lg text-gray-900">CLAUDE.md</code>
                  </h4>
                  <p className="text-xl font-light text-gray-700 mb-2">프로젝트의 시스템 프롬프트</p>
                  <p className="text-base font-light text-gray-500 mb-3">
                    Claude가 어떻게 동작할지 정의합니다. 프로젝트 구조, 코딩 스타일, 디자인 시스템 등을 설명할 수 있습니다.
                  </p>
                  <div className="rounded bg-gray-50 p-3">
                    <code className="block font-mono text-sm text-gray-700">
                      .claude/CLAUDE.md
                    </code>
                  </div>
                </div>

                <div className="rounded-sm border border-gray-200 bg-white p-6">
                  <h4 className="mb-3 flex items-center gap-2">
                    <code className="font-mono text-lg text-gray-900">agents/</code>
                  </h4>
                  <p className="text-xl font-light text-gray-700 mb-2">복잡한 태스크를 자동화하는 에이전트</p>
                  <p className="text-base font-light text-gray-500 mb-3">
                    여러 단계의 작업을 수행하는 AI 에이전트를 정의합니다. 예: 페이지 생성, 최적화, 배포 등
                  </p>
                  <div className="rounded bg-gray-50 p-3">
                    <code className="block font-mono text-sm text-gray-700">
                      .claude/agents/page-creator.md
                    </code>
                  </div>
                </div>

                <div className="rounded-sm border border-gray-200 bg-white p-6">
                  <h4 className="mb-3 flex items-center gap-2">
                    <code className="font-mono text-lg text-gray-900">skills/</code>
                  </h4>
                  <p className="text-xl font-light text-gray-700 mb-2">재사용 가능한 스킬 (프롬프트 템플릿)</p>
                  <p className="text-base font-light text-gray-500 mb-3">
                    반복적인 작업을 위한 프롬프트 템플릿입니다. 예: 강의 스크립트 작성, 코드 리뷰 등
                  </p>
                  <div className="rounded bg-gray-50 p-3">
                    <code className="block font-mono text-sm text-gray-700">
                      .claude/skills/course-script-writer.md
                    </code>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-sm border border-blue-200 bg-blue-50 p-6">
                <p className="text-base font-light text-blue-900">
                  💡 <code className="mx-1 rounded bg-blue-100 px-2 py-1 font-mono text-sm">#</code> 커맨드로 CLAUDE.md를 쉽게 수정할 수 있습니다.
                </p>
              </div>
            </div>

            {/* 빠른 팁 */}
            <div className="rounded-sm border border-orange-200 bg-orange-50 p-8">
              <h4 className="mb-6 text-2xl font-light text-orange-900">💡 빠른 팁</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-xl text-orange-400">•</span>
                  <span className="text-xl font-light text-orange-900">
                    대화가 길어지면 <code className="rounded bg-orange-100 px-2 py-1 font-mono text-sm">/clear</code>로 새 창에서 시작하거나
                    <code className="mx-1 rounded bg-orange-100 px-2 py-1 font-mono text-sm">/compact</code>로 압축하세요
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl text-orange-400">•</span>
                  <span className="text-xl font-light text-orange-900">
                    모르는 것도 정리해서 물어보세요. "이 에러 어떻게 해결하나요?", "이 기능 어떻게 구현하나요?" 같은 질문도 OK
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl text-orange-400">•</span>
                  <span className="text-xl font-light text-orange-900">
                    <code className="rounded bg-orange-100 px-2 py-1 font-mono text-sm">@</code> 멘션으로 필요한 파일만 컨텍스트에 추가하면 더 정확한 답변을 받을 수 있습니다
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* 코딩 어시스턴트란? */}
          <section id="what-is" className="mb-32">
            <div className="mb-8">
              <span className="text-xs font-light tracking-wider text-gray-400">01</span>
            </div>
            <h2 className="mb-12 text-5xl font-light text-gray-900">코딩 어시스턴트란?</h2>

            <div className="mb-16 space-y-6 text-xl leading-relaxed text-gray-700">
              <p className="text-2xl font-light">
                Claude Code는 "코딩 어시스턴트"입니다.
              </p>
              <p className="font-light">
                코딩 어시스턴트라고 하면 "코드 자동 생성기" 정도로 생각하실 수 있는데요,
                실제로는 파일을 읽고, 에러를 찾고, 명령어를 실행하고, 웹에서 정보를 검색하기까지 하는
                똑똑한 개발 파트너에 가깝습니다.
              </p>
              <p className="font-light">
                어떻게 이게 가능한지, 지금부터 알아보겠습니다.
              </p>
            </div>

            <h3 className="mb-8 text-3xl font-light text-gray-900">어떻게 작동하는가</h3>
            <div className="mb-12 space-y-6 text-xl leading-relaxed text-gray-700">
              <p className="font-light">
                코딩 어시스턴트에게 태스크를 주면 (예: 에러 메시지를 바탕으로 버그를 수정할 때),
                인간 개발자가 문제를 해결할 때와 유사한 방식으로 동작합니다.
              </p>
            </div>

            {/* Architecture Diagram */}
            <div className="mb-16 rounded-sm border border-gray-200 bg-gray-50 p-12">
              <div className="mb-8 flex items-center justify-center gap-6">
                {/* Task Box */}
                <div className="w-64 rounded-sm border border-gray-300 bg-white p-6">
                  <p className="mb-3 text-lg font-light text-gray-900">태스크</p>
                  <p className="text-base font-light leading-relaxed text-gray-600">
                    에러가 발생했습니다. 이슈를 찾아서 수정해주세요.
                  </p>
                  <p className="mt-3 text-sm font-light italic text-gray-500">
                    Cannot read property 'records' of undefined
                  </p>
                </div>

                {/* Arrow */}
                <div className="text-2xl text-gray-300">→</div>

                {/* Assistant Box */}
                <div className="relative rounded-sm border border-gray-300 bg-white p-8 pr-16">
                  <div className="mb-6 text-center text-sm font-light text-gray-400">어시스턴트</div>

                  <div className="flex gap-8">
                    {/* Left side: Language Model + Tools */}
                    <div className="flex flex-col gap-3">
                      {/* Language Model */}
                      <div className="relative rounded-sm border-2 border-orange-300 bg-white px-6 py-4 min-w-[120px]">
                        <p className="text-center text-sm font-normal text-gray-900 whitespace-nowrap">언어 모델</p>
                      </div>

                      {/* Double Arrow */}
                      <div className="flex items-center justify-center text-gray-300">
                        <div className="text-lg">↕</div>
                      </div>

                      {/* Tools */}
                      <div className="rounded-sm border-2 border-orange-200 bg-white px-6 py-4 min-w-[120px]">
                        <p className="text-center text-lg font-light text-gray-900 whitespace-nowrap">툴 세트</p>
                      </div>
                    </div>

                    {/* Right side: Process Flow */}
                    <div className="relative flex flex-col">
                      {/* Gather Context */}
                      <div className="rounded-sm bg-yellow-100 px-6 py-3 min-w-[150px]">
                        <p className="text-lg font-light text-gray-900 whitespace-nowrap">컨텍스트 수집</p>
                      </div>

                      <div className="my-3 text-center text-gray-400">↓</div>

                      {/* Formulate Plan */}
                      <div className="rounded-sm bg-orange-200 px-6 py-3 min-w-[150px]">
                        <p className="text-lg font-light text-gray-900 whitespace-nowrap">계획 수립</p>
                      </div>

                      <div className="my-3 text-center text-gray-400">↓</div>

                      {/* Take Action */}
                      <div className="rounded-sm bg-orange-300 px-6 py-3 min-w-[150px]">
                        <p className="text-lg font-light text-gray-900 whitespace-nowrap">실행</p>
                      </div>

                      {/* Iterate arrow - curved back to top */}
                      <div className="absolute -right-10 top-2 flex flex-col items-center gap-1">
                        <div className="text-xs font-light text-gray-400 whitespace-nowrap">순회</div>
                        <svg width="40" height="160" className="text-gray-400">
                          <path
                            d="M 5 155 Q 20 155, 20 80 Q 20 5, 5 5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            markerEnd="url(#arrowhead)"
                          />
                          <defs>
                            <marker
                              id="arrowhead"
                              markerWidth="10"
                              markerHeight="10"
                              refX="5"
                              refY="3"
                              orient="auto"
                            >
                              <polygon points="0 0, 6 3, 0 6" fill="currentColor" />
                            </marker>
                          </defs>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-6 text-center text-base font-light leading-relaxed text-gray-600">
                어시스턴트 안에 언어 모델이 포함되어 있습니다. 시스템 전체를 일컫는 것이죠.
              </p>
            </div>

            <div className="mb-16 space-y-8">
              <div className="border-l-2 border-gray-200 pl-8">
                <h4 className="mb-3 text-xl font-light text-gray-900">1. Gather Context</h4>
                <p className="text-xl font-light leading-relaxed text-gray-600">
                  에러에 대한 이해, 어떤 코드베이스의 부분이 영향을 받는지, 어떤 파일이 연관되어 있는지 파악합니다.
                </p>
              </div>

              <div className="border-l-2 border-gray-200 pl-8">
                <h4 className="mb-3 text-xl font-light text-gray-900">2. Formulate a Plan</h4>
                <p className="text-xl font-light leading-relaxed text-gray-600">
                  어떻게 이슈를 해결할지 정합니다. 코드를 변경하거나, 테스트를 실행해서 해결을 시도합니다.
                </p>
              </div>

              <div className="border-l-2 border-gray-200 pl-8">
                <h4 className="mb-3 text-xl font-light text-gray-900">3. Take Action</h4>
                <p className="text-xl font-light leading-relaxed text-gray-600">
                  실제로 파일을 업데이트해서 해결책을 구현하고, 커맨드를 실행합니다.
                </p>
              </div>
            </div>

            <div className="rounded-sm border border-gray-200 bg-gray-50 p-8">
              <p className="text-xl font-light leading-relaxed text-gray-700">
                <span className="font-normal text-gray-900">중요한 점:</span> 첫 번째 단계와 마지막 단계는
                어시스턴트가 외부의 세상과 상호작용이 필요합니다. (커맨드를 실행하거나, 코드를 편집하는 것들)
              </p>
            </div>
          </section>

          {/* Tool Use */}
          <section id="tool-use" className="mb-32">
            <div className="mb-8">
              <span className="text-xs font-light tracking-wider text-gray-400">02</span>
            </div>
            <h2 className="mb-12 text-5xl font-light text-gray-900">The Tool Use Challenge</h2>

            <div className="mb-16 space-y-6 text-xl leading-relaxed text-gray-700">
              <p className="text-2xl font-light">
                Language Models 자체로는 입력된 텍스트를 읽고 텍스트로만 답을 생성합니다.
                파일을 읽는다던가, 커맨드를 실행하는 것은 불가능합니다.
              </p>
              <p className="font-light">
                만약 순수한 언어모델에게 파일을 읽어보라고 물어보면, 할 수 없는 일이라고 답변할 것입니다.
              </p>
            </div>

            <h3 className="mb-8 text-3xl font-light text-gray-900">How Tool Use Works</h3>

            <div className="mb-12 space-y-6 text-xl leading-relaxed text-gray-700">
              <p className="font-light">
                코딩 어시스턴트에게 요청을 보낼 때, 자동으로 instructions을 당신의 메시지에 추가합니다.
                언어 모델이 "어떻게 액션을 할지"를 알려주는 것이죠.
              </p>
            </div>

            {/* Sequence Diagram */}
            <div className="mb-16 rounded-sm border border-gray-200 bg-gray-50 p-12">
              <div className="relative min-h-[500px]">
                {/* Participants - positioned absolutely at exact positions */}
                <div className="relative flex" style={{ paddingLeft: '12.5%', paddingRight: '12.5%' }}>
                  <div className="absolute" style={{ left: '12.5%', transform: 'translateX(-50%)' }}>
                    <div className="rounded-sm border border-gray-300 bg-white px-8 py-3">
                      <p className="text-lg font-light text-gray-900 whitespace-nowrap">사용자</p>
                    </div>
                  </div>
                  <div className="absolute" style={{ left: '50%', transform: 'translateX(-50%)' }}>
                    <div className="rounded-sm border border-gray-300 bg-white px-8 py-3">
                      <p className="text-lg font-light text-gray-900 whitespace-nowrap">코딩 어시스턴트</p>
                    </div>
                  </div>
                  <div className="absolute" style={{ left: '87.5%', transform: 'translateX(-50%)' }}>
                    <div className="rounded-sm border border-gray-300 bg-white px-8 py-3">
                      <p className="text-lg font-light text-gray-900 whitespace-nowrap">언어 모델</p>
                    </div>
                  </div>
                </div>

                {/* Lifelines - positioned at exact 12.5%, 50%, 87.5% */}
                <div className="absolute top-16 bottom-0" style={{ left: '12.5%', width: '2px' }}>
                  <div className="h-full border-l-2 border-dashed border-gray-300"></div>
                </div>
                <div className="absolute top-16 bottom-0" style={{ left: '50%', width: '2px' }}>
                  <div className="h-full border-l-2 border-dashed border-gray-300"></div>
                </div>
                <div className="absolute top-16 bottom-0" style={{ left: '87.5%', width: '2px' }}>
                  <div className="h-full border-l-2 border-dashed border-gray-300"></div>
                </div>

                {/* Messages - arrows between exact lifeline positions */}
                <div className="relative pt-24 space-y-16">
                  {/* Step 1: User -> Coding Assistant (12.5% to 50%) */}
                  <div className="relative" style={{ height: '40px' }}>
                    <div className="absolute" style={{ left: '12.5%', right: '50%', top: '50%' }}>
                      <svg width="100%" height="8" className="absolute top-0" style={{ overflow: 'visible', transform: 'translateY(-3px)' }}>
                        <defs>
                          <marker id="arrowRight1" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
                            <polygon points="0,0 8,4 0,8" fill="#9ca3af" />
                          </marker>
                        </defs>
                        <line x1="0" y1="4" x2="100%" y2="4" stroke="#9ca3af" strokeWidth="1" markerEnd="url(#arrowRight1)" />
                      </svg>
                      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full -mt-2">
                        <p className="text-xs font-light italic text-gray-600 bg-gray-50 px-2 whitespace-nowrap">
                          main.go 파일에 어떤 코드가 있어?
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Coding Assistant -> Language Model (50% to 87.5%) */}
                  <div className="relative" style={{ height: '50px' }}>
                    <div className="absolute" style={{ left: '50%', right: '12.5%', top: '50%' }}>
                      <svg width="100%" height="8" className="absolute top-0" style={{ overflow: 'visible', transform: 'translateY(-3px)' }}>
                        <defs>
                          <marker id="arrowRight2" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
                            <polygon points="0,0 8,4 0,8" fill="#9ca3af" />
                          </marker>
                        </defs>
                        <line x1="0" y1="4" x2="100%" y2="4" stroke="#9ca3af" strokeWidth="1" markerEnd="url(#arrowRight2)" />
                      </svg>
                      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full -mt-2">
                        <div className="text-xs font-light italic text-gray-600 bg-gray-50 px-2">
                          <p className="whitespace-nowrap">main.go 파일에 어떤 코드가 있어?</p>
                          <p className="text-gray-500 whitespace-nowrap">파일을 읽고 싶다면 "ReadFile: 파일명"으로 응답하세요</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Language Model -> Coding Assistant (87.5% to 50%) */}
                  <div className="relative" style={{ height: '40px' }}>
                    <div className="absolute" style={{ left: '50%', right: '12.5%', top: '50%' }}>
                      <svg width="100%" height="8" className="absolute top-0" style={{ overflow: 'visible', transform: 'translateY(-3px)' }}>
                        <defs>
                          <marker id="arrowLeft3" markerWidth="8" markerHeight="8" refX="0" refY="4" orient="auto">
                            <polygon points="8,0 0,4 8,8" fill="#9ca3af" />
                          </marker>
                        </defs>
                        <line x1="0" y1="4" x2="100%" y2="4" stroke="#9ca3af" strokeWidth="1" markerStart="url(#arrowLeft3)" />
                      </svg>
                      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full -mt-2">
                        <p className="text-base font-light text-gray-900 bg-gray-50 px-2 whitespace-nowrap">
                          ReadFile: main.go
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step 4: Coding Assistant Action */}
                  <div className="relative flex justify-center" style={{ height: '40px' }}>
                    <div className="absolute" style={{ left: '50%', transform: 'translateX(-50%)' }}>
                      <div className="rounded-sm bg-white px-4 py-2 text-base font-light text-gray-600 border border-gray-300 whitespace-nowrap">
                        [파일을 읽습니다]
                      </div>
                    </div>
                  </div>

                  {/* Step 5: Coding Assistant -> Language Model (50% to 87.5%) */}
                  <div className="relative" style={{ height: '40px' }}>
                    <div className="absolute" style={{ left: '50%', right: '12.5%', top: '50%' }}>
                      <svg width="100%" height="8" className="absolute top-0" style={{ overflow: 'visible', transform: 'translateY(-3px)' }}>
                        <defs>
                          <marker id="arrowRight5" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
                            <polygon points="0,0 8,4 0,8" fill="#9ca3af" />
                          </marker>
                        </defs>
                        <line x1="0" y1="4" x2="100%" y2="4" stroke="#9ca3af" strokeWidth="1" markerEnd="url(#arrowRight5)" />
                      </svg>
                      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full -mt-2">
                        <p className="text-xs font-light italic text-gray-600 bg-gray-50 px-2 whitespace-nowrap">
                          {'<main.go 파일 내용>'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step 6: Language Model -> User (87.5% to 12.5%) */}
                  <div className="relative" style={{ height: '40px' }}>
                    <div className="absolute" style={{ left: '12.5%', right: '12.5%', top: '50%' }}>
                      <svg width="100%" height="8" className="absolute top-0" style={{ overflow: 'visible', transform: 'translateY(-3px)' }}>
                        <defs>
                          <marker id="arrowLeft6" markerWidth="8" markerHeight="8" refX="0" refY="4" orient="auto">
                            <polygon points="8,0 0,4 8,8" fill="#9ca3af" />
                          </marker>
                        </defs>
                        <line x1="0" y1="4" x2="100%" y2="4" stroke="#9ca3af" strokeWidth="1" markerStart="url(#arrowLeft6)" />
                      </svg>
                      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full -mt-2">
                        <p className="text-xs font-light italic text-gray-600 bg-gray-50 px-2 whitespace-nowrap">
                          main.go 파일에는 애플리케이션을 초기화하는 코드가 있습니다...
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="mb-8 text-3xl font-light text-gray-900">왜 Tool Use가 중요한가</h3>
            <div className="mb-12 space-y-6 text-xl leading-relaxed text-gray-700">
              <p className="font-light">
                모든 언어 모델이 툴을 사용하는데 특화되지 않았습니다.
                클로드 시리즈 모델은 태스크를 처리하기 위해서 어떤 툴을 사용할지 효과적으로 판단하는 것에 특화되어 있습니다.
              </p>
            </div>

            {/* Tool Use Comparison */}
            <div className="mb-12 grid grid-cols-2 gap-8 rounded-sm border border-gray-200 bg-white p-8">
              <div className="border-r border-gray-200 pr-8">
                <h4 className="mb-6 text-xl font-normal text-gray-900">Tool Use</h4>
                <div className="space-y-4 text-base font-light leading-relaxed text-gray-600">
                  <p>• 모델은 '툴'을 사용하는 방법에 대한 일반 텍스트 지시를 받습니다</p>
                  <p>• 모델이 툴 사용 요청으로 응답하면, 코딩 어시스턴트는 해당 툴이 수행해야 하는 작업(파일 읽기, 요청 만들기 등)을 수행합니다</p>
                  <p className="font-normal text-gray-900">• Claude 시리즈 모델(Opus, Sonnet, Haiku)은 툴의 기능을 이해하고 이를 사용하여 작업을 완료하는 데 특히 강력합니다</p>
                </div>
              </div>

              <div className="pl-8">
                <div className="relative min-h-[280px]">
                  {/* Participants */}
                  <div className="flex justify-between mb-6">
                    <div className="rounded-sm border border-gray-200 bg-gray-50 px-6 py-2">
                      <p className="text-base font-light text-gray-700 whitespace-nowrap">코딩 어시스턴트</p>
                    </div>
                    <div className="rounded-sm border border-gray-200 bg-gray-50 px-6 py-2">
                      <p className="text-base font-light text-gray-700 whitespace-nowrap">언어 모델</p>
                    </div>
                  </div>

                  {/* Lifelines */}
                  <div className="absolute top-14 bottom-0" style={{ left: '25%', width: '2px' }}>
                    <div className="h-full border-l-2 border-dashed border-gray-300"></div>
                  </div>
                  <div className="absolute top-14 bottom-0" style={{ left: '75%', width: '2px' }}>
                    <div className="h-full border-l-2 border-dashed border-gray-300"></div>
                  </div>

                  {/* Messages */}
                  <div className="relative pt-8 space-y-12">
                    {/* Message 1: Assistant -> Model */}
                    <div className="relative" style={{ height: '40px' }}>
                      <div className="absolute" style={{ left: '25%', right: '25%', top: '50%' }}>
                        <svg width="100%" height="8" className="absolute top-0" style={{ overflow: 'visible', transform: 'translateY(-3px)' }}>
                          <defs>
                            <marker id="toolArrowRight1" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
                              <polygon points="0,0 8,4 0,8" fill="#9ca3af" />
                            </marker>
                          </defs>
                          <line x1="0" y1="4" x2="100%" y2="4" stroke="#9ca3af" strokeWidth="1" markerEnd="url(#toolArrowRight1)" />
                        </svg>
                        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full -mt-2">
                          <p className="text-xs font-light italic text-gray-600 bg-white px-2 whitespace-nowrap">
                            main.go 파일에 어떤 코드가 있나요?
                          </p>
                          <p className="text-xs font-light italic text-gray-500 bg-white px-2 whitespace-nowrap text-center">
                            파일을 읽고 싶다면 "ReadFile: 파일명"으로 응답하세요
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Message 2: Model -> Assistant */}
                    <div className="relative" style={{ height: '30px' }}>
                      <div className="absolute" style={{ left: '25%', right: '25%', top: '50%' }}>
                        <svg width="100%" height="8" className="absolute top-0" style={{ overflow: 'visible', transform: 'translateY(-3px)' }}>
                          <defs>
                            <marker id="toolArrowLeft2" markerWidth="8" markerHeight="8" refX="0" refY="4" orient="auto">
                              <polygon points="8,0 0,4 8,8" fill="#9ca3af" />
                            </marker>
                          </defs>
                          <line x1="0" y1="4" x2="100%" y2="4" stroke="#9ca3af" strokeWidth="1" markerStart="url(#toolArrowLeft2)" />
                        </svg>
                        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full -mt-2">
                          <p className="text-base font-light text-gray-900 bg-white px-2 whitespace-nowrap">
                            ReadFile: main.go
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Message 3: Assistant -> Model */}
                    <div className="relative" style={{ height: '30px' }}>
                      <div className="absolute" style={{ left: '25%', right: '25%', top: '50%' }}>
                        <svg width="100%" height="8" className="absolute top-0" style={{ overflow: 'visible', transform: 'translateY(-3px)' }}>
                          <defs>
                            <marker id="toolArrowRight3" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
                              <polygon points="0,0 8,4 0,8" fill="#9ca3af" />
                            </marker>
                          </defs>
                          <line x1="0" y1="4" x2="100%" y2="4" stroke="#9ca3af" strokeWidth="1" markerEnd="url(#toolArrowRight3)" />
                        </svg>
                        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full -mt-2">
                          <p className="text-xs font-light italic text-gray-600 bg-white px-2 whitespace-nowrap">
                            {'<main.go 파일 내용>'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8 rounded-sm border border-gray-200 bg-gray-50 p-8">
              <div>
                <h4 className="mb-3 text-xl font-light text-gray-900">더 어려운 태스크 처리</h4>
                <p className="text-xl font-light leading-relaxed text-gray-600">
                  클로드가 서로 다른 툴들을 결합해서 복잡한 작업을 처리할 수 있고, 이전에 보지 못한 툴도 사용 가능합니다.
                </p>
              </div>
              <div>
                <h4 className="mb-3 text-xl font-light text-gray-900">확장 가능한 플랫폼</h4>
                <p className="text-xl font-light leading-relaxed text-gray-600">
                  새로운 툴들을 클로드 코드에 손쉽게 추가할 수 있습니다.
                </p>
              </div>
              <div>
                <h4 className="mb-3 text-xl font-light text-gray-900">Better Security</h4>
                <p className="text-xl font-light leading-relaxed text-gray-600">
                  클로드 코드는 코드베이스에 대한 indexing 요청 없이도 코드를 파악할 수 있습니다.
                </p>
              </div>
            </div>
          </section>

          {/* Tools with Claude Code */}
          <section id="tools" className="mb-32">
            <div className="mb-8">
              <span className="text-xs font-light tracking-wider text-gray-400">03</span>
            </div>
            <h2 className="mb-12 text-5xl font-light text-gray-900">Tools with Claude Code</h2>

            {/* Tools Table */}
            <div className="rounded-sm border border-gray-200 bg-white">
              <div className="grid grid-cols-2 gap-px bg-gray-200">
                {/* Left Column */}
                <div className="bg-white p-8">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="pb-3 text-left text-base font-normal text-gray-900">이름</th>
                        <th className="pb-3 text-left text-base font-normal text-gray-900">목적</th>
                      </tr>
                    </thead>
                    <tbody className="text-base font-light">
                      <tr className="border-b border-gray-100">
                        <td className="py-3 text-gray-900">Agent</td>
                        <td className="py-3 text-gray-600">작업을 처리할 하위 프로세스 실행</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 text-gray-900">Bash</td>
                        <td className="py-3 text-gray-600">셸 커맨드 실행</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 text-gray-900">Edit</td>
                        <td className="py-3 text-gray-600">파일 편집</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 text-gray-900">Glob</td>
                        <td className="py-3 text-gray-600">패턴 기반 파일 검색</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 text-gray-900">Grep</td>
                        <td className="py-3 text-gray-600">파일 내용 검색</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 text-gray-900">LS</td>
                        <td className="py-3 text-gray-600">파일 및 디렉토리 목록</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 text-gray-900">NotebookEdit</td>
                        <td className="py-3 text-gray-600">동시에 여러 편집 수행</td>
                      </tr>
                      <tr>
                        <td className="py-3 text-gray-900">NotebookRead</td>
                        <td className="py-3 text-gray-600">Jupyter 노트북 셀 읽기</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Right Column */}
                <div className="bg-white p-8">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="pb-3 text-left text-base font-normal text-gray-900">이름</th>
                        <th className="pb-3 text-left text-base font-normal text-gray-900">목적</th>
                      </tr>
                    </thead>
                    <tbody className="text-base font-light">
                      <tr className="border-b border-gray-100">
                        <td className="py-3 text-gray-900">Read</td>
                        <td className="py-3 text-gray-600">파일 읽기</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 text-gray-900">TodoRead</td>
                        <td className="py-3 text-gray-600">최근 할 일 읽기</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 text-gray-900">TodoWrite</td>
                        <td className="py-3 text-gray-600">할 일 목록 업데이트</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 text-gray-900">WebFetch</td>
                        <td className="py-3 text-gray-600">URL에서 가져오기</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 text-gray-900">WebSearch</td>
                        <td className="py-3 text-gray-600">웹 검색</td>
                      </tr>
                      <tr>
                        <td className="py-3 text-gray-900">Write</td>
                        <td className="py-3 text-gray-600">파일에 쓰기</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <p className="mt-8 text-xl font-light leading-relaxed text-gray-600">
              Claude Code는 이러한 다양한 툴을 제공하여 개발 작업을 효율적으로 수행할 수 있습니다.
            </p>
          </section>

          {/* 셋업 */}
          <section id="setup" className="mb-32">
            <div className="mb-8">
              <span className="text-xs font-light tracking-wider text-gray-400">04</span>
            </div>
            <h2 className="mb-12 text-5xl font-light text-gray-900">클로드 코드 셋업</h2>

            <div className="space-y-8">
              <div className="flex gap-6">
                <span className="text-2xl font-light text-gray-300">1</span>
                <div>
                  <h4 className="mb-2 text-xl font-light text-gray-900">Node.js 설치</h4>
                  <p className="text-xl font-light text-gray-600">개발 환경을 준비합니다.</p>
                </div>
              </div>

              <div className="flex gap-6">
                <span className="text-2xl font-light text-gray-300">2</span>
                <div>
                  <h4 className="mb-2 text-xl font-light text-gray-900">Claude Code 설치</h4>
                  <code className="block rounded-sm bg-gray-100 px-4 py-3 font-mono text-sm text-gray-700">
                    brew install --cask claude-code
                  </code>
                </div>
              </div>

              <div className="flex gap-6">
                <span className="text-2xl font-light text-gray-300">3</span>
                <div>
                  <h4 className="mb-2 text-xl font-light text-gray-900">설치 확인</h4>
                  <code className="block rounded-sm bg-gray-100 px-4 py-3 font-mono text-sm text-gray-700">
                    claude
                  </code>
                </div>
              </div>

              <div className="flex gap-6">
                <span className="text-2xl font-light text-gray-300">4</span>
                <div>
                  <h4 className="mb-2 text-xl font-light text-gray-900">VS Code Extension</h4>
                  <p className="text-xl font-light text-gray-600">VS Code에서 Claude Extension을 활용할 수 있습니다.</p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <a
                href="https://code.claude.com/docs/en/setup"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xl font-light text-gray-500 transition-colors hover:text-gray-900"
              >
                <span>자세한 가이드 보기</span>
                <span>→</span>
              </a>
            </div>
          </section>

          {/* 컨텍스트 추가 */}
          <section id="context" className="mb-32">
            <div className="mb-8">
              <span className="text-xs font-light tracking-wider text-gray-400">05</span>
            </div>
            <h2 className="mb-12 text-5xl font-light text-gray-900">컨텍스트 추가하기</h2>

            <div className="mb-16 space-y-6 text-xl leading-relaxed text-gray-700">
              <p className="font-light">
                Claude Code로 작업할 때 context 관리가 매우 중요합니다.
                연관 없는 context는 Claude의 성능을 떨어뜨리기도 합니다.
              </p>
            </div>

            <div className="mb-16">
              <h3 className="mb-6 text-3xl font-light text-gray-900">/context 커맨드</h3>
              <div className="mb-8 space-y-6 text-xl leading-relaxed text-gray-700">
                <p className="font-light">
                  작업을 시작하기 전에 <code className="rounded bg-gray-100 px-2 py-1 font-mono text-sm">/context</code> 커맨드로 현재 컨텍스트 사용량을 확인하세요.
                </p>
                <p className="font-light">
                  컨텍스트가 과도하게 사용되면 Claude의 성능이 떨어질 수 있습니다.
                  불필요한 정보가 쌓여 컨텍스트가 오염되면 <code className="rounded bg-gray-100 px-2 py-1 font-mono text-sm">/compact</code>나 <code className="rounded bg-gray-100 px-2 py-1 font-mono text-sm">/clear</code> 커맨드로 정리할 수 있습니다.
                </p>
              </div>

              <div className="rounded-sm border border-gray-200 bg-gray-50 p-6">
                <h4 className="mb-3 text-xl font-light text-gray-900">왜 중요한가요?</h4>
                <div className="space-y-2 text-xl font-light text-gray-600">
                  <p>• 컨텍스트 사용량이 높으면 응답 속도가 느려집니다</p>
                  <p>• 불필요한 정보가 많으면 정확도가 떨어집니다</p>
                  <p>• 주기적으로 확인하고 정리하는 습관이 중요합니다</p>
                </div>
              </div>
            </div>

            <div className="mb-16">
              <h3 className="mb-6 text-3xl font-light text-gray-900">/init 커맨드</h3>
              <div className="space-y-6 text-xl leading-relaxed text-gray-700">
                <p className="font-light">
                  처음 프로젝트를 열고 Claude Code를 켰을 때 <code className="rounded bg-gray-100 px-2 py-1 font-mono text-sm">/init</code> 커맨드를 사용해보세요.
                  Claude가 전체 코드베이스를 파악하고 이해하게 해줍니다.
                </p>
              </div>

              <div className="mt-8 space-y-3 rounded-sm border border-gray-200 bg-white p-6">
                <div className="flex items-start gap-3">
                  <span className="text-xl text-gray-400">•</span>
                  <span className="text-xl font-light text-gray-700">Project 목적과 아키텍쳐</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl text-gray-400">•</span>
                  <span className="text-xl font-light text-gray-700">중요한 커맨드와 파일들</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl text-gray-400">•</span>
                  <span className="text-xl font-light text-gray-700">코딩 패턴이나 structure</span>
                </div>
              </div>

              <p className="mt-6 text-xl font-light text-gray-600">
                코드를 분석하고 나면 Claude는 summary를 작성한 CLAUDE.md 파일을 만듭니다.
              </p>
              <p className="mt-3 text-xl font-light text-gray-600">
                만약 CLAUDE.md 파일이 이미 존재한다면 <code className="rounded bg-gray-100 px-2 py-1 font-mono text-sm">/init</code> 커맨드를 실행할 필요가 없습니다.
                Claude는 자동으로 이 파일을 읽어 프로젝트를 이해합니다.
              </p>
            </div>

            <div className="mb-16">
              <h3 className="mb-6 text-3xl font-light text-gray-900">CLAUDE.md 파일</h3>
              <div className="mb-8 space-y-6 text-xl leading-relaxed text-gray-700">
                <p className="font-light">
                  CLAUDE.md 파일은 두 가지 메인 목적을 수행합니다.
                </p>
              </div>

              <div className="mb-12 space-y-4">
                <div className="border-l-2 border-gray-200 pl-6">
                  <p className="text-xl font-light text-gray-700">Claude가 전체 프로젝트를 파악하게 합니다</p>
                </div>
                <div className="border-l-2 border-gray-200 pl-6">
                  <p className="text-xl font-light text-gray-700">Claude가 특정한 지시나 커스텀한 지시를 받을 수 있게 합니다</p>
                </div>
              </div>

              <h4 className="mb-6 text-2xl font-light text-gray-900">파일 위치</h4>
              <div className="space-y-6">
                <div className="rounded-sm border border-gray-200 bg-white p-6">
                  <code className="mb-2 block font-mono text-base text-gray-900">CLAUDE.md</code>
                  <p className="text-xl font-light text-gray-600">프로젝트에 위치, 다른 엔지니어도 같이 사용하는 파일</p>
                </div>
                <div className="rounded-sm border border-gray-200 bg-white p-6">
                  <code className="mb-2 block font-mono text-base text-gray-900">CLAUDE.local.md</code>
                  <p className="text-xl font-light text-gray-600">로컬에서만 적용하는 md 파일</p>
                </div>
                <div className="rounded-sm border border-gray-200 bg-white p-6">
                  <code className="mb-2 block font-mono text-base text-gray-900">~/.claude/CLAUDE.md</code>
                  <p className="text-xl font-light text-gray-600">유저 레벨, 어떤 프로젝트에서도 적용시키는 파일</p>
                </div>
              </div>
            </div>

            <div className="mb-16">
              <h3 className="mb-6 text-3xl font-light text-gray-900">Custom Instructions 추가</h3>
              <div className="space-y-6 text-xl leading-relaxed text-gray-700">
                <p className="font-light">
                  Claude가 어떻게 behave할지 CLAUDE.md에 추가하는 것으로 커스텀이 가능합니다.
                </p>
                <p className="font-light">
                  <code className="rounded bg-gray-100 px-2 py-1 font-mono text-sm">#</code> 커맨드를 활용하면 효과적으로 CLAUDE.md 파일 수정이 가능합니다.
                </p>
              </div>

              <div className="mt-8 rounded-sm border border-gray-200 bg-gray-50 p-6">
                <code className="block font-mono text-sm text-gray-700">
                  # Use comments sparingly. Only Comment complex code.
                </code>
              </div>
            </div>

            <div>
              <h3 className="mb-6 text-3xl font-light text-gray-900">파일 멘션 with @</h3>
              <div className="space-y-6 text-xl leading-relaxed text-gray-700">
                <p className="font-light">
                  <code className="rounded bg-gray-100 px-2 py-1 font-mono text-sm">@</code> 심볼로 파일 멘션이 가능합니다.
                  연관된 파일 전체를 묻는 것도 마찬가지로 멘션 기능을 활용할 수 있습니다.
                </p>
              </div>
            </div>
          </section>

          {/* Making Changes */}
          <section id="changes" className="mb-32">
            <div className="mb-8">
              <span className="text-xs font-light tracking-wider text-gray-400">06</span>
            </div>
            <h2 className="mb-12 text-5xl font-light text-gray-900">Making Changes</h2>

            <div className="mb-16">
              <h3 className="mb-6 text-3xl font-light text-gray-900">스크린샷 활용하기</h3>
              <div className="space-y-6 text-xl leading-relaxed text-gray-700">
                <p className="font-light">
                  스크린샷을 활용할 수도 있습니다.
                  <code className="mx-1 rounded bg-gray-100 px-2 py-1 font-mono text-sm">Ctrl+V</code> 나
                  <code className="mx-1 rounded bg-gray-100 px-2 py-1 font-mono text-sm">CMD+V</code> 커맨드를 사용하면
                  클립보드에 있는 이미지 첨부가 가능합니다.
                </p>
              </div>
            </div>

            <div className="mb-16">
              <h3 className="mb-6 text-3xl font-light text-gray-900">Planning Mode</h3>
              <div className="space-y-6 text-xl leading-relaxed text-gray-700">
                <p className="font-light">
                  계획부터 세우는 모드입니다.
                </p>
              </div>

              <div className="mt-8 rounded-sm border border-gray-200 bg-gray-50 p-8">
                <h4 className="mb-4 text-xl font-light text-gray-900">언제 사용하나요?</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-xl text-gray-400">•</span>
                    <span className="text-xl font-light text-gray-700">태스크가 여러 코드베이스에 대한 이해가 필요할 때</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xl text-gray-400">•</span>
                    <span className="text-xl font-light text-gray-700">단계적인 구현이 필요할 때</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xl text-gray-400">•</span>
                    <span className="text-xl font-light text-gray-700">여러 파일과 컴포넌트에 영향이 있을 때</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-6 text-3xl font-light text-gray-900">Thinking Modes</h3>
              <div className="mb-8 space-y-6 text-xl leading-relaxed text-gray-700">
                <p className="font-light">
                  Claude는 'thinking' 모드를 사용해서 여러 가지 level의 reasoning이 가능합니다.
                </p>
              </div>

              <div className="mb-8 space-y-3 rounded-sm border border-gray-200 bg-white p-6">
                <code className="block font-mono text-sm text-gray-700">Think</code>
                <code className="block font-mono text-sm text-gray-700">Think more</code>
                <code className="block font-mono text-sm text-gray-700">Think a lot</code>
                <code className="block font-mono text-sm text-gray-700">Think longer</code>
                <code className="block font-mono text-sm text-gray-700">Ultrathink</code>
              </div>

              <div className="rounded-sm border border-gray-200 bg-gray-50 p-8">
                <h4 className="mb-4 text-xl font-light text-gray-900">언제 사용하나요?</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-xl text-gray-400">•</span>
                    <span className="text-xl font-light text-gray-700">복잡한 로직의 문제</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xl text-gray-400">•</span>
                    <span className="text-xl font-light text-gray-700">어려운 이슈를 디버깅할 때</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xl text-gray-400">•</span>
                    <span className="text-xl font-light text-gray-700">알고리즘 챌린지</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Controlling Context */}
          <section id="control" className="mb-32">
            <div className="mb-8">
              <span className="text-xs font-light tracking-wider text-gray-400">07</span>
            </div>
            <h2 className="mb-12 text-5xl font-light text-gray-900">Controlling Context</h2>

            <div className="mb-16">
              <h3 className="mb-6 text-3xl font-light text-gray-900">응답 취소</h3>
              <div className="space-y-6 text-xl leading-relaxed text-gray-700">
                <p className="font-light">
                  Claude가 응답할 때 <code className="rounded bg-gray-100 px-2 py-1 font-mono text-sm">Escape</code>로 취소가 가능합니다.
                </p>
                <p className="font-light">
                  이상한 동작을 한다면 취소시킨 상태에서 <code className="rounded bg-gray-100 px-2 py-1 font-mono text-sm">#</code> 메모리를 업데이트해서 개선하는 것도 가능합니다.
                </p>
              </div>
            </div>

            <div className="mb-16">
              <h3 className="mb-6 text-3xl font-light text-gray-900">대화 중 특정 부분 자르기</h3>
              <div className="space-y-6 text-xl leading-relaxed text-gray-700">
                <p className="font-light">
                  <code className="rounded bg-gray-100 px-2 py-1 font-mono text-sm">Escape</code>를 두 번 누르면
                  현재 대화 내역에서 이전으로 회귀가 가능합니다.
                </p>
              </div>
            </div>

            <div>
              <h3 className="mb-6 text-3xl font-light text-gray-900">Context 관리 커맨드</h3>
              <div className="space-y-6">
                <div className="rounded-sm border border-gray-200 bg-white p-6">
                  <code className="mb-2 block font-mono text-base text-gray-900">/compact</code>
                  <p className="text-xl font-light text-gray-600">context 압축하는 커맨드</p>
                </div>
                <div className="rounded-sm border border-gray-200 bg-white p-6">
                  <code className="mb-2 block font-mono text-base text-gray-900">/clear</code>
                  <p className="text-xl font-light text-gray-600">대화 내역 지우는 커맨드</p>
                </div>
              </div>
            </div>
          </section>

          {/* Custom 커맨드 */}
          <section id="custom" className="mb-32">
            <div className="mb-8">
              <span className="text-xs font-light tracking-wider text-gray-400">08</span>
            </div>
            <h2 className="mb-12 text-5xl font-light text-gray-900">Custom 커맨드</h2>
            <div className="space-y-6 text-xl leading-relaxed text-gray-700">
              <p className="font-light">
                커스텀 커맨드도 만들 수 있습니다. 반복적인 작업을 자동화할 때 유용합니다.
              </p>
            </div>
          </section>

          {/* MCP Servers */}
          <section id="mcp" className="mb-32">
            <div className="mb-8">
              <span className="text-xs font-light tracking-wider text-gray-400">09</span>
            </div>
            <h2 className="mb-12 text-5xl font-light text-gray-900">MCP Servers</h2>

            <div className="mb-12 space-y-6 text-xl leading-relaxed text-gray-700">
              <p className="font-light">
                MCP(Model Context Protocol) Servers는 Claude Code의 능력을 확장하는 고급 기능입니다.
              </p>
              <p className="font-light">
                외부 서비스나 데이터베이스와 연결하거나, 브라우저 자동화 같은 특수한 작업을 수행할 수 있게 해줍니다.
                필요에 따라 활용하면 좋지만, 기본적인 작업에는 필수가 아닙니다.
              </p>
            </div>

            <div className="rounded-sm border border-gray-200 bg-gray-50 p-8">
              <h4 className="mb-4 text-xl font-light text-gray-900">MCP로 할 수 있는 것들</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-xl text-gray-400">•</span>
                  <span className="text-xl font-light text-gray-700">브라우저 자동화 (Playwright)</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl text-gray-400">•</span>
                  <span className="text-xl font-light text-gray-700">데이터베이스 연결 및 쿼리</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl text-gray-400">•</span>
                  <span className="text-xl font-light text-gray-700">외부 API 통합</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl text-gray-400">•</span>
                  <span className="text-xl font-light text-gray-700">파일 시스템 확장 기능</span>
                </div>
              </div>

              <p className="mt-6 text-base font-light italic text-gray-600">
                심화 학습이 필요할 때 공식 문서를 참고하세요:
                <a
                  href="https://modelcontextprotocol.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1 underline hover:text-gray-900"
                >
                  modelcontextprotocol.io
                </a>
              </p>
            </div>
          </section>

          {/* Agents vs Skills */}
          <section id="agents-skills" className="mb-32">
            <div className="mb-8">
              <span className="text-xs font-light tracking-wider text-gray-400">10</span>
            </div>
            <h2 className="mb-12 text-5xl font-light text-gray-900">Agents vs Skills</h2>

            <div className="mb-16 space-y-6 text-xl leading-relaxed text-gray-700">
              <p className="font-light">
                Claude Code는 두 가지 주요 확장 방식을 제공합니다. Agents와 Skills는 각각 다른 목적으로 사용됩니다.
              </p>
              <p className="font-light">
                언제 어떤 것을 사용해야 할지 명확히 이해하면 훨씬 효율적으로 작업할 수 있습니다.
              </p>
            </div>

            {/* Comparison Table */}
            <div className="mb-16 rounded-sm border border-gray-200 bg-white">
              <div className="grid grid-cols-2 gap-px bg-gray-200">
                {/* Agents Column */}
                <div className="bg-white p-8">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="rounded-sm bg-orange-100 px-3 py-1">
                      <p className="text-sm font-light text-orange-900">Agents</p>
                    </div>
                  </div>

                  <h4 className="mb-4 text-xl font-normal text-gray-900">특징</h4>
                  <div className="mb-6 space-y-3 text-xl font-light text-gray-600">
                    <div className="flex items-start gap-2">
                      <span className="text-gray-400">•</span>
                      <span>독립적인 컨텍스트 윈도우</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-gray-400">•</span>
                      <span>복잡한 멀티스텝 작업 실행</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-gray-400">•</span>
                      <span>메인 대화와 분리된 프로세스</span>
                    </div>
                  </div>

                  <h4 className="mb-4 text-xl font-normal text-gray-900">언제 사용하나요?</h4>
                  <div className="mb-6 space-y-3 text-xl font-light text-gray-600">
                    <div className="flex items-start gap-2">
                      <span className="text-gray-400">•</span>
                      <span>온보딩 워크플로우 가이드</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-gray-400">•</span>
                      <span>복잡한 페이지 생성 플로우</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-gray-400">•</span>
                      <span>코드 리뷰 자동화</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-gray-400">•</span>
                      <span>컨텍스트 격리가 필요한 작업</span>
                    </div>
                  </div>

                  <h4 className="mb-4 text-xl font-normal text-gray-900">저장 위치</h4>
                  <div className="space-y-2 text-base font-light">
                    <code className="block rounded bg-gray-50 px-3 py-2 font-mono text-gray-700">
                      .claude/agents/
                    </code>
                    <code className="block rounded bg-gray-50 px-3 py-2 font-mono text-gray-700">
                      ~/.claude/agents/
                    </code>
                  </div>
                </div>

                {/* Skills Column */}
                <div className="bg-white p-8">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="rounded-sm bg-blue-100 px-3 py-1">
                      <p className="text-sm font-light text-blue-900">Skills</p>
                    </div>
                  </div>

                  <h4 className="mb-4 text-xl font-normal text-gray-900">특징</h4>
                  <div className="mb-6 space-y-3 text-xl font-light text-gray-600">
                    <div className="flex items-start gap-2">
                      <span className="text-gray-400">•</span>
                      <span>Claude의 지식 확장</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-gray-400">•</span>
                      <span>메인 컨텍스트 내에서 작동</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-gray-400">•</span>
                      <span>모델이 자동으로 활성화 판단</span>
                    </div>
                  </div>

                  <h4 className="mb-4 text-xl font-normal text-gray-900">언제 사용하나요?</h4>
                  <div className="mb-6 space-y-3 text-xl font-light text-gray-600">
                    <div className="flex items-start gap-2">
                      <span className="text-gray-400">•</span>
                      <span>스크립트 작성 가이드</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-gray-400">•</span>
                      <span>코딩 컨벤션 학습</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-gray-400">•</span>
                      <span>특정 파일 포맷 처리</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-gray-400">•</span>
                      <span>반복적인 패턴 자동화</span>
                    </div>
                  </div>

                  <h4 className="mb-4 text-xl font-normal text-gray-900">작성 가이드</h4>
                  <div className="mb-6 space-y-4">
                    <div>
                      <p className="mb-2 text-base font-normal text-gray-700">하나의 기능에 집중</p>
                      <div className="space-y-2 text-base font-light text-gray-600">
                        <div className="flex items-start gap-2">
                          <span className="text-green-400">✓</span>
                          <div className="flex-1">
                            <span className="text-gray-700">집중적:</span>
                            <span className="ml-2">"PDF form filling", "Excel data analysis"</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-red-400">✗</span>
                          <div className="flex-1">
                            <span className="text-gray-700">너무 광범위:</span>
                            <span className="ml-2">"Document processing", "Data tools"</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="mb-2 text-base font-normal text-gray-700">명확한 트리거 포함</p>
                      <div className="space-y-2 text-base font-light text-gray-600">
                        <div className="flex items-start gap-2">
                          <span className="text-gray-400">•</span>
                          <span>설명에 특정 키워드나 트리거를 포함하여 Claude가 자동으로 활성화하도록 유도</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-gray-400">•</span>
                          <span>예: "Triggered on 'optimize page'" 같은 명시적 표현 사용</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h4 className="mb-4 text-xl font-normal text-gray-900">저장 위치</h4>
                  <div className="space-y-2 text-base font-light">
                    <code className="block rounded bg-gray-50 px-3 py-2 font-mono text-gray-700">
                      .claude/skills/
                    </code>
                    <code className="block rounded bg-gray-50 px-3 py-2 font-mono text-gray-700">
                      ~/.claude/skills/
                    </code>
                  </div>
                </div>
              </div>
            </div>

            {/* Decision Guide */}
            <div className="mb-16">
              <h3 className="mb-6 text-3xl font-light text-gray-900">선택 가이드</h3>
              <div className="rounded-sm border border-gray-200 bg-white">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="p-4 text-left text-base font-normal text-gray-900">시나리오</th>
                      <th className="p-4 text-left text-base font-normal text-gray-900">추천</th>
                      <th className="p-4 text-left text-base font-normal text-gray-900">이유</th>
                    </tr>
                  </thead>
                  <tbody className="text-base font-light">
                    <tr className="border-b border-gray-100">
                      <td className="p-4 text-gray-700">팀원 온보딩 워크플로우</td>
                      <td className="p-4">
                        <span className="rounded-sm bg-orange-100 px-2 py-1 text-orange-900">Agent</span>
                      </td>
                      <td className="p-4 text-gray-600">여러 단계의 독립적 실행 필요</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 text-gray-700">코딩 스타일 가이드</td>
                      <td className="p-4">
                        <span className="rounded-sm bg-blue-100 px-2 py-1 text-blue-900">Skill</span>
                      </td>
                      <td className="p-4 text-gray-600">지식 확장, 대화 중 자연스럽게 적용</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 text-gray-700">복잡한 디버깅 플로우</td>
                      <td className="p-4">
                        <span className="rounded-sm bg-orange-100 px-2 py-1 text-orange-900">Agent</span>
                      </td>
                      <td className="p-4 text-gray-600">격리된 컨텍스트에서 집중 분석</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 text-gray-700">API 문서 작성 규칙</td>
                      <td className="p-4">
                        <span className="rounded-sm bg-blue-100 px-2 py-1 text-blue-900">Skill</span>
                      </td>
                      <td className="p-4 text-gray-600">형식과 패턴을 학습하여 자동 적용</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 text-gray-700">PR 생성 + 코드 리뷰 요청</td>
                      <td className="p-4">
                        <span className="rounded-sm bg-orange-100 px-2 py-1 text-orange-900">Agent</span>
                      </td>
                      <td className="p-4 text-gray-600">멀티스텝 자동화 워크플로우</td>
                    </tr>
                    <tr>
                      <td className="p-4 text-gray-700">특정 파일 포맷 처리</td>
                      <td className="p-4">
                        <span className="rounded-sm bg-blue-100 px-2 py-1 text-blue-900">Skill</span>
                      </td>
                      <td className="p-4 text-gray-600">도메인 지식 제공</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Practical Example */}
            <div className="rounded-sm border border-gray-200 bg-gray-50 p-8">
              <h4 className="mb-4 text-xl font-light text-gray-900">실전 예시</h4>
              <div className="space-y-6 text-xl font-light leading-relaxed text-gray-700">
                <div>
                  <p className="mb-2 font-normal text-gray-900">Agent 예시: &ldquo;project-setup&rdquo;</p>
                  <p className="text-gray-600">
                    신규 팀원에게 프로젝트 셋업부터 첫 PR 제출까지 전체 플로우를 단계별로 안내하는 온보딩 에이전트입니다.
                    독립적인 워크플로우로 실행되며, 메인 작업을 방해하지 않습니다.
                  </p>
                </div>
                <div>
                  <p className="mb-2 font-normal text-gray-900">Skill 예시: &ldquo;api-doc-writer&rdquo;</p>
                  <p className="text-gray-600">
                    API 문서 작성 시 자동으로 활성화되어 OpenAPI 스펙 형식,
                    엔드포인트 네이밍 규칙, 에러 코드 패턴을 적용해줍니다. 메인 대화 흐름을 유지하면서 지식을 제공합니다.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Github Integration */}
          <section id="github" className="mb-32">
            <div className="mb-8">
              <span className="text-xs font-light tracking-wider text-gray-400">11</span>
            </div>
            <h2 className="mb-12 text-5xl font-light text-gray-900">
              Github Integration
              <span className="ml-3 text-2xl font-light text-gray-400">(개발자용)</span>
            </h2>

            <div className="mb-12 space-y-6 text-xl leading-relaxed text-gray-700">
              <p className="font-light">
                Claude Code로 GitHub Actions에서 Claude가 실행되게 할 수 있습니다.
              </p>
            </div>

            <div className="mb-12 rounded-sm border border-gray-200 bg-gray-50 p-6">
              <code className="block font-mono text-sm text-gray-700">/install-github-app</code>
            </div>

            <div>
              <h3 className="mb-6 text-3xl font-light text-gray-900">Default Github Actions</h3>

              <div className="space-y-12">
                <div>
                  <h4 className="mb-4 text-2xl font-light text-gray-900">Mention Action</h4>
                  <p className="mb-6 text-xl font-light leading-relaxed text-gray-700">
                    어떤 이슈나 PR에 대해 Claude를 멘션할 수 있습니다.
                  </p>
                  <div className="rounded-sm border border-gray-200 bg-white p-6">
                    <code className="font-mono text-base text-gray-700">@claude</code>
                  </div>
                </div>

                <div>
                  <h4 className="mb-4 text-2xl font-light text-gray-900">PR Action</h4>
                  <p className="text-xl font-light leading-relaxed text-gray-700">
                    PR을 생성할 때 Claude가 자동으로 리뷰, 분석, 리포트가 가능합니다.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Hooks */}
          <section id="hooks" className="mb-32">
            <div className="mb-8">
              <span className="text-xs font-light tracking-wider text-gray-400">12</span>
            </div>
            <h2 className="mb-12 text-5xl font-light text-gray-900">
              Introducing Hooks
              <span className="ml-3 text-2xl font-light text-gray-400">(개발자용)</span>
            </h2>

            <div className="mb-12 space-y-6 text-xl leading-relaxed text-gray-700">
              <p className="font-light">
                Hooks는 Claude가 툴을 사용하기 전이나 후에 커맨드를 실행하는 것입니다.
                자동화 워크플로우를 구현할 때 유용합니다.
              </p>
            </div>

            {/* Hooks Diagram */}
            <div className="mb-12 rounded-sm border border-gray-200 bg-gray-50 p-12">
              <div className="relative min-h-[600px]">
                {/* Participants */}
                <div className="relative flex" style={{ paddingLeft: '12.5%', paddingRight: '12.5%' }}>
                  <div className="absolute" style={{ left: '12.5%', transform: 'translateX(-50%)' }}>
                    <div className="rounded-sm border border-gray-300 bg-white px-8 py-3">
                      <p className="text-lg font-light text-gray-900 whitespace-nowrap">You</p>
                    </div>
                  </div>
                  <div className="absolute" style={{ left: '50%', transform: 'translateX(-50%)' }}>
                    <div className="rounded-sm border border-gray-300 bg-white px-8 py-3">
                      <p className="text-lg font-light text-gray-900 whitespace-nowrap">Claude Code</p>
                    </div>
                  </div>
                  <div className="absolute" style={{ left: '87.5%', transform: 'translateX(-50%)' }}>
                    <div className="rounded-sm border border-gray-300 bg-white px-8 py-3">
                      <p className="text-lg font-light text-gray-900 whitespace-nowrap">Claude</p>
                    </div>
                  </div>
                </div>

                {/* Lifelines */}
                <div className="absolute top-16 bottom-0" style={{ left: '12.5%', width: '2px' }}>
                  <div className="h-full border-l-2 border-dashed border-gray-300"></div>
                </div>
                <div className="absolute top-16 bottom-0" style={{ left: '50%', width: '2px' }}>
                  <div className="h-full border-l-2 border-dashed border-gray-300"></div>
                </div>
                <div className="absolute top-16 bottom-0" style={{ left: '87.5%', width: '2px' }}>
                  <div className="h-full border-l-2 border-dashed border-gray-300"></div>
                </div>

                {/* Messages */}
                <div className="relative pt-24 space-y-12">
                  {/* Step 1: You -> Claude Code */}
                  <div className="relative" style={{ height: '40px' }}>
                    <div className="absolute" style={{ left: '12.5%', right: '50%', top: '50%' }}>
                      <svg width="100%" height="8" className="absolute top-0" style={{ overflow: 'visible', transform: 'translateY(-3px)' }}>
                        <defs>
                          <marker id="hooksArrowR1" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
                            <polygon points="0,0 8,4 0,8" fill="#9ca3af" />
                          </marker>
                        </defs>
                        <line x1="0" y1="4" x2="100%" y2="4" stroke="#9ca3af" strokeWidth="1" markerEnd="url(#hooksArrowR1)" />
                      </svg>
                      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full -mt-2">
                        <p className="text-xs font-light italic text-gray-600 bg-gray-50 px-2 whitespace-nowrap">
                          main.go 파일에 어떤 코드가 있어?
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Claude Code -> Claude */}
                  <div className="relative" style={{ height: '50px' }}>
                    <div className="absolute" style={{ left: '50%', right: '12.5%', top: '50%' }}>
                      <svg width="100%" height="8" className="absolute top-0" style={{ overflow: 'visible', transform: 'translateY(-3px)' }}>
                        <defs>
                          <marker id="hooksArrowR2" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
                            <polygon points="0,0 8,4 0,8" fill="#9ca3af" />
                          </marker>
                        </defs>
                        <line x1="0" y1="4" x2="100%" y2="4" stroke="#9ca3af" strokeWidth="1" markerEnd="url(#hooksArrowR2)" />
                      </svg>
                      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full -mt-2">
                        <div className="text-xs font-light italic text-gray-600 bg-gray-50 px-2">
                          <p className="whitespace-nowrap">main.go 파일에 어떤 코드가 있어?</p>
                          <p className="text-gray-500 whitespace-nowrap">파일을 읽고 싶다면 "ReadFile: 파일명"으로 응답하세요</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Claude -> Claude Code */}
                  <div className="relative" style={{ height: '40px' }}>
                    <div className="absolute" style={{ left: '50%', right: '12.5%', top: '50%' }}>
                      <svg width="100%" height="8" className="absolute top-0" style={{ overflow: 'visible', transform: 'translateY(-3px)' }}>
                        <defs>
                          <marker id="hooksArrowL3" markerWidth="8" markerHeight="8" refX="0" refY="4" orient="auto">
                            <polygon points="8,0 0,4 8,8" fill="#9ca3af" />
                          </marker>
                        </defs>
                        <line x1="0" y1="4" x2="100%" y2="4" stroke="#9ca3af" strokeWidth="1" markerStart="url(#hooksArrowL3)" />
                      </svg>
                      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full -mt-2">
                        <p className="text-base font-light text-gray-900 bg-gray-50 px-2 whitespace-nowrap">
                          ReadFile: main.go
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step 4: PreToolUse Hook */}
                  <div className="relative flex justify-center" style={{ height: '40px' }}>
                    <div className="absolute" style={{ left: '50%', transform: 'translateX(-50%)' }}>
                      <div className="rounded-sm bg-orange-200 px-4 py-2 border border-orange-300">
                        <p className="text-base font-light text-gray-900 whitespace-nowrap">PreToolUse 훅 실행</p>
                      </div>
                    </div>
                  </div>

                  {/* Step 5: Claude Code reads file */}
                  <div className="relative flex justify-center" style={{ height: '40px' }}>
                    <div className="absolute" style={{ left: '50%', transform: 'translateX(-50%)' }}>
                      <div className="rounded-sm bg-yellow-100 px-4 py-2 border border-yellow-300">
                        <p className="text-base font-light text-gray-900 whitespace-nowrap">Claude Code가 파일을 읽습니다</p>
                      </div>
                    </div>
                  </div>

                  {/* Step 6: PostToolUse Hook */}
                  <div className="relative flex justify-center" style={{ height: '40px' }}>
                    <div className="absolute" style={{ left: '50%', transform: 'translateX(-50%)' }}>
                      <div className="rounded-sm bg-orange-200 px-4 py-2 border border-orange-300">
                        <p className="text-base font-light text-gray-900 whitespace-nowrap">PostToolUse 훅 실행</p>
                      </div>
                    </div>
                  </div>

                  {/* Step 7: Claude Code -> Claude */}
                  <div className="relative" style={{ height: '40px' }}>
                    <div className="absolute" style={{ left: '50%', right: '12.5%', top: '50%' }}>
                      <svg width="100%" height="8" className="absolute top-0" style={{ overflow: 'visible', transform: 'translateY(-3px)' }}>
                        <defs>
                          <marker id="hooksArrowR7" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
                            <polygon points="0,0 8,4 0,8" fill="#9ca3af" />
                          </marker>
                        </defs>
                        <line x1="0" y1="4" x2="100%" y2="4" stroke="#9ca3af" strokeWidth="1" markerEnd="url(#hooksArrowR7)" />
                      </svg>
                      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full -mt-2">
                        <p className="text-xs font-light italic text-gray-600 bg-gray-50 px-2 whitespace-nowrap">
                          {'<main.go 파일 내용>'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-12 space-y-4 rounded-sm border border-gray-200 bg-white p-8">
              <h4 className="mb-4 text-xl font-light text-gray-900">Hooks 활용 사례</h4>
              <div className="flex items-center gap-3">
                <span className="text-xl text-gray-400">•</span>
                <span className="text-xl font-light text-gray-700">코드 포매팅</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl text-gray-400">•</span>
                <span className="text-xl font-light text-gray-700">테스팅</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl text-gray-400">•</span>
                <span className="text-xl font-light text-gray-700">Access Control</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl text-gray-400">•</span>
                <span className="text-xl font-light text-gray-700">코드 퀄리티</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl text-gray-400">•</span>
                <span className="text-xl font-light text-gray-700">로깅</span>
              </div>
            </div>

            <div className="rounded-sm border border-gray-200 bg-gray-50 p-8">
              <p className="text-xl font-light leading-relaxed text-gray-700">
                툴 콜 전에 실행되는 pretool, posttool이라 생각하면 됩니다.
              </p>
            </div>
          </section>

          {/* Footer */}
          <footer className="border-t border-gray-200 pt-16 text-center">
            <p className="text-sm font-light text-gray-400">
              Claude Code Documentation
            </p>
          </footer>

        </div>
      </main>
    </div>
  )
}

export default ClaudeCodeGuide
