var S=null, srchCR=null, logsPage=1, bulkList=[], notesAttachments=[];
const THEME_KEY='ui-theme';

var ICONS={
  plane:'<path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"/>',
  lock:'<path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"/>',
  bolt:'<path stroke-linecap="round" stroke-linejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"/>',
  chart:'<path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"/>',
  download:'<path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"/>',
  upload:'<path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"/>',
  backup:'<path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"/>',
  list:'<path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"/>',
  search:'<path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/>',
  pencil:'<path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/>',
  clip:'<path stroke-linecap="round" stroke-linejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"/>',
  trash:'<path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>',
  warn:'<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"/>',
  sun:'<path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"/>',
  moon:'<path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"/>',
  back:'<path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"/>',
  check:'<path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/>',
  checkCircle:'<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>',
  x:'<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/>',
  xCircle:'<path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>',
  clock:'<path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>',
  power:'<path stroke-linecap="round" stroke-linejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"/>',
  info:'<path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"/>',
  print:'<path stroke-linecap="round" stroke-linejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z"/>',
  users:'<path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"/>'
};

function ico(name,size){
  var s=size||16;
  return '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:'+s+'px;height:'+s+'px;vertical-align:middle;margin-left:4px">'+ICONS[name]+'</svg>';
}

function applyTheme(theme){
  document.body.setAttribute('data-theme', theme);
  var btn=document.getElementById('theme-fab');
  if(btn) btn.innerHTML=theme==='day'?ico('moon',22):ico('sun',22);
  var src=theme==='day'?'/static/logo-day.svg':'/static/logo.svg';
  document.querySelectorAll('img.theme-logo').forEach(function(el){el.src=src;});
}

function initTheme(){
  var theme=localStorage.getItem(THEME_KEY)||'night';
  applyTheme(theme);
}

function toggleTheme(){
  var current=document.body.getAttribute('data-theme')||'night';
  var next=current==='day'?'night':'day';
  localStorage.setItem(THEME_KEY,next);
  applyTheme(next);
}

initTheme();

// ── Server heartbeat ────────────────────────────────────────
(function startHeartbeat(){
  var dot=null, txt=null;
  function check(){
    if(!dot){dot=document.getElementById('srv-dot');txt=document.getElementById('srv-txt');}
    if(!dot) return;
    fetch('/api/session',{method:'GET',credentials:'same-origin'})
      .then(function(){
        dot.style.background='#22c55e';
        txt.textContent='شغال';
      })
      .catch(function(){
        dot.style.background='#ef4444';
        txt.textContent='انقطع الاتصال';
      });
  }
  setTimeout(check, 1500);
  setInterval(check, 10000);
})();

// ── SVG Icon Library ────────────────────────────────────────
const GRP_ICONS={
  users: `<rect x="4" y="4" width="16" height="16"/><path d="M4 4 12 12 20 4M12 12v8M6 20h12"/>`,
  mosque: `<circle cx="10.5" cy="10.5" r="6.5"/><path d="M4 14h13M6 17l4-4 4 4M17 4v16"/>`,
  person: `<rect x="5" y="3" width="14" height="18" rx="7"/><path d="M5 9h14M7 18l10-12"/>`,
  globe: `<circle cx="12" cy="12" r="8"/><path d="M4 12h16M12 4c-2.5 2.2-4 5-4 8s1.5 5.8 4 8M12 4c2.5 2.2 4 5 4 8s-1.5 5.8-4 8"/>`,
  plane: `<path d="M12 3 21 12 12 21 3 12Z"/><path d="M7 12h10M12 7v10M8.5 8.5l7 7M15.5 8.5l-7 7"/>`,
  bus: `<circle cx="12" cy="12" r="8"/><path d="M6 9c1.8 1.4 3.8 2.1 6 2.1S16.2 10.4 18 9M6 12.5c1.8 1.4 3.8 2.1 6 2.1s4.2-.7 6-2.1M7 16h10"/>`,
  crescent: `<path d="M12 3 20 12 12 21 4 12 12 3Z"/><circle cx="12" cy="12" r="4.5"/><path d="M12 3v18M4 12h16"/>`,
  kaaba: `<path d="M12 3 20 8v8l-8 5-8-5V8Z"/><path d="M12 3v18M4 8l8 5 8-5M4 16l8-5 8 5"/>`,
  tent: `<path d="M12 3 20 20H4L12 3Z"/><path d="M12 3v17M8 11h8M6 16h12"/>`,
  minaret: `<circle cx="12" cy="8" r="5"/><path d="M12 3v18M7 12h10M5 17h14"/>`,
  folder: `<rect x="4" y="5" width="16" height="14"/><circle cx="12" cy="12" r="5"/><path d="M7 12h10M12 7v10"/>`,
  flag: `<path d="M12 3 21 12 12 21 3 12 12 3Z"/><rect x="7" y="7" width="10" height="10"/><path d="M7 7 17 17M17 7 7 17"/>`,
  star: `<path d="M12 4 14.5 9.5 20 12 14.5 14.5 12 20 9.5 14.5 4 12 9.5 9.5 12 4Z"/><circle cx="12" cy="12" r="3"/>`,
  shield: `<path d="M12 3 20 8v8l-8 5-8-5V8Z"/><path d="M6 8h12M12 8v13M8 16h8"/>`,
  medical: `<circle cx="12" cy="12" r="8"/><rect x="8" y="8" width="8" height="8"/><path d="M12 5v14M5 12h14"/>`,
  compass: `<path d="M12 3 21 12 12 21 3 12 12 3Z"/><circle cx="12" cy="12" r="4"/><path d="M8 16 12 8l4 8"/>`,
  map: `<rect x="4" y="4" width="16" height="16"/><path d="M8 4v16M16 4v16M4 8h16M4 16h16"/>`,
  heart: `<path d="M12 20c-4-3.1-8-5.7-8-10a4.8 4.8 0 0 1 8-3.6A4.8 4.8 0 0 1 20 10c0 4.3-4 6.9-8 10Z"/><path d="M8.5 10.5a4.5 4.5 0 0 1 7 0M7 14c1.5-1 3.2-1.5 5-1.5S15.5 13 17 14"/>`,
  building: `<rect x="4" y="4" width="16" height="16"/><path d="M4 10h16M4 16h16M9 4v16M15 4v16"/>`,
  ship: `<rect x="5" y="5" width="14" height="14" rx="7"/><path d="M5 13h14M7 16c1.3-1 3-1.5 5-1.5s3.7.5 5 1.5M7 9c1.3-1 3-1.5 5-1.5s3.7.5 5 1.5"/>`,
  mountain: `<path d="M12 3 21 12 12 21 3 12 12 3Z"/><path d="M6 15h12M8.5 12l3.5-4 3.5 4M7.5 9.5l4.5 7 4.5-7"/>`,
  chart: `<rect x="5" y="5" width="14" height="14"/><circle cx="12" cy="12" r="6"/><path d="M6 12h12M12 6v12"/>`,
  calendar: `<path d="M12 3 20 12 12 21 4 12 12 3Z"/><path d="M7 9h10M7 12h10M7 15h10M10 6v12M14 6v12"/>`,
  settings: `<circle cx="12" cy="12" r="7.5"/><circle cx="12" cy="12" r="3.2"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4M5.2 5.2l2.8 2.8M16 16l2.8 2.8M18.8 5.2 16 8M8 16l-2.8 2.8"/>`
};
const GRP_ICON_KEYS=Object.keys(GRP_ICONS);
const COLORS=['#3B82F6','#16A34A','#9333EA','#0D9488','#D97706','#1E3A5F','#6B7280','#EF4444'];

const GRP_ICON_SHAPES={
  users:'circle', mosque:'arch', person:'roundedSquare', globe:'ring', plane:'diamond',
  bus:'pill', crescent:'circle', kaaba:'square', tent:'triangle', minaret:'triangle',
  folder:'card', flag:'diamond', star:'circle', shield:'hex', medical:'roundedSquare',
  compass:'diamond', map:'card', heart:'circle', building:'square', ship:'wave',
  mountain:'triangle', chart:'pill', calendar:'roundedSquare', settings:'circle'
};

function grpShapeMarkup(shape,color){
  var fill=color||'#3B82F6';
  if(shape==='triangle') return '<path d="M28 7 47 42H9Z" fill="'+fill+'" fill-opacity=".88"/>';
  if(shape==='diamond') return '<path d="M28 8 46 28 28 48 10 28Z" fill="'+fill+'" fill-opacity=".88"/>';
  if(shape==='roundedSquare') return '<rect x="10" y="10" width="36" height="36" rx="11" fill="'+fill+'" fill-opacity=".88"/>';
  if(shape==='square') return '<rect x="11" y="11" width="34" height="34" fill="'+fill+'" fill-opacity=".88"/>';
  if(shape==='pill') return '<rect x="8" y="15" width="40" height="26" rx="13" fill="'+fill+'" fill-opacity=".88"/>';
  if(shape==='hex') return '<path d="M28 8 43 17v22L28 48 13 39V17Z" fill="'+fill+'" fill-opacity=".88"/>';
  if(shape==='arch') return '<path d="M13 44V25c0-8.3 6.7-15 15-15s15 6.7 15 15v19Z" fill="'+fill+'" fill-opacity=".88"/>';
  if(shape==='wave') return '<path d="M9 34c4-7 9-10 19-10 8 0 13 2 19 8v11H9Z" fill="'+fill+'" fill-opacity=".88"/>';
  if(shape==='card') return '<path d="M11 16h28a6 6 0 0 1 6 6v18H11a6 6 0 0 1-6-6v-12a6 6 0 0 1 6-6Z" fill="'+fill+'" fill-opacity=".88"/>';
  if(shape==='ring') return '<circle cx="28" cy="28" r="17" fill="'+fill+'" fill-opacity=".18"/><circle cx="28" cy="28" r="12" fill="'+fill+'" fill-opacity=".88"/>';
  return '<circle cx="28" cy="28" r="18" fill="'+fill+'" fill-opacity=".88"/>';
}

function hexIcon(key,color,sz){
  sz=sz||56; var mark=GRP_ICONS[key]||GRP_ICONS.users; var c=color||'#3B82F6';
  var shape=GRP_ICON_SHAPES[key]||'circle';
  return `<svg width="${sz}" height="${sz}" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    ${grpShapeMarkup(shape,c)}
    <g transform="translate(16,16)" stroke="currentColor" stroke-width="1.55" stroke-linecap="round" stroke-linejoin="round" fill="none" style="color:var(--tx,#F8FBFF)">
      ${mark}
    </g>
  </svg>`;
}

// ── Core ────────────────────────────────────────────────────
function api(url,opts){
  return fetch(url,opts).then(r=>{
    if(r.status===401){doLogout();return{ok:false,msg:'انتهت الجلسة'};}
    var ct=r.headers.get('content-type')||'';
    if(!ct.includes('application/json')){doLogout();return{ok:false,msg:'انتهت الجلسة'};}
    return r.json();
  }).catch(e=>({ok:false,msg:e.message}));
}
function show(id){
  document.querySelectorAll('.scr').forEach(s=>s.classList.remove('on'));
  document.getElementById(id).classList.add('on');
  window.scrollTo(0,0);
}
function mountTripsScreen(){
  var adminPanel=document.getElementById('trip-panel');
  var adminHost=document.getElementById('trips-admin-host');
  if(adminPanel && adminHost && adminPanel.parentNode!==adminHost){
    adminHost.appendChild(adminPanel);
  }
  var workerCard=document.getElementById('worker-trip-card');
  var workerHost=document.getElementById('trips-worker-host');
  if(workerCard && workerHost && workerCard.parentNode!==workerHost){
    workerHost.appendChild(workerCard);
  }
}
function openTripsScreen(){
  mountTripsScreen();
  var isAdmin=S && S.role==='admin';
  var adminShell=document.getElementById('trips-admin-shell');
  var workerShell=document.getElementById('trips-worker-shell');
  var title=document.getElementById('trips-screen-title');
  var sub=document.getElementById('trips-screen-sub');
  var adminPanel=document.getElementById('trip-panel');
  var workerCard=document.getElementById('worker-trip-card');
  if(adminShell) adminShell.style.display=isAdmin?'block':'none';
  if(workerShell) workerShell.style.display=isAdmin?'none':'block';
  if(adminPanel) adminPanel.style.display=isAdmin?'block':'none';
  if(workerCard) workerCard.style.display=isAdmin?'none':'block';
  if(title) title.textContent='إدارة الرحلات';
  if(sub) sub.textContent=isAdmin?'تحكم كامل بالرحلات':'رحلات مجموعتك';
  show('s-trips');
  if(isAdmin) loadTripAdminData();
  else loadWorkerTrips();
}
function closeTripsScreen(){
  if(S && S.role==='admin') show('s-admin');
  else{
    show('s-worker');
    setTimeout(function(){var e=document.getElementById('w-srch');if(e)e.focus();},80);
  }
}
function closeDlg(id){document.getElementById(id).classList.remove('open');}
function toast(m,e){
  var t=document.getElementById('toast');
  t.textContent=m; t.style.background=e?'#c0392b':'#1a7f2e';
  t.classList.add('show'); setTimeout(()=>t.classList.remove('show'),3000);
}
function sb(id,t,l){
  var b=document.getElementById(id); if(!b)return;
  b.innerHTML=l?t+'<span class="sp"></span>':t; b.disabled=l;
}
function badge(txt,cls){return `<span class="badge ${cls}">${txt}</span>`;}

// ── Login ───────────────────────────────────────────────────
var selGid='', selGname='';

async function loadLoginGroups(){
  var r=await fetch('/api/public/groups').then(x=>x.json()).catch(()=>({ok:false}));
  var grid=document.getElementById('grp-grid');
  if(!r.ok||!r.groups.length){
    grid.innerHTML='<div style="grid-column:1/-1;text-align:center;color:var(--tx3);padding:12px">لا توجد مجموعات</div>';
    return;
  }
  grid.innerHTML=r.groups.map(g=>`
    <div class="g-card" onclick="pickGroup('${g.id}','${g.name}')">
      ${hexIcon(g.icon,g.color,52)}
      <div class="g-card-name">${g.name}</div>
    </div>`).join('');
}

function pickGroup(gid,name){
  selGid=gid; selGname=name;
  document.getElementById('sel-badge').textContent=name;
  document.getElementById('l-user').value='';
  document.getElementById('l-pw').value='';
  document.getElementById('l-err').style.display='none';
  document.getElementById('step1').style.display='none';
  document.getElementById('step2').style.display='block';
  document.getElementById('l-user').focus();
}
function backToStep1(){
  document.getElementById('step2').style.display='none';
  document.getElementById('step1').style.display='block';
}

async function doLogin(){
  var username=document.getElementById('l-user').value.trim();
  var pw=document.getElementById('l-pw').value;
  var err=document.getElementById('l-err');
  if(!username){err.style.display='block';err.textContent='أدخل اسم المستخدم';return;}
  sb('l-btn','جاري الدخول...',true);
  var r=await api('/api/login',{method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({username,pw,gid:selGid})});
  sb('l-btn','دخول',false);
  if(r.ok){
    err.style.display='none'; S={...r};
    if(r.role==='admin'){loadAdmin();show('s-admin');}
    else{
      document.getElementById('w-group').textContent=r.name;
      document.getElementById('w-user').textContent='الموظف: '+(r.username||'');
      loadWorker();show('s-worker');setTimeout(function(){var e=document.getElementById('w-srch');if(e)e.focus();},80);
    }
  } else{err.style.display='block';err.textContent=r.msg||'خطأ';}
}

function doLogout(){
  api('/api/logout',{method:'POST'});
  S=null; srchCR=null;
  document.getElementById('step2').style.display='none';
  document.getElementById('step1').style.display='block';
  loadLoginGroups();
  show('s-login');
}

// ── Admin ───────────────────────────────────────────────────
var curTab='ov';
var TAB_TITLES={'ov':'لوحة التحكم','logs':'السجلات','perf':'الأداء','attach':'المرفقات','bak':'الإعدادات'};
function aTab(name,el){
  curTab=name;
  document.querySelectorAll('.sb-item[data-tab]').forEach(b=>b.classList.remove('on'));
  if(el) el.classList.add('on');
  var pt=document.getElementById('sb-page-title');
  if(pt) pt.textContent=TAB_TITLES[name]||'';
  ['ov','logs','perf','attach','bak'].forEach(t=>{
    var e=document.getElementById('t-'+t);
    if(e) e.style.display=(t===name?'block':'none');
  });
  var statsEl=document.querySelector('#s-admin .stats');
  if(statsEl) statsEl.style.display=(name==='ov'?'grid':'none');
  if(name==='logs') loadLogs(1);
  else if(name==='perf') loadPerf('day');
  else if(name==='attach') loadAllAttachments();
  else if(name==='bak') aSettingsTab('bak');
}
async function loadAllAttachments(){
  var el=document.getElementById('all-attach-list');
  if(!el) return;
  el.innerHTML='<div style="text-align:center;padding:20px;color:var(--tx3)">جاري التحميل...</div>';
  var r=await api('/api/attachments/all');
  if(!r.ok){el.innerHTML='<div style="color:var(--err-tx);padding:16px">فشل التحميل</div>';return;}
  if(!r.attachments.length){el.innerHTML='<div style="text-align:center;padding:24px;color:var(--tx3)">لا توجد مرفقات</div>';return;}
  var html='';
  r.attachments.forEach(function(a){
    var isImg=a.mime.startsWith('image/');
    html+='<div style="display:flex;align-items:center;gap:10px;padding:8px 12px;border-bottom:1px solid var(--border)">';
    html+='<span style="font-size:18px">'+(isImg?'🖼️':'📎')+'</span>';
    html+='<div style="flex:1;min-width:0">';
    html+='<div style="font-size:13px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;direction:ltr">'+escHtml(a.filename)+'</div>';
    html+='<div style="font-size:11px;color:var(--tx3);margin-top:2px">'+escHtml(a.passport)+(a.group_name?' — '+escHtml(a.group_name):'')+'</div>';
    html+='</div>';
    html+='<div style="font-size:11px;color:var(--tx3);white-space:nowrap">'+escHtml(a.created_at||'')+'</div>';
    html+='<a href="/api/attachments/'+a.id+'/raw" target="_blank" rel="noopener" class="btn" style="padding:3px 10px;font-size:12px;flex-shrink:0;width:auto;display:inline-block">عرض</a>';
    html+='<button class="btn btn-err" style="padding:3px 10px;font-size:12px;flex-shrink:0;width:auto" onclick="adminDeleteAttachment('+a.id+')">حذف</button>';
    html+='</div>';
  });
  el.innerHTML=html;
}
async function adminDeleteAttachment(id){
  if(!confirm('حذف المرفق؟')) return;
  var r=await api('/api/attachments/delete',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:id})});
  if(r.ok){toast('تم الحذف');loadAllAttachments();}
  else toast(r.msg||'فشل',true);
}
function aSettingsTab(name){
  ['bak','grp','emp'].forEach(function(k){
    var c=document.getElementById('st-'+k); if(c) c.style.display=(k===name?'block':'none');
    var b=document.getElementById('stab-'+k); if(b) b.classList.toggle('primary',k===name);
  });
  if(name==='grp') loadGrpMgr();
  else if(name==='emp') loadEmp();
  else loadBak();
}

async function loadAdmin(){
  var r=await api('/api/stats');
  if(!r.ok) return;
  document.getElementById('at').textContent=r.total;
  document.getElementById('aa').textContent=r.active;
  document.getElementById('ad').textContent=r.departed;
  document.getElementById('ai').textContent=r.inactive;
  if(r.deleted){
    document.getElementById('adel').textContent=r.deleted;
    document.getElementById('stat-del').style.display='';
  } else {
    document.getElementById('stat-del').style.display='none';
  }
  document.getElementById('adm-grps').innerHTML=r.groups.map(g=>`
    <div class="g-row">
      <div>
        <div class="g-name">${g.name}</div>
        <div class="g-sub">${g.total} حاج</div>
      </div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center">
        ${badge(g.active+' مفعّل','b-ok')}
        ${g.departed?badge(g.departed+' غادر','b-warn'):''}
        ${g.inactive?badge(g.inactive+' غير مفعّل','b-err'):''}
        <button class="nav-btn" onclick="openOfficeDashboard('${g.id}')" title="لوحة حالة المكتب">${ico('chart')}</button>
        <button class="nav-btn" onclick="exportGroup('${g.id}')" title="تصدير Excel">${ico('download')}</button>
        <button class="nav-btn" onclick="srchOpenGroup('${g.id}')">${ico('search')}</button>
      </div>
    </div>`).join('');
}

// ── Transfer modal (admin only) ─────────────────────────────
async function openTransferModal(){
  if(!srchCR) return;
  document.getElementById('tr-pp').textContent=srchCR.passport;
  document.getElementById('tr-old-grp').textContent=srchCR.group_name||'';
  document.getElementById('tr-old-seq').textContent=srchCR.seq_code||(srchCR.seq?'م'+srchCR.seq:'');
  document.getElementById('tr-preview').style.display='none';
  document.getElementById('tr-err').style.display='none';
  var sel=document.getElementById('tr-gid');
  sel.innerHTML='<option value="">— اختر —</option>';
  var r=await api('/api/groups');
  if(r.ok) r.groups.forEach(g=>{
    var o=document.createElement('option'); o.value=g.id; o.textContent=g.name; sel.appendChild(o);
  });
  document.getElementById('m-transfer').classList.add('open');
}
function onTrGrpChange(){
  var sel=document.getElementById('tr-gid');
  var grpName=sel.options[sel.selectedIndex].textContent;
  var prev=document.getElementById('tr-preview');
  if(sel.value){
    prev.innerHTML=`من: <strong>${document.getElementById('tr-old-grp').textContent}</strong> — ${document.getElementById('tr-old-seq').textContent}<br>إلى: <strong>${grpName}</strong> — رقم جديد`;
    prev.style.display='block';
  } else { prev.style.display='none'; }
}
async function confirmTransfer(){
  var pp=document.getElementById('tr-pp').textContent;
  var gid=document.getElementById('tr-gid').value;
  var errEl=document.getElementById('tr-err');
  if(!gid){errEl.textContent='اختر المجموعة';errEl.style.display='block';return;}
  errEl.style.display='none';
  var r=await api('/api/restore-transfer',{method:'POST',headers:{'Content-Type':'application/json'},
    body:JSON.stringify({passport:pp,new_group_id:gid})});
  if(r.ok){
    closeDlg('m-transfer');
    toast(`✓ منقول: ${r.old_group} (${r.old_seq}) → ${r.new_group} (${r.new_seq})`);
    execSearch(); loadAdmin();
  } else { errEl.textContent=r.msg||'فشل'; errEl.style.display='block'; }
}

// ── List screen ──────────────────────────────────────────────
var slFilter='all', slPage=1, slGid='', slGroupMap={};

function openList(){
  slFilter='all'; slPage=1; slGid='';
  var isAdmin=S.role==='admin';
  document.getElementById('sl-grp-wrap').style.display=isAdmin?'block':'none';
  document.getElementById('slf-deleted').style.display=isAdmin?'':'none';
  ['all','active','inactive','departed','deleted'].forEach(function(k){
    var b=document.getElementById('slf-'+k); if(b) b.classList.toggle('primary',k==='all');
  });
  if(isAdmin){
    api('/api/groups').then(function(r){
      if(!r.ok) return;
      slGroupMap={};
      var sel=document.getElementById('sl-gid');
      sel.innerHTML='<option value="">كل المجموعات</option>';
      r.groups.forEach(function(g){
        slGroupMap[g.id]=g.name;
        sel.innerHTML+='<option value="'+escHtml(g.id)+'">'+escHtml(g.name)+'</option>';
      });
    });
  }
  show('s-list');
  loadListScreen();
}
function closeList(){
  if(S.role==='admin') show('s-admin');
  else{ show('s-worker'); setTimeout(function(){var e=document.getElementById('w-srch');if(e)e.focus();},80); }
}
function slSetFilter(f){
  slFilter=f; slPage=1;
  ['all','active','inactive','departed','deleted'].forEach(function(k){
    var b=document.getElementById('slf-'+k); if(b) b.classList.toggle('primary',k===f);
  });
  loadListScreen();
}
function slSetGid(){
  slGid=document.getElementById('sl-gid').value; slPage=1; loadListScreen();
}
function slChangePage(p){
  slPage=p; loadListScreen();
  document.querySelector('#s-list .pg').scrollTop=0;
}
function slOpenPassport(pp){
  document.getElementById('srch-q').value=pp;
  document.getElementById('m-search').classList.add('open');
  execSearch();
}
async function loadListScreen(){
  var body=document.getElementById('sl-body');
  body.innerHTML='<div style="text-align:center;padding:32px;opacity:.5">جاري التحميل...</div>';
  var params='/api/list?per=50&page='+slPage+'&filter='+slFilter;
  if(slGid) params+='&gid='+encodeURIComponent(slGid);
  var r=await api(params);
  if(!r.ok){body.innerHTML='<div style="color:var(--err-tx);padding:16px;text-align:center">'+escHtml(r.msg)+'</div>';return;}
  document.getElementById('sl-count').textContent=r.total+' سجل';
  if(!r.rows.length){
    body.innerHTML='<div style="text-align:center;padding:40px;opacity:.5">لا توجد سجلات</div>';
    document.getElementById('sl-pages').innerHTML=''; return;
  }
  var isAdmin=S.role==='admin';
  var html='<div style="border:1px solid var(--border);border-radius:12px;overflow:hidden">';
  r.rows.forEach(function(row,i){
    var dep=row.departed==='نعم'?'<span style="font-size:11px;color:var(--warn-tx);background:var(--warn-bg);padding:1px 6px;border-radius:99px">غادر</span>':'';
    var st=row.deleted
      ?'<span style="font-size:11px;color:var(--err-tx);background:var(--err-bg);padding:1px 6px;border-radius:99px">محذوف</span>'
      :(row.status==='مفعل'
        ?'<span style="font-size:11px;color:var(--ok-tx);background:var(--ok-bg);padding:1px 6px;border-radius:99px">مفعّل</span>'
        :'<span style="font-size:11px;color:var(--err-tx);background:var(--err-bg);padding:1px 6px;border-radius:99px">غير مفعّل</span>');
    var grpCell=isAdmin?'<span style="font-size:11px;opacity:.55;min-width:64px">'+escHtml(slGroupMap[row.group_id]||row.group_id||'')+'</span>':'';
    var border=i<r.rows.length-1?'border-bottom:1px solid var(--border)':'';
    html+='<div style="display:flex;align-items:center;gap:8px;padding:10px 14px;cursor:pointer;'+border+'" onclick="slOpenPassport(\''+escHtml(row.passport)+'\')">'
      +'<span style="font-family:monospace;font-weight:700;letter-spacing:1px;font-size:13px;color:var(--accent);min-width:86px">'+escHtml(row.passport)+'</span>'
      +'<span style="font-size:12px;color:var(--tx2);min-width:50px;direction:ltr">'+escHtml(row.seq_code||(row.seq?'م'+row.seq:''))+'</span>'
      +grpCell
      +'<span style="flex:1;font-size:13px">'+escHtml(row.name||'')+'</span>'
      +'<div style="display:flex;gap:4px">'+st+dep+'</div>'
      +'</div>';
  });
  html+='</div>';
  body.innerHTML=html;
  var totalPages=Math.ceil(r.total/50);
  var pg=document.getElementById('sl-pages');
  if(totalPages<=1){pg.innerHTML='';return;}
  var ph='';
  if(slPage>1) ph+='<button class="nav-btn" onclick="slChangePage('+(slPage-1)+')">→</button>';
  ph+='<span style="font-size:13px;opacity:.6;padding:0 8px">'+slPage+' / '+totalPages+'</span>';
  if(slPage<totalPages) ph+='<button class="nav-btn" onclick="slChangePage('+(slPage+1)+')">←</button>';
  pg.innerHTML=ph;
}

// ── Worker inline search ──────────────────────────────────────
async function wSearch(){
  var inp=document.getElementById('w-srch');
  var q=inp.value.trim(); if(!q) return;
  inp.value='';
  document.getElementById('srch-q').value=q;
  document.getElementById('srch-body').innerHTML='';
  document.getElementById('m-search').classList.add('open');
  execSearch();
}

async function wDepart(){
  if(!srchCR||srchCR.departed==='نعم') return;
  var r=await api('/api/depart',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({passport:srchCR.passport})});
  if(r.ok){
    srchCR=null;
    loadWorker();
  } else {
    toast(r.msg,true);
  }
}

// ── Search modal ─────────────────────────────────────────────
function openSearch(passport){
  document.getElementById('srch-q').value=passport||'';
  document.getElementById('srch-body').innerHTML='';
  document.getElementById('m-search').classList.add('open');
  setTimeout(function(){document.getElementById('srch-q').focus();},80);
}
function srchOpenGroup(_gid){
  openSearch();
  document.getElementById('srch-body').innerHTML=
    '<div style="color:var(--tx2);font-size:13px;text-align:center;padding:8px">ابحث برقم الجواز للوصول لأي سجل في هذه المجموعة</div>';
}
async function execSearch(){
  var q=document.getElementById('srch-q').value.trim(); if(!q) return;
  sb('srch-btn','جاري...',true);
  var r=await api('/api/search?passport='+encodeURIComponent(q));
  sb('srch-btn','بحث',false);
  var body=document.getElementById('srch-body');
  if(!r.ok){body.innerHTML='<div style="text-align:center;padding:16px;color:var(--err-tx);font-weight:700">'+escHtml(r.msg)+'</div>';return;}
  srchCR=r;
  var isAdmin=S.role==='admin';
  var canAct=isAdmin||r.can_act;
  var isDeleted=!!r.deleted;
  var html='';
  html+='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">';
  html+='<div style="font-size:20px;font-weight:700;direction:ltr">'+escHtml(r.passport);
  if(r.is_diplomatic) html+=' '+badge('دبلوماسي','b-dipl');
  html+='</div>'+(r.status==='مفعل'?badge('مفعّل','b-ok'):badge('غير مفعّل','b-err'))+'</div>';
  if(r.group_name) html+='<div class="row"><span class="row-l">المجموعة</span><span class="row-v">'+escHtml(r.group_name)+'</span></div>';
  html+='<div class="row"><span class="row-l">الرقم التسلسلي</span><span class="row-v" style="direction:ltr;color:var(--accent);font-weight:700">'+escHtml(r.seq_code||(r.seq?'م'+r.seq:'—'))+'</span></div>';
  html+='<div class="row"><span class="row-l">المغادرة</span><span class="row-v">'+(r.departed==='نعم'?badge('غادر','b-warn')+' '+ico('plane',13)+' '+escHtml(r.departed_at||''):badge('لم يغادر','b-gray'))+'</span></div>';
  if(r.notes) html+='<div class="row" style="border:none"><span class="row-l">ملاحظات</span><span class="row-v" style="font-size:12px" id="srch-notes"></span></div>';
  html+='<div id="srch-attachments"></div>';
  if(isDeleted) html+='<div style="background:var(--err-bg,#FEF2F2);border-radius:8px;padding:10px 14px;color:var(--err-tx);font-weight:700;text-align:center;margin:10px 0">'+ico('warn',16)+' هذا السجل محذوف</div>';
  if(!isAdmin && !r.can_act) html+='<div style="background:var(--warn-bg);border-radius:8px;padding:10px 14px;color:var(--warn-tx);font-weight:700;text-align:center;margin:10px 0">هذا الجواز في مجموعة أخرى — للعرض فقط</div>';
  if(canAct && !isDeleted){
    html+='<div class="btn-g2" style="margin-top:14px">';
    if(r.departed!=='نعم') html+='<button class="btn btn-warn" onclick="srchDepart()">'+ico('plane',15)+' تسجيل مغادرة</button>';
    else if(isAdmin)       html+='<button class="btn btn-warn" onclick="srchUndepart()">'+ico('back',15)+' إلغاء المغادرة</button>';
    html+='<button class="btn" onclick="srchToggleStatus()">'+(r.status==='مفعل'?'إيقاف التفعيل':ico('checkCircle',15)+' تفعيل النسك')+'</button>';
    if(isAdmin){
      html+='<button class="btn" onclick="srchToggleDipl()">'+(r.is_diplomatic?'إلغاء الدبلوماسي':ico('info',15)+' دبلوماسي')+'</button>';
    }
    html+='<button class="btn" onclick="srchEditNotes()">'+ico('pencil',15)+' الملاحظات</button>';
    if(canAct){
      html+='<button class="btn btn-err" onclick="srchDelete()">'+ico('trash',15)+' حذف</button>';
    }
    html+='</div>';
  }
  if(isAdmin && isDeleted){
    html+='<div class="btn-g2" style="margin-top:14px">';
    html+='<button class="btn btn-p" onclick="srchUndelete()">↩ استعادة بنفس المجموعة</button>';
    html+='<button class="btn" style="background:var(--accent);color:#fff;border-color:var(--accent)" onclick="openTransferModal()">↩ نقل لمجموعة أخرى</button>';
    html+='</div>';
  }
  body.innerHTML=html;
  if(r.notes) setNotesHtml('srch-notes',r.notes);
  loadAttachments(r.passport);
}
async function srchDepart(){
  if(!srchCR||!confirm('تسجيل مغادرة '+srchCR.passport+'؟')) return;
  var r=await api('/api/depart',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({passport:srchCR.passport})});
  if(r.ok){toast('تم تسجيل المغادرة');execSearch();if(S.role==='admin')loadAdmin();else loadWorker();}
  else toast(r.msg,true);
}
async function srchUndepart(){
  if(!srchCR||!confirm('إلغاء مغادرة '+srchCR.passport+'؟')) return;
  var r=await api('/api/undepart',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({passport:srchCR.passport})});
  if(r.ok){toast('تم إلغاء المغادرة ✓');execSearch();if(S.role==='admin')loadAdmin();else loadWorker();}
  else toast(r.msg,true);
}
async function srchToggleStatus(){
  if(!srchCR) return;
  var newSt=srchCR.status==='مفعل'?'غير مفعل':'مفعل';
  var r=await api('/api/update',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({passport:srchCR.passport,status:newSt})});
  if(r.ok){toast('تم التحديث ✓');execSearch();if(S.role==='admin')loadAdmin();else loadWorker();}
  else toast(r.msg,true);
}
async function srchToggleDipl(){
  if(!srchCR) return;
  var newVal=srchCR.is_diplomatic?0:1;
  var r=await api('/api/update',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({passport:srchCR.passport,is_diplomatic:newVal})});
  if(r.ok){toast(newVal?'تم تعيين الجواز دبلوماسي':'تم إلغاء الوضع الدبلوماسي');execSearch();}
  else toast(r.msg,true);
}
async function srchDelete(){
  if(!srchCR||!confirm('حذف الجواز '+srchCR.passport+'؟\nيمكن استعادته لاحقاً.')) return;
  var r=await api('/api/delete',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({passport:srchCR.passport})});
  if(r.ok){
    toast('تم الحذف');srchCR=null;
    document.getElementById('srch-body').innerHTML='';
    document.getElementById('srch-q').value='';
    var wb=document.getElementById('w-srch-body');if(wb)wb.innerHTML='';
    if(S.role==='admin')loadAdmin();else loadWorker();
  }
  else toast(r.msg,true);
}
// ── Notes ────────────────────────────────────────────────────
function srchEditNotes(){
  if(!srchCR) return;
  var raw=srchCR.notes||'';
  var re=/\[\[file\|[^\]]+\]\]/g;
  notesAttachments=raw.match(re)||[];
  document.getElementById('notes-ta').value=raw.replace(re,'').trim();
  document.getElementById('notes-err').style.display='none';
  document.getElementById('m-notes').classList.add('open');
  setTimeout(function(){document.getElementById('notes-ta').focus();},80);
  loadAttachmentsInModal();
}
async function srchSaveNotes(){
  if(!srchCR) return;
  var textPart=document.getElementById('notes-ta').value.trim();
  var notes=(textPart+(notesAttachments.length?'\n'+notesAttachments.join('\n'):'')).trim();
  var errEl=document.getElementById('notes-err');
  sb('notes-save-btn','جاري...',true);
  var r=await api('/api/update',{method:'POST',headers:{'Content-Type':'application/json'},
    body:JSON.stringify({passport:srchCR.passport,status:srchCR.status,notes:notes})});
  sb('notes-save-btn','حفظ',false);
  if(r.ok){closeDlg('m-notes');toast('تم حفظ الملاحظات ✓');execSearch();}
  else{errEl.textContent=r.msg||'فشل';errEl.style.display='block';}
}

// ── Attachments ───────────────────────────────────────────────
function _embedsFromNotes(notes){
  var list=[];
  var re=/\[\[file\|([^|]+)\|([^|]+)\|([^\]]+)\]\]/g;
  var m;
  while((m=re.exec(notes||''))!==null){
    list.push({name:decodeURIComponent(m[1]||'file'),mime:decodeURIComponent(m[2]||'application/octet-stream'),dataUrl:decodeURIComponent(m[3]||'')});
  }
  return list;
}

async function loadAttachments(passport){
  var el=document.getElementById('srch-attachments');
  if(!el) return;
  var r=await api('/api/attachments?passport='+encodeURIComponent(passport));
  if(!r.ok){el.innerHTML='';return;}
  var canAct=srchCR&&(S.role==='admin'||srchCR.can_act);
  var embeds=_embedsFromNotes(srchCR&&srchCR.notes);
  var html='<div style="margin-top:12px;border-top:1px solid var(--border);padding-top:12px">';
  html+='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">';
  html+='<span style="font-size:13px;font-weight:600;color:var(--tx2)">المرفقات</span>';
  if(canAct) html+='<button class="btn" style="padding:3px 12px;font-size:12px" onclick="attachPickFile()">+ إضافة</button>';
  html+='</div>';
  if(r.attachments.length===0 && embeds.length===0){
    html+='<div style="font-size:12px;color:var(--tx3);text-align:center;padding:8px 0">لا توجد مرفقات</div>';
  } else {
    r.attachments.forEach(function(a){
      var isImg=a.mime.startsWith('image/');
      html+='<div style="display:flex;align-items:center;gap:8px;padding:6px 10px;background:var(--bg2);border-radius:8px;margin-bottom:6px;border:1px solid var(--border)">';
      html+='<span style="font-size:16px">'+(isImg?'🖼️':'📎')+'</span>';
      html+='<span style="flex:1;font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;direction:ltr">'+escHtml(a.filename)+'</span>';
      html+='<a href="/api/attachments/'+a.id+'/raw" target="_blank" rel="noopener" class="btn" style="padding:2px 8px;font-size:11px;width:auto;display:inline-block">عرض</a>';
      if(canAct) html+='<button class="btn btn-err" style="padding:2px 8px;font-size:11px" onclick="deleteAttachment('+a.id+')">حذف</button>';
      html+='</div>';
    });
    embeds.forEach(function(a){
      var isImg=a.mime.startsWith('image/');
      html+='<div style="display:flex;align-items:center;gap:8px;padding:6px 10px;background:var(--bg2);border-radius:8px;margin-bottom:6px;border:1px solid var(--border)">';
      html+='<span style="font-size:16px">'+(isImg?'🖼️':'📎')+'</span>';
      html+='<span style="flex:1;font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;direction:ltr">'+escHtml(a.name)+'</span>';
      html+='<a href="'+a.dataUrl+'" target="_blank" rel="noopener" class="btn" style="padding:2px 8px;font-size:11px">عرض</a>';
      html+='</div>';
    });
  }
  html+='<input type="file" id="attach-file-inp" style="display:none" accept="image/*,.pdf,.doc,.docx" onchange="attachFileChanged(this)">';
  html+='</div>';
  el.innerHTML=html;
}

async function loadAttachmentsInModal(){
  if(!srchCR) return;
  var el=document.getElementById('modal-attach-list');
  if(!el) return;
  el.innerHTML='<div style="font-size:12px;color:var(--tx3);padding:4px 0">جاري التحميل...</div>';
  var r=await api('/api/attachments?passport='+encodeURIComponent(srchCR.passport));
  if(!r.ok){el.innerHTML='';return;}
  if(!r.attachments.length){
    el.innerHTML='<div style="font-size:12px;color:var(--tx3);text-align:center;padding:8px 0">لا توجد مرفقات</div>';
    return;
  }
  var html='';
  r.attachments.forEach(function(a){
    var isImg=a.mime.startsWith('image/');
    html+='<div style="display:flex;align-items:center;gap:8px;padding:6px 10px;background:var(--bg2);border-radius:8px;margin-bottom:6px;border:1px solid var(--border)">';
    html+='<span style="font-size:16px">'+(isImg?'🖼️':'📎')+'</span>';
    html+='<span style="flex:1;font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;direction:ltr">'+escHtml(a.filename)+'</span>';
    html+='<a href="/api/attachments/'+a.id+'/raw" target="_blank" rel="noopener" class="btn" style="padding:2px 8px;font-size:11px;width:auto;display:inline-block">عرض</a>';
    html+='<button class="btn btn-err" style="padding:2px 8px;font-size:11px" onclick="deleteAttachmentFromModal('+a.id+')">حذف</button>';
    html+='</div>';
  });
  el.innerHTML=html;
}

function attachPickFile(){document.getElementById('attach-file-inp').click();}
function modalPickFile(){document.getElementById('modal-attach-inp').click();}

async function attachFileChanged(input){
  var file=input.files[0];
  if(!file||!srchCR) return;
  if(file.size>5*1024*1024){toast('الملف أكبر من 5MB',true);input.value='';return;}
  var reader=new FileReader();
  reader.onload=async function(e){
    var data=e.target.result.split(',')[1];
    var r=await api('/api/attachments/add',{method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({passport:srchCR.passport,filename:file.name,mime:file.type||'application/octet-stream',data:data})});
    if(r.ok){toast('تم رفع المرفق ✓');loadAttachments(srchCR.passport);}
    else toast(r.msg||'فشل الرفع',true);
    input.value='';
  };
  reader.readAsDataURL(file);
}

async function modalAttachFileChanged(input){
  var file=input.files[0];
  if(!file||!srchCR) return;
  if(file.size>5*1024*1024){toast('الملف أكبر من 5MB',true);input.value='';return;}
  var reader=new FileReader();
  reader.onload=async function(e){
    var data=e.target.result.split(',')[1];
    var r=await api('/api/attachments/add',{method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({passport:srchCR.passport,filename:file.name,mime:file.type||'application/octet-stream',data:data})});
    if(r.ok){toast('تم رفع المرفق ✓');loadAttachmentsInModal();loadAttachments(srchCR.passport);}
    else toast(r.msg||'فشل الرفع',true);
    input.value='';
  };
  reader.readAsDataURL(file);
}

async function deleteAttachment(id){
  if(!confirm('حذف المرفق؟')) return;
  var r=await api('/api/attachments/delete',{method:'POST',headers:{'Content-Type':'application/json'},
    body:JSON.stringify({id:id})});
  if(r.ok){toast('تم الحذف');loadAttachments(srchCR.passport);}
  else toast(r.msg||'فشل',true);
}

async function deleteAttachmentFromModal(id){
  if(!confirm('حذف المرفق؟')) return;
  var r=await api('/api/attachments/delete',{method:'POST',headers:{'Content-Type':'application/json'},
    body:JSON.stringify({id:id})});
  if(r.ok){toast('تم الحذف');loadAttachmentsInModal();loadAttachments(srchCR.passport);}
  else toast(r.msg||'فشل',true);
}
function viewAttachment(id){
  window.open('/api/attachments/'+id+'/raw','_blank');
}

async function srchUndelete(){
  if(!srchCR||!confirm('استعادة '+srchCR.passport+' في نفس المجموعة؟')) return;
  var r=await api('/api/undelete',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({passport:srchCR.passport})});
  if(r.ok){toast('تم الاستعادة ✓');execSearch();loadAdmin();}
  else toast(r.msg,true);
}

function escHtml(s){
  return String(s||'').replace(/[&<>"]/g,function(ch){
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[ch];
  });
}

function renderNotesHtml(notes){
  var raw=String(notes||'').trim();
  if(!raw) return '—';
  var textOnly=raw.replace(/\[\[file\|[^\]]+\]\]/g,'').trim();
  return textOnly?'<div style="white-space:pre-wrap">'+escHtml(textOnly)+'</div>':'—';
}

function setNotesHtml(id,notes){
  var el=document.getElementById(id);
  if(el) el.innerHTML=renderNotesHtml(notes);
}

// ── Logs ────────────────────────────────────────────────────
async function loadLogs(page){
  logsPage=page;
  var u=document.getElementById('lf-u').value;
  var a=document.getElementById('lf-a').value;
  var p=document.getElementById('lf-p').value;
  var r=await api(`/api/logs?page=${page}&per=50&user=${encodeURIComponent(u)}&action=${encodeURIComponent(a)}&passport=${encodeURIComponent(p)}`);
  if(!r.ok) return;
  var body=document.getElementById('logs-body');
  if(!r.rows.length){body.innerHTML='<tr><td colspan="4" style="text-align:center;padding:20px;color:var(--tx3)">لا توجد نتائج</td></tr>';return;}
  var ac={'دخول':'b-blue','خروج':'b-gray','إضافة':'b-ok','تعديل':'b-blue','مغادرة':'b-warn','حذف':'b-err'};
  body.innerHTML=r.rows.map(row=>`<tr>
    <td style="font-size:12px;direction:ltr;white-space:nowrap">${row.ts||''}</td>
    <td>${row.username||''}</td>
    <td>${badge(row.action||'',ac[row.action]||'b-gray')}</td>
    <td style="direction:ltr;font-weight:600">${row.passport||''}</td>
  </tr>`).join('');
  var pages=Math.ceil(r.total/50);
  document.getElementById('logs-pag').innerHTML=pages>1?`
    <button onclick="loadLogs(${page-1})" ${page<=1?'disabled':''}>◀</button>
    <span>${page} / ${pages}</span>
    <button onclick="loadLogs(${page+1})" ${page>=pages?'disabled':''}>▶</button>`:'';
}

// ── Performance ─────────────────────────────────────────────
async function loadPerf(period,el){
  if(el){document.querySelectorAll('#t-perf .fb').forEach(b=>b.classList.remove('on'));el.classList.add('on');}
  var r=await api('/api/emp-stats?period='+period);
  if(!r.ok) return;
  var body=document.getElementById('perf-body');
  if(!r.stats.length){body.innerHTML='<tr><td colspan="8" style="text-align:center;padding:20px;color:var(--tx3)">لا توجد بيانات</td></tr>';return;}
  body.innerHTML=r.stats.map((s,i)=>{
    var tot=s.add+s.edit+s.depart+s.delete;
    return `<tr>
      <td style="color:var(--tx3)">#${i+1}</td>
      <td style="font-weight:600">${s.username}</td>
      <td style="color:var(--tx2)">${s.group||'—'}</td>
      <td style="color:var(--ok-tx);font-weight:600">${s.add}</td>
      <td style="color:var(--accent);font-weight:600">${s.edit}</td>
      <td style="color:var(--warn-tx);font-weight:600">${s.depart}</td>
      <td style="color:var(--err-tx);font-weight:600">${s.delete}</td>
      <td style="font-weight:700">${tot}</td>
    </tr>`;
  }).join('');
}

// ── Employees ───────────────────────────────────────────────
async function loadEmp(){
  var r=await api('/api/users');
  if(!r.ok) return;
  document.getElementById('emp-list').innerHTML=r.users.length?r.users.map(u=>`
    <div class="g-row">
      <div>
        <div class="g-name">${u.username}</div>
        <div class="g-sub">${u.role==='admin'?'مشرف':'موظف'}${u.group_name?' — '+u.group_name:''}</div>
      </div>
      <div style="display:flex;gap:6px;align-items:center">
        ${badge(u.active?'مفعّل':'معطّل',u.active?'b-ok':'b-err')}
        <button class="nav-btn" onclick='openUserModal(${JSON.stringify(u)})'>تعديل</button>
        <button class="nav-btn" style="color:var(--err-tx)" onclick="askDelUser(${u.id},'${u.username}')">حذف</button>
      </div>
    </div>`).join('')
    :'<div style="text-align:center;padding:20px;color:var(--tx3)">لا يوجد موظفون</div>';
}

function toggleGroupField(){
  var r=document.getElementById('um-role').value;
  document.getElementById('um-grp-f').style.display=r==='admin'?'none':'block';
}

async function openUserModal(user){
  var gr=await api('/api/groups');
  var opts=gr.ok?gr.groups.map(g=>`<option value="${g.id}">${g.name}</option>`).join(''):'';
  document.getElementById('um-grp').innerHTML='<option value="">— اختر —</option>'+opts;
  document.getElementById('um-err').style.display='none';
  document.getElementById('um-pw').value='';
  if(user){
    document.getElementById('um-title').textContent='تعديل موظف';
    document.getElementById('um-id').value=user.id;
    document.getElementById('um-user').value=user.username;
    document.getElementById('um-user').disabled=true;
    document.getElementById('um-role').value=user.role;
    document.getElementById('um-grp').value=user.group_id||'';
    document.getElementById('um-active').value=user.active?'1':'0';
  } else {
    document.getElementById('um-title').textContent='إضافة موظف';
    document.getElementById('um-id').value='';
    document.getElementById('um-user').value='';
    document.getElementById('um-user').disabled=false;
    document.getElementById('um-role').value='worker';
    document.getElementById('um-grp').value='';
    document.getElementById('um-active').value='1';
  }
  toggleGroupField();
  document.getElementById('m-user').classList.add('open');
}

async function saveUser(){
  var id=document.getElementById('um-id').value;
  var data={id:id||null,
    username:document.getElementById('um-user').value.trim(),
    password:document.getElementById('um-pw').value,
    role:document.getElementById('um-role').value,
    group_id:document.getElementById('um-grp').value,
    active:parseInt(document.getElementById('um-active').value)};
  var r=await api('/api/users/save',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
  if(r.ok){closeDlg('m-user');toast('تم الحفظ ✓');loadEmp();}
  else{var e=document.getElementById('um-err');e.style.display='block';e.textContent=r.msg;}
}

var _delUserId=null;
function askDelUser(id,name){
  if(confirm(`حذف المستخدم "${name}"؟`))delUser(id);
}
async function delUser(id){
  var r=await api('/api/users/delete',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id})});
  if(r.ok){toast('تم الحذف');loadEmp();}
  else toast(r.msg,true);
}

// ── Groups Mgmt ─────────────────────────────────────────────
async function loadGrpMgr(){
  var r=await api('/api/groups');
  if(!r.ok) return;
  document.getElementById('grp-list').innerHTML=r.groups.length?r.groups.map((g,i)=>`
    <div class="g-row">
      <div style="display:flex;align-items:center;gap:12px">
        <span style="font-size:12px;color:var(--tx3);width:18px;text-align:center">${i+1}</span>
        ${hexIcon(g.icon,g.color,40)}
        <div>
          <div class="g-name" style="display:flex;align-items:center;gap:8px">
            ${g.name}
            <span style="background:${g.color||'var(--accent)'};color:#fff;border-radius:6px;padding:1px 8px;
              font-size:11px;font-weight:700;direction:ltr">${g.prefix||'?'}</span>
          </div>
          <div class="g-sub" style="direction:ltr">${g.id}</div>
        </div>
      </div>
      <div style="display:flex;gap:6px">
        <button class="nav-btn" onclick='openGroupModal(${JSON.stringify(g)})'>تعديل</button>
        <button class="nav-btn" style="color:var(--err-tx)" onclick="askDelGrp('${g.id}','${g.name}')">حذف</button>
      </div>
    </div>`).join('')
    :'<div style="text-align:center;padding:20px;color:var(--tx3)">لا توجد مجموعات</div>';
}

function renderIconPicker(selKey,selColor){
  var pick=document.getElementById('gm-icon-pick');
  pick.innerHTML=GRP_ICON_KEYS.map(k=>`
    <button type="button" class="icon-btn${k===selKey?' on':''}" onclick="selectIcon('${k}')" title="${k}">
      ${hexIcon(k,k===selKey?selColor:'#9CA3AF',32)}
    </button>`).join('');
}

function renderColorPicker(selColor){
  var pick=document.getElementById('gm-clr-pick');
  pick.innerHTML=COLORS.map(c=>`
    <div class="clr-dot${c===selColor?' on':''}" style="background:${c};${c===selColor?'outline:2px solid '+c+';outline-offset:2px':''}"
         onclick="selectColor('${c}')"></div>`).join('');
}

function selectIcon(key){
  document.getElementById('gm-icon').value=key;
  var color=document.getElementById('gm-color').value;
  renderIconPicker(key,color);
  document.getElementById('gm-hex-preview').innerHTML=hexIcon(key,color,52);
}

function selectColor(color){
  document.getElementById('gm-color').value=color;
  var key=document.getElementById('gm-icon').value||'users';
  renderColorPicker(color);
  renderIconPicker(key,color);
  document.getElementById('gm-hex-preview').innerHTML=hexIcon(key,color,52);
}

function openGroupModal(grp){
  document.getElementById('gm-err').style.display='none';
  var pfxInp=document.getElementById('gm-prefix');
  var icon=grp&&grp.icon?grp.icon:'users';
  var color=grp&&grp.color?grp.color:'#3B82F6';
  document.getElementById('gm-icon').value=icon;
  document.getElementById('gm-color').value=color;
  if(grp){
    document.getElementById('gm-title').textContent='تعديل مجموعة';
    document.getElementById('gm-orig').value=grp.id;
    document.getElementById('gm-id').value=grp.id;
    document.getElementById('gm-id').disabled=true;
    document.getElementById('gm-name').value=grp.name;
    pfxInp.value=grp.prefix||'';
  } else {
    document.getElementById('gm-title').textContent='إضافة مجموعة';
    document.getElementById('gm-orig').value='';
    document.getElementById('gm-id').value='';
    document.getElementById('gm-id').disabled=false;
    document.getElementById('gm-name').value='';
    pfxInp.value='';
  }
  updatePrefixPreview();
  pfxInp.oninput=function(){this.value=this.value.toUpperCase();updatePrefixPreview();};
  renderIconPicker(icon,color);
  renderColorPicker(color);
  document.getElementById('gm-hex-preview').innerHTML=hexIcon(icon,color,52);
  document.getElementById('m-grp').classList.add('open');
}

function updatePrefixPreview(){
  var p=document.getElementById('gm-prefix').value.toUpperCase()||'?';
  document.getElementById('gm-preview').textContent=p+'-1، '+p+'-2...';
}

async function saveGroup(){
  var data={id:document.getElementById('gm-id').value,
    name:document.getElementById('gm-name').value,
    prefix:document.getElementById('gm-prefix').value.toUpperCase(),
    orig_id:document.getElementById('gm-orig').value,
    icon:document.getElementById('gm-icon').value||'users',
    color:document.getElementById('gm-color').value||'#3B82F6'};
  var r=await api('/api/groups/save',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
  if(r.ok){closeDlg('m-grp');toast('تم الحفظ ✓');loadGrpMgr();loadAdmin();}
  else{var e=document.getElementById('gm-err');e.style.display='block';e.textContent=r.msg;}
}

function askDelGrp(id,name){
  document.getElementById('delgrp-id').value=id;
  document.getElementById('delgrp-name').textContent=name;
  document.getElementById('m-delgrp').classList.add('open');
}
async function confirmDelGrp(){
  var id=document.getElementById('delgrp-id').value;
  var act=document.getElementById('delgrp-emp').value;
  var r=await api('/api/groups/delete',{method:'POST',headers:{'Content-Type':'application/json'},
    body:JSON.stringify({id,emp_action:act})});
  closeDlg('m-delgrp');
  if(r.ok){toast('تم حذف المجموعة');loadGrpMgr();loadAdmin();}
  else toast(r.msg,true);
}

// ── Backup ──────────────────────────────────────────────────
async function loadBak(){
  var r=await api('/api/backups');
  if(!r.ok) return;
  var el=document.getElementById('bak-list');
  el.innerHTML=r.files.length?r.files.map(f=>`
    <div class="row"><span class="row-v" style="font-size:13px;direction:ltr">${f}</span>
    ${badge('✓','b-ok')}</div>`).join('')
    :'<div style="text-align:center;padding:16px;color:var(--tx3)">لا توجد نسخ</div>';
}
async function doBak(){
  sb('bak-btn','جاري النسخ...',true);
  var r=await api('/api/backup',{method:'POST'});
  sb('bak-btn',ico('backup',15)+' إنشاء نسخة الآن',false);
  if(r.ok){toast('تم: '+r.file);loadBak();}
  else toast(r.msg,true);
}

// ── Worker ──────────────────────────────────────────────────
async function loadWorker(){
  var r=await api('/api/stats?gid='+S.gid);
  if(!r.ok) return;
  document.getElementById('wt').textContent=r.total||0;
  document.getElementById('wa').textContent=r.active||0;
  document.getElementById('wd').textContent=r.departed||0;
  document.getElementById('wi').textContent=r.inactive||0;
  initWorkerTripDate();
  loadWorkerTrips();
}

var ADMIN_TRIP_CACHE={};
var WORKER_TRIP_CACHE={};
var TRIP_EDIT_FIELDS=[
  'report_date','hotel_name','location_url','nationality','flight_no',
  'carrier','destination','approval_no','departure_time',
  'housing_contract_no','bus_stand_time','bus_departure_time',
  'planned_pilgrim_count','bus_count','notes'
];

function tripStatusLabel(status){
  if(status==='confirmed') return 'رحلة مؤكدة / جاهزة للمغادرة';
  if(status==='departed') return 'تمت مغادرتها';
  return 'قيد التجهيز';
}

function tripStatusChip(status){
  var bg='rgba(59,130,246,.12)', color='var(--pri,#2563EB)';
  if(status==='confirmed'){bg='rgba(34,197,94,.12)'; color='var(--ok-tx,#15803d)';}
  else if(status==='departed'){bg='rgba(245,158,11,.14)'; color='var(--warn-tx,#b45309)';}
  return '<span style="font-size:12px;padding:4px 10px;border-radius:999px;background:'+bg+';color:'+color+'">'+escHtml(tripStatusLabel(status))+'</span>';
}

function cacheTrips(mode,trips){
  var target=mode==='admin'?ADMIN_TRIP_CACHE:WORKER_TRIP_CACHE;
  Object.keys(target).forEach(function(k){ delete target[k]; });
  (trips||[]).forEach(function(t){ target[t.id]=t; });
}

function getTripCache(mode){
  return mode==='admin'?ADMIN_TRIP_CACHE:WORKER_TRIP_CACHE;
}

function workerTripValue(id){
  var el=document.getElementById(id);
  return el?el.value.trim():'';
}

function initWorkerTripDate(){
  var el=document.getElementById('wtrip-report-date');
  if(!el || el.value) return;
  var today=new Date();
  var yyyy=today.getFullYear();
  var mm=String(today.getMonth()+1).padStart(2,'0');
  var dd=String(today.getDate()).padStart(2,'0');
  el.value=yyyy+'-'+mm+'-'+dd;
}

function workerTripFormIds(){
  return [
    'wtrip-hotel-name','wtrip-location-url','wtrip-nationality','wtrip-flight-no',
    'wtrip-carrier','wtrip-destination','wtrip-approval-no','wtrip-departure-time',
    'wtrip-housing-contract-no','wtrip-bus-stand-time','wtrip-bus-departure-time',
    'wtrip-planned-pilgrim-count','wtrip-bus-count','wtrip-notes'
  ];
}

function buildTripSelectOptions(trips){
  if(!trips.length) return '<option value="">لا توجد رحلات</option>';
  return trips.map(function(t){
    return '<option value="'+escHtml(t.id)+'">'+escHtml(t.id)+' - '+escHtml(t.hotel_name||'')+'</option>';
  }).join('');
}

function focusTripAssign(mode, tripId){
  var selectId=mode==='admin'?'assign-trip-id':'wtrip-assign-trip-id';
  var panelId=mode==='admin'?'trip-assign-panel':'wtrip-assign-panel';
  var sel=document.getElementById(selectId);
  var panel=document.getElementById(panelId);
  if(sel) sel.value=tripId;
  if(panel) panel.scrollIntoView({behavior:'smooth',block:'center'});
}

function renderTripActions(mode, trip){
  var safeId=String(trip.id||'').replace(/\\/g,'\\\\').replace(/'/g,"\\'");
  var actions=[];
  if(trip.status==='departed'){
    actions.push('<span style="font-size:12px;color:var(--tx3);font-weight:700">عرض فقط</span>');
    if(mode==='admin'){
      actions.push('<button class="btn" type="button" onclick="undepartTrip(\''+safeId+'\')" style="padding:8px 12px">التراجع عن المغادرة</button>');
    }
    return actions.join('');
  }
  if(mode==='admin'){
    actions.push('<button class="btn" type="button" onclick="openAdminTripEdit(\''+safeId+'\')" style="padding:8px 12px">تعديل</button>');
    actions.push('<button class="btn" type="button" onclick="focusAdminTripAssign(\''+safeId+'\')" style="padding:8px 12px">ربط حجاج</button>');
    actions.push('<button class="btn" type="button" onclick="downloadAdminTripReport(\''+safeId+'\')" style="padding:8px 12px">تقرير</button>');
    if(trip.status==='draft') actions.push('<button class="btn btn-p" type="button" onclick="confirmAdminTrip(\''+safeId+'\')" style="padding:8px 12px">تأكيد الرحلة</button>');
    if(trip.status==='confirmed') actions.push('<button class="btn btn-p" type="button" onclick="reviewAdminTripDepart(\''+safeId+'\')" style="padding:8px 12px">مراجعة / تأكيد مغادرة</button>');
  }else{
    actions.push('<button class="btn" type="button" onclick="openWorkerTripEdit(\''+safeId+'\')" style="padding:8px 12px">تعديل</button>');
    actions.push('<button class="btn" type="button" onclick="focusWorkerTripAssign(\''+safeId+'\')" style="padding:8px 12px">ربط حجاج</button>');
    actions.push('<button class="btn" type="button" onclick="downloadWorkerTripRowReport(\''+safeId+'\')" style="padding:8px 12px">تقرير</button>');
    if(trip.status==='draft') actions.push('<button class="btn btn-p" type="button" onclick="confirmWorkerTrip(\''+safeId+'\')" style="padding:8px 12px">تأكيد الرحلة</button>');
    if(trip.status==='confirmed') actions.push('<button class="btn btn-p" type="button" onclick="reviewWorkerTripDepart(\''+safeId+'\')" style="padding:8px 12px">مراجعة / تأكيد مغادرة</button>');
  }
  return actions.join('');
}

function renderTripManageListShared(opts){
  var host=document.getElementById(opts.hostId);
  var trips=opts.trips||[];
  if(!host) return;
  cacheTrips(opts.mode,trips);
  if(opts.assignSelectId){
    var assign=document.getElementById(opts.assignSelectId);
    if(assign) assign.innerHTML=buildTripSelectOptions(trips);
  }
  if(!trips.length){
    host.innerHTML='<div style="text-align:center;padding:14px;color:var(--tx3)">'+escHtml(opts.emptyText||'لا توجد رحلات')+'</div>';
    return;
  }
  host.innerHTML=trips.map(function(t){
    return '<div style="border:1px solid var(--border);border-radius:12px;padding:12px;background:var(--card2,transparent)">'+
      '<div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;align-items:flex-start">'+
        '<div style="flex:1;min-width:260px">'+
          '<div style="font-weight:700;margin-bottom:8px">'+escHtml(t.id||'')+'</div>'+
          '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:6px;font-size:12px;color:var(--tx2)">'+
            '<div><strong>المجموعة:</strong> '+escHtml(t.group_name||'-')+'</div>'+
            '<div><strong>الفندق:</strong> '+escHtml(t.hotel_name||'-')+'</div>'+
            '<div><strong>رقم الرحلة:</strong> '+escHtml(t.flight_no||'-')+'</div>'+
            '<div><strong>الوجهة:</strong> '+escHtml(t.destination||'-')+'</div>'+
            '<div><strong>تاريخ التقرير:</strong> '+escHtml(t.report_date||'-')+'</div>'+
            '<div><strong>الحالة:</strong> '+escHtml(tripStatusLabel(t.status||'draft'))+'</div>'+
            '<div><strong>عدد الحجاج المرتبطين:</strong> '+escHtml(t.pilgrims_count==null?'-':t.pilgrims_count)+'</div>'+
          '</div>'+
        '</div>'+
        '<div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end">'+tripStatusChip(t.status||'draft')+renderTripActions(opts.mode,t)+'</div>'+
      '</div>'+
    '</div>';
  }).join('');
}

async function loadWorkerTrips(){
  initWorkerTripDate();
  var date=workerTripValue('wtrip-report-date');
  var url='/trips/list'+(date?'?date='+encodeURIComponent(date):'');
  try{
    var r=await fetch(url);
    var d=await r.json();
    renderTripManageListShared({
      hostId:'wtrip-manage-list',
      trips:(d.ok&&d.trips)||[],
      mode:'worker',
      emptyText:'لا توجد رحلات لهذا التاريخ',
      assignSelectId:'wtrip-assign-trip-id',
      assignPanelId:'wtrip-assign-panel'
    });
  }catch(e){
    renderTripManageListShared({
      hostId:'wtrip-manage-list',
      trips:[],
      mode:'worker',
      emptyText:'تعذر تحميل الرحلات',
      assignSelectId:'wtrip-assign-trip-id',
      assignPanelId:'wtrip-assign-panel'
    });
  }
}

function appendTripFormFields(data, prefix){
  data.append('report_date', workerTripValue(prefix+'report-date'));
  data.append('hotel_name', workerTripValue(prefix+'hotel-name'));
  data.append('location_url', workerTripValue(prefix+'location-url'));
  data.append('nationality', workerTripValue(prefix+'nationality'));
  data.append('flight_no', workerTripValue(prefix+'flight-no'));
  data.append('carrier', workerTripValue(prefix+'carrier'));
  data.append('destination', workerTripValue(prefix+'destination'));
  data.append('approval_no', workerTripValue(prefix+'approval-no'));
  data.append('departure_time', workerTripValue(prefix+'departure-time'));
  data.append('housing_contract_no', workerTripValue(prefix+'housing-contract-no'));
  data.append('bus_stand_time', workerTripValue(prefix+'bus-stand-time'));
  data.append('bus_departure_time', workerTripValue(prefix+'bus-departure-time'));
  data.append('planned_pilgrim_count', workerTripValue(prefix+'planned-pilgrim-count'));
  data.append('bus_count', workerTripValue(prefix+'bus-count'));
  data.append('notes', workerTripValue(prefix+'notes'));
}

async function createWorkerTrip(){
  var data=new URLSearchParams();
  data.append('id','TRIP-'+new Date().toISOString().replace(/\D/g,'').slice(0,14));
  appendTripFormFields(data,'wtrip-');
  if(!workerTripValue('wtrip-report-date')) data.set('report_date', new Date().toISOString().slice(0,10));
  var r=await fetch('/trips/create',{
    method:'POST',
    headers:{'Content-Type':'application/x-www-form-urlencoded'},
    body:data.toString()
  }).then(function(x){return x.json();}).catch(function(){return {ok:false,error:'تعذر إنشاء الرحلة'};});
  if(r.ok){
    toast('تم إنشاء الرحلة');
    workerTripFormIds().forEach(function(id){
      var el=document.getElementById(id);
      if(el) el.value='';
    });
    loadWorkerTrips();
  }else{
    toast(r.error||'تعذر إنشاء الرحلة',true);
  }
}

async function assignWorkerTripPassports(){
  var tripId=workerTripValue('wtrip-assign-trip-id');
  var raw=workerTripValue('wtrip-assign-passports');
  if(!tripId){toast('اختر الرحلة أولاً',true);return;}
  if(!raw){toast('أدخل أرقام الجوازات',true);return;}
  var passports=raw.split(/[\s,;\n\r]+/).filter(Boolean).join(',');
  var data=new URLSearchParams();
  data.append('trip_id',tripId);
  data.append('passports',passports);
  var r=await fetch('/trips/assign',{
    method:'POST',
    headers:{'Content-Type':'application/x-www-form-urlencoded'},
    body:data.toString()
  }).then(function(x){return x.json();}).catch(function(){return {ok:false,error:'تعذر ربط الجوازات'};});
  if(r.ok){
    toast('تم ربط '+(r.updated||0)+' جواز');
    var el=document.getElementById('wtrip-assign-passports');
    if(el) el.value='';
    loadWorkerTrips();
  }else{
    toast(r.error||'تعذر ربط الجوازات',true);
  }
}

function copyGroupOptionsToEdit(){
  var source=document.getElementById('trip-group-id');
  var target=document.getElementById('trip-edit-group-id');
  if(source && target) target.innerHTML=source.innerHTML;
}

function fillTripEditForm(trip, mode){
  document.getElementById('trip-edit-mode').value=mode;
  document.getElementById('trip-edit-id').value=trip.id||'';
  document.getElementById('trip-edit-group-wrap').style.display=mode==='admin'?'block':'none';
  if(mode==='admin'){
    copyGroupOptionsToEdit();
    document.getElementById('trip-edit-group-id').value=trip.group_id||'';
  }
  TRIP_EDIT_FIELDS.forEach(function(field){
    var el=document.getElementById('trip-edit-'+field.replace(/_/g,'-'));
    if(el) el.value=trip[field]==null?'':trip[field];
  });
  document.getElementById('m-trip-edit').classList.add('open');
}

function openAdminTripEdit(tripId){
  var trip=getTripCache('admin')[tripId];
  if(trip) fillTripEditForm(trip,'admin');
}

function openWorkerTripEdit(tripId){
  var trip=getTripCache('worker')[tripId];
  if(trip) fillTripEditForm(trip,'worker');
}

function buildTripUpdatePayload(mode){
  var data=new URLSearchParams();
  data.append('trip_id', document.getElementById('trip-edit-id').value);
  if(mode==='admin'){
    data.append('group_id', workerTripValue('trip-edit-group-id'));
  }
  TRIP_EDIT_FIELDS.forEach(function(field){
    var el=document.getElementById('trip-edit-'+field.replace(/_/g,'-'));
    data.append(field, el ? el.value : '');
  });
  return data;
}

async function updateAdminTrip(){
  var data=buildTripUpdatePayload('admin');
  var r=await fetch('/trips/update',{
    method:'POST',
    headers:{'Content-Type':'application/x-www-form-urlencoded'},
    body:data.toString()
  }).then(function(x){return x.json();}).catch(function(){return {ok:false,error:'تعذر تحديث الرحلة'};});
  if(r.ok){
    closeDlg('m-trip-edit');
    toast('تم تحديث الرحلة');
    refreshTripSelects();
  }else{
    toast(r.error||'تعذر تحديث الرحلة',true);
  }
}

async function updateWorkerTrip(){
  var data=buildTripUpdatePayload('worker');
  var r=await fetch('/trips/update',{
    method:'POST',
    headers:{'Content-Type':'application/x-www-form-urlencoded'},
    body:data.toString()
  }).then(function(x){return x.json();}).catch(function(){return {ok:false,error:'تعذر تحديث الرحلة'};});
  if(r.ok){
    closeDlg('m-trip-edit');
    toast('تم تحديث الرحلة');
    loadWorkerTrips();
  }else{
    toast(r.error||'تعذر تحديث الرحلة',true);
  }
}

function submitTripEdit(){
  if(document.getElementById('trip-edit-mode').value==='admin') return updateAdminTrip();
  return updateWorkerTrip();
}

async function confirmTripByMode(mode, tripId){
  var r=await fetch('/trips/update-status',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({trip_id:tripId,status:'confirmed'})
  }).then(function(x){return x.json();}).catch(function(){return {ok:false,error:'تعذر تأكيد الرحلة'};});
  if(r.ok){
    toast('تم تأكيد الرحلة');
    if(mode==='admin') refreshTripSelects();
    else loadWorkerTrips();
  }else{
    toast(r.error||'تعذر تأكيد الرحلة',true);
  }
}

function confirmAdminTrip(tripId){ return confirmTripByMode('admin',tripId); }
function confirmWorkerTrip(tripId){ return confirmTripByMode('worker',tripId); }
function focusAdminTripAssign(tripId){ focusTripAssign('admin',tripId); }
function focusWorkerTripAssign(tripId){ focusTripAssign('worker',tripId); }

function downloadTripReportFromTrip(mode, tripId){
  var trip=getTripCache(mode)[tripId];
  if(!trip) return;
  var url='/trips/daily-report?date='+encodeURIComponent(trip.report_date||'');
  if(trip.group_id) url+='&gid='+encodeURIComponent(trip.group_id);
  window.location.href=url;
}

function downloadAdminTripReport(tripId){ downloadTripReportFromTrip('admin',tripId); }
function downloadWorkerTripRowReport(tripId){ downloadTripReportFromTrip('worker',tripId); }

function downloadWorkerTripReport(){
  initWorkerTripDate();
  var date=workerTripValue('wtrip-report-date');
  var url='/trips/daily-report'+(date?'?date='+encodeURIComponent(date):'');
  window.location.href=url;
}

async function openTripReviewByMode(mode, tripId){
  var r=await fetch('/trips/details?trip_id='+encodeURIComponent(tripId))
    .then(function(x){return x.json();})
    .catch(function(){return {ok:false,error:'تعذر تحميل بيانات الرحلة'};});
  if(!r.ok){ toast(r.error||'تعذر تحميل بيانات الرحلة',true); return; }
  var trip=r.trip||{};
  document.getElementById('trip-review-mode').value=mode;
  document.getElementById('trip-review-id').value=tripId;
  document.getElementById('trip-review-info').innerHTML=
    '<strong>رقم الرحلة:</strong> '+escHtml(trip.id||'')+'<br>'+
    '<strong>الفندق:</strong> '+escHtml(trip.hotel_name||'-')+'<br>'+
    '<strong>رقم الرحلة الجوية:</strong> '+escHtml(trip.flight_no||'-')+'<br>'+
    '<strong>الحالة:</strong> '+escHtml(tripStatusLabel(trip.status||'draft'));
  var planned=trip.planned_pilgrim_count;
  var actual=r.actual_count||0;
  document.getElementById('trip-review-counts').innerHTML=
    '<div><strong>المخطط:</strong> '+escHtml(planned==null||planned===''?'-':planned)+'</div>'+
    '<div><strong>الفعلي:</strong> '+escHtml(actual)+'</div>';
  var body=document.getElementById('trip-review-body');
  body.innerHTML=(r.pilgrims||[]).length ? r.pilgrims.map(function(p){
    return '<tr>'+
      '<td>'+escHtml(p.passport||'')+'</td>'+
      '<td>'+escHtml(p.seq_code||'-')+'</td>'+
      '<td>'+escHtml(p.status||'-')+'</td>'+
      '<td>'+(p.departed==='نعم'?'غادر':'لم يغادر')+'</td>'+
    '</tr>';
  }).join('') : '<tr><td colspan="4" style="text-align:center;padding:16px;color:var(--tx3)">لا يوجد حجاج مرتبطون</td></tr>';
  var btn=document.getElementById('trip-review-confirm-btn');
  btn.style.display=trip.status==='confirmed'?'inline-flex':'none';
  document.getElementById('m-trip-review').classList.add('open');
}

function reviewAdminTripDepart(tripId){ return openTripReviewByMode('admin',tripId); }
function reviewWorkerTripDepart(tripId){ return openTripReviewByMode('worker',tripId); }

async function departTripByMode(mode){
  var tripId=document.getElementById('trip-review-id').value;
  var r=await fetch('/trips/depart',{
    method:'POST',
    headers:{'Content-Type':'application/x-www-form-urlencoded'},
    body:'trip_id='+encodeURIComponent(tripId)
  }).then(function(x){return x.json();}).catch(function(){return {ok:false,error:'تعذر تأكيد المغادرة'};});
  if(r.ok){
    closeDlg('m-trip-review');
    toast('تم تأكيد مغادرة الرحلة');
    if(mode==='admin') refreshTripSelects();
    else{
      loadWorker();
    }
  }else{
    toast(r.error||'تعذر تأكيد المغادرة',true);
  }
}

function departWorkerTrip(){ return departTripByMode('worker'); }
function departAdminTrip(){ return departTripByMode('admin'); }
function submitTripDepartReview(){
  if(document.getElementById('trip-review-mode').value==='admin') return departAdminTrip();
  return departWorkerTrip();
}

function exportExcel(){exportGroup('');}
function openOfficeDashboard(gid){
  var groupId = gid || (S && S.role!=='admin' ? S.gid : '');
  var url = '/dashboard' + (groupId ? '?gid=' + encodeURIComponent(groupId) : '');
  window.open(url, '_blank');
}

function printTodayReport(gid){
  var groupId = gid || (S && S.role!=='admin' ? S.gid : '');
  exportTodayReport(groupId);
}

async function openImport(){
  var r=await api('/api/groups');
  if(!r.ok) return;
  var sel=document.getElementById('imp-gid');
  sel.innerHTML=r.groups.map(g=>`<option value="${g.id}">${g.name}</option>`).join('');
  document.getElementById('imp-file').value='';
  document.getElementById('imp-res').style.display='none';
  document.getElementById('m-import').classList.add('open');
}
async function doImport(){
  var gid=document.getElementById('imp-gid').value;
  var file=document.getElementById('imp-file').files[0];
  var res=document.getElementById('imp-res');
  if(!file){toast('اختر ملف أولاً',true);return;}
  sb('imp-btn','جاري الاستيراد...',true);
  var fd=new FormData(); fd.append('file',file); fd.append('gid',gid);
  var r=await fetch('/api/import',{method:'POST',body:fd}).then(x=>x.json()).catch(()=>({ok:false,msg:'خطأ'}));
  sb('imp-btn',ico('upload',15)+' استيراد',false);
  if(!r.ok){toast(r.msg||'فشل',true);return;}
  var html=`<div style="background:var(--ok-bg);border-radius:var(--r-sm);padding:12px;margin-bottom:8px">
    <strong style="color:var(--ok-tx)">✓ تم استيراد ${r.imported} جواز</strong>
    ${r.skipped?`<span style="color:var(--tx2);font-size:13px"> — تم تخطي ${r.skipped}</span>`:''}
  </div>`;
  if(r.errors&&r.errors.length){
    html+=`<div style="background:var(--err-bg);border-radius:var(--r-sm);padding:12px;max-height:180px;overflow-y:auto">
      <div style="font-size:13px;font-weight:600;color:var(--err-tx);margin-bottom:8px">الأخطاء:</div>`;
    html+=r.errors.map(e=>`<div style="font-size:12px;color:var(--err-tx);padding:3px 0;direction:ltr;border-bottom:1px solid var(--border-l)">
      سطر ${e.row}: <strong>${e.passport}</strong> — ${e.reason}</div>`).join('');
    html+='</div>';
  }
  res.innerHTML=html; res.style.display='block';
  loadAdmin();
}

async function exportGroup(gid){
  var id=gid||'';
  var url='/api/export'+(id?'?gid='+encodeURIComponent(id):'');
  toast('جاري إعداد الملف...');
  try{
    var r=await fetch(url);
    if(!r.ok){
      var ct=r.headers.get('Content-Type')||'';
      var msg=ct.includes('json')
        ?(await r.json().catch(()=>({}))).msg||'خطأ في التصدير'
        :'خطأ في الخادم ('+r.status+')';
      toast(msg,true); return;
    }
    var blob=await r.blob();
    var a=document.createElement('a');
    a.href=URL.createObjectURL(blob);
    var cd=r.headers.get('Content-Disposition')||'';
    var m=cd.match(/filename\*?=(?:UTF-8'')?["']?([^"';\n]+)/i);
    a.download=m?decodeURIComponent(m[1]):(id||'جوازات')+'_export.xlsx';
    document.body.appendChild(a); a.click();
    setTimeout(()=>{document.body.removeChild(a);URL.revokeObjectURL(a.href);},200);
    toast('تم تحميل الملف');
  }catch(e){toast('تعذر التصدير',true);}
}

async function exportTodayReport(gid){
  var id = gid || '';
  var url = '/api/export-today' + (id ? '?gid=' + encodeURIComponent(id) : '');
  toast('جاري إعداد تقرير اليوم...');
  try{
    var r = await fetch(url);
    if(!r.ok){
      var ct = r.headers.get('Content-Type') || '';
      var msg = ct.includes('json')
        ? (await r.json().catch(()=>({}))).msg || 'خطأ في تقرير اليوم'
        : 'خطأ في الخادم ('+r.status+')';
      toast(msg,true); return;
    }
    var blob = await r.blob();
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    var cd = r.headers.get('Content-Disposition') || '';
    var m = cd.match(/filename\*?=(?:UTF-8'')?["']?([^"';\n]+)/i);
    a.download = m ? decodeURIComponent(m[1]) : 'تقرير_اليوم.xlsx';
    document.body.appendChild(a); a.click();
    setTimeout(function(){
      document.body.removeChild(a);
      URL.revokeObjectURL(a.href);
    },200);
    toast('تم تحميل تقرير اليوم');
  }catch(e){
    toast('تعذر إنشاء تقرير اليوم',true);
  }
}

// ── Init ────────────────────────────────────────────────────
(async function(){
  loadLoginGroups();
  var r=await api('/api/session');
  if(r.ok){
    S={role:r.role,name:r.name,gid:r.gid};
    if(r.role==='admin'){loadAdmin();show('s-admin');}
    else{
      document.getElementById('w-group').textContent=r.name;
      document.getElementById('w-user').textContent='الموظف: '+(r.username||'');
      loadWorker();show('s-worker');setTimeout(function(){var e=document.getElementById('w-srch');if(e)e.focus();},80);
    }
    setInterval(function(){
      if(!S || document.visibilityState!=='visible') return;
      if(S.role==='admin' && curTab==='ov') loadAdmin();
      else if(S.role!=='admin') loadWorker();
    }, 90000);
  }
})();

// ── Shutdown ─────────────────────────────────────────────────

async function shutdownServer(){
  if(!confirm('إيقاف الخادم؟ سيتوقف النظام عن العمل.')) return;
  await api('/api/shutdown',{method:'POST'});
  document.body.innerHTML='<div style="display:flex;align-items:center;justify-content:center;height:100vh;color:var(--tx);font-size:18px;font-weight:700">تم إيقاف الخادم ✓</div>';
}

function openResetSeason(){
  document.getElementById('reset-pw').value='';
  const err=document.getElementById('reset-err');
  err.style.display='none';
  document.getElementById('modal-reset').classList.add('open');
  setTimeout(()=>document.getElementById('reset-pw').focus(),100);
}
function closeResetModal(){
  document.getElementById('modal-reset').classList.remove('open');
}
async function confirmResetSeason(){
  const pw=document.getElementById('reset-pw').value.trim();
  const err=document.getElementById('reset-err');
  if(!pw){err.textContent='أدخل كلمة السر';err.style.display='block';return;}
  const r=await api('/api/reset-season',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password:pw})});
  if(!r.ok){err.textContent=r.error||'كلمة السر غلط';err.style.display='block';return;}
  closeResetModal();
  toast('تم مسح البيانات — جاهز لموسم جديد ✓');
  setTimeout(()=>location.reload(),1500);
}

// ── Bulk Departure ────────────────────────────────────────────

function bulkPasteHandler(e){
  var text=e.clipboardData.getData('text');
  var parts=text.toUpperCase().split(/[\s,;\r\n]+/).filter(function(p){return /^[A-Z][A-Z0-9]{3,}$/.test(p);});
  if(!parts.length) return;
  e.preventDefault();
  document.getElementById('bulk-inp').value='';
  parts.forEach(function(p){bulkAdd(p);});
}

function openBulkDepart(){
  bulkList=[];
  renderBulkList();
  show('s-bulk');
  setTimeout(function(){var el=document.getElementById('bulk-inp');if(el)el.focus();},100);
}

function closeBulkDepart(){
  bulkList=[];
  show('s-worker');
}

async function bulkAdd(val){
  val=val.trim().toUpperCase();
  if(!val) return;
  if(bulkList.find(function(x){return x.passport===val;})){
    bulkList.push({passport:val,status:'err',msg:'مكرر في القائمة'});
    renderBulkList(); return;
  }
  bulkList.push({passport:val,status:'checking',msg:'جاري التحقق...'});
  renderBulkList();
  var r=await api('/api/search?passport='+encodeURIComponent(val));
  var idx=bulkList.findIndex(function(x){return x.passport===val&&x.status==='checking';});
  if(idx===-1) return;
  if(!r.ok){
    bulkList[idx]={passport:val,status:'err',msg:r.msg};
  } else if(r.departed==='نعم'){
    bulkList[idx]={passport:val,status:'err',msg:'غادر في '+escHtml(r.departed_at||'')};
  } else if(S.role!=='admin'&&!r.can_act){
    bulkList[idx]={passport:val,status:'err',msg:'مجموعة أخرى — غير مصرح'};
  } else {
    bulkList[idx]={passport:val,status:'ok',msg:r.group_name||''};
  }
  renderBulkList();
}

function bulkRemove(passport){
  bulkList=bulkList.filter(function(x){return x.passport!==passport;});
  renderBulkList();
}

function renderBulkList(){
  var validCount=bulkList.filter(function(x){return x.status==='ok';}).length;
  var html=bulkList.map(function(item){
    var color=item.status==='ok'?'var(--ok-tx)':item.status==='checking'?'var(--tx2)':'var(--err-tx)';
    var icon=item.status==='ok'?ico('check',14):item.status==='checking'?ico('clock',14):ico('xCircle',14);
    return '<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border-l)">'
      +'<span style="direction:ltr;font-weight:600;color:var(--tx)">'+escHtml(item.passport)+'</span>'
      +'<span style="font-size:12px;color:'+color+';flex:1;text-align:center">'+icon+' '+escHtml(item.msg)+'</span>'
      +'<button onclick="bulkRemove(\''+escHtml(item.passport)+'\')" style="background:none;border:none;color:var(--tx3);cursor:pointer;font-size:14px">✕</button>'
      +'</div>';
  }).join('');
  document.getElementById('bulk-list').innerHTML=html||'<div style="text-align:center;color:var(--tx3);padding:16px;font-size:13px">لا يوجد جوازات — أدخل رقم الجواز</div>';
  var countEl=document.getElementById('bulk-count');
  var navEl=document.getElementById('bulk-nav-count');
  if(bulkList.length>0){
    var txt=bulkList.length+' جواز ('+validCount+' صحيح، '+(bulkList.length-validCount)+' خطأ)';
    countEl.textContent=txt;
    if(navEl) navEl.textContent=bulkList.length+' جواز';
  } else {
    countEl.textContent='';
    if(navEl) navEl.textContent='';
  }
  document.getElementById('bulk-confirm-btn').disabled=validCount===0;
}

async function confirmBulkDepart(){
  var valid=bulkList.filter(function(x){return x.status==='ok';});
  if(valid.length===0) return;
  if(!confirm('تأكيد مغادرة '+valid.length+' حاج؟')) return;
  var btn=document.getElementById('bulk-confirm-btn');
  btn.disabled=true; btn.textContent='جاري التسجيل...';
  var success=0, failed=[];
  var batchId='B'+new Date().toISOString().replace(/\D/g,'').slice(0,14);
  for(var i=0;i<valid.length;i++){
    var r=await api('/api/depart',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({passport:valid[i].passport,batch_id:batchId})});
    if(r.ok) success++;
    else failed.push(valid[i].passport);
  }
  bulkList=[];
  renderBulkList();
  btn.disabled=false; btn.innerHTML=ico('plane',15)+' تأكيد المغادرة';
  var msg='غادر '+success+' حاج بنجاح';
  if(failed.length>0) msg+=' — فشل '+failed.length+': '+failed.join(', ');
  toast(msg, failed.length>0);
  loadWorker();
}
