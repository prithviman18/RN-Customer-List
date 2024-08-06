import React, { useEffect, useCallback } from 'react';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import fetchEnquiryDetails from '../../api/services/generalApi';
import { fetchCustomers } from '../../api/services/generalApi';
import useDataFetching from '../../Hooks/useDataFetching';
import { formatData } from '../../Utils/formatters/formatData';
import EmptyItem from '../../Components/common/empty/EmptyItem';
import EnquiryRegisterList from '../EnquiryRegister/EnquiryRegisterList';
import EmptyState from '../../Components/common/empty/EmptyState';
import { SafeAreaView } from 'react-native';
import NavigationHeader from '../../Components/Header/NavigationHeader';
import SearchContainer from '../../Containers/SearchContainer';
import RoundedContainer from '../../Containers/RoundedContainers';
import { FAB } from 'react-native-paper';
import { COLORS, FONT_FAMILY } from '../../Constants/theme';
import OverlayLoader from '../../Components/Loader/OverLayLoader';
import useDebouncedSearch from '../../Hooks/useDebouncedSearch';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View, Image  , Text, ActivityIndicator} from 'react-native';



const EnquiryRegisterScreen = ({ navigation }) => {
    const isFocused = useIsFocused();
    const { data, loading, fetchData, fetchMoreData } = useDataFetching(fetchCustomers);
    const { searchText, handleSearchTextChange } = useDebouncedSearch((text) => fetchData({searchText: text}), 500);
    console.log("API RESPONSE IS ",data);
    

    useFocusEffect(
        useCallback(() => {
            fetchData({searchText});
        }, [searchText])
    );

    useEffect(() => {
        if (isFocused) {
            fetchData({searchText});
        }
    }, [isFocused, searchText]);

    const handleLoadMore = () => {
        fetchMoreData({searchText});
    };

    const renderItem = ({item}) => {
        if(item.empty) {
            return <EmptyItem />;
        }
        return (
            <TouchableOpacity activeOpacity={0.7} onPress={() => console.log()}>
                <View style={{ flexDirection: 'row', alignItems: 'center', margin: 5 }}>
                    <Image source={require('../../../assets/images/EmptyState/user_bg.png')} tintColor={COLORS.primaryThemeColor} style={{ width: 45, height: 45 }} />
                    <View style={{ width: 10 }} />
                    <Text style={{ fontFamily: FONT_FAMILY.urbanistBold, fontSize: 14, flex: 1, color: COLORS.primaryThemeColor }}>{item?.name?.trim() || '-'}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    const renderEmptyState = () => (
        <EmptyState imageSource={require('../../../assets/images/EmptyState/empty.png')} message={'No Enquiries Found'} />
    );

    const renderContent = () => (
        <FlashList
            data={formatData(data, 1)}
            numColumns={1}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ padding: 10, paddingBottom: 50 }}
            onEndReached={handleLoadMore}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={0.2}
            ListFooterComponent={
                loading && <ActivityIndicator size="large" color={COLORS.orange} />
            }
            estimatedItemSize={100}
            style={{ flex: 1 }} // Ensure FlashList has a flex property
        />
    );
    

    const renderCustomers = () => {
        if (data.length === 0 && !loading) {
            return renderEmptyState();
        }
        return renderContent();
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
    <NavigationHeader title="Enquiry Register" onBackPress={() => navigation.goBack()} />
    <SearchContainer placeholder="Search Customers" onChangeText={handleSearchTextChange} />
    <RoundedContainer style={{ flex: 1 }}>
        {renderCustomers()}
        <FAB
            style={styles.fab}
            icon={() => <MaterialIcons name="add" size={24} color="white" />}
            onPress={() => console.log("fab button pressed")}
            animated={true}
        />
    </RoundedContainer>
    <OverlayLoader visible={loading} />
</SafeAreaView>

    );
};

const styles = {
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: COLORS.primaryThemeColor,
        borderRadius: 30,
        width: 60,
        height: 60,
    },
};

export default EnquiryRegisterScreen;
