'use client';
import type { Bank } from '@type/bank.type';
import type { RcFile } from 'antd/es/upload';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Form as FormAnt, Input, Upload, notification } from 'antd/es';
import { PlusOutlined } from '@ant-design/icons';
import { BankService } from '@service/bank/bank.service';
import { requestWithRefresh } from '@helper/request.helper';
import { Form } from '@component/common/form/form';

const BankPage = () => {
  const { id: bankId } = useParams<{ id: string }>();

  const [api, context] = notification.useNotification();
  const bankService = new BankService();
  const [bank, setBank] = useState<Bank | null>(null);

  async function getBank() {
    const [bank, err] = await requestWithRefresh(() => bankService.getBank(+bankId));

    if (err) {
      api.error({ message: err.error, description: err.message });
    } else {
      setBank(bank);
    }
  }

  async function updateBank() {}

  async function uploadLogo(file: RcFile) {
    const [bank, err] = await requestWithRefresh(() => bankService.uploadLogo(+bankId, file));
    if (err) {
      api.error({ message: err.error, description: err.message });
    } else {
      setBank(bank);
    }
  }

  useEffect(() => {
    getBank();
  }, []);

  return (
    bank && (
      <>
        {context}

        <Form onSubmit={updateBank} submitBtnText="Save">
          <FormAnt.Item label={null} valuePropName="file">
            <Upload
              beforeUpload={file => uploadLogo(file)}
              listType="picture-card"
              multiple={false}
              maxCount={1}
            >
              <button
                style={{ color: 'inherit', cursor: 'inherit', border: 0, background: 'none' }}
                type="button"
              >
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            </Upload>
          </FormAnt.Item>

          <FormAnt.Item
            name="name"
            label={null}
            rules={[{ required: true, message: 'Name is required' }]}
            initialValue={bank.name}
          >
            <Input placeholder="Name" name="name" />
          </FormAnt.Item>
        </Form>
      </>
    )
  );
};

export default BankPage;
