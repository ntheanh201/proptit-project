import { BaseScreen, BaseScreenProps } from "./BaseScreen"
import HomeNavigator from '../navigations/HomeNavigator'
import React from "react"
import MainNavigator from "../navigations/MainNavigator"
import { SignInState, AppState } from "../core"
import { connect } from "react-redux"

interface HomeScreenProps extends BaseScreenProps {
    signInState: SignInState
}

class Home extends BaseScreen<HomeScreenProps> {

    componentDidUpdate() {
        this.props.signInState.isSignOut? this.navigate("SignIn") : null;
    }

    render() {
        return (
            <HomeNavigator />
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    signInState: state.signin
})

export default connect(mapStateToProps) (Home);