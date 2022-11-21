import {Dimensions} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
export const {width, height} = Dimensions.get('window');

export const VERY_SMALL = RFPercentage(1.8);
export const SMALL = RFPercentage(2.5);
export const REGULAR = RFPercentage(4);
export const MEDIUM = RFPercentage(4.5);
export const BIG = RFPercentage(5);
export const BIT_SMALL_VERTICAL_SPACE = hp(1);
export const VERY_SMALL_VERTICAL_SPACE = hp(2);
export const SMALL_VERTICAL_SPACE = hp(3);
export const MEDIUM_SMALL_VERTICAL_SPACE = hp(3.5);
export const MEDIUM_VERTICAL_SPACE = hp(4);
export const REGULAR_VERTICAL_SPACE = hp(5);
export const BIG_VERTICAL_SPACE = hp(10);

export const SMALL_HORIZONTAL_SPACE = hp(3);
export const REGULAR_HORIZONTAL__SPACE = hp(5);
export const BIG_HORIZONTAL__SPACE = hp(10);
