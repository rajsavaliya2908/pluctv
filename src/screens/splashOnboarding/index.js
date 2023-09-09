import React, {useState} from 'react';
import {View, Text} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {BottomButton, Label, SafeArea} from 'src/components';
import styles, {itemWidth, sliderWidth} from './styles';
import {Colors} from "src/utils/Colors";
import {Strings} from "src/utils/Strings";
import {Onboarding_2, Onboarding_1,Onboarding_3} from "src/assets/svgs";
import Routes from "src/router/Routes";

const ENTRIES1 = [
    {
        title: 'Hey Sarah!',
        subtitle: 'Find some of the most unheard stories made my real people',
        Icon: Onboarding_3
    },
    {
        title: 'Hey Sarah!',
        subtitle: 'Become a creator and earn, no matter who you are all you need is passion to share your story',
        Icon: Onboarding_1
    },
    {
        title: 'Hey Sarah!',
        subtitle: 'React to your favourite shows ans share it on your social networks',
        Icon: Onboarding_2
    },
];

const SplashOnboarding = ({navigation}) => {

    const [activeSlide, setActiveSlide] = useState(0)

    const onSkipPress = () => {
        navigation.replace(Routes.Register)
    }

    const renderSlider = () => {
        return (
            <View>
                <Carousel
                    layout={'default'}
                    data={ENTRIES1}
                    renderItem={renderItemWithParallax}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    hasParallaxImages={false}
                    inactiveSlideScale={0.94}
                    inactiveSlideOpacity={0.7}
                    containerCustomStyle={styles.slider}
                    contentContainerCustomStyle={styles.sliderContentContainer}
                    loop={false}
                    loopClonesPerSide={0}
                    autoplay={false}
                    autoplayDelay={500}
                    autoplayInterval={3000}
                    onSnapToItem={(index) => setActiveSlide(index)}
                />
                <Pagination
                    dotsLength={ENTRIES1.length}
                    activeDotIndex={activeSlide}
                    containerStyle={styles.paginationContainer}
                    dotColor={Colors.white}
                    dotStyle={styles.paginationDot}
                    inactiveDotStyle={styles.inactiveDot}
                    inactiveDotColor={'#000'}
                    inactiveDotOpacity={0.5}
                    inactiveDotScale={1}
                    animatedFriction={10}
                />
            </View>
        )
    }

    const renderItemWithParallax = ({item, index}, parallaxProps) => {
        const {Icon, title, subtitle} = item;

        return (
            <View style={styles.sliderItemContainer}>
                <Icon height={300} width={300}/>
                <View style={styles.titleView}>
                    <Text mt={20} font_bold bold style={styles.title}>{title}</Text>
                    <Text mt={20} font_regular align={'center'} style={styles.subTitle}>{subtitle}</Text>
                </View>
            </View>
        );
    }


    return (
        <SafeArea statusBarColor={Colors.primary} bottomBarColor={Colors.primary}>
            <View style={styles.container}>
                {renderSlider()}
                <BottomButton title={Strings.skip} onPress={() => onSkipPress()}/>
            </View>
        </SafeArea>
    );
};

export default SplashOnboarding;
