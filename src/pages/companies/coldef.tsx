import type { Dispatch, SetStateAction } from 'react';
import type { FormInstance, TableColumnsType } from 'antd/es';
import type { UploadFile } from 'antd/es/upload';
import { Role, type User } from '@type/user.type';
import type { Company } from '@type/company.type';

import { Flex, Tag, Button, Input, Form, Switch, Upload, Popconfirm } from 'antd/es';
import { PlusOutlined } from '@ant-design/icons';
import { Endpoint } from '@constant/endpoint.constant';

export function columns(
  currentUser: User,
  form: FormInstance<Company>,
  editingKey: number | null,
  setEditingKey: Dispatch<SetStateAction<number | null>>,
  saveCompanyData: (id: number, file?: File) => void,
  deleteCompany: (id: number) => void,
) {
  const columns: TableColumnsType<Company> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'User ID',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '10em',
      render: (name: Company['name'], company: Company) => {
        if (editingKey === company.id) {
          return (
            <Form.Item
              name="name"
              style={{ margin: 0 }}
              rules={[{ required: true, message: 'Name is required!' }]}
              initialValue={name}
            >
              <Input />
            </Form.Item>
          );
        }

        return name;
      },
    },
    {
      title: 'About',
      dataIndex: 'about',
      key: 'about',
      width: '15em',
      render: (about: Company['about'], company: Company) => {
        if (editingKey === company.id) {
          return (
            <Form.Item name="about" style={{ margin: 0 }} initialValue={about}>
              <Input.TextArea />
            </Form.Item>
          );
        }

        return about;
      },
    },
    {
      title: 'Logo',
      dataIndex: 'logoUrl',
      key: 'logo',
      render: (logo: Company['logoUrl'], company: Company) => {
        if (editingKey === company.id) {
          const defaultFileList: UploadFile[] | undefined = logo
            ? [
                {
                  uid: '-1',
                  name: company.name,
                  url: `${Endpoint.ServerPath}/${logo}`,
                },
              ]
            : undefined;

          return (
            <Form.Item label={null} valuePropName="file" style={{ margin: 0 }}>
              <Upload
                beforeUpload={file => saveCompanyData(company.id, file)}
                listType="picture-card"
                multiple={false}
                maxCount={1}
                defaultFileList={defaultFileList}
              >
                <button
                  style={{ color: 'inherit', cursor: 'inherit', border: 0, background: 'none' }}
                  type="button"
                >
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </button>
              </Upload>
            </Form.Item>
          );
        }

        return logo ? (
          <img
            draggable={false}
            src={`${Endpoint.ServerPath}/${logo}`}
            alt={company.name}
            height={25}
          />
        ) : (
          <span style={{ fontWeight: 700 }}>No Logo</span>
        );
      },
    },
    {
      title: 'Created at',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: Company['createdAt']) =>
        `${date.toDateString()}, ${date.toLocaleTimeString()}`,
    },
    {
      title: 'Updated at',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (date: Company['updatedAt']) =>
        `${date.toDateString()}, ${date.toLocaleTimeString()}`,
    },
    {
      title: 'Status',
      dataIndex: 'archived',
      key: 'archived',
      width: '7em',
      render: (archived: Company['archived'], company: Company) => {
        if (editingKey === company.id) {
          return (
            <Form.Item
              name="archived"
              style={{ margin: 0 }}
              rules={[{ required: true, message: 'Status is required!' }]}
            >
              <Switch
                checkedChildren="Active"
                unCheckedChildren="Archived"
                defaultChecked={!archived}
              />
            </Form.Item>
          );
        }

        return archived ? <Tag color="error">Archived</Tag> : <Tag color="success">Active</Tag>;
      },
    },
    {
      title: 'Verified',
      dataIndex: 'verified',
      key: 'verified',
      width: '7em',
      render: (verified: Company['verified'], company: Company) => {
        if (editingKey === company.id) {
          return (
            <Form.Item
              name="verified"
              style={{ margin: 0 }}
              rules={[{ required: true, message: 'Status is required!' }]}
            >
              <Switch
                checkedChildren="Verified"
                unCheckedChildren="Refuted"
                defaultChecked={verified}
              />
            </Form.Item>
          );
        }

        return verified ? <Tag color="success">Verified</Tag> : <Tag color="error">Refuted</Tag>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      width: '13em',
      render: (_, company: Company) => {
        if (editingKey === company.id) {
          return (
            <Flex gap={10} justify="center">
              <Button onClick={() => setEditingKey(null)}>Cancel</Button>
              <Button onClick={() => saveCompanyData(company.id)}>Save</Button>
            </Flex>
          );
        }

        return (
          <Flex gap={10} justify="center">
            <Button
              onClick={() => {
                setEditingKey(company.id);
                form.resetFields(Object.keys(company) as (keyof Company)[]);
              }}
            >
              Edit
            </Button>

            {currentUser.role === Role.SUPER_ADMIN && (
              <Popconfirm
                title={`Delete ${company.name}?`}
                onConfirm={() => deleteCompany(company.id)}
              >
                <Button color="danger" variant="solid">
                  Delete
                </Button>
              </Popconfirm>
            )}
          </Flex>
        );
      },
    },
  ];

  return columns;
}
