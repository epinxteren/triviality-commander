import { Module } from 'triviality';
import { CommanderConfigurationInterface } from '../src/CommanderConfigurationInterface';
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
