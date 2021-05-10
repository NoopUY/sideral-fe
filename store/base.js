export const mixinState = () => ({
  data: [],
  count: 0,
  limit: 10,
  currentPage: 1,
  andFilters: [],
  sort: '',
  where: {},
  search: '',
  busy: false
})

export const mixinGetters = () => ({
  data: state => state.data,
  count: state => state.count,
  find: state => id => state.data.find(d => d._id === id),
  limit: state => state.limit,
  search: state => state.search,
  andFilters: state => state.andFilters,
  busy: state => state.busy,
  currentPage: state => state.currentPage
})

export const mixinMutations = () => ({
  data: (state, data) => { state.data = data },
  add: (state, element) => state.data.push(element),
  delete: (state, element) => {
    const idx = state.data.findIndex(b => b._id === element._id)
    if (idx !== -1) { state.data.splice(idx, 1) }
  },
  update: (state, item) => {
    const idx = state.data.findIndex(d => d._id === item._id);
    if (idx !== -1) { state.data[idx] = { ...item }; }
  },
  count: (state, count) => { state.count = count },
  limit: (state, limit) => { state.limit = limit },
  andfilters: (state, andFilters) => { state.andFilters = andFilters },
  and: (state, and) => { state.andFilters.push(and) },
  search: (state, search) => { state.search = search },
  currentPage: (state, currentPage) => { state.currentPage = currentPage },
  busy: (state, status) => { state.busy = status }
})

export const mixinActions = resource => ({

  async fetch ({ commit, state }) {
    commit('busy', true);
    const { payload } = await this.$axios.$get(`/${resource}`, {
      params: {
        where: state.where,
        skip: state.limit * (state.currentPage - 1),
        limit: state.limit,
        sort: state.sort,
        search: state.search
      }
    });

    commit('data', payload.data);
    commit('count', payload.total_records);
    commit('busy', false);
  },

  async fetchById ({ commit, state }, _id) {
    commit('busy', true);
    const { payload } = await this.$axios.$get(`/${resource}/${_id}`);
    commit('busy', false);
    return payload
  },

  async delete ({ commit }, element) {
    commit('delete', element);
    commit('busy', true);
    await this.$axios.$delete(`/${resource}/${element._id}`);
    commit('busy', false);
  },

  async add ({ commit, dispatch }, element) {
    commit('add', element);
    commit('busy', true);
    await this.$axios.$post(`/${resource}`, element)
    commit('busy', false);
    dispatch('fetch');
  },

  async update ({ commit, dispatch }, element) {
    commit('busy', true);
    commit('update', element)
    await this.$axios.$put(`/${resource}/${element._id}`, element);
    commit('busy', false);
    dispatch('fetch');
  }
})
