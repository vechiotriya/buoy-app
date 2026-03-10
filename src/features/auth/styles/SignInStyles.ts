import { AppTheme } from '@/src/constants/Colors'
import { scale } from '@/src/utils/scale';
import { StyleSheet} from 'react-native'


const useStyles = (theme:AppTheme) => StyleSheet.create({
    container:{
        paddingTop:scale(20),
        flex:1,
        flexDirection:'column',
        alignItems:'center',
    },
    forgotText:{
    alignItems:'flex-end',
    marginRight:scale(20)
    },
    footerContainer:{
        flexDirection:'row',
        columnGap:scale(12),
        justifyContent:'center',
        marginTop:scale(30)
    }
})

export default useStyles;