import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Platform, Pressable} from 'react-native';
import colors from '../../resources/colors';

export default function CoinsItem({item, onPress}) {
  const [isUp, setIsUp] = useState(false);

  useEffect(() => {
    setIsUp(false);
    const myArrows = () => {
      if (item.percent_change_24h > 0) {
        return setIsUp(true);
      } else {
        return setIsUp(false);
      }
    };
    myArrows();
  }, []);

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.row}>
        <Text style={styles.symbolText}>{item.symbol}</Text>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.priceText}>${item.price_usd}</Text>
      </View>
      <View style={styles.row}>
        {isUp ? (
          <Text style={styles.percentUpText}>{item.percent_change_24h}%</Text>
        ) : (
          <Text style={styles.percentDownText}>{item.percent_change_24h}%</Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomColor: colors.zircon,
    borderBottomWidth: 1,
    marginLeft: Platform.OS === 'ios' ? 16 : 0,
    marginRight: Platform.OS === 'ios' ? 16 : 0,
  },
  row: {
    flexDirection: 'row',
  },
  symbolText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 12,
  },
  nameText: {
    color: '#fff',
    fontSize: 14,
    marginRight: 12,
  },
  percentUpText: {
    color: '#2ecc71',
    fontSize: 12,
  },
  percentDownText: {
    color: '#e74c3c',
    fontSize: 12,
  },
  priceText: {
    color: '#fff',
    fontSize: 14,
  },
});
