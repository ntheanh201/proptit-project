import {View, Spinner} from 'native-base';
import React from 'react';
import colors from '../values/colors';
import {Modal} from 'react-native';

interface LoadingView {
  show: boolean;
}

const LoadingView = (state: LoadingView): React.ReactElement => {
  return (
    <Modal animationType="fade" visible={state.show}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
          zIndex: 9,
          backgroundColor: 'rgba(0,0,0,0.6)',
        }}>
        <Spinner color={colors.blue01} />
      </View>
    </Modal>
  );
};

export default LoadingView;
