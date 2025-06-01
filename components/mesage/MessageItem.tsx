import { colors, size } from '@/const/const'
import { useChatStore, useMeStore } from '@/store/store'
import { Message } from '@/types/message'
import AntDesign from '@expo/vector-icons/AntDesign'
import React, { useMemo } from 'react'
import { Pressable, Text, View } from 'react-native'
import Avatar from '../ui/avatar'

const MessageItem = ({message}:{message:Message}) => {
  const {details} = useMeStore();

  const isSender = useMemo(()=>details.id===message.senderId, [details, message]);
  const user = useMemo(()=>isSender?message.receiver:message.sender, [isSender]);
  const lastMessageState = useChatStore(state=>state.lastMessageState[user.id]);

  return (
    <View
      style={{
        flexDirection:"column",
        // gap:5,
        alignItems:"flex-end"
      }}
    >
      <Pressable
        onLongPress={()=>console.log("pressed")}
        style={{
          maxWidth:"80%",
          alignSelf:isSender?"flex-end":"flex-start",
          backgroundColor:isSender?colors.primaryColor:colors.lightGray,
          paddingHorizontal:15,
          paddingVertical:10,
          borderRadius:size.md
        }}
      >
        {/* check message type */}
        {message.messageType==="TEXT" && (
          <Text style={{
            color:isSender?"#fff":colors.secondaryColor
          }}>
            {message.content}
          </Text>
        )}
      </Pressable>
      {lastMessageState===message.id && (
        <>
          {
            (isSender && !message.isRead) && (
              <AntDesign name="checkcircleo" size={15} color={colors.primaryColor} />
            )
          }
          {
            (isSender && message.isRead) && (
              <Avatar
                  size={17}
                  {...(user.profilePicture && {image:{uri:user.profilePicture}})}
                  name={`${user.firstName} ${user.lastName}`}
              />
            ) 
          }
        </>
      )}
    </View>
  )
}

export default MessageItem