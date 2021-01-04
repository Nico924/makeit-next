import { connect } from "react-redux";
import { StoreState } from "store/rootReducer";
import { withRouter } from "react-router-dom";

import InvestHeader, {
  StateProps,
  DispatchProps,
  OwnProps
} from "./InvestHeader";

const mapStateToProps = (state: StoreState): {} => ({
  profile: state.invest.profile
});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(InvestHeader);

export default withRouter(Wrapped);
