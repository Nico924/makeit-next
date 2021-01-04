import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';

import Textarea from './Textarea';

const mapStateToProps = (state: StoreState): {} => ({
  content: state.content.raw,
  lg: state.content.lg,
});

const mapDispatchToProps = {};

const Wrapped = connect(mapStateToProps, mapDispatchToProps)(Textarea);

export default Wrapped;
