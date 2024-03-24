export const steps = (t: any) => [
  {
    id: 0,
    title: t('informations'),
    fields: ['name', 'email'],
  },
  {
    id: 1,
    title: t('services'),
    fields: ['serviceName'],
  },
  { id: 2, title: t('budget'), fields: ['budget'] },
  { id: 3, title: t('time'), fields: ['time'] },
  { id: 4, title: t('design'), fields: ['design'] },
  { id: 5, title: t('submit'), fields: [] },
];
