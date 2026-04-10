const movies = [
    {id:2,title:'Zootopia 2',year:2025,rating:'7.7',cover:'https://static.nutscdn.com/vimg/300-0/e491676cbc65d0af86fba6381e5c90e9.jpg',overview:'In a city lit by neon, one courier must deliver a package that could change everything.',trailer:'BjkIOU5PhyQ'},
    {id:3,title:'Avatar 3',year:2026,rating:'7.9',cover:'https://m.media-amazon.com/images/M/MV5BZDYxY2I1OGMtN2Y4MS00ZmU1LTgyNDAtODA0MzAyYjI0N2Y2XkEyXkFqcGc@._V1_.jpg',overview:'A heartwarming story about mentors and students.',trailer:'nb_fFj_0rq8'},
    {id:5,title:'Thế hệ kỳ tích',year:2025,rating:'6.7',cover:'https://kenh14cdn.com/203336854389633024/2025/12/18/the-he-ky-tich-1766033517453764191573.jpg',overview:'Romance between two roboticists.',trailer:'-uphqgXwhXw'},
    {id:6,title:'Doraemon stand by me 2',year:2020,rating:'7.9',cover:'https://upload.wikimedia.org/wikipedia/vi/b/b0/Stand_by_Me_Doraemon_2_film_poster.jpg',overview:'A fast-paced cyber-thriller.',trailer:'A0wg3Zkxq1c'},
    {id:7,title:'pacific rim',year:2013,rating:'8.9',cover:'https://m.media-amazon.com/images/M/MV5BMTY3MTI5NjQ4Nl5BMl5BanBnXkFtZTcwOTU1OTU0OQ@@._V1_FMjpg_UX1000_.jpg',overview:'A fast-paced cyber-thriller.',trailer:'5guMumPFBag'}
  ];

  const grid = document.getElementById('grid');
  const count = document.getElementById('count');


  function render(list){
    grid.innerHTML = '';
    list.forEach(m => {
      const el = document.createElement('div'); el.className='card';
      el.innerHTML = `<img src="${m.cover}" alt="${m.title}"/><div class="meta"><div class="title">${m.title}</div><div class="sub">${m.year} • ${m.rating || ''}</div></div>`;
      el.addEventListener('click',()=>openModal(m));
      grid.appendChild(el);
    });
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


      // init
      render(movies);