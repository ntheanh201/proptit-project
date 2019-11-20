import React from "react";
import { NavigationAction, NavigationDispatch } from "react-navigation";
import { NavigationStackProp } from "react-navigation-stack";
import { AppState } from "../core"
import { types } from "@babel/core";


export class BaseScreen<P extends BaseScreenProps> extends React.Component<P> {

    navigate(routeID: string) {
        this.props.navigation.navigate(routeID);
    }

    pop() {
        this.props.navigation.pop();
    }

    replace(routeID: string) {
        this.props.navigation.replace(routeID);
    }

    popToRoot() {
        this.props.navigation.popToTop();
    }
}

export interface BaseScreenProps {
    navigation: NavigationStackProp,
}