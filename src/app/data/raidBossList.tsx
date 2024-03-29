export type DefaultRaidBossInfo = {
  name: string;
  lvl: number;
  type: 1 | 2 | 3 | 4;
  drop: string;
};

// ALL - 1
// ALLIANCE - 2
// SUBCLASS - 3
// NOBLESSE - 4

export const raidBossList: DefaultRaidBossInfo[] = [
  {
    name: "Bloody Priest Rudelto",
    lvl: 69,
    type: 1,
    drop: "https://l2.dropspoil.com/npc/25073/bloody-priest-rudelto.html",
  },
  {
    name: "Spirit Of Andras The Betrayer",
    lvl: 69,
    type: 1,
    drop: "https://l2.dropspoil.com/npc/25233/spirit-of-andras-the-betrayer.html",
  },
  {
    name: "Cabrio",
    lvl: 70,
    type: 3,
    drop: "https://l2.dropspoil.com/npc/25035/shilens-messenger-cabrio.html",
  },
  {
    name: "Korim",
    lvl: 70,
    type: 1,
    drop: "https://l2.dropspoil.com/npc/25092/korim.html",
  },
  {
    name: "Roaring Skylancer",
    lvl: 70,
    type: 1,
    drop: "https://l2.dropspoil.com/npc/25163/roaring-skylancer.html",
  },
  {
    name: "Fafurions Herald Lokness",
    lvl: 70,
    type: 1,
    drop: "https://l2.dropspoil.com/npc/25198/fafurions-herald-lokness.html",
  },
  {
    name: "Palibati Queen Themis",
    lvl: 70,
    type: 1,
    drop: "https://l2.dropspoil.com/npc/25252/palibati-queen-themis.html",
  },
  {
    name: "Behemoth",
    lvl: 70,
    type: 1,
    drop: "https://l2.dropspoil.com/npc/25269/beast-lord-behemoth.html",
  },
  {
    name: "Zakaron",
    lvl: 70,
    type: 1,
    drop: "https://l2.dropspoil.com/npc/25281/anakims-nemesis-zakaron.html",
  },
  {
    name: "Meanas Anor",
    lvl: 70,
    type: 1,
    drop: "https://l2.dropspoil.com/npc/25453/meanas-anor.html",
  },
  {
    name: "Flame of Splendor Barakiel",
    lvl: 70,
    type: 4,
    drop: "https://l2.dropspoil.com/npc/25325/flame-of-splendor-barakiel.html",
  },
  {
    name: "Eilhalder Von Hellmann",
    lvl: 71,
    type: 1,
    drop: "https://l2.dropspoil.com/npc/25328/eilhalder-von-hellmann.html",
  },
  {
    name: "Immortal Savior Mardil",
    lvl: 71,
    type: 1,
    drop: "https://l2.dropspoil.com/npc/25447/immortal-savior-mardil.html",
  },
  {
    name: "Doom Blade Tanatos",
    lvl: 72,
    type: 1,
    drop: "https://l2.dropspoil.com/npc/25248/doom-blade-tanatos.html",
  },
  {
    name: "Water Dragon Seer Sheshark",
    lvl: 72,
    type: 1,
    drop: "https://l2.dropspoil.com/npc/25199/water-dragon-seer-sheshark.html",
  },
  {
    name: "Vanor Chief Kandra",
    lvl: 72,
    type: 1,
    drop: "https://l2.dropspoil.com/npc/25235/vanor-chief-kandra.html",
  },
  {
    name: "Death Lord Hallate",
    lvl: 73,
    type: 3,
    drop: "https://l2.dropspoil.com/npc/25220/death-lord-hallate.html",
  },
  {
    name: "Plague Golem",
    lvl: 73,
    type: 1,
    drop: "https://l2.dropspoil.com/npc/25523/plague-golem.html",
  },
  {
    name: "Cloe",
    lvl: 74,
    type: 1,
    drop: "https://l2.dropspoil.com/npc/25109/antharas-priest-cloe.html",
  },
  {
    name: "Krokian Padisha Sobekk",
    lvl: 74,
    type: 1,
    drop: "https://l2.dropspoil.com/npc/25202/krokian-padisha-sobekk.html",
  },
  {
    name: "Icicle Emperor Bumbalump",
    lvl: 74,
    type: 1,
    drop: "https://l2.dropspoil.com/npc/25296/icicle-emperor-bumbalump.html",
  },
  {
    name: "Kernon",
    lvl: 75,
    type: 3,
    drop: "https://l2.dropspoil.com/npc/25054/kernon.html",
  },
  {
    name: "Storm Winged Naga",
    lvl: 75,
    type: 1,
    drop: "https://l2.dropspoil.com/npc/25229/storm-winged-naga.html",
  },
  {
    name: "Last Lesser Giant Olkuth",
    lvl: 75,
    type: 1,
    drop: "https://l2.dropspoil.com/npc/25244/last-lesser-giant-olkuth.html",
  },
  {
    name: "Palatanos of Horrific Power",
    lvl: 75,
    type: 1,
    drop: "https://l2.dropspoil.com/npc/25249/palatanos-of-horrific-power.html",
  },
  {
    name: "Decabria",
    lvl: 75,
    type: 1,
    drop: "https://l2.dropspoil.com/npc/25266/bloody-empress-decarbia.html",
  },
  {
    name: "Death Lord Ipos",
    lvl: 75,
    type: 1,
    drop: "https://l2.dropspoil.com/npc/25276/death-lord-ipos.html",
  },
  {
    name: "Death Lord Shax",
    lvl: 75,
    type: 1,
    drop: "https://l2.dropspoil.com/npc/25282/death-lord-shax.html",
  },
  {
    name: "Flamestone Giant",
    lvl: 76,
    type: 1,
    drop: "https://l2.dropspoil.com/npc/25524/flamestone-giant.html",
  },
  {
    name: "Ocean Flame Ashakiel",
    lvl: 76,
    type: 1,
    drop: "https://l2.dropspoil.com/npc/25205/ocean-flame-ashakiel.html",
  },
  {
    name: "Fire Of Wrath Shuriel",
    lvl: 78,
    type: 1,
    drop: "https://l2.dropspoil.com/npc/25143/fire-of-wrath-shuriel.html",
  },
  {
    name: "Last Lesser Giant Glaki",
    lvl: 78,
    type: 1,
    drop: "https://l2.dropspoil.com/npc/25245/last-lesser-giant-glaki.html",
  },
  {
    name: "Daimon The White Eyed",
    lvl: 78,
    type: 1,
    drop: "https://l2.dropspoil.com/npc/25290/daimon-the-whiteeyed.html",
  },
  {
    name: "Hestia Guardian",
    lvl: 78,
    type: 1,
    drop: "https://l2.dropspoil.com/npc/25293/hestia-guardian-deity-of-the-hot-springs.html",
  },
  {
    name: "Golkonda",
    lvl: 79,
    type: 3,
    drop: "https://l2.dropspoil.com/npc/25126/longhorn-golkonda.html",
  },
  {
    name: "Galaxia",
    lvl: 79,
    type: 1,
    drop: "https://l2.dropspoil.com/npc/25450/cherub-galaxia.html",
  },
  {
    name: "Queen Shyeed",
    lvl: 80,
    type: 1,
    drop: "https://l2.dropspoil.com/npc/25514/queen-shyeed.html",
  },
  {
    name: "Ketra Hero Hekaton",
    lvl: 80,
    type: 2,
    drop: "https://l2.dropspoil.com/npc/25299/ketras-hero-hekaton.html",
  },
  {
    name: "Varka Hero Shadith",
    lvl: 80,
    type: 2,
    drop: "https://l2.dropspoil.com/npc/25309/varkas-hero-shadith.html",
  },
  {
    name: "Ketra Chief Brakki",
    lvl: 80,
    type: 1,
    drop: "https://l2.dropspoil.com/npc/25305/ketras-chief-brakki.html",
  },
  {
    name: "Varka Chief Horus",
    lvl: 80,
    type: 1,
    drop: "https://l2.dropspoil.com/npc/25315/varkas-chief-horus.html",
  },
  {
    name: "Sailren",
    lvl: 80,
    type: 1,
    drop: "https://l2.dropspoil.com/npc/29065/sailren.html",
  },
  {
    name: "Lilith",
    lvl: 80,
    type: 1,
    drop: "https://l2.dropspoil.com/npc/25283/lilith.html",
  },
  {
    name: "Anakim",
    lvl: 80,
    type: 1,
    drop: "https://l2.dropspoil.com/npc/25286/anakim.html",
  },
  {
    name: "Soul Of Fire Nastron",
    lvl: 80,
    type: 1,
    drop: "https://l2.dropspoil.com/npc/25306/soul-of-fire-nastron.html",
  },
  {
    name: "Soul Of Water Ashutar",
    lvl: 80,
    type: 1,
    drop: "https://l2.dropspoil.com/npc/25316/soul-of-water-ashutar.html",
  },
  {
    name: "Ketra Commander Tayr",
    lvl: 84,
    type: 2,
    drop: "https://l2.dropspoil.com/npc/25302/ketras-commander-tayr.html",
  },
  {
    name: "Varka Commander Mos",
    lvl: 84,
    type: 2,
    drop: "https://l2.dropspoil.com/npc/25312/varkas-commander-mos.html",
  },
  {
    name: "Ember",
    lvl: 85,
    type: 1,
    drop: "https://l2.dropspoil.com/npc/25319/ember.html",
  },
  {
    name: "Uruka",
    lvl: 85,
    type: 1,
    drop: "https://l2.dropspoil.com/npc/25527/uruka.html",
  },
  {
    name: "Andreas Van Halter",
    lvl: 80,
    type: 1,
    drop: "https://l2.dropspoil.com/npc/29062/andreas-van-halter.html",
  },
  {
    name: "Anais",
    lvl: 80,
    type: 1,
    drop: "https://l2.dropspoil.com/npc/29096/anais.html",
  },
];
