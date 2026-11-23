
export function initDemo(cfg) {
'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const D=ms=>RM?Math.round(ms*.35):ms;
const wait=ms=>new Promise(r=>setTimeout(r,D(ms)));
const anim=(el,kf,o)=>el.animate(kf,Object.assign({fill:'forwards'},o,{duration:D(o.duration)})).finished;
const rand=(a,b)=>a+Math.random()*(b-a);

/* ---------- details (supplied by the React app) ---------- */
const IMG=cfg.IMG, WEDDING=cfg.WEDDING_MS;

/* ---------- images & links ---------- */
$$('[data-img]').forEach(el=>{const s=IMG[el.dataset.img]; if(s){el.decoding='async'; el.src=s;}});
if('IntersectionObserver' in window){const vo=new IntersectionObserver(es=>{for(const e of es)e.target.classList.toggle('off',!e.isIntersecting);},{rootMargin:'120px 0px'});$$('#site>section').forEach(el=>vo.observe(el));}
$('#mapCard').href=cfg.MAPS_URL; $('#mapBtn').href=cfg.MAPS_URL; $('#dirBtn').href=cfg.DIR_URL;
$('#calBtn').href=cfg.CALENDAR_URL;

/* ---------- generated ornaments ---------- */
function blob(cx,cy,r,n,amp,seed){const p=[];for(let i=0;i<n;i++){const a=i/n*Math.PI*2,rr=r+amp*(Math.sin(a*3+seed)*.6+Math.sin(a*7+seed*2.3)*.4);p.push([cx+rr*Math.cos(a),cy+rr*Math.sin(a)]);}
  const m=(a,b)=>[((a[0]+b[0])/2).toFixed(2),((a[1]+b[1])/2).toFixed(2)];let d=`M${m(p[n-1],p[0])}`;for(let i=0;i<n;i++){const q=p[i],nx=p[(i+1)%n];d+=` Q${q[0].toFixed(2)},${q[1].toFixed(2)} ${m(q,nx)}`;}return d+'Z';}
const B=blob(50,50,45,30,2.4,1.7);
const SEAL=`<svg viewBox="0 0 100 100" aria-hidden="true"><path d="${B}" fill="url(#gWax)"/><path d="${B}" fill="none" stroke="#3A0816" stroke-opacity=".35" stroke-width="1.2"/><circle cx="50" cy="50" r="33" fill="none" stroke="#3A0816" stroke-opacity=".45" stroke-width="2.4"/><circle cx="50" cy="51.3" r="33" fill="none" stroke="#C2577A" stroke-opacity=".42" stroke-width="1"/><circle cx="50" cy="50" r="28.5" fill="none" stroke="url(#gGold)" stroke-width=".9" stroke-dasharray="1.2 2.4"/><text x="50" y="59" text-anchor="middle" font-family="Pinyon Script, Great Vibes, cursive" font-size="27" fill="url(#gGold)">${cfg.MONO_A}<tspan font-size="17" dy="-3">&amp;</tspan><tspan dy="3">${cfg.MONO_B}</tspan></text><ellipse cx="35" cy="27" rx="15" ry="6" fill="#fff" opacity=".14" transform="rotate(-32 35 27)"/></svg>`;
$$('.seal-half').forEach(h=>h.innerHTML=SEAL);

function stampPath(w,h,r,step){let d='M0,0';
  for(let x=step/2;x<w;x+=step)d+=` L${x-r},0 A${r},${r} 0 0 0 ${x+r},0`;d+=` L${w},0`;
  for(let y=step/2;y<h;y+=step)d+=` L${w},${y-r} A${r},${r} 0 0 0 ${w},${y+r}`;d+=` L${w},${h}`;
  for(let x=w-step/2;x>0;x-=step)d+=` L${x+r},${h} A${r},${r} 0 0 0 ${x-r},${h}`;d+=` L0,${h}`;
  for(let y=h-step/2;y>0;y-=step)d+=` L0,${y+r} A${r},${r} 0 0 0 0,${y-r}`;return d+' Z';}
$('#stamp').innerHTML=`<defs><clipPath id="cStamp"><path d="${stampPath(70,84,2.2,7)}"/></clipPath><clipPath id="cStampImg"><rect x="7" y="7" width="56" height="58"/></clipPath></defs><g clip-path="url(#cStamp)"><rect width="70" height="84" fill="#FFFBF6"/><image href="${IMG.stamp}" x="7" y="7" width="56" height="58" preserveAspectRatio="xMidYMid slice" clip-path="url(#cStampImg)"/><rect x="7" y="7" width="56" height="58" fill="none" stroke="#C9A15B" stroke-width=".7"/><text x="35" y="76.5" text-anchor="middle" font-family="Cormorant Garamond, Georgia, serif" font-style="italic" font-weight="600" font-size="8" fill="#6E1630">for keeps</text></g>`;

(function mandala(){let s='<svg viewBox="-100 -100 200 200" fill="none" stroke="currentColor" stroke-width=".35">';
  s+='<circle r="98"/><circle r="94.5" stroke-dasharray="1 2.2"/><circle r="60"/><circle r="30"/><circle r="22" stroke-dasharray=".6 1.6"/>';
  for(let i=0;i<24;i++)s+=`<path transform="rotate(${i*15})" d="M0,-60C10,-70 10,-84 0,-92C-10,-84 -10,-70 0,-60Z"/><path transform="rotate(${i*15+7.5})" d="M0,-62C4,-68 4,-74 0,-80C-4,-74 -4,-68 0,-62Z"/>`;
  for(let i=0;i<16;i++)s+=`<path transform="rotate(${i*22.5})" d="M0,-30C7,-38 7,-50 0,-58C-7,-50 -7,-38 0,-30Z"/>`;
  for(let i=0;i<48;i++)s+=`<circle transform="rotate(${i*7.5})" cx="0" cy="-96.5" r="1"/>`;
  for(let i=0;i<12;i++)s+=`<path transform="rotate(${i*30})" d="M0,-21L5,-29L0,-27L-5,-29Z"/>`;
  $('#mandala').innerHTML=s+'</svg>';})();

const CORNER='<svg viewBox="0 0 58 58" fill="none" stroke="currentColor" stroke-linecap="round" aria-hidden="true"><path pathLength="1" stroke-width="1" d="M2 56V20C2 10 10 2 20 2H56"/><path pathLength="1" stroke-width=".6" d="M8 56V23c0-8.3 6.7-15 15-15h33"/><path pathLength="1" stroke-width=".8" d="M15 31c0-9 7-16 16-16"/><circle pathLength="1" cx="14" cy="14" r="3" stroke-width=".8"/><path pathLength="1" stroke-width=".7" d="M2 21c6 0 9.5-3.5 9.5-9.5M21 2c0 6-3.5 9.5-9.5 9.5"/></svg>';
$$('.corner').forEach(c=>c.innerHTML=CORNER);

/* ---------- particles ---------- */
function makeSprite(){const c=document.createElement('canvas');c.width=c.height=64;const g=c.getContext('2d');const gr=g.createRadialGradient(32,32,0,32,32,32);gr.addColorStop(0,'rgba(255,250,232,1)');gr.addColorStop(.22,'rgba(240,210,140,.85)');gr.addColorStop(.5,'rgba(214,170,90,.25)');gr.addColorStop(1,'rgba(201,161,91,0)');g.fillStyle=gr;g.fillRect(0,0,64,64);return c;}
const GLOW=makeSprite();
const PETALS=['#E8B4C0','#F4D4DB','#D9A867','#B5475F','#F7E3CB','#9E2D49'];
const CONF=['#C9A15B','#EBD6A6','#6E1630','#E8B4C0','#FFF4E6'];
class FX{
  constructor(c){this.c=c;this.g=c.getContext('2d');this.ps=[];this.ambient=null;this.on=false;this.raf=0;this.resize();
    if('ResizeObserver' in window)new ResizeObserver(()=>this.resize()).observe(c);else addEventListener('resize',()=>this.resize());}
  resize(){const r=this.c.getBoundingClientRect();this.w=r.width;this.h=r.height;this.dpr=Math.min(window.devicePixelRatio||1,2);this.c.width=Math.max(1,Math.round(r.width*this.dpr));this.c.height=Math.max(1,Math.round(r.height*this.dpr));this.g.setTransform(this.dpr,0,0,this.dpr,0,0);}
  run(){if(this.raf)return;let last=performance.now();const step=t=>{const dt=Math.min(.05,(t-last)/1000);last=t;this.frame(dt);
      if(this.ps.length||(this.ambient&&this.on))this.raf=requestAnimationFrame(step);else{this.raf=0;this.g.clearRect(0,0,this.w,this.h);}};
    this.raf=requestAnimationFrame(step);}
  frame(dt){const g=this.g;g.clearRect(0,0,this.w,this.h);if(this.ambient&&this.on)this.ambient(dt);
    for(let i=this.ps.length-1;i>=0;i--){const p=this.ps[i];p.age+=dt;if(p.age>=p.life||p.y>this.h+60||p.x<-120||p.x>this.w+120){this.ps.splice(i,1);continue;}this.draw(p,dt);}g.globalAlpha=1;}
  draw(p,dt){const g=this.g,k=p.age/p.life,f=Math.exp(-p.drag*dt);
    p.vx*=f;p.vy*=f;p.vy+=p.grav*dt;if(p.term&&p.vy>p.term)p.vy=p.term;
    if(p.type==='glow'){p.x+=p.vx*dt;p.y+=p.vy*dt;
      const tw=p.tw?(.5+.5*Math.sin(p.age*p.tw+p.ph)):1;g.globalAlpha=Math.max(0,p.alpha*tw*Math.min(1,p.age*3)*(1-k*k));
      const s=p.r*7*(p.shrink?(1-k*.6):1);g.drawImage(GLOW,p.x-s/2,p.y-s/2,s,s);return;}
    p.ph+=dt*p.sw;p.x+=p.vx*dt+Math.sin(p.ph)*p.amp*dt;p.y+=p.vy*dt;p.rot+=p.vr*dt;
    g.save();g.translate(p.x,p.y);g.rotate(p.rot);g.scale(1,Math.max(.18,Math.abs(Math.cos(p.ph*1.25))));
    g.globalAlpha=Math.max(0,Math.min(1,(1-k)*3)*p.alpha*Math.min(1,p.age*5));g.fillStyle=p.color;
    if(p.type==='petal'){const s=p.s;g.beginPath();g.moveTo(0,-s);g.bezierCurveTo(s*.95,-s*.55,s*.7,s*.75,0,s);g.bezierCurveTo(-s*.7,s*.75,-s*.95,-s*.55,0,-s);g.fill();}
    else g.fillRect(-p.s/2,-p.s/4,p.s,p.s/2);
    g.restore();}
  burst(x,y,o={}){const n=RM?Math.min(10,o.sparks??60):(o.sparks??60);
    for(let i=0;i<n;i++){const a=Math.random()*Math.PI*2,sp=(o.speed??260)*rand(.25,1.1);this.ps.push({type:'glow',x,y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp-(o.lift??40),drag:2.6,grav:o.grav??80,r:rand(.8,2.4),alpha:1,life:rand(.9,2),age:0,shrink:true});}
    const m=RM?0:(o.petals??0);for(let i=0;i<m;i++){const a=-Math.PI/2+rand(-.75,.75)*Math.PI,sp=(o.pspeed??340)*rand(.35,1.1);this.ps.push(petal(x,y,Math.cos(a)*sp,Math.sin(a)*sp));}
    const c=RM?0:(o.confetti??0);for(let i=0;i<c;i++){const a=-Math.PI/2+rand(-.6,.6)*Math.PI,sp=rand(260,620);this.ps.push({type:'conf',x,y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,drag:1.6,grav:300,term:150,ph:rand(0,6),sw:rand(4,9),amp:rand(10,40),rot:rand(0,6),vr:rand(-6,6),s:rand(7,12),color:CONF[Math.random()*CONF.length|0],alpha:1,life:rand(3,4.5),age:0});}
    this.run();}
}
function petal(x,y,vx,vy,o={}){return{type:'petal',x,y,vx,vy,drag:o.drag??1.5,grav:o.grav??130,term:o.term??70,ph:rand(0,6),sw:rand(1.4,3),amp:rand(25,60),rot:rand(0,6),vr:rand(-2,2),s:rand(5,9.5),color:PETALS[Math.random()*PETALS.length|0],alpha:o.alpha??.95,life:o.life??rand(6,9),age:0};}

const introFX=new FX($('#introFx'));
const heroFX=new FX($('#heroFx'));
const fxCanvas=document.createElement('canvas');fxCanvas.setAttribute('aria-hidden','true');fxCanvas.style.cssText='position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:44';document.body.appendChild(fxCanvas);
const topFX=new FX(fxCanvas);

if(!RM){
  let seeded=false;
  introFX.ambient=()=>{let n=0;for(const p of introFX.ps)if(p.dust)n++;
    while(n<54){introFX.ps.push({type:'glow',dust:true,x:rand(0,introFX.w),y:seeded?introFX.h+10:rand(0,introFX.h),vx:rand(-6,6),vy:rand(-26,-8),drag:0,grav:0,r:rand(.5,1.7),alpha:rand(.3,.8),tw:rand(1,3),ph:rand(0,6),life:rand(9,16),age:seeded?0:rand(0,4)});n++;}seeded=true;};
  introFX.on=true;introFX.run();
  let acc=0;heroFX.ambient=dt=>{acc+=dt;let n=0;for(const p of heroFX.ps)if(p.type==='petal')n++;
    if(acc>1.5&&n<9){acc=0;heroFX.ps.push(petal(rand(0,heroFX.w),-14,rand(-12,12),20,{term:rand(32,52),grav:30,drag:.4,life:30,alpha:.85}));}};
}

/* ---------- sound ---------- */
const Sound={ctx:null,on:true,started:false,
  init(){if(this.ctx)return true;const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return false;try{this.ctx=new AC();}catch(e){return false;}
    const c=this.ctx;this.master=c.createGain();this.master.connect(c.destination);
    const verb=c.createConvolver();verb.buffer=this.impulse(2.8);const wet=c.createGain();wet.gain.value=.34;verb.connect(wet);wet.connect(this.master);
    const lp=c.createBiquadFilter();lp.type='lowpass';lp.frequency.value=5200;lp.connect(this.master);lp.connect(verb);
    this.music=c.createGain();this.music.gain.value=0;this.music.connect(lp);
    this.sfx=c.createGain();this.sfx.gain.value=.55;this.sfx.connect(lp);
    const len=c.sampleRate;this.noise=c.createBuffer(1,len,c.sampleRate);const d=this.noise.getChannelData(0);for(let i=0;i<len;i++)d[i]=Math.random()*2-1;
    document.addEventListener('visibilitychange',()=>{if(!this.ctx)return;if(document.hidden)this.ctx.suspend();else if(this.on)this.ctx.resume();});
    return true;},
  impulse(sec){const c=this.ctx,len=Math.floor(c.sampleRate*sec),b=c.createBuffer(2,len,c.sampleRate);for(let ch=0;ch<2;ch++){const d=b.getChannelData(ch);for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/len,3.4);}return b;},
  tone(midi,t,dur,vel,dest){const c=this.ctx,f=440*Math.pow(2,(midi-69)/12),g=c.createGain();g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vel,t+.006);g.gain.exponentialRampToValueAtTime(.0001,t+dur);g.connect(dest);
    for(const [m,a] of [[1,1],[2,.26],[3.99,.07]]){const o=c.createOscillator();o.type='sine';o.frequency.value=f*m;const og=c.createGain();og.gain.value=a;o.connect(og);og.connect(g);o.start(t);o.stop(t+dur+.05);}},
  ok(){return this.ctx&&this.on;},
  chime(){if(!this.ok())return;const t=this.ctx.currentTime+.02;[86,90,93,98].forEach((m,i)=>this.tone(m,t+i*.085,1.8,.16,this.sfx));},
  noiseHit(t,dur,type,f1,f2,q,vol){const c=this.ctx,s=c.createBufferSource();s.buffer=this.noise;const bp=c.createBiquadFilter();bp.type=type;bp.Q.value=q;bp.frequency.setValueAtTime(f1,t);bp.frequency.exponentialRampToValueAtTime(f2,t+dur);
    const g=c.createGain();g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol,t+Math.min(.04,dur*.3));g.gain.exponentialRampToValueAtTime(.0001,t+dur);s.connect(bp);bp.connect(g);g.connect(this.sfx);s.start(t);s.stop(t+dur+.05);},
  crack(){if(!this.ok())return;const t=this.ctx.currentTime;this.noiseHit(t,.09,'bandpass',2400,1400,1.3,.9);this.noiseHit(t+.03,.07,'bandpass',3200,2000,2,.5);
    const o=this.ctx.createOscillator(),g=this.ctx.createGain();o.frequency.setValueAtTime(160,t);o.frequency.exponentialRampToValueAtTime(60,t+.12);g.gain.setValueAtTime(.35,t);g.gain.exponentialRampToValueAtTime(.0001,t+.14);o.connect(g);g.connect(this.sfx);o.start(t);o.stop(t+.16);},
  swish(dur=.6){if(!this.ok())return;this.noiseHit(this.ctx.currentTime,dur,'bandpass',500,2600,.9,.22);},
  /* background music: your Music.mp3, embedded at the end of this file as <audio id="bgm"> */
  VOL:.7, /* music volume, 0 to 1 */
  bgm(){return document.getElementById('bgm');},
  startMusic(){if(this.started)return;this.started=true;
    const go=()=>{const a=this.bgm();if(!a)return;this.audio=a;a.loop=true;a.volume=0;
      document.addEventListener('visibilitychange',()=>{if(document.hidden)a.pause();else if(this.on)this.play();});
      if(this.on)this.play();};
    if(this.bgm())go();else document.addEventListener('DOMContentLoaded',go,{once:true});},
  play(){const a=this.audio;if(!a)return;const pr=a.play();
    if(pr&&pr.catch)pr.catch(()=>{if(this.retry)return;const evs=['click','touchend','keydown'];this.retry=()=>{evs.forEach(e=>document.removeEventListener(e,this.retry));this.retry=null;if(this.on)this.play();};evs.forEach(e=>document.addEventListener(e,this.retry));});
    this.fade(this.VOL,3);},
  fade(v,sec){const a=this.audio;if(!a)return;cancelAnimationFrame(this.raf);const from=a.volume,t0=performance.now(),ms=sec*1000;
    const step=t=>{const k=Math.min(1,(t-t0)/ms);try{a.volume=from+(v-from)*k;}catch(e){}if(k<1)this.raf=requestAnimationFrame(step);else if(v===0)a.pause();};
    this.raf=requestAnimationFrame(step);},
  toggle(){this.on=!this.on;if(this.on){if(this.ctx)this.ctx.resume();this.play();}else{this.fade(0,.5);if(this.ctx)setTimeout(()=>{if(!this.on)this.ctx.suspend();},600);}return this.on;}
};

/* ---------- envelope sequence ---------- */
const intro=$('#intro'),env=$('#env'),envWrap=$('#envWrap'),stage=$('#stage'),front=$('#envFront'),back=$('#envBack'),seal=$('#seal'),flapWrap=$('#flapWrap'),letter=$('#letter'),panelBot=$('#panelBot'),enterBtn=$('#enterBtn'),site=$('#site'),hero=$('#top');
let opening=false,entered=false,flyer=null;

async function openEnvelope(){
  if(opening)return;opening=true;
  if(Sound.init()){Sound.ctx.resume();Sound.chime();}Sound.startMusic();
  env.setAttribute('aria-disabled','true');env.removeAttribute('tabindex');
  $('#introHint').classList.add('hide');$('#kicker').classList.add('hide');
  envWrap.style.animationPlayState='paused';
  const er=env.getBoundingClientRect();introFX.burst(er.left+er.width/2,er.top+er.height/2,{sparks:26,speed:180,lift:20});

  await anim(env,[{transform:'rotateY(0deg) scale(1)'},{transform:'rotateY(90deg) scale(1.04)'}],{duration:420,easing:'cubic-bezier(.55,0,.85,.35)'});
  front.hidden=true;back.hidden=false;
  await anim(env,[{transform:'rotateY(-90deg) scale(1.04)'},{transform:'rotateY(7deg) scale(1.01)',offset:.72},{transform:'rotateY(0deg) scale(1)'}],{duration:760,easing:'cubic-bezier(.2,.7,.3,1)'});
  env.getAnimations().forEach(a=>a.cancel());

  seal.classList.add('glow');
  await anim(seal,[{transform:'scale(1)'},{transform:'scale(1.12)',offset:.6},{transform:'scale(1.05)'}],{duration:560,easing:'ease-in-out'});
  Sound.crack();
  const sr=seal.getBoundingClientRect();introFX.burst(sr.left+sr.width/2,sr.top+sr.height/2,{sparks:80,speed:240,petals:0});
  const [hl,hr]=$$('.seal-half',seal);
  anim(hl,[{transform:'translate(0,0) rotate(0)',opacity:1},{transform:'translate(-22%,6%) rotate(-14deg)',opacity:1,offset:.22},{transform:'translate(-70%,190%) rotate(-55deg)',opacity:0}],{duration:1000,easing:'cubic-bezier(.45,0,.85,.6)'});
  anim(hr,[{transform:'translate(0,0) rotate(0)',opacity:1},{transform:'translate(22%,6%) rotate(14deg)',opacity:1,offset:.22},{transform:'translate(70%,190%) rotate(55deg)',opacity:0}],{duration:1000,easing:'cubic-bezier(.45,0,.85,.6)'});
  await wait(420);

  Sound.swish(.55);
  await anim(flapWrap,[{transform:'perspective(800px) rotateX(0deg)'},{transform:'perspective(800px) rotateX(90deg)'}],{duration:420,easing:'cubic-bezier(.5,0,.9,.45)'});
  $('#flapOut').setAttribute('opacity','0');$('#flapIn').setAttribute('opacity','1');flapWrap.classList.add('open');
  await anim(flapWrap,[{transform:'perspective(800px) rotateX(90deg)'},{transform:'perspective(800px) rotateX(180deg)'}],{duration:560,easing:'cubic-bezier(.15,.6,.3,1)'});
  seal.style.visibility='hidden';

  await anim(letter,[{transform:'translateY(0)'},{transform:'translateY(-116%)'}],{duration:1150,easing:'cubic-bezier(.4,.05,.25,1)'});

  // lift the letter out of the envelope into a full-screen layer
  const r=letter.getBoundingClientRect(),w=letter.offsetWidth,h=letter.offsetHeight;
  flyer=document.createElement('div');flyer.className='flyer';intro.appendChild(flyer);
  letter.getAnimations().forEach(a=>a.cancel());
  const cx=r.left+r.width/2,top=r.top+(r.height-h)/2;
  Object.assign(letter.style,{left:(cx-w/2)+'px',top:top+'px',width:w+'px',height:h+'px',zIndex:2,transformOrigin:'50% 0'});
  flyer.appendChild(letter);
  const vw=innerWidth,vh=innerHeight;
  const s=Math.min(vw*.92/w,vh*.86/(2*h),2.2);
  const tx=vw/2-cx,ty1=(vh/2-h*s/2)-top,ty2=(vh/2-h*s)-top;
  anim(stage,[{transform:'translateY(0)',opacity:1},{transform:'translateY(55vh) rotate(4deg)',opacity:0}],{duration:1000,easing:'cubic-bezier(.5,0,.9,.5)'});
  await anim(letter,[{transform:'translate(0,0) scale(1) rotate(0deg)'},{transform:`translate(${tx}px,${ty1}px) scale(${s*.92}) rotate(-2deg)`,offset:.7},{transform:`translate(${tx}px,${ty1}px) scale(${s}) rotate(0deg)`}],{duration:1100,easing:'cubic-bezier(.3,.7,.2,1)'});

  Sound.swish(.9);
  anim(letter,[{transform:`translate(${tx}px,${ty1}px) scale(${s})`},{transform:`translate(${tx}px,${ty2}px) scale(${s})`}],{duration:1250,easing:'cubic-bezier(.45,.05,.2,1)'});
  await anim(panelBot,[{transform:'translateZ(1px) rotateX(180deg)'},{transform:'translateZ(1px) rotateX(0deg)'}],{duration:1300,easing:'cubic-bezier(.45,.05,.2,1)'});
  Sound.chime();
  introFX.burst(vw/2,vh/2,{sparks:140,speed:460,petals:40,pspeed:420});
  letter.classList.add('unfolded');
  enterBtn.tabIndex=0;enterBtn.focus({preventScroll:true});
}
env.addEventListener('click',openEnvelope);
env.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openEnvelope();}});

async function enterSite(){
  if(entered)return;entered=true;
  Sound.chime();
  site.inert=false;site.removeAttribute('aria-hidden');
  document.documentElement.classList.remove('locked');window.scrollTo(0,0);
  anim(flyer,[{transform:'scale(1)',opacity:1},{transform:'scale(1.7)',opacity:0}],{duration:1000,easing:'cubic-bezier(.5,0,.8,.4)'});
  setTimeout(startHero,D(250));
  await anim(intro,[{opacity:1},{opacity:0}],{duration:1100,easing:'ease',delay:D(200)});
  introFX.on=false;intro.remove();
  $('#dock').hidden=!(Sound.ctx||Sound.bgm());
}
enterBtn.addEventListener('click',enterSite);

function startHero(){
  setTimeout(startMalas,D(1100));
  hero.classList.add('play');$('#heroTitle').focus({preventScroll:true});
  heroFX.resize();topFX.resize();
  if(!RM){heroFX.on=true;heroFX.run();}
  const io=new IntersectionObserver(es=>{for(const e of es){heroFX.on=e.isIntersecting&&!RM;if(heroFX.on)heroFX.run();}},{threshold:0});io.observe(hero);
}


/* ---------- photo garlands ---------- */
let startMalas=()=>{};
(function malas(){
  const defs=$('.defs defs');
  const pt=(a,r)=>(Math.cos(a)*r).toFixed(2)+','+(Math.sin(a)*r).toFixed(2);
  function ruffle(n,r1,r2,rot=0){let d='M'+pt(rot,r1);for(let i=1;i<=n;i++)d+=` Q${pt(rot+(i-.5)/n*Math.PI*2,r2)} ${pt(rot+i/n*Math.PI*2,r1)}`;return d+'Z';}
  const tex='stroke="rgba(120,45,8,.28)" stroke-width=".5"';
  const marigold=(id,c)=>`<symbol id="${id}" viewBox="-24 -24 48 48"><path d="${ruffle(15,15,21.5)}" fill="rgba(70,25,10,.3)" transform="translate(0 1.8)"/><path d="${ruffle(15,15,21.5)}" fill="${c[0]}" ${tex}/><path d="${ruffle(13,11.5,16.5,.2)}" fill="${c[1]}" ${tex}/><path d="${ruffle(11,7.6,11.6,.1)}" fill="${c[2]}" ${tex}/><circle r="3.6" fill="${c[3]}"/><circle cx="-1.2" cy="-1.2" r="1.1" fill="#fff" opacity=".35"/></symbol>`;
  defs.insertAdjacentHTML('beforeend',marigold('mgO',['#D2611E','#EC8A2B','#F7AF3E','#A9481A'])+marigold('mgY',['#DE941D','#F2B835','#FAD45E','#BD7214'])+
    '<symbol id="rose" viewBox="-24 -24 48 48"><g fill="#5E7D39"><ellipse cx="-13" cy="7" rx="9.5" ry="3.8" transform="rotate(-28 -13 7)"/><ellipse cx="13" cy="7" rx="9.5" ry="3.8" transform="rotate(28 13 7)"/></g><circle cy="1.8" r="13.5" fill="rgba(50,10,15,.3)"/><circle r="13.5" fill="#7C1934"/><g fill="none" stroke="#B4395A" stroke-width="1.5" stroke-linecap="round"><path d="M-9 3a9.5 9.5 0 0 0 16 2"/><path d="M-6.5-4.5a7.5 7.5 0 0 1 13 1"/><path d="M-3 2a4 4 0 0 0 6.5-1 3 3 0 0 0-4.5-3"/></g><circle cx="-4" cy="-6.5" r="2.2" fill="#fff" opacity=".13"/></symbol>');
  const TOP='<svg class="mala-top" viewBox="0 0 40 34"><circle cx="20" cy="6" r="4.2" fill="none" stroke="#B48A45" stroke-width="1.6"/><path d="M18 14 12 31l5-3 2 4 1-18M22 14l6 17-5-3-2 4-1-18" fill="#6A1530"/><path d="M20 13c-6-6-15-5-15 1s9 6 15 0c6 6 15 5 15-1s-9-6-15 0Z" fill="#7C1934" stroke="#C9A15B" stroke-width=".5"/><circle cx="20" cy="13" r="3.3" fill="url(#gGold)"/></svg>';
  const BOW='<svg class="bow" viewBox="0 0 40 22"><path d="M19 11 15 21l4-2 1-8M21 11l4 10-4-2-1-8" fill="#6A1530"/><path d="M20 9c-5-6-14-6-14 0s9 6 14 0c5 6 14 6 14 0s-9-6-14 0Z" fill="#7C1934" stroke="#C9A15B" stroke-width=".6"/><circle cx="20" cy="9.5" r="2.7" fill="url(#gGold)"/></svg>';
  const TASSEL='<svg viewBox="0 0 24 64"><path d="M12 0v8" stroke="#B48A45" stroke-width="1.2"/><circle cx="12" cy="10" r="3.6" fill="url(#gGold)"/><path d="M6 22a6 7 0 0 1 12 0Z" fill="url(#gGold)"/><path d="M5 22h14" stroke="#9E722F" stroke-width="1.2"/><circle cx="12" cy="24.6" r="1.5" fill="#9E722F"/><path d="M9 27h6l2 5H7Z" fill="#7C1934"/><g stroke-width="1.1" stroke-linecap="round" fill="none"><path d="M8 32 7 60M10 32l-.4 30M12 32v31M14 32l.4 30M16 32l1 28" stroke="#7C1934"/><path d="M9 32l-.8 26M11 32l-.2 31M13 32l.2 31M15 32l.8 28" stroke="#D9B572"/></g></svg>';
  const SIDES=[['left',['c0','c1','c2','c3']],['right',['c4','c5','c6','c7']]];
  const wrap=document.createElement('div');wrap.className='malas';wrap.setAttribute('aria-hidden','true');
  const sides=SIDES.map(([side,keys],si)=>{const m=document.createElement('div');m.className='mala '+side;
    m.innerHTML=`<div class="mala-body"><span class="mala-thread"></span><div class="flowers"></div>${keys.map(k=>`<div class="charm"><div class="charm-sway" style="--sd:${(3.6+((k.charCodeAt(1)*7)%10)/10).toFixed(1)}s;--sdl:-${(k.charCodeAt(1)%4)*0.9}s"><div class="charm-in">${BOW}<span class="frame"><img src="${IMG[k]}" alt="" decoding="async" draggable="false"></span></div></div></div>`).join('')}<div class="tassel"><div class="tassel-in">${TASSEL}</div></div>${TOP}</div>`;
    wrap.appendChild(m);
    return{si,sign:si?-1:1,body:m.querySelector('.mala-body'),thread:m.querySelector('.mala-thread'),fbox:m.querySelector('.flowers'),charms:$$('.charm',m),tassel:m.querySelector('.tassel'),tin:m.querySelector('.tassel-in'),flowers:[],ys:[],len:0,L0:0,L1:0,shown:-1};});
  document.body.appendChild(wrap);

  const bodies=[];
  sides.forEach(s=>{bodies.push({el:s.body,th:0,w:0,k:5,c:2.2,gain:.006,sign:s.sign});
    s.charms.forEach(c=>{const b={el:c,th:0,w:0,k:28,c:2.6,gain:.15,sign:s.sign};c._b=b;bodies.push(b);});
    bodies.push({el:s.tin,th:0,w:0,k:36,c:3,gain:.12,sign:s.sign});});

  let cw=40,fs=25,pitch=20,chH=50,y0=14,gw=0,gh=0,started=false;
  let threadH=1;
  function geo(){gw=innerWidth;gh=innerHeight;threadH=sides[0].thread.parentNode.offsetHeight||gh;cw=sides[0].charms[0].offsetWidth||40;fs=cw*.62;pitch=fs*.78;chH=cw*1.25;y0=cw*.4;
    const T=Math.max(70,gh*.11),B=gh-(gw<600?132:120),step=Math.max(chH+12,(B-chH-T)/3.5);
    wrap.classList.add('instant');
    for(const s of sides){s.ys=s.charms.map((c,k)=>T+(k+s.si*.5)*step);s.charms.forEach((c,k)=>c.style.top=s.ys[k]+'px');
      s.L0=s.ys[0]+chH+pitch*.5;s.L1=s.ys[3]+chH+pitch*.5;
      const n=Math.ceil((s.L1-y0)/pitch)+1,pat=['mgO','mgY','mgO','mgY','rose'];s.fbox.textContent='';s.flowers=[];
      for(let i=0;i<n;i++){const f=document.createElementNS('http://www.w3.org/2000/svg','svg');f.setAttribute('class','fl');f.setAttribute('viewBox','0 0 48 48');
        f.innerHTML=`<use href="#${pat[(i+s.si*2)%5]}"/>`;f.style.top=(y0+i*pitch-fs/2)+'px';f.style.setProperty('--r',Math.round(rand(-40,40))+'deg');s.fbox.appendChild(f);s.flowers.push(f);}
      s.shown=-1;if(started)apply(s);}
    requestAnimationFrame(()=>requestAnimationFrame(()=>wrap.classList.remove('instant')));}
  function apply(s){s.thread.style.transform=`scaleY(${(s.len/threadH).toFixed(4)})`;s.tassel.style.transform=`translate3d(0,${s.len.toFixed(1)}px,0)`;
    const cnt=Math.max(0,Math.min(s.flowers.length,Math.floor((s.len-y0)/pitch)+1));
    if(cnt!==s.shown){s.flowers.forEach((f,i)=>f.classList.toggle('on',i<cnt));s.shown=cnt;}
    s.charms.forEach((c,k)=>{if(!c.classList.contains('on')&&s.len>=s.ys[k]+chH*.3){c.classList.add('on');c._b.w+=s.sign*(RM?0:110);
      if(!RM&&started){setTimeout(()=>{const r=c.getBoundingClientRect();topFX.burst(r.left+r.width/2,r.top+r.height*.4,{sparks:14,speed:120,lift:10,grav:60});},D(500));}}});}

  let pMax=0,lastY=0,sv=0,last=0,intro=0,raf=0,maxScroll=1,quiet=0;
  const measure=()=>{maxScroll=Math.max(1,document.documentElement.scrollHeight-innerHeight);};
  function frame(now){raf=0;const dt=Math.min(.05,last?(now-last)/1000:.016);last=now;
    const y=scrollY,inst=(y-lastY)/Math.max(dt,.001);lastY=y;sv+=(inst-sv)*Math.min(1,dt*9);if(Math.abs(sv)<2)sv=0;
    const p=Math.min(1,y/maxScroll);if(p>pMax)pMax=p;
    intro=Math.min(1,intro+dt/1.4);let busy=intro<1||sv!==0;
    for(const s of sides){const target=(s.L0+Math.min(1,pMax/.88)*(s.L1-s.L0))*(RM?1:1-Math.pow(1-intro,3));const d=target-s.len;
      if(Math.abs(d)>.3){s.len+=RM?d:d*Math.min(1,dt*5);apply(s);busy=true;}}
    if(!RM){for(const b of bodies){const lim=b.k*16,tq=Math.max(-lim,Math.min(lim,b.sign*sv*b.gain));
      const acc=-b.k*b.th-b.c*b.w+tq;b.w+=acc*dt;b.th+=b.w*dt;
      if(Math.abs(b.th)<.02&&Math.abs(b.w)<.05&&!tq){if(b.th!==0){b.th=0;b.w=0;b.el.style.transform='';}continue;}
      busy=true;b.el.style.transform=`rotate(${b.th.toFixed(2)}deg)`;}}
    quiet=busy?0:quiet+1;
    if(quiet<4)raf=requestAnimationFrame(frame);else last=0;}
  const wake=()=>{if(!started||raf)return;lastY=scrollY;last=0;quiet=0;raf=requestAnimationFrame(frame);};
  addEventListener('scroll',wake,{passive:true});
  startMalas=()=>{if(started)return;geo();measure();started=true;lastY=scrollY;wrap.classList.add('show');raf=requestAnimationFrame(frame);
    if('ResizeObserver' in window)new ResizeObserver(()=>{measure();wake();}).observe(document.body);};
  addEventListener('resize',()=>{if(!started)return;measure();if(Math.abs(innerWidth-gw)>2||Math.abs(innerHeight-gh)>140){geo();wake();}});
})();

/* ---------- sound button ---------- */
$('#soundBtn').addEventListener('click',e=>{const on=Sound.toggle();const b=e.currentTarget;b.setAttribute('aria-pressed',String(on));b.setAttribute('aria-label',on?'Pause music':'Play music');});

/* ---------- reveal on scroll ---------- */
const ro=new IntersectionObserver(es=>{for(const e of es)if(e.isIntersecting){e.target.classList.add('in');ro.unobserve(e.target);e.target.dispatchEvent(new CustomEvent('revealed'));}},{threshold:.2,rootMargin:'0px 0px -6% 0px'});
$$('[data-reveal],.ev,.map,#uphill').forEach(el=>ro.observe(el));
$('#uphill').addEventListener('revealed',()=>$$('[data-reveal-wipe]').forEach(e=>e.classList.add('in')));

/* ---------- scratch card ---------- */
(function scratch(){
  const box=$('#scratch'),cv=box.querySelector('canvas'),g=cv.getContext('2d'),hint=$('#scratchHint');
  let w=0,h=0,dpr=1,down=false,last=null,done=false,moves=0;
  function paint(){const r=box.getBoundingClientRect();if(!r.width)return;w=r.width;h=r.height;dpr=Math.min(window.devicePixelRatio||1,2);cv.width=Math.round(w*dpr);cv.height=Math.round(h*dpr);g.setTransform(dpr,0,0,dpr,0,0);
    const gr=g.createLinearGradient(0,0,w,h);gr.addColorStop(0,'#B4863F');gr.addColorStop(.22,'#EBD49E');gr.addColorStop(.45,'#C39850');gr.addColorStop(.68,'#F3E2B2');gr.addColorStop(1,'#A47634');
    g.fillStyle=gr;g.fillRect(0,0,w,h);
    g.save();g.globalAlpha=.07;g.strokeStyle='#4A2F0C';g.lineWidth=1;for(let x=-h;x<w;x+=5){g.beginPath();g.moveTo(x,h);g.lineTo(x+h,0);g.stroke();}g.restore();
    for(let i=0;i<w*h/26;i++){g.fillStyle=`rgba(255,255,255,${Math.random()*.4})`;g.fillRect(Math.random()*w,Math.random()*h,1,1);}
    for(let i=0;i<w*h/60;i++){g.fillStyle=`rgba(90,55,15,${Math.random()*.25})`;g.fillRect(Math.random()*w,Math.random()*h,1,1);}
    g.strokeStyle='rgba(90,55,15,.35)';g.lineWidth=1;g.beginPath();g.roundRect?g.roundRect(11,11,w-22,h-22,11):g.rect(11,11,w-22,h-22);g.stroke();
    g.fillStyle='rgba(84,50,12,.78)';g.textAlign='center';g.textBaseline='middle';
    g.font=`${Math.round(h*.24)}px "Pinyon Script","Great Vibes",cursive`;g.fillText('Our big day',w/2,h*.43);
    g.font=`italic 500 ${Math.round(h*.105)}px "Cormorant Garamond",Georgia,serif`;g.fillText('scratch it',w/2,h*.68);}
  paint();if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>{if(!moves&&!done)paint();});
  let lastW=0;new ResizeObserver(()=>{const W=box.getBoundingClientRect().width;if(Math.abs(W-lastW)>2&&!done&&!moves){lastW=W;paint();}}).observe(box);
  const pt=e=>{const r=cv.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top};};
  function scratchTo(p){g.globalCompositeOperation='destination-out';g.lineCap='round';g.lineJoin='round';g.lineWidth=Math.max(30,w*.1);g.beginPath();g.moveTo(last.x,last.y);g.lineTo(p.x+.01,p.y);g.stroke();g.globalCompositeOperation='source-over';last=p;
    if(++moves%24===0)check();if(!RM&&moves%3===0){const r=cv.getBoundingClientRect();topFX.ps.push({type:'glow',x:r.left+p.x,y:r.top+p.y,vx:rand(-60,60),vy:rand(-90,-20),drag:2,grav:120,r:rand(.6,1.4),alpha:1,life:rand(.5,.9),age:0,shrink:true});topFX.run();}}
  function check(){const d=g.getImageData(0,0,cv.width,cv.height).data;let c=0,t=0;for(let i=3;i<d.length;i+=4*29){t++;if(d[i]<50)c++;}if(c/t>.5)reveal();}
  function reveal(){if(done)return;done=true;cv.classList.add('gone');box.classList.add('done');box.removeAttribute('role');box.setAttribute('aria-label',cfg.SCRATCH_ARIA);
    hint.textContent=cfg.SCRATCH_TEXT;Sound.chime();
    const r=box.getBoundingClientRect();topFX.burst(r.left+r.width/2,r.top+r.height/2,{sparks:90,speed:360,confetti:110});}
  cv.addEventListener('pointerdown',e=>{if(done)return;down=true;cv.setPointerCapture(e.pointerId);last=pt(e);scratchTo(pt(e));});
  cv.addEventListener('pointermove',e=>{if(down&&!done)scratchTo(pt(e));});
  ['pointerup','pointercancel','lostpointercapture'].forEach(t=>cv.addEventListener(t,()=>{if(down){down=false;check();}}));
  box.addEventListener('keydown',e=>{if(!done&&(e.key==='Enter'||e.key===' ')){e.preventDefault();reveal();}});
  if(matchMedia('(hover:hover) and (pointer:fine)').matches)hint.textContent='Scratch the gold with your cursor';
})();

/* ---------- countdown ---------- */
(function countdown(){const els=['#cdD','#cdH','#cdM','#cdS'].map(s=>$(s));let prev=[];
  function tick(){let d=Math.max(0,WEDDING-Date.now());const v=[Math.floor(d/864e5),Math.floor(d/36e5)%24,Math.floor(d/6e4)%60,Math.floor(d/1e3)%60];
    v.forEach((n,i)=>{const s=String(n).padStart(2,'0');if(prev[i]!==s){els[i].textContent=s;if(prev[i]!==undefined&&!RM){els[i].classList.remove('tick');void els[i].offsetWidth;els[i].classList.add('tick');}prev[i]=s;}});
    if(d===0)$('.cd-label').textContent='the celebrations have begun';}
  tick();setInterval(tick,1000);})();

/* ---------- then & now ---------- */
(function compare(){const el=$('#compare'),hd=$('#cmpHandle');let pos=50,drag=false,demo=0;
  const set=p=>{pos=Math.max(0,Math.min(100,p));el.style.setProperty('--pos',pos+'%');hd.setAttribute('aria-valuenow',Math.round(pos));};
  const fromX=x=>{const r=el.getBoundingClientRect();set((x-r.left)/r.width*100);};
  let sx=0,moved=false;
  el.addEventListener('pointerdown',e=>{drag=true;moved=false;sx=e.clientX;cancelAnimationFrame(demo);demo=-1;el.setPointerCapture(e.pointerId);});
  el.addEventListener('pointermove',e=>{if(!drag)return;if(!moved&&Math.abs(e.clientX-sx)>4)moved=true;if(moved)fromX(e.clientX);});
  el.addEventListener('pointerup',e=>{if(drag&&!moved)fromX(e.clientX);drag=false;});
  el.addEventListener('pointercancel',()=>drag=false);
  hd.addEventListener('keydown',e=>{const k={ArrowLeft:-5,ArrowRight:5,ArrowDown:-5,ArrowUp:5}[e.key];if(k){e.preventDefault();set(pos+k);}else if(e.key==='Home'){e.preventDefault();set(0);}else if(e.key==='End'){e.preventDefault();set(100);}});
  el.addEventListener('revealed',()=>{if(RM)return;setTimeout(()=>{if(demo===-1)return;const keys=[50,14,86,50],seg=900;let t0=null;
    const step=t=>{if(demo===-1)return;t0??=t;const el2=(t-t0)/seg,i=Math.floor(el2);if(i>=keys.length-1){set(50);return;}const f=el2-i,e2=f<.5?2*f*f:1-Math.pow(-2*f+2,2)/2;set(keys[i]+(keys[i+1]-keys[i])*e2);demo=requestAnimationFrame(step);};
    demo=requestAnimationFrame(step);},900);});
})();

/* ---------- moments album ---------- */
(function album(){const book=$('#book'),wrap=book.parentNode,leaves=$$('.leaf',book),N=leaves.length,count=$('#albCount'),nextB=$('#albNext'),prevB=$('#albPrev');
  const FT=RM?400:1100,STAG=D(150),AUTO=5000;book.style.setProperty('--ft',FT+'ms');
  let s=0,busy=false,timer=0,inView=false,touched=false,pend=0;
  function stack(){leaves.forEach((l,i)=>{l.style.zIndex=String(i<s?i+1:N-i);});}
  function ui(){count.textContent=s?`${s} / ${N}`:'';nextB.textContent=s===0?'Open album':s===N?'Start again':'Next page';prevB.disabled=s===0;book.classList.toggle('closed',s===0);}
  function schedule(){clearTimeout(timer);if(s>0&&inView&&!document.hidden)timer=setTimeout(()=>go(s===N?1:s+1),AUTO);}
  function go(t){t=Math.max(0,Math.min(N,t));if(busy||t===s)return;busy=true;clearTimeout(timer);
    const fwd=t>s,list=[];if(fwd)for(let i=s;i<t;i++)list.push(i);else for(let i=s-1;i>=t;i--)list.push(i);
    list.forEach((i,k)=>{const l=leaves[i];setTimeout(()=>{l.style.zIndex=String(200+k);l.classList.remove('turn');void l.offsetWidth;l.classList.add('turn');l.classList.toggle('flipped',fwd);},k*STAG);});
    s=t;ui();
    setTimeout(()=>{leaves.forEach(l=>l.classList.remove('turn'));stack();busy=false;if(pend){const d=pend;pend=0;d>0?next():prev();return;}schedule();},FT+(list.length-1)*STAG+60);}
  const next=()=>{touched=true;if(busy){pend=1;return;}go(s===N?1:s+1);},prev=()=>{touched=true;if(busy){pend=-1;return;}go(s-1);};
  stack();ui();
  nextB.addEventListener('click',next);prevB.addEventListener('click',prev);
  book.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();next();}else if(e.key==='ArrowLeft'){e.preventDefault();prev();}});
  let px=0,py=0,pid=null;
  book.addEventListener('pointerdown',e=>{if(e.button>0)return;pid=e.pointerId;px=e.clientX;py=e.clientY;});
  book.addEventListener('pointerup',e=>{if(e.pointerId!==pid)return;pid=null;const dx=e.clientX-px,dy=e.clientY-py;
    if(Math.abs(dx)>40&&Math.abs(dx)>Math.abs(dy)){dx<0?next():(s>1&&prev());return;}
    if(Math.abs(dx)<10&&Math.abs(dy)<10){const r=book.getBoundingClientRect();if(s===0||e.clientX>r.left+r.width/2)next();else if(s>1)prev();}});
  book.addEventListener('pointercancel',()=>pid=null);
  wrap.addEventListener('revealed',()=>setTimeout(()=>{if(s===0&&!touched)go(1);},D(900)));
  if('IntersectionObserver' in window)new IntersectionObserver(es=>{inView=es[0].intersectionRatio>=.35;inView?schedule():clearTimeout(timer);},{threshold:[0,.35,.7]}).observe(book);else inView=true;
  document.addEventListener('visibilitychange',()=>document.hidden?clearTimeout(timer):schedule());
})();

/* ---------- band parallax + sun ---------- */
(function band(){const band=$('#uphill'),media=$('#bandMedia'),sun=$('#bandSun'),AR=1600/1067;let ticking=false;
  function place(){const W=media.clientWidth,H=media.clientHeight;let iw,ih;if(W/H>AR){iw=W;ih=W/AR;}else{ih=H;iw=H*AR;}sun.style.left=((W-iw)/2+iw*.494)+'px';sun.style.top=((H-ih)/2+ih*.338)+'px';}
  function update(){ticking=false;const r=band.getBoundingClientRect(),vh=innerHeight;if(r.bottom<0||r.top>vh)return;const p=(vh-r.top)/(vh+r.height);media.style.transform=`translate3d(0,${((p-.5)*-16).toFixed(2)}%,0)`;}
  place();addEventListener('resize',()=>{place();update();});
  if(!RM)addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(update);}},{passive:true});
})();
}

