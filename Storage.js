// this store  data when you are offline

import AsyncStorage from '@react-native-community/async-storage';

export const saveData = async (photos) => {
  AsyncStorage.setItem('@key', JSON.stringify(photos)).then(() => {
    console.log('saved the data Done.'); //test for data store
  });
};

export const readData = async () => {
  try {
    return await AsyncStorage.getItem('@key');
  } catch (e) {
    // read error
    console.log(e); //error log
  }

  console.log('Done.');
};
