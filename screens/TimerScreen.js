import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ImageBackground, Animated  } from 'react-native';
import Wave from './svgs/Wave';

const TimerScreen = () => {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const startRef = useRef(null);
    const [clicks, setClicks] = useState(0);
    const [theme, setTheme] = useState('light');

    const handleReset = () => {
        setClicks(0);
    };

    useEffect(() => {
        if (clicks === 5) {
            if (theme === 'light') {
                setTheme('dark');
            } else {
                setTheme('light');
            }
            handleReset();
        }
        else if (clicks > 0) {
            const timer = setTimeout(handleReset, 300);
    
            return () => clearTimeout(timer);
        }
    }, [clicks]);

  
    const startTimer = () => {
        setClicks(prevClicks => prevClicks + 1);
        if (running) {
            cancelAnimationFrame(startRef.current);
            setRunning(false);
        } else {
            setRunning(true);
            const startTime = Date.now() - time;
            startRef.current = requestAnimationFrame(function tick() {
                setTime(Date.now() - startTime);
                startRef.current = requestAnimationFrame(tick);
            });
        }
    };
  
    const resetTimer = () => {
        setTime(0);
        setRunning(false);
        cancelAnimationFrame(startRef.current);
    };
    
    useEffect(() => {
        return () => cancelAnimationFrame(startRef.current);
    }, []);

    // Animation qui déplace la vague de haut en bas
    Animated.timing(this.positionWave, {
        toValue: screenHeight-200,
        duration: 10000,
        useNativeDriver: true,
    }).start();

    // const day = Math.floor(time / 86400000);
    // const hour = Math.floor(time / 3600000) % 24;
    // const minutes = Math.floor(time / 60000) % 60;
    // const seconds = Math.floor(time / 1000) % 60;
    // const centiseconds = Math.floor(time / 10) % 100;

    const day = 59;
    const hour = 1;
    const minutes = 26;
    const seconds = 27;
    const centiseconds = 67;


    const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
    const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);

    useEffect(() => {
    const onChange = ({ window: { width, height } }) => {
        setScreenWidth(width);
        setScreenHeight(height);
    };

    Dimensions.addEventListener('change', onChange);
    }, []);  

    const styles = StyleSheet.create({
        backGround: {
            position: 'relative',
            width: screenWidth,
            height: screenHeight,
            backgroundImage: require('../assets/pictures/bg.jpg'),
            backgroundPosition: 'center',

            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        Wave: {
            top: this.positionWave,
            left: screenWidth-150,
            height: screenHeight+200,
            backgroundColor: 'transparent',

            display: 'flex',
            flexDirection: 'row',
        },
        wave1: {
            width: screenWidth,
        },
        wave2: {
            width: screenWidth,
        },
        wave3: {
            width: screenWidth,
        },

        timeExtraLarge: {
            fontSize: 400,
            fontFamily: 'Lora-Regular3',
            color: '#E8A27F',

            lineHeight: 460,
            textAlign: 'center',
        },
        timeLarge: {
            fontSize: 200,
            fontFamily: 'Lexend-Bold',
            color: '#E8A27F',

            lineHeight: 230,
            textAlign: 'center',
        },
        timeMedium: {
            fontSize: 100,
            fontFamily: 'Lexend-Regular',
            color: '#E8A27F',

            lineHeight: 115,
            textAlign: 'center',
        },
        timeSmall: {
            fontSize: 50,
            fontFamily: 'Lexend-Thin',
            color: '#E8A27F',

            display: hour >= 1 ? 'flex' : 'none',

            lineHeight: 57.5,
            textAlign: 'center',
        },

        button: {
            position: 'absolute',
            width: screenWidth,
            height: screenHeight,
            backgroundColor: 'transparent',

            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },

        timerContainer: {
            position: 'absolute',
            width: screenWidth,
            height: screenHeight,

            backgroundColor: 'transparent',

            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
    });
  
    return (
        <ImageBackground source={require('../assets/pictures/bg.jpg')} style={styles.backGround}>
            <Animated.View
                style={styles.Wave}
            >
                <Wave style={styles.wave1}/>
                <Wave style={styles.wave2}/>
                <Wave style={styles.wave3}/>
            </Animated.View>
            <View style={styles.timerContainer}>
                <Text style={styles.timeExtraLarge}>
                    {day >= 1 ? day : hour >= 1 ? hour : minutes}
                </Text>
            </View>
            <TouchableOpacity 
                onPress={startTimer} 
                onLongPress={resetTimer}
                style={styles.button}
            >
                <View>
                    <Text
                        style={styles.timeSmall}
                    >
                        {day >= 1 ? seconds : hour >= 1 ? centiseconds : centiseconds}
                    </Text>
                    <Text
                        style={styles.timeLarge}
                    >
                        {day >= 1 ? hour : hour >= 1 ? minutes : seconds}
                    </Text>
                    <Text
                        style={styles.timeMedium}
                    >
                        {day >= 1 ? minutes : hour >= 1 ? seconds : centiseconds}
                    </Text>
                </View>
            </TouchableOpacity>
        </ImageBackground>
    );
};

export default TimerScreen;