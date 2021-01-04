import { connect } from 'react-redux';

import app from 'store/app';
import UploadZone, { UploadZoneProps } from './UploadZone';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  dialogShow: app.actions.dialog.show.action,
  dialogHide: app.actions.dialog.hide.action,
};

const Wrapped = connect<UploadZoneProps>(mapStateToProps, mapDispatchToProps)(UploadZone);

export default Wrapped;
