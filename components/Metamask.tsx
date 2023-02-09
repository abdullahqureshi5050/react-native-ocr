import React, {useState} from 'react';
import {View, Text, Linking} from 'react-native';
import { Web3Provider } from "@ethersproject/providers";

export const Metamask = () => {
  const [address, setAddress] = useState(null);

  const connectToMetaMask = async () => {
      try {
        const provider = new Web3Provider(
          new Web3.providers.Web3Provider(
            "https://mainnet.infura.io/v3/YOUR-PROJECT-ID"
          )
        );

        const accounts = await provider.listAccounts();
        const [defaultAccount] = accounts;
        setAddress(defaultAccount);
      } catch (err) {
        Linking.openURL("ethereum:").catch((err) =>
          console.error("An error occurred", err)
        );
      }

    }

  return (
    <View>
       <Text onPress={connectToMetaMask}>Connect to MetaMask </Text>
      {address && <Text>Connected with address: {address}</Text>}
    </View>
  );
};
