import { useAuth } from '@/components/providers/AuthProvider';
import Avatar from '@/components/ui/avatar';
import Button from '@/components/ui/button';
import { colors, size } from '@/const/const';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Menu = () => {

  const {session, updateSession} = useAuth();

  if(!session)
    return null;

  const {user} = session;
  const router = useRouter();

  const logOut = async ()=>{
    await updateSession(undefined);
    router.push("/login");
  }

  return (
    <SafeAreaView style={{
      flex:1,
      padding:20
    }}>
      <Text style={{fontWeight:600, fontSize:size['2xl']}}>Gerer votre espace</Text>
      <ScrollView style={{flex:1}}>
        <View style={style.menu}>
          <TouchableOpacity style={style.menuItem} onPress={()=>router.push("/(owner)/menu/profile")}>
            <View style={style.menuItemRight}>
              <Avatar name={`${user.firstName} ${user.lastName}`} image={{uri:"https://picsum.photos/200"}}/>
              <Text style={{color:colors.secondaryColor, fontWeight:600}}>{`${user.firstName} ${user.lastName}`}</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={24} color={colors.secondaryColor} />
          </TouchableOpacity>
          <View style={{width:'100%', height:1, backgroundColor:colors.lightGray, marginVertical:10}}/>
          <TouchableOpacity style={style.menuItem}>
            <View style={style.menuItemRight}>
              <MaterialCommunityIcons name="security" size={24} color={colors.secondaryColor} />
              <Text style={{color:colors.secondaryColor, fontWeight:600}}>Securité</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={24} color={colors.secondaryColor} />
          </TouchableOpacity>
          <TouchableOpacity style={style.menuItem}>
            <View style={style.menuItemRight}>
              <Entypo name="credit-card" size={24} color={colors.secondaryColor}/>
              <Text style={{color:colors.secondaryColor, fontWeight:600}}>Mes paiements</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={24} color={colors.secondaryColor} />
          </TouchableOpacity>
          <Button style={{width:"100%"}} onPress={()=>logOut()}>
            <Text style={{color:"#fff", fontSize:size.md }}>Se deconnecter</Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Menu

const style = StyleSheet.create({
  menu:{
    flexDirection:"column",
    gap:20,
    width:"100%",
    marginTop:30
  },
  menuItem:{
    flexDirection:"row",
    justifyContent:"space-between",
    paddingVertical:8,
    paddingHorizontal:12,
    borderRadius:size.lg,
    backgroundColor:"#fff",
    width:"100%",
    alignItems:"center",
    height:60
  },
  menuItemRight:{
    flexDirection:"row",
    gap:10,
    alignItems:"center"
  }
})