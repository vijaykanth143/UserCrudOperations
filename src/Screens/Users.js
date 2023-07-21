import {StyleSheet, Text, View, FlatList, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, Card, Overlay} from 'react-native-elements';
import Font from '../Style/Font';
import Colors from '../Style/Colors';
import ButtonComp from '../Components/ButtonComp';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {useSelector, useDispatch} from 'react-redux';

import FloatingLableInput from '../Components/FloatingLableInput';

import TableItem from '../Components/TableItem';
import {deletePost, fetchPosts, updatePost} from '../store/slices/postSlice';
const Users = () => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts);
  const dataFetched = useSelector(state => state.posts.dataFetched);
  const status = useSelector(state => state.status);
  console.log('status', status);
  //console.log(posts, 'posts');
  const [UsersList, setUsersList] = useState(posts);
  const [alertVisible, setAlertVisible] = useState(false);

  const [Data, setData] = useState({});

  const updateUser = item => {
    console.log('Edit Item:', item);
    const newState = UsersList.map(obj => {
      // 👇️ if id equals 2, update country property

      if (obj.id === item) {
        return {...obj, ...Data};
      }

      // 👇️ otherwise return the object as is
      return obj;
    });
    const data = {id: Data.id, newTitle: Data.title, newBody: Data.body};
    console.log('data', data);
    setUsersList(newState);
    dispatch(updatePost(data));
    setAlertVisible(false);
  };
  const handleEditAlert = item => {
    setAlertVisible(true);
    const data = UsersList.filter(i => i.id === item.id);
    // setIndex(index);
    setData(data[0]);
  };

  const handleDelete = itemId => {
    // Implement your delete logic here
    const updatedData = UsersList.filter(item => item.id !== itemId);
    setUsersList(updatedData);
    dispatch(deletePost(itemId));
  };
  const handleAdd = itemId => {
    // Implement your delete logic here
    const updatedData = UsersList.filter(item => item.id !== itemId);
    setUsersList(updatedData);
    dispatch(deletePost(itemId));
  };
  const handleAddAlert = () => {};
  useEffect(() => {
    if (!dataFetched) {
      dispatch(fetchPosts());
    }
  }, [dispatch, dataFetched]);

  return (
    <View style={styles.container}>
      <Overlay
        backdropStyle={{
          backgroundColor: '#00000080',
        }}
        overlayStyle={{
          borderRadius: 10,
          backgroundColor: 'transparent',
          elevation: 0,
          shadowOpacity: 0,
        }}
        animationType="fade"
        isVisible={alertVisible}
        onBackdropPress={() => {
          setAlertVisible(false);
        }}>
        <View style={{backgroundColor: 'white', borderRadius: 10}}>
          <View
            style={{
              backgroundColor: '#111551',
              padding: 2,
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
            }}>
            <Text
              style={[
                Font.bold,
                Font.medium,
                {
                  color: 'white',
                  marginVertical: 15,
                  textAlign: 'center',
                },
              ]}>
              Update User Data
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              //backgroundColor: colors.backgroundSecondary,
              borderBottomEndRadius: 10,
              borderBottomStartRadius: 10,
              width: wp('83.33%'),
            }}>
            <View
              style={{
                width: '90%',
                alignSelf: 'center',
              }}>
              <FloatingLableInput
                label="Title"
                value={Data.title}
                onChangeText={e => setData({...Data, title: e})}
              />
              <FloatingLableInput
                label="body"
                value={Data.body}
                onChangeText={e => setData({...Data, body: e})}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: 'transparent',
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 25,
                marginVertical: hp(1),
              }}>
              <ButtonComp
                title={'Update'}
                onPress={() => {
                  updateUser(Data?.id);
                }}
                buttonStyle={styles.buttonStyle}
                textStyle={[Font.semibold, Font.medium, {color: '#ffffff'}]}
              />
            </View>
          </View>
        </View>
      </Overlay>
      <Text style={styles.title}>Table Example</Text>

      <ScrollView style={styles.tableContainer}>
        <View style={styles.header}>
          <Text style={[styles.headerText, {width: widthPercentageToDP(10)}]}>
            S.No
          </Text>
          <Text style={styles.headerText}>Title</Text>
          <Text style={styles.headerText}>Body</Text>
          <Text style={[styles.headerText]}>Actions</Text>
        </View>
        {UsersList?.map(item => (
          <TableItem
            key={item.id}
            item={item}
            onPressEdit={handleEditAlert}
            onPressDelete={handleDelete}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Users;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
    width: widthPercentageToDP(100),
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#f0f0f0',
  },
  headerText: {
    fontWeight: 'bold',
    width: widthPercentageToDP(20),
  },
  tableContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonStyle: {
    backgroundColor: '#111551',
    width: '60%',
    alignSelf: 'center',
    paddingVertical: hp(1),
    borderRadius: 15,
  },
});
