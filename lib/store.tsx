import { useMemo } from 'react';

import { configNextStore } from 'store/setup';
import { createWrapper } from 'next-redux-wrapper';

// let storeSetup;

// export const initializeStore = preloadedState => {
//   let _storeSetup = storeSetup ?? configNextStore(preloadedState);

//   // After navigating to a page with an initial Redux state, merge that state
//   // with the current state in the store, and create a new store
//   if (preloadedState && storeSetup) {
//     _storeSetup = configNextStore({
//       ...storeSetup.store.getState(),
//       ...preloadedState,
//     });
//     // Reset the current store
//     storeSetup = undefined;
//   }

//   // For SSG and SSR always create a new store
//   if (typeof window === 'undefined') return _storeSetup;
//   // Create the store once in the client
//   if (!storeSetup) storeSetup = _storeSetup;

//   return _storeSetup;
// };

// export function useStore(initialState) {
//   const _storeSetup = useMemo(() => initializeStore(initialState), [initialState]);
//   return _storeSetup;
// }

const wrapper = createWrapper(configNextStore);

export { wrapper };

export default wrapper;
