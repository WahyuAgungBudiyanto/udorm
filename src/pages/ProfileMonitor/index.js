import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity, BackHandler } from 'react-native';
import {ref as r, onValue, off, getDatabase, child, get, update} from 'firebase/database';
import {db} from '../../config/firebase-config';
import {Header, Button, TextInput, Gap, Label} from '../../components';

const ProfileMonitor = ({navigation}) => {
  const [data, setData] = useState([
    {
      DATETIME: '4/4/2023 18:04:14',
      NAME: 'Wahyu Agung',
      ABSENTTYPE: 'Chapel-RabuMalam',
    },
    {
      DATETIME: '4/5/2023 10:15:30',
      NAME: 'Davis S',
      ABSENTTYPE: 'Chapel-Vesper',
    },
    {
      DATETIME: '4/5/2023 10:15:30',
      NAME: 'John Doe',
      ABSENTTYPE: 'Chapel-Vesper',
    },
    {
      DATETIME: '4/5/2023 10:15:30',
      NAME: 'John Doe',
      ABSENTTYPE: 'Chapel-Vesper',
    },
    {
      DATETIME: '4/5/2023 10:15:30',
      NAME: 'John Doe',
      ABSENTTYPE: 'Chapel-Vesper',
    },
    {
      DATETIME: '4/5/2023 10:15:30',
      NAME: 'John Doe',
      ABSENTTYPE: 'Chapel-Vesper',
    },
    {
      DATETIME: '4/5/2023 10:15:30',
      NAME: 'John Doe',
      ABSENTTYPE: 'Chapel-Vesper',
    },
    {
      DATETIME: '4/5/2023 10:15:30',
      NAME: 'John Doe',
      ABSENTTYPE: 'Chapel-Vesper',
    },
    {
      DATETIME: '4/5/2023 10:15:30',
      NAME: 'John Doe',
      ABSENTTYPE: 'Chapel-Vesper',
    },
    {
      DATETIME: '4/5/2023 10:15:30',
      NAME: 'John Doe',
      ABSENTTYPE: 'Chapel-Vesper',
    },
    {
      DATETIME: '4/5/2023 10:15:30',
      NAME: 'John Doe',
      ABSENTTYPE: 'Chapel-Vesper',
    },
    {
      DATETIME: '4/5/2023 10:15:30',
      NAME: 'John Doe',
      ABSENTTYPE: 'Chapel-Vesper',
    },
    {
      DATETIME: '4/5/2023 10:15:30',
      NAME: 'John Doe',
      ABSENTTYPE: 'Chapel-Vesper',
    },
    {
      DATETIME: '4/5/2023 10:15:30',
      NAME: 'John Doe',
      ABSENTTYPE: 'Chapel-Vesper',
    },
  ]);
  const [sheetDBAPI, setSheetDBAPI] = useState('');

  //  const fetchSheetDBAPI = async () => {
  //    try {
  //      const sheetDBAPIRef = r(
  //        db,
  //        `Monitor/80cKQ088SPQhmJJKCr2ANsPe5dv2/sheetDBAPI`,
  //      );
  //      onValue(sheetDBAPIRef, snapshot => {
  //        if (snapshot.exists()) {
  //          setSheetDBAPI(snapshot.val());
  //        } else {
  //          console.log('No SheetDB API endpoint available');
  //        }
  //      });
  //    } catch (error) {
  //      console.error('There was a problem fetching the API endpoint:', error);
  //    }
  //  };
  //  // Call the fetchSheetDBAPI function in the useEffect hook
  //  useEffect(() => {
  //    fetchSheetDBAPI();
  //  }, []);

  //  const fetchData = async () => {
  //    try {
  //      const response = await fetch(sheetDBAPI);

  //      if (!response.ok) {
  //        throw new Error(`HTTP error! status: ${response.status}`);
  //      }

  //      const jsonResponse = await response.json();
  //      return jsonResponse;
  //    } catch (error) {
  //      console.error('There was a problem with the fetch operation:', error);
  //      return [];
  //    }
  //  };

  // useEffect(() => {
  //   fetchData().then(fetchedData => setData(fetchedData));
  // }, []);

  // const refreshData = async () => {
  //   const fetchedData = await fetchData();
  //   setData(fetchedData);
  // };

  const renderItem = ({item}) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.DATETIME}</Text>
      <Text style={styles.itemText}>{item.NAME}</Text>
      <Text style={styles.itemText}>{item.ABSENTTYPE}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No data available</Text>
        }
      />
      <View style={styles.buttonContainer}>
        {/* <TouchableOpacity style={styles.refreshButton} onPress={refreshData}> */}
        <TouchableOpacity style={styles.refreshButton} onPress={() => navigation.navigate('HomeMonitor')}>
          <Text style={styles.refreshButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.refreshButton}>
          <Text style={styles.refreshButtonText}>Refresh</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileMonitor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    minHeight: 50,
    backgroundColor: '#f8f8f8',
    borderRadius: 5, // Add border radius to make table more modern
    marginVertical: 4, // Add vertical margin for spacing between rows
    marginHorizontal: 8, // Add horizontal margin to the item
  },
  itemText: {
    fontSize: 12,
    color: 'black',
    flex: 1, // Give equal width to all columns
    textAlign: 'center', // Center text for all columns
  },

  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  refreshButton: {
    backgroundColor: '#7BC9DE',
    padding: 10,
    borderRadius: 4,
    alignSelf: 'center',
    marginTop: 10,
    marginHorizontal: 5,
  },
  refreshButtonText: {
    color: 'white',
    fontSize: 16,
  },
});