import { fork } from 'redux-saga/effects';
import view from 'store/view';
import newsletter from 'store/newsletter';
import job from 'store/job';
import article from 'store/article';
import bootupSaga, { bootup } from './bootup';
import invest from './invest';

export default function* rootSaga(): void {
  yield fork(bootupSaga);
  yield fork(view.saga);
  yield fork(newsletter.saga);
  yield fork(job.saga);
  yield fork(invest.saga);
  yield fork(article.saga);

  // yield fork(bootup);
}
