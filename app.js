'use strict';
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const worlds = {
  magic: {image:'assets/hogwarts.jpg',alt:'The towers and spires of Hogwarts castle',label:'THE WIZARDING WORLD',quote:'I solemnly swear that I am up to no good.',credit:'Harry Potter and the Prisoner of Azkaban'},
  cats: {image:'assets/cat.jpg',alt:'A cat ready for some birthday attention',label:'THE OFFICIAL BIRTHDAY COMMITTEE',quote:'Purr-haps this is your best year yet.',credit:'An original wish from the cat committee'},
  romcom: {image:'assets/romcom.jpg',alt:'Official poster for How to Lose a Guy in 10 Days with Kate Hudson and Matthew McConaughey',label:'HOW TO LOSE A GUY IN 10 DAYS',quote:'Our love fern!',credit:'Andie Anderson · How to Lose a Guy in 10 Days'},
  vegas: {image:'assets/vegas.jpg',alt:'The Las Vegas Strip illuminated at night',label:'LAS VEGAS, BABY',quote:'Here’s to a little luck and a lot of stories.',credit:'A birthday wish for your Vegas weekend'}
};
let currentWorld = 'magic';
const visited = new Set(['magic']);
let toastTimer;
function toast(message) { const el=$('#toast'); el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),4200); }
function celebrate(message) {
  if (message) toast(message);
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const layer=$('#confetti');layer.replaceChildren();
  const colors=['#f5dc85','#f2b7d2','#fffaf0','#619d89','#d27b9e'];
  for(let i=0;i<65;i++) {const el=document.createElement('span');el.className='confetti-piece';el.style.left=Math.random()*100+'%';el.style.background=colors[i%colors.length];el.style.setProperty('--drift',(Math.random()-.5)*260+'px');el.style.setProperty('--rotation',Math.random()*1080+'deg');el.style.setProperty('--fall-time',(2.5+Math.random()*1.8)+'s');el.style.setProperty('--fall-delay',Math.random()*.5+'s');el.style.borderRadius=i%3===0?'50%':'1px';layer.append(el);}
  setTimeout(()=>layer.replaceChildren(),5200);
}
function selectWorld(key,focusTab=false) {
  if(!Object.hasOwn(worlds,key)) throw new Error('Unknown birthday world.');
  currentWorld=key;visited.add(key);const data=worlds[key];
  $$('.theme-tabs button').forEach(b=>{const active=b.dataset.world===key;b.setAttribute('aria-selected',String(active));b.tabIndex=active?0:-1;if(active&&focusTab)b.focus();});
  $('#world-panel').className='world-panel world-'+key;$('#world-panel').setAttribute('aria-labelledby','tab-'+key);
  $$('.world-content').forEach(el=>el.hidden=el.id!=='content-'+key);
  $('#world-image').src=data.image;$('#world-image').alt=data.alt;$('#photo-label').textContent=data.label;$('#world-quote').textContent=data.quote;$('#quote-credit').textContent=data.credit;
  const keys=Object.keys(worlds);$('#chapter-text').textContent='CHAPTER 0'+(keys.indexOf(key)+1)+' OF 04';
  $$('.progress-dots span').forEach((el,i)=>el.classList.toggle('seen',visited.has(keys[i])));
  $('#worlds-status').textContent=visited.size===4?'All four worlds. One unforgettable birthday.':'A little mischief is encouraged.';
  return {world:key,worldsVisited:[...visited]};
}
$$('[data-world]').forEach(b=>b.addEventListener('click',()=>selectWorld(b.dataset.world)));
$('.theme-tabs').addEventListener('keydown',e=>{const keys=Object.keys(worlds);let n=keys.indexOf(currentWorld);if(e.key==='ArrowRight')n=(n+1)%4;else if(e.key==='ArrowLeft')n=(n+3)%4;else if(e.key==='Home')n=0;else if(e.key==='End')n=3;else return;e.preventDefault();selectWorld(keys[n],true);});
let spell='lumos';
const spells={lumos:'Lumos! Here’s to a year that lights you up—from tiny happy moments to the big, unforgettable ones.',felix:'A little Felix Felicis for the birthday girl. May the best surprises find you, in Vegas and everywhere after.',accio:'Accio adventure! May twenty-one bring new places, your favorite people, and stories you’ll tell for years.'};
$$('[data-spell]').forEach(b=>b.addEventListener('click',()=>{spell=b.dataset.spell;$$('[data-spell]').forEach(x=>{const active=x===b;x.classList.toggle('active',active);x.setAttribute('aria-pressed',String(active));});}));
function castSpell(key=spell){if(!Object.hasOwn(spells,key))throw new Error('Unknown spell.');spell=key;$$('[data-spell]').forEach(x=>{const a=x.dataset.spell===key;x.classList.toggle('active',a);x.setAttribute('aria-pressed',String(a));});$('#spell-result').textContent=spells[key];celebrate();return {spell:key,wish:spells[key]};}
$('#cast-spell').addEventListener('click',()=>castSpell());
let pets=0;
const catMessages=['One pet. Instant approval. You’re officially the favorite human.','Prrrr. The committee would like to request another birthday treat.','A gentle head bump, just for the birthday girl.','Twenty-one? You don’t look a day over purrfect.','The cat has claimed the gift box. You may keep the presents.','All nine lives agree: this year is going to be a good one.'];
function petCat(){pets++;$('#cat-message').textContent=catMessages[(pets-1)%catMessages.length];$('#pet-count').textContent='Purrs collected: '+pets;const photo=$('.world-photo');photo.classList.remove('pet-bounce');void photo.offsetWidth;photo.classList.add('pet-bounce');if(pets===5)celebrate('Five purrs. Honorary cat royalty.');return {purrs:pets,message:$('#cat-message').textContent};}
$('#pet-cat').addEventListener('click',petCat);
const moments=[['Make an entrance.','The yellow dress is a state of mind. Wear whatever makes you feel like the leading lady.'],['Cue your favorite song.','Every good birthday deserves an opening soundtrack. Turn yours up.'],['Take the photo.','The blurry laughing one will probably become your favorite.'],['Say yes to dessert.','A birthday cake is wonderful. A second dessert is character development.'],['Bring your favorite people.','The supporting cast makes the whole story better.'],['Have your movie moment.','A little drama, a little laughter, and absolutely main-character energy.'],['Let the plan surprise you.','Leave room for the unexpected scene you’ll still be talking about next year.'],['Add a little sparkle.','Vegas lights, birthday candles, or the glow of having a really good time.'],['Make a wish worth keeping.','Big, tiny, wildly specific—this one only has to make sense to you.'],['Choose your happy ending.','Surrounded by love, full of memories, and ready for everything twenty-one brings.']];
function revealMoment(index){if(!Number.isInteger(index)||index<0||index>9)throw new Error('Moment must be between 1 and 10.');const [title,copy]=moments[index];const target=$('#moment-result');target.replaceChildren();const h=document.createElement('strong');h.textContent=title;const p=document.createElement('p');p.textContent=copy;target.append(h,p);$('[data-moment="'+index+'"]').classList.add('visited');return {moment:index+1,title,description:copy};}
$$('[data-moment]').forEach(b=>b.addEventListener('click',()=>revealMoment(Number(b.dataset.moment))));
let spinning=false,spins=0;
const birthdayPrizes=[{symbols:['✦','✦','✦'],message:'A little birthday magic. May the unexpected things be the wonderful things.'},{symbols:['♡','♡','♡'],message:'Love, love, love. May your year be full of people who make you feel celebrated.'},{symbols:['2','1','♠'],message:'Twenty-one in Vegas! Here’s to bright lights and unforgettable memories.'},{symbols:['🐾','🐾','🐾'],message:'Purrfect luck! The cat committee is cheering you on.'}];
async function spin(){if(spinning)return {spinning:true};spinning=true;spins++;$('#spin').disabled=true;$('#spin').textContent='A little luck is on its way…';$('.reels').classList.add('spinning');$('#spin-result').textContent='Your birthday wish is coming…';const r=matchMedia('(prefers-reduced-motion: reduce)').matches;let timer;if(!r)timer=setInterval(()=>$$('.reel').forEach(x=>x.textContent=['✦','♡','♠','2','1'][Math.floor(Math.random()*5)]),85);await new Promise(resolve=>setTimeout(resolve,r?100:1000));if(timer)clearInterval(timer);const result=birthdayPrizes[(spins-1)%birthdayPrizes.length];result.symbols.forEach((s,i)=>$('#reel-'+i).textContent=s);$('.reels').classList.remove('spinning');$('#spin-result').textContent=result.message;$('#spin').disabled=false;$('#spin').textContent='Spin again ♠';spinning=false;celebrate();return {spin:spins,result:result.message};}
$('#spin').addEventListener('click',spin);
function openVideo(){$$('audio').forEach(a=>a.pause());const dialog=$('#video-dialog');if(!dialog.open){const frame=document.createElement('iframe');frame.src='https://drive.google.com/file/d/1_4aEK-w8bwMXFwhBKanaBjHysdadKZtC/preview';frame.title='Mhikee’s birthday video';frame.allow='autoplay; fullscreen';frame.allowFullscreen=true;$('#video-frame').replaceChildren(frame);dialog.showModal();document.body.style.overflow='hidden';}return {videoOpen:true};}
function closeDialog(dialog){$$('audio',dialog).forEach(a=>a.pause());dialog.close();if(dialog.id==='video-dialog')$('#video-frame').replaceChildren();if(dialog.id==='movie-dialog')$('#movie-frame').replaceChildren();document.body.style.overflow='';}
$$('[data-open-video]').forEach(b=>b.addEventListener('click',openVideo));
$$('dialog').forEach(dialog=>{dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDialog(dialog);}});dialog.addEventListener('close',()=>{$$('audio',dialog).forEach(a=>a.pause());if(dialog.id==='video-dialog')$('#video-frame').replaceChildren();if(dialog.id==='movie-dialog')$('#movie-frame').replaceChildren();document.body.style.overflow='';});$('.close-dialog',dialog).addEventListener('click',()=>closeDialog(dialog));});
$('#watch-movie').addEventListener('click',()=>{$$('audio').forEach(a=>a.pause());const frame=document.createElement('iframe');frame.src='https://www.youtube-nocookie.com/embed/MaNxhaVwox0?rel=0';frame.title='Iconic moments in How to Lose a Guy in 10 Days — Paramount Movies';frame.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';frame.referrerPolicy='strict-origin-when-cross-origin';frame.allowFullscreen=true;$('#movie-frame').replaceChildren(frame);$('#movie-dialog').showModal();document.body.style.overflow='hidden';});
$('#open-credits').addEventListener('click',()=>{$('#credits-dialog').showModal();document.body.style.overflow='hidden';});
$$('audio').forEach(audio=>audio.addEventListener('play',()=>$$('audio').forEach(other=>{if(other!==audio)other.pause();})));
$('#celebrate').addEventListener('click',()=>celebrate('Happy 21st, Mhikee. Make it a good one. ♡'));
$('#final-wish').addEventListener('click',()=>{$('#wish-status').textContent='Wish made. Here’s to everything that comes next. ♡';celebrate();});
// Expose the same birthday actions to supporting browsers, without requiring them.
if(document.modelContext?.registerTool){const lifecycle=new AbortController();const defs=[{name:'explore_birthday_world',title:'Explore a birthday world',description:'Open one of Mhikee’s four birthday worlds and update the visible page.',inputSchema:{type:'object',properties:{world:{type:'string',enum:Object.keys(worlds)}},required:['world'],additionalProperties:false},execute:input=>{if(!input||typeof input.world!=='string')throw new Error('A birthday world is required.');const result=selectWorld(input.world);$('#adventures').scrollIntoView({block:'start'});return result;}},{name:'reveal_birthday_moment',title:'Reveal a birthday moment',description:'Open the rom-com world and reveal one of the ten birthday moments.',inputSchema:{type:'object',properties:{moment:{type:'integer',minimum:1,maximum:10}},required:['moment'],additionalProperties:false},execute:input=>{if(!input||!Number.isInteger(input.moment)||input.moment<1||input.moment>10)throw new Error('Moment must be 1 to 10.');selectWorld('romcom');return revealMoment(input.moment-1);}}];for(const def of defs){try{Promise.resolve(document.modelContext.registerTool({...def,annotations:{readOnlyHint:false,untrustedContentHint:false}},{signal:lifecycle.signal})).catch(()=>{});}catch{}}window.addEventListener('pagehide',()=>lifecycle.abort(),{once:true});}
