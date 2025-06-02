import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { View } from 'react-native';

const Stars = ({maxStars, rating}:{maxStars:number, rating:number}) => {

    const stars = [];

    for (let i = 1; i <= maxStars; i++) {
        let iconName:"star"|"star-half-empty" = 'star';
        if (i <= rating) {
            iconName = 'star';
        } else if (i - 0.5 === rating) {
            iconName = 'star-half-empty';
        }

        stars.push(
            <FontAwesome
                key={i}
                name={iconName}
                size={24}
                color={"#f0e513"}
            />
            );
    }

  return (
    <View style={{flexDirection:"row"}}>
        {stars}
    </View>
  )
}

export default Stars