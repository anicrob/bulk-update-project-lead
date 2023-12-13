# Bulk Update Project Lead


## Description

Follow the set up directions in the Setup Instructions section to run this script. This script will allow you to bulk update the project lead from one user to another user.

## Table of Contents
* [Setup Instructions](#setup-instructions)
* [Usage](#usage)
* [Basic Auth](#basic-auth)
* [Permissions](#permissions)
* [Limitations](#limitations)
* [Credits](#credits)


## Setup Instructions

Here are the setup steps:

1. Ensure you have Node.js downloaded: https://nodejs.org/en 

Select the option on the left. 

To check and see if you have node already installed or if the install was successful, run the command:

~~~
node -v
~~~

2. After doing a git clone, install the necessary packages. They are already added to the package.json, so all that's needed is to run the following commmand:
~~~
npm i
~~~

3. Set up an .env file

Run the following command:
~~~
touch .env
~~~

Add three values to this file with the following titles:

API_KEY - see Basic Auth section on how to get this value; see permissions section to see which permissions this user needs

URL - this is the Atlassian url instance (e.g. https://your-domain.atlassian.net)

PROJECT_LEAD_TO_CHANGE - this is the user ID of the project lead to change

NEW_PROJECT_LEAD - this is the user ID of the new project lead to replace the former project lead

Note: you can use the .env.TEMPLATE file as a reference.

## Usage

To use this script, run it by using the following command:

~~~
npm run start
~~~

OR

~~~
node index.js
~~~

## Basic Auth

Atlassian uses Basic Auth for a few of their REST endpoints for their authentication headers. Here are the steps to get your API token into Basic Auth format:

1. Ensure you have an API key created. Go here to create one if needed: https://id.atlassian.com/manage-profile/security/api-tokens

2. The format of basic auth is username:password then base64. The username is your email associated with your Atlassian account and then the password is the API key.

3. In the terminal run this command: (replacing user@example.com with your Atlassian account email and api_token_string with your api ke from step 1)

~~~
echo -n user@example.com:api_token_string | base64
~~~

## Permissions 

To search for projects that have the current lead you want to replace, you will need the following permissions
- Browse Projects project permission for the project.
- Administer Projects project permission for the project.
- Administer Jira global permission.

To update the project lead, you will need the Administer Projects project permission. 

Therefore, this script cannot guarantee that ALL projects with the project lead you want to replace will be found or if it is found, it is not guaranteed that you will be able to update the project lead due to the above permission limitations.

## Limitations

This script will search up to 3,000 projects. If you have more projects than this, you might have to run this script more than once.

## Credits

This was created by anicrob. 

Jira Cloud REST APIs Endpoint used: 
- [Get projects paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-projects/#api-rest-api-3-project-search-get)
- [Update project](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-projects/#api-rest-api-3-project-projectidorkey-put)


You can find more of my work at [anicrob](https://github.com/anicrob).

