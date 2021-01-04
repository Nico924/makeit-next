import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';

import PrivacyPolicy, { StateProps, DispatchProps, OwnProps } from './PrivacyPolicy';

const mapStateToProps = (state: StoreState): {} => ({
  content: state.content.raw && state.content.raw.privacy && state.content.raw.privacy.text,
});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(PrivacyPolicy);

export default Wrapped;
