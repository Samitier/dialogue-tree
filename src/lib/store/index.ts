import { createStore } from 'vuex'
import { state, State } from './state'
import { Mutations, mutations } from './mutations'
import { Actions, actions } from './actions'
import { Getters, getters } from './getters'

export default createStore<State>({
  state() {
    return state
  },
  mutations,
  actions,
  getters
})

export type Store = {
  state: State
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  commit: (name: Mutations, parameter: any) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: (name: Actions, parameter: any) => any
  getters: Getters
}
