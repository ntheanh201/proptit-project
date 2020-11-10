import * as React from 'react'
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { Rank } from '../core'
import { rankService } from '../services'
import { BASE_URL } from '../values/env'
import IonIcons from 'react-native-vector-icons/Ionicons'

interface RankingScreenState {
  isLoadingRank: boolean
  rankingData: Rank[]
}

class RankingScreen extends React.Component<{}, RankingScreenState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      isLoadingRank: true,
      rankingData: [],
    }
  }

  componentDidMount() {
    this.getRankingData()
  }

  getRankingData = async () => {
    const rankingData = await rankService.getRankwParams()
    this.setState({ rankingData, isLoadingRank: false })
  }

  render() {
    const { isLoadingRank, rankingData } = this.state
    if (isLoadingRank) {
      return (
        <SafeAreaView>
          <ActivityIndicator animating={true} />
        </SafeAreaView>
      )
    }
    return (
      <SafeAreaView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
          }}>
          <Text style={{ fontWeight: 'bold' }}>No.</Text>
          <Text style={{ fontWeight: 'bold' }}>Name</Text>
          <Text style={{ fontWeight: 'bold' }}>Score</Text>
        </View>
        <ScrollView>
          {rankingData.map((rank, index) => (
            <View style={styles.wrapper}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {index < 3 ? (
                  <IonIcons
                    name={'ios-trophy'}
                    size={20}
                    color={
                      index === 0
                        ? '#ffd700'
                        : index === 1
                        ? 'silver'
                        : '#cd7f32'
                    }
                  />
                ) : (
                  <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                    {index + 1}
                  </Text>
                )}
                <Image
                  source={{ uri: 'http://apis.aiforce.xyz' + rank.user.avatar }}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 36,
                    marginLeft: 20,
                  }}
                />
                <Text
                  style={{ fontWeight: 'bold', fontSize: 16, marginLeft: 10 }}>
                  {rank.user.displayName}
                </Text>
              </View>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                {rank.score}
              </Text>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    marginHorizontal: 10,
    justifyContent: 'space-between',
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
  },
})

export default RankingScreen
