import { colors, size } from '@/const/const';
import { ConfirmPaymentSchema, confirmPaymentSchema } from '@/schema/payment';
import { buyCredits } from '@/services/api';
import { PaymentMethod } from '@/types/user';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import Button from '../ui/button';

type BuyCreditProps = {
    paymentMethods: PaymentMethod[];
    credits: number;
    onPaymentSuccess?: (credits: number) => void;
}

const BuyCredit = ({paymentMethods, credits, onPaymentSuccess}:BuyCreditProps) => {

    const {
        formState: { isValid, isSubmitting },
        ...form
    } = useForm<ConfirmPaymentSchema>({
        resolver: zodResolver(confirmPaymentSchema),
        defaultValues: {
            credits: credits
        }
    });

    useEffect(()=>{
        form.reset({
            credits: credits
        });
    }, [credits]);

    const handlePayment = async (data:ConfirmPaymentSchema)=>{
        try{
            const response = await buyCredits(data);
            Toast.show({
                type:'success',
                text1: 'Achat réussi',
                text2: `Vous avez acheté ${data.credits} crédits avec succès.`
            })
            onPaymentSuccess?.(data.credits);
        }
        catch(error){
            console.error("Error processing payment:", error);
        }
    }

  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center', flexDirection:"column", gap:10, padding:20}}>
      <Text style={{fontSize:size.lg, fontWeight:500}}>Choisisser un moyen de paiement</Text>
      <Controller
        name='paymentMethod'
        control={form.control}
        render={({field:{value}})=>(
            <View style={{flexDirection:"column", borderColor:colors.lightGray, borderWidth:1, borderRadius:8, backgroundColor:"#fff", width:"100%"}}>
                {paymentMethods.map(method=>(
                    <TouchableOpacity  
                        key={method.id} 
                        onPress={()=>form.setValue("paymentMethod", method.id)}
                        style={{width:"100%", padding:16, backgroundColor:value === method.id ? colors.lightGray : "transparent"}}
                    >
                        <Text style={styles.brand}>{method.card.brand.toUpperCase()}</Text>
                        <Text>**** **** **** {method.card.last4}</Text>
                        <Text>
                            Exp: {method.card.exp_month}/{method.card.exp_year}
                        </Text>
                        {/* <Text>{method.id}</Text> */}
                    </TouchableOpacity>
                ))}
            </View>
        )}
      />
      <Button
        style={{width:"100%"}}
        disabled={isSubmitting || paymentMethods.length === 0}
        onPress={form.handleSubmit(handlePayment)}
      >
        {isSubmitting && <ActivityIndicator color={"#fff"} size={"small"}/>}
        <Text style={{color:"#fff", fontSize:size.md}}>Acheter {credits} crédits ({credits * 10}$)</Text>
      </Button>
    </View>
  )
}

export default BuyCredit

const styles = StyleSheet.create({
    brand: {
        fontWeight: 'bold',
        marginBottom: 4,
    }
})