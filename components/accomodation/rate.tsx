import { reviewAccommodation } from '@/services/api';
import { Accomodation } from '@/types/accomodation';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Text, View } from 'react-native';
import Button from '../ui/button';
import { Input } from '../ui/input';
import Stars from '../ui/stars';

const RateView = ({accommodation, onClose, onSuccess}:{accommodation:Accomodation, onClose:()=>void, onSuccess?:(newRating:number)=>void}) => {
    const [rate, setRate] = useState(4);
    const [inputText, setInputText] = useState('4');
    const {t} = useTranslation();
    const [error, setError] =  useState<string|undefined>();
    const [loading, setLoading] = useState(false)

    const sendRating = async ()=>{
        if(rate>5 || rate <0){
            setError(t("accommodation.errorRating"));
            return;
        }
        try{
            setLoading(true);
            const response = await reviewAccommodation(accommodation.id, rate);
            onSuccess?.(response.rating);
        }
        catch(error){
            console.log(error)
        }
        finally{
            setLoading(false)
        }
        onClose();
    }

    const handleChange = (text: string) => {
        setInputText(text);

        if (text === '') {
            // Allow clearing the input without setting a rate
            return;
        }

        const parsed = parseFloat(text);
        if (!isNaN(parsed)) {
            const rounded = Math.round(parsed * 2) / 2;
            setRate(rounded);
        }
    };

  return (
    <View style={{flexDirection:"column", gap:10, margin:"auto", width:300, alignItems:'center'}}>
      <Input
        value={inputText}
        keyboardType='numeric'
        onChangeText={handleChange}
        style={{width:"100%"}}
      />
      <Stars maxStars={5} rating={rate}/>
      <View style={{flexDirection:"row", gap:10, width:"100%"}}>
            <Button style={{flex:1}} disabled={loading} onPress={()=>sendRating()}>
                {loading && (<ActivityIndicator size={"small"} color={"#fff"}/>)}
                <Text style={{color:"#fff"}}>{t("accommodation.note")}</Text>
            </Button>
            <Button variants='outline' onPress={()=>onClose()} style={{flex:1}} >
                <Text>{t("global.cancel")}</Text>
            </Button>
      </View>
    </View>
  )
}

export default RateView