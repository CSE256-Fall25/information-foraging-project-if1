import { HTMLLoader } from '../core/utils/html_loader';
import { Accordion } from './accordion';
import { doSomething } from './do-something';
import { HTMLContent, itemsToCache } from './html-imports';
import { Slideshow } from './slideshow';

// function 1 - allows hover to open nav only after first interaction
function navReady() {
  const nav = document.getElementById('main-menu-container');
  if (!nav) return;

  // cannot open nav until first interaction
  nav.classList.remove('nav-ready');

  // after first interaction, add class to allow hover to open nav
  const addNavReady = () => {
    nav.classList.add('nav-ready');
    afterFirstInteraction(); // clean up event listeners
  };

  const afterFirstInteraction = () => {
    window.removeEventListener('pointermove', addNavReady);
    window.removeEventListener('pointerdown', addNavReady);
    window.removeEventListener('keydown', addNavReady);
    window.removeEventListener('touchstart', addNavReady);
  };

  // event listeners for first interaction
  window.addEventListener('pointermove', addNavReady, { once: true, passive: true });
  window.addEventListener('pointerdown', addNavReady, { once: true });
  window.addEventListener('keydown', addNavReady, { once: true });
  window.addEventListener('touchstart', addNavReady, { once: true, passive: true });
}

// Put all function calls that need to be made on every page load inside the setupAll function body.
export function PutStudentPageLoadOperationsInsideThisStudentBody() {
    // TODO: Put all operations that you want to happen on ever page load in this function.
    // For example you could write: Sticky.setup()
    navReady();
    doSomething();
}

export async function setupAll() {
    await new Promise((r: any) => setTimeout(r, 100));
    console.log('reloading');
    Slideshow.setupAll();
    Accordion.setupAll();
    PutStudentPageLoadOperationsInsideThisStudentBody();
    console.log('reloaded');
}

itemsToCache.forEach((item: HTMLContent) => {
    HTMLLoader.cacheHTML(item.name, item.content);
});
(window as any).HTMLLoader = HTMLLoader;

console.log('dynamic-dom loaded');
// Do not touch this line, needed to reinitialize code in the dynamic-dom.ts setupAll function
window.addEventListener('newPageLoad', () => setupAll());
