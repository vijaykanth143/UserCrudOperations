import {StyleSheet, Text, View, FlatList, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, Card, Overlay} from 'react-native-elements';
import Font from '../Style/Font';
import Colors from '../Style/Colors';
import ButtonComp from '../Components/ButtonComp';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {useSelector, useDispatch} from 'react-redux';

import FloatingLableInput from '../Components/FloatingLableInput';

import TableItem from '../Components/TableItem';
import {
  addPost,
  deletePost,
  fetchPosts,
  updatePost,
} from '../store/slices/postSlice';
import PopUp from '../Components/PopUp';
const Users = () => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts);
  const dataFetched = useSelector(state => state.posts.dataFetched);
  const status = useSelector(state => state.status);
  console.log('status', status);
  //console.log(posts, 'posts');
  const [UsersList, setUsersList] = useState(posts);
  const [alertVisible, setAlertVisible] = useState(false);
  const [AddAlert, setAddAlertVisible] = useState(false);
  const [DeleteAlert, setDeleteAlertVisible] = useState(false);

  const [Data, setData] = useState({});
  const [AddData, setAddData] = useState({});
  const [DeleteId, setID] = useState(null);

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
  const handleDeleteAlert = itemId => {
    setDeleteAlertVisible(true);
    setID(itemId);
  };
  const handleDelete = itemId => {
    // Implement your delete logic here
    const updatedData = UsersList.filter(item => item.id !== DeleteId);
    setUsersList(updatedData);
    dispatch(deletePost(DeleteId));
    setDeleteAlertVisible(false);
  };
  const handleAdd = itemId => {
    const data = {
      id: UsersList?.length + 1,
      userId: Math.random().toFixed(0),
      title: AddData?.title,
      body: AddData?.body,
    };
    console.log('data', data, UsersList[0]);
    //UsersList.push(data);
    setUsersList(prevstate => [...prevstate, data]);
    dispatch(addPost(data));
    setAddAlertVisible(false);
    setAddData(null);
  };
  const handleAddAlert = () => {
    setAddAlertVisible(true);
  };
  useEffect(() => {
    if (!dataFetched) {
      dispatch(fetchPosts());
    }
  }, [dispatch, dataFetched]);

  return (
    <View style={styles.container}>
      <PopUp
        onChangeBody={e => setData({...Data, body: e})}
        onChangeTitle={e => setData({...Data, title: e})}
        Data={Data}
        handle={() => updateUser(Data?.id)}
        alertVisible={alertVisible}
        onBackdropPress={() => {
          setAlertVisible(false);
        }}
        popUpName="Update Data"
        ButtonName="Update"
      />
      <PopUp
        onChangeBody={e => setAddData({...AddData, body: e})}
        onChangeTitle={e => setAddData({...AddData, title: e})}
        Data={AddData}
        handle={handleAdd}
        alertVisible={AddAlert}
        onBackdropPress={() => {
          setAddAlertVisible(false);
        }}
        popUpName="Add Data"
        ButtonName="Add"
      />
      <PopUp
        handle={handleDelete}
        alertVisible={DeleteAlert}
        onBackdropPress={() => {
          setDeleteAlertVisible(false);
        }}
        popUpName="Delete Data"
        ButtonName1="Yes"
        ButtonName2="No"
        Des={`Are you sure to delete this Data of Id(${DeleteId})?`}
      />
      <Text style={styles.title}>Table Example</Text>
      <ButtonComp
        title={'Add data'}
        onPress={() => {
          handleAddAlert();
        }}
        buttonStyle={[
          styles.buttonStyle,
          {alignSelf: 'flex-end', marginVertical: hp(2)},
        ]}
        textStyle={[Font.semibold, Font.medium, {color: '#ffffff'}]}
      />
      <ScrollView style={styles.tableContainer}>
        <View style={styles.header}>
          <Text style={[styles.headerText, {width: wp(10)}]}>S.No</Text>
          <Text style={styles.headerText}>Title</Text>
          <Text style={styles.headerText}>Body</Text>
          <Text style={[styles.headerText]}>Actions</Text>
        </View>
        {UsersList?.map(item => (
          <TableItem
            key={item.id}
            item={item}
            onPressEdit={handleEditAlert}
            onPressDelete={handleDeleteAlert}
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
    width: wp(100),
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
    width: wp(20),
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
