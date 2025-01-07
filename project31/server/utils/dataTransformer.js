export function transformCsvData(records) {
  const portNames = [...new Set(records.map(record => record['nearend']))];
  
  const data = records.map(record => ({
    date: record.tanggal,
    portName: record['nearend'],
    utilization: parseFloat(record['utz(%)'])
  }));

  return { portNames, data };
}