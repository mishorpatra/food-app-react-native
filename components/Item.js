import * as React from 'react'
import { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { IconButton } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { deleteItem } from '../redux/Items'

//components

const Item = ({item, setVisibleEdit, setId}) => {


  const dispatch = useDispatch()
  const handleDelete = () => {
    dispatch(deleteItem({id: item.id}))
  }
  const handleEdit = () => {
    setId(item.id)
    setVisibleEdit(true)
  }
  return (
    <>
    <View style={styles.component}>
      <View style={styles.nameBx}>
        <TouchableOpacity>
          <IconButton icon='drag' color='#787878' size={20}></IconButton>
        </TouchableOpacity>
        <Text style={styles.name}>{item.name}</Text>
      </View>
      <View style={[styles.nameBx, {marginLeft: 'auto', marginRight: 15}]}>
        <Text style={styles.price}>Price:</Text>
        <Text style={styles.priceTag}>₹ {item.price} </Text>
      </View>
      <View style={[styles.toolBx, styles.nameBx]}>
        <TouchableOpacity >
          <IconButton onPress={() => handleEdit(item.id)} icon='pencil-outline' color='#787878'  size={20}></IconButton>
        </TouchableOpacity>
        <TouchableOpacity >
          <IconButton onPress={() => handleDelete()} icon='delete-outline' color='#787878' size={20}></IconButton>
        </TouchableOpacity>
      </View>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  component: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderColor: '#ddd',
    borderWidth: 1,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 7
  },
  nameBx: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  toolBx: {
    borderLeftColor: '#ddd',
    borderLeftWidth: 1,
  },
  price: {
    color: '#aaa',
    marginRight: 10
  },
  priceTag: {
    fontWeight: "600"
  },
  name: {
    fontWeight: "700"
  }
})


export default Item