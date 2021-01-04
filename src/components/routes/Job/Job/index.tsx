import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';
import job from 'store/job';
import Job, { StateProps, DispatchProps, OwnProps } from './Job';

const mapStateToProps = (state: StoreState): object => ({
  jobs: state.job.list,
  mobile: state.app.isMobile,
  categories:
    state.content &&
    state.content.raw &&
    state.content.raw.list &&
    state.content.raw.list.jobCategories,
});

const mapDispatchToProps = {
  getAllJob: job.actions.getAll.request.action,
};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Job);

export default Wrapped;
