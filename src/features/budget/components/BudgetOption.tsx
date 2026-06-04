import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Pressable } from 'react-native'
import { scale } from '@/src/utils/scale'
import CustomText from '@/src/components/CustomText'
import { useTheme } from '@/src/hooks/ThemeContextProvider'
import { AppTheme } from '@/src/constants/Colors'
import { CustomIcon } from '@/src/components/CustomIcon'
import font from '@/src/constants/font'

type BudgetOptionProps={
    title:string;
    description:string;
    selected:boolean;
    pressed:()=>void;
}
const BudgetOption:React.FC<BudgetOptionProps> = ({title,description,selected,pressed}) => {
const {themePalette}=useTheme();
  const styles = useStyles(themePalette)
  return (
    <Pressable style={styles.container} onPress={()=>{pressed()}}>
      <View style={styles.checkbox}>
        {selected && <CustomIcon name='check' type='Feather' size={scale(26)} color={themePalette.switchOn} />}
      </View>
      <View style={styles.textContainer}>
        <CustomText variant="bold" size={font.size_24}>
          {title}
        </CustomText>
        <CustomText>
          {description}
        </CustomText>
      </View>
    </Pressable>
  )
}

export default BudgetOption

const useStyles =(theme:AppTheme)=> StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:scale(10),
        gap:scale(8),
        marginBottom:scale(50),
        borderWidth:scale(1),
        borderColor:theme.borderColor,
        borderRadius:scale(10),
        paddingVertical:scale(15),
    },
    textContainer:{
        flex:1,
        gap:scale(5),
        paddingHorizontal:scale(10),
        alignItems:'center',
        justifyContent:'center',
    },
    checkbox:{
        justifyContent:'center',
        alignItems:'center',
        width:scale(30),
        aspectRatio:1,
        backgroundColor:theme.switchOff,
        borderRadius:scale(6)
    }
})