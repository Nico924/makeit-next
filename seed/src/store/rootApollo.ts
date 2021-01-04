import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { config } from 'config/general';
import fetch from 'cross-fetch';

const cache = new InMemoryCache();

export default class StaticApollo {
  private static instance: StaticApollo;

  public static getInstance(): StaticApollo {
    if (!StaticApollo.instance) {
      StaticApollo.instance = new ApolloClient({
        link: createHttpLink({ uri: config.api.baseUrlApollo || '', fetch }),
        cache,
      });
      console.log('Creating new apollo client');
    }
    return StaticApollo.instance;
  }
}
