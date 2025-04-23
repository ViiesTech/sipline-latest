import { TouchableOpacity, View } from "react-native";
import Header from "../components/Header";
import Background from "../utils/Background"
import Wrapper from "../utils/Wrapper"
import SuccessMessage from "../components/SuccessMessage";
import Br from "../components/Br";
import { H5 } from "../utils/Text";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Btn from "../components/Btn";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { handleDeleteCard } from "../redux/Actions/BarActions";

const DeleteCard = ({ navigation, route }) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const deleteCard = () => {
        // setLoading(true)
        // dispatch(handleDeleteCard(route?.params?.id, setLoading,navigation))
        navigation?.goBack()
    }


    return (
        <>
            <Background>
                <Wrapper>
                    <Header navigation={navigation} onlyTitle title={'Delete Card'} withBack />
                    <Wrapper>
                        <Br space={1} />
                        <View style={{
                            justifyContent: "center", alignItems: 'center', marginTop: hp("15%")
                        }}>
                            <SuccessMessage
                                title={"Card"}
                                message={'Are you sure you want to delete this card'}
                            />
                        </View>
                        <Br space={18} />
                        <Btn loading={loading} onPress={deleteCard}>Delete Card</Btn>
                    </Wrapper>
                </Wrapper>
            </Background>
            <TouchableOpacity
                onPress={() => { navigation?.goBack() }}
                style={{
                    alignSelf: 'center',
                    position: 'absolute',
                    bottom: hp('4%'),
                    zIndex: 1
                }}>
                <H5 >No Thanks</H5>
            </TouchableOpacity>
        </>
    )
}

export default DeleteCard;