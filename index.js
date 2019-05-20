
// 引入依赖
let program = require('commander');
let package = require('./package.json');
// let init = require('./bin/init');
// let list = require('./bin/list');

// 定义版本和参数依赖
program
  // .usage('wow')
  .version(package.version, '-v, --version')
  .option('-i, --init [name]', 'Generate a new project', 'myFirstProject')
  .option('-l, --list', 'List all the templates');


program.command('init (template)')
  .description("Generate a new project")
  .alias('i')
  .action(function(template){
    console.log('init',template)
    // init(template);
  });

program.command('list')
  .description("List all the templates")
  .alias('l')
  .action(function(template){
    console.log('list',template)
    // list();
  });



program.parse(process.argv);
console.log(program.args)

if (program.args.length === 0) {
  program.help();
}
