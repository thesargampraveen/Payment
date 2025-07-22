import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, SafeAreaView, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming,
  interpolate,
  withRepeat,
  withSequence,
  Easing,
  runOnJS
} from 'react-native-reanimated'; 
import { faker } from '@faker-js/faker';
import Clipboard from '@react-native-clipboard/clipboard';
import HapticFeedback from 'react-native-haptic-feedback';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

const CardDetails = () => {
  const [selectedMode, setSelectedMode] = useState('pay');
  const [isFrozen, setIsFrozen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    holderName: ''
  });

  // Enhanced animations
  const cardAnimation = useSharedValue(0);
  const freezeAnimation = useSharedValue(0);
  const blurAnimation = useSharedValue(0);
  const fadeAnimation = useSharedValue(0);
  const scaleAnimation = useSharedValue(0.9);
  const shimmerAnimation = useSharedValue(0);
  const particleAnimation = useSharedValue(0);
  const glowAnimation = useSharedValue(0);
  const successAnimation = useSharedValue(0);
  const backgroundShift = useSharedValue(0);
  const cardRotation = useSharedValue(0);
  const hologramAnimation = useSharedValue(0);

  useEffect(() => {
    // Generate fake card data
    const generateCardData = () => {
      setCardData({
        cardNumber: faker.finance.creditCardNumber('#### #### #### ####'),
        expiryDate: faker.date.future({ years: 5 }).toLocaleDateString('en-US', { month: '2-digit', year: '2-digit' }),
        cvv: faker.finance.creditCardCVV(),
        holderName: faker.person.fullName().toUpperCase()
      });
    };
    
    generateCardData();
    
    // Enhanced entrance animations with staggered effects
    fadeAnimation.value = withTiming(1, { duration: 1200 });
    scaleAnimation.value = withSpring(1, {
      damping: 20,
      stiffness: 90,
    });
    cardAnimation.value = withTiming(1, { duration: 1500 });
    
    // Continuous background animations
    backgroundShift.value = withRepeat(
      withTiming(1, { duration: 8000 }),
      -1,
      true
    );
    
    // Shimmer effect
    shimmerAnimation.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 2000 }),
        withTiming(0, { duration: 2000 })
      ),
      -1,
      false
    );
    
    // Particle movement
    particleAnimation.value = withRepeat(
      withTiming(1, { duration: 15000 }),
      -1,
      false
    );
    
    // Glow pulse
    glowAnimation.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 3000 }),
        withTiming(0.3, { duration: 3000 })
      ),
      -1,
      false
    );

    // Hologram effect
    hologramAnimation.value = withRepeat(
      withTiming(1, { duration: 4000 }),
      -1,
      true
    );
  }, []);

  const handleModePress = (mode) => {
    setSelectedMode(mode);
    
    // Enhanced mode selection with multiple effects
    scaleAnimation.value = withSequence(
      withTiming(0.92, { duration: 150 }),
      withSpring(1, { damping: 15, stiffness: 200 })
    );
    
    // Card tilt effect
    cardRotation.value = withSequence(
      withTiming(mode === 'card' ? -2 : 2, { duration: 200 }),
      withSpring(0, { damping: 12 })
    );
  };

  const handleFreeze = () => {
    const hapticOptions = {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false,
    };
    
    HapticFeedback.trigger('impactHeavy', hapticOptions);
    
    setIsFrozen(!isFrozen);
    
    if (!isFrozen) {
      // Enhanced freeze with multiple cascading effects
      freezeAnimation.value = withTiming(1, { duration: 1200 });
      blurAnimation.value = withTiming(1, { duration: 800 });
      scaleAnimation.value = withSequence(
        withTiming(0.95, { duration: 300 }),
        withSpring(1, { damping: 10, stiffness: 100 })
      );
    } else {
      // Enhanced unfreeze with bounce
      freezeAnimation.value = withTiming(0, { duration: 1000 });
      blurAnimation.value = withTiming(0, { duration: 600 });
      scaleAnimation.value = withSequence(
        withTiming(1.05, { duration: 200 }),
        withSpring(1, { damping: 15, stiffness: 150 })
      );
    }
  };

  const handleCopyDetails = () => {
    const detailsText = `Card: ${cardData.cardNumber}\nExpiry: ${cardData.expiryDate}\nCVV: ${cardData.cvv}\nHolder: ${cardData.holderName}`;
    Clipboard.setString(detailsText);
    
    const hapticOptions = {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false,
    };
    
    HapticFeedback.trigger('notificationSuccess', hapticOptions);
    
    // Success animation
    setShowSuccess(true);
    successAnimation.value = withSequence(
      withTiming(1, { duration: 300 }),
      withTiming(0, { duration: 800 }, () => {
        runOnJS(setShowSuccess)(false);
      })
    );
  };

  // Enhanced animated styles
  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeAnimation.value,
      transform: [
        {
          scale: scaleAnimation.value,
        },
      ],
    };
  });

  const backgroundAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(backgroundShift.value, [0, 1], [-50, 50]),
        },
        {
          translateY: interpolate(backgroundShift.value, [0, 1], [-30, 30]),
        },
      ],
    };
  });

  const cardAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(cardAnimation.value, [0, 1], [0, 1]),
      transform: [
        {
          translateY: interpolate(cardAnimation.value, [0, 1], [100, 0]),
        },
        {
          rotateY: `${interpolate(cardRotation.value, [-5, 5], [-5, 5])}deg`,
        },
        {
          rotateX: `${interpolate(cardRotation.value, [-5, 5], [2, -2])}deg`,
        },
      ],
    };
  });

  const shimmerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(shimmerAnimation.value, [0, 1], [-width, width * 2]),
        },
      ],
      opacity: interpolate(shimmerAnimation.value, [0, 0.5, 1], [0, 0.8, 0]),
    };
  });

  const freezeOverlayStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(freezeAnimation.value, [0, 1], [0, 0.95]),
      transform: [
        {
          scale: interpolate(freezeAnimation.value, [0, 1], [0.7, 1]),
        },
        {
          rotateZ: `${interpolate(freezeAnimation.value, [0, 1], [0, 360])}deg`,
        },
      ],
    };
  });

  const cardContentStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(blurAnimation.value, [0, 1], [1, 0.3]),
    };
  });

  const glowAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(glowAnimation.value, [0, 1], [0.3, 1]),
      shadowOpacity: interpolate(glowAnimation.value, [0, 1], [0.2, 0.6]),
    };
  });

  const particleAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(particleAnimation.value, [0, 1], [0, -height]),
        },
      ],
    };
  });

  const successAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: successAnimation.value,
      transform: [
        {
          scale: interpolate(successAnimation.value, [0, 1], [0.5, 1]),
        },
      ],
    };
  });

  const hologramAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(hologramAnimation.value, [0, 1], [0.1, 0.4]),
      transform: [
        {
          translateX: interpolate(hologramAnimation.value, [0, 1], [-20, 20]),
        },
      ],
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
      
      {/* Multi-layered Enhanced Background */}
      <LinearGradient
        colors={['#0a0a0a', '#1a0a1a', '#0a1a1a', '#1a1a0a', '#0a0a1a']}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      {/* Animated background layer */}
      <Animated.View style={[styles.animatedBackground, backgroundAnimatedStyle]}>
        <LinearGradient
          colors={['rgba(255, 68, 68, 0.05)', 'transparent', 'rgba(68, 255, 255, 0.05)']}
          style={styles.backgroundLayer}
        />
      </Animated.View>

      {/* Floating particles */}
      <Animated.View style={[styles.particleContainer, particleAnimatedStyle]}>
        {[...Array(15)].map((_, index) => (
          <View key={index} style={[styles.floatingParticle, {
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5000}ms`,
          }]} />
        ))}
      </Animated.View>

      {/* Main Animated Container */}
      <Animated.View style={[styles.content, containerAnimatedStyle]}>
      
        {/* Enhanced Header with glow */}
        <Animated.View style={[styles.header, glowAnimatedStyle]}>
          <Text style={styles.headerTitle}>select payment mode</Text>
          <Text style={styles.headerSubtitle}>choose your preferred payment method to make payment.</Text>
          <View style={styles.headerAccent} />
        </Animated.View>

        {/* Ultra Enhanced Payment Mode Toggle */}
        <View style={styles.toggleContainer}>
          <BlurView intensity={10} style={styles.toggleBlur}>
            <TouchableOpacity
              style={[styles.toggleButton, selectedMode === 'pay' && styles.toggleButtonActive]}
              onPress={() => handleModePress('pay')}
              activeOpacity={0.7}
            >
              <LinearGradient
                colors={selectedMode === 'pay' ? 
                  ['rgba(255, 68, 68, 0.8)', 'rgba(255, 68, 68, 0.4)'] : 
                  ['transparent', 'transparent']
                }
                style={styles.toggleGradient}
              >
                <Text style={[styles.toggleText, selectedMode === 'pay' && styles.toggleTextActive]}>pay</Text>
                {selectedMode === 'pay' && <View style={styles.activeIndicator} />}
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleButton, selectedMode === 'card' && styles.toggleButtonActive]}
              onPress={() => handleModePress('card')}
              activeOpacity={0.7}
            >
              <LinearGradient
                colors={selectedMode === 'card' ? 
                  ['rgba(255, 68, 68, 0.8)', 'rgba(255, 68, 68, 0.4)'] : 
                  ['transparent', 'transparent']
                }
                style={styles.toggleGradient}
              >
                <Text style={[styles.toggleText, selectedMode === 'card' && styles.toggleTextActive]}>card</Text>
                {selectedMode === 'card' && <View style={styles.activeIndicator} />}
              </LinearGradient>
            </TouchableOpacity>
          </BlurView>
        </View>

        {/* Premium Card Section */}
        <Animated.View style={[styles.cardSection, cardAnimatedStyle]}>
          <View style={styles.cardSectionHeader}>
            <Text style={styles.cardSectionTitle}>YOUR DIGITAL DEBIT CARD</Text>
            <View style={styles.premiumBadge}>
              <Text style={styles.premiumText}>PREMIUM</Text>
            </View>
          </View>
        
          {/* Ultra Premium Card with Multiple Effects */}
          <View style={styles.cardContainer}>
            {/* Outer glow effect */}
            <Animated.View style={[styles.cardGlow, glowAnimatedStyle]} />
            
            <LinearGradient
              colors={[
                'rgba(255,255,255,0.15)', 
                'rgba(255,255,255,0.08)', 
                'rgba(255, 68, 68, 0.12)',
                'rgba(255,255,255,0.10)'
              ]}
              style={styles.card}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <BlurView intensity={20} style={styles.cardBlur}>
                <Animated.View style={[styles.cardContent, cardContentStyle]}>
                  
                  {/* Holographic overlay */}
                  <Animated.View style={[styles.holographicOverlay, hologramAnimatedStyle]} />
                  
                  {/* Enhanced Background Pattern with animation */}
                  <View style={styles.cardPattern}>
                    <Animated.View style={[styles.patternLine, hologramAnimatedStyle]} />
                    <Animated.View style={[styles.patternLine2, hologramAnimatedStyle]} />
                    <Animated.View style={[styles.patternLine3, hologramAnimatedStyle]} />
                    <View style={styles.patternGrid} />
                  </View>

                  {/* Shimmer effect */}
                  <Animated.View style={[styles.shimmerOverlay, shimmerAnimatedStyle]}>
                    <LinearGradient
                      colors={['transparent', 'rgba(255,255,255,0.6)', 'transparent']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.shimmerGradient}
                    />
                  </Animated.View>

                  {/* Enhanced Top Section */}
                  <View style={styles.cardTopSection}>
                    {/* Enhanced Profile Circle */}
                    <View style={styles.profileSection}>
                      <LinearGradient
                        colors={['#ff6b35', '#f7931e', '#ffaa00']}
                        style={styles.profileCircle}
                      >
                        <Text style={styles.profileInitial}>S</Text>
                        <View style={styles.profileGlow} />
                      </LinearGradient>
                    </View>
                    
                    {/* Enhanced Card Logos */}
                    <View style={styles.cardLogos}>
                      <LinearGradient colors={['#1a1f71', '#0066cc']} style={styles.visaLogo}>
                        <Text style={styles.visaText}>VISA</Text>
                      </LinearGradient>
                      <LinearGradient colors={['#eb001b', '#ff6600']} style={styles.masterLogo}>
                        <Text style={styles.masterText}>M</Text>
                      </LinearGradient>
                      <LinearGradient colors={['#006fcf', '#0099ff']} style={styles.amexLogo}>
                        <Text style={styles.amexText}>AMEX</Text>
                      </LinearGradient>
                    </View>
                  </View>

                  {/* Ultra Enhanced YOLO Branding */}
                  <View style={styles.yoloBranding}>
                    <View style={styles.brandingLeft}>
                      <LinearGradient
                        colors={['#ff4444', '#ff6666']}
                        style={styles.yoloIconContainer}
                      >
                        <Text style={styles.yoloIconText}>Y</Text>
                        <View style={styles.iconGlow} />
                      </LinearGradient>
                      <Text style={styles.yoloText}>YOLO</Text>
                      <View style={styles.brandingGlow} />
                    </View>
                    <View style={styles.brandingRight}>
                      <LinearGradient
                        colors={['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.1)']}
                        style={styles.emojiContainer}
                      >
                        <Text style={styles.emoji}>😊</Text>
                      </LinearGradient>
                    </View>
                  </View>

                  {/* Enhanced Card Number Display */}
                  <View style={styles.cardNumberContainer}>
                    <Text style={styles.cardNumberDisplay}>{cardData.cardNumber}</Text>
                    <View style={styles.numberGlow} />
                  </View>

                  {/* Enhanced Card Details */}
                  <View style={styles.cardDetails}>
                    <View style={styles.cardDetailsLeft}>
                      <View style={styles.detailItem}>
                        <Text style={styles.cardLabel}>VALID THRU</Text>
                        <Text style={styles.cardValue}>{cardData.expiryDate}</Text>
                      </View>
                      <View style={styles.detailItem}>
                        <Text style={styles.cardLabel}>CVV</Text>
                        <Text style={styles.cardValue}>{cardData.cvv}</Text>
                      </View>
                    </View>
                    <View style={styles.cardDetailsRight}>
                      <View style={styles.decorativeElements}>
                        <LinearGradient
                          colors={['#ff4444', '#ff6666']}
                          style={styles.redDot}
                        />
                        <Text style={styles.cardBrand}>yolo pay</Text>
                        <View style={styles.brandAccent} />
                      </View>
                    </View>
                  </View>
                </Animated.View>
              </BlurView>

              {/* Ultra Enhanced Freeze Overlay */}
              <Animated.View style={[styles.freezeOverlay, freezeOverlayStyle]}>
                <BlurView intensity={30} style={styles.frozenBlur}>
                  <LinearGradient
                    colors={['rgba(173, 216, 230, 0.95)', 'rgba(135, 206, 250, 0.98)', 'rgba(100, 149, 237, 0.95)']}
                    style={styles.frozenGradient}
                  >
                    <View style={styles.icePattern}>
                      {[...Array(40)].map((_, index) => (
                        <Animated.View key={index} style={[styles.iceParticle, {
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          opacity: Math.random() * 0.9 + 0.1,
                          transform: [
                            { scale: Math.random() * 1.2 + 0.3 },
                            { rotate: `${Math.random() * 360}deg` }
                          ]
                        }, hologramAnimatedStyle]} />
                      ))}
                    </View>
                    <View style={styles.frozenTextContainer}>
                      <LinearGradient
                        colors={['#0077be', '#0099ff']}
                        style={styles.frozenIconContainer}
                      >
                        <Icon name="ac-unit" size={32} color="#ffffff" style={styles.frozenIcon} />
                      </LinearGradient>
                      <Text style={styles.frozenText}>FROZEN</Text>
                      <Text style={styles.frozenSubtext}>Card is temporarily disabled</Text>
                      <View style={styles.frozenGlow} />
                    </View>
                  </LinearGradient>
                </BlurView>
              </Animated.View>
              
              {/* Multiple Enhanced Card Shadows */}
              <View style={styles.cardShadow} />
              <View style={styles.cardShadow2} />

            </LinearGradient>
            
            {/* Ultra Enhanced Freeze Button */}
            <TouchableOpacity 
              style={[styles.freezeButton, isFrozen && styles.freezeButtonActive]} 
              onPress={handleFreeze}
              activeOpacity={0.7}
              accessibilityLabel={isFrozen ? "Unfreeze card" : "Freeze card"}
              accessibilityHint="Tap to toggle card freeze status"
            >
              <LinearGradient
                colors={isFrozen ? 
                  ['#00bcd4', '#0077be', '#005a8a'] : 
                  ['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)', 'rgba(255, 68, 68, 0.2)']
                }
                style={styles.freezeButtonGradient}
              >
                <Icon name="ac-unit" size={20} color={isFrozen ? '#ffffff' : '#ff4444'} />
                <Text style={[styles.freezeText, isFrozen && styles.freezeTextActive]}>
                  {isFrozen ? 'unfreeze' : 'freeze'}
                </Text>
                <View style={[styles.buttonGlow, isFrozen && styles.buttonGlowActive]} />
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Ultra Enhanced Copy Details Button */}
          <TouchableOpacity 
            style={styles.copyButton} 
            onPress={handleCopyDetails} 
            activeOpacity={0.7}
            accessibilityLabel="Copy card details"
            accessibilityHint="Tap to copy card details to clipboard"
          >
            <LinearGradient
              colors={['rgba(255, 68, 68, 0.2)', 'rgba(255, 68, 68, 0.1)', 'rgba(255, 68, 68, 0.15)']}
              style={styles.copyButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <BlurView intensity={8} style={styles.copyButtonBlur}>
                <Icon name="content-copy" size={16} color="#ff4444" />
                <Text style={styles.copyText}>copy details</Text>
                <View style={styles.copyGlow} />
              </BlurView>
            </LinearGradient>
          </TouchableOpacity>

          {/* Ultra Enhanced RuPay Logo */}
          <View style={styles.rupayContainer}>
            <LinearGradient
              colors={['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.05)', 'rgba(255, 68, 68, 0.1)']}
              style={styles.rupayGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <BlurView intensity={6} style={styles.rupayBlur}>
                <Text style={styles.rupayText}>RuPay</Text>
                <Text style={styles.prepaidText}>PREPAID</Text>
                <View style={styles.rupayAccent} />
              </BlurView>
            </LinearGradient>
          </View>
        </Animated.View>
      </Animated.View>

      {/* Success Toast */}
      {showSuccess && (
        <Animated.View style={[styles.successToast, successAnimatedStyle]}>
          <BlurView intensity={15} style={styles.successBlur}>
            <LinearGradient
              colors={['rgba(76, 175, 80, 0.9)', 'rgba(139, 195, 74, 0.9)']}
              style={styles.successGradient}
            >
              <Icon name="check-circle" size={24} color="#ffffff" />
              <Text style={styles.successText}>Details Copied!</Text>
            </LinearGradient>
          </BlurView>
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

export default CardDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  backgroundGradient: {
    position: 'absolute',
    width: width,
    height: height,
  },
  animatedBackground: {
    position: 'absolute',
    width: width * 1.5,
    height: height * 1.5,
    top: -height * 0.25,
    left: -width * 0.25,
  },
  backgroundLayer: {
    flex: 1,
    borderRadius: width,
  },
  particleContainer: {
    position: 'absolute',
    width: width,
    height: height * 2,
    top: height,
  },
  floatingParticle: {
    position: 'absolute',
    width: 3,
    height: 3,
    backgroundColor: 'rgba(255, 68, 68, 0.6)',
    borderRadius: 1.5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
    justifyContent: 'flex-start',
  },
  header: {
    marginBottom: 44,
    position: 'relative',
    paddingHorizontal: 4,
    alignItems: 'flex-start',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: '200',
    marginBottom: 10,
    letterSpacing: 0.8,
    lineHeight: 38,
  },
  headerSubtitle: {
    color: '#9a9a9a',
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '400',
    maxWidth: width * 0.85,
  },
  headerAccent: {
    position: 'absolute',
    bottom: -12,
    left: 4,
    width: 80,
    height: 3,
    backgroundColor: '#ff4444',
    borderRadius: 1.5,
    shadowColor: '#ff4444',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
  },
  toggleContainer: {
    marginBottom: 48,
    marginHorizontal: 8,
    borderRadius: 28,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: 'rgba(255, 255, 255, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  toggleBlur: {
    flexDirection: 'row',
    padding: 6,
  },
  toggleButton: {
    flex: 1,
    borderRadius: 22,
    overflow: 'hidden',
  },
  toggleGradient: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    minHeight: 48,
  },
  toggleButtonActive: {
    shadowColor: '#ff4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  toggleText: {
    color: '#8a8a8a',
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  toggleTextActive: {
    color: '#ffffff',
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -3,
    left: '50%',
    marginLeft: -18,
    width: 36,
    height: 4,
    backgroundColor: '#ff4444',
    borderRadius: 2,
    shadowColor: '#ff4444',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 6,
  },
  cardSection: {
    alignItems: 'center',
    marginBottom: 40,
    paddingHorizontal: 8,
  },
  cardSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  cardSectionTitle: {
    color: '#888888',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 2,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  premiumBadge: {
    marginLeft: 12,
    backgroundColor: 'rgba(255, 68, 68, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 68, 68, 0.4)',
  },
  premiumText: {
    color: '#ff4444',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  cardContainer: {
    position: 'relative',
    marginBottom: 30,
  },
  cardGlow: {
    position: 'absolute',
    top: -8,
    left: -8,
    right: -8,
    bottom: -8,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 68, 68, 0.15)',
    shadowColor: '#ff4444',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  card: {
    width: width * 0.88,
    height: height * 0.32,
    borderRadius: 24,
    overflow: 'hidden',
    elevation: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 68, 68, 0.4)',
  },
  cardBlur: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  holographicOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
  },
  cardPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  patternLine: {
    position: 'absolute',
    top: '30%',
    left: -50,
    width: 200,
    height: 2,
    backgroundColor: '#ff4444',
    opacity: 0.4,
    transform: [{ rotate: '15deg' }],
    shadowColor: '#ff4444',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  patternLine2: {
    position: 'absolute',
    bottom: '40%',
    right: -50,
    width: 150,
    height: 1,
    backgroundColor: '#ff4444',
    opacity: 0.3,
    transform: [{ rotate: '-10deg' }],
    shadowColor: '#ff4444',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
  },
  patternLine3: {
    position: 'absolute',
    top: '60%',
    left: '20%',
    width: 100,
    height: 1,
    backgroundColor: '#ff4444',
    opacity: 0.2,
    transform: [{ rotate: '25deg' }],
  },
  patternGrid: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(255, 68, 68, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 68, 68, 0.1) 0%, transparent 50%)',
  },
  shimmerOverlay: {
    position: 'absolute',
    top: 0,
    left: -width,
    right: width,
    bottom: 0,
    width: width * 2,
  },
  shimmerGradient: {
    flex: 1,
    width: '100%',
  },
  cardTopSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  cardLogos: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  visaLogo: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    shadowColor: '#1a1f71',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 4,
  },
  visaText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  masterLogo: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#eb001b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 4,
  },
  masterText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '900',
  },
  amexLogo: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 6,
    shadowColor: '#006fcf',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 4,
  },
  amexText: {
    color: '#ffffff',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  profileSection: {
    // Remove absolute positioning
  },
  profileCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#ff6b35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
    position: 'relative',
  },
  profileInitial: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '900',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  profileGlow: {
    position: 'absolute',
    top: -5,
    left: -5,
    right: -5,
    bottom: -5,
    borderRadius: 27.5,
    backgroundColor: 'rgba(255, 107, 53, 0.3)',
    zIndex: -1,
  },
  yoloBranding: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
    position: 'relative',
    paddingHorizontal: 4,
  },
  brandingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  yoloIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    shadowColor: '#ff4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
    position: 'relative',
  },
  yoloIconText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  iconGlow: {
    position: 'absolute',
    top: -3,
    left: -3,
    right: -3,
    bottom: -3,
    borderRadius: 20.5,
    backgroundColor: 'rgba(255, 68, 68, 0.4)',
    zIndex: -1,
  },
  yoloText: {
    color: '#ff4444',
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 3,
    textShadowColor: 'rgba(255, 68, 68, 0.6)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 6,
    marginLeft: 2,
  },
  brandingGlow: {
    position: 'absolute',
    top: -5,
    left: -5,
    right: -5,
    bottom: -5,
    backgroundColor: 'rgba(255, 68, 68, 0.1)',
    borderRadius: 25,
    zIndex: -1,
  },
  brandingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emojiContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(255, 255, 255, 0.4)',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  emoji: {
    fontSize: 20,
  },
  cardNumberContainer: {
    alignItems: 'center',
    marginVertical: 20,
    position: 'relative',
    paddingHorizontal: 12,
  },
  cardNumberDisplay: {
    fontSize: 22,
    color: '#ffffff',
    letterSpacing: 4,
    fontFamily: 'monospace',
    fontWeight: '700',
    textShadowColor: 'rgba(255, 255, 255, 0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    textAlign: 'center',
  },
  numberGlow: {
    position: 'absolute',
    top: -4,
    left: -12,
    right: -12,
    bottom: -4,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 12,
    zIndex: -1,
    shadowColor: 'rgba(255, 255, 255, 0.3)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  cardDetailsLeft: {
    flexDirection: 'row',
    gap: 24,
    alignItems: 'flex-end',
  },
  cardDetailsRight: {
    alignItems: 'flex-end',
  },
  detailItem: {
    alignItems: 'flex-start',
    minWidth: 65,
  },
  cardLabel: {
    color: '#bbb',
    fontSize: 11,
    marginBottom: 5,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  cardValue: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    textShadowColor: 'rgba(255, 255, 255, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  decorativeElements: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    position: 'relative',
  },
  redDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    shadowColor: '#ff4444',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
  },
  cardBrand: {
    fontSize: 14,
    color: '#ff4444',
    fontWeight: '800',
    letterSpacing: 1.5,
    textShadowColor: 'rgba(255, 68, 68, 0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
    textTransform: 'uppercase',
  },
  brandAccent: {
    position: 'absolute',
    bottom: -3,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255, 68, 68, 0.4)',
    borderRadius: 0.5,
  },
  freezeButton: {
    position: 'absolute',
    right: -20,
    top: '50%',
    borderRadius: 32,
    overflow: 'hidden',
    transform: [{ translateY: -32 }],
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    zIndex: 10,
  },
  freezeButtonGradient: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 32,
    position: 'relative',
    minWidth: 110,
  },
  freezeButtonActive: {
    transform: [{ scale: 1.05 }],
    shadowColor: '#00bcd4',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
  },
  freezeText: {
    color: '#ffffff',
    fontSize: 13,
    marginLeft: 8,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  freezeTextActive: {
    color: '#ffffff',
    textShadowColor: 'rgba(0, 188, 212, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  buttonGlow: {
    position: 'absolute',
    top: -3,
    left: -3,
    right: -3,
    bottom: -3,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 33,
    zIndex: -1,
  },
  buttonGlowActive: {
    backgroundColor: 'rgba(0, 188, 212, 0.3)',
  },
  freezeOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  frozenBlur: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  frozenGradient: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  frozenTextContainer: {
    alignItems: 'center',
    zIndex: 2,
    position: 'relative',
  },
  frozenIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#0077be',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  frozenIcon: {
    marginBottom: 0,
    opacity: 1,
  },
  frozenText: {
    color: '#0077be',
    fontSize: 26,
    fontWeight: 'bold',
    letterSpacing: 4,
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    marginBottom: 4,
  },
  frozenSubtext: {
    color: '#005a8a',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    opacity: 0.9,
    textShadowColor: 'rgba(255, 255, 255, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  frozenGlow: {
    position: 'absolute',
    top: -20,
    left: -20,
    right: -20,
    bottom: -20,
    backgroundColor: 'rgba(0, 119, 190, 0.2)',
    borderRadius: 50,
    zIndex: -1,
  },
  icePattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  iceParticle: {
    position: 'absolute',
    width: 6,
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 3,
    shadowColor: 'rgba(255, 255, 255, 0.8)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  cardShadow: {
    position: 'absolute',
    top: 8,
    left: 8,
    right: -8,
    bottom: -8,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 20,
    zIndex: -1,
  },
  cardShadow2: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: -16,
    bottom: -16,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 20,
    zIndex: -2,
  },
  copyButton: {
    borderRadius: 16,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 32,
    elevation: 8,
    shadowColor: '#ff4444',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    overflow: 'hidden',
  },
  copyButtonGradient: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  copyButtonBlur: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 68, 68, 0.5)',
    position: 'relative',
    minWidth: 160,
  },
  copyText: {
    color: '#ff4444',
    fontSize: 15,
    fontWeight: '700',
    marginLeft: 10,
    letterSpacing: 0.8,
    textShadowColor: 'rgba(255, 68, 68, 0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    textTransform: 'uppercase',
  },
  copyGlow: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    backgroundColor: 'rgba(255, 68, 68, 0.1)',
    borderRadius: 17,
    zIndex: -1,
  },
  rupayContainer: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 32,
  },
  rupayGradient: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: 'rgba(255, 255, 255, 0.2)',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  rupayBlur: {
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    position: 'relative',
    minWidth: 120,
  },
  rupayText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 1.5,
    textShadowColor: 'rgba(255, 255, 255, 0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  prepaidText: {
    color: '#999999',
    fontSize: 12,
    letterSpacing: 2.5,
    marginTop: 3,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  rupayAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 0.5,
  },
  successToast: {
    position: 'absolute',
    top: 100,
    left: 24,
    right: 24,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  successBlur: {
    flex: 1,
  },
  successGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  successText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
    letterSpacing: 0.5,
  }
})