/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import { View } from 'react-native';
import SuccessMessage from '../components/SuccessMessage';
import Background from '../utils/Background';
import Wrapper from '../utils/Wrapper';
import Btn from '../components/Btn';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useDispatch } from 'react-redux';
import { handleLogout } from '../redux/Actions/UsersActions';


const Logout = ({ navigation }) => {
    const dispatch = useDispatch();

    const callLogout = () => {
        dispatch(handleLogout(navigation))
    }

    return (
        <>
            <Background>
                <Wrapper>
                    <View style={{ justifyContent: 'center', alignItems: 'center', height: hp('85%') }}>
                        <SuccessMessage
                            title={'Logout'}
                            message={'Are you sure you want to logout'}
                        />
                    </View>
                </Wrapper>
            </Background>
            <Btn onPress={callLogout} style={{ position: 'absolute', zIndex: 1, bottom: hp('3%'), left: wp('6%'), width: wp('88%') }}>Logout</Btn>
        </>
    );
};

export default Logout;
