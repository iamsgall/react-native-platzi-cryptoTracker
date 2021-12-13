import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SectionList,
  FlatList,
} from 'react-native';
import colors from '../../resources/colors';
import axios from 'axios';
import CoinMarketItem from './CoinMarketItem';

export default function CoinDetailsScreen({route, navigation}) {
  const [coin, setCoin] = useState({});
  const [markets, setMarkets] = useState([]);
  const url = 'https://api.coinlore.net/api/coin/markets/?id=';
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const {item} = route.params;
    navigation.setOptions({title: coin.symbol});
    setCoin(item);
  }, []);

  const getSymbolIcon = name => {
    if (name) {
      const symbol = name.toLowerCase().replace(' ', '-');
      return `https://c1.coinlore.com/img/25x25/${symbol}.png`;
    }
  };

  const getSections = () => {
    const sections = [
      {title: 'Market Cap', data: [coin.market_cap_usd]},
      {title: 'Volume 24h', data: [coin.volume24]},
      {title: 'Change 24h', data: [coin.percent_change_24h]},
    ];
    return sections;
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const res = await axios.get(`${url}${coin.id}`);
        setMarkets(res.data);
      } catch (err) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [`${url}${coin.id}`]);

  return (
    <View style={styles.container}>
      <View style={styles.subHeader}>
        <Image
          style={styles.iconImg}
          source={{uri: getSymbolIcon(coin.name)}}
        />
        <Text style={styles.titleText}>{coin.name}</Text>
      </View>
      <SectionList
        style={styles.section}
        sections={getSections()}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <View style={styles.sectionItem}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        )}
        renderSectionHeader={({section}) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionText}>{section.title}</Text>
          </View>
        )}
      />
      <Text style={styles.marketsTitle}>Markets</Text>
      <FlatList
        style={styles.list}
        horizontal={true}
        data={markets}
        renderItem={({item}) => <CoinMarketItem item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  iconImg: {
    width: 25,
    height: 25,
  },
  container: {
    backgroundColor: colors.charade,
    flex: 1,
  },
  subHeader: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    padding: 16,
    flexDirection: 'row',
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 8,
  },
  sectionHeader: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',

    padding: 8,
  },
  sectionItem: {
    color: '#fff',
    fontSize: 14,
  },
  itemText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 8,
  },
  sectionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  section: {
    maxHeight: 220,
  },
  list: {
    maxHeight: 70,
    paddingLeft: 16,
  },
  marketsTitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 16,
    marginLeft: 16,
    fontWeight: 'bold',
  },
});
