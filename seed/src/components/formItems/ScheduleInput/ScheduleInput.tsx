import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import Button from 'components/items/Button';

import DateTime from 'components/items/DateItem';
import { clone } from 'store/utils/helper';
import Moment from 'moment';
import omit from 'lodash/omit';
import { extendMoment } from 'moment-range';
import { scheduleValidation } from 'store/utils/validation';
import TextItem from 'components/items/TextItem';
import { FaTimes } from 'react-icons/fa';
import styleIdentifiers from './scheduleInput.scss';

const moment = extendMoment(Moment);
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {
  num: number;
  lg: string;
}

export interface DispatchProps {}

export interface OwnProps {
  initialValue?: {};
  responsive?: boolean;
  buttonColor?: string;
  startDate?: string;
  displayDate?: boolean;
}

export type ScheduleInputProps = StateProps & DispatchProps & OwnProps;

const ScheduleInput = (props: ScheduleInputProps): JSX => {
  // Initial value
  const {
    noMargin,
    noQuickAdd,
    noDelete,
    label,
    name,
    input,
    initialValue,
    keyFrom,
    keyTo,
    responsive,
    buttonColor,
    startDate,
    displayDate,
    initialFrom,
    dayClassName,
    initialTo,
    scheduleComparison,
    meta: { error },
    // labels
    labelWeek,
    labelWeekend,
    labelAll,
    labelFrom,
    labelTo,
    labelSlot,
    labelQuickAdd,
    noValidation,
  } = props;

  const initValue = () => {
    let init = (input.value && omit(input.value, '__typename')) ||
      initialValue || [[], [], [], [], [], [], []];

    // Correction for Array that are transformed by _.omit
    if (Array.isArray(input.value) && !Array.isArray(init)) init = Object.values(init);

    return init;
  };

  const init = initValue();

  // only in use when there is a startDate
  const [minDay, setMinDay] = useState(null);
  const [days, setDays] = useState(init);
  const daysKeys = Object.keys(days);

  const fromInput = useRef(null);
  const toInput = useRef(null);

  useEffect(() => {
    const newInit = initValue();

    setDays(clone(newInit));
  }, [input.value]);

  /* only when startDate is passed in props */
  useEffect(() => {
    if (startDate) {
      let indexDay = moment(startDate).days();

      // in moment js the week start at sunday
      indexDay = indexDay === 0 ? 6 : indexDay - 1;

      setMinDay(indexDay);

      // remove from input days before min day
      let current = input.value;
      if (!Array.isArray(current)) current = Object.values(current);

      for (let i = 0; i < current.length; i++) {
        if (i < indexDay) current[i] = [];

        input.onChange(current);
      }
    }
  }, [startDate]);

  const saveDays = () => {
    // Use a copy (or same object)
    const newDays = clone(days);

    input.onChange(newDays);
  };

  const multipleAdd = (first, last): void => {
    const from = fromInput && fromInput.current && fromInput.current.value;
    const to = toInput && toInput.current && toInput.current.value;
    if (!from || !to) return;

    for (let i = first; i < last; i++) {
      days[daysKeys[i]].push([from, to]);
    }

    saveDays();
  };

  const addWeek = (): void => {
    if (minDay && minDay <= 5) multipleAdd(minDay, 5);
    else multipleAdd(0, 5);
  };

  const addWeekend = (): void => {
    if (minDay && minDay > 5) multipleAdd(minDay, 7);
    else multipleAdd(5, 7);
  };

  const addAll = (): void => {
    if (minDay) multipleAdd(minDay, 7);
    else multipleAdd(0, 7);
  };

  const addTimeSlot = day => {
    const last = day[day.length - 1];

    if (last && last[1]) {
      const to = last[1];
      const toTime = moment(to, 'HH:mm');
      const newFrom = moment(toTime)
        .hours(toTime.hours() + 1)
        .format('HH:mm');
      const newTo = moment(toTime)
        .hours(toTime.hours() + 2)
        .format('HH:mm');
      day.push([newFrom, newTo]);
    } else {
      day.push([initialFrom || '08:00', initialTo || '18:00']);
    }

    saveDays();
  };

  const removeTimeSlot = (day, index: string | number): void => {
    // item is a element of days
    day.splice(index, 1);
    saveDays();
  };

  const handleChange = (event, timeSlot, index): void => {
    timeSlot[index] = event.target.value;

    saveDays();
  };

  const renderTimeSlot = (timeSlot, day, index, dayKey) => {
    const errorDay = error && error[dayKey];

    const errorSlot = errorDay && errorDay[index];

    return (
      <div
        className={styles(
          'hours',
          responsive && 'responsive',
          errorSlot && (errorSlot.overlap || errorSlot.before) && 'error',
        )}
        key={index}
      >
        <input
          placeholder="from"
          type="time"
          value={timeSlot[keyFrom || 0]}
          onChange={(event): void => handleChange(event, timeSlot, 0)}
        />
        <input
          placeholder="to"
          type="time"
          min={timeSlot[keyTo || 0]}
          value={timeSlot[keyTo || 1]}
          onChange={(event): void => handleChange(event, timeSlot, 1)}
        />
        {!noDelete && (
          <div className={styles('remove')} onClick={(): void => removeTimeSlot(day, index)}>
            <FaTimes />
          </div>
        )}
      </div>
    );
  };

  const renderQuickAddInputs = () => (
    <>
      <input ref={fromInput} placeholder={labelFrom || 'from'} type="time" />
      <input ref={toInput} placeholder={labelTo || 'to'} type="time" />
    </>
  );

  const renderQuickAddButtons = () => (
    <>
      <Button
        noMargin
        small
        relative
        label={labelWeek || '+ week'}
        action={addWeek}
        color={buttonColor}
      />
      <Button
        noMargin
        small
        relative
        label={labelWeekend || '+ weekend'}
        action={addWeekend}
        color={buttonColor}
      />
      <Button
        noMargin
        small
        relative
        label={labelAll || '+ all'}
        action={addAll}
        color={buttonColor}
      />
    </>
  );

  const renderQuickAdd = () => {
    return (
      <div className={styles('hours')}>
        {renderQuickAddInputs()}
        {renderQuickAddButtons()}
      </div>
    );
  };

  const renderQuickAddResponsive = () => {
    return (
      <div className={styles('hours', 'responsive')}>
        <div className={styles('inputs')}>{renderQuickAddInputs()}</div>
        <div className={styles('buttons')}>{renderQuickAddButtons()}</div>
      </div>
    );
  };

  /* only if displayDate === true */
  const renderDayDate = indexDate => {
    if (indexDate === null || !startDate || minDay === null) return false;

    const diff = indexDate - minDay;
    const date = moment(startDate).add(diff, 'days');

    return date;
  };

  const dataValidation = clone(days);
  if (scheduleComparison && dataValidation) {
    for (let i = 0; i < scheduleComparison.length; i++) {
      dataValidation[i] = [...scheduleComparison[i], ...dataValidation[i]];
    }
  }

  const errorMessage = scheduleValidation(dataValidation);

  return (
    <div className={styles('ScheduleInput', noMargin && 'no-margin')}>
      <div className={styles('label')}>{label || name}</div>
      {!noQuickAdd && (
        <div className={styles('quick-add')}>
          <div className={styles('title', responsive && 'responsive')}>
            <TextItem path={labelQuickAdd || 'Quick add'} />
          </div>

          {!responsive ? renderQuickAdd() : renderQuickAddResponsive()}
        </div>
      )}
      <div className={styles('days-wrapper')}>
        {daysKeys.map((key, dayIndex) => {
          const displayDay = !minDay || dayIndex >= minDay;

          if (!displayDay) return false;
          return (
            <div className={styles('day-wrapper', responsive && 'responsive')} key={dayIndex}>
              <div className={styles('left', responsive && 'responsive')}>
                {!displayDate && (
                  <div className={styles('day', responsive && 'responsive')}>{DAYS[dayIndex]}</div>
                )}
                {displayDate && startDate && (
                  <div
                    className={styles(
                      'day',
                      responsive && 'responsive',
                      'date-displayed',
                      dayClassName,
                    )}
                  >
                    <DateTime date={renderDayDate(dayIndex)} format="dddd DD/MM/YYYY" />
                  </div>
                )}
                {days &&
                  days[key].map((timeSlot, index) =>
                    renderTimeSlot(timeSlot, days[key], index, key),
                  )}
              </div>
              <Button
                rounded
                noMargin
                small
                relative
                label={labelSlot || '+ slot'}
                action={(): void => addTimeSlot(days[key])}
                color={buttonColor}
              />
            </div>
          );
        })}
      </div>
      {!noValidation && errorMessage && (
        <div className={styles('error-message')}>
          <TextItem path={errorMessage} />
        </div>
      )}
    </div>
  );
};

export default ScheduleInput;
