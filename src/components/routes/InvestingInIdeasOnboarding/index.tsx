import { connect } from "react-redux";
import { StoreState } from "store/rootReducer";

import invest from "store/invest";
import InvestingInIdeasOnboarding, {
  StateProps,
  DispatchProps,
  OwnProps
} from "./InvestingInIdeasOnboarding";

const mapStateToProps = (state: StoreState): {} => ({});

const mapDispatchToProps = {
  setProfile: invest.actions.profile.request.action
};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(InvestingInIdeasOnboarding);

export default Wrapped;
