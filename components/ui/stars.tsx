import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { ReactNode, useEffect, useState } from 'react';
import { View } from 'react-native';

const Stars = ({ maxStars, rating }: { maxStars: number; rating: number }) => {
  const [stars, setStars] = useState<ReactNode[]>([]);

  useEffect(() => {
    const temp: ReactNode[] = [];

    for (let i = 1; i <= maxStars; i++) {
      let iconName: 'star' | 'star-half-empty' | 'star-o' = 'star-o';

      if (i <= rating) {
        iconName = 'star'; // Full star
      } else if (i - 0.5 <= rating) {
        iconName = 'star-half-empty'; // Half star
      }

      temp.push(
        <FontAwesome
          key={i}
          name={iconName}
          size={24}
          color="#f0e513"
        />
      );
    }

    setStars(temp);
  }, [rating, maxStars]);

  return <View style={{ flexDirection: 'row' }}>{stars}</View>;
};

export default Stars;
