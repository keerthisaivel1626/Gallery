import {StyleSheet} from 'react-native';
import Colors from './Colors';
export const GlobalStyles = StyleSheet.create({
  RootContainer: {
    flex: 1,
    backgroundColor: Colors.blue,
    alignItems: 'center',
  },

  cardContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    width: '100%',
    height: '60%',
    elevation: 1,
    borderTopStartRadius: 38,
    borderTopEndRadius: 38,
  },
  row: {
    flexDirection: 'row',
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '400',
  },
  buttonOuterContainer: {
    borderRadius: 28,
    // margin: 8,
    overflow: 'hidden',
    backgroundColor: Colors.blue,
    padding: 5,
    width: '80%',
    alignItems: 'center',
  },
  title: {
    color: Colors.blue,
    fontSize: 24,
    fontWeight: '800',
  },
  subTitle: {
    color: 'gray',
    fontSize: 16,
    fontWeight: '700',
  },
  text: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: '400',
  },
});
