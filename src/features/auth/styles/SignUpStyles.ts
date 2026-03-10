import { AppTheme } from '@/src/constants/Colors'
import { scale } from '@/src/utils/scale';
import { StyleSheet} from 'react-native'


const useStyles = (theme:AppTheme) => StyleSheet.create({
    container:{
        paddingTop:scale(20),
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        paddingBottom:scale(50)
    },
   
})

export default useStyles;