import BillingMethod from '@/components/payment/BillingMethod'
import Button from '@/components/ui/button'
import { colors } from '@/const/const'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const billingMethods = [
  {
    id: 'pm_1',
    brand: 'Visa',
    last4: '4242',
    exp_month: 12,
    exp_year: 2026,
  },
  {
    id: 'pm_2',
    brand: 'Mastercard',
    last4: '4444',
    exp_month: 8,
    exp_year: 2025,
  },
  // Add more methods as needed
]

const Payments = () => {
  return (
    <SafeAreaView style={{flex:1, padding: 20, flexDirection:'column', gap:10}}>
        <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:'center'}}>
            <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 16}}>Mode de paiements</Text>
            <Button variants='primary' style={{borderColor:colors.primaryColor, borderRadius:0, alignItems:"center"}}>
                <FontAwesome6 name="add" size={20} color="#fff" />     
                <Text style={{color:"#fff"}}>Ajouter</Text>
            </Button>
        </View>
        <ScrollView>
            <View style={{flexDirection:"column", borderColor:colors.lightGray, borderWidth:1, borderRadius:8, backgroundColor:"#fff"}}>
            {billingMethods.map(method => (
            <BillingMethod key={method.id} method={method} />
            ))}
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default Payments