import { Injectable } from '@angular/core';
import * as QRCode from 'qrcode';

@Injectable({
  providedIn: 'root'
})
export class QrCodeService {
  constructor() {}

  async generateQRCode(data: string): Promise<string | null> {
    try {
      const qrCodeDataURL = await QRCode.toDataURL(data);
      return qrCodeDataURL;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}
