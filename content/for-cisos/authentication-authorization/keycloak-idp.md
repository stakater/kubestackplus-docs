# Configuring a Keycloak identity provider

The Keycloak instance provided by Stakater is only for managing access to the managed addons of SAAP. To configure a Keycloak identity provider for your own applications:

1. In the realm you want to provide access, create a new Client:

    - Client ID: `ap-broker`
    - Name: `Stakater Agility Platform - Broker (OR whatever is suitable)`
    - Enabled: `ON`
    - Client Protocol: `openid-connect`
    - Access Type: `Confidential`
    - Standard Flow Enabled: `ON`
    - Service Accounts Enabled: `ON`
    - Authorization Enabled: `ON`
    - Redirect URI: Ask Stakater Support team to provide the redirect URI

1. On the newly created `Client`, go to the `Credentials` tab and copy the `Secret` mentioned there
1. Provide Stakater with the copied secret, so  Stakater can setup authentication for your Keycloak

## Items provided by Stakater Support

- `Redirect URIs`

## Items to be provided to Stakater Support

- `Client ID`
- `client Secret`
