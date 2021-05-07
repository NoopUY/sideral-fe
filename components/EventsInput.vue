<template>
  <div>
    <div class="mb-2" />
    <b-table-simple>
      <b-thead head-variant="dark">
        <b-tr>
          <b-th colspan="1" class="t-header text-center">
            #
          </b-th>
          <b-th colspan="1" class="t-header">
            {{ $t('dateOfEvent') }}
          </b-th>
          <b-th colspan="1" class="t-header">
            {{ $t('type') }}
          </b-th>
          <b-th colspan="1" class="t-header">
            {{ $t('description') }}
          </b-th>
          <b-th colspan="1" class="t-header">
            {{ $t('value') }}
          </b-th>
          <b-th colspan="1" class="text-right t-header" />
        </b-tr>
      </b-thead>

      <b-tbody>
        <b-tr v-for="(item, index) in modelValue" :key="index">
          <b-td class="text-center">
            <span v-if="editing !== index">
              {{ index+1 }}
            </span>

            <b-button v-else variant="light" class="p-0 text-danger" size="sm" @click="cancelEdition(index)">
              <b-icon icon="x" scale="1.5" />
            </b-button>
          </b-td>
          <b-td style="max-width:100px" @click="editing !== index && editEvent(index)">
            <div v-if="editing !== index" class="w-100 d-flex flex-column justify-content-center align-items-start">
              <span class="field-master">{{ formatDate(item.date).date }}</span>
              <span class="field-detail">{{ formatDate(item.date).fromNow }}</span>
            </div>

            <b-form-datepicker
              v-else
              :id="`date-${index}`"
              v-model="tempEvent.date"
              size="sm"
              :date-format-options="{ year: '2-digit', month: 'short', day: '2-digit' }"
              :label-no-date-selected="$t('Select')"
            />
          </b-td>
          <b-td style="max-width:120px" @click="editing !== index && editEvent(index)">
            <span v-if="editing !== index">
              {{ item.type }}
            </span>
            <b-form-select v-else :id="`type-${index}`" v-model="tempEvent.type" :options="typeOptions" size="sm" />
          </b-td>
          <b-td @click="editing !== index && editEvent(index)">
            <span v-if="editing !== index">
              {{ item.description }}
            </span>
            <b-form-input
              v-else
              :id="`description-${index}`"
              v-model="tempEvent.description"
              type="text"
              size="sm"
            />
          </b-td>
          <b-td style="max-width:20px" @click="editing !== index && editEvent(index)">
            <span v-if="editing !== index">
              {{ item.value }}
            </span>
            <b-form-input
              v-else
              :id="`value-${index}`"
              v-model="tempEvent.value"
              type="text"
              size="sm"
            />
          </b-td>
          <b-td>
            <div class="w-100 d-flex flex-row justify-content-end align-items-center">
              <b-button v-if="editing !== index" variant="light" class="text-danger p-0" size="sm" @click="onDelete(index)">
                <b-icon icon="trash" scale="1" />
              </b-button>
              <b-button v-else variant="light" class="text-success p-0" size="sm" @click="onAccept(index)">
                <b-icon icon="check" scale="1.5" />
              </b-button>
            </div>
          </b-td>
        </b-tr>
        <b-tr>
          <b-th colspan="100" class="text-right">
            <b-button variant="accent" class="button-header rounded-pill" @click="addEvent()">
              <b-icon icon="plus" /> ADD
            </b-button>
          </b-th>
        </b-tr>
      </b-tbody>
    </b-table-simple>
  </div>
</template>

<script>
import moment from 'moment';
import undoAction from '@/mixins/undoAction'
export default {
  mixins: [undoAction],

  props: {
    value: { type: Array, default: () => [] },
    description: { type: String, default: '' },
    disabled: { type: Boolean, default: false }
  },

  data: () => ({
    modelValue: '',
    typeOptions: [
      { value: 'pressing', text: 'Pressing' },
      { value: 'inoculation', text: 'Inoculation' },
      { value: 'ph_sampling', text: 'PH Sampling' },
      { value: 'sg_sampling', text: 'SG Sampling' },
      { value: 'acidity_sampling', text: 'Acidity Sampling' },
      { value: 'racking', text: 'Racking' },
      { value: 'other', text: 'Other' }
    ],
    editing: -1,
    tempEvent: {
      date: null,
      description: '',
      type: '',
      value: ''
    }
  }),

  computed: {
    id () {
      return `input-${this.label.replace(/\s/g, '')}`
    }
  },

  watch: {
    value (val) {
      this.modelValue = val;
    }
  },

  mounted () {
    this.modelValue = this.value;
    moment.locale(this.$i18n.locale);

    if (!this.modelValue.length) {
      this.modelValue.push({
        date: new Date(),
        type: 'pressing',
        description: 'Extraction date',
        value: '',
        editMode: false
      })
    }
  },

  methods: {

    addEvent () {
      this.modelValue.push({
        date: null,
        description: '',
        type: '',
        value: ''
      });

      this.editing = this.modelValue.length - 1;
    },

    editEvent (index) {
      this.tempEvent = { ...this.modelValue[index] };
      this.editing = index;
    },

    cancelEdition (index) {
      this.tempEvent = {};
      this.editing = -1;
    },

    onDelete (index) {
      const element = this.modelValue[index];
      this.modelValue.splice(index, 1);
      this.$emit('input', this.modelValue.map(m => ({ date: m.date, value: m.value })));

      this.undoAction({
        action: `${this.description} deleted`,
        delay: 5000,
        undo: () => {
          this.modelValue.splice(index, 0, element);
          this.$emit('input', this.modelValue.map(m => ({ date: m.date, value: m.value })));
        }
      })
    },

    onAccept (index) {
      this.modelValue[index] = { ...this.tempEvent };
      this.tempEvent = {};
      this.$emit('input', this.modelValue);
      this.editing = -1;
    },

    formatDate (date) {
      const data = {
        date: moment(date).format('DD MMM YYYY'),
        time: moment(date).format('HH:mm'),
        fromNow: moment(date).fromNow()
      };

      return data
    }

  }
}
</script>

<style lang="scss" scoped>

</style>
