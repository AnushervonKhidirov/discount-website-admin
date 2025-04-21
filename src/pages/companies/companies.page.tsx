import type { Company } from '@type/company.type';

import { useEffect, useState } from 'react';
import { notification, Table, Form } from 'antd/es';
import { CompanyService } from '@service/company/company.service';
import { requestWithRefresh } from '@helper/request.helper';
import { useUserStore } from '@store/user.store';

import { columns } from './coldef';

const CompaniesPage = () => {
  const [api, context] = notification.useNotification();
  const { user: currentUser } = useUserStore();

  const companyService = new CompanyService();

  const [form] = Form.useForm<Company>();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [editingKey, setEditingKey] = useState<number | null>(null);

  async function getCompanies() {
    const [companies, err] = await requestWithRefresh(() => companyService.getAll());

    if (err) {
      api.error({ message: err.error, description: err.message });
    } else {
      setCompanies(companies);
    }
  }

  function saveCompanyData(id: number, file?: File) {
    if (file) {
      uploadLogo(id, file);
    } else {
      updateCompanyInfo(id);
    }
  }

  async function uploadLogo(id: number, file: File) {
    const [company, err] = await requestWithRefresh(() => companyService.uploadLogo(id, file));

    if (err) {
      api.error({ message: err.error, description: err.message });
    } else {
      api.success({ message: 'Success', description: `${company.name} logo updated` });
    }
  }

  async function updateCompanyInfo(id: number) {
    const formData = form.getFieldsValue();
    if (typeof formData.archived === 'boolean') formData.archived = !formData.archived;
    setEditingKey(null);

    const [updatedBank, err] = await requestWithRefresh(() => companyService.update(id, formData));

    if (err) {
      api.error({ message: err.error, description: err.message });
    } else {
      api.success({ message: 'Success', description: `${updatedBank.name} updated` });
      setCompanies(companies => {
        return companies.map(company => (company.id === updatedBank.id ? updatedBank : company));
      });
    }
  }

  async function deleteCompany(id: number) {
    const [deletedCompany, err] = await requestWithRefresh(() => companyService.delete(id));

    if (err) {
      api.error({ message: err.error, description: err.message });
    } else {
      api.success({ message: 'Success', description: `${deletedCompany.name} deleted` });
      setCompanies(companies => {
        return companies.filter(company => company.id !== deletedCompany.id);
      });
    }
  }

  useEffect(() => {
    getCompanies();
  }, []);

  return (
    currentUser && (
      <>
        {context}
        <Form form={form}>
          <Table<Company>
            dataSource={companies}
            columns={columns(
              currentUser,
              form,
              editingKey,
              setEditingKey,
              saveCompanyData,
              deleteCompany,
            )}
            rowKey={({ id }) => id}
          />
        </Form>
      </>
    )
  );
};

export default CompaniesPage;
