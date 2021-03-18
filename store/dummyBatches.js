import moment from 'moment';
let id = 1000;

const batches = [{
  _id: 'sa30293jfsdf23094u',
  custom_id: String(++id),
  blend: 'fuji40/gsth60',
  description: 'First Batch',
  created_at: moment().subtract(50, 'days').format(),
  inoculated_at: moment().subtract(48, 'days').format(),
  first_rack_at: moment().subtract(28, 'days').format(),
  bottled_at: moment().subtract(2, 'days').format(),
  density: [{
    date: moment().subtract(50, 'days').format(),
    value: 1050
  },
  {
    date: moment().subtract(40, 'days').format(),
    value: 1035
  },
  {
    date: moment().subtract(20, 'days').format(),
    value: 1028
  },
  {
    date: moment().subtract(10, 'days').format(),
    value: 1018
  },
  {
    date: moment().subtract(5, 'days').format(),
    value: 1016
  }
  ],
  state: 'bottled',
  tags: ['fuji40', 'gsth60', '20°C', 'Pelliant'],
  ph: [{
    date: moment().subtract(50, 'days').format(),
    value: 7
  },
  {
    date: moment().subtract(40, 'days').format(),
    value: 5
  },
  {
    date: moment().subtract(20, 'days').format(),
    value: 3
  },
  {
    date: moment().subtract(10, 'days').format(),
    value: 3
  },
  {
    date: moment().subtract(5, 'days').format(),
    value: 2.3
  }
  ]
},
{
  _id: 'sa30293jfsdf2309423',
  custom_id: String(++id),
  blend: 'fuji40/gsth60',
  description: 'First Batch',
  created_at: moment().subtract(50, 'days').format(),
  inoculated_at: moment().subtract(48, 'days').format(),
  first_rack_at: moment().subtract(28, 'days').format(),
  bottled_at: moment().subtract(2, 'days').format(),
  density: [],
  state: 'bottled',
  tags: ['fuji40', 'gsth60', '20°C', 'Pelliant'],
  ph: []
},
{
  _id: 'sa30293jfsdf230942',
  custom_id: String(++id),
  blend: 'fuji40/gsth60',
  description: 'First Batch',
  created_at: moment().subtract(50, 'days').format(),
  inoculated_at: moment().subtract(48, 'days').format(),
  first_rack_at: moment().subtract(28, 'days').format(),
  bottled_at: moment().subtract(2, 'days').format(),
  density: [],
  state: 'bottled',
  tags: ['fuji40', 'gsth60', '20°C', 'Pelliant'],
  ph: []
},
{
  _id: 'sa30293jfsdf230998',
  custom_id: String(++id),
  blend: 'fuji40/gsth60',
  description: 'First Batch',
  created_at: moment().subtract(50, 'days').format(),
  inoculated_at: moment().subtract(48, 'days').format(),
  first_rack_at: moment().subtract(28, 'days').format(),
  bottled_at: moment().subtract(2, 'days').format(),
  density: [],
  state: 'bottled',
  tags: ['fuji40', 'gsth60', '20°C', 'Pelliant'],
  ph: []
},
{
  _id: 'sa30293jfsdf2309099',
  custom_id: String(++id),
  blend: 'fuji40/gsth60',
  description: 'First Batch',
  created_at: moment().subtract(50, 'days').format(),
  inoculated_at: moment().subtract(48, 'days').format(),
  first_rack_at: moment().subtract(28, 'days').format(),
  bottled_at: moment().subtract(2, 'days').format(),
  density: [],
  state: 'bottled',
  tags: ['fuji40', 'gsth60', '20°C', 'Pelliant'],
  ph: []
},
{
  _id: 'sa30293jfsdf23094liu',
  custom_id: String(++id),
  blend: 'fuji40/gsth60',
  description: 'First Batch',
  created_at: moment().subtract(50, 'days').format(),
  inoculated_at: moment().subtract(48, 'days').format(),
  first_rack_at: moment().subtract(28, 'days').format(),
  bottled_at: moment().subtract(2, 'days').format(),
  density: [],
  state: 'bottled',
  tags: ['fuji40', 'gsth60', '20°C', 'Pelliant'],
  ph: []
},
{
  _id: 'sa30293jfsdf23093hdy',
  custom_id: String(++id),
  blend: 'fuji40/gsth60',
  description: 'First Batch',
  created_at: moment().subtract(50, 'days').format(),
  inoculated_at: moment().subtract(48, 'days').format(),
  first_rack_at: moment().subtract(28, 'days').format(),
  bottled_at: moment().subtract(2, 'days').format(),
  density: [],
  state: 'bottled',
  tags: ['fuji40', 'gsth60', '20°C', 'Pelliant'],
  ph: []
},
{
  _id: 'sa30293jfsdf23094dnv',
  custom_id: String(++id),
  blend: 'fuji40/gsth60',
  description: 'First Batch',
  created_at: moment().subtract(50, 'days').format(),
  inoculated_at: moment().subtract(48, 'days').format(),
  first_rack_at: moment().subtract(28, 'days').format(),
  bottled_at: moment().subtract(2, 'days').format(),
  density: [],
  state: 'bottled',
  tags: ['fuji40', 'gsth60', '20°C', 'Pelliant'],
  ph: []
},
{
  _id: 'sa30293jfsdf2309plm',
  custom_id: String(++id),
  blend: 'fuji40/gsth60',
  description: 'First.1 Batch',
  created_at: moment().subtract(45, 'days').format(),
  inoculated_at: moment().subtract(43, 'days').format(),
  first_rack_at: moment().subtract(25, 'days').format(),
  bottled_at: moment().subtract(2, 'days').format(),
  density: [],
  state: 'bottled',
  tags: ['fuji40', 'gsth60', '22°C', 'Still'],
  ph: []
},
{
  _id: 'sa30293jfsdf23094jjyt',
  custom_id: String(++id),
  blend: 'fuji50/gsth50',
  description: 'Second Batch',
  created_at: moment().subtract(30, 'days').format(),
  inoculated_at: moment().subtract(27, 'days').format(),
  first_rack_at: moment().subtract(6, 'days').format(),
  bottled_at: null,
  density: [],
  state: 'secondary_fermentation',
  tags: ['fuji50', 'gsth50', '25°C'],
  ph: []
},
{
  _id: 'sa30293jfsdf2309pmm',
  custom_id: String(++id),
  blend: 'fuji50/gsth50',
  description: 'Second.1 Batch',
  created_at: moment().subtract(27, 'days').format(),
  inoculated_at: moment().subtract(24, 'days').format(),
  first_rack_at: moment().subtract(3, 'days').format(),
  bottled_at: null,
  density: [],
  state: 'secondary_fermentation',
  tags: ['fuji50', 'gsth50', '25°C', 'QA-23'],
  ph: []
},
{
  _id: 'sa30293jfsdf2309907f6',
  custom_id: String(++id),
  blend: 'fuji50/gsth50',
  description: 'Second.2 Batch',
  created_at: moment().subtract(25, 'days').format(),
  inoculated_at: moment().subtract(22, 'days').format(),
  first_rack_at: moment().subtract(1, 'days').format(),
  bottled_at: null,
  density: [],
  state: 'secondary_fermentation',
  tags: ['fuji50', 'gsth50', '10°C', 'EC-1118'],
  ph: []
},
{
  _id: 'sa30293jfsdf23094f9',
  custom_id: String(++id),
  blend: '100gsth',
  description: 'Third Batch',
  date: Date.now(),
  density: [],
  created_at: moment().subtract(10, 'days').format(),
  inoculated_at: moment().subtract(9, 'days').format(),
  first_rack_at: null,
  state: 'primary_fermentation',
  tags: ['gsth100', '25°C', 'EC-1118'],
  bottled_at: null,
  ph: []
},
{
  _id: 'sa30293jfsdf23094f1',
  custom_id: String(++id),
  blend: '100gsth',
  description: 'Fourth Batch',
  date: Date.now(),
  density: [],
  state: 'primary_fermentation',
  tags: ['gsth100', '25°C', 'QA23'],
  created_at: moment().subtract(8, 'days').format(),
  inoculated_at: moment().subtract(7, 'days').format(),
  first_rack_at: null,
  bottled_at: null,
  ph: []
},
{
  _id: 'sa30293jfsdf23094ff',
  custom_id: String(++id),
  blend: '100gsth',
  description: 'Fifth Batch',
  date: Date.now(),
  density: [],
  state: 'primary_fermentation',
  tags: ['gsth100', '25°C', 'QA23'],
  created_at: moment().subtract(5, 'days').format(),
  inoculated_at: moment().subtract(3, 'days').format(),
  first_rack_at: null,
  bottled_at: null,
  ph: []
},
{
  _id: 'sa30293jfsdf23094fg',
  custom_id: String(++id),
  blend: '100gsth',
  description: 'Fresh Batch',
  date: Date.now(),
  density: [],
  state: 'fresh',
  tags: ['gsth100', '25°C', 'EC-1118', 'Sweet'],
  created_at: moment().subtract(1, 'days').format(),
  inoculated_at: null,
  first_rack_at: null,
  bottled_at: null,
  ph: []
},
{
  _id: 'sa30293jfsdf23094fh',
  custom_id: String(++id),
  blend: '100gsth',
  description: 'Fresh.1 Batch',
  date: Date.now(),
  density: [],
  state: 'fresh',
  tags: ['gsth100', '25°C', 'QA23', 'Hard'],
  created_at: moment().subtract(2, 'days').format(),
  inoculated_at: null,
  first_rack_at: null,
  bottled_at: null,
  ph: []
}
];

export default batches;
