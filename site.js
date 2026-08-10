(() => {
  const button = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.mobile-menu');
  const header = document.querySelector('.site-header');
  if (button && menu && header) {
    const setOpen = (open) => {
      button.classList.toggle('is-open', open);
      menu.classList.toggle('is-open', open);
      header.classList.toggle('menu-is-open', open);
      document.body.classList.toggle('menu-open', open);
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      menu.setAttribute('aria-hidden', String(!open));
      if (!open) menu.setAttribute('inert',''); else menu.removeAttribute('inert');
    };
    button.addEventListener('click', () => setOpen(!button.classList.contains('is-open')));
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
    window.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
  }
  const back = document.querySelector('.back-to-top');
  if (back) {
    const update = () => back.classList.toggle('is-visible', window.scrollY > 500);
    update(); window.addEventListener('scroll', update, {passive:true});
  }
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); }}), {threshold:.12});
    reveals.forEach(el => io.observe(el));
  } else reveals.forEach(el => el.classList.add('is-visible'));
})();
