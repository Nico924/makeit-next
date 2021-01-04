import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import NewsLetterForm, { StateProps, DispatchProps, OwnProps } from './NewsLetterForm';

const mapStateToProps = (state): object => ({
  mobile: state.app.isMobile,
  lg: state.content.lg,
});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(NewsLetterForm);

export default withRouter(Wrapped);
