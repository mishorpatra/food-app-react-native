import * as React from 'react'
import { useState } from 'react'
import { IconButton, Portal, Dialog, Paragraph, Provider } from 'react-native-paper'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { updateItem } from '../redux/Items'

const InputForm = ({id, visibleEdit, setVisibleEdit}) => {

  const dispatch = useDispatch()
  const foodItems = useSelector(state => state.items.value)
  let foodItem = {}

  foodItems.map(item => {
    if(item.id == id) {
      foodItem = item
    }
  })

  const [itemData, setItemData] = useState({
    name: foodItem.name,
    price: foodItem.price,
    id: foodItem.id
  })
  
  const showDialog = () => setVisibleEdit(true);

  const hideDialog = () => setVisibleEdit(false);

  const handleChange = (name, value) => {
    setItemData({...itemData, [name]: value})
  }
  const handleSubmit = () => {
    if((!itemData.name && !foodItem.name) || (itemData.price && !foodItem.price)) {
      Alert.alert('please fill data')
      return
    }
    dispatch(updateItem({name: itemData.name || foodItem.name, price: itemData.price || foodItem.price, id: foodItem
    .id}))
    hideDialog()
  }
  return (
    <Provider>
    <Portal>
        <Dialog visible={visibleEdit} onDismiss={hideDialog} style={styles.addForm}>
        <View style={styles.headBx}>
          <Dialog.Title style={styles.header} >
            Edit Food Details
            </Dialog.Title>
            <IconButton icon='close' size={18} onPress={hideDialog}></IconButton>
          </View>
          <Dialog.Content>
            <Text style={styles.inputTag}>Food Name</Text>
            <TextInput style={styles.input} placeholder={foodItem.name} onChangeText={(value) => handleChange('name', value)} />
            <Text style={styles.inputTag}>Price</Text>
            <TextInput style={styles.input} placeholder={foodItem.price} onChangeText={(value) => handleChange('price', value)} />
            <TouchableOpacity style={styles.addBtn}  onPress={() => handleSubmit()}><Text style={styles.submitText}>Edit Food Item</Text></TouchableOpacity>
          </Dialog.Content>
        </Dialog>
      </Portal>
      </Provider>
  )
}

const styles = StyleSheet.create({
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: "700",
    fontSize: 18
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
  headBx: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 15
  }
})
export default InputForm