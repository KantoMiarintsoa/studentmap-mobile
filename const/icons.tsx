import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';

export const icons = {
    home:(props:any)=><Feather name='home' size={24} color={'#222'} {...props}/>,
    post:(props:any)=><Ionicons name="add-circle" size={24} color="#222" {...props}/>,
    profile:(props:any)=><Ionicons name="menu-outline" size={24} color="#222" {...props}/>
  }