import { Module } from 'triviality';
import { CommanderConfigurationInterface } from './CommanderConfigurationInterface';
import { Command } from 'commander';
import { StartCommanderService } from './StartCommanderService';

export class CommanderModule implements Module {
  public registries() {
    return {
      commanderConfigurations: (): CommanderConfigurationInterface[] => {
        return [];
      },
    };
  }

  public async setup() {
    const pending: Array<Promise<void>> = [];
    this.registries()
        .commanderConfigurations()
        .forEach((service) => {
          pending.push(Promise.resolve(service.configure(this.commanderService())));
        });
    await Promise.all(pending);
  }

  public commanderService(): Command {
    return new Command();
  }

  public startCommanderService() {
    return new StartCommanderService(this.commanderService());
  }
}
