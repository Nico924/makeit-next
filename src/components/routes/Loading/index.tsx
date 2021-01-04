import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';
import view from 'store/view';
import Loading, { StateProps, DispatchProps, OwnProps } from './Loading';

const mapStateToProps = (state: StoreState): object => ({});

const mapDispatchToProps = {
  updateLoading: view.actions.fakeLoading.action,
};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Loading);

export default Wrapped;
