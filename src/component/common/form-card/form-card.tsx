import type { FC } from 'react';
import type { FormProps } from '../form/form.type';

import { Card } from 'antd/es';
import { Form } from '../form/form';

import classNames from 'classnames';
import classes from './form-card.module.css';

export const FormCard: FC<FormProps> = ({ children, title, onSubmit, className }) => {
  return (
    <div className={classNames(classes.formCard, className)}>
      <Card className={classes.card}>
        <Form title={title} onSubmit={onSubmit}>
          {children}
        </Form>
      </Card>
    </div>
  );
};
