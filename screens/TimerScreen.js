import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Easing, Animated  } from 'react-native';
import Wave from './svgs/Wave';

const TimerScreen = () => {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const startRef = useRef(null);
    const [clicks, setClicks] = useState(0);
    const [theme, setTheme] = useState('light');
    const positionWave = useRef(new Animated.Value(0)).current; // Ajouté
    const positionWaveHorizontal = useRef(new Animated.Value(0)).current; // Ajouté

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
        } else if (clicks > 0) {
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

    const day = Math.floor(time / 86400000);
    const hour = Math.floor(time / 3600000) % 24;
    const minutes = Math.floor(time / 60000) % 60;
    const seconds = Math.floor(time / 1000) % 60;
    const centiseconds = Math.floor(time / 10) % 100;

    // const day = 59;
    // const hour = 1;
    // const minutes = 26;
    // const seconds = 27;
    // const centiseconds = 67;

    useEffect(() => {
        return () => cancelAnimationFrame(startRef.current);
    }, []);

    const animationRef = useRef(null); // Ajouté pour stocker l'instance de l'animation

    // Animation verticale
    useEffect(() => {
        if (running) {
            const up = Animated.timing(positionWave, {
                toValue: -(screenHeight+50),
                duration: 59000,
                easing: Easing.linear,
                useNativeDriver: true,
            });
            const down = Animated.timing(positionWave, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            });
            const combined = Animated.sequence([up, down]);
            animationRef.current = Animated.loop(combined); // Stocke l'instance de l'animation
            animationRef.current.start(); // Démarre l'animation
        } else if (animationRef.current) {
            animationRef.current.stop(); // Arrête l'animation
        }
    }, [running]);

    // Animation horizontale
    useEffect(() => {
        const left = Animated.timing(positionWaveHorizontal, {
        toValue: -screenWidth,
        duration: 5000,
        easing: Easing.linear,
        useNativeDriver: true,
        });
        const right = Animated.timing(positionWaveHorizontal, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
        });
        const combinedHorizontal = Animated.sequence([left, right]);
        Animated.loop(combinedHorizontal).start();
    }, []);

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
            backgroundColor: '#E8A27F',
            // backgroundImage: require('../assets/pictures/bg.jpg'),
            // backgroundPosition: 'center',

            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        Wave: {
            top: -50, // corrigé
            left: 200,
            height: screenHeight+250,
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

        timeExtraLargeStroke: {
            fontSize: 900,
            fontFamily: 'Lexend-Regular-strokes',
            color: '#FFEADE',

            lineHeight: screenHeight + screenHeight/3.75,
            textAlign: 'center',
        },
        timeLargeStroke: {
            fontSize: 250,
            fontFamily: 'Lexend-Regular-strokes',
            color: '#E8A27F',

            textAlign: 'center',
        },
        timeMediumStroke: {
            fontSize: 75,
            fontFamily: 'Lexend-Regular-strokes',
            color: '#E8A27F',

            textAlign: 'center',
        },
        timeSmallStroke: {
            fontSize: 50,
            fontFamily: 'Lexend-Regular-strokes',
            color: '#E8A27F',

            display: hour >= 1 ? 'flex' : 'none',

            lineHeight: 57.5,
            textAlign: 'center',
        },

        timeExtraLarge: {
            fontSize: 900,
            fontFamily: 'Lexend-Regular',
            color: '#E8A27F',

            lineHeight: screenHeight + screenHeight/3.75,
            textAlign: 'center',
        },
        timeLarge: {
            fontSize: 250,
            fontFamily: 'Lexend-Regular',
            color: '#FFEADE',

            textAlign: 'center',
        },
        timeMedium: {
            fontSize: 75,
            fontFamily: 'Lexend-Regular',
            color: '#FFEADE',

            textAlign: 'center',
        },
        timeSmall: {
            fontSize: 50,
            fontFamily: 'Lexend-Regular',
            color: '#FFEADE',

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
            width: screenWidth*2,
            height: screenHeight*2,

            position: 'absolute',
            top: -screenHeight/2,
            left: -screenWidth/2,
            // transform: [
            //     { translateX: screenWidth*2 },
            //     { translateY: screenHeight*2 },
            // ],

            backgroundColor: 'transparent',

            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
    });
  
    return (
        <View style={styles.backGround}>
            <Animated.View 
                style={{ 
                    ...styles.Wave, 
                    transform: [
                        { translateY: positionWave }, 
                        { translateX: positionWaveHorizontal }
                    ] 
                }}
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
            <View style={styles.timerContainer}>
                <Text style={styles.timeExtraLargeStroke}>
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
            <TouchableOpacity 
                onPress={startTimer} 
                onLongPress={resetTimer}
                style={styles.button}
            >
                <View>
                    <Text
                        style={styles.timeSmallStroke}
                    >
                        {day >= 1 ? seconds : hour >= 1 ? centiseconds : centiseconds}
                    </Text>
                    <Text
                        style={styles.timeLargeStroke}
                    >
                        {day >= 1 ? hour : hour >= 1 ? minutes : seconds}
                    </Text>
                    <Text
                        style={styles.timeMediumStroke}
                    >
                        {day >= 1 ? minutes : hour >= 1 ? seconds : centiseconds}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default TimerScreen;