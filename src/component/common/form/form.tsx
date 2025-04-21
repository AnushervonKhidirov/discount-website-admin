import type { FC } from 'react';
import type { FormProps as FormPropsAnt } from 'antd/es';
import type { FormProps } from './form.type';

import { useState } from 'react';
import { Form as FormAnt, Button, Typography } from 'antd/es';

const { Title } = Typography;

export const Form: FC<FormProps> = ({ children, title, onSubmit, submitBtnText, className }) => {
  const [isLoading, setIsLoading] = useState(false);

  const onFinish: FormPropsAnt['onFinish'] = async values => {
    setIsLoading(true);
    await onSubmit(values);
    setIsLoading(false);
  };

  const onFinishFailed: FormPropsAnt['onFinishFailed'] = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <FormAnt className={className} onFinish={onFinish} onFinishFailed={onFinishFailed}>
      {title && (
        <Title level={2} style={{ marginTop: 0 }}>
          {title}
        </Title>
      )}
      {children}

      <Button type="primary" htmlType="submit" loading={isLoading}>
        {submitBtnText ?? 'Submit'}
      </Button>
    </FormAnt>
  );
};
