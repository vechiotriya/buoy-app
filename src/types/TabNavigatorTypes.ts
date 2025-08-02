import { ReactElement } from "react"

export type NavigationTabs = Array<NavigationTab>

type NavigationTab =
    {
        tabHeading: string,
        component: ()=> ReactElement
    }