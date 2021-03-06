var Checker = require('../../lib/checker');
var configFile = require('../../lib/cli-config');
var assert = require('assert');

describe('options/additional-rules', function() {
    var checker;

    beforeEach(function() {
        checker = new Checker();
    });

    it('should add additional rules', function() {
        checker.configure({
            additionalRules: ['test/data/rules/*.js'],
            testAdditionalRules: true
        });

        assert(checker.checkString('').getErrorCount() === 1);
    });

    it('should resolve rules path relative to config location', function() {
        var checker = new Checker();
        checker.configure(configFile.load('./test/data/configs/additionalRules/.jscs.json'));

        assert(checker.checkString('').getErrorCount() === 1);
    });

    it('should be present in config after initialization', function() {
        checker.configure({
            additionalRules: ['test/data/rules/*.js'],
            testAdditionalRules: true
        });

        var config = checker.getProcessedConfig();

        assert(config.additionalRules !== undefined);
        assert(Object.getOwnPropertyDescriptor(config, 'additionalRules').enumerable === false);
    });
});
