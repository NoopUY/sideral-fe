
import {
  mixinState,
  mixinGetters,
  mixinMutations,
  mixinActions
} from '@/store/base.js';

import batchesDummy from './dummyBatches';

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
  ...mixinMutations(),
  add: (state, batch) => state.batches.push(batch),
  delete: (state, batchId) => {
    const idx = state.batches.findIndex(b => b._id === batchId)
    state.batches.splice(idx, 1)
  }
}

/* Actions */
export const actions = {
  ...mixinActions(),

  async delete ({ commit }, batch) {
    // TODO Async API Call
    commit('delete', batch);
  },

  async add ({ commit, dispatch }, batch) {
    // TODO: post to API and update store
    commit('add', batch);
    dispatch('fetch');
  },

  async fetch ({ commit, state }) {
    const from = (state.currentPage - 1) * state.limit;
    const _filtered = batchesDummy.slice(from, state.limit + from);
    commit('data', _filtered);
    commit('count', batchesDummy.length); // TODO get count from DB or from pagination response whatever.
  },

  async fetchById ({ state }, payload) {
    // TODO fetch from API.
    const idx = state.data.findIndex(b => b._id === payload.id)
    return { data: { ...state.data[idx] } }
  }
}
