import { Platform } from 'react-native';

const theme = {
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    }),
  },
};

export default theme;