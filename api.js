const apiKey = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2IwYTA5M2YyMDliOTAwM2EzYmQxYTIzMTIwMWU4MiIsIm5iZiI6MTc2ODExODY5NC4zMDcwMDAyLCJzdWIiOiI2OTYzNTlhNjhjOTZiNGFkYzg1OTZhMGQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.d3ZV_EEyFSb3XblZLUlCP7QP5IirS566vaOTZwHqFKI";

fetch("https://api.themoviedb.org/3//discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc", {
  method: "GET",
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json"
  }
})
.then(res => res.json())
.then(data => {
  console.log(data.results);
  const grid = document.getElementById('weekendGrid');
  render_weekend(grid, data.results)
})
.catch(err => console.log(err));

function render_weekend(grid, list){
  grid.innerHTML = '';
  // Create multiple copies for infinite loop effect
  const loopCount = 10;
  for(let i = 0; i < loopCount; i++) {
    list.forEach(m => {
      const el = document.createElement('div'); el.className='cardweekend';
      el.innerHTML = `<img src="https://image.tmdb.org/t/p/w500/${m.backdrop_path}" alt="${m.name}"/><div class="meta"><div class="title">${m.name}</div><div class="sub">${m.vote_average || ''}</div></div>`;
      el.addEventListener('click',()=>openModalweekend(m));
      grid.appendChild(el);
    });
    weekendCount.innerText = list.length;
  }
  
  const weekendprevBtn = document.getElementById('weekendPrevBtn');
  const weekendnextBtn = document.getElementById('weekendNextBtn');
  const carouselGrid = document.getElementById('weekendGrid');

  
  function updateCarousel(smooth = true) {
    const cardWidth = 256; // 240px + 16px gap
    const offset = currentIndex * cardWidth;
    if (smooth) {
      carouselGrid.style.transition = 'transform 0.5s ease';
    } else {
      carouselGrid.style.transition = 'none';
    }
    carouselGrid.style.transform = `translateX(-${offset}px)`;
  }
  
  function weeknextSlide() {
    currentIndex++;
    updateCarousel(true);
    
    // Reset to start when reaching the end of second copy
    if (currentIndex >= totalMovies * 2) {
      setTimeout(() => {
        currentIndex = totalMovies;
        updateCarousel(false);
      }, 500);
    }
  }

  function weekprevSlide() {
    currentIndex--;
    updateCarousel(true);
    
    // Reset to end when reaching the start of first copy
    if (currentIndex < totalMovies) {
      setTimeout(() => {
        currentIndex = totalMovies * 2 - 1;
        updateCarousel(false);
      }, 500);
    }
  }

  weekendnextBtn.addEventListener('click', weeknextSlide);
  weekendprevBtn.addEventListener('click', weekprevSlide);
  
  // Auto play carousel
  let autoPlayInterval = setInterval(weeknextSlide, 3000);
  
  // Pause on hover
  carouselGrid.addEventListener('mouseenter', () => {
    clearInterval(autoPlayInterval);
  });
  
  carouselGrid.addEventListener('mouseleave', () => {
    autoPlayInterval = setInterval(weeknextSlide, 3000);
  });

      // init
      render(movies);
      // Set initial position after render
      setTimeout(() => updateCarousel(false), 10);
}

function openModalweekend(m){
  document.getElementById('overlay').style.display='flex';
  document.getElementById('modalImg').src = `https://image.tmdb.org/t/p/w200/${m.backdrop_path}`;
  document.getElementById('modalTitle').innerText = m.name;
  document.getElementById('modalOverview').innerText = m.overview;
  document.getElementById('playBtn').onclick = ()=>openPlayer(m.trailer);
}
