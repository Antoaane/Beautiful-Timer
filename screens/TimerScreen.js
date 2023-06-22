import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const TimerScreen = () => {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const startRef = useRef(null);
  
    const startTimer = () => {
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

    const minutes = Math.floor(time / 60000) % 60;
    const seconds = Math.floor(time / 1000) % 60;
    const centiseconds = Math.floor(time / 10) % 100;


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
        button: {
            position: 'relative',
            width: screenWidth,
            height: screenHeight,
            backgroundColor: 'transparent',
    
            alignItems: 'center',
            justifyContent: 'center',
        },
        container: {
            marginHorizontal: -200,
        },
        timer: {
            width: screenWidth,
            height: screenHeight,

            alignItems: 'center',
            justifyContent: 'center',
        },
        timerHorizontal: {
            width: screenWidth / 3 * 2,
            height: screenHeight,
            marginLeft: screenWidth / 3,
        
            paddingHorizontal: 40,

            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        min: {
            fontSize: minutes > 9 ? 550 : 1100,
            fontFamily: 'AbrilFatface-Regular',
            color: 'rgba(208, 134, 98, 0.2)',
            textAlign: 'center',
            backgroundColor: 'transparent',

            position: 'absolute',
            top: minutes > 9 ? screenHeight/20 : -screenHeight/2.75,
            left: minutes > 19 ? -screenWidth/4 : minutes > 9 ? -screenWidth/6 : -screenWidth/4,

            transform: [{ rotate: '20deg'}],
        },
        sec: {
            fontSize: 300,
            fontFamily: 'Product-Sans-Bold',
            textAlign: 'center',

            color: 'rgba(208, 134, 98, 1)',
        },
        cents: { 
            fontSize: 80,
            fontFamily: 'Product-Sans-Regular',
            textAlign: 'center',

            color: 'rgba(208, 134, 98, 1)',
        },
        minHorizontal: {
            fontSize: minutes > 9 ? 500 : 650,
            fontFamily: 'AbrilFatface-Regular',
            color: 'rgba(208, 134, 98, 0.2)',
            textAlign: 'center',

            position: 'absolute',
            top: minutes > 9 ? -screenHeight /2 : -screenHeight/1.5,
            left: minutes > 9 ? -screenWidth /30 : screenWidth/100,

            transform: [{ rotate: '-20deg'}],
        },
        secHorizontal: {
            fontSize: 300,
            fontFamily: 'Product-Sans-Bold',
            textAlign: 'center',

            color: 'rgba(208, 134, 98, 1)',
        },
        centsHorizontal: { 
            fontSize: 80,
            fontFamily: 'Product-Sans-Regular',
            textAlign: 'center',

            color: 'rgba(208, 134, 98, 1)',
        },


        darkMin: {
            fontSize: minutes > 9 ? 550 : 1100,
            fontFamily: 'AbrilFatface-Regular',
            color: 'rgba(255, 255, 255, 0.2)',
            textAlign: 'center',
            backgroundColor: 'transparent',

            position: 'absolute',
            top: minutes > 9 ? screenHeight/20 : -screenHeight/2.75,
            left: minutes > 19 ? -screenWidth/4 : minutes > 9 ? -screenWidth/6 : -screenWidth/4,

            transform: [{ rotate: '20deg'}],
        },
        darkSec: {
            fontSize: 300,
            fontFamily: 'Lexend-Thin',
            textAlign: 'center',

            color: 'rgba(255, 255, 255, 1)',
        },
        darkCents: { 
            fontSize: 80,
            fontFamily: 'Lexend-Thin',
            textAlign: 'center',

            color: 'rgba(255, 255, 255, 1)',
        },
        darkMinHorizontal: {
            fontSize: minutes > 9 ? 500 : 650,
            fontFamily: 'AbrilFatface-Regular',
            color: 'rgba(208, 134, 98, 0.2)',
            textAlign: 'center',

            position: 'absolute',
            top: minutes > 9 ? -screenHeight /2 : -screenHeight/1.5,
            left: minutes > 9 ? -screenWidth /30 : screenWidth/100,

            transform: [{ rotate: '-20deg'}],
        },
        darkSecHorizontal: {
            fontSize: 300,
            fontFamily: 'Product-Sans-Bold',
            textAlign: 'center',

            color: 'rgba(208, 134, 98, 1)',
        },
        darkCentsHorizontal: { 
            fontSize: 80,
            fontFamily: 'Product-Sans-Regular',
            textAlign: 'center',

            color: 'rgba(208, 134, 98, 1)',
        },
    });
  
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={styles.container}>
                <Text style={screenHeight > screenWidth ? styles.darkMin : styles.minHorizontal}>
                    {minutes}
                </Text>
                <TouchableOpacity onPress={startTimer} onLongPress={resetTimer} style={styles.button}>
                    <View style={screenHeight > screenWidth ? styles.timer : styles.timerHorizontal}>
                        <Text style={screenHeight > screenWidth ? styles.darkSec : styles.secHorizontal}>
                            {seconds}
                        </Text>
                        <Text style={screenHeight > screenWidth ? styles.darkCents : styles.centsHorizontal}>
                            {centiseconds}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default TimerScreen;