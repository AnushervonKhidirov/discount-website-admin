'use client';
import type { CreateBankData } from '@type/bank.type';

import { Form as FromAnt, Input, notification } from 'antd/es';
import { Form } from '@component/common/form/form';
import { BankService } from '@service/bank/bank.service';
import { requestWithRefresh } from '@helper/request.helper';

const BanksCreatePage = () => {
  const [api, context] = notification.useNotification();

  const bankService = new BankService();

  const onSubmit = async (values: CreateBankData) => {
    const [bank, err] = await requestWithRefresh(() => bankService.create(values));
    if (err) return api.error({ message: err.error, description: err.message });
    api.success({ message: 'Success', description: `Bank ${bank.name} created successfully` });
  };

  return (
    <>
      {context}
      <Form onSubmit={onSubmit} submitBtnText="Create">
        <FromAnt.Item
          name="name"
          label={null}
          rules={[{ required: true, message: 'Name is required' }]}
        >
          <Input placeholder="Name" name="name" />
        </FromAnt.Item>
      </Form>
    </>
  );
};

export default BanksCreatePage;
