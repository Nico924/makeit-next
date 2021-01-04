import { connect } from "react-redux";
import { StoreState } from "store/rootReducer";

import ProjectInput, {
  StateProps,
  DispatchProps,
  OwnProps
} from "./ProjectInput";

const mapStateToProps = (state: StoreState): {} => ({
  lg: state.content.lg
});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(ProjectInput);

export default Wrapped;
