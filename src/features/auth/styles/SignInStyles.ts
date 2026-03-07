import { AppTheme } from '@/src/constants/Colors'
import { scale } from '@/src/utils/scale';
import { StyleSheet} from 'react-native'


const useStyles = (theme:AppTheme) => StyleSheet.create({
    container:{
        paddingLeft:scale(20),
        paddingTop:scale(20)
    },
    forgotText:{
    alignItems:'flex-end',
    marginRight:scale(20)
    },
    footerContainer:{
        flexDirection:'row',
        columnGap:scale(12),
        justifyContent:'center',
        marginTop:scale(50)
    }
})

export default useStyles;