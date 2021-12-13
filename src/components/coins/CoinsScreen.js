import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import API from '../../libs/API';
import CoinsItem from './CoinsItem';
import colors from '../../resources/colors';
import CoinSearch from './CoinSearch';

export default function CoinsScreen({navigation}) {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [allCoins, setAllCoins] = useState([]);

  useEffect(() => {
    const ac = new AbortController();
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const res = await API.get('tickers/?start=0&limit=50');
        setCoins(res.data.data);
        setAllCoins(res.data.data);
      } catch (err) {
        setIsError(true);
      }
      setIsLoading(false);
      return () => ac.abort();
    };
    fetchData();
  }, []);

  const handlePress = item => {
    navigation.navigate('coinDetail', {item});
  };

  const handleSearch = query => {
    const coinsFiltered = allCoins.filter(coin => {
      // console.log();
      return (
        coin.name.toLowerCase().includes(query.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(query.toLowerCase())
      );
    });

    setCoins(coinsFiltered);
  };

  return (
    <View style={styles.container}>
      <CoinSearch onChange={handleSearch} />
      {isError && <Text>Something went wrong ...</Text>}
      {isLoading ? (
        <ActivityIndicator color="#fff" size="large" style={styles.loader} />
      ) : (
        <FlatList
          data={coins}
          renderItem={({item}) => (
            <CoinsItem item={item} onPress={() => handlePress(item)} />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.charade,
  },
  btn: {
    padding: 8,
    backgroundColor: 'yellow',
    borderRadius: 8,
    margin: 16,
  },
  btnText: {
    textAlign: 'center',
  },
  loader: {
    marginTop: 60,
  },
});
