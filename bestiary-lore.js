/*
 * Avatar Field Guide — Bestiary field-note expansion
 * Works with the index.html currently published at
 * https://shaaaawww.github.io/Avatar-Companion-Sorting-Quiz/
 * Add <script src="bestiary-lore.js"></script> immediately after the existing
 * </script> tag, before </body>. No other edits required.
 *
 * Entries distinguish confirmed animated appearances from material whose
 * screen history has not been checked. Summaries are original paraphrases.
 */
(function () {
  'use strict';

  const WIKI = 'https://avatar.fandom.com/wiki/';
  const BOOK = 'https://www.darkhorse.com/Books/3007-617/Beasts-of-the-Four-Nations-Creatures-from-Avatar--The-Last-Airbender-and-The-Legend-of-Korra-HC';
  const SEVEN = 'https://www.paramountplus.com/sneak-peak/everything-you-need-to-know-about-avatar-seven-havens/';
  const ATLA = 'Avatar: The Last Airbender';
  const KORRA = 'The Legend of Korra';

  // Each researched dossier contains species lore, not fan-created quiz traits.
  // "Appearance" is a representative appearance, not necessarily the first one.
  const dossiers = {
    'Flying bison': {
      series: [ATLA, KORRA], location: 'Air Temples; skies across the Four Nations',
      appearance: 'ATLA — “The Boy in the Iceberg”; Korra — Air Temple Island',
      notable: 'Appa (Aang’s companion); Oogi (Tenzin’s companion)',
      description: 'Huge, six-legged sky bison can fly and propel air with their broad tails. Air Nomads formed deep bonds with them; they are remembered as the original airbenders.',
      moment: 'Appa carries Aang and Team Avatar during their journey. Later generations of airbenders also travel with sky bison.',
      source: WIKI + 'Flying_bison'
    },
    'Winged lemur': {
      series: [ATLA], location: 'Air Temples',
      appearance: 'ATLA — “The Southern Air Temple”',
      notable: 'Momo',
      description: 'Small, curious lemurs glide between trees and buildings using broad wings. They are closely associated with Air Nomad habitats.',
      moment: 'Aang meets Momo in the abandoned Southern Air Temple, and the lemur joins Team Avatar.',
      source: WIKI + 'Winged_lemur'
    },
    'Ring-tailed winged lemur': {
      series: [KORRA], location: 'Air Temple Island and airbender communities',
      appearance: 'Korra — Air Temple Island; Book Three airbender stories',
      notable: 'Poki, the lemur befriended by Meelo',
      description: 'A ring-tailed relative of the winged lemur, capable of gliding and often found near airbenders.',
      moment: 'The species appears alongside the renewed Air Nation in Korra’s era.',
      source: WIKI + 'Ring-tailed_winged_lemur'
    },
    'Badgermole': {
      series: [ATLA], location: 'Underground tunnels of the Earth Kingdom',
      appearance: 'ATLA — “The Cave of Two Lovers”',
      notable: 'The giant tunnel-dwellers encountered by Team Avatar',
      description: 'Massive, blind earthbending mammals shape tunnels through stone. They are presented as the original masters from whom humans learned earthbending.',
      moment: 'Badgermoles alter the Cave of Two Lovers; Toph later explains their role in the origins of earthbending.',
      source: WIKI + 'Badgermole'
    },
    'Dragon': {
      series: [ATLA, KORRA], location: 'Fire Nation; ancient sacred sites',
      appearance: 'ATLA — “The Firebending Masters”',
      notable: 'Ran and Shaw; Roku’s dragon Fang',
      description: 'Dragons are the original firebenders. Their living flames symbolize the full range of fire, beyond its destructive uses.',
      moment: 'Aang and Zuko learn from Ran and Shaw during the Sun Warriors’ dragon dance.',
      source: WIKI + 'Dragon'
    },
    'Lion turtle': {
      series: [ATLA, KORRA], location: 'Ancient settlements; oceans and spirit-linked places',
      appearance: 'ATLA — “Sozin’s Comet”; Korra — “Beginnings”',
      notable: 'The ancient lion turtle encountered by Aang',
      description: 'Enormous ancient beings with islands or settlements upon their backs. In the distant past, lion turtles granted people elemental powers through energybending.',
      moment: 'A lion turtle teaches Aang energybending; Korra’s account of Avatar Wan shows humans living on lion turtles.',
      source: WIKI + 'Lion_turtle'
    },
    'Shirshu': {
      series: [ATLA], location: 'Earth Kingdom; wild and trained tracking routes',
      appearance: 'ATLA — “Bato of the Water Tribe”',
      notable: 'Nyla, the bounty hunter June’s shirshu',
      description: 'An eyeless tracker with an extraordinary sense of smell and a long tongue carrying paralyzing venom.',
      moment: 'June and Nyla track Aang’s group; Katara uses strong perfume to overwhelm Nyla’s scent-based senses.',
      source: WIKI + 'Shirshu'
    },
    'Otter penguin': {
      series: [ATLA], location: 'Southern Water Tribe and surrounding icy waters',
      appearance: 'ATLA — “The Boy in the Iceberg”',
      notable: 'The otter penguins that Aang and Katara ride',
      description: 'Friendly aquatic animals with an otter-like face and penguin-like build; well adapted to polar water and ice.',
      moment: 'Aang invites Katara to go penguin sledding soon after he wakes from the iceberg.',
      source: WIKI + 'Otter_penguin'
    },
    'Polar bear dog': {
      series: [KORRA], location: 'Northern and Southern Water Tribes',
      appearance: 'Korra — “Welcome to Republic City”',
      notable: 'Naga, Korra’s lifelong companion',
      description: 'Powerful white-furred polar animals with bear-like strength and dog-like features. They are usually feared as wild animals.',
      moment: 'Korra travels with Naga, a polar bear dog she befriended as a young pup.',
      source: WIKI + 'Polar_bear_dog'
    },
    'Fire ferret': {
      series: [KORRA], location: 'Republic City and other urban habitats',
      appearance: 'Korra — Book One: Air',
      notable: 'Pabu, Bolin’s pet and the Fire Ferrets’ mascot',
      description: 'Agile red-and-cream mammals with long ringed tails; clever climbers and playful companions.',
      moment: 'Pabu accompanies Bolin and becomes mascot of the brothers’ pro-bending team.',
      source: WIKI + 'Pabu'
    },
    'Turtle duck': {
      series: [ATLA, KORRA], location: 'Ponds in the Fire Nation, Earth Kingdom, and Republic City',
      appearance: 'ATLA — “Zuko Alone” (flashbacks)',
      notable: 'Turtle ducks of the Fire Nation royal garden',
      description: 'Gentle pond animals combining a duck’s head with a turtle-like shell; parents protect their young.',
      moment: 'Young Zuko feeds turtle ducks with his mother Ursa, a memory tied to his childhood.',
      source: WIKI + 'Turtle_duck'
    },
    'Unagi': {
      series: [ATLA], location: 'Waters off Kyoshi Island',
      appearance: 'ATLA — “The Warriors of Kyoshi”',
      notable: 'The huge sea creature near Kyoshi Island',
      description: 'An enormous predatory eel-like beast that can spray powerful jets of water and prey on elephant koi.',
      moment: 'Aang meets the unagi while swimming near Kyoshi Island; its water blast later helps him fight a fire.',
      source: WIKI + 'Unagi'
    },
    'Elephant koi': {
      series: [ATLA], location: 'Coastal waters around Kyoshi Island',
      appearance: 'ATLA — “The Warriors of Kyoshi”',
      notable: 'The giant fish Aang tries to ride',
      description: 'Enormous colorful koi-like fish, large enough for a person to hold onto while they swim.',
      moment: 'Aang rides an elephant koi before the unagi disrupts his adventure.',
      source: WIKI + 'Elephant_koi'
    },
    'Komodo rhino': {
      series: [ATLA], location: 'Fire Nation lands and military campaigns',
      appearance: 'ATLA — “The Warriors of Kyoshi” and “Avatar Day”',
      notable: 'Mounts of the Rough Rhinos',
      description: 'Heavy, horned reptile-mammal hybrids trained to carry riders and equipment; used by the Fire Nation as cavalry.',
      moment: 'Fire Nation soldiers ride komodo rhinos, including the mercenary unit called the Rough Rhinos.',
      source: WIKI + 'Komodo_rhino'
    },
    'Ostrich horse': {
      series: [ATLA, KORRA], location: 'Earth Kingdom roads and cities',
      appearance: 'ATLA — Earth Kingdom travel scenes',
      notable: 'Mounts ridden by Zuko and Earth Kingdom soldiers',
      description: 'Tall, fast-running bird-horse hybrids widely used for riding and hauling carriages.',
      moment: 'Zuko rides an ostrich horse, and they pull carriages through Ba Sing Se.',
      source: WIKI + 'Ostrich_horse'
    },
    'Boar-q-pine': {
      series: [ATLA], location: 'Forests and rugged Earth Kingdom terrain',
      appearance: 'ATLA — “Appa’s Lost Days”',
      notable: 'The territorial boar-q-pine that fights Appa',
      description: 'A large, tusked creature covered in sharp quills; it can be fiercely territorial.',
      moment: 'A wild boar-q-pine attacks the exhausted Appa during his separation from Aang.',
      source: WIKI + 'Boar-q-pine'
    },
    'Wolfbat': {
      series: [ATLA], location: 'Earth Kingdom caves',
      appearance: 'ATLA — “The Cave of Two Lovers”',
      notable: 'The colony encountered by Team Avatar',
      description: 'Wolf-sized flying creatures with batlike wings and faces. They live in groups and can panic when disturbed.',
      moment: 'A wolfbat frightens Appa in the tunnel maze, contributing to Team Avatar’s separation.',
      source: WIKI + 'Wolfbat'
    },
    'Saber-tooth moose lion': {
      series: [ATLA], location: 'Forests of the Earth Kingdom',
      appearance: 'ATLA — “Bitter Work”',
      notable: 'Foo Foo Cuddlypoops and its protective mother',
      description: 'A large antlered feline with long canine teeth; dangerous when its young are threatened.',
      moment: 'Sokka befriends a cub he calls Foo Foo Cuddlypoops, then meets its angry mother.',
      source: WIKI + 'Saber-tooth_moose_lion'
    },
    'Buzzard wasp': {
      series: [ATLA], location: 'Si Wong Desert',
      appearance: 'ATLA — “The Desert”',
      notable: 'The wasp that carries off Momo',
      description: 'A giant airborne desert predator with insect-like features.',
      moment: 'A buzzard wasp snatches Momo while Aang searches for Appa.',
      source: WIKI + 'Buzzard_wasp'
    },
    'Canyon crawler': {
      series: [ATLA], location: 'Great Divide canyon',
      appearance: 'ATLA — “The Great Divide”',
      notable: 'The creatures that menace travelers crossing the canyon',
      description: 'Large multi-legged canyon predators that endanger people crossing rough ravines.',
      moment: 'Aang helps two rival groups make it through the Great Divide, where canyon crawlers are among the hazards.',
      source: WIKI + 'Canyon_crawler'
    },
    'Knowledge Seeker': {
      series: [ATLA, KORRA], location: 'Wan Shi Tong’s library and the Spirit World',
      appearance: 'ATLA — “The Library”; Korra — “A New Spiritual Age”',
      notable: 'Wan Shi Tong’s foxlike assistants',
      description: 'Fox-shaped spirits who gather books, guide visitors, and work for the great spirit of knowledge.',
      moment: 'A Knowledge Seeker helps Sokka reach the library’s calendar during the search for information about an eclipse.',
      source: WIKI + 'Knowledge_Seekers'
    },
    'Cat-monkey': {
      series: ['Avatar: Seven Havens'], location: 'The Seven Havens era',
      appearance: 'Seven Havens — Book One (2026)',
      notable: 'Geet and Ruhi, companions of Pavi and Nisha',
      description: 'Small fluffy cat-monkey companions introduced in the post-Korra animated series.',
      moment: 'Geet and Ruhi accompany the twins Pavi and Nisha on their adventure.',
      source: SEVEN
    },
    'Bear': {
      series: [ATLA], location: 'Earth Kingdom; Ba Sing Se palace',
      appearance: 'ATLA — Earth King stories in Book Two',
      notable: 'Bosco, the Earth King’s bear',
      description: 'An ordinary bear — conspicuously unusual in a world where most species are hybrid animals.',
      moment: 'Earth King Kuei treasures Bosco, and Team Avatar is surprised that he is simply a bear.',
      source: WIKI + 'Bosco'
    },
    'Messenger hawk': {
      series: [ATLA], location: 'Messenger routes throughout the Four Nations',
      appearance: 'ATLA — “The Runaway”',
      notable: 'Hawky, purchased by Sokka',
      description: 'Trainable birds used to carry messages over long distances.',
      moment: 'Sokka buys and names a messenger hawk Hawky to send a letter.',
      source: WIKI + 'Messenger_hawk'
    },
    'Sea serpent': {
      series: [ATLA], location: 'Waters near the Serpent’s Pass',
      appearance: 'ATLA — “The Serpent’s Pass”',
      notable: 'The serpent encountered by Team Avatar and the refugees',
      description: 'A huge aquatic serpent capable of threatening travelers crossing dangerous waters.',
      moment: 'Aang and Katara confront the serpent while helping a group cross to Ba Sing Se.',
      source: WIKI + 'Sea_serpent'
    },
    'Flying boar': {
      series: [ATLA], location: 'Earth Kingdom imagery and family heraldry',
      appearance: 'ATLA — Beifong family emblem',
      notable: 'The Beifong family crest',
      description: 'Most prominent as a heraldic symbol associated with the wealthy Beifong family, rather than a familiar live animal seen in action.',
      moment: 'The flying boar is recognized on the Beifong family emblem.',
      source: WIKI + 'Flying_boar'
    },
    'Purple pentapus': {
      series: [ATLA], location: 'Earth Kingdom, including Omashu',
      appearance: 'ATLA — “Return to Omashu”',
      notable: 'The tiny creatures used to imitate pentapox marks',
      description: 'Small, five-armed purple creatures that can leave distinctive circular marks.',
      moment: 'Team Avatar uses marks from purple pentapuses as part of the fake pentapox scare.',
      source: WIKI + 'Purple_pentapus'
    },
    'Eel hound': {
      series: [ATLA], location: 'Earth Kingdom roads',
      appearance: 'ATLA — later Earth Kingdom adventures',
      notable: 'Large riding animals used for fast travel',
      description: 'Long-bodied, swift reptilian hounds used as mounts; valued for speed.',
      moment: 'The series shows eel hounds being used for rapid overland travel.',
      source: WIKI + 'Eel_hound'
    },
    'Tiger seal': {
      series: [ATLA], location: 'Polar waters',
      appearance: 'ATLA — Southern Water Tribe wildlife',
      notable: 'A predator of otter penguins',
      description: 'Large marine predators combining tiger markings with seal-like bodies.',
      moment: 'Part of the cold-water food web associated with the Water Tribes.',
      source: WIKI + 'Tiger_seal'
    },
    'Buffalo yak': {
      series: [ATLA], location: 'Water Tribe settlements and icy regions',
      appearance: 'ATLA — Southern Water Tribe life',
      notable: 'Working and herd animals',
      description: 'Thick-coated hoofed animals suited to cold climates and used by local communities.',
      moment: 'Buffalo yaks are part of the everyday wildlife and livestock of the Water Tribes.',
      source: WIKI + 'Buffalo_yak'
    },
    'Platypus bear': {
      series: [ATLA], location: 'Earth Kingdom',
      appearance: 'ATLA — Earth Kingdom wildlife',
      notable: 'One of the world’s unusual bear hybrids',
      description: 'A bear-like animal with a broad platypus-style bill, demonstrating the setting’s distinctive hybrid wildlife.',
      moment: 'A familiar example of the hybrid animals mentioned throughout the Avatar world.',
      source: WIKI + 'Platypus_bear'
    },
    'Koala sheep': {
      series: [ATLA], location: 'Rural settlements and grassy country',
      appearance: 'ATLA — background animal life',
      notable: 'Grazing flock animals',
      description: 'Sheep-like livestock with soft, koala-style features; a common kind of Avatar-world hybrid.',
      moment: 'These animals help fill out the series’ agricultural environments.',
      source: WIKI + 'Koala_sheep'
    }
  };

  const safe = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const grid = document.getElementById('creatureGrid');
  const section = document.getElementById('bestiary');
  if (!grid || !section) return; // Safe if the page layout is later changed.

  const css = document.createElement('style');
  css.textContent = `
    #bestiary .creature[data-lore-ready] { cursor:pointer; transition:transform .12s ease,background .12s ease; }
    #bestiary .creature[data-lore-ready]:hover { background:#416d5b; transform:translateY(-2px); }
    #bestiary .creature[data-lore-ready]:focus-visible { outline:3px solid #f5da9f;outline-offset:3px; }
    #bestiary .creature-lore-hint { display:block; color:#f4ddb0; font:600 .66rem/1.5 system-ui,Arial,sans-serif; margin-top:10px; }
    #bestiary .field-guide-note {border-left:3px solid #d7b77e; padding:12px 16px; background:#2f5145; color:#eff1e9; max-width:760px; font:.86rem/1.6 system-ui,Arial,sans-serif; margin:18px 0 2px}
    #bestiary .field-guide-note strong { color:#f8d79e; }
    .avatar-dossier { border:1px solid #b1b89e; border-radius:9px; padding:0; background:#fdfbf4; color:#203a30; width:min(620px,calc(100vw - 28px)); max-height:min(86vh,820px); box-shadow:0 25px 70px #10261ddd; }
    .avatar-dossier::backdrop { background:rgba(10,26,21,.78);backdrop-filter:blur(2px) }
    .avatar-dossier-inner { padding:clamp(22px,5vw,38px); overflow-y:auto; max-height:85vh }
    .avatar-dossier .d-kicker {font:700 .68rem system-ui,Arial,sans-serif; letter-spacing:.16em; text-transform:uppercase; color:#8f622f; margin-bottom:8px}
    .avatar-dossier h2 {font:400 clamp(1.75rem,4vw,2.65rem)/1.05 Georgia,serif; margin:0 40px 13px 0; color:#21382f}
    .avatar-dossier .d-chips {display:flex;gap:6px;flex-wrap:wrap;margin:0 0 22px}
    .avatar-dossier .d-chip {background:#e5ecdf; border:1px solid #d0dac9; padding:5px 9px; border-radius:99px; font:600 .68rem system-ui,Arial,sans-serif; color:#335a4d}
    .avatar-dossier dl {display:grid;grid-template-columns:124px 1fr;gap:12px 16px;padding:18px 0;margin:16px 0;border-top:1px solid #d4d6c8;border-bottom:1px solid #d4d6c8;font:.89rem/1.6 system-ui,Arial,sans-serif}
    .avatar-dossier dt {font-weight:700;color:#345848}
    .avatar-dossier dd {margin:0;color:#36483f}
    .avatar-dossier p {font:.96rem/1.7 Georgia,serif;color:#354a40;margin:0 0 13px}
    .avatar-dossier .d-highlight {padding:15px 18px;background:#eff2e8;border-left:3px solid #4d806c}
    .avatar-dossier .d-source {font:.79rem/1.6 system-ui,Arial,sans-serif;margin-top:22px}
    .avatar-dossier .d-close {position:absolute;top:14px;right:14px;width:35px;height:35px;border:1px solid #b4c2b3;border-radius:50%;color:#284b3d;background:#f8f9f3;font-size:1.5rem;line-height:1;cursor:pointer}
    .avatar-dossier .d-unverified {padding:15px 18px;background:#f3ebd9;border-left:3px solid #b68b49;font:.9rem/1.6 system-ui,Arial,sans-serif;color:#5c4b31}
    @media(max-width:530px){.avatar-dossier dl{grid-template-columns:1fr;gap:2px}.avatar-dossier dd{margin-bottom:9px}}
    @media(prefers-reduced-motion:reduce){#bestiary .creature[data-lore-ready]{transition:none}}
  `;
  document.head.appendChild(css);

  const note = document.createElement('p');
  note.className = 'field-guide-note';
  note.innerHTML = `<strong>New: field dossiers.</strong> Select any creature to read its lore. ${Object.keys(dossiers).length} entries have researched show notes; other entries are marked as awaiting a verified screen reference. Details may reveal plot points.`;
  const toolbar = section.querySelector('.catalog-toolbar');
  if (toolbar) toolbar.before(note);

  const dialog = document.createElement('dialog');
  dialog.className = 'avatar-dossier';
  dialog.setAttribute('aria-label', 'Creature field dossier');
  document.body.appendChild(dialog);

  function annotate() {
    grid.querySelectorAll('.creature').forEach(card => {
      if (card.dataset.loreReady) return;
      const name = card.querySelector('strong')?.textContent?.trim();
      if (!name) return;
      card.dataset.loreReady = 'true';
      card.dataset.creatureName = name;
      card.setAttribute('role', 'button');
      card.tabIndex = 0;
      card.setAttribute('aria-label', `Read lore about ${name}`);
      const hint = document.createElement('span');
      hint.className = 'creature-lore-hint';
      hint.textContent = dossiers[name] ? 'Read show & lore notes →' : 'Read index notes →';
      card.appendChild(hint);
    });
  }

  function openDossier(card) {
    const name = card.dataset.creatureName || card.querySelector('strong')?.textContent?.trim();
    if (!name) return;
    const group = card.querySelector('small')?.textContent?.trim() || 'Creature';
    const d = dossiers[name];
    const meta = d ? `
      <div class="d-chips">${d.series.map(series => `<span class="d-chip">${safe(series)}</span>`).join('')}</div>
      <p>${safe(d.description)}</p>
      <dl>
        <dt>Habitat</dt><dd>${safe(d.location)}</dd>
        <dt>On screen</dt><dd>${safe(d.appearance)}</dd>
        <dt>Notable figure</dt><dd>${safe(d.notable)}</dd>
      </dl>
      <p class="d-highlight"><strong>From the story:</strong> ${safe(d.moment)}</p>
      <div class="d-source">Further reading: <a href="${safe(d.source)}" target="_blank" rel="noopener noreferrer">Species or character reference ↗</a></div>
    ` : `
      <div class="d-chips"><span class="d-chip">Wider Avatar lore index</span></div>
      <p class="d-unverified"><strong>Screen appearance not yet verified.</strong> This species appears in the broader index, which includes animation, comics, novels, reference books, and newer series. A specific episode, habitat, ability, or named companion has not been confirmed for this entry, so the guide does not invent one.</p>
      <div class="d-source">Research starting points: <a href="${BOOK}" target="_blank" rel="noopener noreferrer">Beasts of the Four Nations ↗</a> · <a href="${WIKI}Category:Fauna" target="_blank" rel="noopener noreferrer">Avatar fauna index ↗</a></div>
    `;
    dialog.innerHTML = `<div class="avatar-dossier-inner"><button class="d-close" type="button" aria-label="Close field notes">×</button><div class="d-kicker">Field dossier · ${safe(group)}</div><h2>${safe(name)}</h2>${meta}</div>`;
    dialog.querySelector('.d-close').addEventListener('click', () => dialog.close());
    if (!dialog.open) dialog.showModal();
  }

  grid.addEventListener('click', event => {
    const card = event.target.closest('.creature[data-lore-ready]');
    if (card && grid.contains(card)) openDossier(card);
  });
  grid.addEventListener('keydown', event => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const card = event.target.closest('.creature[data-lore-ready]');
    if (card && grid.contains(card)) { event.preventDefault(); openDossier(card); }
  });
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  new MutationObserver(annotate).observe(grid, {childList: true});
  annotate();
})();
