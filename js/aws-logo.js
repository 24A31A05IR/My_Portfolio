// ── AWS Certificate Logo customization
const awsCertCard = document.querySelectorAll('.cert-card')[0];
if (awsCertCard) {
  awsCertCard.innerHTML = `
    <div class="cert-logo-wrap" style="background:#232f3e; width:48px; height:48px; display:flex; align-items:center; justify-content:center; border-radius:12px; overflow:hidden; flex-shrink:0;">
      <svg width="40" height="40" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-label="AWS logo" role="img">
        <text x="50" y="65" font-family="Arial, sans-serif" font-size="48" font-weight="900" fill="#FF9900" text-anchor="middle" letter-spacing="-2">AWS</text>
      </svg>
    </div>
    <div>
      <div class="cert-name">AI-ML Virtual Internship</div>
      <div class="cert-issuer">AWS Academy</div>
    </div>
  `;
}
