import { connect } from "react-redux";
import { StoreState } from "store/rootReducer";
import view from "store/view";
import InvestingInIdeas, {
  StateProps,
  DispatchProps,
  OwnProps
} from "./InvestingInIdeas";

const mapStateToProps = (state: StoreState): {} => ({
  content: state.content.raw,
  profile: state.invest.profile
});

const mapDispatchToProps = {
  sendMessage: view.actions.message.request.action
};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(InvestingInIdeas);

export default Wrapped;
