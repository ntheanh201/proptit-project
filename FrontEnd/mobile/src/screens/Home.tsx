import { BaseScreen, BaseScreenProps } from "./BaseScreen";
import React from "react";
import { Container, Header, Body, Title, Button, Left, Icon, Right} from "native-base";
import colors from "../values/colors";
import { connect } from "react-redux";
import { homeAction } from "../core/actions"
import { bindActionCreators, Dispatch } from "redux";
import { logD } from "../common/LogTool";
import { HomeState, getNewFeeds, AppState, HomeAction } from "../core";

interface HomeScreenProps extends BaseScreenProps {
    homeState: HomeState,
    getNewFeeds: typeof homeAction.getNewFeeds
}

class Home extends BaseScreen<HomeScreenProps> {

    componentDidMount() {
        this.props.getNewFeeds("ok");
    }

    render() {
        const {currentNewFeed} = this.props.homeState;
        logD("AppLog-LoadNewFeed", currentNewFeed);
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Title></Title>
                    </Body>
                    <Right>
                    </Right>
                </Header>
            </Container>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    homeState: state.home
});
  
const mapDispatchToProps = (dispatch: Dispatch<HomeAction>) => bindActionCreators(homeAction, dispatch);
  
export default connect(mapStateToProps, mapDispatchToProps)(Home);

