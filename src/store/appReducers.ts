import view from 'store/view';
import newsletter from 'store/newsletter';
import job from 'store/job';
import invest from 'store/invest';
import article from 'store/article';

export interface AppStoreState {
  view: ReturnType<typeof view.reducer>;
  newsletter: ReturnType<typeof newsletter.reducer>;
  job: ReturnType<typeof job.reducer>;
  invest: ReturnType<typeof invest.reducer>;
  article: ReturnType<typeof article.reducer>;
}

const reducers = {
  view: view.reducer,
  newsletter: newsletter.reducer,
  job: job.reducer,
  invest: invest.reducer,
  article: article.reducer,
};

export default reducers;
