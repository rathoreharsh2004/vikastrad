const $=s=>document.querySelector(s);
const creations=Array.from({length:15},(_,i)=>`assets/c${i+1}.jpeg`);
const gallery=Array.from({length:6},(_,i)=>`assets/g${i+1}.jpeg`);
const track=$("#track");
creations.forEach((id,i)=>{const el=document.createElement("div");el.className="slide";el.innerHTML=`<div class="slide-img" style="background-image:url('${id}')"></div><div class="slide-name">CREATION ${String(i+1).padStart(2,"0")}</div>`;track.appendChild(el)});
gallery.forEach((id,i)=>{const el=document.createElement("div");el.className="g reveal";el.innerHTML=`<div style="background-image:url('${id}')"></div>`;$("#galleryGrid").appendChild(el)});
let index=0,auto;
function show(n){const list=document.querySelectorAll(".slide");index=(n+list.length)%list.length;track.style.transform=`translateX(-${index*100}%)`;list.forEach((x,i)=>x.classList.toggle("active",i===index));$("#counter").textContent=String(index+1).padStart(2,"0");$("#slideTitle").textContent=`CREATION ${String(index+1).padStart(2,"0")}`;$("#progress").style.width=`${((index+1)/15)*100}%`}
function restart(){clearInterval(auto);auto=setInterval(()=>show(index+1),5200)}
$("#prev").onclick=()=>{show(index-1);restart()};$("#next").onclick=()=>{show(index+1);restart()};show(0);restart();

document.querySelectorAll(".faq").forEach(x=>x.querySelector("button").onclick=()=>{document.querySelectorAll(".faq.open").forEach(y=>{if(y!==x)y.classList.remove("open")});x.classList.toggle("open")});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");io.unobserve(e.target)}}),{threshold:.1});document.querySelectorAll(".reveal").forEach(x=>io.observe(x));
document.querySelectorAll(".magnetic").forEach(el=>{el.addEventListener("mousemove",e=>{if(matchMedia("(hover:hover)").matches){let r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.08}px,${(e.clientY-r.top-r.height/2)*.08}px)`}});el.addEventListener("mouseleave",()=>el.style.transform="")});
$("#menu").onclick=()=>alert("Use the navigation links above or scroll through the studio.");
let pct=0;const load=setInterval(()=>{pct+=4;$("#loadNum").textContent=pct+"%";if(pct>=100){clearInterval(load);setTimeout(()=>$("#loader").classList.add("hide"),300)}},35);


