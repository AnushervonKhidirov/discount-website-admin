import type { FC, Dispatch, SetStateAction } from 'react';
import type { Bank } from '@type/bank.type';

import { useEffect, useState } from 'react';
import { notification, Table, Button, Form, Modal, Input } from 'antd/es';
import { Form as MyForm } from '@component/common/form/form';
import { BankService } from '@service/bank/bank.service';
import { requestWithRefresh } from '@helper/request.helper';
import { useUserStore } from '@store/user.store';

import { columns } from './coldef';

const CreateBank: FC<{ openCreateBankForm: Dispatch<SetStateAction<boolean>> }> = ({
  openCreateBankForm,
}) => {
  return (
    <Button type="primary" onClick={() => openCreateBankForm(true)}>
      Create new bank
    </Button>
  );
};

const BanksPage = () => {
  const [api, context] = notification.useNotification();
  const { user: currentUser } = useUserStore();
  const bankService = new BankService();

  const [form] = Form.useForm<Bank>();
  const [banks, setBanks] = useState<Bank[]>([]);
  const [editingKey, setEditingKey] = useState<number | null>(null);
  const [openCreateBankForm, setOpenCreateBankForm] = useState<boolean>(false);

  async function getBanks() {
    const [banks, err] = await requestWithRefresh(() => bankService.getAll());

    if (err) {
      api.error({ message: err.error, description: err.message });
    } else {
      setBanks(banks);
    }
  }

  function saveBankData(id: number, file?: File) {
    if (file) {
      uploadLogo(id, file);
    } else {
      updateBankInfo(id);
    }
  }

  async function uploadLogo(id: number, file: File) {
    const [bank, err] = await requestWithRefresh(() => bankService.uploadLogo(id, file));

    if (err) {
      api.error({ message: err.error, description: err.message });
    } else {
      api.success({ message: 'Success', description: `${bank.name} logo updated` });
    }
  }

  async function updateBankInfo(id: number) {
    const formData = form.getFieldsValue();
    if (typeof formData.archived === 'boolean') formData.archived = !formData.archived;
    setEditingKey(null);

    const [updatedBank, err] = await requestWithRefresh(() => bankService.update(id, formData));

    if (err) {
      api.error({ message: err.error, description: err.message });
    } else {
      api.success({ message: 'Success', description: `${updatedBank.name} updated` });
      setBanks(banks => {
        return banks.map(bank => (bank.id === updatedBank.id ? updatedBank : bank));
      });
    }
  }

  async function createBank(value: { name: string }) {
    const [bank, err] = await requestWithRefresh(() => bankService.create(value));

    if (err) {
      api.error({ message: err.error, description: err.message });
    } else {
      setBanks(banks => [bank, ...banks]);
      setOpenCreateBankForm(false);
    }
  }

  async function deleteBank(id: number) {
    const [deletedBank, err] = await requestWithRefresh(() => bankService.delete(id));

    if (err) {
      api.error({ message: err.error, description: err.message });
    } else {
      api.success({ message: 'Success', description: `${deletedBank.name} deleted` });
      setBanks(banks => {
        return banks.filter(bank => bank.id !== deletedBank.id);
      });
    }
  }

  useEffect(() => {
    getBanks();
  }, []);

  return (
    currentUser && (
      <>
        {context}
        <Form form={form}>
          <Table<Bank>
            dataSource={banks}
            columns={columns(
              currentUser,
              form,
              editingKey,
              setEditingKey,
              saveBankData,
              deleteBank,
            )}
            footer={() => <CreateBank openCreateBankForm={setOpenCreateBankForm} />}
            rowKey={({ id }) => id}
          />
        </Form>

        <Modal
          open={openCreateBankForm}
          footer={null}
          onCancel={() => setOpenCreateBankForm(false)}
          centered
        >
          <MyForm onSubmit={createBank} submitBtnText="Add bank" title="Create new bank">
            <Form.Item name="name" rules={[{ required: true, message: 'Bank name is required!' }]}>
              <Input placeholder="Bank name"></Input>
            </Form.Item>
          </MyForm>
        </Modal>
      </>
    )
  );
};

export default BanksPage;
