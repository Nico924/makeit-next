import { put, takeLatest, all, take, call, select } from 'redux-saga/effects';

import app from 'store/app';
import { loadContent } from 'store/content/sagas';
import article from 'store/article';
import content from 'store/content';
import { genericCall } from 'store/utils/sagas';
import { StoreState } from 'store/rootReducer';

import StaticData from 'server/staticData';

export function* bootupBackend() {
  const apiCalls = [];

  // check for static files
  const instance = StaticData.getInstance();

  // content caching
  if (instance.data.content) {
    yield put(content.actions.content.set.action(instance.data.content));
  } else {
    apiCalls.push(call(genericCall, content.actions.content));
  }

  // recent articles caching
  if (instance.data.articles) {
    yield put(article.actions.getRecentArticles.result.action(instance.data.articles, 'fulfilled'));
  } else apiCalls.push(call(genericCall, article.actions.getRecentArticles));

  if (apiCalls.length) {
    yield all(apiCalls);

    const loadedContent = yield select((state: StoreState) => state.content.raw);
    const loadedArticles = yield select((state: StoreState) => state.article.recent?.data);

    instance.setData('content', loadedContent);
    instance.setData('articles', loadedArticles);
  }
}

export function* bootup(url, query): void {
  console.log('url', url, query);
  yield put(app.actions.loader.show.action());

  yield call(bootupBackend);

  const lg = yield select(content.selectors.getLanguage);

  const apiCalls = [];

  if (url && typeof url === 'string') {
    const splittedLocation = url.split('/');

    if (url === '/blog') {
      apiCalls.push(call(genericCall, article.actions.getArticles));
    }

    if (url.includes('/blog') && splittedLocation.length === 3) {
      if (splittedLocation[2] !== 'thank-you-blog') {
        apiCalls.push(
          call(genericCall, article.actions.getOneArticle, {
            data: { url: splittedLocation[2], lg },
          }),
        );
      }
    }
  }

  yield all(apiCalls);

  yield put(app.actions.bootup.result.action());
  yield put(app.actions.loader.hide.action());
}

function* bootupWatcher(): void {
  yield all([yield takeLatest(app.actions.bootup.request.constant, bootup)]);
}

export default function* saga(): void {
  yield call(bootupWatcher);
}
