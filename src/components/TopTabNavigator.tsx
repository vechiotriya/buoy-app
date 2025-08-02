import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, {useState } from 'react'
import { useTheme } from '../hooks/ThemeContextProvider'
import CustomText from './CustomText'
import { AppTheme } from '../constants/Colors'
import { NavigationTabs } from '../types/TabNavigatorTypes'

const TopTabNavigator = ({menuHeaders}:{menuHeaders: NavigationTabs}) => {
    const { themePalette } = useTheme();
    const styles = useStyles(themePalette);
    const [currentTab, setCurrentTab] = useState(menuHeaders.at(0)?.tabHeading);  
    const SelectedComponent = menuHeaders.find((elem) => elem.tabHeading === currentTab)?.component;

    return (
        <View>
            <View style={styles.container}>
                {menuHeaders.map((elem) => (
                    <TouchableOpacity
                        key={elem.tabHeading}
                        style={[styles.tabButton,currentTab==elem.tabHeading && {backgroundColor: themePalette.primary}]}
                        onPress={() => setCurrentTab(elem.tabHeading)}
                    >
                        <CustomText color={currentTab==elem.tabHeading?themePalette.text:themePalette.tabIconDefault}>{elem.tabHeading}</CustomText>
                    </TouchableOpacity>
                ))}
            </View>
            {SelectedComponent ? <SelectedComponent /> : null}
        </View>
    );
}

export default TopTabNavigator

const useStyles =(theme:AppTheme)=>StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:theme.background,
        justifyContent:'space-between',
        padding: 4,
        marginHorizontal:'4%',
        borderRadius:16
    },
    tabButton: {
        borderRadius: 8,
        paddingHorizontal:'17%',
        paddingVertical:13
    },
})