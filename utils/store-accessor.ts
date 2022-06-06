import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'

import CaloriesModule from '~/store/calories'

/* eslint-disable import/no-mutable-exports */
export let caloriesStore: CaloriesModule
/* eslint-enable */

export function initialiseStores (store: Store<any>): void {
  caloriesStore = getModule(CaloriesModule, store)
}