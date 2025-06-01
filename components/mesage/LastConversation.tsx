import { colors, size } from '@/const/const'
import { LastConversation } from '@/types/message'
import AntDesign from '@expo/vector-icons/AntDesign'
import { useRouter } from 'expo-router'
import React from 'react'
import { Text, TouchableHighlight, View } from 'react-native'
import Avatar from '../ui/avatar'

type LastConversationProps = {
    conversation:LastConversation
}

const LastConversationComponennt = ({conversation}:LastConversationProps) => {

    const router = useRouter();

  return (
    <TouchableHighlight
        underlayColor={colors.lightGray}
        style={{
            width:"100%",
            borderRadius:size.lg
        }}
        onPress={()=>router.push(`/(protected)/(message)/${conversation.user.id}`)}
    >
        <View style={{
                flexDirection:"row",
                padding:10,
                alignItems:"center",
                gap:10,
                width:"100%",
                paddingLeft:0
            }}
        >
            <Avatar
                name={`${conversation.user.firstName} ${conversation.user.lastName}`}
                {...(conversation.user.profilePicture && {image:{uri:conversation.user.profilePicture}})}
                size={70}
            />

            <View style={{
                flex:1,
                flexDirection:'column'
            }}>
                <Text style={{
                    fontWeight:600,
                    fontSize:size.lg
                }}>{conversation.user.firstName} {conversation.user.lastName}</Text>
                <Text style={{
                    color:colors.secondaryColor, 
                    fontWeight:(!conversation.isSender && !conversation.isRead)?700:200
                }}>{conversation.content}</Text>
            </View>
            {(conversation.isSender && conversation.isRead) && (
                <Avatar
                    size={17}
                    {...(conversation.user.profilePicture && {image:{uri:conversation.user.profilePicture}})}
                    name={`${conversation.user.firstName} ${conversation.user.lastName}`}
                />
            )}
            {(conversation.isSender && !conversation.isRead) && (
                <AntDesign name="checkcircleo" size={15} color={colors.secondaryColor} />
            )}
        </View>
    </TouchableHighlight>
  )
}

export default LastConversationComponennt