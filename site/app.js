const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  navigation.classList.toggle('is-open', !isOpen);
});

navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    navigation.classList.remove('is-open');
  }
});

const searchInput = document.querySelector('#doctor-search');
const doctorCards = [...document.querySelectorAll('.doctor-card')];
const doctorCount = document.querySelector('.doctor-count');
const noResults = document.querySelector('#no-results');

searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  for (const card of doctorCards) {
    const matches = card.dataset.search.includes(query);
    card.hidden = !matches;
    visibleCount += Number(matches);
  }

  doctorCount.textContent = `Showing ${visibleCount} care ${visibleCount === 1 ? 'team' : 'teams'}`;
  noResults.hidden = visibleCount > 0;
});