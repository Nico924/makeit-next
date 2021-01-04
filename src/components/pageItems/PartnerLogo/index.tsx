import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';

import PartnerLogo, { StateProps, DispatchProps, OwnProps } from './PartnerLogo';

const mapStateToProps = (state: StoreState): {} => ({});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(PartnerLogo);

export default Wrapped;
