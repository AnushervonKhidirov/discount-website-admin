import type { FC } from 'react';
import { AdditionalProps } from '@type/common.type';

import classNames from 'classnames';
import classes from './content.module.css';

const Content: FC<AdditionalProps> = ({ className, children }) => {
  return <div className={classNames(classes.content, className)}>{children}</div>;
};

export default Content;
