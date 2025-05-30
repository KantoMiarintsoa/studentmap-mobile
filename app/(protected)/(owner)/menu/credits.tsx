import BuyCredit from '@/components/payment/BuyCredit';
import Button from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { colors, size } from '@/const/const';
import { buyCreditSchema, BuyCreditSchema } from '@/schema/payment';
import { getMe, listPaymentMethods } from '@/services/api';
import { PaymentMethod } from '@/types/user';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

const Credits = () => {

  const [credits, setCredits] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);

  const {
    formState:{errors},
    ...form
  } = useForm<BuyCreditSchema>({
    resolver:zodResolver(buyCreditSchema),
    defaultValues:{
      credit:2
    }
  });

  const credit = form.watch("credit");

  const price = useMemo(()=>{
    return credit * 10;
  }, [credit]);

  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(()=>{
    async function fetchCredits(){
      try{
        setLoading(true);
        const response = await getMe();
        setCredits(response.serviceRemainders);
        const methods = await listPaymentMethods();
        setPaymentMethods(methods);
        setLoading(false);
      }
      catch(error){
        console.error("Error fetching credits:", error);
      }
      finally{
        setLoading(false);
      }
    }
    fetchCredits();
  }, []);

  return (
    <KeyboardAvoidingView 
      style={{flex:1, padding: 20, flexDirection:'column', gap:10}}
      behavior={Platform.OS==="ios"?"padding":"height"}
    >
      <Text style={{fontSize: 18, fontWeight: '500', marginBottom: 16}}>Vous avez: {credits} credits</Text>
      {/* buy credits */}
      <ScrollView
        style={{flex:1}}
      >
        <View
          style={{backgroundColor:"#fff", elevation:2, padding:10, borderRadius:10, flexDirection:'column', gap:10}}
        >
          <Text style={{fontSize:size.lg, fontWeight:500}}>Acheter des credits pour poster plus</Text>
          <Controller
            name='credit'
            control={form.control}
            render={({field:{onChange, onBlur, value}})=>(
              <View style={style.inputContainer}>
                <Text style={style.label}>Nombre de credits (1 credit/ 1$)</Text>
                <View style={{width:'100%', flexDirection:"row", gap:10, alignItems:'center'}}>
                  <Input
                    keyboardType='numeric'
                    onChangeText={(text) => {
                      const numericValue = parseFloat(text);
                      onChange(isNaN(numericValue) ? 0 : numericValue);
                    }}
                    onBlur={onBlur}
                    value={value.toString()}
                    style={{flex:1}}
                  />
                  <Text style={{fontSize:size.lg, fontWeight:500}}>${price}</Text>
                </View>
              </View>
            )}
          />
          <Button onPress={()=>setOpenModal(true)}>
            <Text style={{color:"#fff"}}>Acheter</Text>
          </Button>
        </View>
      </ScrollView>
      <Modal
        visible={openModal}
        onRequestClose={()=>setOpenModal(false)}
        animationType='slide'
        // transparent={true}
      >
        <BuyCredit
          credits={credit}
          paymentMethods={paymentMethods}
          onPaymentSuccess={(credits) => {
            setCredits(prev => prev + credits);
            setOpenModal(false);
          }}
        />
      </Modal>
    </KeyboardAvoidingView>
  )
}

export default Credits

const style = StyleSheet.create({
  inputContainer:{
    flexDirection:"column",
    gap:10,
    width:"100%"
  },
  label:{
    color:colors.secondaryColor, 
    fontWeight:500, 
    fontSize:size.md
  }
})