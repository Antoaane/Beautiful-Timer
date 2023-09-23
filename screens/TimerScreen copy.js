import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

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
            const timer = setTimeout(handleReset, 300); // Réinitialise le compteur après 1 seconde
    
            return () => clearTimeout(timer); // S'assure que le timer est bien nettoyé si le composant est démonté
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

    const day = Math.floor(time / 86400000);
    const hour = Math.floor(time / 3600000) % 24;
    const minutes = Math.floor(time / 60000) % 60;
    const seconds = Math.floor(time / 1000) % 60;
    const centiseconds = Math.floor(time / 10) % 100;

    // const day = 2;
    // const hour = 1;
    // const minutes = 26;
    // const seconds = 27;
    // const centiseconds = 67;


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
        backGround : {
            backgroundColor: theme === 'light' ? 'rgba(251, 247, 244, 1)' : 'rgba(0, 0, 0, 1)',
            width: screenWidth,
            height: screenHeight,
            position: 'absolute',
            top: 0,
            zIndex: 0,
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
            fontSize: 
                minutes > 9 && hour < 1 && day < 1      ? 550 : 
                hour > 9 && day < 1                     ? 550 : 
                day > 9                                 ? 550 : 
                                                        1100,

            fontFamily: 'AbrilFatface-Regular',
            color: theme === 'light' ? 'rgba(208, 134, 98, 0.2)' : 'rgba(255, 255, 255, 0.15)',
            textAlign: 'center',
            backgroundColor: 'transparent',

            position: 'absolute',
            top: 
                minutes > 9 && hour < 1 && day < 1      ? screenHeight/20 : 
                hour > 9 && day < 1                     ? screenHeight/20 : 
                day > 9                                 ? screenHeight/20 : 
                                                        -screenHeight/2.75,

            left: 
                minutes > 19 && hour < 1                ? -screenWidth/4 : 
                hour > 19 && day < 1                    ? -screenWidth/4 :
                day > 19                                ? -screenWidth/4 :
                minutes > 9 && hour < 1                 ? -screenWidth/6 : 
                hour > 9 && day < 1                     ? -screenWidth/6 :
                day > 9                                 ? -screenWidth/6 :
                                                        -screenWidth/4,

            transform: [{ rotate: '20deg'}],
        },
        sec: {
            fontSize: 300,
            fontFamily: theme === 'light' ? 'Product-Sans-Bold' : 'Lexend-Thin',
            textAlign: 'center',

            color: theme === 'light' ? 'rgba(208, 134, 98, 1)' : 'rgba(255, 255, 255, 1)'
        },
        cents: { 
            fontSize: 80,
            fontFamily: theme === 'light' ? 'Product-Sans-Regular' : 'Lexend-Thin',
            textAlign: 'center',

            color: theme === 'light' ? 'rgba(208, 134, 98, 1)' : 'rgba(255, 255, 255, 1)'
        },
        minHorizontal: {
            fontSize: 
                minutes > 9 && hour < 1 && day < 1      ? 500 : 
                hour > 9 && day < 1                     ? 500 : 
                day > 9                                 ? 500 : 
                                                        650,
            fontFamily: 'AbrilFatface-Regular',
            color: theme === 'light' ? 'rgba(208, 134, 98, 0.2)' : 'rgba(255, 255, 255, 0.15)',
            textAlign: 'center',

            position: 'absolute',
            top: 
                minutes > 9 && hour < 1 && day < 1      ? -screenHeight/2 : 
                hour > 9 && day < 1                     ? -screenHeight/2 : 
                day > 9                                 ? -screenHeight/2 : 
                                                        -screenHeight/1.5,
            left: 
                minutes > 9 && hour < 1 && day < 1      ? -screenWidth /30 : 
                hour > 9 && day < 1                     ? -screenWidth /30 : 
                day > 9                                 ? -screenWidth /30 : 
                                                        screenWidth/100,
            transform: [{ rotate: '-20deg'}],
        },
        secHorizontal: {
            fontSize: 300,
            fontFamily: theme === 'light' ? 'Product-Sans-Bold' : 'Lexend-Thin',
            textAlign: 'center',

            color: theme === 'light' ? 'rgba(208, 134, 98, 1)' : 'rgba(255, 255, 255, 1)'
        },
        centsHorizontal: { 
            fontSize: 80,
            fontFamily: theme === 'light' ? 'Product-Sans-Regular' : 'Lexend-Thin',
            textAlign: 'center',

            color: theme === 'light' ? 'rgba(208, 134, 98, 1)' : 'rgba(255, 255, 255, 1)'
        },
        bonusTime: {
            display: hour >= 1 ? 'flex' : 'none',

            fontSize: 80,
            fontFamily: theme === 'light' ? 'Lexend-Thin' : 'Product-Sans-Italic',
            textAlign: 'center',
        
            color: theme === 'light' ? 'rgba(208, 134, 98, 1)' : 'rgba(255, 255, 255, 1)'
        },
        bonusTimeHorizontal: {
            display: hour >= 1 ? 'flex' : 'none',

            fontSize: 80,
            fontFamily: theme === 'light' ? 'Lexend-Thin' : 'Product-Sans-Italic',
            textAlign: 'center',

            color: theme === 'light' ? 'rgba(208, 134, 98, 1)' : 'rgba(255, 255, 255, 1)'
        },
    });
  
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={styles.backGround}/>
            <View style={styles.container}>
                <Text style={screenHeight > screenWidth ? styles.min : styles.minHorizontal}>
                    {day >= 1 ? day : hour >= 1 ? hour : minutes}
                </Text>
                <TouchableOpacity onPress={startTimer} onLongPress={resetTimer} style={styles.button}>
                    <View style={screenHeight > screenWidth ? styles.timer : styles.timerHorizontal}>
                        <Text style={screenHeight > screenWidth ? styles.bonusTime : styles.bonusTimeHorizontal}>
                            {day >= 1 ? seconds : hour >= 1 ? centiseconds : centiseconds}
                        </Text>
                        <Text style={screenHeight > screenWidth ? styles.sec : styles.secHorizontal}>
                            {day >= 1 ? hour : hour >= 1 ? minutes : seconds}
                        </Text>
                        <Text style={screenHeight > screenWidth ? styles.cents : styles.centsHorizontal}>
                            {day >= 1 ? minutes : hour >= 1 ? seconds : centiseconds}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default TimerScreen;