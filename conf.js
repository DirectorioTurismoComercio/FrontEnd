exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['test/e2e/*Spec.js'],
  baseUrl: 'http://localhost/ecosistema'
}