import { StoreAction } from 'store/utils/actions';
import produce from 'immer';
import { config } from 'config/general';

import TreatmentContent from 'store/utils/content';

import actions from './actions';

interface ContentState {
  raw: {};
  lg: string;
  defaultLg: string;
  languages: object[];
}

const initialState = {
  raw: null,
  lg: config.defaultLanguage,
  defaultLg: config.defaultLanguage,
  languages: config.availableLanguages,
};

const handleContent = (action: {}, state): {} | null => {
  const { payload } = action;
  const status = action.status && action.status;

  if (status && status === 'fulfilled') {
    if (config.staticContent) return payload;

    const elements = (payload && payload.elements) || payload;

    const treatment = new TreatmentContent(elements, {
      languages: config.availableLanguages,
      whitelistedContentKeys: config.whitelistedContentKeys || [],
      whitelistedCmsPages: config.whitelistedCmsPages,
      blacklistedCmsPages: config.blacklistedCmsPages,
      keyNewContent: config.keyNewContent,
      arrayAsObject: !config.cmsObjectArray,
    });
    let specificLanguage;
    if (config.storeOnlyCurrentLanguage) specificLanguage = state.lg;

    const content = treatment.treatmentPages(specificLanguage);

    return content;
  }

  // keep content if it's already there but refresh didn't work
  const raw = state && state.raw;
  if (raw && raw !== null) return raw;

  return null;
};

// Do not use immer here, can create a infinite loop !
const reducer = (state: ContentState = initialState, action: StoreAction): ContentState =>
  produce(
    state,
    (draft): AuthState => {
      switch (action.type) {
        case actions.content.result.constant:
          draft.raw = handleContent(action, state);
          break;
        case actions.content.set.constant:
          draft.raw = action.payload;
          break;
        case actions.language.switch.constant:
          if (!action.payload) break;
          draft.lg = action.payload;
          break;
        default:
      }
    },
  );

export default reducer;
