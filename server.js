// ═══════════════════════════════════════════════
//  KOTH SERVER v5
// ═══════════════════════════════════════════════
const express  = require('express');
const http     = require('http');
const { Server } = require('socket.io');
const path     = require('path');
const fs       = require('fs');
const crypto   = require('crypto');

const app    = express();
const server = http.createServer(app);
const io     = new Server(server,{cors:{origin:'*'},pingTimeout:20000,pingInterval:10000});

app.use(express.static(path.join(__dirname,'public')));
app.get('/',(req,res)=>{
  const pub=path.join(__dirname,'public','index.html');
  const root=path.join(__dirname,'index.html');
  if(fs.existsSync(pub))res.sendFile(pub);
  else if(fs.existsSync(root))res.sendFile(root);
  else res.send('KOTH läuft');
});
const PORT=process.env.PORT||3000;

// ── 80 Fragen – Fokus auf Chaos & Spaß ─────────
const QUESTIONS=[
  // 🔥 CHAOS (30 Fragen – der Kern des Spiels)
  {id:'c1', cat:'🔥 Chaos', text:'Wie viele Ausreden kennst du, warum man zu spät kommt?'},
  {id:'c2', cat:'🔥 Chaos', text:'Wie viele Dinge kann man verlieren, obwohl sie im Haus sind?'},
  {id:'c3', cat:'🔥 Chaos', text:'Wie viele Arten gibt es, "bin unterwegs" zu lügen?'},
  {id:'c4', cat:'🔥 Chaos', text:'Wie viele Gründe gibt es, ein Date abzubrechen?'},
  {id:'c5', cat:'🔥 Chaos', text:'Wie viele Dinge sagen Eltern, die keinen Sinn ergeben?'},
  {id:'c6', cat:'🔥 Chaos', text:'Wie viele Tiere würden dich in einem Kampf besiegen?'},
  {id:'c7', cat:'🔥 Chaos', text:'Wie viele Dinge riechen besser als sie schmecken?'},
  {id:'c8', cat:'🔥 Chaos', text:'Wie viele Gründe gibt es, das Handy nicht abzugeben?'},
  {id:'c9', cat:'🔥 Chaos', text:'Wie viele Dinge tust du, die du niemandem erzählst?'},
  {id:'c10',cat:'🔥 Chaos', text:'Wie viele Wege gibt es, eine Prüfung zu vergeigen?'},
  {id:'c11',cat:'🔥 Chaos', text:'Wie viele Dinge nerven dich täglich?'},
  {id:'c12',cat:'🔥 Chaos', text:'Wie viele Fast-Food-Ketten fallen dir ein?'},
  {id:'c13',cat:'🔥 Chaos', text:'Wie viele Schimpfwörter kennst du?'},
  {id:'c14',cat:'🔥 Chaos', text:'Wie viele seltsame Phobien gibt es?'},
  {id:'c15',cat:'🔥 Chaos', text:'Wie viele Dinge machst du, bevor du schlafen gehst?'},
  {id:'c16',cat:'🔥 Chaos', text:'Wie viele Dinge sagst du, die du nicht so meinst?'},
  {id:'c17',cat:'🔥 Chaos', text:'Wie viele Ausreden gibt es, nicht Sport zu machen?'},
  {id:'c18',cat:'🔥 Chaos', text:'Wie viele Dinge kaufst du, die du nie benutzt?'},
  {id:'c19',cat:'🔥 Chaos', text:'Wie viele Gründe gibt es, jemandem nicht zu antworten?'},
  {id:'c20',cat:'🔥 Chaos', text:'Wie viele Dinge lügst du täglich?'},
  {id:'c21',cat:'🔥 Chaos', text:'Wie viele Wörter benutzt du, die kein Mensch versteht?'},
  {id:'c22',cat:'🔥 Chaos', text:'Wie viele Gründe gibt es, einen Film abzubrechen?'},
  {id:'c23',cat:'🔥 Chaos', text:'Wie viele Dinge vergisst du immer wieder?'},
  {id:'c24',cat:'🔥 Chaos', text:'Wie viele Arten gibt es, jemandem zu schmeicheln?'},
  {id:'c25',cat:'🔥 Chaos', text:'Wie viele Rapper mit Tattoos kennst du?'},
  {id:'c26',cat:'🔥 Chaos', text:'Wie viele Wege gibt es, einen Streit zu gewinnen ohne Recht zu haben?'},
  {id:'c27',cat:'🔥 Chaos', text:'Wie viele Dinge machst du nur wenn niemand zuschaut?'},
  {id:'c28',cat:'🔥 Chaos', text:'Wie viele Gründe gibt es, nicht aufzuräumen?'},
  {id:'c29',cat:'🔥 Chaos', text:'Wie viele Dinge hast du heute schon aufgeschoben?'},
  {id:'c30',cat:'🔥 Chaos', text:'Wie viele Ausreden gibt es, kein Geld zu haben?'},
  // 💡 KREATIV (15 Fragen)
  {id:'k1', cat:'💡 Kreativ', text:'Nenne so viele Verwendungsmöglichkeiten für eine Büroklammer wie möglich'},
  {id:'k2', cat:'💡 Kreativ', text:'Nenne so viele gelbe Dinge wie möglich'},
  {id:'k3', cat:'💡 Kreativ', text:'Nenne so viele runde Dinge wie möglich'},
  {id:'k4', cat:'💡 Kreativ', text:'Nenne so viele Dinge die du auf eine einsame Insel mitnehmen würdest'},
  {id:'k5', cat:'💡 Kreativ', text:'Nenne so viele Dinge die leise sind wie möglich'},
  {id:'k6', cat:'💡 Kreativ', text:'Nenne so viele Dinge die man mit Käse machen kann'},
  {id:'k7', cat:'💡 Kreativ', text:'Nenne so viele Dinge die größer als ein Auto sind'},
  {id:'k8', cat:'💡 Kreativ', text:'Nenne so viele Dinge die man im Dunkeln tun kann'},
  {id:'k9', cat:'💡 Kreativ', text:'Nenne so viele Dinge die man nicht kaufen kann'},
  {id:'k10',cat:'💡 Kreativ', text:'Nenne so viele Dinge die nach Regen aussehen'},
  {id:'k11',cat:'💡 Kreativ', text:'Nenne so viele Gründe warum ein Hund besser ist als ein Mensch'},
  {id:'k12',cat:'💡 Kreativ', text:'Nenne so viele Dinge die man mit einer leeren Flasche tun kann'},
  {id:'k13',cat:'💡 Kreativ', text:'Nenne so viele Dinge die du nie einem Kind sagen würdest'},
  {id:'k14',cat:'💡 Kreativ', text:'Nenne so viele Dinge die schwerer sind als sie aussehen'},
  {id:'k15',cat:'💡 Kreativ', text:'Nenne so viele Dinge die man mit Klebeband reparieren kann'},
  // 🎯 POP KULTUR (15 Fragen)
  {id:'p1', cat:'🎯 Pop',    text:'Nenne so viele Marvel-Superhelden wie möglich'},
  {id:'p2', cat:'🎯 Pop',    text:'Nenne so viele Disney-Filme wie möglich'},
  {id:'p3', cat:'🎯 Pop',    text:'Nenne so viele Videospiele wie möglich'},
  {id:'p4', cat:'🎯 Pop',    text:'Nenne so viele Brettspiele wie möglich'},
  {id:'p5', cat:'🎯 Pop',    text:'Nenne so viele Netflix-Serien wie möglich'},
  {id:'p6', cat:'🎯 Pop',    text:'Nenne so viele Musikgenres wie möglich'},
  {id:'p7', cat:'🎯 Pop',    text:'Nenne so viele deutsche Rapper wie möglich'},
  {id:'p8', cat:'🎯 Pop',    text:'Nenne so viele Fußballclubs wie möglich'},
  {id:'p9', cat:'🎯 Pop',    text:'Nenne so viele Süßigkeiten-Marken wie möglich'},
  {id:'p10',cat:'🎯 Pop',    text:'Nenne so viele Fast-Food-Gerichte wie möglich'},
  {id:'p11',cat:'🎯 Pop',    text:'Nenne so viele Cocktails wie möglich'},
  {id:'p12',cat:'🎯 Pop',    text:'Nenne so viele Social-Media-Plattformen wie möglich'},
  {id:'p13',cat:'🎯 Pop',    text:'Nenne so viele YouTube-Genres wie möglich'},
  {id:'p14',cat:'🎯 Pop',    text:'Nenne so viele Sportarten wie möglich'},
  {id:'p15',cat:'🎯 Pop',    text:'Nenne so viele Länder in Europa wie möglich'},
  // 🌍 WISSEN (20 Fragen)
  {id:'w1', cat:'🌍 Wissen', text:'Nenne so viele Länder wie möglich'},
  {id:'w2', cat:'🌍 Wissen', text:'Nenne so viele Hauptstädte wie möglich'},
  {id:'w3', cat:'🌍 Wissen', text:'Nenne so viele Tiere wie möglich'},
  {id:'w4', cat:'🌍 Wissen', text:'Nenne so viele Sprachen wie möglich'},
  {id:'w5', cat:'🌍 Wissen', text:'Nenne so viele Organe wie möglich'},
  {id:'w6', cat:'🌍 Wissen', text:'Nenne so viele Planeten wie möglich'},
  {id:'w7', cat:'🌍 Wissen', text:'Nenne so viele Knochen wie möglich'},
  {id:'w8', cat:'🌍 Wissen', text:'Nenne so viele Elemente aus dem Periodensystem wie möglich'},
  {id:'w9', cat:'🌍 Wissen', text:'Nenne so viele Gebirge wie möglich'},
  {id:'w10',cat:'🌍 Wissen', text:'Nenne so viele Meereslebewesen wie möglich'},
  {id:'w11',cat:'🌍 Wissen', text:'Nenne so viele Berufe wie möglich'},
  {id:'w12',cat:'🌍 Wissen', text:'Nenne so viele Sportarten wie möglich'},
  {id:'w13',cat:'🌍 Wissen', text:'Nenne so viele Inseln wie möglich'},
  {id:'w14',cat:'🌍 Wissen', text:'Nenne so viele Flüsse der Welt wie möglich'},
  {id:'w15',cat:'🌍 Wissen', text:'Nenne so viele Vitamine wie möglich'},
  {id:'w16',cat:'🌍 Wissen', text:'Nenne alle Primzahlen unter 100'},
  {id:'w17',cat:'🌍 Wissen', text:'Nenne so viele Olympische Sportarten wie möglich'},
  {id:'w18',cat:'🌍 Wissen', text:'Nenne so viele Formel-1-Teams wie möglich'},
  {id:'w19',cat:'🌍 Wissen', text:'Nenne so viele medizinische Fachgebiete wie möglich'},
  {id:'w20',cat:'🌍 Wissen', text:'Nenne so viele Kleidungsstücke wie möglich'},
];

// Track used question IDs per room session
function getRandQ(excludeIds=[]){
  const pool=QUESTIONS.filter(q=>!excludeIds.includes(q.id));
  return (pool.length?pool:QUESTIONS)[Math.floor(Math.random()*(pool.length||QUESTIONS.length))];
}

const rooms={}, sessions={}, rateLimits={};

function genCode(){
  const c='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code,t=0;
  do{code=Array.from({length:5},()=>c[Math.floor(Math.random()*c.length)]).join('');}
  while(rooms[code]&&++t<20);
  return code;
}
function genToken(){return crypto.randomBytes(16).toString('hex');}
function sanitize(s){
  return String(s||'').replace(/<[^>]*>/g,'').replace(/[&<>"']/g,
    c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])).trim().slice(0,64);
}
function rateOk(sid,lim=8){
  const now=Date.now();
  if(!rateLimits[sid]||rateLimits[sid].resetAt<now)rateLimits[sid]={count:0,resetAt:now+1000};
  return ++rateLimits[sid].count<=lim;
}
function makePlayer(id,name,avatar,token){
  return{id,token,name:sanitize(name)||'Spieler',avatar:avatar||'😎',
    score:0,ready:false,hasAnswered:false,hasList:false,
    question:null,swappedQ:null,answer:null,list:[],
    connected:true,disconnectedAt:null};
}

function sanitizeRoom(r){
  return{
    code:r.code,phase:r.phase,hostId:r.hostId,
    round:r.round,maxRounds:r.maxRounds,
    answerTime:r.answerTime,listTime:r.listTime,timer:r.timer,
    players:r.players.map(p=>({
      id:p.id,name:p.name,avatar:p.avatar,score:p.score,
      ready:p.ready,hasAnswered:p.hasAnswered,hasList:p.hasList,connected:p.connected,
    })),
    reveals:['reveal','judge','scoreboard'].includes(r.phase)?r.reveals:null,
    roundScores:r.phase==='scoreboard'?r.roundScores:null,
    revealIdx:r.revealIdx||0,
    revealStep:r.revealStep||0,
    // Judge phase data
    judgeData:r.phase==='judge'?r.judgeData:null,
  };
}

function sendPrivate(r,sid){
  const p=r.players.find(p=>p.id===sid);if(!p)return;
  io.to(sid).emit('privateState',{
    question:p.question,swappedQ:p.swappedQ,
    answer:p.answer,list:p.list,
  });
}
function bcast(code){const r=rooms[code];if(!r)return;io.to(code).emit('roomState',sanitizeRoom(r));}
function bcastAll(r){bcast(r.code);r.players.forEach(p=>sendPrivate(r,p.id));}
function stopTimer(code){const r=rooms[code];if(!r)return;if(r._timer){clearInterval(r._timer);r._timer=null;}}
function startTimer(code,secs,onEnd){
  const r=rooms[code];if(!r)return;
  stopTimer(code);r.timer=secs;bcast(code);
  r._timer=setInterval(()=>{r.timer--;bcast(code);if(r.timer<=0){clearInterval(r._timer);r._timer=null;onEnd();}},1000);
}
function startCountdown(code,cb){
  const r=rooms[code];if(!r)return;
  r.phase='countdown';r.timer=3;bcast(code);
  let t=3;const iv=setInterval(()=>{t--;r.timer=t;bcast(code);if(t<=0){clearInterval(iv);cb();}},1000);
}
function cleanupRoom(code){
  const r=rooms[code];if(!r)return;
  stopTimer(code);
  for(const[tok,s]of Object.entries(sessions)){if(s.code===code)delete sessions[tok];}
  delete rooms[code];
}

// ── Phases ──────────────────────────────────────
function startRound(code){
  const r=rooms[code];if(!r)return;
  r.round++;r.reveals=null;r.roundScores={};r.judgeData=null;
  r.revealIdx=0;r.revealStep=0;
  // Track used questions to avoid repeats
  if(!r.usedQIds)r.usedQIds=[];
  const used=[...r.usedQIds];
  r.players.forEach(p=>{
    const q=getRandQ(used);used.push(q.id);
    p.question=q;p.swappedQ=null;p.answer=null;
    p.list=[];p.hasAnswered=false;p.hasList=false;
  });
  r.usedQIds=used;
  startCountdown(code,()=>{
    r.phase='question_phase';bcastAll(r);
    startTimer(code,r.answerTime||20,()=>{
      r.players.forEach(p=>{if(p.answer===null)p.answer=3;});
      startListPhase(code);
    });
  });
}

function startListPhase(code){
  const r=rooms[code];if(!r)return;
  r.phase='list_phase';
  const qs=r.players.map(p=>p.question);
  for(let i=qs.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[qs[i],qs[j]]=[qs[j],qs[i]];}
  r.players.forEach((p,i)=>{p.swappedQ=qs[i]?.id===p.question.id?qs[(i+1)%qs.length]:qs[i];});
  bcastAll(r);
  startTimer(code,r.listTime||60,()=>startReveal(code));
}

function startReveal(code){
  const r=rooms[code];if(!r)return;
  r.phase='reveal';r.revealIdx=0;r.revealStep=0;
  r.reveals=r.players.map(p=>({
    playerId:p.id,name:p.name,avatar:p.avatar,
    origQ:p.question,swappedQ:p.swappedQ,
    answer:p.answer,list:p.list,listCount:p.list.length,
    // thumbs down tracking per item: {itemIdx: [playerId,...]}
    thumbsDown:{},
  }));
  bcastAll(r);
  startTimer(code,Math.max(120,r.players.length*30),()=>startJudge(code));
}

// Judge phase: finalize thumbs-down results and calc scores
function startJudge(code){
  const r=rooms[code];if(!r)return;
  r.phase='judge';
  // Build judgeData: for each player's list, mark items as invalid if unanimously rejected
  r.judgeData=r.reveals.map(rev=>{
    const otherCount=r.players.length-1;
    const validList=rev.list.filter((_,i)=>{
      const downVotes=Object.keys(rev.thumbsDown[i]||{}).length;
      return otherCount===0||downVotes<otherCount; // needs ALL others to reject
    });
    return{playerId:rev.playerId,name:rev.name,avatar:rev.avatar,
      origList:rev.list,validList,
      answer:rev.answer,origQ:rev.origQ,swappedQ:rev.swappedQ};
  });
  bcastAll(r);
  // Auto-advance after 3s
  setTimeout(()=>calcScores(code),3000);
}

function calcScores(code){
  const r=rooms[code];if(!r)return;
  r.roundScores={};
  const judgeData=r.judgeData||r.reveals?.map(rev=>({...rev,validList:rev.list}));
  r.players.forEach(p=>{
    const jd=judgeData?.find(j=>j.playerId===p.id);
    const listed=(jd?.validList||p.list).length;
    const promised=Math.max(3,p.answer||3);
    let mult=1.0;
    if(promised>=20)mult=3.0;
    else if(promised>=10)mult=2.0;
    else if(promised>=5)mult=1.5;
    const accurate=listed>=promised;
    const base=listed;
    const accuracyBonus=accurate?Math.round(base*0.5):0;
    const total=Math.round(base*mult)+accuracyBonus;
    r.roundScores[p.id]={listed,promised,mult,accurate,basePts:Math.round(base*mult),accuracyBonus,total};
    p.score+=total;
  });
  r.phase='scoreboard';
  bcastAll(r);
  startTimer(code,18,()=>{
    if(r.round>=r.maxRounds)endGame(code);
    else startRound(code);
  });
}

function endGame(code){
  const r=rooms[code];if(!r)return;
  stopTimer(code);r.phase='ended';bcastAll(r);
}

// ── Socket events ────────────────────────────────
io.on('connection',socket=>{

  socket.on('createRoom',({name,avatar,maxRounds=3,answerTime=20,listTime=60})=>{
    if(!rateOk(socket.id,2))return;
    const code=genCode(),token=genToken();
    rooms[code]={code,phase:'lobby',hostId:socket.id,round:0,
      maxRounds:Math.max(1,Math.min(10,+maxRounds||3)),
      answerTime:Math.max(10,Math.min(60,+answerTime||20)),
      listTime:Math.max(30,Math.min(120,+listTime||60)),
      timer:0,players:[],reveals:null,roundScores:{},judgeData:null,
      _timer:null,revealIdx:0,revealStep:0,usedQIds:[]};
    rooms[code].players.push(makePlayer(socket.id,name,avatar,token));
    sessions[token]={code,name:sanitize(name),avatar};
    socket.join(code);socket.data.code=code;socket.data.token=token;
    socket.emit('joined',{code,playerId:socket.id,token});
    bcastAll(rooms[code]);
  });

  socket.on('joinRoom',({code,name,avatar,token})=>{
    if(!rateOk(socket.id,3))return;
    const r=rooms[code];
    if(!r)return socket.emit('err',{msg:'Raum nicht gefunden'});
    // Token reconnect
    if(token&&sessions[token]?.code===code){
      const ex=r.players.find(p=>p.token===token);
      if(ex){
        ex.id=socket.id;ex.connected=true;ex.disconnectedAt=null;
        socket.join(code);socket.data.code=code;socket.data.token=token;
        socket.emit('joined',{code,playerId:socket.id,token,reconnected:true});
        bcastAll(r);return;
      }
    }
    // Name reconnect fallback
    const cleanName=sanitize(name).slice(0,16);
    const exByName=r.players.find(p=>p.name===cleanName&&!p.connected);
    if(exByName){
      const nt=genToken();
      exByName.id=socket.id;exByName.connected=true;exByName.disconnectedAt=null;exByName.token=nt;
      sessions[nt]={code,name:cleanName,avatar:exByName.avatar};
      socket.join(code);socket.data.code=code;socket.data.token=nt;
      socket.emit('joined',{code,playerId:socket.id,token:nt,reconnected:true});
      bcastAll(r);return;
    }
    if(r.phase!=='lobby')return socket.emit('err',{msg:'Spiel läuft bereits'});
    if(r.players.length>=12)return socket.emit('err',{msg:'Raum voll'});
    const nt=genToken();
    r.players.push(makePlayer(socket.id,name,avatar,nt));
    sessions[nt]={code,name:sanitize(name),avatar};
    socket.join(code);socket.data.code=code;socket.data.token=nt;
    socket.emit('joined',{code,playerId:socket.id,token:nt});
    bcastAll(r);
  });

  socket.on('setReady',({ready})=>{
    if(!rateOk(socket.id))return;
    const r=rooms[socket.data.code];if(!r)return;
    const p=r.players.find(p=>p.id===socket.id);
    if(p){p.ready=!!ready;bcast(r.code);}
  });

  socket.on('updateSettings',({maxRounds,answerTime,listTime})=>{
    if(!rateOk(socket.id))return;
    const r=rooms[socket.data.code];
    if(!r||socket.id!==r.hostId)return;
    if(maxRounds!==undefined)r.maxRounds=Math.max(1,Math.min(10,+maxRounds));
    if(answerTime!==undefined)r.answerTime=Math.max(10,Math.min(60,+answerTime));
    if(listTime!==undefined)r.listTime=Math.max(30,Math.min(120,+listTime));
    bcast(r.code);
  });

  socket.on('startGame',()=>{
    if(!rateOk(socket.id,2))return;
    const r=rooms[socket.data.code];
    if(!r||socket.id!==r.hostId||r.phase!=='lobby')return;
    if(r.players.length<2)return socket.emit('err',{msg:'Min. 2 Spieler'});
    startRound(r.code);
  });

  socket.on('rematch',()=>{
    if(!rateOk(socket.id,2))return;
    const r=rooms[socket.data.code];
    if(!r||socket.id!==r.hostId)return;
    stopTimer(r.code);
    r.phase='lobby';r.round=0;r.reveals=null;r.roundScores={};r.judgeData=null;
    r.revealIdx=0;r.revealStep=0;r.usedQIds=[];
    r.players.forEach(p=>{
      p.score=0;p.ready=false;p.question=null;p.swappedQ=null;
      p.answer=null;p.list=[];p.hasAnswered=false;p.hasList=false;
    });
    bcast(r.code);
  });

  socket.on('kickPlayer',({targetId})=>{
    if(!rateOk(socket.id))return;
    const r=rooms[socket.data.code];
    if(!r||socket.id!==r.hostId||targetId===socket.id)return;
    r.players=r.players.filter(p=>p.id!==targetId);
    io.to(targetId).emit('kicked');bcast(r.code);
  });

  socket.on('submitAnswer',({value})=>{
    if(!rateOk(socket.id))return;
    const r=rooms[socket.data.code];
    if(!r||r.phase!=='question_phase')return;
    const p=r.players.find(p=>p.id===socket.id);
    if(!p||p.hasAnswered)return;
    p.answer=Math.max(3,Math.min(500,parseInt(value)||3));
    p.hasAnswered=true;bcast(r.code);sendPrivate(r,socket.id);
    if(r.players.every(p=>p.hasAnswered)){stopTimer(r.code);startListPhase(r.code);}
  });

  socket.on('submitList',({items})=>{
    if(!rateOk(socket.id))return;
    const r=rooms[socket.data.code];
    if(!r||r.phase!=='list_phase')return;
    const p=r.players.find(p=>p.id===socket.id);
    if(!p||p.hasList)return;
    const seen=new Set();
    p.list=(items||[]).map(s=>sanitize(s))
      .filter(s=>s.length>=2&&!seen.has(s.toLowerCase())&&seen.add(s.toLowerCase()))
      .slice(0,200);
    p.hasList=true;bcast(r.code);sendPrivate(r,socket.id);
    if(r.players.every(p=>p.hasList)){stopTimer(r.code);startReveal(r.code);}
  });

  // ── THUMBS DOWN – during reveal phase ──
  socket.on('thumbsDown',({targetPlayerId,itemIdx})=>{
    if(!rateOk(socket.id))return;
    const r=rooms[socket.data.code];
    if(!r||r.phase!=='reveal')return;
    if(targetPlayerId===socket.id)return; // can't vote own items
    const rev=r.reveals?.find(rv=>rv.playerId===targetPlayerId);
    if(!rev)return;
    if(itemIdx<0||itemIdx>=rev.list.length)return;
    if(!rev.thumbsDown[itemIdx])rev.thumbsDown[itemIdx]={};
    // Toggle: press again to remove
    if(rev.thumbsDown[itemIdx][socket.id]){
      delete rev.thumbsDown[itemIdx][socket.id];
    }else{
      rev.thumbsDown[itemIdx][socket.id]=true;
    }
    bcast(r.code);
  });

  socket.on('revealStep',({idx,step})=>{
    if(!rateOk(socket.id,4))return;
    const r=rooms[socket.data.code];
    if(!r||socket.id!==r.hostId||r.phase!=='reveal')return;
    const maxIdx=r.reveals?.length||0;
    if(typeof idx!=='number'||typeof step!=='number')return;
    if(idx<0||idx>maxIdx||step<0||step>3)return;
    r.revealIdx=idx;r.revealStep=step;
    socket.to(r.code).emit('revealStep',{idx,step});
    bcast(r.code);
  });

  socket.on('skipReveal',()=>{
    if(!rateOk(socket.id,2))return;
    const r=rooms[socket.data.code];
    if(!r||r.phase!=='reveal'||socket.id!==r.hostId)return;
    stopTimer(r.code);startJudge(r.code);
  });

  socket.on('disconnect',()=>{
    const code=socket.data.code;if(!code||!rooms[code])return;
    const r=rooms[code];
    const p=r.players.find(p=>p.id===socket.id);
    if(p){
      p.connected=false;p.disconnectedAt=Date.now();
      setTimeout(()=>{
        if(!rooms[code]||p.connected)return;
        r.players=r.players.filter(pl=>pl.id!==p.id);
        if(p.token)delete sessions[p.token];
        if(r.players.length===0){cleanupRoom(code);return;}
        if(r.hostId===p.id)r.hostId=r.players[0].id;
        bcast(code);
      },30000);
    }
    if(r.hostId===socket.id){
      const next=r.players.find(pl=>pl.connected&&pl.id!==socket.id);
      if(next)r.hostId=next.id;
    }
    bcast(code);delete rateLimits[socket.id];
  });
});

setInterval(()=>{
  const now=Date.now();
  for(const[code,r]of Object.entries(rooms)){
    if(r.players.length===0||(r.players.every(p=>!p.connected&&p.disconnectedAt&&(now-p.disconnectedAt)>120000)))
      cleanupRoom(code);
  }
},600000);

server.listen(PORT,'0.0.0.0',()=>console.log(`🎮 KOTH v5 Port ${PORT}`));
