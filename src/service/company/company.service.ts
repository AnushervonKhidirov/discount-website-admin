import type { Company, UpdateCompanyData } from '@type/company.type';
import type { Token } from '@type/auth.type';
import type { ReturnPromiseWithErr } from '@type/return-with-error.type';

import axios from 'axios';
import { Endpoint } from '@constant/endpoint.constant';
import { HttpError } from '@error/http.error';
import { isHttpError, returnError } from '@helper/response.helper';
import { CookieService } from '@service/cookie/cookie.service';

export class CompanyService {
  private readonly cookieService = new CookieService();

  async get(id: number): ReturnPromiseWithErr<Company> {
    try {
      const { accessToken } = this.cookieService.get<Token>(['accessToken']);

      const { data } = await axios.get<Company | HttpError>(
        Endpoint.Company.replace(':id', id.toString()),
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          validateStatus: () => true,
        },
      );

      if (isHttpError(data)) throw new HttpError(data.status, data.error, data.message);

      const company = {
        ...data,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
      };

      return [company, null];
    } catch (err) {
      return returnError(err);
    }
  }

  async getAll(): ReturnPromiseWithErr<Company[]> {
    try {
      const { accessToken } = this.cookieService.get<Token>(['accessToken']);

      const { data } = await axios.get<Company[] | HttpError>(Endpoint.Companies, {
        headers: { Authorization: `Bearer ${accessToken}` },
        validateStatus: () => true,
      });

      if (isHttpError(data)) throw new HttpError(data.status, data.error, data.message);

      const companies = data.map(company => ({
        ...company,
        createdAt: new Date(company.createdAt),
        updatedAt: new Date(company.updatedAt),
      }));

      return [companies, null];
    } catch (err) {
      return returnError(err);
    }
  }

  async update(id: number, companyDto: UpdateCompanyData): ReturnPromiseWithErr<Company> {
    try {
      const { accessToken } = this.cookieService.get<Token>(['accessToken']);

      const { data } = await axios.put<Company | HttpError>(
        Endpoint.Company.replace(':id', id.toString()),
        companyDto,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          validateStatus: () => true,
        },
      );

      if (isHttpError(data)) throw new HttpError(data.status, data.error, data.message);

      const company = {
        ...data,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
      };

      return [company, null];
    } catch (err) {
      return returnError(err);
    }
  }

  async uploadLogo(id: number, file: File): ReturnPromiseWithErr<Company> {
    try {
      const { accessToken } = this.cookieService.get<Token>(['accessToken']);

      const formData = new FormData();
      formData.append('file', file);

      const { data } = await axios.post<Company | HttpError>(
        Endpoint.UploadCompanyLogo.replace(':id', id.toString()),
        formData,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          validateStatus: () => true,
        },
      );

      if (isHttpError(data)) throw new HttpError(data.status, data.error, data.message);

      const company = {
        ...data,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
      };

      return [company, null];
    } catch (err) {
      return returnError(err);
    }
  }

  async delete(id: number): ReturnPromiseWithErr<Company> {
    try {
      const { accessToken } = this.cookieService.get<Token>(['accessToken']);

      const { data } = await axios.delete<Company | HttpError>(
        Endpoint.Company.replace(':id', id.toString()),
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          validateStatus: () => true,
        },
      );

      if (isHttpError(data)) throw new HttpError(data.status, data.error, data.message);

      const company = {
        ...data,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
      };

      return [company, null];
    } catch (err) {
      return returnError(err);
    }
  }
}
