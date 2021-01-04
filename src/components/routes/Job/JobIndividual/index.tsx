import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';
import job from 'store/job';
import JobIndividual, { StateProps, DispatchProps, OwnProps } from './JobIndividual';

const mapStateToProps = (state: StoreState): object => ({
  job: state.job.item,
  related: state.job.related,
});

const mapDispatchToProps = {
  getJob: job.actions.getById.request.action,
  getRelated: job.actions.related.request.action,
};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(JobIndividual);

export default Wrapped;
