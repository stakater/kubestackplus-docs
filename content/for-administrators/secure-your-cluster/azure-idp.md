# Configuring Azure AD identity provider

For Azure AD, two applications are needed, one for group synchronization, and one for the identity provider. These are the steps for identity provider:

1. To enable login with a Microsoft Azure AD account you first have to register an OAuth application on Azure. Login to [Azure Portal](https://portal.azure.com).
1. Open `Azure Active Directory` service
1. On the left tab under the Manage section, click `App Registrations`
1. Click on `New registration`. Enter `saap` as the name. Under the `Redirect URI` section, choose `Web` and enter the Redirect URI that **will be provided by Stakater Support** and click `Register`:

    ![Azure AD](images/azure-ad.png)

1. Go to `API permissions` and add the required Microsoft Graph API permissions. Typically, you need these permissions:
    * `User.Read`
    * `openid`
    * `profile`
    * `email`
1. Click on the newly created app `saap`. Click `Certificates & secrets` from the left tab. Click `New client secret`. Under `Expires` pick any option. Under `Description` enter `saap oidc` and click `Add`:

    ![Certificates and Secrets](images/azure-ad-certificates-secrets.png)

1. Copy the value of the newly created client secret and note the `Application (client) ID` and `Directory (tenant) ID` of the `saap` app registration from the `Overview` tab. **Send this to Stakater Support**:

    ![Client-Tenant-ID](images/azure-ad-clientid-tenantid.png)

## Items provided by Stakater Support

* `Redirect URIs`

## Items to be provided to Stakater Support

Please provide the secrets via password manager:

* `Application (client) ID`
* `Directory (tenant) ID`
* `client Secret`
