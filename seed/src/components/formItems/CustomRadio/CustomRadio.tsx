import * as React from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import uniqid from 'uniqid';
import FormElement from 'components/structure/FormElement';
import FormItemLabel from 'components/items/FormItemLabel';
import { getContentList, getContent, clone } from 'store/utils/helper';
import styleIdentifiers from './customRadio.scss';

const styles = classNames.bind(styleIdentifiers);

export interface CustomRadioProps {
  label: string;
  nameItem: string;
  valueItem: string;
  onChange: Function;
  input: {};
  meta: {};
  items: object[];
  classNameRadioContainer?: string;
  classNameSingleRadio?: string;
  customClassName?: string;
}

interface CustomRadioState {}

export default class CustomRadio extends React.Component<CustomRadioProps, CustomRadioState> {
  id: string;

  constructor(props: CustomRadioProps) {
    super(props);
    this.id = uniqid();
  }

  handleChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const { input, onChange } = this.props;
    if (input.onChange) input.onChange(event.target.value);

    if (onChange) onChange(event.target.value);
  };

  treatItems = () => {
    const { items, content } = this.props;

    let listItems;

    if (typeof items === 'string' && content) {
      listItems = getContent(content, items);
    } else {
      listItems = clone(items);
    }
    if (!Array.isArray(listItems) && typeof listItems === 'object') {
      listItems = Object.values(listItems);
    }

    if (!listItems) return null;

    listItems.map(item => {
      item.id = uniqid();
      return item;
    });
    return listItems;
  };

  render() {
    const {
      disabled,
      label,
      items,
      input,
      united,
      classNameRadioContainer,
      radioContainerClassName,
      classNameSingleRadio,
      singleRadioClassName,
      singleRadioActiveClassName,
      imageClassName,
      radioLabelClassName,
      customClassName,
      meta: { touched, error },
      // Label part (see label)
      labelClassName,
      labelStyle,
      labelIcon,
      labelIconClassName,
      labelIconStyle,
      star,
      notRequired,
    } = this.props;

    // to update background color when checked just overwrite css variable $color_radio_checked
    const list = this.treatItems();

    const fromContent = typeof items === 'string';
    return (
      <div
        className={styles(
          'CustomRadio',
          united && 'united',
          error && 'error',
          touched && 'touched',
          customClassName,
        )}
      >
        {list && (
          <FormElement {...this.props}>
            <FormItemLabel
              label={label}
              labelClassName={labelClassName}
              labelStyle={labelStyle}
              labelIcon={labelIcon}
              labelIconClassName={labelIconClassName}
              labelIconStyle={labelIconStyle}
              star={star}
              notRequired={notRequired}
            />
            <div
              className={styles(
                'value-container',
                classNameRadioContainer,
                radioContainerClassName,
              )}
            >
              {list.map((item, key) => {
                const isActive = input.value === item.value;
                return (
                  <label htmlFor={item.id} key={key}>
                    <input
                      disabled={disabled}
                      aria-label={input && input.name}
                      type="radio"
                      name={input.name}
                      value={item.value}
                      id={item.id}
                      onChange={this.handleChange}
                      checked={isActive}
                    />
                    <div
                      className={styles(
                        'single',
                        classNameSingleRadio,
                        singleRadioClassName,
                        isActive && 'active',
                        isActive && singleRadioActiveClassName,
                      )}
                    >
                      {isActive && item.imgActive && (
                        <img src={item.imgActive} className={styles(imageClassName)} alt="" />
                      )}
                      {!isActive && item.img && (
                        <img src={item.img} className={styles(imageClassName)} alt="" />
                      )}
                      {!item.img && (
                        <>
                          {fromContent && (
                            <TextItem
                              item={item}
                              className={styles('label', radioLabelClassName)}
                            />
                          )}
                          {!fromContent && (
                            <TextItem
                              path={item.label || item.value}
                              className={styles('label', radioLabelClassName)}
                            />
                          )}
                        </>
                      )}
                      {item.img && item.label && (
                        <TextItem
                          path={item.label}
                          className={styles('label', radioLabelClassName)}
                        />
                      )}
                    </div>
                  </label>
                );
              })}
            </div>
          </FormElement>
        )}
      </div>
    );
  }
}
