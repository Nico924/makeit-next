import React, { useState, useEffect } from 'react';

// Redux part
import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from 'store/rootReducer';

// Import actions here

import classNames from 'classnames/bind';
import CustomSelect from 'components/formItems/CustomSelect';
import geoloc from 'store/geoloc';
import find from 'lodash/find';
import FormElement from 'components/structure/FormElement';
import FieldWrapper from 'components/structure/FieldWrapper';
import Input from 'components/formItems/Input';

import { clone } from 'store/utils/helper';
import { FaTrash } from 'react-icons/fa';
import styleIdentifiers from './geoLocInput.scss';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type GeoLocInputProps = StateProps & DispatchProps & OwnProps;

const GeoLocInput = (props: GeoLocInputProps) => {
  const {
    input,
    placeholder,
    isInput,
    dropdownClassName,
    dropdownItemClassName,
    maxLength,
    className,
    multiple,
    ...rest
  } = props;
  const [geolocList, setGeolocList] = useState([]);
  const [hideDropdown, setHideDropdown] = useState();
  const [placeList, setPlaceList] = useState([]);
  const [placeSelect, setPlaceSelect] = useState([]);

  const items = useSelector((state: StoreState) => state.geoloc.list && state.geoloc.list.data);

  const dispatch = useDispatch();

  const handleClick = () => {
    if (!hideDropdown) setHideDropdown(true);
  };

  useEffect(() => {
    if (input.value && multiple) {
      setPlaceSelect(input.value);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  });

  useEffect(() => {
    if (items) {
      setPlaceList(items);
    }
  }, [items]);

  function renderAddress(res) {
    if (!res) return null;

    const address = {};

    const number = find(res, e => e.types.includes('street_number'));
    address.number = number && number.long_name;
    const route = find(res, e => e.types.includes('route'));
    address.street = route && route.long_name;
    const country = find(res, e => e.types.includes('country'));
    address.country = country && country.long_name;
    const city = find(res, e => e.types.includes('locality'));
    address.city = city && city.long_name;
    const state = find(res, e => e.types.includes('administrative_area_level_1'));
    address.state = state && state.long_name;
    const zip = find(res, e => e.types.includes('postal_code'));
    address.zip = zip && zip.long_name;

    return address;
  }

  function renderLocation(res) {
    if (!res) return null;
    const result = { type: res.type, coordinates: res.coordinates };
    return result;
  }

  const selectCenter = res => {
    if ((!isInput && !items) || (isInput && (!geolocList || geolocList.length === 0))) return;

    const center = isInput ? res : find(items, e => e.description === res.value);

    if (!center) return;

    dispatch(
      geoloc.actions.getGeoLoc.request.action({
        placeId: center.place_id,
        callback: result => {
          if (result) {
            if (isInput) {
              const address =
                maxLength && result.formattedAddress.length > maxLength
                  ? `${result.formattedAddress.substring(0, maxLength - 1)}...`
                  : result.formattedAddress;
              input.onChange(address);
              setHideDropdown(true);

              // send selection value to store
              dispatch(
                geoloc.actions.handleSelection.action({
                  loc: renderLocation(result.loc),
                  placeId: center.place_id,
                  address: result.otherInfo && renderAddress(result.otherInfo.address_components),
                  formattedAddress: result.formattedAddress,
                }),
              );
            } else {
              const obj = {
                formattedAddress: result.formattedAddress,
                loc: renderLocation(result.loc),
                placeId: center.place_id,
                address: result.otherInfo && renderAddress(result.otherInfo.address_components),
              };
              if (multiple) {
                const val = clone(input.value) || [];
                // TODO: check for duplicates
                val.push(obj);

                setPlaceSelect(val);
                input.onChange(val);
              } else {
                input.onChange(obj);
              }
            }
          }
        },
      }),
    );
  };

  let timeoutID;
  const autoComplete = values => {
    if (!values || (!isInput && (!values.inputs || !values.inputs.search))) return;

    const search = isInput ? values : values.inputs.search;

    if (!search || search.length < 5) return;

    if (timeoutID) clearTimeout(timeoutID);

    timeoutID = setTimeout(() => {
      dispatch(
        geoloc.actions.getAutocomplete.request.action({
          input: search,
          noLoading: true,
          callback: result => {
            if (isInput) {
              setGeolocList(result);
              setHideDropdown(false);
            }
          },
        }),
      );
    }, 500);
  };

  const handleDelete = res => {
    const val = [...input.value];
    const index = input.value.findIndex(e => e.placeId === res.placeId);
    val.splice(index, 1);
    setPlaceSelect(val);
    input.onChange(val);
  };

  return !isInput && input && input.value && input.value.formattedAddress && !multiple ? (
    <FormElement {...props}>
      <FieldWrapper {...props}>
        <div className={styles('value-container')}>
          <div className={styles('value')}>{input.value.formattedAddress}</div>
          <div className={styles('icon')} onClick={() => input.onChange(null)}>
            <FaTrash />
          </div>
        </div>
      </FieldWrapper>
    </FormElement>
  ) : (
    <>
      {isInput ? (
        <div
          className={styles('geoloc-input', className)}
          onClick={() =>
            geolocList && geolocList.length > 0 && hideDropdown && setHideDropdown(false)
          }
        >
          <Input input={input} placeholder={placeholder} onChange={autoComplete} {...rest} />
          {!hideDropdown && geolocList && geolocList.length > 0 && (
            <div className={styles('geo-list', dropdownClassName)}>
              {geolocList.map((item, key) => (
                <div
                  className={styles('item', dropdownItemClassName)}
                  key={key}
                  onClick={e => {
                    e.stopPropagation();
                    selectCenter(item);
                  }}
                >
                  <span>{item.description}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <>
          <CustomSelect
            {...props}
            multiple={false}
            placeholder={placeholder || '...'}
            apollo
            apiPayload={{ resourceType: 'placesAutocomplete' }}
            loadApiData={autoComplete}
            filter
            modelValues={{ value: 'description', text: 'description' }}
            asObject
            noUpdate
            items={placeList}
            onChange={selectCenter}
            input={
              multiple
                ? {
                    ...input,
                    // disable onChange so you do not override value with selected selection that won't be a list but just on object
                    onChange: () => {},
                  }
                : input
            }
          />
          {placeSelect &&
            placeSelect.map((elem, key) => (
              <div key={key} className={styles('value-container')}>
                <div className={styles('value')}>{elem.formattedAddress}</div>
                <div className={styles('icon')} onClick={() => handleDelete(elem)}>
                  <FaTrash />
                </div>
              </div>
            ))}
        </>
      )}
    </>
  );
};

export default GeoLocInput;
