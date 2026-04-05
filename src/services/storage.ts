import { createMMKV } from 'react-native-mmkv'

export const storage = createMMKV({
  id: `buoy-app-storage`,
  encryptionKey: '10deb9c35ba0d3a8d1e61b34b145015dc6c9a73923acb25d579875a61561bae6',
  encryptionType: 'AES-256',
  mode: 'multi-process',
  readOnly: false,
  compareBeforeSet: true,
})