import React, { Component } from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import { Query } from '@apollo/react-components';
import { ApolloClient, ApolloProvider, createHttpLink, gql, InMemoryCache } from '@apollo/client';
import config from 'config/general';
import parse from 'html-react-parser';
import fetch from 'cross-fetch';
import styleIdentifiers from './customArticle.scss';

const cache = new InMemoryCache();

const clientBlog = new ApolloClient({
  link: createHttpLink({ uri: config.api.baseUrlBlog || config.api.baseUrlApollo, fetch }),
  cache,
});

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type CustomArticleProps = StateProps & DispatchProps & OwnProps;

interface CustomArticleState {}

function CustomArticle(
  WrapperComponent: React.ComponentType<any>,
  ItemComponent?: React.ComponentType<any>,
): JSX {
  class ArticleContainer extends Component<CustomArticleProps, CustomArticleState> {
    render() {
      const { url, lg, className, wrapperClassName, customNode, context, ...rest } = this.props;

      const queryArticle = gql`{
        articlesGetOneByUrl(url: "${url}",language: "${lg}" ){
          _id
          content {
            ${lg}
          }
          title {
            ${lg}
          }
          teaser {
            ${lg}
          }
          createdAt
          updatedAt
          getCategories {
            title {
              ${lg}
            }
            content {
              ${lg}
            }
            colorCode
          }
          getAuthor {
            _id
            firstName
            lastName
            email
            profilePicture {
              large
              medium
              small
            }
            bio {
              ${lg}
            }
          }
          cover {
            large
            medium
            small
          }
          thumbnail {
            large
            medium
            small
          }
          seo {
            title {
              ${lg}
            }
            description{
              ${lg}
            }
            keywords{
              ${lg}
            }
          }
          urls {
            ${lg}
          }
          published
          publicationDate
          viewsCount
        }
      }`;

      function removeStyle(toRemove) {
        for (let index = 0; index < toRemove.length; index++) {
          const element = toRemove[index];
          if (element && element.attribs && element.attribs.style) {
            element.attribs.style = null;
          }
        }

        return toRemove;
      }

      function renderContent(content): JSX {
        const newContent = content;

        const options = {
          replace: (domNode): JSX => {
            if (ItemComponent && customNode && customNode.includes(domNode.name)) {
              return <ItemComponent {...domNode} />;
            }
            return null;
          },
        };

        return parse(newContent, options);
      }

      const treatError = error => {
        let message = error.split('GraphQL error: ');
        if (message && message[1]) message = `general.errors.${message[1]}`;

        return message || error;
      };

      return (
        <Query client={clientBlog} query={queryArticle} context={context}>
          {({ loading, error, data }) => {
            const res = data && data.articlesGetOneByUrl;

            return (
              <div className={styles('CustomArticle', wrapperClassName)}>
                {WrapperComponent ? (
                  <WrapperComponent item={res} {...rest}>
                    <div className={styles('content-artice', className)}>
                      {res ? renderContent(res.content[lg]) : <div>Loading ...</div>}
                    </div>
                  </WrapperComponent>
                ) : (
                  <div className={styles('content-artice', className)}>
                    {res ? renderContent(res.content[lg]) : <div>Loading ...</div>}
                  </div>
                )}
                {error && error.message && (
                  <div className={styles('content-artice', className)}>
                    <TextItem path={treatError(error.message)} />
                  </div>
                )}
              </div>
            );
          }}
        </Query>
      );
    }
  }
  return ArticleContainer;
}

export default CustomArticle;
