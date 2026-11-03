/* Progressive enhancements; links, screenshots and documentation work without JS. */
(() => {
  const dialog = document.querySelector('.lightbox');
  const image = dialog?.querySelector('.lightbox-content img');
  const caption = dialog?.querySelector('#lightbox-caption');
  const originalLink = dialog?.querySelector('.lightbox-original');
  const closeButton = dialog?.querySelector('.lightbox-close');
  if (!dialog || !image || !caption || !originalLink || !closeButton ||
      typeof dialog.showModal !== 'function') return;

  let opener = null;
  let previousOverflow = '';

  document.querySelectorAll('[data-preview]').forEach((link) => {
    link.addEventListener('click', (event) => {
      // Preserve browser shortcuts for opening the actual image in another tab.
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      opener = link;
      image.src = link.dataset.preview;
      image.alt = link.querySelector('img')?.alt || link.dataset.caption || '应用截图';
      caption.textContent = link.dataset.caption || '应用截图';
      originalLink.href = link.href;
      previousOverflow = document.body.style.overflow;
      dialog.showModal();
      document.body.style.overflow = 'hidden';
      closeButton.focus();
    });
  });

  closeButton.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.style.overflow = previousOverflow;
    opener?.focus({ preventScroll: true });
    // Drop the full-resolution preview after closing; the page's image remains cached.
    image.removeAttribute('src');
  });
})();

(() => {
  const menu = document.querySelector('.mobile-menu');
  if (!menu) return;
  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => { menu.open = false; });
  });
  document.addEventListener('pointerdown', (event) => {
    if (menu.open && !menu.contains(event.target)) menu.open = false;
  });
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !menu.open) return;
    menu.open = false;
    menu.querySelector('summary').focus();
  });
})();

(() => {
  const toc = document.querySelector('.page-toc');
  const sections = Array.from(document.querySelectorAll('[data-toc-section]'));
  if (!toc || !sections.length || !('IntersectionObserver' in window)) return;
  const header = document.querySelector('.site-header');
  const links = Array.from(toc.querySelectorAll('a[href^="#"]'));

  const update = () => {
    const headerBottom = header?.getBoundingClientRect().bottom || 0;
    let current = sections[0];
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= headerBottom + 90) current = section;
    }
    links.forEach((link) => {
      if (link.hash === `#${current.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };
  const observer = new IntersectionObserver(update, {
    rootMargin: '-80px 0px -55% 0px',
    threshold: 0
  });
  sections.forEach((section) => observer.observe(section));
  window.addEventListener('hashchange', update);
  update();
})();

(() => {
  const finder = document.querySelector('[data-model-finder]');
  const select = finder?.querySelector('#device-model');
  const result = finder?.querySelector('.model-result');
  const title = result?.querySelector('h3');
  const capabilities = result?.querySelector('.model-capabilities');
  const note = result?.querySelector('.model-note');
  const guideLink = result?.querySelector('.model-guide-link');
  const rows = Array.from(document.querySelectorAll('.compatibility-table tbody tr[data-models]'));
  if (!finder || !select || !result || !title || !capabilities || !note || !guideLink || !rows.length) return;

  // Build the chooser from the matrix so the two views share one source of truth.
  const models = new Map();
  rows.forEach((row) => {
    const group = document.createElement('optgroup');
    group.label = row.dataset.family;
    row.dataset.models.split(',').forEach((model) => {
      const option = document.createElement('option');
      option.value = model;
      option.textContent = model === 'U3LP' ? 'U3LP / U3L Pro' : model;
      group.append(option);
      models.set(model, row);
    });
    select.append(group);
  });

  const labels = ['测量 / CSV', 'PD / 线阻', '表盘 / 开机图', '固件 / E-Marker'];
  const update = () => {
    rows.forEach((row) => row.classList.remove('is-selected'));
    capabilities.replaceChildren();
    const row = models.get(select.value);
    if (!row) {
      title.textContent = '选择型号，查看适配范围';
      note.textContent = '这里展示当前源码中的能力。下载时，还需核对对应发行版说明。';
      guideLink.hidden = true;
      return;
    }

    row.classList.add('is-selected');
    title.textContent = `${select.value === 'U3LP' ? 'U3LP / U3L Pro' : select.value} 的功能范围`;
    labels.forEach((label, index) => {
      const item = document.createElement('div');
      const term = document.createElement('dt');
      const value = document.createElement('dd');
      term.textContent = label;
      value.textContent = row.cells[index + 1].textContent.trim();
      item.append(term, value);
      capabilities.append(item);
    });
    note.textContent = `${row.cells[5].textContent.trim()}。${row.dataset.note}`;
    guideLink.href = `guide.html#${row.dataset.guide || 'connect'}`;
    guideLink.hidden = false;
  };
  select.addEventListener('change', update);
  // Restore a model shared from a direct link, or a browser-restored selection.
  const requested = new URLSearchParams(window.location.search).get('model');
  if (requested && models.has(requested)) select.value = requested;
  update();
  finder.hidden = false;
})();
