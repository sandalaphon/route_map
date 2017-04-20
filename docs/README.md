##To get started

```git pull```

need to `npm install` in route_map. 

and `npm install` in client

**BUT** npm install in `client` will install *the wrong version* of webpack leading to the following error:

`Invalid configuration object. Webpack has been initialised using a configuration object that does not match the API schema.`
` - configuration.output.path: The provided value "./build" is not an absolute path!`

To fix this, use:

```npm uninstall webpack ; npm install webpack@2.2.0-rc.0```
