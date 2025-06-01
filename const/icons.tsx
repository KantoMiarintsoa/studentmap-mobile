import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';

export const icons = {
    index:(props:any)=><Feather name='home' size={24} color={'#222'} {...props}/>,
    "(home)":(props:any)=><Feather name='home' size={24} color={'#222'} {...props}/>,
    post:(props:any)=><Ionicons name="add-circle" size={24} color="#222" {...props}/>,
    menu:(props:any)=><Ionicons name="menu-outline" size={24} color="#222" {...props}/>,
    "(search)":(props:any)=><FontAwesome6 name="magnifying-glass" size={24} color="#222" {...props}/>
  }