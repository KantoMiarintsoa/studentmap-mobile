import { colors, size } from '@/const/const'
import { useMeStore } from '@/store/store'
import { Message } from '@/types/message'
import React, { useMemo } from 'react'
import { Pressable, Text } from 'react-native'

const MessageItem = ({message}:{message:Message}) => {
  const {details} = useMeStore();

  const isSender = useMemo(()=>details.id===message.senderId, [details, message]);
  return (
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
  )
}

export default MessageItem