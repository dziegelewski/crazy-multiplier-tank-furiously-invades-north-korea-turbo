const provinces = [
  'Hyesan',
  'Kusong',
  'Rason',
  "Kimch'aek",
  'Anju',
  "Tokch'on",
  'Kanggye',
  'Haeju',
  "P'yongsong",
  "Sunch'on",
  'Sariwon',
  'Kaesong',
  "Kaech'on",
  "Tanch'on",
  'Sinuiju',
  'Wonsan',
  "Namp'o",
  "Ch'ongjin",
  'Hamhŭng',
  'Pjongjang',
];

export default provinces;

export const getProvinceName = number => provinces[number - 1] || '';

export const finalProvinceNumber = provinces.length;
