export const mixinState = () => ({
  data: [],
  count: 0,
  limit: 10,
  currentPage: 1,
  andFilters: [],
  search: ''
})

export const mixinGetters = () => ({
  data: state => state.data,
  count: state => state.count,
  find: state => id => state.data.find(d => d.id === id),
  limit: state => state.limit,
  search: state => state.search,
  andFilters: state => state.andFilters,
  currentPage: state => state.currentPage
})

export const mixinMutations = () => ({
  data: (state, data) => { state.data = data },
  count: (state, count) => { state.count = count },
  limit: (state, limit) => { state.limit = limit },
  andfilters: (state, andFilters) => { state.andFilters = andFilters },
  and: (state, and) => { state.andFilters.push(and) },
  search: (state, search) => { state.search = search },
  currentPage: (state, currentPage) => { state.currentPage = currentPage }
})

export const mixinActions = () => ({
  async fetch () {
    throw new Error('TODO: make me');
  },

  async delete () {
    throw new Error('TODO: make me');
  },

  async add () {
    throw new Error('TODO: make me');
  }
})
