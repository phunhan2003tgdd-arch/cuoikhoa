const movies = [
    {id:1,title:'Stranger things',year:2016,rating:'8.6',cover:'https://product.hstatic.net/1000304920/product/nhac-phim-stranger-things-music-from-seasons-1-and-2-dia-cd_89e1e64d3f1941d2bb051bb549e86c9b_master.jpg',back:'https://picsum.photos/seed/hero/1400/600',overview:'Stranger Things is about a boy who mysteriously disappears, leading his friends and a girl with special powers to discover a dangerous parallel world called the Upside Down that threatens their town.',trailer:'PssKpzB0Ah0'},
    {id:3,title:'Avatar 3',year:2025,rating:'7.9',cover:'https://m.media-amazon.com/images/M/MV5BZDYxY2I1OGMtN2Y4MS00ZmU1LTgyNDAtODA0MzAyYjI0N2Y2XkEyXkFqcGc@._V1_.jpg',overview:'A heartwarming story about mentors and students.',trailer:'nb_fFj_0rq8'},
    {id:4,title:'Peaky Blinders',year:2013,rating:'8.0',cover:'https://m.media-amazon.com/images/M/MV5BNDkxN2RiYmMtMmQ2OS00MGU3LWIyZmMtNDExZGFjMTI4NjY2XkEyXkFqcGc@._V1_.jpg',overview:'A loop through time and code.',trailer:'oVzVdvGIC7U'},
    
    {id:7,title:'pacific rim',year:2013,rating:'8.9',cover:'https://m.media-amazon.com/images/M/MV5BMTY3MTI5NjQ4Nl5BMl5BanBnXkFtZTcwOTU1OTU0OQ@@._V1_FMjpg_UX1000_.jpg',overview:'A fast-paced cyber-thriller.',trailer:'5guMumPFBag'}
  ];

  const grid = document.getElementById('grid');
  const count = document.getElementById('count');
  const year = document.getElementById('year'); year.innerText = new Date().getFullYear();

  function render(list){
    grid.innerHTML = '';
    // Create multiple copies for infinite loop effect
    const loopCount = 3;
    for(let i = 0; i < loopCount; i++) {
      list.forEach(m => {
        const el = document.createElement('div'); el.className='card';
        el.innerHTML = `<img src="${m.cover}" alt="${m.title}"/><div class="meta"><div class="title">${m.title}</div><div class="sub">${m.year} • ${m.rating || ''}</div></div>`;
        el.addEventListener('click',()=>openModal(m));
        grid.appendChild(el);
      });
    }
    count.innerText = list.length;
  }

  function render_weekend(list){
    grid.innerHTML = '';
    // Create multiple copies for infinite loop effect
    const loopCount = 3;
    for(let i = 0; i < loopCount; i++) {
      list.forEach(m => {
        const el = document.createElement('div'); el.className='card';
        el.innerHTML = `<img src="${m.cover}" alt="${m.title}"/><div class="meta"><div class="title">${m.title}</div><div class="sub">${m.year} • ${m.rating || ''}</div></div>`;
        el.addEventListener('click',()=>openModal(m));
        grid.appendChild(el);
      });
    }
    count.innerText = list.length;
  }

  function openModal(m){
    document.getElementById('overlay').style.display='flex';
    document.getElementById('modalImg').src = m.cover;
    document.getElementById('modalTitle').innerText = m.title;
    document.getElementById('modalOverview').innerText = m.overview;
    document.getElementById('playBtn').onclick = ()=>openPlayer(m.trailer);
  }

  document.getElementById('closeModal').onclick = ()=>document.getElementById('overlay').style.display='none';
  document.getElementById('overlay').onclick = (e)=>{ if(e.target.id==='overlay') document.getElementById('overlay').style.display='none' };

  function openPlayer(src){
    document.getElementById('player').style.display='flex';
    const v = document.getElementById('videoPlayer');
    const iframeContainer = document.getElementById('iframeContainer');
    let videoId = null;
    
    if(typeof src === 'string'){
      if(/^[a-zA-Z0-9_-]{11}$/.test(src)){
        videoId = src;
      }
      else if(src.includes('<iframe')){
        const match = src.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/);
        if(match) videoId = match[1];
      }
      else if(src.includes('youtube.com/embed/')){
        videoId = src.split('youtube.com/embed/')[1].split('?')[0].split('/')[0];
      }
      else if(src.includes('youtube.com/watch?v=')){
        videoId = src.split('youtube.com/watch?v=')[1].split('&')[0].split('#')[0];
      }
      else if(src.includes('youtu.be/')){
        videoId = src.split('youtu.be/')[1].split('?')[0].split('/')[0];
      }
    }
    if(videoId){
      window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
      document.getElementById('player').style.display='none';
      return;
    } else {
      iframeContainer.style.display = 'none';
      v.style.display = 'block';
      v.src = src;
      v.play().catch(e => console.log('Play error:', e));
    }
  }
  document.getElementById('closePlayer').onclick = ()=>{
    document.getElementById('player').style.display='none';
    const v = document.getElementById('videoPlayer');
    v.pause();
    v.src = '';
    document.getElementById('iframeContainer').innerHTML = '';
  }

  // hero play
  document.getElementById('playHero').addEventListener('click',()=>openPlayer(movies[0].trailer));

  // Carousel functionality
  let currentIndex = movies.length; // Start at the middle copy
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const carouselGrid = document.getElementById('grid');
  const totalMovies = movies.length;
  const loopCount = 3;
  
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
  
  function nextSlide() {
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
  
  function prevSlide() {
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
  
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);
  
  // Auto play carousel
  let autoPlayInterval = setInterval(nextSlide, 3000);
  
  // Pause on hover
  carouselGrid.addEventListener('mouseenter', () => {
    clearInterval(autoPlayInterval);
  });
  
  carouselGrid.addEventListener('mouseleave', () => {
    autoPlayInterval = setInterval(nextSlide, 3000);
  });

      // init
      render(movies);
      // Set initial position after render
      setTimeout(() => updateCarousel(false), 10);

