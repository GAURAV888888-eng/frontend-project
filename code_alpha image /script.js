const galleryItems = document.querySelectorAll('.gallery-item');
const filterBtns = document.querySelectorAll('.filter-btn');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeBtn = document.getElementById('close-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentIndex = 0;
let visibleItems = [];

function updateVisibleItems() {
  visibleItems = Array.from(galleryItems).filter(item => !item.classList.contains('hide'));
}
updateVisibleItems();

// Category Filtering
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    galleryItems.forEach(item => {
      if (filter === 'all' || item.getAttribute('data-category') === filter) {
        item.classList.remove('hide');
      } else {
        item.classList.add('hide');
      }
    });

    updateVisibleItems();
  });
});

// Open Lightbox
galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    currentIndex = visibleItems.indexOf(item);
    showLightboxItem(currentIndex);
    lightbox.classList.add('active');
  });
});

function showLightboxItem(index) {
  const item = visibleItems[index];
  const img = item.querySelector('img');
  const caption = item.querySelector('.overlay span').innerText;

  lightboxImg.src = img.src;
  lightboxCaption.innerText = caption;
}

// Navigation Controls
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
  showLightboxItem(currentIndex);
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % visibleItems.length;
  showLightboxItem(currentIndex);
});

// Close Lightbox
closeBtn.addEventListener('click', () => lightbox.classList.remove('active'));

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) lightbox.classList.remove('active');
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') lightbox.classList.remove('active');
  if (e.key === 'ArrowLeft') prevBtn.click();
  if (e.key === 'ArrowRight') nextBtn.click();
});