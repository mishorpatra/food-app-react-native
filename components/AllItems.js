import * as React from 'react'
import { Text, View } from 'react-native'
import { useSelector } from 'react-redux'

const AllItems = () => {

  const foodItems = useSelector(state => state.items.value)
  
  return (
    <View>
      <Text>{JSON.stringify(foodItems, null, 2)}</Text>
    </View>
  )
}

export default AllItems