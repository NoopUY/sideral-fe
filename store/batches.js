
import {
  mixinState,
  mixinGetters,
  mixinMutations,
  mixinActions
} from '@/store/base.js';

// import batchesDummy from './dummyBatches';

/* Initialize state */
export const state = () => ({
  ...mixinState()
})

/* Getters */
export const getters = {
  ...mixinGetters(),

  getByState: state => (batchState) => {
    return state.data.filter(b => b.state === batchState)
  }

}

/* Mutations */
export const mutations = {
  ...mixinMutations()
}

/* Actions */
export const actions = {
  ...mixinActions('batches')
}
