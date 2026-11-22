const grid=document.getElementById("mod-grid");
const search=document.getElementById("search");
const versionFilter=document.getElementById("version-filter");
const emptyState=document.getElementById("empty-state");

document.getElementById("year").textContent=new Date().getFullYear();
const youtubeUrl=(siteConfig && siteConfig.youtubeUrl)||"https://www.youtube.com/@kkYuddd";
["nav-youtube","hero-youtube","channel-card","footer-youtube"].forEach(id=>{const el=document.getElementById(id);if(el)el.href=youtubeUrl;});
const sortedMods=[...mods].sort((a,b)=>(b.date||"").localeCompare(a.date||""));
const versions=[...new Set(sortedMods.map(mod=>mod.version).filter(Boolean))].sort().reverse();
versions.forEach(version=>{const option=document.createElement("option");option.value=version;option.textContent=version;versionFilter.appendChild(option);});
function safeUrl(value){try{const url=new URL(value);return ["https:","http:"].includes(url.protocol)?url.href:"#";}catch{return "#";}}
function renderMods(){
  const term=search.value.trim().toLocaleLowerCase("pt-BR");const version=versionFilter.value;
  const filtered=sortedMods.filter(mod=>(`${mod.name} ${mod.description} ${mod.category} ${mod.version}`).toLocaleLowerCase("pt-BR").includes(term)&&(!version||mod.version===version));
  document.getElementById("mod-count").textContent=`${filtered.length} ${filtered.length===1?"MOD":"MODS"}`;grid.innerHTML="";
  filtered.forEach(mod=>{
    const card=document.createElement("article");card.className="mod-card";const imageArea=document.createElement("div");imageArea.className="mod-image";
    if(mod.image){const img=document.createElement("img");img.src=safeUrl(mod.image);img.alt=`Imagem de ${mod.name}`;img.loading="lazy";img.onerror=()=>{imageArea.innerHTML='<div class="image-placeholder">Y</div>';};imageArea.appendChild(img);}else imageArea.innerHTML='<div class="image-placeholder">Y</div>';
    const info=document.createElement("div");info.className="mod-info";const meta=document.createElement("div");meta.className="mod-meta";
    [`Minecraft ${mod.version||""}`,mod.category||"Mod"].filter(Boolean).forEach(label=>{const tag=document.createElement("span");tag.className="tag";tag.textContent=label;meta.appendChild(tag);});
    const title=document.createElement("h3");title.textContent=mod.name;const desc=document.createElement("p");desc.textContent=mod.description;const actions=document.createElement("div");actions.className="card-actions";
    const download=document.createElement("a");download.className="card-button";download.href=safeUrl(mod.download);download.target="_blank";download.rel="noopener";download.textContent="↓  BAIXAR MOD";actions.appendChild(download);
    if(mod.video){const video=document.createElement("a");video.className="card-button secondary";video.href=safeUrl(mod.video);video.target="_blank";video.rel="noopener";video.textContent="▶ VÍDEO";actions.appendChild(video);}
    info.append(meta,title,desc,actions);card.append(imageArea,info);grid.appendChild(card);
  });emptyState.hidden=filtered.length!==0;
}
search.addEventListener("input",renderMods);versionFilter.addEventListener("change",renderMods);renderMods();
