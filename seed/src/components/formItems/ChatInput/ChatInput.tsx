import React, { useState, useEffect, useCallback, useRef } from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import { useDropzone } from 'react-dropzone';
import config from 'config/general';
import { getFileName } from 'store/utils/api';
import { FaPaperclip, FaTimes } from 'react-icons/fa';
import styleIdentifiers from './chatInput.scss';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type ChatInputProps = StateProps & DispatchProps & OwnProps;

const ChatInput = (props: ChatInputProps) => {
  const {
    onKeyPress,
    name,
    input,
    placeholder,
    uploadApollo,
    dialogShow,
    prefixFile,
    textAreaClassName,
  } = props;
  const textAreaInput = useRef(null);

  const [file, setFile] = useState();
  const [fileValues, setFileValues] = useState();

  const handleAutoUpload = (upload, binary) => {
    const base64 = btoa(
      new Uint8Array(binary).reduce((data, byte) => data + String.fromCharCode(byte), ''),
    );

    if (config.apollo && binary && uploadApollo) {
      uploadApollo({
        data: {
          title: getFileName(prefixFile || '', upload, false),
          base64,
        },
        noLoading: true,
        callback: res => {
          let inputValue = res;
          inputValue = { large: res.large, small: res.small, medium: res.medium };

          setFileValues(inputValue);
          setFile({ code: 'success', name: upload.name });
        },
      });
    }
  };

  const handleDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      dialogShow({
        id: 'error',
        title: 'Mauvais format',
        messages: ["Le fichier choisi n'est pas accepté"],
      });
    }

    acceptedFiles.forEach(upload => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        handleAutoUpload(upload, binaryStr);
        setFile({ name: 'En cours de chargement...', code: 'uploading' });
      };
      reader.readAsArrayBuffer(upload);
    });
  });

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    noClick: true,
    accept: 'image/jpeg, image/png, application/pdf',
    onDrop: handleDrop,
  });

  function handleInputChange(e) {
    if (input && input.onChange) input.onChange({ ...input.value, message: e.target.value });
  }

  useEffect(() => {
    if (onKeyPress) {
      if (textAreaInput && textAreaInput.current) {
        textAreaInput.current.addEventListener('keypress', onKeyPress);
      } else {
        textAreaInput.current.removeEventListener('keypress', onKeyPress);
      }
    }
  }, [textAreaInput]);

  useEffect(() => {
    if (fileValues && input) input.onChange({ ...input.value, file: fileValues });
    else if (!fileValues) {
      input.onChange({ ...input.value, file: null });
      setFile(null);
    }
  }, [fileValues]);

  return (
    <div
      {...getRootProps({
        className: styles('ChatInput', isDragActive && 'active'),
      })}
    >
      <div className={styles('text-area-container')}>
        <input {...getInputProps()} />
        <textarea
          className={styles(textAreaClassName)}
          placeholder={placeholder}
          name={`${name}.message`}
          {...input}
          value={input && input.value && input.value.message}
          onChange={handleInputChange}
          ref={textAreaInput}
        />
        <div className={styles('actions')}>
          <div className={styles('item')} onClick={open}>
            <FaPaperclip />
          </div>
        </div>
      </div>
      {input && input.value && input.value.file && file && (
        <div className={styles('file')}>
          {file.name}
          {file.code === 'success' && (
            <div
              className={styles('icon')}
              onClick={() => {
                setFileValues(null);
                setFile(null);
              }}
            >
              <FaTimes />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatInput;
