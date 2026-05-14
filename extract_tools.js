const fs = require('fs');
const path = require('path');

const hardwareRaw = require('E:\\alwaqas-paint-new\\app\\hardware\\data.js').hardware;

// For tools, it's inside a JSX file. We can extract it with Regex or just copy-paste it here manually for simplicity.
const toolsRaw = [
  {
    name: "Captain Brushes",
    description: "Premium painting brushes designed for precision and smooth finishes, perfect for intricate wall and trim work.",
    image: "/tools/captain-brush.webp",
  },
  {
    name: "Universal Roller",
    description: "9-inch versatile roller for even paint coverage on walls, ceilings, and large surfaces.",
    image: "/tools/UNIVERSAL-ROLLER-N-EXT-1.webp",
  },
  {
    name: "Local Brushes",
    description: "Economical brushes suitable for everyday painting projects and DIY home applications.",
    image: "/tools/71bPe3QuxoS._UF894,1000_QL80_.jpg",
  },
  {
    name: "Paint Tray",
    description: "Durable paint tray with liners for clean, hassle-free painting with 9-inch rollers.",
    image: "/tools/istockphoto-495665869-612x612.jpg",
  },
  {
    name: "Roller Stick",
    description: "Extendable stainless steel pole to reach high walls and ceilings effortlessly.",
    image: "/tools/181912bd42f410dc063f0908cf5e6e6d.jpg",
  },
  {
    name: "Scraper",
    description: "Heavy-duty scraper for removing old paint and prepping surfaces for smooth, professional finishes.",
    image: "/tools/scrapper.png",
  },
  {
    name: "Spray Mubah",
    description: "Portable paint sprayer offering fast and even coverage for walls, ceilings, and textured surfaces.",
    image: "/tools/Paint-Spray-Bottles.png",
  },
  {
    name: "Deerfos Sandpaper",
    description: "Premium abrasive sandpaper for wood, metal, and paint surface preparation with uniform grit and durability.",
    image: "/tools/sandPaper.webp",
  },
  {
    name: "Artist Brushes",
    description: "Professional brushes for acrylic, oil, and watercolor, offering precision and smooth strokes for detailed work.",
    image: "/tools/artistBrushes.webp",
  },
  {
    name: "Texture Roller",
    description: "Specialty roller for decorative wall textures such as stipple, knockdown, or orange peel effects.",
    image: "/tools/Textured-rollers.webp",
  },
  {
    name: "Korenesh Sandpaper",
    description: "Coarse-grit sandpaper for heavy-duty surface prep and smoothing rough wood, metal, or drywall.",
    image: "/tools/kornish-sand-paper.png",
  },
  {
    name: "SMT Steel Cutting Disc",
    description: "3.2mm thick steel cutting disc for angle grinders, delivering precision cuts through angle iron and sheet metal at up to 15,300 RPM with minimal heat and burrs",
    image: "/tools/SMT-steel-cutting-disc-3.2mm-1000x1269.jpg",
  },
  {
    name: "Commander Paint Roller",
    description: "Pakistan-made Commander paint roller featuring high quality, shed-resistant, thermo-bonded construction for easy multi-purpose painting applications.",
    image: "/tools/S9e4a4f7625774353a885c7723aef5bf9k.jpg_2200x2200q80.jpg_.webp",
  },
  {
    name: "SMT 4″ Premium Thin Turbo Diamond Saw Blade",
    description: "105mm turbo diamond blade with 1.2mm thin kerf for chip-free cuts in tile, marble, granite, and porcelain. Rated for 14,500 RPM with reinforced steel core.",
    image: "/tools/SMT-Premium-thin-urbo-diamond-cutter-422-1000x1269.jpg",
  },
  {
    name: "Inox Stainless Steel Discs (Green)",
    description: "Green stainless steel cutting discs for efficient metal cutting. Designed for durability and precision on stainless steel and other metal surfaces.",
    image: "/tools/InoxStainlessSteelDiscs.webp",
  },
  {
    name: "SMT Diamond Cutter Blade Turbo Wave 7″",
    description: "7-inch turbo wave diamond blade for fast, smooth cutting of concrete, stone, and masonry. Designed for high-performance with wave segments for efficient debris removal.",
    image: "/tools/SMT-Turbo-wave-7-inch.jpg",
  },
  {
    name: "Concrete Rubbing Block (Watti)",
    description: "Multi-grit rubbing block for smoothing and finishing concrete surfaces. Ideal for removing imperfections and achieving polished results on concrete work.",
    image: "/tools/01100elf.jpg",
  },
  {
    name: "Measuring Tape",
    description: "Durable retractable measuring tape for accurate length measurements in construction, carpentry, and DIY projects. Features clear markings and sturdy casing.",
    image: "/tools/SM-35_870x.webp",
  },
  {
    name: "Protective Gloves for Painting",
    description: "Durable protective gloves designed for painting projects. Provides hand protection from paints, chemicals, and solvents while ensuring comfort and grip.",
    image: "/tools/close-up-view-man-s-hand-wearing-gloves-holding-paint-roller-white-wall-painting_461973-648.jpg",
  }
];

const getCategoryForHardware = (name) => {
  const n = name.toLowerCase();
  if (n.includes('drill bit') || n.includes('drill (s d s')) return 'drill-bits';
  if (n.includes('disc') || n.includes('grind') || n.includes('grinder') || n.includes('rubbing')) return 'grinder-discs';
  if (n.includes('hammer') || n.includes('saw') || n.includes('compressor') || n.includes('washer') || n.includes('planer') || n.includes('electric') && n.includes('spray')) return 'power-tools';
  if (n.includes('cutter') || n.includes('blade')) return 'blades';
  if (n.includes('nail') || n.includes('screw') || n.includes('plier') || n.includes('tester') || n.includes('driver') || n.includes('stone') || n.includes('plug') || n.includes('clip') || n.includes('level') || n.includes('glue')) return 'hand-tools';
  return 'hand-tools';
};

const getCategoryForTools = (name) => {
  const n = name.toLowerCase();
  if (n.includes('brush')) return 'brushes';
  if (n.includes('roller')) return 'rollers';
  if (n.includes('scrap')) return 'scrappers';
  if (n.includes('tray') || n.includes('glove') || n.includes('tape') || n.includes('spray')) return 'deco-sets';
  if (n.includes('sand')) return 'sandpapers';
  return 'deco-sets';
};

const hardwareProducts = hardwareRaw.map(h => ({
  slug: h.id || h.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  title: h.name,
  image: h.image,
  shortDesc: h.description,
  category: getCategoryForHardware(h.name)
}));

// Also include sandpapers and measuring tapes from the tools list into hardware if needed, or vice-versa
const toolsProducts = toolsRaw.map(h => {
  const isSandpaper = h.name.toLowerCase().includes('sand');
  return {
    slug: h.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    title: h.name,
    image: h.image,
    shortDesc: h.description,
    category: isSandpaper ? 'sandpapers' : getCategoryForTools(h.name)
  };
});

// Some tools belong in hardwareTools (like sandpapers, cutting discs in tools array)
const finalHardware = hardwareProducts.concat(
  toolsProducts.filter(t => t.category === 'sandpapers' || t.title.toLowerCase().includes('disc') || t.title.toLowerCase().includes('cutter'))
);

const finalAccessories = toolsProducts.filter(t => t.category !== 'sandpapers' && !t.title.toLowerCase().includes('disc') && !t.title.toLowerCase().includes('cutter'));

fs.writeFileSync('e:\\hat-traders\\src\\lib\\data\\hardwareProducts.ts', `export const hardwareProducts = ${JSON.stringify(finalHardware, null, 2)};`);
fs.writeFileSync('e:\\hat-traders\\src\\lib\\data\\accessoryProducts.ts', `export const accessoryProducts = ${JSON.stringify(finalAccessories, null, 2)};`);

console.log('Done mapping.');
