import React from "react";
import { SafeAreaView, View, Text, Image } from "react-native";
import { Container, Col, Content } from "native-base";
import ButtonWithIcon from "./ButtonWithIcon";
import { GroupState, AppState, GroupAction } from "../core";
import { bindActionCreators, Dispatch} from "redux";
import { groupAction } from "../core/actions";
import { connect } from "react-redux";
import { logD } from "../common/LogTool";
import { DrawerContentComponentProps } from "react-navigation-drawer";

class MenuHomeSideBar extends React.Component<MenuHomeSideBarProps> {

    constructor(props: MenuHomeSideBarProps) {
        super(props);
    }

    componentDidMount() {
        this.props.getGroups("admin");
        logD("AppLog", this.props.groupState?.groups);
    }

    render() {
        return (
            <Container>
                <Content>
                    <View style={{ paddingLeft: 20, paddingTop: 10 }}>
                        <Image source={require('../data/images/ic_app.png')} style={{ width: 50, height: 50, borderRadius: 50 }} />
                        <Text style={{ fontSize: 15, color: 'rgb(0, 0, 0)', fontWeight: 'bold', marginTop: 10 }}>icongkhanh</Text>
                        <Text>Thành viên</Text>
                    </View>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: 'gray', marginTop: 20 }} />
                    <ButtonWithIcon name="users" text="Nhóm" />
                    <ButtonWithIcon name="cog" text="Cài đặt" />
                    <ButtonWithIcon name="sign-out" colorIcon="red" text="Đăng xuất" />
                </Content>
            </Container>
        );

    }
}

interface MenuHomeSideBarProps extends DrawerContentComponentProps{
    groupState?: GroupState,
    getGroups?: typeof groupAction.getGroups
}

const mapStateToProps = (state: AppState) => ({
    groupState: state.group
});

const mapDispatchToProps = (dispatch: Dispatch<GroupAction>) => bindActionCreators(groupAction, dispatch);

export default connect(mapStateToProps, mapDispatchToProps) (MenuHomeSideBar)