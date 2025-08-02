import { AppTheme } from '@/src/constants/Colors'
import { StyleSheet} from 'react-native'


const useStyles = (theme:AppTheme) => StyleSheet.create({
    container:{
        paddingLeft:'5%',
        paddingTop:'5%'
    },
   
})

export default useStyles;