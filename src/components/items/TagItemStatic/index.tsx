import { connect } from "react-redux";
import { StoreState } from "store/rootReducer";

import TagItemStatic, {
  StateProps,
  DispatchProps,
  OwnProps,
} from "./TagItemStatic";

const mapStateToProps = (state: StoreState): {} => ({});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(TagItemStatic);

export default Wrapped;
