import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';
import view from 'store/view';
import JobThanksPage, { StateProps, DispatchProps, OwnProps } from './JobThanksPage';

const mapStateToProps = (state: StoreState): {} => ({});

const mapDispatchToProps = {
  footerStatus: view.actions.hideFooterCta.action,
};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(JobThanksPage);

export default Wrapped;
