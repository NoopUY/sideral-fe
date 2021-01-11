import moment from 'moment';

export default [{
  key: 'custom_id',
  label: '#'
},
{
  key: 'blend',
  label: 'Blend'
},
{
  key: 'created_at',
  label: 'Created At',
  formatter (value) {
    return value ? moment(value).fromNow() : '--'
  },
  sortable: true,
  tdClass: 'batch-td-hide-mobile'
},
{
  key: 'state',
  label: 'State'
},
{
  key: 'tags',
  label: 'Tags',
  tdClass: 'batch-td-hide-mobile'
},
{
  key: 'actions',
  label: 'Actions',
  width: '135px'
}
]
