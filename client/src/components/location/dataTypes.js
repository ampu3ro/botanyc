import {
  pink,
  deepPurple,
  green,
  deepOrange,
  amber,
  teal,
} from '@mui/material/colors';

export const AG_TYPES = [
  {
    option: 'Commercial farm or garden',
    select: true,
    label: 'Commercial Farm',
    color: pink[500],
    checked: true,
  },
  {
    option: 'Non-commercial farm or garden',
    select: true,
    label: 'Non-commercial Farm',
    color: deepPurple[500],
    checked: true,
  },
  {
    option: 'Community farm or garden',
    select: true,
    label: 'Community Garden',
    color: green[500],
    checked: true,
  },
  {
    option: 'NYCHA farm or garden',
    select: false,
    label: 'NYCHA Garden',
    color: deepOrange[500],
    checked: true,
  },
  {
    option: 'School farm or garden (including universities)',
    select: true,
    label: 'School Garden',
    color: amber[500],
    checked: true,
  },
  {
    option: 'Potential community farm or garden',
    select: false,
    label: 'Potential Community Garden',
    color: teal[500],
    checked: false,
  },
  {
    option:
      'Organization not specifically dedicated to urban ag that operates a farm or garden (e.g., nonprofit, hospital, culinary institution, prison)',
    select: true,
  },
  { option: 'Home garden', select: true },
  { option: 'Other', select: true },
];

export const ENVIRONMENTS = {
  Outdoor: [
    'Ground-level lot repurposed for agriculture',
    'Ground-level lot on NYC parkland',
    'Roof',
  ],
  Indoor: [
    'Farm- or garden-specific structure',
    'Within an existing structure',
  ],
};

export const FARM_FIELDS = {
  floors: {
    label: 'What is the horizontal area of your farm or garden by floor?',
    fields: [
      { pattern: 'indoor', id: 'areaCellar', label: 'Cellar' },
      {
        pattern: 'ground|garden-specific|other',
        id: 'areaGround',
        label: 'Ground',
      },
      { pattern: 'indoor', id: 'areaFloor1', label: '1st floor' },
      { pattern: 'indoor', id: 'areaFloor2', label: '2nd floor' },
      { pattern: '.', id: 'areaOther', label: 'Other' },
      { pattern: 'roof', id: 'areaRoof', label: 'Roof' },
    ],
  },
  crops: {
    label:
      'How many pounds of each product/crop below were harvested in the past 3 years?',
    fields: [
      {
        id: 'cropSalad',
        label: 'Salad greens (lettuce, salad mix, spring mix, arugula)',
      },
      { id: 'cropMicrogreens', label: 'Microgreens' },
      { id: 'cropLeafy', label: 'Other leafy greens (chard, kale, cabbage)' },
      {
        id: 'cropHerbs',
        label: 'Herbs (cut or live; mint, oregano, rosemary)',
      },
      {
        id: 'cropVine',
        label: 'Vine vegetables (tomatoes, cucumbers, peppers)',
      },
      {
        id: 'cropRoot',
        label: 'Root vegetables (carrots, radishes, beets, kohlrabi)',
      },
      {
        id: 'cropStarch',
        label: 'Root starch vegetables (potatoes, yams, sweet potatoes)',
      },
      { id: 'cropCruciferous', label: 'Broccoli or cauliflower' },
      { id: 'cropGourds', label: 'Squashes or gourds (zucchini, pumpkin)' },
      { id: 'cropFunghi', label: 'Mushrooms/fungi' },
      {
        id: 'cropBerries',
        label: 'Berries (raspberries, blueberries, strawberries)',
      },
      { id: 'cropMelons', label: 'Melons (cantaloupe, watermelon)' },
      {
        id: 'cropFruits',
        label: 'Tree fruits (apples, pears, peaches, nectarines, cherries)',
      },
      { id: 'cropNuts', label: 'Tree nuts (almonds, pistachios, walnuts)' },
      { id: 'cropEggs', label: 'Chicken eggs' },
      { id: 'cropChicken', label: 'Other products from chickens' },
      {
        id: 'cropLivestock',
        label:
          'Products from cows, sheep, goats, or other traditional livestock',
      },
      { id: 'cropFish', label: 'Fish, shellfish, or snails' },
      { id: 'cropInsects', label: 'Insects (crickets, black soldier fly)' },
      { id: 'cropMicroalgae', label: 'Microalgae (Spirulina)' },
      { id: 'cropStarts', label: 'Nursery starts' },
      { id: 'cropOrnamentals', label: 'Ornamental plants (flowers)' },
      { id: 'cropCannabis', label: 'Cannabis' },
      { id: 'cropOther', label: 'Other' },
    ],
  },
  distros: {
    label:
      'How many pounds did you sell or distribute through the following market channels in the last three years?',
    fields: [
      { id: 'distroBox', label: 'Big box store (e.g., Target, Costco)' },
      { id: 'distroCorner', label: 'Bodega/corner store' },
      { id: 'distroSuper', label: 'Supermarket (e.g., Key Food, Whole Foods)' },
      { id: 'distroRestaurant', label: 'Restaurants' },
      { id: 'distroWeb', label: 'Farm or garden website' },
      { id: 'distroCSA', label: 'CSA' },
      { id: 'distroMarket', label: 'Farmers markets' },
      { id: 'distroOnsite', label: 'On-site market' },
      { id: 'distroDonation', label: 'Donation' },
      { id: 'distroHub', label: 'Aggregator/food processor/food hub' },
      { id: 'distroPersonal', label: 'Personal consumption' },
      { id: 'distroOther', label: 'Other' },
    ],
  },
};

export const FARM_PROPS = {
  address: {
    label: "What is the address of this farm or garden's location?",
  },
  name: { label: 'What is the name of the farm or garden?' },
  locations: { default: [] },
  type: {
    label: 'How would you describe your farm or garden?',
    options: AG_TYPES.filter((d) => d.select).map((d) => d.option),
  },
  environments: {
    label: 'Where is your farm or garden situated?',
    options: Object.keys(ENVIRONMENTS),
    multiple: true,
  },
  enviroDetails: { default: [] },
  indoorFloors: { default: [] },
  orgName: {
    label:
      'What is the name of the supporting organization, agency, or company (if not the same as the farm or garden)?',
  },
  orgType: {
    label:
      'What is the corporate or organizational structure of your farm or garden?',
    options: ['C corp', 'S corp', 'LLC', 'Not-for-profit'],
  },
  bCorp: { default: false },
  area: {},
  areaCellar: {},
  areaGround: {},
  areaFloor1: {},
  areaFloor2: {},
  areaOther: {},
  areaRoof: {},
  percentFood: { default: 80 },
  priorities: {
    label:
      "Please rank the following in order of priority based on the farm or garden's mission statement",
    options: [
      'Growing and selling food for profit',
      'Training new farmers (entrepreneurship)',
      'Improving local food insecurity',
      'Addressing food justice',
      'Spurring local economic development',
      'Personal consumption',
      'Other',
    ],
    multiple: true,
  },
  accessibility: {
    label: 'Is your farm or garden accessible by the public?',
    options: [
      'Yes, during operational hours',
      'Yes, by tour/reservation only',
      'No, only for workers/managers',
    ],
  },
  adModes: {
    label: 'How can members of the community find your farm or garden?',
    options: [
      'Signage in front of farm or garden',
      'We do outreach to community so they know where we are',
      'Website, social media, and other digital resources',
      'Other',
    ],
    multiple: true,
  },
  growMethods: {
    label: 'Which of the following methods do you use?',
    options: [
      'Raised beds (soil)',
      'Container (soil)',
      'Hydroponics/aeroponics (soil-free)',
      'Aquaculture (fish)',
      'Aquaponics (soil-free + fish)',
      'Fungiculture (mushrooms)',
      'Apiculture (beekeeping)',
      'Other (e.g., ranching, silviculture)',
    ],
    multiple: true,
  },
  aquaType: {
    label:
      'Does the farm or garden uses a recirculating aquaculture system (RAS) or non-recirculating system?',
    options: [
      'Recirculating aquaculture system (RAS)',
      'Non-recirculating system',
    ],
  },
  ponicType: {
    label: 'Which of the following technologies are used for food production?',
    options: [
      'Nutrient film technique (NFT)',
      'Vertical tower',
      'Deep water culture (DWC)',
      'Aeroponic',
      'Bucket',
      'Other',
    ],
  },
  waterType: {
    label: 'How do you water your plants?',
    options: ['Surface	subsurface', 'Sprinklers', 'Drip'],
  },
  iotTypes: {
    label:
      "What kinds of 'smart' (Internet-of-Things enabled) sensors do you use if any?",
    options: [
      'Smart EC (electrical conductivity) sensor',
      'Smart pH sensor',
      'Smart ORP (oxidation-reduction potential) sensor',
      'Smart air sensor (temperature and humidity)',
      'Camera, optical',
      'Camera, infrared or hyperspectral',
      'Any sensor tied into a cultivation management platform/“operating system” for the farm or garden',
      'Do not use smart sensors',
      'Yes, but not sure what kind',
      "I don't know if we use them",
    ],
    multiple: true,
  },
  pestManagement: {
    label: 'What pest management method do you use?',
    options: ['Chemical', 'IPM (integrated pest management)', 'Technological'],
  },
  usdaOrganic: {
    label: 'Are you USDA organic certified?',
    options: [
      'Yes',
      'No',
      'No, but working on it',
      'No, but the farm or garden fits the criteria',
    ],
  },
  compost: {
    label: 'How do you compost?',
    options: ['On-site', 'Off-site', 'Do not compost'],
  },
  compostOffsite: {
    label: 'What is your composting arrangement?',
    options: [
      'Third-party contractor (private)',
      'Municipal pick-up (curbside)',
      'Drop-off',
      'Partnership with another farm or garden',
    ],
  },
  compostOnsite: {
    label: 'What type of composting system do you use?',
    options: ['Aerobic', 'Anaerobic', 'Vermicomposting', 'Other'],
  },
  dischargeMethods: {
    label: 'How do you manage any wastewater?',
    options: [
      'Discharge to sanitary sewer (e.g., directly down the drain)',
      'Discharge to sanitary sewer after on-site filtration (e.g., UV treatment, reverse osmosis)',
    ],
    multiple: true,
  },
  dischargePermit: {
    label: 'Are you required to maintain sewer discharge permits?',
    options: ['Yes', 'No', "I don't know"],
  },
  distroRegion: {
    label: 'Where is most of your food distributed?',
    options: [
      'Locally (within your neighborhood)',
      'Within county/borough',
      'Within New York City',
      'Within NY State',
      'Outside of NY State',
    ],
  },
  cropSalad: {},
  cropMicrogreens: {},
  cropLeafy: {},
  cropHerbs: {},
  cropVine: {},
  cropRoot: {},
  cropCruciferous: {},
  cropStarch: {},
  cropGourds: {},
  cropFunghi: {},
  cropMelons: {},
  cropBerries: {},
  cropFruits: {},
  cropNuts: {},
  cropEggs: {},
  cropChicken: {},
  cropLivestock: {},
  cropFish: {},
  cropInsects: {},
  cropMicroalgae: {},
  cropStarts: {},
  cropOrnamentals: {},
  cropCannabis: {},
  cropOther: {},
  distroBox: {},
  distroCorner: {},
  distroSuper: {},
  distroRestaurant: {},
  distroWeb: {},
  distroCSA: {},
  distroMarket: {},
  distroOnsite: {},
  distroDonation: {},
  distroHub: {},
  distroPersonal: {},
  distroOther: {},
  founding: {
    label: 'What year was the farm or garden founded?',
    default: null,
  },
  ownership: {
    label: 'Who owns the land the farm or garden is operating on?',
    options: [
      'The farm or garden itself',
      'An individual',
      'A farm or garden umbrella organization',
      'A non-farm/garden parent organization or institution',
      'The government (public land)',
      'Other',
    ],
  },
  zoning: {
    label:
      "What is the zone type based on the zoning code for the farm or garden's location?",
    options: [
      'Residential (begins with R)',
      'Commercial (begins with C)',
      'Manufacturing (begins with M)',
    ],
  },
  leaseStart: { label: 'Start date', default: null },
  leaseEnd: { label: 'End date', default: null },
  rent: {
    label: 'What is your monthly cost for land (rent or mortgage)?',
    int: true,
    adorn: '$',
  },
  landValue: {
    label: 'How much is your land worth?',
    int: true,
    adorn: '$',
  },
  positions: { default: [] },
  wages: { default: [] },
  employees: {
    label: 'How many people have you employed in the past three years?',
    int: true,
  },
  volunteers: {
    label: 'How many volunteers worked for you in the past three years?',
    int: true,
  },
  volunteerHours: {
    label: 'How many volunteers worked for you in the past three years?',
    int: true,
  },
  outreachHours: {
    label:
      'How many hours annually farm or garden employees spend on unpaid community outreach',
    int: true,
  },
  localWorkers: {
    label:
      'How many of your workers come from the general neighborhood in which the farm or garden is situated?',
    options: ['All', 'Most', 'Some', 'Few', 'None'],
  },
  studentPrograms: {
    label:
      'Do you offer programming for K–12 students? If yes, what services or programs do you offer?',
    options: [
      'No, we do not offer any K–12 student programming',
      'Field trips/tours',
      'Extracurricular',
      'Special events',
      'Classes',
      'Other',
    ],
    multiple: true,
  },
  skillsPrograms: {
    label:
      'Do you offer classes, job training, or skills building opportunities? If yes, what are they?',
    options: [
      'No, we do not offer any classes, training, or workshops',
      'Culinary activities (cooking, mixology, pickling, processing/creating value-added foods)',
      'Farming or gardening (horticultural activities)',
      'Nutrition',
      'Business',
      'Beekeeping',
      'Composting',
      'Other',
    ],
    multiple: true,
  },
  authEmails: {},
};

export const FARM_DEFAULT = Object.fromEntries(
  Object.entries(FARM_PROPS).map(([k, v]) => {
    const d = v.default !== undefined ? v.default : v.multiple ? [] : '';
    return [k, d];
  })
);

export const FILTER_DEFAULT = {
  types: AG_TYPES.filter((d) => d.checked).map((d) => d.option),
  environments: Object.keys(ENVIRONMENTS),
};
