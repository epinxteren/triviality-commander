import { Module } from 'triviality';
import { CommanderConfigurationInterface } from '../src';
import { CommanderHalloConfiguration } from './CommanderHalloConfiguration';
import { CommanderByeConfiguration } from './CommanderByeConfiguration';

export class CommanderExampleModule implements Module {
  public registries() {
    return {
      commanderConfigurations: (): CommanderConfigurationInterface[] => {
        return [
          this.commanderExampleConfiguration(),
          this.commanderByeExample(),
        ];
      },
    };
  }

  public commanderExampleConfiguration() {
    return new CommanderHalloConfiguration();
  }

  public commanderByeExample() {
    return new CommanderByeConfiguration();
  }
}
