import moment from 'moment';

export default [
  {
    key: 'custom_id',
    label: '#Id',
    thClass: 't-header',
    sortable: true
  },
  {
    key: 'created_at',
    label: 'created',
    formatter (value) {
      return value ? moment(value).fromNow() : '--'
    },
    sortable: true,
    tdClass: 'batch-td-hide-mobile',
    thClass: 't-header'
  },
  {
    key: 'blend',
    label: 'Blend',
    thClass: 't-header'
  },
  {
    key: 'yeast',
    label: 'Yeast',
    thClass: 't-header'
  },
  {
    key: 'liters',
    label: 'Liters',
    thClass: 't-header'
  },
  {
    key: 'state',
    label: 'State',
    thClass: 't-header'
  },
  {
    key: 'tags',
    label: 'Tags',
    tdClass: 'batch-td-hide-mobile',
    thClass: 't-header'
  },
  {
    key: 'actions',
    label: 'Actions',
    width: '135px',
    thClass: 't-header'
  }
]
