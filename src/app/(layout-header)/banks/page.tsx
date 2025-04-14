'use client';
import type { Bank } from '@type/bank.type';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { notification, Table, Button } from 'antd/es';
import { BankService } from '@service/bank/bank.service';
import { requestWithRefresh } from '@helper/request.helper';

import { Page } from '@constant/link.constant';
import { columns } from './coldef';

const CreateBankBtn = () => {
  return (
    <Link href={Page.BankCreate}>
      <Button type="primary">Create new bank</Button>
    </Link>
  );
};

const BanksPage = () => {
  const [api, context] = notification.useNotification();
  const bankService = new BankService();
  const [banks, setBanks] = useState<Bank[]>([]);

  async function getBanks() {
    const [banks, err] = await requestWithRefresh(() => bankService.getAllBanks());

    if (err) {
      api.error({ message: err.error, description: err.message });
    } else {
      setBanks(banks);
    }
  }

  useEffect(() => {
    getBanks();
  }, []);

  return (
    <>
      {context}
      <Table<Bank>
        dataSource={banks}
        columns={columns}
        footer={CreateBankBtn}
        rowKey={({ id }) => id}
      />
    </>
  );
};

export default BanksPage;
