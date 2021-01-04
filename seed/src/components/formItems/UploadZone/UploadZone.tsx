import * as React from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import Dropzone from 'react-dropzone';
import Cropper from 'components/global/Cropper';
import isEmpty from 'lodash/isEmpty';
import FormItemLabel from 'components/items/FormItemLabel';
import { getFileName } from 'store/utils/api';
import Percentage from 'components/items/Percentage';
import Button from 'components/items/Button';
import LibraryImages from 'components/items/LibraryImages';
import { ImUpload2 } from 'react-icons/im';
import { FaFileAlt, FaTrash } from 'react-icons/fa';
import cameraIcon from './assets/photo-camera.svg';
import styleIdentifiers from './uploadZone.scss';

const styles = classNames.bind(styleIdentifiers);

const V1 = false;
const V2 = true;

export interface UploadZoneProps {
  input: {};
  noResize?: boolean;
  noPreview?: boolean;
  dialogShow: Function;
  dialogHide: Function;
  errorTitle?: string;
  errorMessage?: string;
  accept: string;
  height?: string;
  info?: string;
  subinfo?: string;
  className?: string;
  profile?: boolean;
  noMargin?: boolean;
  meta: {};
  small?: boolean;
  current?: string;
  roundedPreview?: boolean;
  label?: string;
  labelClassName?: string;
  aspectRatio?: number;
  upload?: Function;
  uploadUrl?: string;
  uploadPath?: string;
  // complementary data for auto upload
  uploadData?: {};
  // save as object
  asObject?: boolean;
  // label value of the linked object
  displayValue?: string;
  // save value of the result (for the input)
  saveValue?: string;
  // Display link to video/image/doc instead of preview
  videoPreview?: boolean;
  dropZoneClassName?: string;
  activeClassName?: string;
  acceptClassName?: string;
  rejectClassName?: string;
  disabledClassName?: string;
  // is disabled
  disabled?: boolean;
  iconRemove?: any;
  iconUpload?: any;
  infoClassName?: string;
  subInfoClassName?: string;
  previewClassName?: string;
  pdf?: boolean;
  s3Upload?: boolean;
  // add or not uniq part in filename
  noUnique?: boolean;
}

interface UploadZoneState {
  binary?: any;
}

export default class UploadZone extends React.Component<UploadZoneProps, UploadZoneState> {
  state = {};

  componentWillUnmount() {
    if (this.timeoutID) {
      clearTimeout(this.timeoutID);
    }
  }

  onDrop = (acceptedFiles: File[], rejectedFiles: File[]) => {
    // do stuff with files... console.log(acceptedFiles)
    const { input, noResize, noPreview, dialogShow, errorTitle, errorMessage } = this.props;

    if (rejectedFiles.length > 0) {
      console.log('rej', rejectedFiles);
      dialogShow({
        id: 'error',
        title: errorTitle || 'Mauvais format',
        messages: [errorMessage || "Le fichier choisi n'est pas accepté"],
      });
      return;
    }

    if (acceptedFiles.length === 0) {
      return;
    }

    const file = acceptedFiles[0];
    const self = this;
    self.setState({ binary: null });

    if (!noPreview) {
      // read file
      const reader = new FileReader();

      reader.onload = () => {
        const fileAsBinaryString = reader.result;
        if (!noResize) {
          self.resizeImage(fileAsBinaryString);
        } else if (!this.handleAutoUpload(file, fileAsBinaryString)) {
          this.setState({ binary: fileAsBinaryString });
          input.onChange(file);
        }
      };

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.readAsDataURL(file);
    } else if (!this.handleAutoUpload(file)) {
      input.onChange(file);
    }
  };

  handleReceiptS3File = res => {
    const { input, type, asObject, onChange } = this.props;

    // TODO: add setimeout to hide the progress

    if (res && res.finalUrl) {
      this.handleUploaded();
      let result;
      if (type && type === 'file') {
        if (asObject) {
          result = {
            name: res.fileName,
            url: res.finalUrl,
          };
        } else {
          result = res.finalUrl;
        }
      } else {
        result = {
          large: res.finalUrl,
          medium: res.finalUrl,
          small: res.finalUrl,
        };
      }

      input.onChange(result);

      if (onChange) onChange(result);
    } else {
      // Fail
      this.setState({
        progressInfo: null,
      });
    }
  };

  handleProgress = progressData => {
    if (!progressData) return;

    progressData.progress = Math.min(99, progressData.progress);

    this.setState({
      progressInfo: progressData,
    });
  };

  handleUploaded = () => {
    this.setState({
      progressInfo: {
        progress: 100,
      },
    });

    this.timeoutID = setTimeout(() => {
      this.setState({
        progressInfo: null,
      });
    }, 2000);
  };

  handleAutoUpload = (file, binary) => {
    const {
      showProgress,
      input,
      upload,
      uploadUrl,
      uploadPath,
      uploadData,
      asObject,
      saveValue,
      onChange,
      s3Upload,
      // s3UploadPrefix,
      uploadPrefix,
      noUnique,
      noRename,
      noFileName,
      inputs,
      treatmentFile,
      type,
      apollo,
    } = this.props;

    this.setState({
      progressInfo: {
        progress: 0,
      },
    });

    if (apollo && binary && upload) {
      upload({
        data: {
          ...inputs,
          title: !noRename && !noFileName && getFileName(uploadPrefix, file, noUnique),
          base64: binary,
        },
        progress: this.handleProgress,
        callback: res => {
          this.handleUploaded();
          let inputValue = res;
          if (typeof treatmentFile === 'function') {
            inputValue = treatmentFile(res);
          } else if (type === 'picture' || (input.type && input.type === 'picture')) {
            inputValue = { large: res.large, small: res.small, medium: res.medium };
          }

          if (saveValue && res[saveValue]) inputValue = res[saveValue];
          else if (!asObject) inputValue = res.large || res.medium || res.small || res;

          input.onChange(inputValue);

          if (onChange) onChange(inputValue);
        },
      });
      return true;
    }

    if (!s3Upload && !apollo && (uploadUrl || uploadPath) && upload) {
      upload({
        url: uploadUrl,
        api: uploadPath,
        // standalone file
        file,
        // file name
        fileName: !noRename && !noFileName && getFileName(uploadPrefix, file, noUnique),
        data: {
          ...uploadData,
        },
        progress: this.handleProgress,
        noLoading: showProgress,
        callback: res => {
          this.handleUploaded();
          let inputValue = res;
          if (saveValue && res[saveValue]) inputValue = res[saveValue];
          else if (!asObject) inputValue = res.url || res.default || res.picture || res;

          input.onChange(inputValue);

          if (onChange) onChange(inputValue);
        },
      });
      return true;
    }

    if (s3Upload && !apollo && upload && (uploadUrl || uploadPath)) {
      upload({
        url: uploadUrl,
        api: uploadPath,
        data: {
          fileName: !noRename && !noFileName && getFileName(uploadPrefix, file, noUnique),
          contentType: file.type,
          file,
        },
        noLoading: showProgress,
        progress: this.handleProgress,
        callback: res => this.handleReceiptS3File(res),
      });
    }

    return false;
  };

  // file is a base64 file if apollo and blob if not apollo
  setCropped = (file: string | File) => {
    const { dialogHide, input, apollo } = this.props;

    if (apollo) {
      // file is already base64
      const binary = file;
      if (!this.handleAutoUpload(file, binary)) {
        this.setState({ binary });
        input.onChange(binary);
      }
    } else {
      const binary = URL.createObjectURL(file);

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (!this.handleAutoUpload(file)) {
          this.setState({ binary });
          input.onChange({ large: binary });
        }
      };
    }

    dialogHide('custom');
  };

  removeFile = (e: Event) => {
    const { input } = this.props;
    e.preventDefault();
    e.stopPropagation();

    input.onChange(null);
    this.setState({
      binary: null,
      progressInfo: null,
    });
  };

  resizeImage = (binary: string) => {
    const { dialogShow, aspectRatio, cropperOptions, apollo } = this.props;
    // return;
    dialogShow({
      id: 'custom',
      medium: true,
      noBackgroundClose: true,
      closeButton: 'light',
      closePosition: 'right',
      children: (
        <Cropper
          options={cropperOptions}
          aspectRatio={aspectRatio}
          src={binary}
          action={this.setCropped}
          apollo={apollo}
        />
      ),
    });
  };

  selectFromLocal = () => {
    const { dialogShow, saveValue, asObject, input, onChange, dialogHide, apollo } = this.props;
    dialogShow({
      id: 'custom',
      medium: true,
      children: (
        <LibraryImages
          onSelect={res => {
            let inputValue = res;
            if (apollo) inputValue = { large: res.large, small: res.small, medium: res.medium };
            if (saveValue && res[saveValue]) inputValue = res[saveValue];
            else if (!asObject) inputValue = res.large || res.medium || res.small || res;

            input.onChange(inputValue);

            if (onChange) onChange(inputValue);
            dialogHide('custom');
          }}
        />
      ),
    });
  };

  checkInputValue = () => {
    const { input } = this.props;

    const value = input && input.value;

    if (value && value.name) return value;

    if (!isEmpty(value)) return value;

    return false;
  };

  render() {
    const {
      showProgress,
      accept,
      height,
      info,
      subinfo,
      noPreview,
      className,
      profile,
      noMargin,
      meta: { error, touched },
      maxSize,
      small,
      current,
      roundedPreview,
      displayName,
      displayValue,
      videoPreview,
      dropZoneClassName,
      activeClassName,
      acceptClassName,
      rejectClassName,
      disabled,
      disabledClassName,
      iconRemove,
      iconUpload,
      infoClassName,
      subInfoClassName,
      label,
      previewClassName,
      filePreview,
      keepDropzone,
      children,
      apollo,
      withLibrary,
    } = this.props;

    const { binary, progressInfo } = this.state;

    const file = binary || this.checkInputValue();

    // Binary or file
    const mediaPreview = displayValue && !binary && file[displayValue] ? file[displayValue] : file;

    const fileName = file && (file[displayName] || file.name || file.title || file.filename);

    const fileUrl = file && (file[displayValue] || file.url);

    return (
      <div
        className={styles('UploadZone', profile && 'profile', className, noMargin && 'no-margin')}
      >
        {label ? <FormItemLabel {...this.props} label={label} /> : false}
        {(!file || keepDropzone) && (
          <Dropzone
            multiple={false}
            maxSize={maxSize}
            accept={accept}
            onDrop={this.onDrop}
            disabled={disabled}
          >
            {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject }) => (
              <div
                className={styles('content')}
                {...getRootProps({
                  className: styles(
                    'Dropzone',
                    dropZoneClassName,
                    error && touched ? 'error' : false,
                    profile && 'drop-profile',
                    small && 'small',
                    !label && 'no-label',
                    isDragActive && 'active',
                    isDragActive && activeClassName,
                    isDragAccept && 'accept',
                    isDragAccept && acceptClassName,
                    isDragReject && 'reject',
                    isDragReject && rejectClassName,
                    disabled && 'disabled',
                    disabled && disabledClassName,
                  ),
                  style: {
                    height,
                    backgroundImage: profile && current && `url(${current})`,
                  },
                })}
              >
                <input {...getInputProps()} />
                <div className={styles('dropzone-content')}>
                  {!profile ? (
                    iconUpload || (
                      <span className={styles('icon')}>
                        <ImUpload2 />
                      </span>
                    )
                  ) : (
                    <img src={cameraIcon} alt="icon" className={styles('camera')} />
                  )}
                  {!profile && (
                    <React.Fragment>
                      <div className={styles('info', small && 'small', infoClassName)}>
                        <TextItem path={info || 'general.messages.upload'} />
                      </div>
                      {subinfo && (
                        <div className={styles('subinfo', small && 'small', subInfoClassName)}>
                          <TextItem path={subinfo} />
                        </div>
                      )}
                      {children}
                    </React.Fragment>
                  )}
                </div>
              </div>
            )}
          </Dropzone>
        )}
        {/* Image preview */}
        {!noPreview && mediaPreview && !videoPreview && !filePreview && (
          <div className={styles('preview-wrapper', !label && 'no-margin')}>
            <div
              className={styles(
                'preview',
                (roundedPreview || profile) && 'rounded',
                previewClassName && previewClassName,
              )}
            >
              <img src={mediaPreview} alt="preview" />
              {!disabled && (
                <div className={styles('delete')} onClick={this.removeFile}>
                  <div className={styles('button')}>{iconRemove || <FaTrash />}</div>
                </div>
              )}
            </div>
          </div>
        )}
        {/* Video preview */}
        {!noPreview && mediaPreview && videoPreview && !filePreview && (
          <div className={styles('preview-wrapper', 'video', !label && 'no-margin')}>
            <div className={styles('preview')}>
              {/* eslint-disable-next-line */}
              <video width="100%" controls>
                <source src={mediaPreview} />
              </video>
            </div>
            {!disabled && (
              <div className={styles('remove')} onClick={this.removeFile}>
                {iconRemove || <FaTrash />}
              </div>
            )}
          </div>
        )}
        {/* File preview */}
        {filePreview && file && (
          <>
            {V1 && (
              <div className={styles('file')}>
                <div className={styles('remove')} onClick={this.removeFile}>
                  {iconRemove || <FaTrash />}
                </div>
                {fileUrl && (
                  <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                    {fileName || 'Document'}
                  </a>
                )}
              </div>
            )}

            {V2 && (
              <div className={styles('file-pdf-open')}>
                <TextItem path={fileName || 'Document'} />
                <div className={styles('file')}>
                  {fileUrl && (
                    <a
                      href={fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles('action')}
                    >
                      <FaFileAlt />
                    </a>
                  )}
                  <div className={styles('action', 'remove')} onClick={this.removeFile}>
                    {iconRemove || <FaTrash />}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        {progressInfo && showProgress && (
          <div className={styles('progress-bar')}>
            <div
              className={styles('progress')}
              style={{
                width: `${progressInfo.progress}%`,
              }}
            />
            <Percentage className={styles('text')} value={progressInfo.progress} />
          </div>
        )}
        {apollo && withLibrary && (
          <div>
            <Button action={() => this.selectFromLocal()} label="Select from site library" />
          </div>
        )}
      </div>
    );
  }
}
