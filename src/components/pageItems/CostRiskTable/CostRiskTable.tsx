import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import styleIdentifiers from './costRiskTable.scss';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {
  className: string;
  containerClassName: string;
  header: any[];
  data: any[][Record<string, any>];
}

export type CostRiskTableProps = StateProps & DispatchProps & OwnProps;

const CostRiskTable = (props: CostRiskTableProps) => {
  const { className, containerClassName, header, data } = props;

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className={styles('CostRiskTable', className)}>
      <div className={styles('container', containerClassName)}>
        <table>
          <thead>
            <th />
            {header.map((item, key) => (
              <th key={key}>{capitalizeFirstLetter(item)}</th>
            ))}
          </thead>
          <tbody>
            {data.map((item, key) => (
              <tr key={key}>
                <td>{item.name}</td>
                <td className={styles(item[header[0]])}>
                  {capitalizeFirstLetter(item[header[0]])}
                </td>
                <td className={styles(item[header[1]])}>
                  {capitalizeFirstLetter(item[header[1]])}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CostRiskTable;
