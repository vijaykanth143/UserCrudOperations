import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';

const TableItem = ({item, onPressEdit, onPressDelete}) => {
  return (
    <View style={styles.row}>
      <Text style={{width: widthPercentageToDP(10)}}>{item.id}</Text>
      <Text style={{width: widthPercentageToDP(20)}}>
        {item.title.length > 10
          ? item.title.slice(0, 10) + '......'
          : item.title}
      </Text>
      <Text style={{width: widthPercentageToDP(20)}}>
        {item.body.length > 10 ? item.body.slice(0, 10) + '......' : item.body}
      </Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onPressEdit(item)}>
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPressDelete(item.id)}>
          <Text style={styles.actionText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    width: widthPercentageToDP(20),
  },
  actionText: {
    marginHorizontal: 10,
    color: 'blue',
  },
});
export default TableItem;
