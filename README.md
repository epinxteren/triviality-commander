# Table of Contents

* [Installation](#installation)
* [Triviality commander](#triviality-commander)
  * [Example](#example)
* [Thanks](#thanks)
* [Reads](#reads)


# Installation

To install the stable version:

```
yarn add triviality-commander
```

This assumes you are using [yarn](https://yarnpkg.com) as your package manager.

or 

```
npm install triviality-commander
```

# Triviality commander

Add integration for [Commander](https://www.npmjs.com/package/commander) in Triviality.

- Add option to split commands configuration over multiple Modules into multiple configuration services.
- Exposes Module for automatic version based on your package.json
  
## Example
 
Example commander configuration server:


```typescript
import { Command } from 'commander';
import { CommanderConfigurationInterface } from 'triviality-commander';

export class CommanderExampleConfiguration implements CommanderConfigurationInterface {

  public async configure(program: Command) {
    program
      .command('hello <name>')
      .option('-s, --shout', 'shout the hello message')
      .action((name, cmd: { shout: boolean }) => {
        const message = `hello ${name}`;
        console.log(cmd.shout ? message.toUpperCase() : message);
      });
  }
}
```
        

Module with configuration added to the configuration registry: 


```typescript
import { Module } from 'triviality';
import { CommanderConfigurationInterface } from 'triviality-commander';
import { CommanderExampleConfiguration } from './CommanderExampleConfiguration';

export class CommanderExampleModule implements Module {
  public registries() {
    return {
      commanderConfigurations: (): CommanderConfigurationInterface[] => {
        return [
          this.commanderExampleConfiguration(),
        ];
      },
    };
  }

  public commanderExampleConfiguration() {
    return new CommanderExampleConfiguration();
  }
}
```
        

Add the module to the ContainerFactory


```typescript
import { ContainerFactory } from 'triviality';
import { CommanderModule } from 'triviality-commander';
import { CommanderPackageVersionModule } from 'triviality-commander';
import { CommanderExampleModule } from './CommanderExampleModule';

ContainerFactory
  .create()
  .add(CommanderModule)
  .add(CommanderPackageVersionModule)
  .add(CommanderExampleModule)
  .build()
  .then((container) => {
    container
      .commanderService()
      .parse(process.argv);
  });
```
        

if we run the file, we can call the actual commands.


```bash
./node_modules/.bin/ts-node example/bootstrap.ts hello world
hello world
```
        


```bash
./node_modules/.bin/ts-node example/bootstrap.ts hello world --shout
HELLO WORLD
```
        

## Version

CommanderPackageVersionModule exposes automatic version to commander based on your package.json


```bash
./node_modules/.bin/ts-node example/bootstrap.ts --version
0.0.2
```
        

# Thanks

Special thanks to:

* Eric Pinxteren

# Reads

[commander](https://github.com/tj/commander.js#readme)

[triviality](https://github.com/epinxteren/triviality)

