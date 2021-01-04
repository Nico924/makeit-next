import { StoreAction } from 'store/utils/actions';
import produce from 'immer';
import { handleRequest, handleResponse } from 'store/utils/reducers';
import auth from 'store/auth';
import actions from './actions';

interface NewsletterState {}

export const initialState: NewsletterState = {};

const reducer = (state: NewsletterState = initialState, action: StoreAction): NewsletterState =>
  produce(
    state,
    (draft): NewsletterState => {
      switch (action.type) {
        default:
      }
    },
  );

export default reducer;
