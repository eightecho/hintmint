// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.getElementById('mobile-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const closeBtns = drawer ? drawer.querySelectorAll('[data-close-drawer]') : [];

  function openDrawer() {
    drawer.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.add('hidden');
    document.body.style.overflow = '';
  }

  if (toggle) toggle.addEventListener('click', openDrawer);
  closeBtns.forEach(function (btn) {
    btn.addEventListener('click', closeDrawer);
  });
});
