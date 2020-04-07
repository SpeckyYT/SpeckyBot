const vm = require('vm');
const path = require('path');
const fs = require('fs');

module.exports = async () => {
    //More Array Methods    
    require('more-array-methods')();

    //CoffeeScript Support
    require('coffee-register');
    require.extensions['.coffeescript'] = require.extensions['.coffee'];

    //TypeScript Support
    const tsc = path.join(path.dirname(require.resolve("typescript")),"tsc.js");
    const tscScript = vm.createScript(fs.readFileSync(tsc, "utf8"), tsc);
    const libPath = path.join(path.dirname(require.resolve("typescript")), "lib.d.ts");
    
    require.extensions['.ts'] = (module) => {
        const compileTS = (module) => {
            let exitCode = 0;
            let tmpDir = path.join(path.join(process.cwd(), 'ts-comp'), "tsreq");
            let relativeFolder = path.dirname(path.relative(process.cwd(), module.filename));
            let jsname = path.join(tmpDir, relativeFolder, path.basename(module.filename, ".ts") + ".js");
            let argv = [
                "node",
                "tsc.js",
                "--noEmitOnError",
                "--lib",
                "es2020,dom",
                "--rootDir",
                process.cwd(),
                "--target",
                "ES2020",
                "--outDir",
                tmpDir,
                libPath,
                module.filename
            ];
            let proc = Object.assign(Object.assign({}, process), {
                argv: argv.clean(),
                exit: (code) => {
                    exitCode = code;
                }
            });
            let sandbox = {
                process: proc,
                require: require,
                module: module,
                Buffer: Buffer,
                setTimeout: setTimeout,
                clearTimeout: clearTimeout,
                __filename: tsc
            }
            tscScript.runInNewContext(sandbox);
            if (exitCode !== 0) {
                throw new Error('Unable to compile TypeScript file.');
            }
            return jsname;
        }
        const runJS = (jsname, module) => {
            let content = fs.readFileSync(jsname, 'utf8');
            let sandbox = {};
            for (const k in global) {
                sandbox[k] = global[k];
            }
            sandbox.require = module.require.bind(module);
            sandbox.exports = module.exports;
            sandbox.__filename = jsname;
            sandbox.__dirname = path.dirname(module.filename);
            sandbox.module = module;
            sandbox.global = sandbox;
            return vm.runInNewContext(content, sandbox, { filename: jsname });
        }
        runJS(compileTS(module), module);
    };

    //Colored Strings in Terminal
    require('colors').setTheme({
        silly: 'rainbow',
        input: 'grey',
        verbose: 'cyan',
        prompt: 'grey',
        info: 'green',
        data: 'blue',
        help: 'cyan',
        warn: 'yellow',
        debug: 'blue',
        error: 'red',
        cmd: 'magenta',
        success: 'green',
        startupinfo: 'grey',
        dms: 'grey',
        fail: 'red',
        failed: 'red',
        fatal: ['black','bgRed'],
        dependency: 'cyan',
        cli: 'cyan'
    });
}