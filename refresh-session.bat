@echo off
cd /d C:\PlaywrightTS
echo.
echo Log in to Salesforce, open the Sales app Home page, then CLOSE the browser.
echo.
call npx playwright codegen --save-storage=sf-auth.json https://orgfarm-a315f663bc-dev-ed.develop.my.salesforce.com
node -e "const fs=require('fs');const s=JSON.parse(fs.readFileSync('sf-auth.json'));s.origins=[];fs.writeFileSync('sf-auth.json',JSON.stringify(s,null,2))"
echo.
echo Session saved. You can run the Salesforce tests now.
pause