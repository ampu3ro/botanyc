import {
  red,
  pink,
  deepPurple,
  blue,
  cyan,
  green,
  lime,
  amber,
  deepOrange,
  brown,
  teal,
  blueGrey,
} from '@mui/material/colors';

// select determines if it shows up as a dropdown option in the form
// whether checked is defined determines if it shows up on the map
export const AG_TYPES = [
  {
    label:
      'Commercial farm or garden (i.e., selling $1000 or more of produce per year)',
    value: 'Commercial',
    color: pink[500],
    checked: true,
  },
  {
    label: 'Community/non-commercial farm or garden',
    value: 'Non-commercial',
    color: green[500],
    checked: true,
  },
  {
    label: 'NYCHA farm or garden',
    value: 'NYCHA',
    select: false,
    color: deepOrange[500],
    checked: true,
  },
  {
    label:
      'Organization not specifically dedicated to urban ag that operates a farm or garden (e.g., nonprofit, hospital, culinary institution, prison)',
    value: 'Institutional',
    select: true,
    color: brown[500],
    checked: false,
  },
  {
    label: 'School farm or garden (including universities)',
    value: 'School',
    select: true,
    color: amber[500],
    checked: true,
  },
  { label: 'Home garden', value: 'Home', select: true },
  {
    label: 'Potential community farm or garden  (LL48 of 2011)',
    value: 'Potential',
    select: false,
    color: teal[500],
    checked: false,
  },
  { label: 'Other', value: 'Other', select: true },
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

const COUNT_RANGE = ['1-10', '11-20', '21-30', '31 or more'];
const SALARY_RANGE = [
  '$0–24,999',
  '$25,000–49,999',
  '$50,000–74,999',
  '$75,000–99,999',
  '$100,000 or more',
];

export const FARM_PROPS = {
  // order matters for sidebar display
  name: { label: 'Name', helpText: 'What is the name of the farm or garden?' },
  orgName: {
    label: 'Organization',
    helpText:
      'What is the name of the supporting organization, agency, or company (if not the same as the farm or garden)?',
  },
  address: {
    label: 'Address',
    helpText: "What is the address of this farm or garden's location?",
  },
  website: {
    label: 'Website',
    helpText: 'What is the primary website of your farm or garden?',
  },
  socials: {
    label: 'Social Media',
    helpText:
      'What are the social media handles of your farm or garden? (comma separated)',
  },
  type: {
    label: 'Farm or garden type',
    helpText: 'What is the best way to describe your farm or garden?',
    options: AG_TYPES.filter((d) => d.select),
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
      { pattern: '.', name: 'areaOther', label: 'Other' },
      { pattern: 'roof', name: 'areaRoof', label: 'Roof' },
    ],
  },
  percentFood: { label: 'Food share', default: 80 },
  headquarters: {
    label: 'Headquarters',
    helpText:
      'What is the address of this farm or garden’s headquarters (if separate from this farm or garden’s address)?',
  },
  orgType: {
    label: 'Org structure',
    helpText:
      'What is the corporate or organizational structure of your farm or garden?',
    options: ['C corp', 'S corp', 'LLC', 'Not-for-profit', 'Other'],
  },
  bCorp: {
    label: 'B corporation',
    helpText: 'Are you a certified B corp (benefit corporation)?',
    options: ['Yes', 'No'],
  },
  priorities: {
    label: 'Socioeconomic priorities',
    helpText:
      "Please rank your top 3 priorities based on the farm or garden's mission statement",
    options: [
      'Growing and selling food for profit',
      'Training new farmers (entrepreneurship) or other green job training',
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
  publicity: {
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
    label: 'Grow methods',
    helpText: 'Which of the following methods do you use?',
    options: [
      'Raised beds or in-ground (soil)',
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
  aquaculture: {
    label: 'Aquaculture',
    helpText:
      'Does the farm or garden uses a recirculating aquaculture system (RAS) or non-recirculating system?',
    options: [
      'Recirculating aquaculture system (RAS)',
      'Non-recirculating system',
    ],
  },
  aquaponics: {
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
  iot: {
    label: 'IoT sensors',
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
    label: 'Composting',
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
    label: 'Crops produced',
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
    label: 'Distribution channels',
    adorn: 'lbs',
    title:
      'How many pounds did you sell or distribute through the following market channels in the last three years?',
    fields: [
      {
        name: 'distroBox',
        label: 'Big box store',
        helpText: 'Target, Costco',
        color: pink[500],
      },
      {
        name: 'distroCorner',
        label: 'Bodega/corner store',
        color: deepPurple[500],
      },
      {
        name: 'distroSuper',
        label: 'Supermarket',
        helpText: 'Key Food, Whole Foods',
        color: red[500],
      },
      { name: 'distroRestaurant', label: 'Restaurants', color: blue[500] },
      { name: 'distroWeb', label: 'Farm/garden website', color: cyan[500] },
      { name: 'distroCSA', label: 'CSA', color: lime[500] },
      { name: 'distroMarket', label: 'Farmers markets', color: green[500] },
      { name: 'distroOnsite', label: 'On-site market', color: amber[500] },
      { name: 'distroDonation', label: 'Donation', color: deepOrange[500] },
      {
        name: 'distroHub',
        label: 'Aggregator/food processor/food hub',
        color: brown[500],
      },
      {
        name: 'distroPersonal',
        label: 'Personal consumption',
        color: teal[500],
      },
      { name: 'distroOther', label: 'Other', color: blueGrey[500] },
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
  fullTime: {
    label: 'Full-time employees',
    helpText:
      'How many people have worked full-time at your farm or garden, regardless of pay, in the past year? (I.e., how many full-time positions does your farm or garden have?)',
    options: ['0 (no one works full-time, regardless of pay)', ...COUNT_RANGE],
  },
  farmHand: {
    label: 'Farmhand salary',
    helpText:
      'Does your farm or garden have a position called farmhand, assistant grower, or something similar? (If yes, then:) What is the annual salary range at which this position is compensated?',
    options: SALARY_RANGE,
  },
  farmManager: {
    label: 'Farm manager salary',
    helpText:
      'Does your farm or garden have a position called farm manager, head grower, or something similar? (If yes, then:) What is the annual salary range at which this position is compensated?',
    options: SALARY_RANGE,
  },
  opsManager: {
    label: 'Operations manager salary',
    helpText:
      'Does your farm or garden have a position called operations manager, chief operations officer, or something similar? (If yes, then:) What is the annual salary range at which this position is compensated?',
    options: SALARY_RANGE,
  },
  eventsManager: {
    label: 'Events manager salary',
    helpText:
      'Does your farm or garden have a position called operations manager, chief operations officer, or something similar? (If yes, then:) What is the annual salary range at which this position is compensated?',
    options: SALARY_RANGE,
  },
  partTime: {
    label: 'Part-time employees',
    helpText:
      'How many part-time or seasonal staff members (not volunteers) worked at your farm or garden over the last year?',
    options: ['0 (no one works part-time)', ...COUNT_RANGE],
  },
  volunteers: {
    label: 'Volunteers',
    helpText:
      'How many volunteers have worked on your farm or garden in the past year?',
    options: ['0 (no volunteers)', ...COUNT_RANGE],
  },
  volunteerHours: {
    label: 'Volunteer hours',
    helpText:
      'How many hours of labor were produced by volunteers in the past three years',
    options: ['0', '1-39', '40-79', '80-159', '160-319', '320 or more'],
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
  outreachHours: {
    label: 'Outreach hours',
    helpText:
      'Please estimate how many hours annually farm or garden employees spend on unpaid community outreach',
    int: true,
  },
  incomeSources: {
    label: 'Income sources',
    helpText:
      'Did you receive earned income from any of the following sources in the last 3 fiscal years?',
    options: [
      'Plot rentals',
      'Tours',
      'Classes/workshops',
      'Weddings/other events',
      'Other',
    ],
    multiple: true,
  },
  capInvestments: {
    label: 'Capital investments',
    helpText:
      'Did you make any capital investments in the past 5 fiscal years (e.g., expansion, equipment, new space)? ',
    options: [
      'Yes, expansion',
      'Yes, equipment',
      'Yes, moving to a new space',
      'No',
    ],
    multiple: true,
  },
  renewableEnergy: {
    label: 'Renewable energy',
    helpText:
      'Energy costs can range widely, and food resilience may be served by electricity discounts for agriculture. We want to understand your energy use and future plans. Do you currently access energy from renewable sources?',
    options: [
      'Yes, 100%',
      'Yes, we access some energy from renewable sources',
      'No',
      'I am not sure',
    ],
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
  type: AG_TYPES.filter((d) => d.checked).map((d) => d.value),
  environments: [],
  priorities: [],
  accessibility: [],
  growMethods: [],
  compost: [],
  crops: [],
  distros: [],
  fullTime: [],
  studentPrograms: [],
  skillsPrograms: [],
  incomeSources: [],
  renewableEnergy: [],
};

// could make this dynamic based on the data in the future
export const LAYER_SLIDERS = [
  // {
  //   name: 'cdc_mental',
  //   label: 'Poor mental health',
  //   max: 30,
  //   marks: [11, 12.5, 14.6],
  // },
  // {
  //   name: 'cdc_physical',
  //   label: 'Poor physical health',
  //   max: 30,
  //   marks: [10, 11.8, 13.8],
  // },
  {
    name: 'acs_income',
    label: 'Median household income',
    min: 5000,
    max: 300000,
    step: 5000,
    format: (v) => `$${v.toLocaleString('en')}`,
    marks: [44532, 62984, 83338],
  },
  {
    name: 'acs_bachelors',
    label: "At least bachelor's",
    marks: [20.1, 29.9, 45.3],
  },
  { name: 'acs_hs', label: 'At least high school', marks: [73.9, 83.4, 90.2] },
  { name: 'acs_foreign', label: 'Foreign born', marks: [25.7, 37.3, 47.9] },
  // { name: 'acs_white', label: 'White', marks: [4.4, 23.4, 58.6] },
  { name: 'acs_child', label: 'Has child', marks: [23.5, 32.4, 39.6] },
  { name: 'acs_alone', label: 'Living alone', marks: [19.5, 27.3, 35.6] },
  {
    name: 'acs_participation',
    label: 'Labor force participation',
    marks: [58, 63.5, 68.4],
  },
  {
    name: 'population',
    label: 'Population',
    max: 30000,
    step: 1000,
    format: (v) => v.toLocaleString('en'),
    marks: [2462, 3617, 5031],
  },
];

export const PAINT_COLOR = {
  type: AG_TYPES.filter((d) => d.checked !== undefined).map(
    ({ value, color }) => ({
      name: value,
      color,
      label: value,
    })
  ),
  distro1: FARM_PROPS.distros.fields,
  density: [
    { name: 'low', color: green[50], label: 'Low' },
    { name: 'mid', color: green[200], label: 'Medium' },
    { name: 'high', color: green[500], label: 'High' },
  ],
};

export const DISPLAY = [
  { name: 'farm', label: 'Point locations' },
  { name: 'district', label: 'Community district density' },
];

export const COLOR_BY = [
  { name: 'type', label: 'Farm or garden type' },
  { name: 'distro1', label: 'Primary distribution channel' },
  { name: 'none', label: 'None' },
];

export const SIZE_BY = [
  { name: 'area', label: 'Lot/farm area' },
  { name: 'production', label: 'Crop production' },
  { name: 'none', label: 'None' },
];

export const DENSITY_BY = [
  { name: 'count', label: 'Farm/garden count' },
  {
    name: 'countCapita',
    label: 'Count per capita',
    title: 'Count per 100k residents by CD',
    scale: 1e5,
  },
  { name: 'area', label: 'Total lot/farm area' },
  {
    name: 'areaCapita',
    label: 'Area per capita',
    title: 'Area (sqft/capita) by CD',
  },
  { name: 'production', label: 'Total crop production' },
  {
    name: 'productionCapita',
    label: 'Production per capita',
    title: 'Production (lbs/1k) by CD',
    scale: 1e3,
  },
];

const GIST_REPO = 'https://gist.githubusercontent.com/ampu3ro';

export const POI_PROPS = [
  {
    id: 'pantry',
    label: 'Food pantry locations',
    data: `${GIST_REPO}/1cc8e3347805d344c1b3a3638d25caa1/raw/8d76a1d543551097559e2bdcf4566f20262bd313/nyc_pantries.geojson`,
    layout: {
      'icon-image': 'shop',
    },
  },
  {
    id: 'market',
    label: "Farmer's market locations",
    data: 'markets',
    layout: {
      'icon-image': 'convenience',
    },
  },
  {
    id: 'transit_stop_label',
    label: 'Subway stops',
  },
];

export const SOCIOECONOMIC_URL = `${GIST_REPO}/34609e91dedb19591e3d57203c9b4162/raw/c9fc9c2bf756f3e160e2f865b2ceba16c79f10d8/nyc_socio_economic.geojson`;

export const PROFILES = [
  {
    category: 'Project leads',
    people: [
      {
        name: 'Wythe Marschall',
        school: 'CSB',
        profileUrl: 'https://www.linkedin.com/in/wythe/',
      },
      {
        name: 'Alice Reznickova',
        school: 'Tandon',
        profileUrl:
          'https://www.linkedin.com/in/anna-alice-reznickova-09541379/',
      },
    ],
    avatarWidth: 100,
  },
  {
    category: 'Research and development team',
    people: [
      {
        name: 'Nico Ampuero',
        school: 'CUSP',
        profileUrl: 'https://www.linkedin.com/in/ampu3ro/',
      },
      {
        name: 'Jeremy Rucker',
        school: 'CUSP',
        profileUrl: 'https://www.linkedin.com/in/jeremyr327/',
      },
      { name: 'Xiaolin Li', school: 'CUSP', profileUrl: '' },
    ],
    avatarWidth: 100,
  },
  {
    category: 'Research contributors',
    people: [
      {
        name: 'Gianna White',
        school: 'Tandon',
        profileUrl: 'https://www.linkedin.com/in/gianna-white/',
      },
      {
        name: 'Christina Curry',
        school: 'Tandon',
        profileUrl: 'https://www.linkedin.com/in/christina-curry/',
      },
    ],
    avatarWidth: 100,
  },
  {
    category: 'Advisory board',
    people: [
      {
        name: 'Samuel W. Anderson and Yolanda Gonzalez',
        employer: 'Cornell Cooperative Extension–Harvest New York',
      },
      {
        name: 'Carlos Martinez and Max Lerner',
        employer: 'New York City Department of Parks & Recreation',
      },
      {
        name: 'Kristin Fields',
        employer: 'GrowNYC School Gardens',
      },
      {
        name: 'Mandu Sen',
        employer: "New York City Mayor's Office of Food Policy",
      },
      {
        name: 'Crystal Jane Eksi',
        employer: 'New York City Department of City Planning',
      },
      {
        name: 'Leah Butz, Alexina Cather, and Charles Platkin',
        employer: 'Hunter College New York City Food Policy Center',
      },
      {
        name: 'Christa Perfit',
        employer: 'City Harvest',
      },
      {
        name: 'Katherine Sacco',
        employer: 'Urban Design Forum',
      },
      {
        name: 'Kubi Ackerman',
        employer: 'Gallagher & Associates, LLC',
      },
      {
        name: 'Harrison Hillier',
        employer: 'NYC Agriculture Collective/Teens For Food Justice',
      },
      {
        name: 'Ian Marvy',
        employer:
          'Consultant; formerly, USDA Farm Service Agency/Red Hook Farms',
      },
      {
        name: 'Jacob Remes',
        employer: 'NYU Gallatin',
      },
      {
        name: 'Jay Solly',
        employer: 'Sustainable United Neighborhoods',
      },
      {
        name: 'Dr. John Zahina-Ramos',
        employer: 'College of Lake County, Illinois',
      },
      {
        name: 'Bruce Zeines',
        employer: 'Kelly Street Garden',
      },
    ],
  },
];

export const DATA_SOURCES = [
  {
    category: 'Urban agriculture data',
    data: [
      {
        description: 'GreenThumb gardens',
        sources: [
          {
            name: 'NYC OpenData (Green Thumb)',
            href: 'https://data.cityofnewyork.us/browse?Data-Collection_Data-Collection=GreenThumb+Gardens&q=greenthumb',
          },
        ],
      },
      {
        description: 'NYCHA gardens',
        sources: [{ name: 'Provided by NYC Department of Parks' }],
      },
      {
        description: 'School gardens',
        sources: [{ name: 'Provided by GrowNYC' }],
      },
      {
        description: 'Potential garden locations',
        sources: [
          {
            name: 'NYC Open Data (Local Law 46, 2018)',
            href: 'https://www.google.com/url?q=https://data.cityofnewyork.us/Environment/City-owned-sites-that-are-available-and-potentiall/qchy-end3&sa=D&source=docs&ust=1637446684312000&usg=AOvVaw1xVA8JzJizEZBqTSdxkCAx',
          },
        ],
      },
      {
        description: 'Data from ~100 large farms and gardens',
        sources: [
          {
            name: 'Survey responses with supplementary data from public websites and reports',
          },
        ],
      },
      {
        description: 'Community garden list curated by CUSP team',
        sources: [
          {
            name: 'GrowNYC',
            href: 'https://www.grownyc.org/gardens/our-community-gardens',
          },
          { name: 'Brooklyn Queens Land Trust', href: 'https://bqlt.org/' },
          { name: 'Bronx Land Trust', href: 'https://www.bronxlandtrust.org/' },
          {
            name: 'Manhattan Land Trust',
            href: 'http://www.manhattanlandtrust.org/',
          },
        ],
      },
    ],
  },
  {
    category: 'Food distribution data',
    data: [
      {
        description: 'Food pantry locations',
        sources: [{ name: 'Provided by City Harvest' }],
      },
      {
        description: 'Farmers Markets',
        sources: [
          {
            name: 'NYC Open Data (DOHMH)',
            href: 'https://www.google.com/url?q=https://data.cityofnewyork.us/dataset/DOHMH-Farmers-Markets/8vwk-6iz2&sa=D&source=docs&ust=1637446912086000&usg=AOvVaw3PGTzm_qEGV0_WCZo6ej5H',
          },
        ],
      },
    ],
  },
  {
    category: 'Socioeconomic data',
    data: [
      {
        description: '2018 NYC PLUTO tax lot sizes',
        sources: [
          {
            name: 'NYC Department of City Planning',
            href: 'https://www1.nyc.gov/site/planning/data-maps/open-data/districts-download-metadata.page',
          },
        ],
      },
      {
        description: 'Health and demographic data',
        sources: [
          {
            name: 'Data2Go (American Community Survey)',
            href: 'https://data2go.nyc/map/#10/40.8276/-73.9588',
          },
        ],
      },
      {
        description: 'NYC Subway stations',
        sources: [
          { name: 'Mapbox', href: 'https://www.mapbox.com/maps/streets' },
        ],
      },
    ],
  },
];
