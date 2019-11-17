import React from "react";
import { NavigationAction, NavigationDispatch } from "react-navigation";
import { NavigationStackProp } from "react-navigation-stack";

export class BaseScreen extends React.Component<BaseScreenProps> {

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

interface BaseScreenProps {
    navigation: NavigationStackProp,
}