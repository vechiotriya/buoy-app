import { AppTheme } from '@/src/constants/Colors'
import { scale } from '@/src/utils/scale';
import { StyleSheet} from 'react-native'


const useStyles = (theme:AppTheme) => StyleSheet.create({
    container:{
        paddingTop:scale(20),
        flex:1,
        alignItems:'center',
    },
   
})

export default useStyles;