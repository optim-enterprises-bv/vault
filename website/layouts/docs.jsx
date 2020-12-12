import Head from 'next/head'
import Link from 'next/link'
import { MDXProvider } from '@mdx-js/react'
import DocsPage from '@hashicorp/react-docs-page'
import { SearchProvider } from '@hashicorp/react-search'
import Columns from 'components/columns'
import Tag from 'components/inline-tag'
import Tabs, { Tab } from 'components/tabs'
import EnterpriseAlert from 'components/enterprise-alert'
import SearchBar from 'components/search-bar'
import { frontMatter as data } from '../pages/docs/**/*.mdx'
import order from 'data/docs-navigation.js'

const DEFAULT_COMPONENTS = { Tabs, Tab, EnterpriseAlert, Columns, Tag }

export default function DocsLayoutWrapper(pageMeta) {
  function DocsLayout(props) {
    const { children, ...propsWithoutChildren } = props
    return (
      <MDXProvider components={DEFAULT_COMPONENTS}>
        <DocsPage
          {...propsWithoutChildren}
          product="vault"
          head={{
            is: Head,
            title: `${pageMeta.page_title} | Vault by HashiCorp`,
            description: pageMeta.description,
            siteName: 'Vault by HashiCorp',
          }}
          sidenav={{
            Link,
            category: 'docs',
            currentPage: props.path,
            data,
            disableFilter: true,
            order,
          }}
          resourceURL={`https://github.com/hashicorp/vault/blob/master/website/pages/${pageMeta.__resourcePath}`}
        >
          <SearchProvider>
            <SearchBar />
            {children}
          </SearchProvider>
        </DocsPage>
      </MDXProvider>
    )
  }

  DocsLayout.getInitialProps = ({ asPath }) => ({ path: asPath })

  return DocsLayout
}
