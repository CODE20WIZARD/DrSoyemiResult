const KEY="drSoyemiResultsDemo";
const $=s=>document.querySelector(s);
const year=document.querySelectorAll("#year"); year.forEach(x=>x.textContent=new Date().getFullYear());

function getResults(){try{return JSON.parse(localStorage.getItem(KEY)||"{}")}catch(e){return {}}}
function saveResults(x){localStorage.setItem(KEY,JSON.stringify(x))}
function makeId(){return "DS-"+new Date().getFullYear()+"-"+Math.random().toString(36).slice(2,8).toUpperCase()}

const access=$("#accessForm");
if(access){
  access.addEventListener("submit",e=>{
    e.preventDefault();
    const code=$("#code").value.trim().toUpperCase();
    const data=getResults()[code];
    const msg=$("#message");
    if(data) location.href="result.html?code="+encodeURIComponent(code);
    else msg.textContent="We could not find that access code. Please check the message sent by the clinic or contact the secretary.";
  });
}

const form=$("#resultForm");
if(form){
  form.addEventListener("submit",e=>{
    e.preventDefault();
    const f=new FormData(form), id=makeId();
    const result={id,patient:f.get("patient"),phone:f.get("phone"),type:f.get("type"),date:f.get("date"),note:f.get("note"),fileUrl:f.get("fileUrl"),created:new Date().toISOString()};
    const all=getResults(); all[id]=result; saveResults(all);
    const link=location.href.replace("admin.html","result.html")+"?code="+encodeURIComponent(id);
    const message=`Dear ${result.patient},\\n\\nYour result from Dr Soyemi's clinic is now available.\\n\\nResult: ${result.type}\\nAccess your secure result here: ${link}\\n\\nPlease keep this link private.\\n\\nDr Adeoye Olakunle Soyemi`;
    const wa="https://wa.me/"+result.phone.replace(/\\D/g,"")+"?text="+encodeURIComponent(message);
    const sms="sms:"+result.phone.replace(/\\D/g,"")+"?body="+encodeURIComponent(message);
    $("#created").innerHTML=`<div class="created-box"><strong>Result created</strong><p>Access code</p><code>${id}</code><p>Patient link</p><code>${link}</code><div class="actions"><a href="${wa}" target="_blank">Send via WhatsApp</a><a href="${sms}">Send via SMS</a><a href="${link}" target="_blank">Open Result</a></div></div>`;
  });
}

const resultRoot=$("#resultContent");
if(resultRoot){
  const code=new URLSearchParams(location.search).get("code")?.toUpperCase();
  const data=code?getResults()[code]:null;
  if(!data){resultRoot.innerHTML='<section class="result-card"><div class="result-body"><h2>Result unavailable</h2><p>This secure link is invalid or the result is not available in this demo.</p></div></section>'}
  else resultRoot.innerHTML=`<section class="result-card"><div class="result-head"><div class="eyebrow">CONFIDENTIAL MEDICAL RESULT</div><h1>${escapeHtml(data.type)}</h1><div class="result-meta">Patient: ${escapeHtml(data.patient)} · Date: ${escapeHtml(data.date)}</div></div><div class="result-body">${data.note?`<div class="note"><strong>Doctor's note</strong><p>${escapeHtml(data.note)}</p></div>`:""}${data.fileUrl?`<p><a href="${escapeAttr(data.fileUrl)}" target="_blank" rel="noopener">Open / download your report →</a></p>`:"<p>Your result record has been received by the clinic. A report file has not been attached to this demo record.</p>"}<p class="secure">🔒 Confidential information. Do not forward this link to anyone who is not authorised to view your medical information.</p></div></section>`;
}
function escapeHtml(s=""){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
function escapeAttr(s=""){return escapeHtml(s).replace(/javascript:/gi,"")}
