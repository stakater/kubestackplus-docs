# Configuring Azure AD Group Sync Application

1. To enable sync groups from Azure AD (Microsoft's) account to Stakater Cloud you first have to register an application on Azure. Go to the <https://portal.azure.com>
1. Open `Azure Active Directory` service
1. On the left tab under the Manage section, click `App Registrations`
1. Click on `New Registration`. Use `group-sync` under Name and click `Register`
![Azure AD](images/azure-ad.png)
1. The GroupSync job requires additional permissions on the Azure AD tenant. To set these up, add the `Group.Read.All`, `GroupMember.Read.All`,`User.Read.All` entries under the `API Permissions`
![Azure App API Permissions](images/azure-permissions-group-sync.png)
1. Click on the newly created app `group-sync`. Click `Certificates & secrets` from the left tab. Click `New Client Secret`. Under `Expires` pick any option. Under `Description` enter *saap-group-sync*, and click `Add`
![Certificates and Secrets](images/azure-ad-certificates-secrets.png)
1. Copy the value of the newly created client secret and note the  `Application (client) ID` and `Directory (tenant) ID` of the `group-sync` app registration from the `Overview` tab. **Send this to Stakater Support**
![Client-Tenant-ID](images/azure-ad-clientid-tenantid.png)

## Items to be provided to Stakater Support

- `Application (client) ID`
- `Directory (tenant) ID`
- `client Secret`
