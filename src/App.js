import React, { useState, useEffect } from "react";

const G = "#1B3A2D", GL = "#2A5240", GD = "#0F2118", GOLD = "#C8A84B", CREAM = "#F5F0E8";

const STORES = {
  chateau: { key:"chateau", name:"Château-du-Loir", short:"Château", address:"Montval-sur-Loir", icon:"🏰", color:"#4A90D9", phone:"0243446905", whatsapp:"0695767893", messenger:"barbavapeshop", email:"barbavape.staff@gmail.com" },
  ecommoy: { key:"ecommoy", name:"Ecommoy", short:"Ecommoy", address:"Galerie Hyper U", icon:"🛒", color:"#E8A020", phone:"0243282421", whatsapp:"0695767893", messenger:"barbavapeshop", email:"barbavape.staff@gmail.com" },
};

const LEVELS = [
  { name:"Bronze", min:0, max:199, color:"#CD7F32" },
  { name:"Silver", min:200, max:499, color:"#A8A9AD" },
  { name:"Gold", min:500, max:999, color:GOLD },
  { name:"Platinum", min:1000, max:Infinity, color:"#b0c4de" },
];

const REWARDS = [
  { id:1, name:"Remise 5%", points:100, icon:"🎟️" },
  { id:2, name:"E-liquide offert", points:250, icon:"🧪" },
  { id:3, name:"Résistances x5", points:400, icon:"⚡" },
  { id:4, name:"Pod au choix", points:600, icon:"💨" },
  { id:5, name:"Box premium", points:1000, icon:"🏆" },
];

const WELCOME_BONUS = 50;

const FB_LOGO = <svg viewBox="0 0 24 24" width="22" height="22" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
const IG_LOGO = <svg viewBox="0 0 24 24" width="22" height="22"><defs><linearGradient id="ig" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#f09433"/><stop offset="25%" stopColor="#e6683c"/><stop offset="50%" stopColor="#dc2743"/><stop offset="75%" stopColor="#cc2366"/><stop offset="100%" stopColor="#bc1888"/></linearGradient></defs><path fill="url(#ig)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>;

const SOCIAL_LINKS = [
  { label:"Site web", icon:"🌐", url:"https://www.barbavape.fr", color:G },
  { label:"Facebook", logo: FB_LOGO, url:"https://www.facebook.com/barbavapeshop", color:"#1877F2" },
  { label:"Instagram", logo: IG_LOGO, url:"https://www.instagram.com/barbavape72", color:"#E1306C" },
];

const CLIENT_CHANNELS = [
  { key:"sms", label:"SMS", icon:"💬", color:"#34C759", field:"phone", placeholder:"Votre numéro (ex: 0612345678)" },
  { key:"whatsapp", label:"WhatsApp", icon:"📱", color:"#25D366", field:"phone", placeholder:"Votre numéro WhatsApp" },
  { key:"messenger", label:"Messenger", icon:"💙", color:"#0099FF", field:"messenger", placeholder:"Votre identifiant Messenger" },
  { key:"phone", label:"Téléphone", icon:"📞", color:"#FF9500", field:"phone", placeholder:"Votre numéro de téléphone" },
  { key:"email", label:"Email", icon:"✉️", color:"#FF3B30", field:"email", placeholder:"Votre adresse email" },
];

const ADMIN_CHANNELS = [
  { key:"sms", label:"SMS", icon:"💬", color:"#34C759", getUrl:c=>`sms:${c.phone}`, getMsgUrl:(c,msg)=>`sms:${c.phone}?body=${msg}` },
  { key:"whatsapp", label:"WhatsApp", icon:"📱", color:"#25D366", getUrl:c=>`https://wa.me/33${(c.phone||"").substring(1)}`, getMsgUrl:(c,msg)=>`https://wa.me/33${(c.phone||"").substring(1)}?text=${msg}` },
  { key:"messenger", label:"Messenger", icon:"💙", color:"#0099FF", getUrl:c=>`https://m.me/${c.messenger}`, getMsgUrl:c=>`https://m.me/${c.messenger}` },
  { key:"phone", label:"Téléphone", icon:"📞", color:"#FF9500", getUrl:c=>`tel:${c.phone}`, getMsgUrl:c=>`tel:${c.phone}` },
  { key:"email", label:"Email", icon:"✉️", color:"#FF3B30", getUrl:c=>`mailto:${c.email}`, getMsgUrl:(c,msg)=>`mailto:${c.email}?body=${msg}` },
];

const TEMPLATES = [
  { id:1, label:"🎁 Récompense disponible", text:(n,p)=>`Bonjour ${n} ! Vous avez ${p} points Barbavape. Venez récupérer votre récompense en boutique ! 🐊` },
  { id:2, label:"🎉 Anniversaire", text:n=>`Joyeux anniversaire ${n} ! 🎂 La team Barbavape vous offre une surprise en boutique ce mois-ci.` },
  { id:3, label:"📢 Promotion", text:n=>`Bonjour ${n} ! Nouvelle promo Barbavape : -20% sur tous les e-liquides ce week-end. On vous attend ! 🐊` },
  { id:4, label:"🔔 Retour en stock", text:n=>`Bonjour ${n} ! Votre produit habituel vient de rentrer en stock. Passez nous voir vite !` },
  { id:5, label:"💬 Message libre", text:n=>`Bonjour ${n}, ` },
];

const HEALTH_MILESTONES = [
  { label:"Tension artérielle", desc:"revient à la normale", hours:0.33, icon:"❤️" },
  { label:"Monoxyde de carbone", desc:"éliminé du sang", hours:8, icon:"🫁" },
  { label:"Risque cardiaque", desc:"commence à baisser", hours:24, icon:"💓" },
  { label:"Goût & odorat", desc:"s'améliorent", hours:48, icon:"👃" },
  { label:"Respiration", desc:"nettement améliorée", hours:72, icon:"😮‍💨" },
  { label:"1 semaine", desc:"sans tabac — bravo !", hours:168, icon:"🌟" },
  { label:"1 mois", desc:"toux et essoufflement réduits", hours:720, icon:"💪" },
  { label:"3 mois", desc:"fonction pulmonaire +30%", hours:2160, icon:"🫀" },
  { label:"1 an", desc:"risque coronarien divisé par 2", hours:8760, icon:"🏆" },
];

const MOCK_CLIENTS = [
  { id:1, name:"Marie Dupont", phone:"0612345678", email:"marie.dupont@email.com", messenger:"", preferredChannel:"whatsapp", store:"chateau", points:400, welcomeGiven:true, purchases:[{date:"2026-04-15",amount:28,product:"E-liquide Fruité 50ml"},{date:"2026-03-20",amount:45,product:"Pod Vaporesso XROS"}], preferences:[], cigsBefore:15, cigsNow:0, quitDate:"2025-10-01", prixPaquet:11 },
  { id:2, name:"Thomas Bernard", phone:"0623456789", email:"thomas.b@email.com", messenger:"", preferredChannel:"sms", store:"ecommoy", points:170, welcomeGiven:true, purchases:[{date:"2026-01-10",amount:35,product:"Mod + clearomiseur"}], preferences:[], cigsBefore:20, cigsNow:5, quitDate:"2025-12-01", prixPaquet:11 },
  { id:3, name:"Sophie Martin", phone:"0634567890", email:"sophie.martin@email.com", messenger:"", preferredChannel:"email", store:"chateau", points:730, welcomeGiven:true, purchases:[{date:"2026-04-12",amount:55,product:"Kit complet débutant"},{date:"2026-02-14",amount:75,product:"Box premium"}], preferences:[], cigsBefore:10, cigsNow:0, quitDate:"2026-01-15", prixPaquet:11 },
];

const INITIAL_TEAM = [
  { id:1, firstName:"Nicolas", lastName:"Butavant", phone:"0695767893", email:"butavant.nicolas@gmail.com", role:"owner", stores:["chateau","ecommoy"], active:true },
  { id:2, firstName:"Camille", lastName:"Dupré", phone:"0600000001", email:"camille@barbavape.fr", role:"employee", stores:["chateau"], active:true },
];

const DEFAULT_ANNOUNCEMENTS = [
  { id:1, store:"chateau", message:"", active:false },
  { id:2, store:"ecommoy", message:"", active:false },
  { id:3, store:"all", message:"", active:false },
];

const calcAge = bdate => {
  if (!bdate || bdate === "0000-00-00") return null;
  const today = new Date(), b = new Date(bdate);
  let age = today.getFullYear() - b.getFullYear();
  if (today.getMonth() < b.getMonth() || (today.getMonth() === b.getMonth() && today.getDate() < b.getDate())) age--;
  return age;
};

const getLevel = p => LEVELS.find(l => p >= l.min && p <= l.max) || LEVELS[0];
const nextLvl = p => { const i = LEVELS.indexOf(getLevel(p)); return i < LEVELS.length-1 ? LEVELS[i+1] : null; };
const lastPurchaseDate = c => c.purchases&&c.purchases.length ? new Date(Math.max(...c.purchases.map(p=>new Date(p.date)))) : new Date(0);
const daysSince = c => Math.floor((Date.now()-lastPurchaseDate(c))/86400000);
const absentLabel = d => d===0?"Aujourd'hui":d<30?`${d}j`:d<365?`${Math.floor(d/30)} mois`:`${Math.floor(d/365)}a`;
const absentColor = d => d>60?"#FF3B30":d>30?"#FF9500":"#34C759";
const fullName = u => `${u.firstName} ${u.lastName}`;

// ─── UI Helpers ───────────────────────────────────────────────
function Avatar({ name, size=44 }) {
  return <div style={{width:size,height:size,borderRadius:size/2,background:`linear-gradient(135deg,${G},${GL})`,color:CREAM,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:size*0.35,flexShrink:0}}>{(name||"?").split(" ").map(n=>n[0]).join("").toUpperCase().substring(0,2)}</div>;
}

function StoreBadge({ storeKey, small }) {
  const s = STORES[storeKey]; if(!s) return null;
  return <span style={{background:s.color+"22",color:s.color,border:`1px solid ${s.color}55`,padding:small?"2px 7px":"4px 10px",borderRadius:20,fontSize:small?10:12,fontWeight:700,whiteSpace:"nowrap"}}>{s.icon} {s.short}</span>;
}

// ─── OTP Login (partagé clients et équipe) ──────────────────
function OTPLogin({ title, subtitle, icon, findUser, onLogin, onBack }) {
  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [sentCode, setSentCode] = useState("");
  const [foundUser, setFoundUser] = useState(null);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (countdown > 0) { const t = setTimeout(()=>setCountdown(c=>c-1),1000); return ()=>clearTimeout(t); }
  }, [countdown]);

  const sendCode = () => {
    const norm = phone.replace(/\s/g,"");
    const user = findUser(norm);
    if (!user) { setError("Numéro non reconnu. Contactez votre boutique Barbavape."); return; }
    const otp = genCode();
    setSentCode(otp); setFoundUser(user); setError(""); setStep("code"); setCountdown(60);
  };

  const verifyCode = () => {
    if (code === sentCode) { onLogin(foundUser); }
    else { setError("Code incorrect. Réessayez."); }
  };

  return (
    <div style={{minHeight:"100vh",background:`linear-gradient(135deg,${GD},${G})`,display:"flex",alignItems:"center",justifyContent:"center",padding:20,flexDirection:"column"}}>
      <div style={{background:"white",borderRadius:24,padding:32,width:"100%",maxWidth:340,boxShadow:"0 24px 80px rgba(0,0,0,0.3)"}}>
        <div style={{textAlign:"center",marginBottom:24}}>
          <div style={{fontSize:52,marginBottom:8}}>{icon}</div>
          <div style={{fontWeight:900,fontSize:20,color:G}}>{title}</div>
          <div style={{fontSize:13,color:"#aaa",marginTop:4}}>{subtitle}</div>
        </div>

        {step==="phone" && <>
          <div style={{fontSize:12,fontWeight:600,color:"#555",marginBottom:6}}>Votre numéro de téléphone</div>
          <input value={phone} onChange={e=>{setPhone(e.target.value);setError("");}} onKeyDown={e=>e.key==="Enter"&&sendCode()} placeholder="Ex: 0612345678" type="tel"
            style={{width:"100%",padding:"13px 14px",borderRadius:12,border:`2px solid ${error?"#FF3B30":"#eee"}`,fontSize:15,boxSizing:"border-box",outline:"none",marginBottom:8}}/>
          {error&&<div style={{color:"#FF3B30",fontSize:12,marginBottom:8,textAlign:"center"}}>{error}</div>}
          <button onClick={sendCode} style={{width:"100%",padding:"14px",background:G,color:"white",border:"none",borderRadius:14,fontWeight:800,cursor:"pointer",fontSize:16,marginTop:4}}>
            Recevoir un code SMS →
          </button>
        </>}

        {step==="code" && <>
          <div style={{background:"#f0faf4",borderRadius:12,padding:"12px 14px",marginBottom:14,fontSize:13,color:"#555",lineHeight:1.6}}>
            Code envoyé au <strong>{phone}</strong>
          </div>
          <div style={{background:"#fff8e1",border:"1.5px solid #FFCA28",borderRadius:12,padding:"10px 14px",marginBottom:14,textAlign:"center"}}>
            <div style={{fontSize:11,color:"#888",marginBottom:4}}>🧪 Mode démo — code SMS :</div>
            <div style={{fontSize:28,fontWeight:900,letterSpacing:6,color:G}}>{sentCode}</div>
          </div>
          <input value={code} onChange={e=>{setCode(e.target.value);setError("");}} onKeyDown={e=>e.key==="Enter"&&verifyCode()} placeholder="000000" maxLength={6} type="number"
            style={{width:"100%",padding:"13px 14px",borderRadius:12,border:`2px solid ${error?"#FF3B30":"#eee"}`,fontSize:22,fontWeight:700,letterSpacing:8,boxSizing:"border-box",outline:"none",marginBottom:8,textAlign:"center"}}/>
          {error&&<div style={{color:"#FF3B30",fontSize:12,marginBottom:8,textAlign:"center"}}>{error}</div>}
          <button onClick={verifyCode} style={{width:"100%",padding:"14px",background:G,color:"white",border:"none",borderRadius:14,fontWeight:800,cursor:"pointer",fontSize:16}}>Valider ✓</button>
          <button onClick={()=>{setStep("phone");setCode("");setError("");}} style={{width:"100%",padding:"10px",background:"transparent",color:"#aaa",border:"none",cursor:"pointer",fontSize:13,marginTop:6}}>← Changer de numéro</button>
          {countdown>0&&<div style={{textAlign:"center",fontSize:12,color:"#bbb",marginTop:4}}>Renvoyer dans {countdown}s</div>}
          {countdown===0&&<button onClick={sendCode} style={{width:"100%",padding:"8px",background:"transparent",color:G,border:"none",cursor:"pointer",fontSize:13,fontWeight:600,marginTop:4}}>Renvoyer le code</button>}
        </>}
      </div>
      {onBack&&<button onClick={onBack} style={{marginTop:20,color:"rgba(255,255,255,0.6)",background:"transparent",border:"none",cursor:"pointer",fontSize:14}}>← Retour</button>}
    </div>
  );
}

// ─── Ecran d'accueil ──────────────────────────────────────────
function HomeScreen({ onClientLogin, onTeamLogin }) {
  const [teamTaps, setTeamTaps] = useState(0);

  // Le bouton équipe est caché — visible après 5 taps discrets sur le logo
  const handleLogoTap = () => {
    setTeamTaps(t => {
      if (t + 1 >= 5) { onTeamLogin(); return 0; }
      return t + 1;
    });
  };

  return (
    <div style={{minHeight:"100vh",background:`linear-gradient(135deg,${GD},${G})`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24}}>
      <div onClick={handleLogoTap} style={{fontSize:72,marginBottom:8,cursor:"default",userSelect:"none"}}>🐊</div>
      <div style={{fontWeight:900,fontSize:28,color:CREAM,marginBottom:6}}>Barbavape</div>
      <div style={{fontSize:14,color:"rgba(255,255,255,0.55)",marginBottom:48,letterSpacing:1}}>Since 2018</div>

      <div style={{width:"100%",maxWidth:340}}>
        <button onClick={onClientLogin} style={{width:"100%",padding:"18px",background:CREAM,color:G,border:"none",borderRadius:18,fontWeight:800,cursor:"pointer",fontSize:18,marginBottom:14,boxShadow:"0 8px 30px rgba(0,0,0,0.25)"}}>
          🐊 Ma carte fidélité
        </button>
        <div style={{textAlign:"center",fontSize:12,color:"rgba(255,255,255,0.4)"}}>
          Connectez-vous avec votre numéro de téléphone
        </div>
      </div>

      <div style={{display:"flex",gap:16,marginTop:48}}>
        {SOCIAL_LINKS.map(s=>(
          <a key={s.label} href={s.url} target="_blank" rel="noreferrer" style={{color:"rgba(255,255,255,0.5)",fontSize:24,textDecoration:"none"}}>{s.icon}</a>
        ))}
      </div>

      {teamTaps > 0 && teamTaps < 5 && (
        <div style={{position:"fixed",bottom:20,fontSize:11,color:"rgba(255,255,255,0.2)"}}>{5-teamTaps} taps restants</div>
      )}
    </div>
  );
}

// ─── Annonces ────────────────────────────────────────────────
function AnnouncementBanner({ announcements }) {
  const active = announcements.filter(a => a.active && a.message.trim());
  if (!active.length) return null;
  return (
    <div style={{maxWidth:430,margin:"0 auto 12px"}}>
      {active.map(a => {
        const st = a.store==="all" ? null : STORES[a.store];
        return (
          <div key={a.id} style={{background:st?`${st.color}18`:"#FFF4E6",border:`1.5px solid ${st?st.color:"#FF9500"}`,borderRadius:14,padding:"12px 16px",marginBottom:8,display:"flex",gap:10}}>
            <span style={{fontSize:22,flexShrink:0}}>📢</span>
            <div>
              {st&&<div style={{fontWeight:700,fontSize:12,color:st.color,marginBottom:3}}>{st.icon} {st.name}</div>}
              {!st&&<div style={{fontWeight:700,fontSize:12,color:"#FF9500",marginBottom:3}}>🐊 Toutes les boutiques</div>}
              <div style={{fontSize:13,color:"#444",lineHeight:1.5}}>{a.message}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function SocialBar() {
  return (
    <div style={{maxWidth:430,margin:"16px auto 0"}}>
      <div style={{background:"white",borderRadius:16,border:"1px solid #eee",padding:"14px 16px"}}>
        <div style={{fontSize:12,color:"#999",fontWeight:600,marginBottom:10,textTransform:"uppercase",letterSpacing:1}}>Retrouvez-nous</div>
        <div style={{display:"flex",gap:8}}>
          {SOCIAL_LINKS.map(s=>(
            <a key={s.label} href={s.url} target="_blank" rel="noreferrer"
              style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",padding:"10px 4px",borderRadius:12,border:`1.5px solid ${s.color}33`,background:`${s.color}08`,textDecoration:"none",gap:6}}>
              {s.logo ? s.logo : <span style={{fontSize:22}}>{s.icon}</span>}
              <span style={{fontSize:10,fontWeight:600,color:s.color}}>{s.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function BirthdayBanner({ client }) {
  if (!client.birthdate || client.birthdate === "0000-00-00") return null;
  const today = new Date();
  const bday = new Date(client.birthdate);
  const isToday = bday.getDate() === today.getDate() && bday.getMonth() === today.getMonth();
  const nextBday = new Date(today.getFullYear(), bday.getMonth(), bday.getDate());
  if (nextBday < today) nextBday.setFullYear(today.getFullYear() + 1);
  const daysUntil = Math.ceil((nextBday - today) / 86400000);

  if (!isToday && daysUntil > 7) return null;

  return (
    <div style={{ background: isToday ? `linear-gradient(135deg,${GOLD},#e0a830)` : "#fff8e1", border: `1.5px solid ${isToday ? GOLD : "#FFCA28"}`, borderRadius: 14, padding: "14px 16px", marginBottom: 12, display: "flex", alignItems: "center", gap: 12 }}>
      <span style={{ fontSize: 30 }}>{isToday ? "🎂" : "🎁"}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 800, fontSize: 15, color: isToday ? "#111" : "#a07000" }}>
          {isToday ? "Joyeux anniversaire ! 🎉" : `Votre anniversaire dans ${daysUntil} jour${daysUntil > 1 ? "s" : ""} !`}
        </div>
        <div style={{ fontSize: 13, color: isToday ? "#333" : "#888", marginTop: 3 }}>
          {isToday ? "Un cadeau vous attend en boutique 🐊" : "Préparez-vous, un cadeau Barbavape arrive !"}
        </div>
      </div>
    </div>
  );
}

function BirthdayPrompt({ client, setClient }) {
  const [open, setOpen] = useState(false);
  const [dateInput, setDateInput] = useState("");
  const [error, setError] = useState("");

  const save = () => {
    if (!dateInput) { setError("Veuillez saisir votre date de naissance."); return; }
    const age = calcAge(dateInput);
    if (age === null || age < 18) {
      setError("⛔ Vous devez être majeur (18 ans ou plus) pour utiliser cette application.");
      return;
    }
    setClient({ ...client, birthdate: dateInput });
    setOpen(false);
    setError("");
  };

  return (
    <div style={{ marginBottom: 12 }}>
      <div onClick={() => setOpen(!open)} style={{ background: "#f0faf4", border: "1.5px solid #9dd4b4", borderRadius: 14, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
        <span style={{ fontSize: 26 }}>🎂</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: G }}>Débloquez votre cadeau anniversaire !</div>
          <div style={{ fontSize: 12, color: "#555", marginTop: 3 }}>Appuyez ici pour renseigner votre date de naissance 🎁</div>
        </div>
        <span style={{ fontSize: 18, color: G }}>{open ? "▾" : "›"}</span>
      </div>
      {open && (
        <div style={{ background: "white", border: "1.5px solid #9dd4b4", borderRadius: 14, borderTop: "none", borderTopLeftRadius: 0, borderTopRightRadius: 0, padding: 16 }}>
          <div style={{ fontSize: 13, color: "#555", marginBottom: 10, lineHeight: 1.5 }}>
            📋 Votre date de naissance nous permet de vous offrir une surprise chaque année.<br/>
            <span style={{ fontSize: 12, color: "#FF3B30", fontWeight: 600 }}>⛔ Réservé aux personnes majeures (18 ans ou plus).</span>
          </div>
          <input type="date" value={dateInput} onChange={e => { setDateInput(e.target.value); setError(""); }}
            max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split("T")[0]}
            style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: `1.5px solid ${error ? "#FF3B30" : "#ddd"}`, fontSize: 15, boxSizing: "border-box", outline: "none", marginBottom: 8 }} />
          {error && <div style={{ color: "#FF3B30", fontSize: 12, marginBottom: 8, fontWeight: 600 }}>{error}</div>}
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={save} style={{ flex: 1, padding: "11px", background: G, color: "white", border: "none", borderRadius: 10, fontWeight: 700, cursor: "pointer", fontSize: 14 }}>Enregistrer ✓</button>
            <button onClick={() => { setOpen(false); setError(""); }} style={{ padding: "11px 16px", background: "#f0f0f0", border: "none", borderRadius: 10, cursor: "pointer", fontSize: 13 }}>Annuler</button>
          </div>
        </div>
      )}
    </div>
  );
}
function LoyaltyCard({ client }) {
  const lvl=getLevel(client.points||0), next=nextLvl(client.points||0);
  const progress = next?(((client.points||0)-lvl.min)/(next.min-lvl.min))*100:100;
  const age = calcAge(client.birthdate);
  return (
    <div style={{background:`linear-gradient(135deg,${GD} 0%,${G} 60%,${GL} 100%)`,borderRadius:20,padding:"24px 24px 20px",color:CREAM,position:"relative",overflow:"hidden",boxShadow:"0 8px 32px rgba(15,33,24,0.25)"}}>
      <div style={{position:"absolute",right:-15,bottom:-25,fontSize:130,opacity:0.06,userSelect:"none"}}>🐊</div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        <div>
          <div style={{fontSize:10,opacity:0.6,letterSpacing:3,textTransform:"uppercase",marginBottom:4}}>Carte de fidélité</div>
          <div style={{fontSize:20,fontWeight:700}}>{client.name}</div>
          <div style={{display:"flex",gap:8,alignItems:"center",marginTop:3,flexWrap:"wrap"}}>
            {client.store&&<div style={{fontSize:11,opacity:0.6}}>{STORES[client.store]?.icon} {STORES[client.store]?.name}</div>}
            {age!==null&&<div style={{fontSize:11,opacity:0.6}}>· {age} ans</div>}
          </div>
        </div>
        <div style={{background:lvl.color,color:"#111",padding:"5px 14px",borderRadius:20,fontWeight:800,fontSize:12}}>{lvl.name}</div>
      </div>
      <div style={{margin:"18px 0 4px",fontSize:40,fontWeight:900}}>{(client.points||0).toLocaleString()}<span style={{fontSize:16,fontWeight:400,opacity:0.7,marginLeft:6}}>pts</span></div>
      {client.welcomeGiven&&<div style={{display:"inline-flex",alignItems:"center",gap:6,background:"rgba(200,168,75,0.25)",border:"1px solid rgba(200,168,75,0.5)",borderRadius:10,padding:"4px 10px",fontSize:11,marginBottom:8}}><span>🎁</span><span style={{fontWeight:600}}>+50 pts de bienvenue offerts</span></div>}
      {next?(<><div style={{display:"flex",justifyContent:"space-between",fontSize:11,opacity:0.65,marginBottom:6}}><span>Vers {next.name}</span><span>{next.min-(client.points||0)} pts restants</span></div><div style={{background:"rgba(255,255,255,0.15)",borderRadius:6,height:7,overflow:"hidden"}}><div style={{background:GOLD,height:"100%",width:`${Math.min(progress,100)}%`,borderRadius:6}}/></div></>):<div style={{fontSize:12,opacity:0.6,marginTop:4}}>✨ Niveau maximum atteint !</div>}
      <div style={{marginTop:16,fontSize:10,opacity:0.4,letterSpacing:2,textTransform:"uppercase"}}>Barbavape · Since 2018</div>
    </div>
  );
}

function RewardsTab({ client }) {
  return <div>{REWARDS.map(r=>{const ok=(client.points||0)>=r.points;return(<div key={r.id} style={{display:"flex",alignItems:"center",padding:"14px 16px",marginBottom:8,background:ok?"#edf7f1":"#fafafa",borderRadius:14,border:`1.5px solid ${ok?"#9dd4b4":"#e8e8e8"}`}}><span style={{fontSize:26,marginRight:14}}>{r.icon}</span><div style={{flex:1}}><div style={{fontWeight:600,fontSize:14}}>{r.name}</div><div style={{fontSize:12,color:"#999"}}>{r.points} points</div></div>{ok?<span style={{background:G,color:"white",padding:"5px 12px",borderRadius:10,fontSize:12,fontWeight:700}}>Dispo ✓</span>:<span style={{color:"#bbb",fontSize:13,fontWeight:600}}>−{r.points-(client.points||0)} pts</span>}</div>);})}</div>;
}

function HistoryTab({ client }) {
  return <div>{(!client.purchases||client.purchases.length===0)&&<div style={{textAlign:"center",color:"#aaa",padding:32}}>Aucun achat enregistré</div>}{(client.purchases||[]).map((p,i)=>(<div key={i} style={{display:"flex",alignItems:"center",padding:"13px 16px",marginBottom:8,background:"white",borderRadius:14,border:"1px solid #eee"}}><div style={{flex:1}}><div style={{fontWeight:600,fontSize:14}}>{p.product}</div><div style={{fontSize:12,color:"#aaa",marginTop:2}}>{p.date?new Date(p.date).toLocaleDateString("fr-FR",{day:"numeric",month:"long",year:"numeric"}):""}</div></div><div style={{fontWeight:800,color:G,fontSize:16}}>{p.amount}€</div></div>))}</div>;
}

function CigaretteTab({ client, setClient }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({cigsBefore:client.cigsBefore||0,cigsNow:client.cigsNow||0,quitDate:client.quitDate||"",prixPaquet:client.prixPaquet||11});
  const save = () => { setClient({...client,...form}); setEditing(false); };
  const qd = client.quitDate?new Date(client.quitDate):null;
  const hours = qd?(Date.now()-qd)/3600000:0;
  const days = Math.floor(hours/24);
  const avoided = Math.max(0,Math.floor(((client.cigsBefore||0)-(client.cigsNow||0))*days));
  const saved = (avoided*((client.prixPaquet||11)/20)).toFixed(2);
  const pct = client.cigsBefore>0?Math.round(((client.cigsBefore-(client.cigsNow||0))/client.cigsBefore)*100):0;
  const nextM = HEALTH_MILESTONES.find(m=>m.hours>hours);
  const lastM = [...HEALTH_MILESTONES].reverse().find(m=>m.hours<=hours);
  const cs=150,r=54,cx=75,cy=75,circ=2*Math.PI*r;
  return (
    <div>
      <div style={{background:`linear-gradient(135deg,${G},${GL})`,borderRadius:16,padding:"16px 18px",color:CREAM,marginBottom:16,textAlign:"center"}}>
        <div style={{fontSize:13,opacity:0.8,marginBottom:4}}>Mon parcours sans tabac</div>
        <div style={{fontSize:15,fontWeight:700}}>{!client.quitDate?"Renseignez votre date de passage à la vape 👇":pct===100?"Vous avez arrêté totalement le tabac — félicitations ! 🏆":pct>=50?"La moitié du chemin est faite, continuez ! 🌟":"Vous avez fait le premier pas, c'est le plus important ! 🐊"}</div>
      </div>
      {client.quitDate&&client.cigsBefore>0&&(
        <div style={{display:"flex",gap:10,marginBottom:14}}>
          <div style={{background:"white",borderRadius:16,border:"1px solid #eee",flex:1,padding:"16px 12px",display:"flex",flexDirection:"column",alignItems:"center"}}>
            <svg width={cs} height={cs}><circle cx={cx} cy={cy} r={r} fill="none" stroke="#f0f0f0" strokeWidth={12}/><circle cx={cx} cy={cy} r={r} fill="none" stroke={pct===100?"#34C759":G} strokeWidth={12} strokeDasharray={circ} strokeDashoffset={circ*(1-pct/100)} strokeLinecap="round" transform={`rotate(-90 ${cx} ${cy})`}/><text x={cx} y={cy-8} textAnchor="middle" fontSize="26" fontWeight="900" fill={G}>{pct}%</text><text x={cx} y={cy+14} textAnchor="middle" fontSize="11" fill="#999">réduction</text></svg>
            <div style={{fontSize:12,color:"#777",textAlign:"center",marginTop:4}}>{client.cigsNow===0?"🎉 Zéro cigarette !":`${client.cigsNow} cig/j restantes`}</div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:8,flex:1}}>
            {[["🗓️",`${days}`,"jours","de vape"],["🚬",avoided.toLocaleString(),"cig.","évitées"],["💶",`${saved}€`,"","économisés"]].map(([icon,val,unit,label])=>(
              <div key={label} style={{background:"white",borderRadius:14,border:"1px solid #eee",padding:"12px 14px",flex:1,display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:22}}>{icon}</span>
                <div><div style={{fontWeight:900,fontSize:18,color:G}}>{val} <span style={{fontSize:12,fontWeight:500,color:"#aaa"}}>{unit}</span></div><div style={{fontSize:11,color:"#bbb"}}>{label}</div></div>
              </div>
            ))}
          </div>
        </div>
      )}
      {client.quitDate&&(<div style={{marginBottom:14}}>
        {lastM&&<div style={{background:"#edf7f1",border:"1.5px solid #9dd4b4",borderRadius:14,padding:"13px 16px",marginBottom:8,display:"flex",alignItems:"center",gap:12}}><span style={{fontSize:28}}>{lastM.icon}</span><div><div style={{fontWeight:700,fontSize:14,color:G}}>✓ {lastM.label}</div><div style={{fontSize:12,color:"#555"}}>{lastM.desc}</div></div></div>}
        {nextM&&<div style={{background:"#f9f9f9",border:"1.5px solid #eee",borderRadius:14,padding:"13px 16px",display:"flex",alignItems:"center",gap:12}}><span style={{fontSize:28,opacity:0.45}}>{nextM.icon}</span><div style={{flex:1}}><div style={{fontWeight:600,fontSize:13,color:"#777"}}>Prochain cap : {nextM.label}</div><div style={{fontSize:12,color:"#bbb"}}>{nextM.desc}</div><div style={{background:"#eee",borderRadius:6,height:5,marginTop:8,overflow:"hidden"}}><div style={{background:G,height:"100%",width:`${Math.min((hours/nextM.hours)*100,100)}%`,borderRadius:6}}/></div></div></div>}
      </div>)}
      <div onClick={()=>window.open("https://www.facebook.com/groups/jenefumeplus/","_blank")} style={{display:"flex",alignItems:"center",gap:14,padding:"14px 16px",marginBottom:12,background:"#E8F4FD",border:"1.5px solid #1877F2",borderRadius:14,cursor:"pointer"}}>
        <span style={{fontSize:26,flexShrink:0}}>💙</span>
        <div style={{flex:1}}><div style={{fontWeight:700,fontSize:14,color:"#1877F2"}}>Groupe d'entraide</div><div style={{fontSize:12,color:"#555",marginTop:2}}>Rejoignez "Je ne fume plus" sur Facebook</div></div>
        <span style={{fontSize:18,color:"#1877F2"}}>›</span>
      </div>
      {!editing?(<button onClick={()=>setEditing(true)} style={{width:"100%",padding:"13px",background:"white",border:`1.5px solid ${G}`,borderRadius:14,color:G,fontWeight:700,cursor:"pointer",fontSize:14}}>{client.quitDate?"✏️ Mettre à jour mes données":"➕ Commencer mon suivi"}</button>):(
        <div style={{background:"white",border:"1.5px solid #ddd",borderRadius:16,padding:18}}>
          <div style={{fontWeight:700,fontSize:14,marginBottom:14,color:G}}>Mon suivi tabac</div>
          {[{label:"📅 Date de passage à la vape",field:"quitDate",type:"date"},{label:"🚬 Cigarettes/jour avant",field:"cigsBefore",type:"number"},{label:"🚬 Cigarettes/jour aujourd'hui",field:"cigsNow",type:"number"},{label:"💶 Prix du paquet (€)",field:"prixPaquet",type:"number"}].map(f=>(
            <div key={f.field} style={{marginBottom:14}}>
              <div style={{fontSize:13,fontWeight:600,color:"#555",marginBottom:6}}>{f.label}</div>
              <input type={f.type} value={form[f.field]} onChange={e=>setForm({...form,[f.field]:f.type==="number"?parseInt(e.target.value)||0:e.target.value})} style={{width:"100%",padding:"10px 14px",borderRadius:10,border:"1.5px solid #ddd",fontSize:15,boxSizing:"border-box",outline:"none"}}/>
              {f.field==="cigsNow"&&form.cigsBefore>0&&<input type="range" min={0} max={form.cigsBefore} value={form.cigsNow} onChange={e=>setForm({...form,cigsNow:parseInt(e.target.value)})} style={{width:"100%",marginTop:8,accentColor:G}}/>}
            </div>
          ))}
          <div style={{display:"flex",gap:8}}><button onClick={save} style={{flex:1,padding:"11px",background:G,color:"white",border:"none",borderRadius:10,fontWeight:700,cursor:"pointer",fontSize:14}}>Enregistrer ✓</button><button onClick={()=>setEditing(false)} style={{padding:"11px 16px",background:"#f0f0f0",border:"none",borderRadius:10,cursor:"pointer",fontSize:13}}>Annuler</button></div>
        </div>
      )}
    </div>
  );
}

function ProfilTab({ client, setClient }) {
  const [editing, setEditing] = useState(null);
  const [inputVal, setInputVal] = useState("");
  const isFilled = ch=>(client[ch.field]||"").trim().length>3;
  const startEdit = ch=>{setEditing(ch.key);setInputVal(client[ch.field]||"");};
  const saveEdit = ch=>{setClient({...client,[ch.field]:inputVal,preferredChannel:ch.key});setEditing(null);};
  const setPref = ch=>{if(!isFilled(ch)){startEdit(ch);return;}setClient({...client,preferredChannel:ch.key});};
  return (
    <div>
      <div style={{fontSize:13,color:"#555",fontWeight:600,marginBottom:8}}>Ma boutique habituelle</div>
      <div style={{display:"flex",gap:8,marginBottom:20}}>
        {Object.values(STORES).map(s=>(<div key={s.key} onClick={()=>setClient({...client,store:s.key})} style={{flex:1,padding:"12px 8px",borderRadius:14,border:`2px solid ${client.store===s.key?s.color:"#eee"}`,background:client.store===s.key?`${s.color}18`:"white",cursor:"pointer",textAlign:"center"}}><div style={{fontSize:26}}>{s.icon}</div><div style={{fontWeight:700,fontSize:13,marginTop:4,color:client.store===s.key?s.color:"#444"}}>{s.name}</div>{client.store===s.key&&<div style={{color:s.color,fontWeight:800,fontSize:12,marginTop:5}}>✓ Ma boutique</div>}</div>))}
      </div>
      <div style={{fontSize:13,color:"#555",fontWeight:600,marginBottom:8}}>Mes coordonnées</div>
      {CLIENT_CHANNELS.map(ch=>{const filled=isFilled(ch),isPref=client.preferredChannel===ch.key,isEd=editing===ch.key;return(<div key={ch.key} style={{marginBottom:8,borderRadius:14,border:`2px solid ${isPref?ch.color:filled?"#ddd":"#f0f0f0"}`,background:isPref?`${ch.color}14`:"white",overflow:"hidden"}}><div onClick={()=>!isEd&&setPref(ch)} style={{display:"flex",alignItems:"center",padding:"12px 16px",cursor:"pointer"}}><span style={{fontSize:20,marginRight:12}}>{ch.icon}</span><div style={{flex:1}}><div style={{fontWeight:600,fontSize:14,color:filled?"#222":"#bbb"}}>{ch.label}</div>{filled&&!isEd&&<div style={{fontSize:11,color:"#aaa",marginTop:1}}>{client[ch.field]}</div>}{!filled&&!isEd&&<div style={{fontSize:11,color:"#ccc",marginTop:1}}>Appuyer pour renseigner</div>}</div>{isPref&&<span style={{color:ch.color,fontWeight:800,fontSize:15,marginRight:8}}>✓</span>}{filled&&!isPref&&<span onClick={e=>{e.stopPropagation();startEdit(ch);}} style={{fontSize:11,color:"#aaa",padding:"3px 8px",border:"1px solid #ddd",borderRadius:8,cursor:"pointer"}}>Modifier</span>}{!filled&&<span style={{fontSize:18,color:ch.color,fontWeight:700}}>+</span>}</div>{isEd&&<div style={{padding:"0 14px 14px",borderTop:"1px solid #f5f5f5"}}><input autoFocus value={inputVal} onChange={e=>setInputVal(e.target.value)} placeholder={ch.placeholder} style={{width:"100%",padding:"10px 12px",borderRadius:10,border:`1.5px solid ${ch.color}`,fontSize:14,boxSizing:"border-box",outline:"none",marginTop:10}}/><div style={{display:"flex",gap:8,marginTop:8}}><button onClick={()=>saveEdit(ch)} style={{flex:1,padding:"10px",background:ch.color,color:"white",border:"none",borderRadius:10,fontWeight:700,cursor:"pointer",fontSize:13}}>Enregistrer ✓</button><button onClick={()=>setEditing(null)} style={{padding:"10px 14px",background:"#f0f0f0",border:"none",borderRadius:10,cursor:"pointer",fontSize:13}}>Annuler</button></div></div>}</div>);})}
    </div>
  );
}

function ContactEquipeTab({ client }) {
  const [sel, setSel] = useState(client.store||"chateau");
  const s = STORES[sel];
  const open = url=>window.open(url,"_blank");
  const msg = encodeURIComponent("Bonjour Barbavape ! 🐊");
  return (
    <div>
      <div style={{fontSize:13,color:"#555",fontWeight:600,marginBottom:8}}>Choisir une boutique</div>
      <div style={{display:"flex",gap:8,marginBottom:16}}>{Object.values(STORES).map(st=>(<div key={st.key} onClick={()=>setSel(st.key)} style={{flex:1,padding:"11px 8px",borderRadius:12,border:`2px solid ${sel===st.key?st.color:"#eee"}`,background:sel===st.key?`${st.color}18`:"white",cursor:"pointer",textAlign:"center"}}><div style={{fontSize:22}}>{st.icon}</div><div style={{fontWeight:700,fontSize:12,marginTop:3,color:sel===st.key?st.color:"#555"}}>{st.name}</div></div>))}</div>
      <div onClick={()=>open(`tel:${s.phone}`)} style={{display:"flex",alignItems:"center",padding:"14px 16px",marginBottom:12,background:"#FFF4E6",border:"1.5px solid #FF9500",borderRadius:14,cursor:"pointer"}}><span style={{fontSize:24,marginRight:14}}>📞</span><div style={{flex:1}}><div style={{fontWeight:700,fontSize:14,color:"#FF9500"}}>Appeler</div><div style={{fontSize:12,color:"#aaa",marginTop:2}}>{s.phone}</div></div><span style={{fontSize:22,color:"#FF9500"}}>›</span></div>
      <div style={{background:"white",border:"1.5px solid #eee",borderRadius:14,overflow:"hidden",marginBottom:10}}>
        {[{label:"WhatsApp",icon:"📱",color:"#25D366",url:`https://wa.me/33${s.whatsapp.substring(1)}?text=${msg}`},{label:"SMS",icon:"💬",color:"#34C759",url:`sms:${s.phone}`},{label:"Messenger",icon:"💙",color:"#0099FF",url:`https://m.me/${s.messenger}`}].map((ch,i,arr)=>(<div key={ch.label} onClick={()=>open(ch.url)} style={{display:"flex",alignItems:"center",padding:"14px 16px",borderBottom:i<arr.length-1?"1px solid #f5f5f5":"none",cursor:"pointer"}}><span style={{fontSize:22,marginRight:14}}>{ch.icon}</span><span style={{fontWeight:600,fontSize:14,flex:1}}>{ch.label}</span><span style={{color:ch.color,fontWeight:700,fontSize:13}}>Écrire ›</span></div>))}
      </div>
      <div onClick={()=>open(`mailto:${s.email}`)} style={{display:"flex",alignItems:"center",padding:"14px 16px",background:"#FFF0EF",border:"1.5px solid #FF3B30",borderRadius:14,cursor:"pointer"}}><span style={{fontSize:22,marginRight:14}}>✉️</span><div style={{flex:1}}><div style={{fontWeight:700,fontSize:14,color:"#FF3B30"}}>Email</div><div style={{fontSize:11,color:"#aaa",marginTop:1}}>{s.email}</div></div><span style={{fontSize:18,color:"#FF3B30"}}>›</span></div>
    </div>
  );
}

// ─── Vue Client ───────────────────────────────────────────────
function ClientView({ client, setClient, announcements, onLogout }) {
  const [tab, setTab] = useState("rewards");
  const tabs=[["rewards","🎁"],["history","🛒"],["cigs","🚬"],["profil","👤"],["equipe","📞"]];
  const labels={rewards:"Récompenses",history:"Achats",cigs:"Ma santé",profil:"Profil",equipe:"Contact"};
  return (
    <div style={{minHeight:"100vh",background:"#f2f2f7",fontFamily:"'Inter',system-ui,sans-serif",padding:"16px 12px 40px"}}>
      <div style={{maxWidth:430,margin:"0 auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <div style={{fontSize:12,color:"#aaa"}}>Bonjour, <strong style={{color:G}}>{client.name.split(" ")[0]}</strong> 👋</div>
          <button onClick={onLogout} style={{background:"none",border:"1px solid #ddd",borderRadius:10,padding:"5px 12px",fontSize:12,color:"#aaa",cursor:"pointer"}}>Déconnexion</button>
        </div>
        <AnnouncementBanner announcements={announcements}/>
        <BirthdayBanner client={client}/>
        {(!client.birthdate || client.birthdate === "0000-00-00") && <BirthdayPrompt client={client} setClient={setClient}/>}
        <LoyaltyCard client={client}/>
        <div style={{display:"flex",gap:2,margin:"12px 0",background:"#e8e8ec",borderRadius:12,padding:3}}>
          {tabs.map(([k,icon])=>(<button key={k} onClick={()=>setTab(k)} style={{flex:1,padding:"8px 2px",borderRadius:9,border:"none",cursor:"pointer",fontSize:tab===k?11:17,fontWeight:tab===k?700:400,background:tab===k?G:"transparent",color:tab===k?CREAM:"#888",lineHeight:1.2}} title={labels[k]}>{tab===k?labels[k]:icon}</button>))}
        </div>
        {tab==="rewards"&&<RewardsTab client={client}/>}
        {tab==="history"&&<HistoryTab client={client}/>}
        {tab==="cigs"&&<CigaretteTab client={client} setClient={setClient}/>}
        {tab==="profil"&&<ProfilTab client={client} setClient={setClient}/>}
        {tab==="equipe"&&<ContactEquipeTab client={client}/>}
        <SocialBar/>
      </div>
    </div>
  );
}

// ─── Gestion équipe ───────────────────────────────────────────
function GestionEquipe({ team, setTeam }) {
  const [showAdd, setShowAdd] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({firstName:"",lastName:"",phone:"",email:"",stores:["chateau"],role:"employee"});
  const [toast, setToast] = useState("");
  const showToast = msg=>{setToast(msg);setTimeout(()=>setToast(""),2500);};
  const resetForm = ()=>setForm({firstName:"",lastName:"",phone:"",email:"",stores:["chateau"],role:"employee"});
  const toggleStore = key=>setForm(f=>{const has=f.stores.includes(key);if(has&&f.stores.length===1)return f;return{...f,stores:has?f.stores.filter(s=>s!==key):[...f.stores,key]};});
  const saveUser = ()=>{
    if(!form.firstName||!form.phone) return;
    if(editId){setTeam(prev=>prev.map(u=>u.id===editId?{...u,...form}:u));showToast(`✅ ${form.firstName} ${form.lastName} mis à jour`);setEditId(null);}
    else{setTeam(prev=>[...prev,{id:Date.now(),...form,active:true}]);showToast(`✅ Accès créé pour ${form.firstName}`);setShowAdd(false);}
    resetForm();
  };
  const startEdit=u=>{setForm({firstName:u.firstName,lastName:u.lastName,phone:u.phone,email:u.email||"",stores:u.stores,role:u.role});setEditId(u.id);setShowAdd(false);};
  const toggleActive=u=>{setTeam(prev=>prev.map(m=>m.id===u.id?{...m,active:!m.active}:m));showToast(u.active?`🔒 ${fullName(u)} suspendu`:`🔓 ${fullName(u)} rétabli`);};
  const deleteUser=u=>{setTeam(prev=>prev.filter(m=>m.id!==u.id));showToast(`🗑️ ${fullName(u)} supprimé`);};

  const FormPanel=({title,onCancel})=>(
    <div style={{background:"white",borderRadius:16,border:`1.5px solid ${G}44`,padding:18,marginBottom:12}}>
      <div style={{fontWeight:800,fontSize:15,color:G,marginBottom:16}}>{title}</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
        {[{label:"Prénom *",field:"firstName",ph:"Camille"},{label:"Nom *",field:"lastName",ph:"Martin"},{label:"Téléphone *",field:"phone",ph:"0612345678"},{label:"Email",field:"email",ph:"camille@..."}].map(f=>(
          <div key={f.field}><div style={{fontSize:11,fontWeight:600,color:"#555",marginBottom:4}}>{f.label}</div><input value={form[f.field]} onChange={e=>setForm({...form,[f.field]:e.target.value})} placeholder={f.ph} style={{width:"100%",padding:"9px 11px",borderRadius:10,border:"1.5px solid #eee",fontSize:13,boxSizing:"border-box",outline:"none"}}/></div>
        ))}
      </div>
      <div style={{marginBottom:12}}>
        <div style={{fontSize:11,fontWeight:600,color:"#555",marginBottom:8}}>Boutique(s) accessible(s) *</div>
        <div style={{display:"flex",gap:8}}>
          {Object.values(STORES).map(s=>{const sel=form.stores.includes(s.key);return(<div key={s.key} onClick={()=>toggleStore(s.key)} style={{flex:1,padding:"12px 8px",borderRadius:12,border:`2px solid ${sel?s.color:"#eee"}`,background:sel?`${s.color}18`:"white",cursor:"pointer",textAlign:"center"}}><div style={{fontSize:24}}>{s.icon}</div><div style={{fontWeight:700,fontSize:12,marginTop:3,color:sel?s.color:"#666"}}>{s.name}</div>{sel&&<div style={{fontSize:10,color:s.color,marginTop:2,fontWeight:700}}>✓</div>}</div>);})}
        </div>
        <div style={{fontSize:11,color:"#aaa",marginTop:6}}>💡 Les deux = accès complet</div>
      </div>
      <div style={{marginBottom:14}}>
        <div style={{fontSize:11,fontWeight:600,color:"#555",marginBottom:8}}>Rôle</div>
        <div style={{display:"flex",gap:8}}>
          {[["employee","👤 Employé"],["owner","👑 Propriétaire"]].map(([r,l])=>(<div key={r} onClick={()=>setForm({...form,role:r})} style={{flex:1,padding:"9px",borderRadius:10,border:`2px solid ${form.role===r?G:"#eee"}`,background:form.role===r?`${G}12`:"white",cursor:"pointer",textAlign:"center",fontSize:13,fontWeight:form.role===r?700:400,color:form.role===r?G:"#666"}}>{l}</div>))}
        </div>
      </div>
      <div style={{display:"flex",gap:8}}>
        <button onClick={saveUser} disabled={!form.firstName||!form.phone} style={{flex:1,padding:"11px",background:form.firstName&&form.phone?G:"#ddd",color:"white",border:"none",borderRadius:12,fontWeight:700,cursor:"pointer",fontSize:14}}>{editId?"Enregistrer ✓":"Créer l'accès ✓"}</button>
        <button onClick={onCancel} style={{padding:"11px 16px",background:"#f0f0f0",border:"none",borderRadius:12,cursor:"pointer",fontSize:13}}>Annuler</button>
      </div>
    </div>
  );

  return (
    <div style={{position:"relative"}}>
      {toast&&<div style={{position:"fixed",top:20,left:"50%",transform:"translateX(-50%)",background:G,color:CREAM,padding:"10px 20px",borderRadius:30,fontWeight:600,fontSize:13,zIndex:999,boxShadow:"0 4px 20px rgba(0,0,0,0.2)",whiteSpace:"nowrap"}}>{toast}</div>}
      <div style={{background:`linear-gradient(135deg,${GD},${G})`,color:CREAM,padding:"16px 20px",borderRadius:16,marginBottom:16}}>
        <div style={{fontSize:10,opacity:0.6,letterSpacing:3,textTransform:"uppercase"}}>Gestion des accès</div>
        <div style={{fontSize:18,fontWeight:800,marginTop:2}}>Équipe Barbavape</div>
        <div style={{fontSize:12,opacity:0.65,marginTop:4}}>{team.filter(u=>u.active).length} membre(s) actif(s)</div>
      </div>
      {editId&&<FormPanel title="✏️ Modifier" onCancel={()=>{setEditId(null);resetForm();}}/>}
      {showAdd&&!editId&&<FormPanel title="➕ Nouveau membre" onCancel={()=>{setShowAdd(false);resetForm();}}/>}
      {team.map(u=>(
        <div key={u.id} style={{background:"white",borderRadius:16,border:`1.5px solid ${u.active?"#eee":"#ffd0d0"}`,padding:16,marginBottom:10}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <Avatar name={fullName(u)} size={46}/>
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                <span style={{fontWeight:800,fontSize:15}}>{fullName(u)}</span>
                {u.role==="owner"&&<span style={{background:GOLD+"33",color:"#a07000",padding:"2px 8px",borderRadius:10,fontSize:11,fontWeight:700}}>👑</span>}
                {u.active?<span style={{background:"#edf7f1",color:"#27ae60",padding:"2px 8px",borderRadius:10,fontSize:11,fontWeight:700}}>✓ Actif</span>:<span style={{background:"#ffeaea",color:"#FF3B30",padding:"2px 8px",borderRadius:10,fontSize:11,fontWeight:700}}>✗ Suspendu</span>}
              </div>
              <div style={{fontSize:12,color:"#aaa",marginTop:4}}>📱 {u.phone} {u.email&&`· ✉️ ${u.email}`}</div>
              <div style={{marginTop:6,display:"flex",gap:6,flexWrap:"wrap"}}>{u.stores.map(s=><StoreBadge key={s} storeKey={s} small/>)}</div>
            </div>
          </div>
          {u.role!=="owner"&&(
            <div style={{display:"flex",gap:8,marginTop:12}}>
              <button onClick={()=>startEdit(u)} style={{flex:1,padding:"8px",borderRadius:10,border:`1.5px solid ${G}`,cursor:"pointer",fontWeight:600,fontSize:12,background:"white",color:G}}>✏️ Modifier</button>
              <button onClick={()=>toggleActive(u)} style={{flex:1,padding:"8px",borderRadius:10,border:"none",cursor:"pointer",fontWeight:700,fontSize:12,background:u.active?"#FFF0EF":"#edf7f1",color:u.active?"#FF3B30":"#27ae60"}}>{u.active?"🔒 Suspendre":"🔓 Rétablir"}</button>
              {!u.active&&<button onClick={()=>deleteUser(u)} style={{padding:"8px 12px",borderRadius:10,border:"none",cursor:"pointer",fontWeight:700,fontSize:12,background:"#FF3B30",color:"white"}}>🗑️</button>}
            </div>
          )}
        </div>
      ))}
      {!showAdd&&!editId&&<button onClick={()=>setShowAdd(true)} style={{width:"100%",padding:"13px",background:"white",border:`1.5px solid ${G}`,borderRadius:14,color:G,fontWeight:700,cursor:"pointer",fontSize:14,marginTop:4}}>➕ Ajouter un membre</button>}
    </div>
  );
}

// ─── Chat Équipe ──────────────────────────────────────────────
function TeamChat({ currentUser, chatMessages, setChatMessages }) {
  const [msg, setMsg] = useState("");
  const bottomRef = React.useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const send = () => {
    if (!msg.trim()) return;
    setChatMessages(prev => [...prev, {
      id: Date.now(),
      author: fullName(currentUser),
      role: currentUser.role,
      text: msg.trim(),
      time: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
    }]);
    setMsg("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: 480 }}>
      <div style={{ background: `linear-gradient(135deg,${GD},${G})`, color: CREAM, padding: "14px 16px", borderRadius: 14, marginBottom: 12 }}>
        <div style={{ fontSize: 10, opacity: 0.6, letterSpacing: 3, textTransform: "uppercase" }}>Chat interne</div>
        <div style={{ fontSize: 16, fontWeight: 800, marginTop: 2 }}>💬 Équipe Barbavape</div>
        <div style={{ fontSize: 11, opacity: 0.6, marginTop: 2 }}>Visible uniquement par l'équipe</div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 8 }}>
        {chatMessages.length === 0 && (
          <div style={{ textAlign: "center", color: "#ccc", padding: "40px 20px", fontSize: 14 }}>
            Aucun message pour le moment.<br/>Démarrez la conversation ! 👋
          </div>
        )}
        {chatMessages.map(m => {
          const isMe = m.author === fullName(currentUser);
          return (
            <div key={m.id} style={{ display: "flex", flexDirection: isMe ? "row-reverse" : "row", gap: 8, marginBottom: 12, alignItems: "flex-end" }}>
              {!isMe && <Avatar name={m.author} size={32}/>}
              <div style={{ maxWidth: "72%" }}>
                {!isMe && <div style={{ fontSize: 11, color: "#aaa", marginBottom: 3, marginLeft: 2 }}>{m.author} {m.role === "owner" ? "👑" : ""}</div>}
                <div style={{ background: isMe ? G : "white", color: isMe ? CREAM : "#333", padding: "10px 14px", borderRadius: isMe ? "18px 18px 4px 18px" : "18px 18px 18px 4px", fontSize: 14, lineHeight: 1.5, border: isMe ? "none" : "1px solid #eee", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                  {m.text}
                </div>
                <div style={{ fontSize: 10, color: "#bbb", marginTop: 3, textAlign: isMe ? "right" : "left", marginRight: isMe ? 2 : 0, marginLeft: isMe ? 0 : 2 }}>{m.time}</div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef}/>
      </div>

      {/* Saisie */}
      <div style={{ display: "flex", gap: 8, paddingTop: 8, borderTop: "1px solid #eee" }}>
        <input value={msg} onChange={e => setMsg(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Votre message..." style={{ flex: 1, padding: "11px 14px", borderRadius: 24, border: "1.5px solid #ddd", fontSize: 14, outline: "none" }}/>
        <button onClick={send} disabled={!msg.trim()} style={{ background: msg.trim() ? G : "#ddd", color: "white", border: "none", borderRadius: 24, padding: "11px 18px", cursor: msg.trim() ? "pointer" : "default", fontWeight: 700, fontSize: 16 }}>➤</button>
      </div>
    </div>
  );
}
function AdminView({ clients, setClients, announcements, setAnnouncements, currentUser, team, setTeam, onLogout, chatMessages, setChatMessages }) {
  const isOwner = currentUser.role==="owner";
  const accessibleStores = currentUser.stores;
  const visibleClients = isOwner?clients:clients.filter(c=>accessibleStores.includes(c.store));
  const [tab, setTab] = useState("dashboard");
  const [sel, setSel] = useState(null);
  const [search, setSearch] = useState("");
  const [storeFilter, setStoreFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [addPts, setAddPts] = useState("");
  const [template, setTemplate] = useState(null);
  const [customMsg, setCustomMsg] = useState("");
  const [msgStore, setMsgStore] = useState("all");
  const [toast, setToast] = useState("");
  const showToast=msg=>{setToast(msg);setTimeout(()=>setToast(""),2500);};
  const doAddPoints=()=>{const n=parseInt(addPts);if(!n||n<=0)return;setClients(prev=>prev.map(c=>c.id===sel.id?{...c,points:(c.points||0)+n}:c));setSel(prev=>({...prev,points:(prev.points||0)+n}));setAddPts("");showToast(`+${n} points ajoutés à ${sel.name} ✓`);};
  const giveWelcome=c=>{setClients(prev=>prev.map(cl=>cl.id===c.id?{...cl,points:(cl.points||0)+WELCOME_BONUS,welcomeGiven:true}:cl));setSel(prev=>({...prev,points:(prev.points||0)+WELCOME_BONUS,welcomeGiven:true}));showToast(`🎁 ${WELCOME_BONUS} pts offerts !`);};
  const sendMsg=(c,ch)=>{const txt=template?encodeURIComponent(template.id===5?customMsg:template.text(c.name,c.points)):"";window.open(txt?ch.getMsgUrl(c,txt):ch.getUrl(c),"_blank");showToast(`Ouverture ${ch.label}`);};
  const selData=sel?(clients.find(c=>c.id===sel.id)||sel):null;
  const getFiltered=()=>visibleClients.filter(c=>{const mS=c.name.toLowerCase().includes(search.toLowerCase())||(c.phone||"").includes(search);const mStore=!isOwner||storeFilter==="all"||c.store===storeFilter;return mS&&mStore;}).sort((a,b)=>{if(sortBy==="level")return(b.points||0)-(a.points||0);if(sortBy==="lastpurchase")return lastPurchaseDate(b)-lastPurchaseDate(a);if(sortBy==="absent")return daysSince(b)-daysSince(a);return(a.name||"").localeCompare(b.name||"");});
  const tabs=[["dashboard","📊","Tableau"],["clients","👥","Clients"],["messages","💌","Messages"],["annonces","📢","Annonces"],["chat","💬","Chat"],...(isOwner?[["equipe","🔑","Équipe"]]:[])];;

  return (
    <div style={{minHeight:"100vh",background:"#f2f2f7",fontFamily:"'Inter',system-ui,sans-serif",padding:"16px 12px 40px"}}>
      <div style={{maxWidth:480,margin:"0 auto",position:"relative"}}>
        {toast&&<div style={{position:"fixed",top:20,left:"50%",transform:"translateX(-50%)",background:G,color:CREAM,padding:"10px 20px",borderRadius:30,fontWeight:600,fontSize:13,zIndex:999,boxShadow:"0 4px 20px rgba(0,0,0,0.2)",whiteSpace:"nowrap"}}>{toast}</div>}
        <div style={{background:`linear-gradient(135deg,${GD},${G})`,color:CREAM,padding:"18px 20px",borderRadius:18,marginBottom:14}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <div>
              <div style={{fontSize:10,opacity:0.55,letterSpacing:3,textTransform:"uppercase"}}>Espace Admin</div>
              <div style={{fontSize:20,fontWeight:800,marginTop:2}}>Barbavape 🐊</div>
              <div style={{fontSize:12,opacity:0.7,marginTop:4}}>{isOwner?"👑 ":"👤 "}{fullName(currentUser)}</div>
            </div>
            <button onClick={onLogout} style={{background:"rgba(255,255,255,0.15)",border:"1px solid rgba(255,255,255,0.3)",color:CREAM,padding:"6px 12px",borderRadius:10,cursor:"pointer",fontSize:12,fontWeight:600}}>Déconnexion</button>
          </div>
          <div style={{display:"flex",gap:8,marginTop:10}}>
            {Object.values(STORES).filter(s=>isOwner||accessibleStores.includes(s.key)).map(s=>(<div key={s.key} style={{background:`${s.color}33`,border:`1px solid ${s.color}66`,borderRadius:8,padding:"4px 10px",fontSize:11,fontWeight:600}}>{s.icon} {s.short} · {clients.filter(c=>c.store===s.key).length}</div>))}
          </div>
        </div>
        <div style={{display:"flex",gap:2,background:"#e8e8ec",borderRadius:12,padding:3,marginBottom:14}}>
          {tabs.map(([k,icon,label])=>(<button key={k} onClick={()=>{setTab(k);setSel(null);}} style={{flex:1,padding:"9px 2px",borderRadius:9,border:"none",cursor:"pointer",fontSize:tab===k?10:17,fontWeight:tab===k?700:400,background:tab===k?G:"transparent",color:tab===k?CREAM:"#666",lineHeight:1.3}}>{tab===k?label:icon}</button>))}
        </div>

        {tab==="dashboard"&&(<div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>{[["👥","Clients",visibleClients.length],["⭐","Points",visibleClients.reduce((s,c)=>s+(c.points||0),0).toLocaleString()],["🛒","Achats",visibleClients.reduce((s,c)=>s+(c.purchases||[]).length,0)],["🏆","Gold ou +",visibleClients.filter(c=>(c.points||0)>=500).length]].map(([icon,label,val])=>(<div key={label} style={{background:"white",border:"1px solid #eee",borderRadius:14,padding:"16px 14px",textAlign:"center"}}><div style={{fontSize:26,marginBottom:4}}>{icon}</div><div style={{fontSize:24,fontWeight:900,color:G}}>{val}</div><div style={{fontSize:11,color:"#999",marginTop:2}}>{label}</div></div>))}</div>
          {visibleClients.slice(0,20).map(c=>{const lvl=getLevel(c.points||0),d=daysSince(c);return(<div key={c.id} onClick={()=>{setSel(c);setTab("clients");}} style={{display:"flex",alignItems:"center",padding:"13px 16px",marginBottom:8,background:"white",borderRadius:14,border:"1px solid #eee",cursor:"pointer"}}><Avatar name={c.name}/><div style={{flex:1,marginLeft:12}}><div style={{fontWeight:600,fontSize:14}}>{c.name}</div><div style={{fontSize:12,color:"#aaa",marginTop:2}}>{c.points||0} pts · <span style={{color:absentColor(d)}}>⏳ {absentLabel(d)}</span></div></div><div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4}}><span style={{background:lvl.color,color:"#111",padding:"3px 10px",borderRadius:12,fontSize:11,fontWeight:700}}>{lvl.name}</span><StoreBadge storeKey={c.store} small/></div></div>);})}
        </div>)}

        {tab==="clients"&&!selData&&(<div>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Nom ou téléphone..." style={{width:"100%",padding:"12px 16px",borderRadius:14,border:"1.5px solid #ddd",fontSize:14,boxSizing:"border-box",marginBottom:10,outline:"none"}}/>
          {isOwner&&<div style={{display:"flex",gap:6,marginBottom:10}}>{[["all","Tous"],["chateau","🏰 Château"],["ecommoy","🛒 Ecommoy"]].map(([k,l])=>(<button key={k} onClick={()=>setStoreFilter(k)} style={{padding:"7px 12px",borderRadius:20,border:"none",cursor:"pointer",fontSize:11,fontWeight:storeFilter===k?700:500,background:storeFilter===k?G:"#eee",color:storeFilter===k?CREAM:"#555"}}>{l}</button>))}</div>}
          <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:14}}>{[["name","🔤 Nom"],["level","🏆 Statut"],["lastpurchase","🛒 Dernier achat"],["absent","⏳ Non-venu"]].map(([k,l])=>(<button key={k} onClick={()=>setSortBy(k)} style={{padding:"7px 13px",borderRadius:20,border:`1.5px solid ${sortBy===k?G:"#ddd"}`,cursor:"pointer",fontSize:12,fontWeight:sortBy===k?700:400,background:sortBy===k?G:"white",color:sortBy===k?CREAM:"#666"}}>{l}</button>))}</div>
          {getFiltered().length===0&&<div style={{textAlign:"center",color:"#bbb",padding:32}}>Aucun client trouvé</div>}
          {getFiltered().map(c=>{const lvl=getLevel(c.points||0),d=daysSince(c);return(          <div key={c.id} onClick={()=>setSel(c)} style={{display:"flex",alignItems:"center",padding:"14px 16px",marginBottom:8,background:"white",borderRadius:14,border:"1px solid #eee",cursor:"pointer"}}>
            <Avatar name={c.name}/>
            <div style={{flex:1,marginLeft:12}}>
              <div style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontWeight:600,fontSize:14}}>{c.name}</span><StoreBadge storeKey={c.store} small/></div>
              <div style={{fontSize:12,color:"#aaa",marginTop:3}}>
                {c.points||0} pts · {c.phone}
                {calcAge(c.birthdate)!==null && <span style={{marginLeft:6}}>· 🎂 {calcAge(c.birthdate)} ans</span>}
              </div>
            </div>
            <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:5}}><span style={{background:lvl.color,color:"#111",padding:"3px 10px",borderRadius:12,fontSize:11,fontWeight:700}}>{lvl.name}</span><span style={{color:absentColor(d),fontSize:11,fontWeight:700}}>⏳ {absentLabel(d)}</span></div>
          </div>);})}
        </div>)}

        {tab==="clients"&&selData&&(()=>{const c=selData,lvl=getLevel(c.points||0),pref=ADMIN_CHANNELS.find(ch=>ch.key===c.preferredChannel),st=STORES[c.store];return(<div>
          <button onClick={()=>setSel(null)} style={{background:"none",border:"none",cursor:"pointer",color:G,fontWeight:700,fontSize:14,marginBottom:12,padding:0}}>‹ Retour</button>
          <div style={{background:`linear-gradient(135deg,${G},${GL})`,borderRadius:18,padding:20,color:CREAM,marginBottom:12}}>
            <div style={{display:"flex",justifyContent:"space-between"}}>
              <div>
                <div style={{fontSize:20,fontWeight:800}}>{c.name}</div>
                <div style={{fontSize:12,opacity:0.65,marginTop:4}}>
                  {c.phone}{c.email&&` · ${c.email}`}
                  {calcAge(c.birthdate)!==null && <span> · 🎂 {calcAge(c.birthdate)} ans</span>}
                </div>
                {st&&<div style={{marginTop:8,display:"inline-block",background:`${st.color}33`,border:`1px solid ${st.color}66`,borderRadius:14,padding:"4px 12px",fontSize:12,fontWeight:700}}>{st.icon} {st.name}</div>}
              </div>
              <div style={{background:lvl.color,color:"#111",padding:"5px 14px",borderRadius:18,fontWeight:800,fontSize:12}}>{lvl.name}</div>
            </div>
            <div style={{fontSize:36,fontWeight:900,marginTop:14}}>{(c.points||0).toLocaleString()} <span style={{fontSize:15,fontWeight:400,opacity:0.7}}>pts</span></div>
          </div>
          <div style={{background:"white",borderRadius:14,border:"1px solid #eee",padding:16,marginBottom:10}}><div style={{fontWeight:700,marginBottom:10,fontSize:14}}>➕ Ajouter des points</div><div style={{display:"flex",gap:8}}><input type="number" value={addPts} onChange={e=>setAddPts(e.target.value)} placeholder="Montant achat (€)" style={{flex:1,padding:"10px 14px",borderRadius:10,border:"1.5px solid #ddd",fontSize:14,outline:"none"}}/><button onClick={doAddPoints} style={{background:addPts&&parseInt(addPts)>0?G:"#ccc",color:"white",border:"none",borderRadius:10,padding:"10px 16px",cursor:"pointer",fontWeight:700,fontSize:14}}>+{addPts?Math.max(0,parseInt(addPts)||0):0} pts</button></div><div style={{fontSize:11,color:"#bbb",marginTop:6}}>1€ = 1 point</div>{!c.welcomeGiven&&<button onClick={()=>giveWelcome(c)} style={{width:"100%",marginTop:10,padding:"11px",background:`linear-gradient(135deg,${GOLD},#e0a830)`,color:"#111",border:"none",borderRadius:10,fontWeight:800,cursor:"pointer",fontSize:14}}>🎁 Offrir les 50 pts de bienvenue</button>}{c.welcomeGiven&&<div style={{marginTop:10,padding:"9px 14px",background:"#f0faf4",borderRadius:10,fontSize:12,color:"#555"}}>✅ Cadeau de bienvenue déjà offert</div>}</div>
          <div style={{background:"white",borderRadius:14,border:"1px solid #eee",padding:16,marginBottom:10}}><div style={{fontWeight:700,marginBottom:10,fontSize:14}}>💬 Contacter</div>{pref&&<button onClick={()=>sendMsg(c,pref)} style={{width:"100%",padding:"13px",background:pref.color,color:"white",border:"none",borderRadius:12,fontWeight:700,cursor:"pointer",fontSize:14,marginBottom:10}}>{pref.icon} {pref.label} (canal préféré)</button>}<div style={{display:"flex",flexWrap:"wrap",gap:8}}>{ADMIN_CHANNELS.filter(ch=>ch.key!==c.preferredChannel).map(ch=>(<button key={ch.key} onClick={()=>sendMsg(c,ch)} style={{padding:"8px 14px",background:"white",border:`1.5px solid ${ch.color}`,borderRadius:10,cursor:"pointer",fontSize:13,color:ch.color,fontWeight:600}}>{ch.icon} {ch.label}</button>))}</div></div>
          <div style={{background:"white",borderRadius:14,border:"1px solid #eee",padding:16}}><div style={{fontWeight:700,marginBottom:10,fontSize:14}}>🛒 Historique</div>{(c.purchases||[]).length===0&&<div style={{color:"#bbb",fontSize:13}}>Aucun achat enregistré</div>}{(c.purchases||[]).map((p,i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:i<(c.purchases||[]).length-1?"1px solid #f0f0f0":"none"}}><div><div style={{fontSize:13,fontWeight:600}}>{p.product}</div><div style={{fontSize:11,color:"#bbb",marginTop:2}}>{p.date?new Date(p.date).toLocaleDateString("fr-FR",{day:"numeric",month:"long"}):""}</div></div><div style={{fontWeight:800,color:G}}>{p.amount}€</div></div>))}</div>
        </div>);})()}

        {tab==="messages"&&(<div>
          <div style={{fontSize:13,color:"#666",fontWeight:500,marginBottom:10}}>Choisir un message</div>
          {TEMPLATES.map(t=>(<div key={t.id} onClick={()=>{setTemplate(template?.id===t.id?null:t);setCustomMsg("");}} style={{padding:"13px 16px",marginBottom:8,background:template?.id===t.id?"#edf7f1":"white",borderRadius:14,border:`1.5px solid ${template?.id===t.id?"#9dd4b4":"#eee"}`,cursor:"pointer"}}><div style={{fontWeight:700,fontSize:14,marginBottom:4}}>{t.label}</div><div style={{fontSize:12,color:"#888",fontStyle:"italic"}}>{t.id!==5?t.text("(client)",0).substring(0,75)+"…":"Rédigez votre propre message"}</div></div>))}
          {template?.id===5&&<textarea value={customMsg} onChange={e=>setCustomMsg(e.target.value)} placeholder="Votre message ici..." rows={3} style={{width:"100%",padding:"12px 14px",borderRadius:14,border:"1.5px solid #ddd",fontSize:14,boxSizing:"border-box",marginBottom:10,resize:"vertical",outline:"none",fontFamily:"inherit"}}/>}
          {template&&(<div><div style={{display:"flex",alignItems:"center",gap:6,margin:"12px 0 10px",flexWrap:"wrap"}}><span style={{fontSize:13,fontWeight:700,color:G}}>Envoyer à :</span>{(isOwner?[["all","Tous"],["chateau","🏰 Château"],["ecommoy","🛒 Ecommoy"]]:accessibleStores.map(s=>[s,STORES[s].icon+" "+STORES[s].short])).map(([k,l])=>(<button key={k} onClick={()=>setMsgStore(k)} style={{padding:"5px 12px",borderRadius:16,border:"none",cursor:"pointer",fontSize:11,fontWeight:msgStore===k?700:500,background:msgStore===k?G:"#eee",color:msgStore===k?CREAM:"#555"}}>{l}</button>))}</div>{visibleClients.filter(c=>msgStore==="all"||c.store===msgStore).map(c=>{const pref=ADMIN_CHANNELS.find(ch=>ch.key===c.preferredChannel);const ready=template.id!==5||customMsg.trim().length>2;return(<div key={c.id} style={{display:"flex",alignItems:"center",padding:"12px 16px",marginBottom:8,background:"white",borderRadius:14,border:"1px solid #eee"}}><Avatar name={c.name} size={38}/><div style={{flex:1,marginLeft:12}}><div style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontWeight:600,fontSize:14}}>{c.name}</span><StoreBadge storeKey={c.store} small/></div><div style={{fontSize:11,color:"#aaa",marginTop:2}}>{pref?.icon} via {pref?.label}</div></div><button onClick={()=>ready&&pref&&sendMsg(c,pref)} style={{background:ready&&pref?(pref.color||G):"#ddd",color:"white",border:"none",borderRadius:10,padding:"9px 16px",cursor:"pointer",fontSize:13,fontWeight:700}}>Envoyer</button></div>);})}</div>)}
        </div>)}

        {tab==="annonces"&&(<div>
          <div style={{fontSize:13,color:"#666",marginBottom:12}}>Messages visibles par les clients à l'ouverture de l'app.</div>
          {[{id:1,store:"chateau",label:"🏰 Château-du-Loir",color:STORES.chateau.color},{id:2,store:"ecommoy",label:"🛒 Ecommoy",color:STORES.ecommoy.color},...(isOwner?[{id:3,store:"all",label:"🐊 Toutes les boutiques",color:G}]:[])].filter(item=>isOwner||accessibleStores.includes(item.store)).map(item=>{const ann=announcements.find(a=>a.id===item.id);return(<div key={item.id} style={{background:"white",borderRadius:16,border:`1.5px solid ${ann.active?item.color:"#eee"}`,padding:16,marginBottom:12}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}><div style={{fontWeight:700,fontSize:14,color:ann.active?item.color:"#444"}}>{item.label}</div><div onClick={()=>setAnnouncements(prev=>prev.map(a=>a.id===item.id?{...a,active:!a.active}:a))} style={{width:44,height:24,borderRadius:12,background:ann.active?item.color:"#ddd",cursor:"pointer",position:"relative"}}><div style={{position:"absolute",top:2,left:ann.active?22:2,width:20,height:20,borderRadius:10,background:"white",transition:"left 0.2s",boxShadow:"0 1px 4px rgba(0,0,0,0.2)"}}/></div></div><textarea value={ann.message} onChange={e=>setAnnouncements(prev=>prev.map(a=>a.id===item.id?{...a,message:e.target.value}:a))} placeholder="Ex: Fermeture exceptionnelle le 1er mai 🐊" rows={3} style={{width:"100%",padding:"10px 12px",borderRadius:10,border:`1.5px solid ${ann.active?item.color:"#ddd"}`,fontSize:13,boxSizing:"border-box",outline:"none",resize:"vertical",fontFamily:"inherit"}}/>{ann.active&&ann.message.trim()&&<div style={{marginTop:8,padding:"8px 12px",background:`${item.color}12`,borderRadius:10,fontSize:12,color:"#555"}}>✅ Visible par les clients</div>}{ann.active&&!ann.message.trim()&&<div style={{marginTop:8,padding:"8px 12px",background:"#fff3f3",borderRadius:10,fontSize:12,color:"#FF3B30"}}>⚠️ Rédigez un message pour l'activer</div>}</div>);})}
        </div>)}

        {tab==="chat"&&<TeamChat currentUser={currentUser} chatMessages={chatMessages} setChatMessages={setChatMessages}/>}
        {tab==="equipe"&&isOwner&&<GestionEquipe team={team} setTeam={setTeam}/>}
      </div>
    </div>
  );
}

// ─── App principale ───────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("home"); // home | clientLogin | client | teamLogin | admin
  const [clients, setClients] = useState(MOCK_CLIENTS);
  const [activeClient, setActiveClient] = useState(null);
  const [announcements, setAnnouncements] = useState(DEFAULT_ANNOUNCEMENTS);
  const [currentTeamUser, setCurrentTeamUser] = useState(null);
  const [team, setTeam] = useState(INITIAL_TEAM);
  const [chatMessages, setChatMessages] = useState([]);

  const handleClientLogin = user => {
    setActiveClient(user);
    setScreen("client");
  };

  const handleTeamLogin = user => {
    setCurrentTeamUser(user);
    setScreen("admin");
  };

  if (screen==="home") return (
    <HomeScreen
      onClientLogin={()=>setScreen("clientLogin")}
      onTeamLogin={()=>setScreen("teamLogin")}
    />
  );

  if (screen==="clientLogin") return (
    <OTPLogin
      title="Ma carte fidélité"
      subtitle="Connectez-vous avec votre numéro"
      icon="🐊"
      findUser={phone => clients.find(c=>c.phone.replace(/\s/g,"")===phone)}
      onLogin={handleClientLogin}
      onBack={()=>setScreen("home")}
    />
  );

  if (screen==="teamLogin") return (
    <OTPLogin
      title="Espace équipe"
      subtitle="Réservé à l'équipe Barbavape"
      icon="🔒"
      findUser={phone => team.find(u=>u.phone.replace(/\s/g,"")===phone && u.active)}
      onLogin={handleTeamLogin}
      onBack={()=>setScreen("home")}
    />
  );

  if (screen==="client" && activeClient) return (
    <ClientView
      client={activeClient}
      setClient={setActiveClient}
      announcements={announcements}
      onLogout={()=>setScreen("home")}
    />
  );

  if (screen==="admin" && currentTeamUser) return (
    <AdminView
      clients={clients}
      setClients={setClients}
      announcements={announcements}
      setAnnouncements={setAnnouncements}
      currentUser={currentTeamUser}
      team={team}
      setTeam={setTeam}
      onLogout={()=>setScreen("home")}
      chatMessages={chatMessages}
      setChatMessages={setChatMessages}
    />
  );

  return null;
}
