'use strict';
const { App, Util } = require('jovo-framework');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { Alexa } = require('jovo-platform-alexa');
jest.setTimeout(500);

for (const p of [new Alexa(), new GoogleAssistant()]) {
    const testSuite = p.makeTestSuite();

    describe(`PLATFORM: ${p.constructor.name} INTENTS` , () => {
        test('should return the LOCKED status at "lockIntent"', async () => {
            const conversation = testSuite.conversation();

            const lockRequest = await testSuite.requestBuilder.intent('lockIntent', { lockStatus : 'lock'});
            const responseLockRequest = await conversation.send(lockRequest)
            expect(
                responseLockRequest.isTell(expectedLockPrompt)
            ).toBe(true);

        });
        test('should return the UNLOCKED status at "lockIntent"', async () => {
            const conversation = testSuite.conversation();

            const lockRequest = await testSuite.requestBuilder.intent('lockIntent', { lockStatus : 'unlock'});
            const responseLockRequest = await conversation.send(lockRequest)
            expect(
                responseLockRequest.isTell(expectedUnLockPrompt)
            ).toBe(true);

        });
    });

}

let expectedLockPrompt = 'Your door is locked.'
let expectedUnLockPrompt = 'Your door is unlocked.'
