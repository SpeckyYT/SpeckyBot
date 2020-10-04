module.exports = () => {
    require.extensions['.ts'] = (module, filename) => {
        module._compile(
            new (require('@swc/core')).Compiler().transformSync(
                require('fs').readFileSync(filename, { encoding: "utf8" }),
                {
                    jsc: {
                        parser: {
                            syntax: "typescript"
                        }
                    }
                }
            ).code,
            filename
        )
    }
}
