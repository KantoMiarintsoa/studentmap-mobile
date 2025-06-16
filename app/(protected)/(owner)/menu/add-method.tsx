import Button, { GoBackButton } from '@/components/ui/button'
import { size } from '@/const/const'
import { setupIntentApi } from '@/services/api'
import { CardField, useStripe } from '@stripe/stripe-react-native'
import { Details } from '@stripe/stripe-react-native/lib/typescript/src/types/components/CardFieldInput'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator, Alert, ScrollView, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'

const AddMethod = () => {

    const {confirmSetupIntent } = useStripe();
    const [cardDetails, setCardDetails] = useState<Details|null>(null);
    const [loading, setLoading] = useState(false);
    const {t} = useTranslation();

    const handleAdd = async ()=>{
        if(!cardDetails?.complete){
            Alert.alert(
                'Erreur',
                t("payment.fillFields"),
                [{ text: 'OK' }]
            );
        }

        try{
            setLoading(true);
            const {clientSecret} = await setupIntentApi();
            console.log("Client Secret: ", clientSecret);
            if(!clientSecret){
                Alert.alert(
                    'Erreur',
                    t("payment.error"),
                    [{ text: 'OK' }]
                );
                setLoading(false);
                return;
            }
            const {error} = await confirmSetupIntent(clientSecret, {
                paymentMethodType: 'Card'
            });

            if(!error){
                Toast.show({
                    type:"success",
                    text1:t("payment.paymentMethodAdded"),
                    text2:t("payment.success")
                });
            }
        }
        catch(error){
            console.log(error);
            Alert.alert(
                'Erreur',
                t("payment.uknownerror"),
                [{ text: 'OK' }]
            );
        }
        finally{
            setLoading(false);
        }
    }

  return (
    <SafeAreaView style={{flex:1, padding:20, flexDirection:"column", gap:10}}>
        <GoBackButton/>
        <Text style={{fontSize:size.xl, marginHorizontal:"auto"}}>{t("payment.addCard")}</Text>
        <ScrollView style={{flex:1, gap:10}}>
            <CardField
                postalCodeEnabled={false}
                placeholders={{ number: '4242 4242 4242 4242' }}
                // cardStyle={{backgroundColor:"red"}}
                style={{ height: 50, marginVertical: 30, flexDirection:"column" }}
                onCardChange={card => setCardDetails(card)}
            />
            <Button disabled={!cardDetails?.complete || loading}
                onPress={()=>handleAdd()}
            >
                {loading && <ActivityIndicator size="small" color="#fff" />}
                <Text style={{color:"#fff"}}>{t("payment.add")}</Text>
            </Button>
        </ScrollView>
    </SafeAreaView>
  )
}

export default AddMethod