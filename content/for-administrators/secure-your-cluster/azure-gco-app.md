# Configuring Azure AD Group Sync Application

1. To enable login with Azure AD (Microsoft's) account you first have to register an application on Azure. Go to the <https://portal.azure.com>
1. Open `Azure Active Directory` service
1. On the tab on the left under Manage section click `App Registrations`
1. Click on `New Registration`. Use `group-sync` under Name. Under Redirect URI section Choose `Web` and enter the Redirect URI (**This will be provided by Stakater Support**) and click `Register`
![Azure AD](images/azure-ad.png)
1. The GroupSync job requires permissions on the Azure AD tenant. For it to work, add the these entries under the ‘API Permissions’ menu item.:

- `Group.Read.All`
- `GroupMember.Read.All`
- `User.Read.All`
![Azure App API Permissions]((images/azure-permissions.png))
1. Click on the Newly created app `saap`. Click `Certificates & secrets` from the left tab. Click `New Client Secret`. Under `Expires` pick any option. Under `Description` put *saap oidc* and click `Add`
![Certificates and Secrets](images/azure-ad-certificates-secrets.png)
1. Copy the value of the newly client secret and take note of the `Application (client) ID` and `Directory (tenant) ID` of the `saap` from the Overview section. **Send this to Stakater Support**
![Client-Tenant-ID](images/azure-ad-clientid-tenantid.png)

## Items provided by Stakater Support

- `Redirect URIs`

## Items to be provided to Stakater Support

- `Application (client) ID`
- `Directory (tenant) ID`
- `client Secret`
