# State of Agrikit: presenter script

30 minutes · Engineering department · Microsoft Teams · deck at `http://127.0.0.1:5180/deck/`

How to read this: **quoted text is what you say**. Bold labels are what you do. Most slides end with a **Next** line that carries you to the following slide; the Q&A slide has a close instead. The time on each heading is when that slide should start; the deck's footer clock shows the same plan and turns red if you're more than 90 seconds behind.

---

## Before you go live (15 minutes ahead)

1. **Deck:** `npm run dev` in `agrikit-state-deck`, open `http://127.0.0.1:5180/deck/` (keep the trailing slash), press `F` for fullscreen.
2. **Teams:** share the **deck window only**, not your screen. Keep this script on a second screen. Leave deck notes off.
3. **Demo 1:** `npm run dev` in `cobank-app-starter` (port 5173). Clean branch. Copilot signed in. Agrikit MCP shows as running in the Copilot tools list.
4. **Demo 2:** `npm run dev` in `shd-design`. Browser tab already on the approval package flow.
5. **VS Code:** both repos open in separate windows.
6. **JFrog:** run `npm whoami --registry=https://cobank.jfrog.io/artifactory/api/npm/NPM/`. If it fails, `npm login` now, or the MCP server won't start during the demo.
7. **Press `T`** on slide 1 as you start talking to reset the pace clock.

**Keys:** `→` / Space next · `←` back · `F` fullscreen · `T` restart clock · `N` notes · type `#/14` in the address bar to jump to a slide.

| Start | Slides | Section |
| --- | --- | --- |
| 0:00 | 1–2 | Intro |
| 2:00 | 3–6 | State of Agrikit |
| 7:00 | 7–8 | Upcoming |
| 11:00 | 9–13 | MCP & AI toolkit |
| 17:00 | 14–15 | Live demos |
| 25:00 | 16–18 | Developer handoff |
| 28:30 | 19 | Q&A |

**If you're behind:** at 17:00, shorten Demo 2 to the browser walkthrough only. At 25:00, skip slide 16 and open slide 17 with "Today it's team by team."

---

## Intro

### 1 · Title · 0:00

> "Hi everyone. Thanks for making time. I'm here on behalf of Agrikit Engineering.
>
> I've got thirty minutes, and the best part is in the middle: two live demos. So I'll keep the slides tight.
>
> If you remember one thing: Agrikit isn't just a component catalog anymore. It's the components *plus* the tooling that lets you, and your AI assistant, use them correctly.
>
> Last week we shipped version 21.15.3. That's release number 325 since version 1.0 two years ago. Seventy-two components, and an MCP server with ten tools. I'll explain what that means in a few minutes."

**Next** (press →): "Here's the plan."

### 2 · Agenda · 1:00

> "Six parts. Where Agrikit stands. What's coming next. The MCP and AI toolkit. Then two demos: cobank-app-starter and shd-design. Then how we hand work off between design and engineering, and three asks for you.
>
> Put questions in the Teams chat as we go. I'll take them at the end."

**Next:** "Let's start with what Agrikit actually is."

---

## State of Agrikit

### 3 · One library, six entry points · 2:00

> "If you're new to it: Agrikit is CoBank's React component library, built on MUI version 7 and TypeScript. Anything starting with *Cb* comes from us. Everything else is plain MUI.
>
> Two things matter for app teams.
>
> First, it's layered. Foundations are the theme and tokens. Then components. Then templates: CbAppShell and CbPage give you the whole product frame, with header, navigation and page layout. Then patterns like approvals, notes and MFA.
>
> Second, the specialised pieces have their own entry points: premium data grid, the Pro date range picker, PDF, notes and MFA. You only install those extra dependencies if you use them.
>
> Everything is documented at design.cobank.net, which you can see on the right."

**Next:** "So how big is it now?"

### 4 · By the numbers · 3:00

**Point at:** the three green "from June" deltas.

> "In June we shared a snapshot with TDI leadership. Since then, components went from 61 to 72. Storybook stories from 351 to 476. And stories that are screenshot-tested and accessibility-checked on every PR went from 215 to 274.
>
> We've had 31 releases in the last 90 days. That's weekly. Every bug fix or feature that merges publishes automatically.
>
> And 25 people committed to the library this year. This isn't one team's side project anymore.
>
> On the right: inputs and data display are the biggest categories, which matches what app teams ask us for most."

**Next:** "Here's what that looked like in practice since the summer."

### 5 · Shipped since v21 · 4:30

**Don't read the whole timeline. Pick two:**

> "A few highlights since version 21 in June.
>
> CbTimeline, bottom left: a grouped activity view. Two weeks after it shipped, we optimised it for large data sets.
>
> CbToolbar, in the middle, shipped last week. It adapts to its *container*, not the screen, so the same toolbar works in a full page or a narrow drawer.
>
> And we moved the MFA components into Agrikit, so that's one less copy-pasted implementation across apps.
>
> One heads-up: version 21.0 had a breaking change to CbNotes. If you're still on 20, read the release notes before you upgrade."

**Next:** "Shipping weekly only works if quality is automatic."

### 6 · Quality gates · 5:30

**Point at:** the five steps left to right, then the baseline image, then the two agents on the right.

> "Every change goes through the same gates. On commit: lint, spec sync, and drift detection. 'Drift' is our word for when the code, spec, story and docs stop agreeing. On push: we check the spec, story, docs and tests all changed together. On the PR: build, plus screenshot and accessibility tests. Then a visual review in Chromatic. Merging to main publishes the library and the MCP server together.
>
> The middle image is a real baseline from the repo. There are 296 of these. Any pixel change has to be explained.
>
> On the right are two scheduled agents. Every week, one audits accessibility and one audits performance. They read the codebase and the open issues, and open fix PRs. The last two patch releases came straight out of that loop."

**Next:** "That's where we are. Here's what's next."

---

## Upcoming

### 7 · Dark mode v2 · 7:00

> "Today, if you want dark mode, you build a separate dark theme, and switching means rebuilding the theme and re-rendering everything.
>
> Version 2 is one theme that uses CSS variables. You get light, dark, and *system*, which follows the user's operating system. Switching is instant, with no remount. You read and set the mode with MUI's `useColorScheme` hook. That's the code on the left.
>
> We're about two-thirds through, roughly 13 of 20 tasks. The hard part has landed: every component now reads its colours through CSS variables. The remaining work is dark visual regression, switch-performance evidence, light token groups, focus on every button, consumer docs, and final gates.
>
> And it's opt-in. The current theme doesn't change at all until you switch. No target release date is committed yet."

**Next:** "The second thing coming is about setup."

### 8 · Remote MCP · 9:00

> "The most common setup problem with our AI tooling is JFrog authentication plus npx. Remote MCP removes both.
>
> We'll run the MCP server next to Storybook at design.cobank.net/mcp. You point your AI client at that URL. That's it: no Node, no npm credentials. It always matches what Storybook shows, because they deploy together.
>
> Left is today's config, middle is roughly what it'll look like. It's internal-only, behind the VPN. The scaffolding tools stay local because they write files to your repo.
>
> To be clear, this is planned, not started, and no target date is committed. If your team uses an AI tool other than VS Code, Cursor or Claude, for example, tell me after this."

**Next:** "So why do we need an MCP server at all?"

---

## MCP & AI toolkit

### 9 · Your assistant knows MUI · 11:00

**Point at:** top left, then the red errors, then the right side.

> "Here's the whole problem on one slide.
>
> Top left is what Copilot writes when you ask for a customer card. It's valid React, but it's generic MUI: hard-coded colours, an image with no alt text, an icon button with no label. It looks fine, so it gets through review.
>
> Below it is real output from our accessibility tool on that exact code: two WCAG errors.
>
> On the right, same prompt with our MCP server connected. The assistant looks up the real component first, CbActionCard, with its real props, and produces the component you see underneath. It's themed, keyboard-accessible, and tagged for analytics."

**Next:** "So what is the toolkit, exactly?"

### 10 · Three layers, one install · 12:00

> "Three layers.
>
> *Facts:* the MCP server tells your assistant what components exist and what their props are, read live from the library.
>
> *Conventions:* instruction files and rules that tell it how we write code. Agrikit first, MUI path imports, accessibility. They apply automatically based on the file you're editing.
>
> *Workflows:* agents and skills, which are the step-by-step processes. Your repo gets the consumer agent, a PR reviewer, and 31 skills.
>
> The tree on the left is a real install I ran this morning. That's exactly what lands in your repo, and you commit it so everyone on the team gets the same context.
>
> It works in VS Code with Copilot, and it writes setup files for Cursor, Windsurf, JetBrains and Cline."

**Next:** "Here are the tools in the server."

### 11 · 10 tools, 3 prompts · 13:00

> "Four tools do most of the work, and everyone gets them: list components, get component, get theme tokens, and validate accessibility.
>
> The server checks what kind of repo it's running in. In an app repo, you get a tool that scaffolds app components. In the library repo, contributors get a different scaffold and four drift tools.
>
> Both panels are real output from this morning. The one to remember is get_component on the right: it returns real props, including deprecated ones, so the assistant stops using old APIs.
>
> And if you have an older app full of raw MUI, the migration_guide prompt helps you move it over."

**Next:** "Setting it up takes two commands."

### 12 · Two commands · 14:30

> "Install the library, then run `npx install-agrikit-ai`. That's real output on the left.
>
> It looks at your project: framework, TypeScript, MUI version. Then it copies in the instructions, rules, skills and agents, and writes the MCP config you see on the right. If you run it in a terminal, it also asks which editors your team uses.
>
> Commit the output. Re-run it whenever you upgrade Agrikit.
>
> If npm install fails with a 401, your JFrog token has expired. Run npm login and try again."

**Next:** "Once it's installed, here's how the agent actually works."

### 13 · Spec-first, with a human gate · 15:30

**Point at:** the blue "Review" step.

> "The consumer agent always follows these six steps. The one people underestimate is step four, the review gate.
>
> Before writing any code, the agent writes a short spec from this template. Section 0 is the important one. It records whether an Agrikit component already does the job, whether we wrap one, or whether it's a real gap. Then it *stops* and waits for you to approve. That's how AI output stays reviewable.
>
> On the right: it can't use raw MUI controls without writing down why. It can only use component names the server actually returned, so no invented components. And a PR reviewer agent ships with it.
>
> Real gaps from that Section 0 become issues for us, so the library grows from what you actually need."

**Next:** "Enough slides. Let's see it in real repos." **Switch to the browser.**

---

## Live demos

### 14 · ▶ Demo 1: cobank-app-starter · 17:00 (4 minutes)

> "cobank-app-starter is the kit designers, PMs and engineers use to prototype. The point is that the prototype is already real Agrikit, so it isn't thrown away."

**Do, in order:**

1. **Browser** `localhost:5173/setup`: pick **Customer Portal** or **DAX**.
   > "First you pick a product context. That sets the shell and navigation."
2. **`/home`:** toggle light and dark.
   > "That's CbAppShell, our product frame. Theme preference is saved."
3. **VS Code:** open `.vscode/mcp.json`, then `.github/agents/`, then `PRODUCT_CONTEXT.md`.
   > "This is what the installer added. The product context file tells the agent who the users are."
4. **Copilot Chat**, pick `@Agrikit Consumer`, type:
   *"Add a Loans page with CbPage, a CbCard summary and a CbDataGrid of loans."*
5. **While it runs**, point at the tool calls:
   > "See it calling list_components and get_component? It's looking up our real components before writing anything. And it's writing a spec first; it'll stop for my approval."
6. **Point at** the `Cb` imports in the result.
7. > "Teams fork this repo, sync from upstream, and use one branch per prototype."

**If the agent picker is missing:** type *"Using the agrikit MCP server, list the template components."*
**If it fails entirely:** switch back to the deck and show the screenshot on slide 14.

**Next:** "That's a prototype. Now a real product." **Open the shd-design tab.**

### 15 · ▶ Demo 2: shd-design · 21:00 (4 minutes)

> "shd-design is a real workflow app: retirement and patronage flows. React 19, Vite 8, MUI 7, built on Agrikit."

**Do, in order:**

1. **Walk the approval package flow**, shipped October 19.
   > "This team spent its time on retirement and approval logic, not on building tables and drawers."
2. **Point out** the Agrikit components visible in the approval-package flow.
3. **VS Code:** open `AGENTS.md` and `.github/instructions/`.
   > "Same conventions the installer ships, so the AI follows the same rules here."
4. **Open one component:**
   > "MUI path imports, styles through the theme, no hard-coded colours."
5. **Optional, if time:** ask Copilot *"validate_accessibility on this file"* and read the result.
6. > "Thanks to the shd-design team for sharing this workflow."

**If someone asks about linting:** they use oxlint; Agrikit doesn't require a particular linter.

**Next:** **switch back to the deck**, press →. "So how does work get from design into code like that?"

---

## Developer handoff

### 16 · Today it depends on your team · 25:00

> "Honestly, there isn't one handoff process today. It depends which team you're on.
>
> Some teams are Figma-first. Designers hand over frames, developers interpret them, and the mismatches show up in QA. That's the drifting bars.
>
> Some are prototype-first. They're fast and already on Agrikit, but there's no agreed way to take a prototype to production. They get stuck at the wall.
>
> And a few work component-first. Requirements name the actual Agrikit components, and the props get looked up, not guessed. Least rework, but it isn't the documented default.
>
> All three ship. But they create very different amounts of rework, and someone new can't tell which one to follow. The issue isn't that one team is doing it wrong; we need one documented path people can follow."

**Next:** "Here's what we'd like it to be."

### 17 · One documented path · 26:00

> "The ideal path isn't new tooling. It's the tools we already have, used in this order.
>
> Product and UX keep the product context current. Requirements and designs name Agrikit components. The developer and the agent check what exists and decide: use it directly, wrap it, or flag a gap. Then dev and design approve the spec, before any code. Then build it with a story, review it in Storybook, and send real gaps back to us.
>
> The biggest change is step two: naming the components up front, so nobody has to interpret a screenshot.
>
> Here's a real example: CbToolbar, which shipped last week. On the left is its actual spec. It opens with that discovery decision: what it reuses, and every exception with a reason. It was approved before any code was written. On the right is its story, which is what design, dev and review all looked at.
>
> So the handoff isn't a Figma frame or a Slack thread. It's an approved spec plus a story."

**Next:** "So, three asks."

### 18 · Three asks · 27:30

> "First: every team, add `npx install-agrikit-ai` to your next sprint. It takes about ten minutes. Commit the output.
>
> Second: I'm looking for two volunteer teams to pilot this handoff path for one sprint, then we'll do a retro. Ideally one prototype-first team and one product team. **Put your team name in the chat right now.**
>
> Third: when Agrikit is missing something, file an issue instead of building your own copy. Questions go in the UI/UX Component Library channel.
>
> How we'll know it worked: the share of new features that merge with an approved spec. We'll share the pilot numbers after the retro."

**Pause for a few seconds** and read any volunteers out loud from the chat.

**Next:** "That's it from me. Let's do questions."

---

## Q&A

### 19 · Questions and resources · 28:30

> "Everything I showed is linked here: the design system, setup guides, how we work, and where to ask. Let me check the chat."

**Likely questions:**

- **"Do we have to use Copilot?"** No. Any MCP-compatible tool works, and the installer writes setup files for Cursor, Windsurf, JetBrains and Cline.
- **"Can we pin the MCP server version?"** Yes. Put `@cobank-acb/agrikit-mcp@x.y.z` in `.vscode/mcp.json`. Re-running the installer puts it back on latest.
- **"When does dark mode v2 ship?"** No date is committed yet. Visual regression, switch-performance evidence, remaining light-token and focus work, consumer docs, and final gates still need to land. It's opt-in, so nothing changes until you switch.
- **"What if Agrikit doesn't have the component we need?"** The agent records it as a gap and builds from MUI layout primitives. File an issue so it comes back into the library.
- **"npm install fails with a 401."** Your JFrog token expired: `npm login --registry=https://cobank.jfrog.io/artifactory/api/npm/NPM/ --auth-type=web`.
- **"Does this work in a monorepo?"** Yes. Set `AGRIKIT_LIB_ROOT` in `mcp.json` to the package's path; the installer does this for a standard layout.
- **"Who maintains Agrikit?"** 25 contributors this year, and contributions are welcome. The contributing guide is in the Q&A links.

**Close:**

> "Thanks, everyone. The links stay on screen, and I'll post the deck in the channel. Volunteers, I'll message you today."

**After the talk:** message the pilot volunteers the same day, and post the deck link in the UI/UX Component Library channel.

---

## Fact sources (snapshot 2026-10-27)

If anyone asks where a number came from:

| Claim | Source |
| --- | --- |
| 72 components; category split; 67 / 67 / 66 with stories / docs / specs | `shd-agrikit-ui-lib/dist/component-manifest.json` |
| 476 stories, 274 screenshot- and axe-checked | `storybook-static/index.json` (Oct 23 build) |
| June figures 61 / 351 / 215 | `docs/case-study/AGRIKIT_TDI_CASE_STUDY.md` (2026-06-13) |
| 325 releases; v1.0.0 2024-10-24; v21.15.3 2026-10-21; 31 in 90 days | git tags |
| 25 contributors, 218 commits, 47 features in 2026 | `git shortlog` / `git log --since=2026-01-01` (bots excluded) |
| 296 visual baselines | `tests/snapshots/visual.spec.ts-snapshots/` |
| 10 tools, 3 prompts; 5 tools in app repos, 9 in the library | `mcp-server/src/server.ts`, confirmed by running the server |
| Consumer install: 2 agents, 31 skills, 9 rules, 7 instruction files | Installer run against the packed library, 2026-10-27 |
| Dark mode ~13 of 20 tasks | `tasks/dark-mode/todo.md` at `1f52207c` plus later commits on `feat/dark-mode-v2` |
| Remote MCP plan | `docs/MCP_REMOTE_DEPLOYMENT_PLAN.md` |
| CbToolbar spec | `src/components/surfaces/CbToolbar/CbToolbar.spec.md` |
| Weekly audit agents (14 and 12 runs) | Screenshots you supplied |
