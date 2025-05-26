import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

type BillingMethod = {
  id: string
  brand: string
  last4: string
  exp_month: number
  exp_year: number
} 

type Props = {
  method: BillingMethod
}

const BillingMethod = ({method}:Props) => {
  return (
    <View style={styles.card}>
    <Text style={styles.brand}>{method.brand.toUpperCase()}</Text>
    <Text>**** **** **** {method.last4}</Text>
    <Text>
      Exp: {method.exp_month}/{method.exp_year}
    </Text>
  </View>
  )
}

export default BillingMethod

const styles = StyleSheet.create({
  card: {
    padding: 16,
  },
  brand: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
})