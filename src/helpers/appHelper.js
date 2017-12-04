import { AsyncStorage } from 'react-native';

export const saveIsOnboardingSeen = async () => {
  try {
    await AsyncStorage.setItem('isOnboardingSeen', JSON.stringify('true'));
  } catch (error) {
    console.log(error);
  }
}