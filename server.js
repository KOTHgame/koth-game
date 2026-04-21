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
  // 🔥 CHAOS (30)
  {id:'c1', cat:'🔥 Chaos', diff:'easy', text:'Wieviele Ausreden fallen dir ein, warum man zu spät kommt?'},
  {id:'c2', cat:'🔥 Chaos', diff:'easy', text:'Wieviele Dinge könntest du aufzählen, die man im Haus verlieren kann?'},
  {id:'c3', cat:'🔥 Chaos', diff:'easy', text:'Wieviele Wege fallen dir ein, "bin unterwegs" zu lügen?'},
  {id:'c4', cat:'🔥 Chaos', diff:'easy', text:'Wieviele Gründe könntest du nennen, ein Date abzubrechen?'},
  {id:'c5', cat:'🔥 Chaos', diff:'easy', text:'Wieviele Dinge könntest du aufzählen, die deine Eltern sagen die keinen Sinn ergeben?'},
  {id:'c6', cat:'🔥 Chaos', diff:'medium', text:'Wieviele Tiere könntest du aufzählen, die dich in einem Kampf besiegen würden?'},
  {id:'c7', cat:'🔥 Chaos', diff:'easy', text:'Wieviele Dinge fallen dir ein, die besser riechen als sie schmecken?'},
  {id:'c8', cat:'🔥 Chaos', diff:'easy', text:'Wieviele Gründe könntest du nennen, das Handy nicht abzugeben?'},
  {id:'c9', cat:'🔥 Chaos', diff:'medium', text:'Wieviele Dinge könntest du aufzählen, die du machst ohne es jemandem zu erzählen?'},
  {id:'c10',cat:'🔥 Chaos', diff:'easy', text:'Wieviele Wege fallen dir ein, eine Prüfung zu vergeigen?'},
  {id:'c11',cat:'🔥 Chaos', diff:'easy', text:'Wieviele Dinge könntest du aufzählen, die dich täglich nerven?'},
  {id:'c12',cat:'🔥 Chaos', diff:'easy', text:'Wieviele Fast-Food-Ketten könntest du aufzählen?'},
  {id:'c13',cat:'🔥 Chaos', diff:'easy', text:'Wieviele Schimpfwörter fallen dir ein?'},
  {id:'c14',cat:'🔥 Chaos', diff:'hard', text:'Wieviele seltsame Phobien könntest du aufzählen?'},
  {id:'c15',cat:'🔥 Chaos', diff:'easy', text:'Wieviele Dinge könntest du aufzählen, die du vor dem Schlafen machst?'},
  {id:'c16',cat:'🔥 Chaos', diff:'easy', text:'Wieviele Dinge fallen dir ein, die du sagst ohne sie so zu meinen?'},
  {id:'c17',cat:'🔥 Chaos', diff:'easy', text:'Wieviele Ausreden könntest du nennen, nicht Sport zu machen?'},
  {id:'c18',cat:'🔥 Chaos', diff:'medium', text:'Wieviele Dinge könntest du aufzählen, die du kaufst aber nie benutzt?'},
  {id:'c19',cat:'🔥 Chaos', diff:'easy', text:'Wieviele Gründe fallen dir ein, jemandem nicht zu antworten?'},
  {id:'c20',cat:'🔥 Chaos', diff:'medium', text:'Wieviele Dinge könntest du aufzählen, bei denen du täglich lügst?'},
  {id:'c21',cat:'🔥 Chaos', diff:'hard', text:'Wieviele Wörter fallen dir ein, die kein Mensch versteht?'},
  {id:'c22',cat:'🔥 Chaos', diff:'easy', text:'Wieviele Gründe könntest du nennen, einen Film abzubrechen?'},
  {id:'c23',cat:'🔥 Chaos', diff:'easy', text:'Wieviele Dinge könntest du aufzählen, die du immer wieder vergisst?'},
  {id:'c24',cat:'🔥 Chaos', diff:'medium', text:'Wieviele Arten könntest du nennen, jemandem zu schmeicheln?'},
  {id:'c25',cat:'🔥 Chaos', diff:'medium', text:'Wieviele Rapper mit Tattoos könntest du aufzählen?'},
  {id:'c26',cat:'🔥 Chaos', diff:'hard', text:'Wieviele Wege fallen dir ein, einen Streit zu gewinnen ohne Recht zu haben?'},
  {id:'c27',cat:'🔥 Chaos', diff:'medium', text:'Wieviele Dinge könntest du aufzählen, die du nur machst wenn niemand zuschaut?'},
  {id:'c28',cat:'🔥 Chaos', diff:'easy', text:'Wieviele Gründe könntest du nennen, nicht aufzuräumen?'},
  {id:'c29',cat:'🔥 Chaos', diff:'easy', text:'Wieviele Dinge könntest du aufzählen, die du heute schon aufgeschoben hast?'},
  {id:'c30',cat:'🔥 Chaos', diff:'easy', text:'Wieviele Ausreden fallen dir ein, kein Geld zu haben?'},
  // 💡 KREATIV (15)
  {id:'k1', cat:'💡 Kreativ', diff:'medium', text:'Wieviele Verwendungsmöglichkeiten für eine Büroklammer könntest du aufzählen?'},
  {id:'k2', cat:'💡 Kreativ', diff:'easy',   text:'Wieviele gelbe Dinge könntest du aufzählen?'},
  {id:'k3', cat:'💡 Kreativ', diff:'easy',   text:'Wieviele runde Dinge fallen dir ein?'},
  {id:'k4', cat:'💡 Kreativ', diff:'easy',   text:'Wieviele Dinge könntest du auf eine einsame Insel mitnehmen?'},
  {id:'k5', cat:'💡 Kreativ', diff:'medium', text:'Wieviele leise Dinge könntest du aufzählen?'},
  {id:'k6', cat:'💡 Kreativ', diff:'medium', text:'Wieviele Dinge könnte man mit Käse machen?'},
  {id:'k7', cat:'💡 Kreativ', diff:'medium', text:'Wieviele Dinge könntest du aufzählen, die größer als ein Auto sind?'},
  {id:'k8', cat:'💡 Kreativ', diff:'medium', text:'Wieviele Dinge fallen dir ein, die man im Dunkeln tun kann?'},
  {id:'k9', cat:'💡 Kreativ', diff:'hard',   text:'Wieviele Dinge könntest du aufzählen, die man nicht kaufen kann?'},
  {id:'k10',cat:'💡 Kreativ', diff:'hard',   text:'Wieviele Dinge nach Regen könntest du beschreiben?'},
  {id:'k11',cat:'💡 Kreativ', diff:'medium', text:'Wieviele Gründe könntest du nennen, warum ein Hund besser ist als ein Mensch?'},
  {id:'k12',cat:'💡 Kreativ', diff:'easy',   text:'Wieviele Dinge könnte man mit einer leeren Flasche tun?'},
  {id:'k13',cat:'💡 Kreativ', diff:'hard',   text:'Wieviele Dinge könntest du aufzählen, die du nie einem Kind sagen würdest?'},
  {id:'k14',cat:'💡 Kreativ', diff:'medium', text:'Wieviele Dinge fallen dir ein, die schwerer sind als sie aussehen?'},
  {id:'k15',cat:'💡 Kreativ', diff:'easy',   text:'Wieviele Dinge könnte man mit Klebeband reparieren?'},
  // 🎯 POP KULTUR (15)
  {id:'p1', cat:'🎯 Pop',    diff:'easy',   text:'Wieviele Marvel-Superhelden könntest du aufzählen?'},
  {id:'p2', cat:'🎯 Pop',    diff:'easy',   text:'Wieviele Disney-Filme könntest du aufzählen?'},
  {id:'p3', cat:'🎯 Pop',    diff:'easy',   text:'Wieviele Videospiele könntest du aufzählen?'},
  {id:'p4', cat:'🎯 Pop',    diff:'easy',   text:'Wieviele Brettspiele könntest du aufzählen?'},
  {id:'p5', cat:'🎯 Pop',    diff:'medium', text:'Wieviele Netflix-Serien könntest du aufzählen?'},
  {id:'p6', cat:'🎯 Pop',    diff:'medium', text:'Wieviele Musikgenres könntest du aufzählen?'},
  {id:'p7', cat:'🎯 Pop',    diff:'medium', text:'Wieviele deutsche Rapper könntest du aufzählen?'},
  {id:'p8', cat:'🎯 Pop',    diff:'easy',   text:'Wieviele Fußballclubs könntest du aufzählen?'},
  {id:'p9', cat:'🎯 Pop',    diff:'easy',   text:'Wieviele Süßigkeiten-Marken könntest du aufzählen?'},
  {id:'p10',cat:'🎯 Pop',    diff:'easy',   text:'Wieviele Fast-Food-Gerichte könntest du aufzählen?'},
  {id:'p11',cat:'🎯 Pop',    diff:'medium', text:'Wieviele Cocktails könntest du aufzählen?'},
  {id:'p12',cat:'🎯 Pop',    diff:'easy',   text:'Wieviele Social-Media-Plattformen könntest du aufzählen?'},
  {id:'p13',cat:'🎯 Pop',    diff:'medium', text:'Wieviele YouTube-Genres könntest du aufzählen?'},
  {id:'p14',cat:'🎯 Pop',    diff:'easy',   text:'Wieviele Sportarten könntest du aufzählen?'},
  {id:'p15',cat:'🎯 Pop',    diff:'medium', text:'Wieviele Länder in Europa könntest du aufzählen?'},
  // 🌍 WISSEN (20)
  {id:'w1', cat:'🌍 Wissen', diff:'easy',   text:'Wieviele Länder der Welt könntest du aufzählen?'},
  {id:'w2', cat:'🌍 Wissen', diff:'medium', text:'Wieviele Hauptstädte könntest du aufzählen?'},
  {id:'w3', cat:'🌍 Wissen', diff:'easy',   text:'Wieviele Tiere könntest du aufzählen?'},
  {id:'w4', cat:'🌍 Wissen', diff:'medium', text:'Wieviele Sprachen der Welt könntest du aufzählen?'},
  {id:'w5', cat:'🌍 Wissen', diff:'medium', text:'Wieviele Organe des menschlichen Körpers könntest du aufzählen?'},
  {id:'w6', cat:'🌍 Wissen', diff:'easy',   text:'Wieviele Planeten und Monde könntest du aufzählen?'},
  {id:'w7', cat:'🌍 Wissen', diff:'hard',   text:'Wieviele Knochen des menschlichen Körpers könntest du aufzählen?'},
  {id:'w8', cat:'🌍 Wissen', diff:'hard',   text:'Wieviele Elemente aus dem Periodensystem könntest du aufzählen?'},
  {id:'w9', cat:'🌍 Wissen', diff:'hard',   text:'Wieviele Gebirge der Welt könntest du aufzählen?'},
  {id:'w10',cat:'🌍 Wissen', diff:'medium', text:'Wieviele Meereslebewesen könntest du aufzählen?'},
  {id:'w11',cat:'🌍 Wissen', diff:'easy',   text:'Wieviele Berufe könntest du aufzählen?'},
  {id:'w12',cat:'🌍 Wissen', diff:'easy',   text:'Wieviele Sportarten könntest du aufzählen?'},
  {id:'w13',cat:'🌍 Wissen', diff:'medium', text:'Wieviele Inseln der Welt könntest du aufzählen?'},
  {id:'w14',cat:'🌍 Wissen', diff:'medium', text:'Wieviele Flüsse der Welt könntest du aufzählen?'},
  {id:'w15',cat:'🌍 Wissen', diff:'hard',   text:'Wieviele Vitamine könntest du aufzählen?'},
  {id:'w16',cat:'🌍 Wissen', diff:'hard',   text:'Wieviele Primzahlen unter 100 könntest du aufzählen?'},
  {id:'w17',cat:'🌍 Wissen', diff:'medium', text:'Wieviele Olympische Sportarten könntest du aufzählen?'},
  {id:'w18',cat:'🌍 Wissen', diff:'hard',   text:'Wieviele Formel-1-Teams könntest du aufzählen?'},
  {id:'w19',cat:'🌍 Wissen', diff:'hard',   text:'Wieviele medizinische Fachgebiete könntest du aufzählen?'},
  {id:'w20',cat:'🌍 Wissen', diff:'easy',   text:'Wieviele Kleidungsstücke könntest du aufzählen?'},
,
  // 🔥 CHAOS EXTRA (30 more)
  {id:'cx1', cat:'🔥 Chaos', diff:'easy',   text:'Wieviele Dinge könntest du aufzählen die du aus dem Fenster schmeißen würdest?'},
  {id:'cx2', cat:'🔥 Chaos', diff:'easy',   text:'Wieviele Ausreden fallen dir ein, warum du nicht schlafen kannst?'},
  {id:'cx3', cat:'🔥 Chaos', diff:'medium', text:'Wieviele Dinge würdest du tun wenn du für einen Tag unsichtbar wärst?'},
  {id:'cx4', cat:'🔥 Chaos', diff:'easy',   text:'Wieviele Gründe fallen dir ein, warum du kein Gemüse essen willst?'},
  {id:'cx5', cat:'🔥 Chaos', diff:'medium', text:'Wieviele Dinge könntest du aufzählen die du sofort erkennst aber nicht erklären kannst?'},
  {id:'cx6', cat:'🔥 Chaos', diff:'easy',   text:'Wieviele Wege fallen dir ein, jemanden aus dem Schlaf zu wecken?'},
  {id:'cx7', cat:'🔥 Chaos', diff:'hard',   text:'Wieviele Dinge könntest du aufzählen die beim Zähneputzen schiefgehen können?'},
  {id:'cx8', cat:'🔥 Chaos', diff:'easy',   text:'Wieviele Gründe fallen dir ein, die Schule zu schwänzen?'},
  {id:'cx9', cat:'🔥 Chaos', diff:'medium', text:'Wieviele Dinge könntest du tun wenn du 24h kein Handy hättest?'},
  {id:'cx10',cat:'🔥 Chaos', diff:'easy',   text:'Wieviele Dinge fallen dir ein, die dich sofort hungrig machen?'},
  {id:'cx11',cat:'🔥 Chaos', diff:'medium', text:'Wieviele Wege könntest du aufzählen, einen ersten Eindruck zu versauen?'},
  {id:'cx12',cat:'🔥 Chaos', diff:'easy',   text:'Wieviele Dinge könntest du aufzählen die nur Deutsche machen?'},
  {id:'cx13',cat:'🔥 Chaos', diff:'hard',   text:'Wieviele Gründe fallen dir ein, warum Montage schlimmer als Freitage sind?'},
  {id:'cx14',cat:'🔥 Chaos', diff:'easy',   text:'Wieviele Dinge könntest du aufzählen die du zuletzt googeln musstest?'},
  {id:'cx15',cat:'🔥 Chaos', diff:'medium', text:'Wieviele Wege fallen dir ein, einen Streit zu vermeiden?'},
  {id:'cx16',cat:'🔥 Chaos', diff:'easy',   text:'Wieviele Dinge könntest du aufzählen die sofort gute Laune machen?'},
  {id:'cx17',cat:'🔥 Chaos', diff:'medium', text:'Wieviele Ausreden fallen dir ein, nicht zu antworten?'},
  {id:'cx18',cat:'🔥 Chaos', diff:'hard',   text:'Wieviele Dinge könntest du aufzählen die man nicht erklären kann wenn man sie sieht?'},
  {id:'cx19',cat:'🔥 Chaos', diff:'easy',   text:'Wieviele Gründe fallen dir ein, zum Arzt zu gehen?'},
  {id:'cx20',cat:'🔥 Chaos', diff:'medium', text:'Wieviele Dinge könntest du aufzählen die beim Kochen schiefgehen?'},
  {id:'cx21',cat:'🔥 Chaos', diff:'easy',   text:'Wieviele Wege fallen dir ein, einen Witz zu verderben?'},
  {id:'cx22',cat:'🔥 Chaos', diff:'medium', text:'Wieviele Dinge könntest du aufzählen die man nicht mit Geld kaufen kann?'},
  {id:'cx23',cat:'🔥 Chaos', diff:'easy',   text:'Wieviele Gründe fallen dir ein, früh aufzustehen?'},
  {id:'cx24',cat:'🔥 Chaos', diff:'hard',   text:'Wieviele Dinge könntest du aufzählen die nur nachts passieren?'},
  {id:'cx25',cat:'🔥 Chaos', diff:'easy',   text:'Wieviele Ausreden fallen dir ein, nicht Sport zu treiben?'},
  {id:'cx26',cat:'🔥 Chaos', diff:'medium', text:'Wieviele Dinge könntest du aufzählen, bei denen du immer schlecht bist?'},
  {id:'cx27',cat:'🔥 Chaos', diff:'easy',   text:'Wieviele Wege fallen dir ein, Zeit zu verschwenden?'},
  {id:'cx28',cat:'🔥 Chaos', diff:'medium', text:'Wieviele Dinge könntest du aufzählen die man vergisst sobald man älter wird?'},
  {id:'cx29',cat:'🔥 Chaos', diff:'easy',   text:'Wieviele Gründe fallen dir ein, warum Haustiere besser sind als Menschen?'},
  {id:'cx30',cat:'🔥 Chaos', diff:'hard',   text:'Wieviele Dinge könntest du aufzählen die man nur als Kind versteht?'},
  // 🎯 POP EXTRA (20 more)
  {id:'px1', cat:'🎯 Pop',   diff:'easy',   text:'Wieviele Schauspieler könntest du aufzählen?'},
  {id:'px2', cat:'🎯 Pop',   diff:'medium', text:'Wieviele Anime-Serien könntest du aufzählen?'},
  {id:'px3', cat:'🎯 Pop',   diff:'easy',   text:'Wieviele Sportler könntest du aufzählen?'},
  {id:'px4', cat:'🎯 Pop',   diff:'hard',   text:'Wieviele Oscarprämierten Filme könntest du aufzählen?'},
  {id:'px5', cat:'🎯 Pop',   diff:'easy',   text:'Wieviele Automarken könntest du aufzählen?'},
  {id:'px6', cat:'🎯 Pop',   diff:'medium', text:'Wieviele K-Pop Gruppen könntest du aufzählen?'},
  {id:'px7', cat:'🎯 Pop',   diff:'easy',   text:'Wieviele Zeichentrickfiguren könntest du aufzählen?'},
  {id:'px8', cat:'🎯 Pop',   diff:'medium', text:'Wieviele Minecraft Mobs könntest du aufzählen?'},
  {id:'px9', cat:'🎯 Pop',   diff:'hard',   text:'Wieviele Fortnite Skins könntest du aufzählen?'},
  {id:'px10',cat:'🎯 Pop',   diff:'easy',   text:'Wieviele Pokémon der ersten Generation könntest du aufzählen?'},
  {id:'px11',cat:'🎯 Pop',   diff:'medium', text:'Wieviele TikTok-Trends könntest du aufzählen?'},
  {id:'px12',cat:'🎯 Pop',   diff:'easy',   text:'Wieviele Superheldenfilme könntest du aufzählen?'},
  {id:'px13',cat:'🎯 Pop',   diff:'hard',   text:'Wieviele Game-of-Thrones-Charaktere könntest du aufzählen?'},
  {id:'px14',cat:'🎯 Pop',   diff:'easy',   text:'Wieviele Streamingdienste könntest du aufzählen?'},
  {id:'px15',cat:'🎯 Pop',   diff:'medium', text:'Wieviele Meme-Formate könntest du aufzählen?'},
  {id:'px16',cat:'🎯 Pop',   diff:'hard',   text:'Wieviele Breaking-Bad-Charaktere könntest du aufzählen?'},
  {id:'px17',cat:'🎯 Pop',   diff:'easy',   text:'Wieviele App-Icons könntest du erkennen?'},
  {id:'px18',cat:'🎯 Pop',   diff:'medium', text:'Wieviele Youtuber könntest du aufzählen?'},
  {id:'px19',cat:'🎯 Pop',   diff:'easy',   text:'Wieviele Konsolen könntest du aufzählen?'},
  {id:'px20',cat:'🎯 Pop',   diff:'hard',   text:'Wieviele Charaktere aus Der Herr der Ringe könntest du aufzählen?'},
  // 🌍 WISSEN EXTRA (20 more)
  {id:'wx1', cat:'🌍 Wissen', diff:'easy',   text:'Wieviele Bundesländer Deutschlands könntest du aufzählen?'},
  {id:'wx2', cat:'🌍 Wissen', diff:'medium', text:'Wieviele Weltwunder könntest du aufzählen?'},
  {id:'wx3', cat:'🌍 Wissen', diff:'hard',   text:'Wieviele Nobelpreisträger könntest du aufzählen?'},
  {id:'wx4', cat:'🌍 Wissen', diff:'easy',   text:'Wieviele Tierarten im Dschungel könntest du aufzählen?'},
  {id:'wx5', cat:'🌍 Wissen', diff:'medium', text:'Wieviele chemische Elemente als Symbol könntest du aufzählen?'},
  {id:'wx6', cat:'🌍 Wissen', diff:'easy',   text:'Wieviele Gemüsesorten könntest du aufzählen?'},
  {id:'wx7', cat:'🌍 Wissen', diff:'medium', text:'Wieviele Musikinstrumente könntest du aufzählen?'},
  {id:'wx8', cat:'🌍 Wissen', diff:'hard',   text:'Wieviele antike Zivilisationen könntest du aufzählen?'},
  {id:'wx9', cat:'🌍 Wissen', diff:'easy',   text:'Wieviele Obst-Sorten könntest du aufzählen?'},
  {id:'wx10',cat:'🌍 Wissen', diff:'medium', text:'Wieviele Länder in Asien könntest du aufzählen?'},
  {id:'wx11',cat:'🌍 Wissen', diff:'easy',   text:'Wieviele Farben könntest du aufzählen?'},
  {id:'wx12',cat:'🌍 Wissen', diff:'hard',   text:'Wieviele Päpste könntest du aufzählen?'},
  {id:'wx13',cat:'🌍 Wissen', diff:'medium', text:'Wieviele Planeten im Sonnensystem mit Monden könntest du aufzählen?'},
  {id:'wx14',cat:'🌍 Wissen', diff:'easy',   text:'Wieviele Hunderassen könntest du aufzählen?'},
  {id:'wx15',cat:'🌍 Wissen', diff:'medium', text:'Wieviele Schachfiguren-Typen könntest du aufzählen?'},
  {id:'wx16',cat:'🌍 Wissen', diff:'hard',   text:'Wieviele US-Präsidenten könntest du aufzählen?'},
  {id:'wx17',cat:'🌍 Wissen', diff:'easy',   text:'Wieviele Monate auf Englisch könntest du aufzählen?'},
  {id:'wx18',cat:'🌍 Wissen', diff:'medium', text:'Wieviele Knochen im menschlichen Arm und Bein könntest du aufzählen?'},
  {id:'wx19',cat:'🌍 Wissen', diff:'hard',   text:'Wieviele Länder in Afrika könntest du aufzählen?'},
  {id:'wx20',cat:'🌍 Wissen', diff:'medium', text:'Wieviele Sternzeichen könntest du aufzählen?'},
  // 💡 KREATIV EXTRA (15 more)
  {id:'kx1', cat:'💡 Kreativ', diff:'easy',   text:'Wieviele Dinge könntest du aufzählen die man mit einer Schere machen kann?'},
  {id:'kx2', cat:'💡 Kreativ', diff:'medium', text:'Wieviele blaue Dinge fallen dir ein?'},
  {id:'kx3', cat:'💡 Kreativ', diff:'easy',   text:'Wieviele Dinge könntest du aufzählen die man im Dunkeln hören kann?'},
  {id:'kx4', cat:'💡 Kreativ', diff:'hard',   text:'Wieviele Dinge könntest du aufzählen die man nicht zweimal tun kann?'},
  {id:'kx5', cat:'💡 Kreativ', diff:'medium', text:'Wieviele Dinge fallen dir ein die immer kälter werden?'},
  {id:'kx6', cat:'💡 Kreativ', diff:'easy',   text:'Wieviele Dinge könntest du auf einen leeren Tisch legen?'},
  {id:'kx7', cat:'💡 Kreativ', diff:'medium', text:'Wieviele Dinge fallen dir ein die lauter werden wenn man sie bricht?'},
  {id:'kx8', cat:'💡 Kreativ', diff:'hard',   text:'Wieviele Dinge könntest du aufzählen die in einem Traum passieren können?'},
  {id:'kx9', cat:'💡 Kreativ', diff:'easy',   text:'Wieviele Wege fallen dir ein wie man Nudeln essen kann?'},
  {id:'kx10',cat:'💡 Kreativ', diff:'medium', text:'Wieviele Dinge könntest du mit einem Besenstiel machen?'},
  {id:'kx11',cat:'💡 Kreativ', diff:'hard',   text:'Wieviele Dinge fallen dir ein die man nicht erklären kann?'},
  {id:'kx12',cat:'💡 Kreativ', diff:'easy',   text:'Wieviele Dinge könntest du aufzählen die weich sind?'},
  {id:'kx13',cat:'💡 Kreativ', diff:'medium', text:'Wieviele Dinge fallen dir ein die immer größer werden?'},
  {id:'kx14',cat:'💡 Kreativ', diff:'easy',   text:'Wieviele Dinge könntest du in einer Tasche verstecken?'},
  {id:'kx15',cat:'💡 Kreativ', diff:'hard',   text:'Wieviele Dinge fallen dir ein die man nicht kaufen kann aber braucht?'},
];
function getRandQ(excludeIds=[], forceDiff=null){
  let pool=QUESTIONS.filter(q=>!excludeIds.includes(q.id));
  if(!pool.length) pool=QUESTIONS;
  if(forceDiff) {
    const diffPool=pool.filter(q=>q.diff===forceDiff);
    if(diffPool.length) pool=diffPool;
  }
  return pool[Math.floor(Math.random()*pool.length)];
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
    judgeReadyIds:r.phase==='judge'?[...(r.judgeReady||[])]:null,
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
  startTimer(code,300,()=>startJudge(code)); // 5min fallback, host controls manually
}

// Judge phase: finalize thumbs-down results and calc scores
function startJudge(code){
  const r=rooms[code];if(!r)return;
  r.phase='judge';
  r.judgeReady=new Set(); // players who pressed ready
  r.judgeData=r.reveals.map(rev=>{
    const otherCount=r.players.length-1;
    const validList=rev.list.filter((_,i)=>{
      const downVotes=Object.keys(rev.thumbsDown[i]||{}).length;
      return otherCount===0||downVotes<otherCount;
    });
    return{playerId:rev.playerId,name:rev.name,avatar:rev.avatar,
      origList:rev.list,validList,
      answer:rev.answer,origQ:rev.origQ,swappedQ:rev.swappedQ};
  });
  bcastAll(r);
  // NO auto-timer – host manually advances after all ready
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

  socket.on('judgeReady',()=>{
    if(!rateOk(socket.id))return;
    const r=rooms[socket.data.code];
    if(!r||r.phase!=='judge')return;
    if(!r.judgeReady)r.judgeReady=new Set();
    r.judgeReady.add(socket.id);
    bcast(r.code);
    // Host manually calls calcScores via skipReveal
  });

  socket.on('skipReveal',()=>{
    if(!rateOk(socket.id,2))return;
    const r=rooms[socket.data.code];
    if(!r||socket.id!==r.hostId)return;
    if(r.phase==='reveal'){stopTimer(r.code);startJudge(r.code);}
    else if(r.phase==='judge'){stopTimer(r.code);calcScores(r.code);}
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
