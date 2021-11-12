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
    option:
      'Organization not specifically dedicated to urban ag that operates a farm or garden (e.g., nonprofit, hospital, culinary institution, prison)',
    select: true,
    label: 'Institutional Garden',
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
  { option: 'Home garden', select: true },
  {
    option: 'Potential community farm or garden',
    select: false,
    label: 'Potential Community Garden',
    color: teal[500],
    checked: false,
  },
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

export const FARM_PROPS = {
  // order matters for sidebar display
  name: { label: 'Name', helpText: 'What is the name of the farm or garden?' },
  address: {
    label: 'Address',
    helpText: "What is the address of this farm or garden's location?",
  },
  locations: { default: [] },
  type: {
    label: 'Type',
    helpText: 'How would you describe your farm or garden?',
    options: AG_TYPES.filter((d) => d.select).map((d) => d.option),
  },
  environments: {
    label: 'Environment',
    helpText: 'Where is your farm or garden situated?',
    options: Object.keys(ENVIRONMENTS),
    multiple: true,
  },
  enviroDetails: { label: 'Environment detail', default: [] },
  area: { label: 'Area (sqft)', int: true },
  indoorFloors: { default: [] },
  floors: {
    label: 'Area',
    adorn: 'sqft',
    title: 'What is the horizontal area of your farm or garden by floor?',
    fields: [
      { pattern: 'indoor', name: 'areaCellar', label: 'Cellar' },
      {
        pattern: 'ground|garden-specific|other',
        name: 'areaGround',
        label: 'Ground',
      },
      { pattern: 'indoor', name: 'areaFloor1', label: '1st floor' },
      { pattern: 'indoor', name: 'areaFloor2', label: '2nd floor' },
      { pattern: '.', name: 'areaOther', label: 'Other' },
      { pattern: 'roof', name: 'areaRoof', label: 'Roof' },
    ],
  },
  percentFood: { label: 'Food share', default: 80 },
  orgName: {
    label: 'Organization',
    helpText:
      'What is the name of the supporting organization, agency, or company (if not the same as the farm or garden)?',
  },
  orgType: {
    label: 'Org structure',
    helpText:
      'What is the corporate or organizational structure of your farm or garden?',
    options: ['C corp', 'S corp', 'LLC', 'Not-for-profit'],
  },
  bCorp: { label: 'B corporation', default: false },
  priorities: {
    label: 'Priorities',
    helpText:
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
    label: 'Accessibility',
    helpText: 'Is your farm or garden accessible by the public?',
    options: [
      'Yes, during operational hours',
      'Yes, by tour/reservation only',
      'No, only for workers/managers',
    ],
  },
  adModes: {
    label: 'Publicity',
    helpText: 'How can members of the community find your farm or garden?',
    options: [
      'Signage in front of farm or garden',
      'We do outreach to community so they know where we are',
      'Website, social media, and other digital resources',
      'Other',
    ],
    multiple: true,
  },
  growMethods: {
    label: 'Methods',
    helpText: 'Which of the following methods do you use?',
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
    label: 'Aquaculture',
    helpText:
      'Does the farm or garden uses a recirculating aquaculture system (RAS) or non-recirculating system?',
    options: [
      'Recirculating aquaculture system (RAS)',
      'Non-recirculating system',
    ],
  },
  ponicType: {
    label: 'Aquaponics',
    helpText:
      'Which of the following technologies are used for food production?',
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
    label: 'Watering',
    helpText: 'How do you water your plants?',
    options: ['Surface	subsurface', 'Sprinklers', 'Drip'],
  },
  iotTypes: {
    label: 'IoT',
    helpText:
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
    label: 'Pest management',
    helpText: 'What pest management method do you use?',
    options: ['Chemical', 'IPM (integrated pest management)', 'Technological'],
  },
  usdaOrganic: {
    label: 'Organic',
    helpText: 'Are you USDA organic certified?',
    options: [
      'Yes',
      'No',
      'No, but working on it',
      'No, but the farm or garden fits the criteria',
    ],
  },
  compost: {
    label: 'Compost',
    helpText: 'How do you compost?',
    options: ['On-site', 'Off-site', 'Do not compost'],
  },
  compostOffsite: {
    label: 'Compost arrangement',
    helpText: 'What is your composting arrangement?',
    options: [
      'Third-party contractor (private)',
      'Municipal pick-up (curbside)',
      'Drop-off',
      'Partnership with another farm or garden',
    ],
  },
  compostOnsite: {
    label: 'Compost type',
    helpText: 'What type of composting system do you use?',
    options: ['Aerobic', 'Anaerobic', 'Vermicomposting', 'Other'],
  },
  dischargeMethods: {
    label: 'Wastewater',
    helpText: 'How do you manage any wastewater?',
    options: [
      'Discharge to sanitary sewer (e.g., directly down the drain)',
      'Discharge to sanitary sewer after on-site filtration (e.g., UV treatment, reverse osmosis)',
    ],
    multiple: true,
  },
  dischargePermit: {
    label: 'Sewer discharge',
    helpText: 'Are you required to maintain sewer discharge permits?',
    options: ['Yes', 'No', "I don't know"],
  },
  distroRegion: {
    label: 'Distribution region',
    helpText: 'Where is most of your food distributed?',
    options: [
      'Locally (within your neighborhood)',
      'Within county/borough',
      'Within New York City',
      'Within NY State',
      'Outside of NY State',
    ],
  },
  crops: {
    label: 'Production',
    adorn: 'lbs',
    title:
      'How many pounds of each product/crop below were harvested in the past 3 years?',
    fields: [
      {
        name: 'cropSalad',
        label: 'Salad greens',
        helpText: 'Lettuce, salad mix, spring mix, arugula',
      },
      { name: 'cropMicrogreens', label: 'Microgreens' },
      {
        name: 'cropLeafy',
        label: 'Other leafy greens',
        helpText: 'Chard, kale, cabbage',
      },
      {
        name: 'cropHerbs',
        label: 'Herbs',
        helpText: 'Cut or live; mint, oregano, rosemary',
      },
      {
        name: 'cropVine',
        label: 'Vine vegetables',
        helpText: 'Tomatoes, cucumbers, peppers',
      },
      {
        name: 'cropRoot',
        label: 'Root vegetables',
        helpText: 'Carrots, radishes, beets, kohlrabi',
      },
      {
        name: 'cropStarch',
        label: 'Root starch vegetables',
        helpText: 'Potatoes, yams, sweet potatoes',
      },
      {
        name: 'cropCruciferous',
        label: 'Cruciferous vegetables',
        helpText: 'Broccoli, cauliflower',
      },
      {
        name: 'cropGourds',
        label: 'Squashes or gourds',
        helpText: 'Zucchini, pumpkin',
      },
      { name: 'cropFunghi', label: 'Fungi', helpText: 'Mushrooms' },
      {
        name: 'cropBerries',
        label: 'Berries',
        helpText: 'Raspberries, blueberries, strawberries',
      },
      {
        name: 'cropMelons',
        label: 'Melons',
        helpText: 'Cantaloupe, watermelon',
      },
      {
        name: 'cropFruits',
        label: 'Tree fruits',
        helpText: 'Apples, pears, peaches, nectarines, cherries',
      },
      {
        name: 'cropNuts',
        label: 'Tree nuts',
        helpText: 'Almonds, pistachios, walnuts',
      },
      { name: 'cropEggs', label: 'Chicken eggs' },
      {
        name: 'cropChicken',
        label: 'Chicken products',
        helpText: 'Other products from chickens',
      },
      {
        name: 'cropLivestock',
        label: 'Livestock products',
        helpText:
          'Products from cows, sheep, goats, or other traditional livestock',
      },
      {
        name: 'cropFish',
        label: 'Fish',
        helpText: 'Fish, shellfish, or snails',
      },
      {
        name: 'cropInsects',
        label: 'Insects',
        helpText: 'Crickets, black soldier fly',
      },
      { name: 'cropMicroalgae', label: 'Microalgae', helpText: 'Spirulina' },
      { name: 'cropStarts', label: 'Nursery starts' },
      {
        name: 'cropOrnamentals',
        label: 'Ornamental plants',
        helpText: 'Flowers',
      },
      { name: 'cropCannabis', label: 'Cannabis' },
      { name: 'cropOther', label: 'Other' },
    ],
  },
  distros: {
    label: 'Distribution',
    adorn: 'lbs',
    title:
      'How many pounds did you sell or distribute through the following market channels in the last three years?',
    fields: [
      { name: 'distroBox', label: 'Big box store', helpText: 'Target, Costco' },
      { name: 'distroCorner', label: 'Bodega/corner store' },
      {
        name: 'distroSuper',
        label: 'Supermarket',
        helpText: 'Key Food, Whole Foods',
      },
      { name: 'distroRestaurant', label: 'Restaurants' },
      { name: 'distroWeb', label: 'Farm/garden website' },
      { name: 'distroCSA', label: 'CSA' },
      { name: 'distroMarket', label: 'Farmers markets' },
      { name: 'distroOnsite', label: 'On-site market' },
      { name: 'distroDonation', label: 'Donation' },
      { name: 'distroHub', label: 'Aggregator/food processor/food hub' },
      { name: 'distroPersonal', label: 'Personal consumption' },
      { name: 'distroOther', label: 'Other' },
    ],
  },
  founding: {
    label: 'Founded',
    helpText: 'What year was the farm or garden founded?',
    default: null,
  },
  ownership: {
    label: 'Ownership',
    helpText: 'Who owns the land the farm or garden is operating on?',
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
    label: 'Zoning',
    helpText:
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
    label: 'Rent/mortgage',
    helpText: 'What is your monthly cost for land (rent or mortgage)?',
    int: true,
    adorn: '$',
  },
  landValue: {
    label: 'Land value',
    helpText: 'How much is your land worth?',
    int: true,
    adorn: '$',
  },
  positions: { default: [] },
  wages: { default: [] },
  employees: {
    label: 'Employees',
    helpText: 'How many people have you employed in the past three years?',
    int: true,
  },
  volunteers: {
    label: 'Volunteers',
    helpText: 'How many volunteers worked for you in the past three years?',
    int: true,
  },
  volunteerHours: {
    label: 'Volunteer hours',
    helpText:
      'How many hours of labor were produced by volunteers in the past three years',
    int: true,
  },
  outreachHours: {
    label: 'Outreach hours',
    helpText:
      'How many hours annually farm or garden employees spend on unpaid community outreach',
    int: true,
  },
  localWorkers: {
    label: 'Local workers',
    helpText:
      'How many of your workers come from the general neighborhood in which the farm or garden is situated?',
    options: ['All', 'Most', 'Some', 'Few', 'None'],
  },
  studentPrograms: {
    label: 'Student programs',
    helpText:
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
    label: 'Skills programs',
    helpText:
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
  authUsers: {},
  updatedAt: { label: 'Last updated' },
};

export const FARM_DEFAULT = Object.fromEntries(
  Object.entries(FARM_PROPS)
    .map(([k, v]) => {
      const data = v.fields ? v.fields : [v];
      return data.map((d) => {
        const name = v.fields ? d.name : k;
        const def = d.default !== undefined ? d.default : d.multiple ? [] : '';
        return [name, def];
      });
    })
    .flat()
);

export const FILTER_DEFAULT = {
  types: AG_TYPES.filter((d) => d.checked).map((d) => d.option),
  environments: Object.keys(ENVIRONMENTS),
};

export const LAYER_SLIDERS = [
  {
    name: 'cdc_mental',
    label: 'Poor mental health',
    max: 30,
  },
  {
    name: 'cdc_physical',
    label: 'Poor physical health',
    max: 30,
  },
  {
    name: 'acs_income',
    label: 'Median household income',
    min: 5000,
    max: 300000,
    step: 5000,
    format: (v) => `$${v.toLocaleString('en')}`,
  },
  {
    name: 'acs_bachelors',
    label: "At least bachelor's",
  },
  { name: 'acs_hs', label: 'At least high school' },
  { name: 'acs_foreign', label: 'Foreign born' },
  { name: 'acs_white', label: 'White' },
  { name: 'acs_child', label: 'Has child' },
  { name: 'acs_alone', label: 'Living alone' },
  {
    name: 'acs_participation',
    label: 'Labor force participation',
  },
  {
    name: 'population',
    label: 'Population',
    max: 30000,
    step: 1000,
    format: (v) => v.toLocaleString('en'),
  },
];

export const PAINT_COLOR = {
  type: [
    ...AG_TYPES.filter((d) => d.label)
      .map((d) => [d.option, d.color])
      .flat(),
    '#ccc',
  ],
};

const GIST_REPO = 'https://gist.githubusercontent.com/ampu3ro';

export const POI_PROPS = [
  {
    name: 'pantry',
    url: `${GIST_REPO}/1cc8e3347805d344c1b3a3638d25caa1/raw/8d76a1d543551097559e2bdcf4566f20262bd313/nyc_pantries.geojson`,
    symbol: 'convenience',
  },
];

export const SOCIOECONOMIC_URL = `${GIST_REPO}/34609e91dedb19591e3d57203c9b4162/raw/c9fc9c2bf756f3e160e2f865b2ceba16c79f10d8/nyc_socio_economic.geojson`;
