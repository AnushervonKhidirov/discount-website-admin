import type { Bank, CreateBankData, UpdateBankData } from '@type/bank.type';
import type { Token } from '@type/auth.type';
import type { ReturnPromiseWithErr } from '@type/return-with-error.type';

import axios from 'axios';
import { Endpoint } from '@constant/endpoint.constant';
import { HttpError } from '@error/http.error';
import { isHttpError, returnError } from '@helper/response.helper';
import { CookieService } from '@service/cookie/cookie.service';

export class BankService {
  private readonly cookieService = new CookieService();

  async get(id: number): ReturnPromiseWithErr<Bank> {
    try {
      const { accessToken } = this.cookieService.get<Token>(['accessToken']);

      const { data } = await axios.get<Bank | HttpError>(
        Endpoint.Bank.replace(':id', id.toString()),
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          validateStatus: () => true,
        },
      );

      if (isHttpError(data)) throw new HttpError(data.status, data.error, data.message);

      const bank = {
        ...data,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
      };

      return [bank, null];
    } catch (err) {
      return returnError(err);
    }
  }

  async getAll(): ReturnPromiseWithErr<Bank[]> {
    try {
      const { accessToken } = this.cookieService.get<Token>(['accessToken']);

      const { data } = await axios.get<Bank[] | HttpError>(Endpoint.Banks, {
        headers: { Authorization: `Bearer ${accessToken}` },
        validateStatus: () => true,
      });

      if (isHttpError(data)) throw new HttpError(data.status, data.error, data.message);

      const banks = data.map(bank => ({
        ...bank,
        createdAt: new Date(bank.createdAt),
        updatedAt: new Date(bank.updatedAt),
      }));

      return [banks, null];
    } catch (err) {
      return returnError(err);
    }
  }

  async create(bankDto: CreateBankData): ReturnPromiseWithErr<Bank> {
    try {
      const { accessToken } = this.cookieService.get<Token>(['accessToken']);

      const { data } = await axios.post<Bank | HttpError>(Endpoint.Banks, bankDto, {
        headers: { Authorization: `Bearer ${accessToken}` },
        validateStatus: () => true,
      });

      if (isHttpError(data)) throw new HttpError(data.status, data.error, data.message);

      const bank = {
        ...data,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
      };

      return [bank, null];
    } catch (err) {
      return returnError(err);
    }
  }

  async update(id: number, bankDto: UpdateBankData): ReturnPromiseWithErr<Bank> {
    try {
      const { accessToken } = this.cookieService.get<Token>(['accessToken']);

      const { data } = await axios.put<Bank | HttpError>(
        Endpoint.Bank.replace(':id', id.toString()),
        bankDto,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          validateStatus: () => true,
        },
      );

      if (isHttpError(data)) throw new HttpError(data.status, data.error, data.message);

      const bank = {
        ...data,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
      };

      return [bank, null];
    } catch (err) {
      return returnError(err);
    }
  }

  async uploadLogo(id: number, file: File): ReturnPromiseWithErr<Bank> {
    try {
      const { accessToken } = this.cookieService.get<Token>(['accessToken']);

      const formData = new FormData();
      formData.append('file', file);

      const { data } = await axios.post<Bank | HttpError>(
        Endpoint.UploadBankLogo.replace(':id', id.toString()),
        formData,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          validateStatus: () => true,
        },
      );

      if (isHttpError(data)) throw new HttpError(data.status, data.error, data.message);

      const bank = {
        ...data,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
      };

      return [bank, null];
    } catch (err) {
      return returnError(err);
    }
  }

  async delete(id: number): ReturnPromiseWithErr<Bank> {
    try {
      const { accessToken } = this.cookieService.get<Token>(['accessToken']);

      const { data } = await axios.delete<Bank | HttpError>(
        Endpoint.Bank.replace(':id', id.toString()),
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          validateStatus: () => true,
        },
      );

      if (isHttpError(data)) throw new HttpError(data.status, data.error, data.message);

      const bank = {
        ...data,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
      };

      return [bank, null];
    } catch (err) {
      return returnError(err);
    }
  }
}
