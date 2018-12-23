import { Command } from 'commander';
import { CommanderConfigurationInterface } from '../src/CommanderConfigurationInterface';

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
