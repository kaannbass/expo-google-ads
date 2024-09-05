import React, { useEffect, useState } from 'react';
import { Button, View } from 'react-native';
import { InterstitialAd, AdEventType, TestIds, BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-xxxxxxxx/xxxxxxxx';

export default function HomeScreen() {
  const [interstitialAd, setInterstitialAd] = useState<InterstitialAd | null>(null);
  const [adLoaded, setAdLoaded] = useState(false);

  const bannerAds = __DEV__ ? TestIds.BANNER : 'ca-app-pub-xxxxxxxx/xxxxxxxxxx'
  useEffect(() => {
    const ad = InterstitialAd.createForAdRequest(adUnitId, {
      requestNonPersonalizedAdsOnly: true,
      keywords: ['fashion', 'clothing'],
    });

    const handleAdLoaded = () => {
      console.log('Interstitial ad loaded');
      setAdLoaded(true);
      setInterstitialAd(ad);
    };

    const handleAdError = (error) => {
      console.log('Interstitial ad error: ', error);
    };

    ad.addAdEventListener(AdEventType.LOADED, handleAdLoaded);
    ad.addAdEventListener(AdEventType.ERROR, handleAdError);

    // Start loading the ad
    ad.load();

    // Cleanup
    return () => {
      ad.removeAllListeners();
    };
  }, []);

  const handleShowInterstitial = () => {
    if (adLoaded && interstitialAd) {
      interstitialAd.show().catch((error) => {
        console.log('Error showing interstitial ad:', error);
      });
    } else {
      console.log('Interstitial ad is not loaded yet or does not exist');
    }
  };

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, rowGap: 10 }}>
      <BannerAd
        unitId={bannerAds}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
      <Button
        title="Show Google Ads"
        onPress={handleShowInterstitial}
      />
    </View>
  );
}