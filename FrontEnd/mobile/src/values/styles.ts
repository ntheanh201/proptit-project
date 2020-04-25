import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  bold_text: { fontSize: 20, fontWeight: 'bold', color: 'black' },
  normal_text: { fontSize: 17, color: 'gray' },
  normal_icon: { width: 50, height: 50, borderRadius: 25 },
  option_button: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.3,
  },
})
