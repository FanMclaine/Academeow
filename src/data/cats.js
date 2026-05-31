export const RARITY = {
  COMMON:    'common',
  UNCOMMON:  'uncommon',
  RARE:      'rare',
  LEGENDARY: 'legendary',
  MYTHICAL:  'mythical',
}

const PERSONALITIES = [
  'Playful', 'Lazy', 'Curious', 'Affectionate',
  'Independent', 'Shy', 'Vocal', 'Mischievous',
]

// Call this when a cat is CAUGHT — stored in collected instance, not catalogue
export function generatePersonality() {
  return PERSONALITIES[Math.floor(Math.random() * PERSONALITIES.length)]
}

export const CAT_CATALOGUE = [
  {
    id:          'tabby_01',
    name:        'Professor Whiskers',
    breed:       'Tabby',
    rarity:      RARITY.COMMON,
    spawnChance: 0.40,
    sprite:      '🐱',
    bio:         'Always napping on your notes.',
  },
  {
    id:          'tabby_02',
    name:        'Dean Fluffington',
    breed:       'Siamese',
    rarity:      RARITY.COMMON,
    spawnChance: 0.30,
    sprite:      '🐈',
    bio:         'Judges your GPA silently.',
  },
  {
    id:          'tabby_03',
    name:        'TA Mittens',
    breed:       'British Shorthair',
    rarity:      RARITY.UNCOMMON,
    spawnChance: 0.20,
    sprite:      '🐾',
    bio:         'Grades your assignments, keeps the marks.',
  },
  {
    id:          'tabby_04',
    name:        'Chairman Mao',
    breed:       'Maine Coon',
    rarity:      RARITY.UNCOMMON,
    spawnChance: 0.20,
    sprite:      '🐱',
    bio:         'Runs the student council somehow.',
  },
  {
    id:          'tabby_05',
    name:        'Librarian Socks',
    breed:       'Persian',
    rarity:      RARITY.RARE,
    spawnChance: 0.10,
    sprite:      '📚',
    bio:         'Shushes you even when you\'re alone.',
  },
  {
    id:          'tabby_06',
    name:        'Thesis',
    breed:       'Ragdoll',
    rarity:      RARITY.RARE,
    spawnChance: 0.08,
    sprite:      '📝',
    bio:         'Heavy, stressful, never quite finished.',
  },
  {
    id:          'tabby_07',
    name:        'The Sphinx',
    breed:       'Sphynx',
    rarity:      RARITY.LEGENDARY,
    spawnChance: 0.009,
    sprite:      '✨',
    bio:         'Ancient. Wise. Absolutely unhinged at 3am.',
  },
  {
    id:          'nekotabby_08',
    name:        'Schrödinger',
    breed:       'Asian',
    rarity:      RARITY.MYTHICAL,
    spawnChance: 0.001,
    sprite:      '🌌',
    bio:         'Exists and doesn\'t. GPA: undefined.',
  },
]

// ── helpers ─────────────────────────────────────────
export const getCatById = (id) =>
  CAT_CATALOGUE.find(cat => cat.id === id)

export const getCatsByRarity = (rarity) =>
  CAT_CATALOGUE.filter(cat => cat.rarity === rarity)