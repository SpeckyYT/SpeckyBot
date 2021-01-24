const fs = require('fs');

module.exports = (package,extension) => {
    if(!package) return;

    extension = extension || package;
    extension = Array.isArray(extension) ? extension : [extension];
    extension = extension.map(e => e.toLowerCase());

    for(const ext of extension)
        require.extensions[`.${ext}`] = (module, filename) =>
            module._compile(
                require(package)
                .compile(
                    fs.readFileSync(
                        filename,
                        {encoding:"utf8"}
                    )
                ),
                filename
            )
}
