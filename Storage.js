// this store  data when you are offline

import AsyncStorage from '@react-native-community/async-storage';

export const saveData = async (key, data) => {
  return AsyncStorage.setItem(key, JSON.stringify(data))
    .then(() => {
      console.log('saved the data Done.'); //test for data store
    })
    .catch(console.log);
};

export const readData = async (key) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return JSON.parse(data);
  } catch (e) {
    // read error
    console.log(e); //error log
    throw new Error(e);
  }
};
