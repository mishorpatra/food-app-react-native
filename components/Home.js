import * as React from 'react'
import { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Button, TextInput, Alert } from 'react-native'
import { IconButton, Portal, Dialog, Paragraph, Provider } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux' 
import { addItem, setItemDataReducer } from '../redux/Items'

//components
import Item from './Item'
import InputForm from './InputForm'

const Home = ({navigation}) => {

  const dispatch = useDispatch()
  const foodItems = useSelector(state => state.items.value)

  const [visible, setVisible] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [itemData, setItemData] = useState({
    name: '',
    price: '',
    id: foodItems[foodItems.length-1].id+1
})
const [editId, setEditId] = useState(null)

  const handleChange = (name, value) => setItemData({...itemData, [name]: value})
  const handleSubmit = () => {
    const { name, price } = itemData
    if(!name || !price) {
      Alert.alert('Please fill all the values')
      return
    }
    dispatch(addItem(itemData))
    hideDialog()
  }

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  return (
    <>
      <View style={styles.container}>
        {
          foodItems.map(item => (
            <Item item={item} setVisibleEdit={setVisibleEdit} setId={setEditId} />
          ))
        }

      </View>
      
      <Provider>
        <TouchableOpacity onPress={showDialog} style={styles.add}><IconButton icon='plus' size={20} sty ></IconButton>
        <Text style={styles.addText}>Add Food Items</Text>
      </TouchableOpacity>
      <TouchableOpacity  style={styles.showAll}>
        <Text style={styles.showText} onPress={() => navigation.navigate('Food List JSON')}>View All</Text>
      </TouchableOpacity>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} style={styles.addForm}>
          <View style={styles.headBx}>
          <Dialog.Title style={styles.header} >
            Add Food
            </Dialog.Title>
          <IconButton icon='close' size={18} onPress={hideDialog}></IconButton>
          </View>
          <Dialog.Content>
            <Text style={styles.inputTag}>Food Name</Text>
            <TextInput style={styles.input} onChangeText={(value) => handleChange('name', value)} />
            <Text style={styles.inputTag}>Price</Text>
            <TextInput style={styles.input} onChangeText={(value) => handleChange('price', value)} />
            <TouchableOpacity style={styles.addBtn} onPress={() => handleSubmit()}><Text style={styles.submitText}>Add Food Item</Text></TouchableOpacity>
          </Dialog.Content>
        </Dialog>
      </Portal>
      </Provider>
      <InputForm setVisibleEdit={setVisibleEdit} visibleEdit={visibleEdit} id={editId} />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    paddingVertical: 5,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    marginHorizontal: 10,
    width: '92.8%'
  },
  add: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d0f0c0',
    borderColor: '#32cd32',
    borderWidth: 2,
    marginHorizontal: 10,
    marginVertical: 20,
    borderRadius: 7,
    height: 45
  },
  addText: {
    fontWeight: "700"
  },
  component: {
    height: '86.79vh'
  },
  addForm: {
    position: 'absolute',
    bottom: -44,
    left: -24,
    width: '99%',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  input: {
    borderColor: '#bbb',
    borderWidth: 1.5,
    borderRadius: 7,
    height: 40,
    marginBottom: 15,
    paddingHorizontal: 8
  },
  inputTag: {
    fontWeight: "600",
    marginBottom: 5
  },
  addBtn: {
    backgroundColor: '#32cd32',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 8
  },
  submitText: {
    color: '#fff',
    fontWeight: "600"
  },
  header: {
    fontWeight: "700",
    fontSize: 18
  },
  showAll: {
    backgroundColor: '#5dbb63',
    width: 70,
    height: 40,
    borderRadius: 10,
    marginLeft: 'auto',
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  showText: {
    color: '#fff',
    fontSize: 14
  },
  headBx: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 15
  }
})
export default Home