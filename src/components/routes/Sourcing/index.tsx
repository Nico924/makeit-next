import { connect } from "react-redux";
import { StoreState } from "store/rootReducer";
import app from "store/app";

import Sourcing, { StateProps, DispatchProps, OwnProps } from "./Sourcing";

const mapStateToProps = (state: StoreState): {} => ({
  content: state.content.raw,
  lg: state.content.lg,
});

const mapDispatchToProps = {
  dialogShow: app.actions.dialog.show.action,
  dialogHide: app.actions.dialog.hide.action,
};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(Sourcing);

export default Wrapped;
