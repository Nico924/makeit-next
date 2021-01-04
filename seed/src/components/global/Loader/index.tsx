import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';
import Loader, { StateProps, DispatchProps, OwnProps } from './Loader';

const mapStateToProps = (state: StoreState): Record<string, any> => ({
  loader: state.app.loader,
});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Loader);

export default Wrapped;
