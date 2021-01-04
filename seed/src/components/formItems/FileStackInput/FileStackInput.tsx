import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import config from 'config/general';
import FormElement from 'components/structure/FormElement/FormElement';

import FormItemLabel from 'components/items/FormItemLabel';
import { FaTrash } from 'react-icons/fa';
import styleIdentifiers from './fileStackInput.scss';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type FileStackInputProps = StateProps & DispatchProps & OwnProps;

const FileStackInput = (props: FileStackInputProps) => {
  const { input, className, placeholder, multiple, pickerOptions } = props;

  const filestack = window.filestack;

  const file = input && input.value;

  const selectFile = (): void => {
    const client = filestack.init(config.filestack.key);

    const options = {
      ...pickerOptions,
      accept: ['image/*', 'application/*'],
      transformations: {
        crop: true,
      },
      onFileUploadFinished: newFile => {
        console.log('newFile', newFile);

        if (multiple) return;

        if (input) input.onChange(newFile);
      },
      onUploadDone: newFiles => {
        if (!multiple) return;
        // all newFiles
        // console.log('file', newFiles);
        if (input) input.onChange(newFiles.filesUploaded);
      },
    };
    client.picker(options).open();
  };

  const removeFile = () => {
    input.onChange(null);
  };

  const isImage = file && file.mimetype && file.mimetype.indexOf('image') >= 0;

  const hasFile = file && file.mimetype;

  return (
    <FormElement {...props} className={styles('FileStackInput', className)}>
      <FormItemLabel {...props} />
      {isImage && (
        <div className={styles('preview-wrapper')}>
          <div className={styles('preview')}>
            <img src={file.url} alt="preview" />
            <div className={styles('delete')} onClick={removeFile}>
              <div className={styles('button')}>
                <FaTrash />
              </div>
            </div>
          </div>
        </div>
      )}
      {!isImage && hasFile && (
        <a href={file.url} target="_blank" rel="noopener noreferrer">
          <div className={styles('file')}>{file.filename}</div>
        </a>
      )}

      <div className={styles('file-selector')} onClick={selectFile}>
        {placeholder && <TextItem path={placeholder} />}
        {!placeholder && <span>Select a file</span>}
      </div>
    </FormElement>
  );
};

export default FileStackInput;
