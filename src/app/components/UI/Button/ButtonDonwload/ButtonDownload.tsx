'use client'
import React, { useEffect, useState } from 'react';
import Button from '../Button';
import { saveAs } from 'file-saver';
import { decoderTicketsBlob } from '@/app/utils/decoderBloobTicket';

import styles from './Button.module.scss';
import { fetchGetTicket } from '@/app/api/actionFetchDownloadTicket';
interface IDataBlob {

}
const ButtonDownload = ({ datas }: { datas: any }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleDownload = async () => {
    setLoading(true);
    const data = {
      OrderId: datas.OrderId,
      SiteVersionId: datas.SiteVersionId,
      Lang: datas.Lang
    }
    const response = await fetchGetTicket(data)
    if (response.Result !== null) {
      const urlTicket = decoderTicketsBlob(response.Result?.InterCarsTickets);
      saveAs(urlTicket, 'file.pdf');
      setLoading(false);
    } else {
      setError(response.Error.message);
    }

  }

  return (
    <div className={styles.container}>
      <Button className={styles.btn} onClick={handleDownload} disabled={loading}>
        {loading ? 'Загрузка...' : 'Скачать билет(-ы)'}
      </Button>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default ButtonDownload;