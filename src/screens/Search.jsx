import { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Header from '../components/Header';
import Input from '../components/Input';
import Background from '../utils/Background'
import Wrapper from '../utils/Wrapper'
import {  H5,  Pera } from '../utils/Text';
import { Color } from '../utils/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Br from '../components/Br';
import { BagCross, RefreshCircle } from 'iconsax-react-native';
import Badge from '../components/Badge';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { handleHomeFilterData } from '../redux/Actions/BarActions';
import { LoadingAnimation } from '../utils/Alert';
import { searchDummyData } from '../utils/LocalData';


const Search = ({ navigation }) => {
    const [inputValue, setInputValue] = useState('');
    // const searchTrends = useSelector((state) => state?.bars);
    const searchTrends = searchDummyData
    const [items, setItems] = useState([]);
    const dispatch = useDispatch();
    const loader = useSelector(state => state?.bars)


    const getPopularSearch = (value) => {
        dispatch(handleHomeFilterData(value, navigation))
    }

    useEffect(() => {
        loadItems();
    }, []);

    const loadItems = async () => {
        try {
            const storedItems = await AsyncStorage.getItem('items');
            if (storedItems) {
                setItems(JSON.parse(storedItems));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const saveItems = async (newItems) => {
        try {
            await AsyncStorage.setItem('items', JSON.stringify(newItems));
            setItems(newItems);
        } catch (error) {
            console.error(error);
        }
    };

    const addItem = () => {
        if (inputValue) {
            dispatch(handleHomeFilterData(inputValue, navigation))
            const newItems = [...items, inputValue];
            if (newItems.length > 5) {
                newItems.shift();
            }
            saveItems(newItems);
            setInputValue('');
        }
    };

    const deleteItem = (itemToDelete) => {
        const newItems = items.filter(item => item !== itemToDelete);
        saveItems(newItems);
    };



    return (
        <>

            {loader?.barLoadingState ?
                <Background>
                    <LoadingAnimation />
                </Background>
                :
                <Background>
                    <Wrapper>
                        <Header withBack onlyTitle title="" navigation={navigation}>
                            <Input
                                placeholder="Search...."
                                styling={{ width: hp('30%'), height: hp('5%'), borderRadius: hp('1%'), borderColor: Color('searchBorder') }}
                                value={inputValue}
                                onChangeText={setInputValue}
                                onSubmitEditing={addItem}
                            />
                            <TouchableOpacity onPress={() => { setInputValue('') }}>
                                <Pera bold>Cancel</Pera>
                            </TouchableOpacity>
                        </Header>
                        <Br space={5} />
                        <H5 bold>Recent Searches</H5>
                        <Br space={2} />
                        <Wrapper>
                            {items?.map((item, index) => {
                                return (
                                    <View
                                        key={index}
                                        style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: hp('3%') }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: hp('2%') }} >
                                                <RefreshCircle
                                                    size={hp('2.5%')} color={Color('deleteSearch')} />
                                            <TouchableOpacity onPress={()=> getPopularSearch(item)} >
                                            <H5 numberOfLines={1}>{item}</H5>
                                            </TouchableOpacity>
                                        </View>
                                        <TouchableOpacity onPress={() => deleteItem(item)}>
                                            <BagCross size={hp('2.4%')} color={Color('deleteSearch')} />
                                        </TouchableOpacity>
                                    </View>
                                )
                            })}
                        </Wrapper>
                        <H5 bold>Popular Searches</H5>
                        <Br space={2} />
                    </Wrapper>
                    <Badge
                        isHorizontal={false}
                        options={searchTrends?.homeData?.trendSearches}
                        onPress={getPopularSearch}
                    />
                </Background>
            }
        </>
    )
}



export default Search;