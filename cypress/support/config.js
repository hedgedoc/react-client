beforeEach(() => {
  cy.server()
  cy.route({
    url: '/api/v2/config',
    response: {
      allowAnonymous: true,
      authProviders: {
        facebook: true,
        github: true,
        twitter: true,
        gitlab: true,
        dropbox: true,
        ldap: true,
        google: true,
        saml: true,
        oauth2: true,
        email: true,
        openid: true
      },
      banner: {
        text: 'This is the mock banner call',
        timestamp: '2020-05-22T20:46:08.962Z'
      },
      customAuthNames: {
        ldap: 'FooBar',
        oauth2: 'Olaf2',
        saml: 'aufSAMLn.de'
      },
      specialLinks: {
        privacy: 'https://example.com/privacy',
        termsOfUse: 'https://example.com/termsOfUse',
        imprint: 'https://example.com/imprint'
      },
      version: {
        version: 'mock',
        sourceCodeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        issueTrackerUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      }
    },
    delay: 1000
  })
})
