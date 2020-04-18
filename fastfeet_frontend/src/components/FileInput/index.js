import React, { useRef, useEffect, useCallback, useState } from 'react';

import { useField } from '@unform/core';
import { MdImage } from 'react-icons/md';
import api from '~/services/api';
import { LabelContainer } from './styles';

const ImageInput = ({ name, ...rest }) => {
  const inputRef = useRef(null);

  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [preview, setPreview] = useState(defaultValue);
  const [avatar, setAvatar] = useState(null);

  const handlePreview = useCallback(async e => {
    const file = e.target.files && e.target.files[0];

    if (!file) {
      setPreview(null);
    }

    const previewURL = URL.createObjectURL(file);

    const data = new FormData();
    data.append('file', file);
    const res = await api.post('files', data);
    const { id } = res.data;

    setAvatar(id);
    setPreview(previewURL);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'files[0]',
      getValue(ref, value) {
        return value || ref.getAttribute('avatarId');
      },
      clearValue(ref) {
        ref.value = '';
        setAvatar(null);
        setPreview(null);
      },
      async setValue(_, value) {
        const res = await api.get(`files/${value}`);
        const { url } = res.data;
        setAvatar(value);
        setPreview(url);
      },
    });
  }, [fieldName, inputRef, registerField]);

  return (
    <LabelContainer className={error && 'error'} htmlFor={fieldName}>
      {preview ? (
        <div>
          <img src={preview} alt="Preview" />
        </div>
      ) : (
        <div className="image-placeholder">
          <MdImage color="#A28FD0" size={36} />
          <span>Adicionar foto</span>
        </div>
      )}
      <input
        id={fieldName}
        avatarId={avatar}
        type="file"
        ref={inputRef}
        onChange={handlePreview}
        {...rest}
      />
    </LabelContainer>
  );
};

export default ImageInput;
