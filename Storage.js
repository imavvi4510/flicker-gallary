import AsyncStorage from '@react-native-community/async-storage';

export const saveData = async (photos) => {
  AsyncStorage.setItem('@key', JSON.stringify(photos)).then(() => {
    console.log('saved the data Done.');
  });
};

export const readData = async () => {
  try {
    return await AsyncStorage.getItem('@key');
  } catch (e) {
    // read error
    console.log(e);
  }

  console.log('Done.');
};
