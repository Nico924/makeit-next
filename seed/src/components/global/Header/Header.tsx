import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import { useWindowSize } from 'store/utils/hooks';
import { FcMenu } from 'react-icons/fc';
import styleIdentifiers from './header.module.scss';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {
  className?: string;
  containerClassName?: string;
  leftComponent?: string;
  responsiveClassName?: string;
}

export interface DispatchProps {}

export interface OwnProps {}

export type HeaderProps = StateProps & DispatchProps & OwnProps;

const Header = (props: HeaderProps) => {
  const {
    className,
    containerClassName,
    responsiveClassName,
    leftComponent,
    children,
    showSideMenu,
  } = props;
  const leftContainer = useRef(null);
  const rightContainer = useRef(null);
  const mainContainer = useRef(null);
  const windowSize = useWindowSize();
  const [responsive, setResponsive] = useState(null);
  const [rightMinSize, setRightMinSize] = useState(null);
  const [leftSize, setLeftSize] = useState(null);

  useEffect(() => {
    const mainSize = mainContainer.current.offsetWidth;
    const minSize = mainSize - leftSize >= rightMinSize;
    setResponsive(!minSize);
  }, [windowSize, leftSize, rightMinSize]);

  useEffect(() => {
    if (rightContainer.current.offsetWidth) {
      setRightMinSize(rightContainer.current.offsetWidth);
    }
  }, [rightContainer]);

  useEffect(() => {
    if (leftContainer.current && leftContainer.current.clientWidth) {
      setLeftSize(leftContainer.current.clientWidth);
    } else {
      setLeftSize(0);
    }
  }, [leftContainer]);

  useEffect(() => {
    let interval;
    if (leftSize === 0) {
      interval = setInterval(() => {
        setLeftSize(leftContainer.current.clientWidth);
      }, 100);
    } else if (interval && leftSize !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [leftSize]);

  function renderReponsivePart() {
    return (
      <div className={styles('icon-menu')}>
        <FcMenu />
      </div>
    );
  }

  function openSideMenu() {
    showSideMenu({
      id: 'right',
      content: <div className={styles('responsive', responsiveClassName)}>{children}</div>,
    });
  }

  return (
    <div className={styles('Header', className)} ref={mainContainer}>
      <div className={styles('container', containerClassName)}>
        <div className={styles('logo')} ref={leftContainer}>
          {leftComponent}
        </div>
        {typeof window !== 'undefined' && (
          <div className={styles('menu')} ref={rightContainer}>
            {responsive ? <div onClick={openSideMenu}>{renderReponsivePart()}</div> : children}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
