import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';

import CustomHubSpotForm, { StateProps, DispatchProps, OwnProps } from './CustomHubSpotForm';

const mapStateToProps = (state: StoreState): Record<string, any> => ({});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(CustomHubSpotForm);

export default Wrapped;
