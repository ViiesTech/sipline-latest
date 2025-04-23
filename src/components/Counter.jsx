import { Add, Minus } from "iconsax-react-native"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { H6 } from "../utils/Text"
import { Color } from "../utils/Colors"
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';


const Counter = ({counterNumber,handleDecrement,handleIncrement  }) => {
    return (
        <View style={styles.mainCounterCard}>
            <View style={styles.Counter}>
                <TouchableOpacity onPress={handleIncrement} style={styles.counterAction}>
                    <Minus size={wp('6%')} color={Color('text')} />
                </TouchableOpacity>
                <H6 >{counterNumber}</H6>
                <TouchableOpacity onPress={handleDecrement} style={styles.counterAction}>
                    <Add size={wp('6%')} color={Color('text')} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainCounterCard: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    counterAction: {
        borderWidth: 1,
        alignItems: "center",
        justifyContent:'center',
        width: hp('4%'),
        height: hp('4%'),
        borderRadius: hp('0.5%'),
        backgroundColor: Color("headerIcon")
    },
    Counter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: wp('7%'),
    },
})


export default Counter