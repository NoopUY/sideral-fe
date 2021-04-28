<template>
  <div>
    <div class="mb-2">
      {{ description }}
    </div>
    <b-table-simple>
      <b-thead head-variant="dark">
        <b-tr>
          <b-th colspan="1" class="t-header" />
          <b-th colspan="1" class="t-header">
            #
          </b-th>
          <b-th colspan="1" class="t-header">
            Date of Sampling
          </b-th>
          <b-th colspan="1" class="t-header">
            Value
          </b-th>
          <b-th colspan="1" class="text-right t-header" />
        </b-tr>
      </b-thead>

      <b-tbody>
        <b-tr v-for="(item, index) in modelValue" :key="index">
          <b-td>
            <b-button v-if="!item.editMode" variant="light" size="sm" class="text-accent mr-1 p-0" @click="item.editMode = true">
              <b-icon icon="lock-fill" scale="0.9" />
            </b-button>
            <b-button v-else variant="light" size="sm" class="text-accent mr-1 p-0" @click="item.editMode = false">
              <b-icon icon="unlock-fill" scale="0.9" />
            </b-button>
          </b-td>
          <b-td>{{ index+1 }}</b-td>
          <b-td>
            <div v-if="!item.editMode" class="w-100 d-flex flex-column justify-content-center align-items-start">
              <span class="field-master">{{ formatDate(item.date).date }}</span>
              <span class="field-detail">{{ formatDate(item.date).fromNow }}</span>
            </div>

            <b-form-datepicker
              v-else
              :id="`date-${index}`"
              v-model="item.date"
              size="sm"
              :date-format-options="{ year: '2-digit', month: 'short', day: '2-digit' }"
            />
          </b-td>
          <b-td>
            <span v-if="!item.editMode">
              <b-badge variant="accent">
                {{ item.value }}
              </b-badge>
            </span>
            <b-form-input
              v-else
              :id="`value-${index}`"
              v-model="item.value"
              type="text"
              size="sm"
            />
          </b-td>
          <b-td>
            <div class="w-100 d-flex flex-row justify-content-end align-items-center">
              <b-button v-if="!item.editMode" variant="light" class="text-danger p-0" size="sm" @click="onDelete(index)">
                <b-icon icon="x" scale="1.4" />
              </b-button>
              <b-button v-else variant="light" class="text-success p-0" size="sm" @click="onAccept(index)">
                <b-icon icon="check" scale="1.4" />
              </b-button>
            </div>
          </b-td>
        </b-tr>
        <b-tr>
          <b-th colspan="5" class="text-right">
            <b-button variant="accent" class="button-header rounded-pill" @click="modelValue.push({date: new Date(), value:0, editMode:true})">
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
    modelValue: ''
  }),

  computed: {
    id () {
      return `input-${this.label.replace(/\s/g, '')}`
    }
  },

  watch: {
    value (val) {
      this.modelValue = this.normalizeModel(val);
    }
  },

  mounted () {
    this.modelValue = this.normalizeModel(this.value);
  },

  methods: {

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
      this.modelValue[index].editMode = false;
      this.$emit('input', this.modelValue.map(m => ({ date: m.date, value: m.value })));
    },

    formatDate (date) {
      return {
        date: moment(date).format('DD MMM YYYY'),
        time: moment(date).format('HH:mm'),
        fromNow: moment(date).fromNow()
      }
    },

    normalizeModel (model) {
      return model.map(m => ({
        ...m,
        editMode: false
      }))
    }

  }
}
</script>

<style lang="scss" scoped>

</style>
