import React from "react"
import {
    StyleSheet,
    View,
    LayoutAnimation,
    StyleProp,
    ViewStyle,
} from 'react-native'

interface ProgressBarClassicProps {
    progress: number,
    style?: StyleProp<ViewStyle>
}

interface ProgressBarClassicState {
    progress: number
    init_animation: boolean
}

export default class ProgressBarClassic extends React.Component<ProgressBarClassicProps, ProgressBarClassicState> {
    constructor(props: ProgressBarClassicProps) {
        super(props)
        this.state = {
            progress: 0,
            init_animation: false,
        }
    }

    componentDidMount() {
        LayoutAnimation.spring()
        setTimeout(() => {
            this.setState({ progress: this.props.progress })
        }, 0)
    }

    componentWillReceiveProps(nextProps: ProgressBarClassicProps) {
        this.setState({ progress: nextProps.progress })
    }

    componentWillUpdate() {
        LayoutAnimation.spring()
    }

    render() {
        var value = false;
        var marginTop = 0;
        return (
            <View style={[styles.flexBox, styles.progressBar, this.props.style]}>
                <View style={[styles.progressBar_left, { flex: this.state.progress }]}>
                    {value}
                </View>
                <View style={[styles.progressBar_right, { flex: 100 - this.state.progress }]}></View>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    flexBox: {
        flex: 1,
        flexDirection: 'row',
    },
    progressBar: {
        overflow: 'hidden',
        height: 20,
        borderWidth: 2,
        borderColor: 'rgb(0, 122, 255)',
        borderRadius: 10,
        marginBottom: 5,
    },
    progressBar_left: {
        backgroundColor: '#62aeff',
    },
    progressBar_right: {
        backgroundColor: '#fff',
    },
    progressBar_mes: {
        position: 'absolute',
        right: 0,
        paddingRight: 5,
        // lineHeight: 30,
        backgroundColor: 'rgba(0,0,0,0)',
        flexDirection: 'row',
    },
    progressBar__balloon: {
        position: 'absolute',
        padding: 3,
        right: -15,
        backgroundColor: '#62aeff',
        borderRadius: 2,
        paddingRight: 5,
        flexDirection: 'row',
    },
    progressBar__balloonArrow: {
        position: 'absolute',
        bottom: -10,
        right: 0,
        backgroundColor: '#62aeff',
        borderRadius: 30,
        width: 30,
        height: 30,
    },
    progressBar__val: {
        // textAlign: 'center',
        color: '#fff',
        // lineHeight: 30,
    },
    progressBar__balloonVal: {
        textAlign: 'center',
        color: '#fff',
        // lineHeight: 30,
    },
    labelWrap: {
        position: 'absolute',
        top: 0,
        left: .2,
    },
    label: {
        color: 'rgb(0, 122, 255)',
        paddingHorizontal: 10,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        textAlign: 'center'
    }
});