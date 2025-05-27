import { size } from '@/const/const'
import { removePaymentMethod } from '@/services/api'
import React, { useState } from 'react'
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native'
import Toast from 'react-native-toast-message'
import Button from '../ui/button'

type BillingMethod = {
  id: string
  brand: string
  last4: string
  exp_month: number
  exp_year: number
} 

type Props = {
  method: BillingMethod,
  showDelete?: boolean,
  onDelete?: (id: string) => void
}

const BillingMethod = ({method, showDelete=true, onDelete}:Props) => {

    const [loading, setLoading] = useState<boolean>(false);

    const handleDeletePaymentMethod = async()=>{
        try{
            setLoading(true)
            await removePaymentMethod(method.id);
            Toast.show({
                type:"success",
                text1:"Mode de paiement supprimé",
                text2:"Votre mode de paiement a été supprimé avec succès."
            });
            onDelete?.(method.id);
        }
        catch(error){
            console.error("Error deleting payment method:", error);
            Alert.alert("Erreur", "Une erreur est survenue lors de la suppression du mode de paiement.");
        }
        finally{
            setLoading(false);
        }
    }

  return (
    <View style={styles.card}>
        <View style={{flex:1, flexDirection:"column"}}>
            <Text style={styles.brand}>{method.brand.toUpperCase()}</Text>
            <Text>**** **** **** {method.last4}</Text>
            <Text>
            Exp: {method.exp_month}/{method.exp_year}
            </Text>
        </View>
        {
            showDelete && (
                <Button variants='link'
                    onPress={handleDeletePaymentMethod}
                    disabled={loading}
                    style={{flexDirection:"row", justifyContent:"center", alignItems:'center'}}
                >
                    {loading && <ActivityIndicator size="small" color="red" />}
                    <Text style={{color:"red", fontWeight:"bold", fontSize:size.sm}}>Supprimer</Text>
                </Button>
            )
        }
  </View>
  )
}

export default BillingMethod

const styles = StyleSheet.create({
  card: {
    padding: 16,
    flexDirection:'row',
    alignItems:"center"
  },
  brand: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
})