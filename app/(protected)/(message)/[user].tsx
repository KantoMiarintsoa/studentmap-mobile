import MessageItem from '@/components/mesage/MessageItem';
import { useSocket } from '@/components/providers/SocketProvider';
import Avatar from '@/components/ui/avatar';
import Button from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { colors, size } from '@/const/const';
import { normalizeUrl } from '@/libs/utils';
import { getConversation, getUserDetails } from '@/services/api';
import { useChatStore } from '@/store/store';
import { User } from '@/types/user';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useHeaderHeight } from '@react-navigation/elements';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ChatScreen = () => {

    const router = useRouter();
    const { user:id } = useLocalSearchParams<{
        user:string
    }>();
    const {users, addUsers, unreadMessages, addMessages, setUnreadMessage, conversations} = useChatStore();
    const [user, setUser]=useState<User|undefined>(()=>{
        return users.find(u=>u.id===parseInt(id))
    });

    const [loadingMessage, setLoadingMessage] = useState(false);
    const [keyboardAvoidingViewKey, setKeyboardAvoidingViewKey] = useState<string>("keyboardAvoidingViewKey");

    const inputRef = useRef<TextInput>(null)
    const [content, setContent] = useState<string>("");

    const userId = useMemo(()=>parseInt(id), [id]);
    const activeConversation = useChatStore(state => state.conversations[userId]);

    const {socket} = useSocket();

    // useEffect(()=>{

    //     function onKeyboardHide(){
    //         setKeyboardAvoidingViewKey("keyboardAvoidingViewKey"+new Date().getTime());
    //     }

    //     const keyboardHideListener = Keyboard.addListener(
    //         Platform.OS === 'android' 
    //             ? 'keyboardDidHide'
    //             : 'keyboardWillHide', 
    //             onKeyboardHide
    //     );

    //     return ()=>{
    //         keyboardHideListener.remove();
    //     }

    // }, [])
    
    useEffect(()=>{
        if(user) return;

        async function fetchUserData(){
            try{
                const response = await getUserDetails(userId);
                addUsers(
                    [response]
                );
                setUser(response);
            }
            catch(error){
                console.log(error)
            }
        }
        fetchUserData();
    }, [userId]);

    useEffect(()=>{
        // there are messages that are cached
        if(activeConversation)return;

        async function fetchMessage(){
            try{
                setLoadingMessage(true);
                const response = await getConversation(parseInt(id));
                addMessages(userId, response);
            }
            catch(error){
                console.log(error)
            }
            finally{
                setLoadingMessage(false);
            }
        }
        fetchMessage();
    }, [activeConversation]);

    useEffect(()=>{
        if(!socket) return;

        handleViewMessage();
        
    }, [user, socket, activeConversation])

    const handleSendMessage = ()=>{
        if(!socket || !inputRef || content.trim()==="")return;
        socket.emit("sendMessage", {
            content,
            receiverId:userId
        });
        inputRef.current?.clear();
    }

    const text = useMemo(()=>{
        if(unreadMessages<0)return '';

        if(unreadMessages>9) return '9+';

        return unreadMessages;

    }, [unreadMessages]);

    const handleViewMessage = ()=>{
        if(!socket || !activeConversation) return;

        // check last image 
        // in our case, it's the first element in the array
        const lastMessage = activeConversation[0];

        // console.log(lastMessage);

        if(!lastMessage) return;

        if(
            lastMessage.receiverId===userId ||
            (lastMessage.senderId===userId && lastMessage.isRead)
        )
            return;

        // decrement mannualy by one to optimize
        setUnreadMessage(unreadMessages-1);

        socket.emit("viewMessage", {
            receiverId:userId
        });
    }
    const headerHeight = useHeaderHeight();

  return (
    <SafeAreaView style={{
        flex:1,
        flexDirection:"column",
    }}>
        {/* header */}
        <View style={{
                width:"100%", 
                padding:10, 
                flexDirection:"row", 
                gap:10, 
                alignItems:'center'
            }}>
            <TouchableOpacity
                onPress={()=>router.back()}
            >
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <MaterialIcons name="keyboard-arrow-left" size={40} color={colors.secondaryColor} />
                    <View style={{
                        width:20, 
                        height:20, 
                        backgroundColor:colors.primaryColor, 
                        marginLeft:-15,
                        borderRadius:10,
                        padding:'auto',
                        justifyContent:'center',
                        alignItems:'center'
                    }}
                    >
                        <Text style={{color:"#fff"}}>{text}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            {!user?(
                // skeleton later
                <></>
            ):(
                <>
                    <Avatar
                        name={`${user.firstName} ${user.lastName}`}
                        size={30}
                        {...(user.profilePicture && {image:{uri:normalizeUrl(user.profilePicture)}})}
                    />
                    <Text style={{fontWeight:600, color:colors.secondaryColor, fontSize:size.lg}}>{user.firstName} {user.lastName}</Text>
                </>
            )}
            
        </View>
        <KeyboardAvoidingView
            style={{flex:1}}
            keyboardVerticalOffset={0}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            enabled
        >
            {
                loadingMessage ? (
                    <ActivityIndicator size={"large"} color={colors.primaryColor} style={{
                        margin:"auto"
                    }}/>
                ):(
                    <FlatList
                        data={activeConversation}
                        keyExtractor={(message, index)=>`${message.id}_${index}`}
                        renderItem={({item})=>(
                            <MessageItem message={item} key={item.id}/>
                        )}
                        contentContainerStyle={{
                            gap:10,
                            padding:10
                        }}
                        inverted
                        style={{flex:1}}
                    />
                )
            }
            <View style={{
                flexDirection:"row",
                padding:10,
                width:"100%",
                alignItems:'center',
                gap:5
            }}>
                <Input
                    style={{
                        borderRadius:40,
                        flex:1,
                        height:40,
                        fontSize:size.md
                    }}
                    onChangeText={text=>setContent(text)}
                    ref={inputRef}
                    onFocus={()=>{
                        handleViewMessage()
                    }}
                />
                <Button variants='link'
                    onPress={()=>handleSendMessage()}
                >
                    <Ionicons name="send-sharp" size={24} color={colors.primaryColor} />
                </Button>
            </View>
        </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default ChatScreen
