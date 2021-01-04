import { createBrowserHistory, createMemoryHistory } from 'history';
import window from 'global/window';
import config from 'config/general';

// see https://github.com/ReactTraining/history
const createUniversalHistory = (req): History => {
  if (__BROWSER__) {
    const history = createBrowserHistory({
      basename: config.routerBaseName,
    });
    if (process.env.NODE_ENV === 'development' && !window.browserHistory) {
      window.browserHistory = history;
    }
    return history;
  }

  // default : memory history
  return createMemoryHistory({
    initialEntries: [req ? req.url : '/'],
  });
};

export default createUniversalHistory();

export { createUniversalHistory };
