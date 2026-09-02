/* ── Typewriter on splash ── */
const roles = ['CS Engineering Student', 'Problem Solver', 'Open to Opportunities'];
let ri = 0, ci = 0, deleting = false;
const el = document.getElementById('splashRole');
function typeWriter(){
  const cur = roles[ri];
  if(!deleting){ el.textContent = cur.slice(0,++ci); if(ci===cur.length){deleting=true;setTimeout(typeWriter,1400);return} }
  else{ el.textContent = cur.slice(0,--ci); if(ci===0){deleting=false;ri=(ri+1)%roles.length} }
  setTimeout(typeWriter, deleting ? 45 : 85);
}
typeWriter();

/* ── Enter portfolio ── */
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

/* ── Section switching ── */
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
    if(next){ next.classList.add('entering'); next.classList.add('active');
      requestAnimationFrame(()=>{ next.classList.remove('entering'); }); }
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
function toggleMenu(){ document.getElementById('navLinks').classList.toggle('open') }
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
const contactForm = document.getElementById('contactForm');
const formToast = document.getElementById('formToast');
const toastTitle = document.getElementById('toastTitle');
const toastMessage = document.getElementById('toastMessage');

function showToast(type, title, message) {
  if (!formToast || !toastTitle || !toastMessage) return;

  formToast.classList.remove('success', 'error', 'visible');
  formToast.classList.add(type);
  toastTitle.textContent = title;
  toastMessage.textContent = message;

  const icon = formToast.querySelector('.form-toast-icon');
  if (icon) {
    icon.textContent = type === 'success' ? '✓' : '!';
  }

  requestAnimationFrame(() => {
    formToast.classList.add('visible');
  });

  clearTimeout(showToast.timeoutId);
  showToast.timeoutId = setTimeout(() => {
    formToast.classList.remove('visible');
  }, 3200);
}

if (contactForm) {
  contactForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;

    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="ti ti-loader-2" style="animation:spin 1s linear infinite;"></i> Sending...';

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: {
          Accept: 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      contactForm.reset();
      showToast('success', 'Success', 'Your message has been sent successfully. I will get back to you.');
    } catch (error) {
      showToast('error', 'Oops', 'Something went wrong while sending the message. Please try again later or email me directly.');
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = originalText;
    }
  });
}

const spinStyle = document.createElement('style');
spinStyle.textContent = '@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }';
document.head.appendChild(spinStyle);
