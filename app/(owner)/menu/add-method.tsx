import Button, { GoBackButton } from '@/components/ui/button'
import { size } from '@/const/const'
import { setupIntentApi } from '@/services/api'
import { CardField, useStripe } from '@stripe/stripe-react-native'
import { Details } from '@stripe/stripe-react-native/lib/typescript/src/types/components/CardFieldInput'
import React, { useState } from 'react'
import { ActivityIndicator, Alert, ScrollView, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'

const AddMethod = () => {

    const {confirmSetupIntent } = useStripe();
    const [cardDetails, setCardDetails] = useState<Details|null>(null);
    const [loading, setLoading] = useState(false);

    const handleAdd = async ()=>{
        if(!cardDetails?.complete){
            Alert.alert(
                'Erreur',
                'Veuillez remplir tous les champs de la carte.',
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
                    'Impossible de créer la méthode de paiement. Veuillez réessayer plus tard.',
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
                    text1:"Méthode de paiement ajoutée",
                    text2:"Votre méthode de paiement a été ajoutée avec succès."
                });
            }
        }
        catch(error){
            console.log(error);
            Alert.alert(
                'Erreur',
                'Une erreur est survenue lors de l\'ajout de la méthode de paiement. Veuillez réessayer plus tard.',
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
        <Text style={{fontSize:size.xl, marginHorizontal:"auto"}}>Ajouter une carte</Text>
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
                <Text style={{color:"#fff"}}>Ajouter</Text>
            </Button>
        </ScrollView>
    </SafeAreaView>
  )
}

export default AddMethod