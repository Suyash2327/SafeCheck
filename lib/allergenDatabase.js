/**
 * SafeCheck Allergen Database
 * Comprehensive allergen term lists sourced from:
 * - Celiac Disease Foundation (celiac.org)
 * - FDA Allergen Labeling Guidelines
 * - National Celiac Association
 * - Major allergy organizations
 * 
 * Each category has:
 * - unsafe: Definitive allergen-containing terms
 * - caution: Ambiguous terms that MAY contain the allergen
 * - safe: Terms that sound dangerous but are actually safe
 */

export const allergenDatabase = {
  gluten: {
    label: 'Gluten',
    subtitle: 'Celiac Disease Check',
    description: 'Checks for wheat, barley, rye, and hidden gluten sources',
    icon: '🌾',
    accentColor: '#4ade80',
    accentColorDim: 'rgba(74, 222, 128, 0.12)',
    unsafe: [
      // Primary grains
      'wheat', 'barley', 'rye', 'triticale',
      // Wheat varieties
      'spelt', 'semolina', 'durum', 'farina', 'farro', 'graham',
      'kamut', 'einkorn', 'emmer', 'bulgur', 'couscous', 'seitan',
      'freekeh', 'wheat berries', 'cracked wheat',
      // Flour types
      'wheat flour', 'all-purpose flour', 'all purpose flour',
      'bread flour', 'cake flour', 'pastry flour', 'self-rising flour',
      'self rising flour', 'enriched flour', 'bleached flour',
      'unbleached flour', 'whole wheat flour', 'white flour',
      'enriched wheat flour', 'bromated flour',
      // Wheat derivatives
      'wheat germ', 'wheat bran', 'wheat starch', 'wheat protein',
      'wheat gluten', 'vital wheat gluten', 'hydrolyzed wheat protein',
      'wheat grass', 'wheatgrass',
      // Malt derivatives
      'malt', 'malted barley', 'malted barley flour', 'malt extract',
      'malt syrup', 'malt flavoring', 'malt vinegar', 'maltose',
      'barley malt', 'barley malt extract', 'barley malt syrup',
      'barley flour', 'barley flakes',
      // Brewer's/fermentation
      "brewer's yeast", 'brewers yeast',
      // Baked/processed
      'bread crumbs', 'breadcrumbs', 'panko', 'croutons',
      'roux', 'orzo', 'matzo', 'matzoh', 'matza',
      // Pasta
      'pasta', 'noodles', 'spaghetti', 'macaroni', 'lasagna',
      'fettuccine', 'linguine', 'penne', 'rotini', 'fusilli',
      'vermicelli', 'udon',
      // Other
      'atta', 'maida', 'suji', 'sooji', 'daliya',
      'gluten', 'vital gluten',
      'fu', 'seitan',
    ],
    caution: [
      // These MAY contain gluten depending on source
      'modified food starch', 'modified starch',
      'food starch', 'starch',
      'hydrolyzed vegetable protein', 'hydrolyzed plant protein',
      'hydrolyzed protein',
      'dextrin', 'maltodextrin',
      'natural flavors', 'natural flavoring', 'natural flavours',
      'artificial flavors', 'artificial flavoring',
      'caramel color', 'caramel colour',
      'soy sauce', 'teriyaki sauce', 'worcestershire sauce',
      'seasonings', 'seasoning blend', 'spice blend',
      'vegetable gum', 'vegetable protein',
      'smoke flavoring', 'smoke flavor',
      'oats', 'oat', 'oatmeal', 'oat flour', 'oat bran',
      'stabilizer', 'stabilizers', 'emulsifier', 'emulsifiers',
      'thickener', 'thickeners',
      'yeast extract', 'autolyzed yeast',
      'bouillon', 'broth',
      'textured vegetable protein',
      'mono and diglycerides', 'mono- and diglycerides',
    ],
    safe: [
      // These sound suspicious but ARE gluten-free
      'buckwheat', 'rice', 'corn', 'maize', 'quinoa', 'millet',
      'sorghum', 'teff', 'amaranth', 'arrowroot', 'tapioca',
      'potato starch', 'corn starch', 'cornstarch', 'rice starch',
      'rice flour', 'corn flour', 'tapioca starch', 'tapioca flour',
      'almond flour', 'coconut flour', 'chickpea flour',
      'lactic acid', 'citric acid', 'xanthan gum', 'guar gum',
      'cellulose', 'methylcellulose',
      'glucose', 'dextrose', 'fructose', 'sucrose',
      'distilled vinegar', 'wine vinegar', 'apple cider vinegar',
      'glutamic acid', 'glutamate', 'monosodium glutamate',
    ],
  },

  lactose: {
    label: 'Lactose',
    subtitle: 'Lactose Intolerance Check',
    description: 'Checks for milk, dairy derivatives, and hidden lactose',
    icon: '🥛',
    accentColor: '#60a5fa',
    accentColorDim: 'rgba(96, 165, 250, 0.12)',
    unsafe: [
      // Primary dairy
      'milk', 'whole milk', 'skim milk', 'low-fat milk', 'low fat milk',
      '2% milk', '1% milk', 'fat-free milk', 'fat free milk',
      'milk solids', 'milk powder', 'dry milk', 'dried milk',
      'nonfat milk', 'nonfat dry milk', 'nonfat milk solids',
      'powdered milk', 'condensed milk', 'evaporated milk',
      'sweetened condensed milk',
      // Cream & butter
      'cream', 'heavy cream', 'light cream', 'whipping cream',
      'sour cream', 'cream cheese', 'half and half', 'half-and-half',
      'butter', 'butterfat', 'butter oil', 'butter solids',
      'buttermilk', 'ghee', 'clarified butter',
      // Cheese
      'cheese', 'cheddar', 'mozzarella', 'parmesan', 'ricotta',
      'cottage cheese', 'cream cheese', 'gouda', 'brie',
      'swiss cheese', 'provolone', 'romano',
      // Whey & casein
      'whey', 'whey protein', 'whey concentrate', 'whey isolate',
      'acid whey', 'sweet whey', 'whey powder',
      'casein', 'caseinate', 'sodium caseinate', 'calcium caseinate',
      'casein hydrolysate', 'milk casein',
      // Proteins
      'lactalbumin', 'lactalbumin phosphate',
      'lactoglobulin', 'beta-lactoglobulin',
      'milk protein', 'milk protein concentrate', 'milk protein isolate',
      // Sugar
      'lactose', 'lactulose',
      // Cultured
      'yogurt', 'yoghurt', 'kefir', 'curds',
      // Other
      'custard', 'pudding', 'ice cream',
      'milk chocolate', 'white chocolate',
      'dulce de leche', 'malted milk',
      'milk fat', 'anhydrous milk fat',
      'recombined milk', 'reconstituted milk',
    ],
    caution: [
      'natural flavors', 'natural flavoring', 'natural flavours',
      'artificial flavors', 'artificial flavoring',
      'caramel', 'caramel color', 'caramel colour',
      'nougat',
      'margarine',
      'high protein flour',
      'chocolate', 'cocoa butter',
      'galactose',
    ],
    safe: [
      // These sound dairy but are NOT
      'lactic acid', 'lactate', 'sodium lactate', 'calcium lactate',
      'coconut milk', 'almond milk', 'oat milk', 'soy milk', 'rice milk',
      'cocoa butter', 'shea butter', 'peanut butter',
      'cream of tartar',
      'lactobacillus',
    ],
  },

  peanut: {
    label: 'Peanut',
    subtitle: 'Peanut Allergy Check',
    description: 'Checks for peanuts, groundnuts, and cross-contamination warnings',
    icon: '🥜',
    accentColor: '#f59e0b',
    accentColorDim: 'rgba(245, 158, 11, 0.12)',
    unsafe: [
      // Direct
      'peanut', 'peanuts', 'peanut oil', 'peanut butter',
      'peanut flour', 'peanut meal', 'peanut protein',
      'peanut extract', 'peanut paste',
      // Scientific/alternate names
      'groundnut', 'groundnuts', 'groundnut oil',
      'arachis oil', 'arachis hypogaea',
      'earth nut', 'earth nuts',
      'monkey nut', 'monkey nuts',
      'beer nuts', 'beer nut',
      'goober', 'goobers', 'goober peas',
      // Processed forms
      'crushed peanuts', 'roasted peanuts', 'dry roasted peanuts',
      'boiled peanuts', 'peanut brittle',
      'peanut sauce', 'satay sauce', 'satay',
      // Mixed/blends
      'mixed nuts', 'nut mix', 'nut blend', 'trail mix',
      'nut butter', 'nut paste',
      // Indian names
      'moongphali', 'mungfali', 'singdana',
    ],
    caution: [
      'may contain peanuts', 'may contain traces of peanuts',
      'may contain nuts', 'may contain traces of nuts',
      'produced in a facility', 'manufactured in a facility',
      'shared equipment', 'shared production line',
      'tree nuts', 'nuts',
      'nut oil', 'vegetable oil',
      'natural flavors', 'natural flavoring',
      'praline', 'nougat', 'marzipan',
      'granola',
    ],
    safe: [
      'coconut', 'nutmeg', 'butternut squash', 'water chestnut',
      'pine nut', 'pine nuts',
    ],
  },

  soy: {
    label: 'Soy',
    subtitle: 'Soy Allergy Check',
    description: 'Checks for soybeans, soy derivatives, and hidden soy sources',
    icon: '🫘',
    accentColor: '#a78bfa',
    accentColorDim: 'rgba(167, 139, 250, 0.12)',
    unsafe: [
      // Primary
      'soy', 'soya', 'soybean', 'soybeans', 'soya bean', 'soya beans',
      'soy protein', 'soy protein isolate', 'soy protein concentrate',
      'isolated soy protein', 'hydrolyzed soy protein',
      'textured soy protein', 'textured soy flour',
      // Oils & fats
      'soybean oil', 'soy oil', 'soya oil',
      'hydrogenated soybean oil', 'partially hydrogenated soybean oil',
      // Flour & meal
      'soy flour', 'soya flour', 'soy meal', 'soybean meal',
      'soy grits', 'soy nuts', 'soy nut butter',
      // Sauces & fermented
      'soy sauce', 'soya sauce', 'shoyu', 'tamari',
      'miso', 'miso paste',
      'tempeh', 'natto',
      'tofu', 'bean curd', 'silken tofu', 'firm tofu',
      // Other
      'edamame', 'soy milk', 'soya milk', 'soy cream',
      'soy lecithin', 'soya lecithin',
      'soy albumin', 'soy fiber', 'soy fibre',
      'soy cheese', 'soy yogurt', 'soy ice cream',
      'soy sprouts', 'bean sprouts',
      'kinako',
      'yuba',
      'okara',
    ],
    caution: [
      'lecithin', 'vegetable lecithin',
      'vegetable oil', 'vegetable fat',
      'vegetable protein', 'hydrolyzed vegetable protein',
      'textured vegetable protein', 'tvp',
      'vegetable broth', 'vegetable stock',
      'natural flavors', 'natural flavoring',
      'artificial flavors', 'artificial flavoring',
      'mono and diglycerides', 'mono- and diglycerides',
      'emulsifier', 'emulsifiers',
      'stabilizer', 'stabilizers',
      'thickener', 'thickeners',
      'vitamin e', 'tocopherol', 'mixed tocopherols',
      'guar gum',
    ],
    safe: [
      'soybean oil (highly refined)', 'refined soybean oil',
    ],
  },
};

/**
 * Analyze ingredients against a specific allergen category
 * @param {string[]} ingredients - Array of parsed ingredient strings
 * @param {string} allergenType - One of: 'gluten', 'lactose', 'peanut', 'soy'
 * @returns {Object} Analysis result
 */
export function analyzeIngredients(ingredients, allergenType) {
  const db = allergenDatabase[allergenType];
  if (!db) throw new Error(`Unknown allergen type: ${allergenType}`);

  const normalizedIngredients = ingredients.map(i => i.toLowerCase().trim());
  const matchedUnsafe = [];
  const matchedCaution = [];
  const matchedSafe = [];

  for (const ingredient of normalizedIngredients) {
    if (!ingredient) continue;

    // Check unsafe terms
    for (const term of db.unsafe) {
      if (ingredientContainsTerm(ingredient, term)) {
        matchedUnsafe.push({ ingredient, matchedTerm: term, severity: 'unsafe' });
        break;
      }
    }

    // Check caution terms
    for (const term of db.caution) {
      if (ingredientContainsTerm(ingredient, term)) {
        // Don't add as caution if already matched as unsafe
        if (!matchedUnsafe.find(m => m.ingredient === ingredient)) {
          matchedCaution.push({ ingredient, matchedTerm: term, severity: 'caution' });
        }
        break;
      }
    }

    // Check safe terms (for informational purposes)
    for (const term of db.safe) {
      if (ingredientContainsTerm(ingredient, term)) {
        matchedSafe.push({ ingredient, matchedTerm: term, severity: 'safe' });
        break;
      }
    }
  }

  // Determine overall status
  let status;
  if (matchedUnsafe.length > 0) {
    status = 'unsafe';
  } else if (matchedCaution.length > 0) {
    status = 'caution';
  } else {
    status = 'safe';
  }

  // Determine confidence
  let confidence;
  if (ingredients.length === 0) {
    confidence = 'low';
  } else if (ingredients.length < 3) {
    confidence = 'medium';
  } else {
    confidence = 'high';
  }

  return {
    status,
    allergenType,
    allergenLabel: db.label,
    matchedUnsafe,
    matchedCaution,
    matchedSafe,
    totalIngredientsChecked: ingredients.length,
    confidence,
  };
}

/**
 * Check if an ingredient string contains a specific allergen term
 * Uses word-boundary matching to avoid false positives
 */
function ingredientContainsTerm(ingredient, term) {
  // Escape special regex characters in the term
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // Use word boundary matching
  const regex = new RegExp(`(^|[\\s,;.()\\[\\]/\\-])${escaped}($|[\\s,;.()\\[\\]/\\-:!])`, 'i');
  return regex.test(ingredient) || ingredient === term;
}

/**
 * Parse raw OCR text into individual ingredients
 */
export function parseIngredients(rawText) {
  if (!rawText || typeof rawText !== 'string') return [];

  let text = rawText;

  // Try to find the ingredients section
  const ingredientSectionRegex = /ingredients?\s*[:;.]\s*/i;
  const match = text.match(ingredientSectionRegex);
  if (match) {
    text = text.substring(match.index + match[0].length);
  }

  // Remove common non-ingredient sections that come after
  const stopPatterns = [
    /nutrition\s*facts?\s*[:;.]/i,
    /nutritional\s*information/i,
    /allergen\s*(info|warning|advice|information)/i,
    /contains?\s*[:;.]/i,
    /directions?\s*[:;.]/i,
    /storage\s*[:;.]/i,
    /manufactured\s*by/i,
    /distributed\s*by/i,
    /best\s*before/i,
    /use\s*by/i,
    /net\s*w(eigh)?t/i,
    /serving\s*size/i,
  ];

  for (const pattern of stopPatterns) {
    const stopMatch = text.match(pattern);
    if (stopMatch) {
      // Keep "contains" warnings as they're allergen-relevant
      if (/contains?\s*[:;.]/i.test(stopMatch[0])) {
        // Extract the contains line and append it
        const containsText = text.substring(stopMatch.index);
        text = text.substring(0, stopMatch.index);
        // Add contains info separately
        const containsMatch = containsText.match(/contains?\s*[:;.]\s*([^.]+)/i);
        if (containsMatch) {
          text += ', ' + containsMatch[1];
        }
      } else {
        text = text.substring(0, stopMatch.index);
      }
    }
  }

  // Clean up OCR artifacts
  text = text
    .replace(/\n/g, ' ')
    .replace(/\r/g, ' ')
    .replace(/\s+/g, ' ')
    // Common OCR misreads
    .replace(/[|]/g, 'l')
    .replace(/0(?=[a-z])/gi, 'o')
    .replace(/1(?=[a-z]{2})/gi, 'l')
    // Remove percentages in parentheses
    .replace(/\(\s*\d+\.?\d*\s*%?\s*\)/g, '')
    // Remove standalone numbers/percentages
    .replace(/\b\d+\.?\d*\s*%/g, '')
    // Remove E-numbers but keep the text
    .replace(/\b(e\s*\d{3,4}[a-z]?)\b/gi, '$1')
    .trim();

  // Split ingredients by common delimiters
  const ingredients = text
    .split(/[,;.]/)
    .map(i => i.trim())
    .filter(i => i.length > 1 && i.length < 100)
    // Remove purely numeric entries
    .filter(i => !/^\d+$/.test(i))
    // Remove entries that are just parenthetical content
    .filter(i => !/^\([^)]*\)$/.test(i));

  return ingredients;
}

export default allergenDatabase;
