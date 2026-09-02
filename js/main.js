// ── Typewriter animation on splash
const roles = ['CS Engineering Student', 'Problem Solver', 'Open to Opportunities'];
let ri = 0, ci = 0, deleting = false;
const el = document.getElementById('splashRole');

function typeWriter(){
  const cur = roles[ri];
  if(!deleting){ 
    el.textContent = cur.slice(0,++ci); 
    if(ci===cur.length){
      deleting=true;
      setTimeout(typeWriter,1400);
      return;
    } 
  }
  else{ 
    el.textContent = cur.slice(0,--ci); 
    if(ci===0){
      deleting=false;
      ri=(ri+1)%roles.length;
    } 
  }
  setTimeout(typeWriter, deleting ? 45 : 85);
}

typeWriter();

// ── Enter portfolio
function enterPortfolio(){
  const splash = document.getElementById('splash');
  splash.classList.add('exit');
  setTimeout(()=>{ splash.style.display='none'; }, 600);
  setTimeout(()=>{
    document.getElementById('mainNav').classList.add('visible');
    document.getElementById('hero').classList.add('visible');
  }, 300);
}

// Auto-dismiss after 3s
setTimeout(enterPortfolio, 3000);

// ── Section switching
function showSection(name, linkEl){
  // animate out current section
  const current = document.querySelector('.section.active');
  if(current){
    current.classList.add('exiting');
    setTimeout(()=>{ current.classList.remove('active','exiting'); }, 220);
  }

  setTimeout(()=>{
    // show new section
    document.querySelectorAll('.section').forEach(s=>s.classList.remove('active','exiting'));
    const next = document.getElementById('sec-'+name);
    if(next){ 
      next.classList.add('entering'); 
      next.classList.add('active');
      requestAnimationFrame(()=>{ next.classList.remove('entering'); });
    }
    
    // nav active state
    document.querySelectorAll('.nav-links a').forEach(a=>a.classList.remove('active'));
    linkEl.classList.add('active');
    document.getElementById('navLinks').classList.remove('open');
    
    // show hero only on about
    const hero = document.getElementById('hero');
    if(hero) hero.style.display = (name === 'about') ? 'block' : 'none';
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, current ? 200 : 0);
  return false;
}

// ── Mobile menu toggle
function toggleMenu(){ 
  document.getElementById('navLinks').classList.toggle('open');
}

// ── Theme toggle
function toggleTheme(){
  const isLight = document.body.classList.toggle('light');
  document.getElementById('iconSun').style.display  = isLight ? 'none'  : 'block';
  document.getElementById('iconMoon').style.display = isLight ? 'block' : 'none';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

// Restore saved theme on load
(function(){
  if(localStorage.getItem('theme') === 'light'){
    document.body.classList.add('light');
    const s = document.getElementById('iconSun');
    const m = document.getElementById('iconMoon');
    if(s) s.style.display = 'none';
    if(m) m.style.display = 'block';
  }
})();

// ── Connect button
function connectMe(){
  // Make sure About section is active (Get In Touch lives there)
  const isAboutActive = document.getElementById('sec-about').classList.contains('active');
  if(!isAboutActive){
    const aboutLink = document.querySelector('.nav-links a');
    showSection('about', aboutLink);
  }
  // Scroll to Get In Touch
  setTimeout(()=>{
    const git = document.querySelector('.git-section');
    if(git) git.scrollIntoView({behavior:'smooth', block:'start'});
  }, isAboutActive ? 0 : 420);
}
