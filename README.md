<h1>HOW TO STEP BY STEP</h1>
<br>
![image](https://user-images.githubusercontent.com/41301282/198681542-b272dac1-2b9b-420e-94f7-2fbb4924f040.png)
<img width="1403" alt="image" src="https://user-images.githubusercontent.com/41301282/198689872-3eed4dff-a7b5-4603-9350-7fb248c0f2c9.png">


<b>1. Create connected app withe following configuration</b>
![image](https://user-images.githubusercontent.com/41301282/198654875-c9b5e0c7-8c26-4696-9097-cae630c65b6e.png)
<br><br>

<b>2. Go to web page and paste the following</b>
<br>```https://login.salesforce.com/services/oauth2/authorize```
<br>```response_type=code&```
<br>```client_id=3MVG9Ve.2wqUVx_Zxc8eDY5c4Mzb6ZmT.x8RwxU.mzeVGM7tIMVQHJjdHygTiDE_.yXZChDxX2oHgc2ljhCPy&```
<br>```redirect_uri=https://login.salesforce.com/```
<br>
get code from browser response<br>
![image](https://user-images.githubusercontent.com/41301282/198655140-a80b5aa3-0a6b-4b80-bbcc-391683fed58c.png)
<br><br>

<b>3. Get refresh token with code and write it down. </b>
DON'T repeat the steps, since refresh_token will be invalid
<br>```https://login.salesforce.com/services/oauth2/token?```
<br>```code=-->code_here<---&```
<br>```grant_type=authorization_code&```
<br>```client_id=3MVG9Ve.2wqUVx_Zxc8eDY5c4Mzb6ZmT.x8RwxU.mzeVGM7tIMVQHJjdHygTiDE_.yXZChDxX2oHgc2ljhCPy&```
<br>```client_secret=80292F23E5CC4AB17CDC81A171F66F9E464948B6ED47EB210368478E9873FC66&```
<br>```redirect_uri=https://login.salesforce.com/```
<br><br>

<b>4. Generate package.xml each time you want deploy with</b>
<br>```sfdx force:source:manifest:create --sourcepath force-app --manifestname package.xml ```
<br>then use 
<br>```sfdx force:source:deploy -w 100 --ignorewarnings --manifest package.xml -l RunLocalTests ```
<br> or simply use
     ```sfdx force:source:deploy -p force-app -l RunLocalTests```
<br><br>

<b>5. Don't forget to use checkout github action in order to retrieve directory files to the machine</b>
steps:
     <br> ```- name: Checkout repository files ```
     <br></t> ``` uses: actions/checkout@v2```
<br><br>
<b>6. yaml.file </b>
<br> https://github.com/Richard98PL/flowRefreshToken/blob/main/.github/workflows/main.yml 
<br>(#### is comment in yaml - runLocalTests is commented out)
<br><br>



