HOW TO STEP BY STEP

1. create connected app withe following configuration
![image](https://user-images.githubusercontent.com/41301282/198654875-c9b5e0c7-8c26-4696-9097-cae630c65b6e.png)
<br><br>
2. go to web page and paste following
https://login.salesforce.com/services/oauth2/authorize?response_type=code&client_id=3MVG9Ve.2wqUVx_Zxc8eDY5c4Mzb6ZmT.x8RwxU.mzeVGM7tIMVQHJjdHygTiDE_.yXZChDxX2oHgc2ljhCPy&redirect_uri=https://login.salesforce.com/
<br><br>
get code from browser response
![image](https://user-images.githubusercontent.com/41301282/198655140-a80b5aa3-0a6b-4b80-bbcc-391683fed58c.png)
<br><br>
3. get refresh token with code and write it down. 
DON'T repeat the steps, since refresh_token will be invalid
https://login.salesforce.com/services/oauth2/token?code=<code_here>&grant_type=authorization_code&client_id=3MVG9Ve.2wqUVx_Zxc8eDY5c4Mzb6ZmT.x8RwxU.mzeVGM7tIMVQHJjdHygTiDE_.yXZChDxX2oHgc2ljhCPy&client_secret=80292F23E5CC4AB17CDC81A171F66F9E464948B6ED47EB210368478E9873FC66&redirect_uri=https://login.salesforce.com/
<br><br>
4. Generate package.xml each time you want deploy with 
sfdx force:source:manifest:create --sourcepath force-app --manifestname package.xml 
then use sfdx force:source:deploy -w 100 --ignorewarnings --manifest package.xml -l RunLocalTests 
<br> or simply use
<br>
sfdx force:source:deploy -p force-app -l RunLocalTests
<br><br>
5. dont forget to use checkout github action in order to retrieve directory files to the machine
steps:
     <br> - name: Checkout repository files 
     <br>  uses: actions/checkout@v2
<br><br>
6. yaml.file -> https://github.com/Richard98PL/flowRefreshToken/blob/main/.github/workflows/main.yml (#### is comment in yaml - runLocalTests is commented out)
<br><br>
7. result
![image](https://user-images.githubusercontent.com/41301282/198681155-87945b5c-aa13-4dcd-8ff2-98041737bab8.png)


