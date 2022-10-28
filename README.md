<h1>HOW TO STEP BY STEP</h1>
<br>
<img width="1403" alt="image" src="https://user-images.githubusercontent.com/41301282/198689872-3eed4dff-a7b5-4603-9350-7fb248c0f2c9.png">

<br>
<b>0. Whole idea behind solution </b>

<br> You need to have this: 
<br>

     ```sfdx-auth-url: force://${{secrets.CLIENT_ID}}:${{secrets.CLIENT_SECRET}}:${{secrets.REFRESH_TOKEN}}@org.my.salesforce.com```

<br> So you need 3 things: clientId (easy), clientSecret (easy) and refresh_token (hard to get)

<br><br>

<b>1. Create connected app with the following configuration</b>
![image](https://user-images.githubusercontent.com/41301282/198654875-c9b5e0c7-8c26-4696-9097-cae630c65b6e.png)
<br><br>

<b>2. Go to web page and paste the following</b>
<br>```https://login.salesforce.com/services/oauth2/authorize?```
<br>```response_type=code&```
<br>```client_id=...&```
<br>```redirect_uri=https://login.salesforce.com/```
<br>
get code from browser response<br>
![image](https://user-images.githubusercontent.com/41301282/198655140-a80b5aa3-0a6b-4b80-bbcc-391683fed58c.png)
<br><br>

<b>3. Get refresh token with code and write it down </b><br>
<br>
DON'T repeat the steps, since refresh_token will be invalid!
<br>
<br>```https://login.salesforce.com/services/oauth2/token?```
<br>```code=-->code_here<---&```
<br>```grant_type=authorization_code&```
<br>```client_id=...&```
<br>```client_secret=...&```
<br>```redirect_uri=https://login.salesforce.com/```
<br><br>

<b>4. Generate package.xml each time you want deploy with</b>
<br>```sfdx force:source:manifest:create --sourcepath force-app --manifestname package.xml ```
<br>then use 
<br>```sfdx force:source:deploy -w 100 --ignorewarnings --manifest package.xml -l RunLocalTests ```
<br><br> or simply use
     ```sfdx force:source:deploy -p force-app -l RunLocalTests```
<br><br> or just
     ```sfdx force:source:deploy -p force-app```
<br><br>

<b>5. Don't forget to use checkout github action in order to retrieve directory files to the machine</b>
steps:
     <br> ```- name: Checkout repository files ```
     <br>    ```      uses: actions/checkout@v2```
<br><br>
<b>6. YML file created in .github/workflows</b>
<br> https://github.com/Richard98PL/flowRefreshToken/blob/main/.github/workflows/main.yml 
<br>(#### is comment in yaml - runLocalTests is commented out)
<br><br>



