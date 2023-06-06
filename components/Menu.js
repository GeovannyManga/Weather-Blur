import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useIsFocused } from '@react-navigation/native';

const Menu = ({ currentTab }) => {
  const [selectedTab, setSelectedTab] = useState(currentTab);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setSelectedTab(currentTab);
    }
  }, [isFocused, currentTab]);

  const handleTabPress = (tab) => {
    setSelectedTab(tab);
    navigation.navigate(tab);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.tab,
          selectedTab === 'profile' && styles.selectedTab,
          { borderTopLeftRadius: 10 },
        ]}
        onPress={() => handleTabPress('profile')}
      >
        <Icon name="user" size={24} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, selectedTab === 'home' && styles.selectedTab]}
        onPress={() => handleTabPress('home')}
      >
        <Icon name="cloud" size={24} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.tab,
          selectedTab === 'stadistic' && styles.selectedTab,
          { borderTopRightRadius: 10 },
        ]}
        onPress={() => handleTabPress('stadistic')}
      >
        <Icon name="pie-chart" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#435063',
    height: 50,
    paddingHorizontal: 20,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedTab: {
    borderTopWidth: 4,
    borderTopColor: '#fff',
  },
});

export default Menu;
