import './deck.css';

// Slide controller: one visible slide, hash deep links (#/7), keyboard + buttons,
// speaker notes toggle and a pace clock against each slide's planned minute mark.

interface DeckElements {
  root: HTMLElement;
  slides: HTMLElement[];
  section: HTMLElement;
  count: HTMLElement;
  clock: HTMLElement;
  progress: HTMLElement;
  live: HTMLElement;
  notesPanel: HTMLElement;
  notesToggle: HTMLButtonElement;
  prev: HTMLButtonElement;
  next: HTMLButtonElement;
}

const NOTES_KEY = 'agrikit-deck:notes';

function query<T extends Element>(root: ParentNode, selector: string): T {
  const element = root.querySelector<T>(selector);
  if (!element) throw new Error(`Deck element missing: ${selector}`);
  return element;
}

function readNotesPreference(): boolean {
  try {
    return window.localStorage.getItem(NOTES_KEY) === '1';
  } catch {
    return false;
  }
}

function writeNotesPreference(on: boolean): void {
  try {
    window.localStorage.setItem(NOTES_KEY, on ? '1' : '0');
  } catch {
    // Storage blocked: the toggle still works for this visit.
  }
}

function formatClock(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

function indexFromHash(total: number): number {
  const match = /^#\/(\d+)$/.exec(window.location.hash);
  if (!match) return 0;
  const n = Number(match[1]) - 1;
  return Math.min(Math.max(n, 0), total - 1);
}

function isTypingTarget(target: EventTarget | null): boolean {
  return target instanceof HTMLElement
    && (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName));
}

function boot(): void {
  const root = document.querySelector<HTMLElement>('[data-deck-root]');
  if (!root) return;

  const els: DeckElements = {
    root,
    slides: Array.from(root.querySelectorAll<HTMLElement>('.deck-slide')),
    section: query(document, '[data-deck-section]'),
    count: query(document, '[data-deck-count]'),
    clock: query(document, '[data-deck-clock]'),
    progress: query(document, '[data-deck-progress]'),
    live: query(document, '[data-deck-live]'),
    notesPanel: query(document, '[data-deck-notes-panel]'),
    notesToggle: query(document, '[data-deck-notes]'),
    prev: query(document, '[data-deck-prev]'),
    next: query(document, '[data-deck-next]'),
  };

  const total = els.slides.length;
  let current = -1;
  let startedAt: number | null = null;

  els.slides.forEach((slide, i) => {
    const title = slide.querySelector('h1, h2')?.textContent?.trim() ?? `Slide ${i + 1}`;
    slide.setAttribute('aria-roledescription', 'slide');
    slide.setAttribute('aria-label', `${i + 1} of ${total}: ${title}`);
    slide.dataset.title = title;
    const folio = document.createElement('span');
    folio.className = 'deck-folio';
    folio.setAttribute('aria-hidden', 'true');
    folio.append(String(i + 1).padStart(2, '0'), document.createElement('br'), String(total).padStart(2, '0'));
    slide.append(folio);
  });

  function show(next: number, announce = true): void {
    const target = Math.min(Math.max(next, 0), total - 1);
    const slide = els.slides[target];
    if (target === current || !slide) return;
    els.slides.forEach((slide, i) => {
      const active = i === target;
      slide.hidden = !active;
      slide.inert = !active;
      slide.classList.toggle('is-entering', active);
    });
    current = target;
    els.section.textContent = slide.dataset.section ?? '';
    els.count.textContent = `${target + 1} / ${total}`;
    els.progress.style.setProperty('--p', String((target + 1) / total));
    const notes = slide.querySelector('.deck-notes');
    els.notesPanel.replaceChildren(...Array.from(notes?.childNodes ?? [], node => node.cloneNode(true)));
    els.prev.disabled = target === 0;
    els.next.disabled = target === total - 1;
    if (announce) els.live.textContent = slide.getAttribute('aria-label') ?? '';
    const hash = `#/${target + 1}`;
    if (window.location.hash !== hash) history.replaceState(null, '', hash);
    tick();
  }

  function setNotes(on: boolean): void {
    els.root.classList.toggle('is-notes', on);
    els.notesPanel.hidden = !on;
    els.notesToggle.setAttribute('aria-pressed', String(on));
    writeNotesPreference(on);
  }

  function startClock(): void {
    if (startedAt === null) startedAt = Date.now();
  }

  function tick(): void {
    const elapsed = startedAt === null ? 0 : (Date.now() - startedAt) / 1000;
    const plannedMinute = Number(els.slides[current]?.dataset.at ?? '0');
    const behind = startedAt !== null && elapsed > (plannedMinute + 1.5) * 60;
    els.clock.textContent = `${formatClock(elapsed)} · plan ${formatClock(plannedMinute * 60)}`;
    els.clock.classList.toggle('is-behind', behind);
  }

  function go(delta: number): void {
    startClock();
    show(current + delta);
  }

  document.addEventListener('keydown', event => {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return;
    if (isTypingTarget(event.target)) return;
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
      case 'PageDown':
      case ' ':
        event.preventDefault();
        go(1);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
      case 'PageUp':
        event.preventDefault();
        go(-1);
        break;
      case 'Home':
        event.preventDefault();
        show(0);
        break;
      case 'End':
        event.preventDefault();
        show(total - 1);
        break;
      case 'n':
      case 'N':
        setNotes(!els.root.classList.contains('is-notes'));
        break;
      case 'f':
      case 'F':
        if (document.fullscreenElement) void document.exitFullscreen();
        else void document.documentElement.requestFullscreen?.();
        break;
      case 't':
      case 'T':
        startedAt = Date.now();
        tick();
        break;
      default:
    }
  });

  els.prev.addEventListener('click', () => go(-1));
  els.next.addEventListener('click', () => go(1));
  els.notesToggle.addEventListener('click', () => setNotes(!els.root.classList.contains('is-notes')));
  window.addEventListener('hashchange', () => show(indexFromHash(total)));
  window.setInterval(tick, 1000);

  setNotes(readNotesPreference());
  show(indexFromHash(total), false);
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
else boot();
