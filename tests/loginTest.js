module.exports = {
    'Open Browser' : function (browser) {
        browser
            .url('http://localhost:8000')
            .waitForElementVisible('body', 1000)
            .saveScreenshot('./ss/step1.png')
    },

    'Type in info' : function (browser) {
        browser
            .saveScreenshot('./ss/step2.png')
            .setValue('#Email', 'securecloudcomputing2015@gmail.com')
            .setValue('#Passwd', 'securecloudcomputing')
            .saveScreenshot('./ss/step3.png')
            .submitForm('#signIn')
            .pause(1000)
            .saveScreenshot('./ss/step4.png')
            .click('#submit_approve_access')
            .pause(1000)
            .saveScreenshot('./ss/step5.png');

        browser.assert.containsText('body', 'plus#person');
        browser.getText('body', function(result){
            console.log(result);
            browser.end();
        });
    }
};