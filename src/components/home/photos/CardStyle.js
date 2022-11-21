import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

const CardStyle = ({onPress, selected, flag}) => {
  const [isSelected, setIsSelected] = React.useState(false);

  React.useEffect(() => {
    if (selected) {
      setIsSelected(true);
    }else if(selected==null){
       setIsSelected(false);
    }
  }, [selected]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={[
        styles.selectImage,
        {backgroundColor: isSelected ? 'blue' : 'gray'},
      ]}>
      <Text style={styles.titleSelect}>{}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  selectImage: {
    width: '15%',
    height: '15%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#ffffff92',
  },
  titleSelect: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'gray',
  },
});
export default CardStyle;
